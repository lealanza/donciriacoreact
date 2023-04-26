import React, {useState, useEffect}from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL}  from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'
import { auth } from '../firabase.config';
import { storage } from '../firabase.config'
import { db } from '../firabase.config'
import { toast } from 'react-toastify';
import Spinners from '../components/Ui/Spinners'

const SingUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const singup = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        email, 
        password)
        const user = userCredential.user;
        const storageRef = ref(storage,`images/${ Date.now() + username}` )  
        const uploadTask = uploadBytesResumable( storageRef, file)
        uploadTask.on((error) =>{
          toast.error(error.message)
        }, ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
            //creamos el perfil de usuario
            await updateProfile(user,{
              displayName: username,
              photoURL: downloadURL,
            });
            //almacenar datos del usuario en la base de datos firestore
            await setDoc(doc(db, 'user', user.uid),{
              uid:user.uid,
              displayName: username,
              email,
              photoURL: downloadURL,
            })

          });
        }
        )
      setLoading(false)
      

      
      toast.success('Cuenta creada correctamente')
      navigate('/login')
    } catch (error) {
      setLoading(false)
      toast.error('Ocurrio un error, vuelve a intentarlo')
      
    }

  }
  useEffect(()=>{
    window.scrollTo(0,0);
  }, [username]);

  return (
    <Helmet title='Login'>
      <section>
        <Container>
          <Row>
            {
              loading ? (
                <Col lg='12' className='text-center'>
                  <h3 className='fw-bold'><Spinners/></h3>
                </Col>
              ):
              (
                <Col lg='6' className='m-auto text-center'>
              <h3 className='mb-4 fw-bold'>Registrate</h3>
              <Form className='auth__form' onSubmit={singup}>
              <FormGroup className='form__group' >
                  <input type="text" placeholder='Ingrese su Usuario'
                  value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </FormGroup>
               <FormGroup className='form__group'>
                  <input type="email" placeholder='Ingrese su Email'
                  value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="password" placeholder='Ingrese su password'
                   value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </FormGroup>
                <FormGroup>
                 <input
                  type="file"
                  onChange={(e)=>setFile(e.target.files[0])}
                />
                </FormGroup>
  
               <button type='submit' className='buy__btn auth__btn'>Create una cuenta</button>
               <p>Tienes una cuenta? <Link to='/login'>Entrar</Link> </p>
              </Form>
            
            </Col>
              )
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  )


}

export default SingUp