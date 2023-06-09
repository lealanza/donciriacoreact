import React, {useState, useEffect}from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL}  from 'firebase/storage'
import { setDoc, doc } from 'firebase/firestore'
import { auth } from '../firebase.config';
import { storage } from '../firebase.config'
import { db } from '../firebase.config'
import { toast } from 'react-toastify';
import Spinners from '../components/Ui/Spinners'

const SingUp = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const singup = async (e)=>{
    e.preventDefault()
    setLoading(true)

    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError('El correo electrónico es inválido');
      setLoading(false);
      return;
    } else if (password.length < 6) {
      setFormError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }
    
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
        );
      
      toast.success('Cuenta creada correctamente')
      navigate('/login')
    } catch (error) {
      setFormError('Ocurrio un error, vuelve a intentarlo');
    }

    setLoading(false);
  }

  useEffect(() => {
    window.scrollTo(0,0);
  }, [username]);

  const handlePasswordChange = (event) => {
    const { value } = event.target;

    if (value.length < 6) {
      setFormError('La contraseña debe tener al menos 6 caracteres');
    } else {
      setFormError('');
    }

    setPassword(value);
  };

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
                  <input
                    type="password"
                    placeholder='Ingrese su password'
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </FormGroup>
                {formError &&
                  <div style={{ color: 'red' }}>
                    {formError}
                  </div>
                }
                <FormGroup>
                  <label className='text-white mt-4'>Ingrese su avatar 200 x 200</label>
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
  );
}

export default SingUp;
