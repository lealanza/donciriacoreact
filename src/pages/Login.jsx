import React, { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { toast } from 'react-toastify';
import Spinners from '../components/Ui/Spinners';
import { loginUser } from '../axios/axios-user';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../redux/slices/userSlice';
import { Button, TextField } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const singIn = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(
        email,
        password,
      );
      console.log(response.user)
      if (response) {
        dispatch(
          setCurrentUser({
            ...response.user,
            token: response.token,
          }))
      }
      const currentUser = response.token
      console.log(currentUser)
      toast.success(response.message || 'Iniciando sesión con éxito');
      navigate('/');
    } catch (error) {
      toast.error('Error al iniciar sesión');
      toast.error('Verifica Email y Contraseña');

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
                <h3 className='mb-4 fw-bold'>Login</h3>
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
                  <div style={{
                    fontSize: '10px',
                  }}>
                    <p style={{ text: "center" }}>
                      Has olvidado tu contraseña?
                    </p><Link to='/resetPassword'>Recuperar contraseña</Link>
                  </div>

                  <Button variant='outlined' fullWidth size='large' color='primary' type='submit'>
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
