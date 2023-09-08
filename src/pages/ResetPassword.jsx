import React, { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { toast } from 'react-toastify';
import Spinners from '../components/Ui/Spinners';
import { resetPassword } from '../axios/axios-user';
import {useDispatch, useSelector} from 'react-redux';
import { setCurrentUser } from '../redux/slices/userSlice';
import { Button, TextField } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password1, setPassword1] = useState('');

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const singIn = async (e) => {
    e.preventDefault();
    if(password !== password1){
      toast.error('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await resetPassword(
        email,
        password,
      );
      
        console.log(response.user)
        toast.success(response.message || 'Cambio de contraseña correcto');
        navigate('/login');
      
    
    } catch (error) {
        toast.error(error.response.data.erros || 'Error al cambiar la contraseña');
    }
      
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
                <h3 className='mb-4 fw-bold'>Reset Password</h3>
                <Form className='auth__form' onSubmit={singIn}>
                  <TextField variant='outlined'
                      label='Email'
                      name='Email'
                      id='Email'
                      size='normal'
                      fullWidth
                      margin='normal'
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  
                  <TextField variant='outlined'
                      label='Password'
                      name='password'
                      id='password'
                      size='normal'
                      fullWidth
                      margin='normal'
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField variant='outlined'
                      label='Password'
                      name='password'
                      id='password'
                      size='normal'
                      fullWidth
                      margin='normal'
                      type='password'
                      value={password1}
                      onChange={(e) => setPassword1(e.target.value)}
                    />
                    
                  <Button variant='outlined' fullWidth size='large' color='primary'   type='submit'>
                    Entrar
                  </Button>
                  <div style={{
                    fontSize: '10px',
                  }}>
                  <p style={{ text: "center" }}>
                    No tienes una cuenta?
                  </p>
                  <Link to='/singUp'>Crea una cuenta</Link>
                  </div>

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
