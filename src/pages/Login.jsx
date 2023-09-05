import React, { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { toast } from 'react-toastify';
import Spinners from '../components/Ui/Spinners';
import { loginUser } from '../axios/axios-user';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/slices/userSlice';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const singIn = async (e) => {
    e.preventDefault();
    const response = await loginUser(
      email,
      password,
    );
    if (response) {
      dispatch(
        setCurrentUser({
          ...response.user,
          token: response.token,
        }))
    }
    console.log(response.user)
    toast.success(response.message || 'Iniciando sesión con éxito');
    navigate('/');

  }


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Helmet title='Login'>
      <section>
        <Container>
          <Row>
            {loading ? (
              <Col lg='12' className='text-center'>
                <h3 className='fw-bold'>
                  <Spinners />
                </h3>
              </Col>
            ) : (
              <Col lg='6' className='m-auto text-center'>
                <h3 className='mb-4 fw-bold' style={{
                  color:'rgba(0, 45, 109)'
                }}>Login</h3>
                <Form className='auth__form' onSubmit={singIn}>
                  
                    <TextField label="Email" variant="outlined"
                      style={{
                        gap:'10px',
                        
                      }}
                      type='email'
                      placeholder='Ingrese su Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField label="Password" variant="outlined"
                     style={{
                      
                    }}
                      type='password'
                      placeholder='Ingrese su password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    

                  <Button variant='outlined' type='submit'>
                    Entrar
                  </Button >
                   
                  <p style={{color:'black',}}>
                    No tienes una cuenta? </p>  
                    <Link style={{
                      fontSize:'20px',
                      color:'#002d6dc9',
                      marginBottom:20,
                      marginTop:-20
                    }} to='/signup'>Create una cuenta</Link>{' '}
                  
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Login;
