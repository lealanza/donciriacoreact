import React, {useState, useEffect}from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import { toast } from 'react-toastify';
import Spinners from '../components/Ui/Spinners'
import { createUser } from '../axios/axios-user';

const SingUp = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [lastName, setLastName] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
 
    const createdUser = async (e) => {
      e.preventDefault();
        const response = await createUser(
          userName,
          email,
          password,
          name,
          lastName
        );
          console.log(response.user)
          toast.success(response.message || "Usuario creado con exito");
          setLoading(false)
          navigate('/login');

        
       
    }
  useEffect(() => {
    window.scrollTo(0,0);
  }, [userName]);

  return (
    <Helmet title='SingUp'>
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
              <Form className='auth__form' onSubmit={createdUser}>
              <FormGroup className='form__group' >
                  <input type="text" placeholder='Ingrese su Usuario'
                  value={userName} onChange={(e)=>setUserName(e.target.value)}/>
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
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='Ingrese su Nombre'
                  value={name} onChange={(e)=>setName(e.target.value)}/>
                </FormGroup>
                <FormGroup className='form__group'>
                  <input type="text" placeholder='Ingrese su Apellido'
                  value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
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

export default SingUp
