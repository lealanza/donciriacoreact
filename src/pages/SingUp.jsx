import React, { useState, useEffect } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col, Form } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import { toast } from 'react-toastify';
import Spinners from '../components/Ui/Spinners'
import { createUser } from '../axios/axios-user';
import { Button, TextField } from '@mui/material'

const SingUp = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [lastName, setLastName] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
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
    toast.success(response.user, 'revisa tu correo para verificar tu cuenta');
    setLoading(false)
    navigate('/verified');
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [userName]);

  return (
    <Helmet title='SingUp'>
      <section>
        <Container>
          <Row>
            {
              loading ? (
                <Col lg='12' className='text-center'>
                  <h3 className='fw-bold'><Spinners /></h3>
                </Col>
              ) :
                (
                  <Col lg='6' className='m-auto text-center'>
                    <h3 className='mb-4 fw-bold'>Registrate</h3>
                    <Form className='auth__form' onSubmit={createdUser}>
                      <TextField
                        type="text"
                        label='Ingrese su Usuario'
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)} />
                      <TextField 
                        type="email" 
                        label='Ingrese su Email'
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} />
                      <TextField
                        type="password"
                        label='Ingrese su password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                      <TextField 
                        type="text" 
                        label='Ingrese su Nombre'
                        value={name} 
                        onChange={(e) => setName(e.target.value)} />
                      <TextField 
                        type="text" 
                        label='Ingrese su Apellido'
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)} />
                
                      <Button variant='outlined' fullWidth size='large' color='primary' type='submit'>
                        Registrarse
                      </Button>
                      <div>
                      <p>Tienes una cuenta?  </p>
                      <Link to='/login'>Entrar</Link>
                      </div>
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
