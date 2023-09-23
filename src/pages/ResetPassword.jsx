import React, { useReducer, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { toast } from 'react-toastify';
import Spinners from '../components/Ui/Spinners';
import { resetPassword } from '../axios/axios-user';
import { Button, TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';

const Login = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(
    (prevState, newState) => ({ ...prevState, ...newState }),
    {
      email: '',
      password: '',
      confirmPassword: '',
      loading: false,
      showPassword: false
    }
  );

  const singIn = async (e) => {
    e.preventDefault();
    if(!email || !password || !confirmPassword){
      toast.error('Todos los campos son obligatorios');
      return;
    }
    if (state.password !== state.confirmPassword) {
      toast.error('Las contraseñas no coinciden');
      return;
    }
    try {
      const response = await resetPassword(state.email, state.password);
      toast.success(response.message || 'Cambio de contraseña correcto');
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.erros || 'Error al cambiar la contraseña');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    email,
    password,
    confirmPassword,
    loading,
    showPassword
  } = state;

  return (
    <Helmet title='Login'>
      <section>
        <Container>
          <Row>
            {loading && (
              <Col lg='12' className='text-center'>
                <h3 className='fw-bold'>
                  <Spinners />
                </h3>
              </Col>
            )}
            {!loading && (
              <Col lg='6' className='m-auto text-center'>
                <h3 className='mb-4 fw-bold'>Reset Password</h3>
                <Form className='auth__form' onSubmit={singIn}>
                  <TextField
                    variant='outlined'
                    label='Email'
                    name='Email'
                    id='Email'
                    size='normal'
                    fullWidth
                    margin='normal'
                    type='email'
                    value={email}
                    onChange={(e) =>
                      dispatch({ email: e.target.value })
                    }
                  />
                  <FormControl variant='outlined'>
                    <InputLabel htmlFor='outlined-adornment-password'>
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-password'
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={() =>
                              dispatch({
                                showPassword: !state.showPassword
                              })
                            }
                            // onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label='Password'
                      value={password}
                      onChange={(e) =>
                        dispatch({ password: e.target.value })
                      }
                    />
                  </FormControl>
                  <FormControl variant='outlined'>
                    <InputLabel htmlFor='outlined-adornment-password'>
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      id='outlined-adornment-confirm-password'
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={() =>
                              dispatch({
                                showPassword: !state.showPassword
                              })
                            }
                            // onMouseDown={handleMouseDownPassword}
                            edge='end'
                          >
                            {showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label='Confirm Password'
                      value={confirmPassword}
                      onChange={(e) =>
                        dispatch({ confirmPassword: e.target.value })
                      }
                    />
                  </FormControl>
                  <Button
                    variant='outlined'
                    fullWidth
                    size='large'
                    color='primary'
                    type='submit'
                  >
                    Entrar
                  </Button>
                  <div style={{ fontSize: '10px' }}>
                    <p style={{ text: 'center' }}>No tienes una cuenta?</p>
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
