import React, { useState, useEffect } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { toast } from 'react-toastify';
import Spinners from '../components/Ui/Spinners';
import {useDispatch} from 'react-redux';
import { Button, TextField } from '@mui/material';
import { userVerified } from '../axios/axios-user';


const Verified = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const singIn = async (e) => {
    e.preventDefault();
    try {
      const response = await userVerified(
        email,
        code,
      );
        console.log(response.user)
        toast.success(response.message || 'cuenta verificada con exito');
        navigate('/login');
    } catch (error) {
        toast.error('Error al verificar la cuenta');
        toast.error('Verifica Email y Code');
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
                <h3 className='mb-4 fw-bold'>Verifica tu cuenta</h3>
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
                      label='Code'
                      name='password'
                      id='code'
                      size='normal'
                      fullWidth
                      margin='normal'
                      type='password'
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                     
                  <Button variant='outlined' fullWidth size='large' color='primary'   type='submit'>
                    Entrar
                  </Button>
                  
                </Form>
              </Col>
            )}
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Verified;
