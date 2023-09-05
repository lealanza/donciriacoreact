import React, { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { toast } from 'react-toastify';
import Spinners from '../components/Ui/Spinners';
import { loginUser } from '../axios/axios-user';
import {useDispatch, useSelector} from 'react-redux';
import { setCurrentUser } from '../redux/slices/userSlice';

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
      if(response){
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
                <h3 className='mb-4 fw-bold'>Login</h3>
                <Form className='auth__form' onSubmit={singIn}>
                  <FormGroup className='form__group'>
                    <input
                      type='email'
                      placeholder='Ingrese su Email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className='form__group'>
                    <input
                      type='password'
                      placeholder='Ingrese su password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <button type='submit' className='buy__btn auth__btn'>
                    Entrar
                  </button>
                  <p>
                    No tienes una cuenta? <Link to='/signup'>Crea una cuenta</Link>{' '}
                  </p>
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
