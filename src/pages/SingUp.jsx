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
  const [headerKey, setHeaderKey] = useState('')
  const [checked, setChecked] = useState(false)
  const [loading, setLoading] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({
    userName: '',
    email: '',
    password: '',
    name: '',
    lastName: '',
  });

  const createdUser = async (e) => {
    e.preventDefault();
    setIsClicked(true);


    // Validación del formulario
    if (!userName || !email || !password || !name || !lastName) {
      setFormErrors({
        userName: 'El nombre de usuario es obligatorio',
        email: 'El email es obligatorio',
        password: 'La contraseña es obligatoria',
        name: 'El nombre es obligatorio',
        lastName: 'El apellido es obligatorio'
      });
      return;
    }

    if (password.length < 6) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: 'La contraseña debe tener al menos 6 caracteres'
      }));
      return;
    }

    // Envío del formulario
    try {
      const response = await createUser(
        userName,
        email,
        password,
        name,
        lastName,
        headerKey,
      );
      toast.success(response, 'revisa tu correo para verificar tu cuenta');
      navigate('/verified');
    } catch (error) {
      // Actualización de los mensajes de error en caso de que la API haya devuelto algún error
      if (error?.response?.data?.errors) {
        setFormErrors(error.response.data.errors);
      } else {
        toast.error(error.message);
      }
    }
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
                        onChange={(e) => setUserName(e.target.value)}
                        error={isClicked && !userName} 
                        helperText={isClicked && !userName ? "Por favor ingrese su nombre de usuario" : ""}
                      />
                      <TextField
                        type="email"
                        label='Ingrese su Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={isClicked && !email}
                        helperText={isClicked && !email && "Por favor ingrese su email"}
                        />
                     
                      <TextField
                        type="password"
                        label='Ingrese su password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                        error={isClicked && !password}
                        helperText={isClicked && !password && "Por favor ingrese su password"}
                        />
                     
                      <TextField
                        type="text"
                        label='Ingrese su Nombre'
                        value={name}
                        onChange={(e) => setName(e.target.value)} 
                        error={isClicked && !name}
                        helperText={isClicked && !name && "Por favor ingrese su nombre"}/>
                      
                      <TextField
                        type="text"
                        label='Ingrese su Apellido'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)} 
                        error={isClicked && !lastName}
                        helperText={isClicked && !lastName && "Por favor ingrese su apellido"}/>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                        <span>
                          Posee clave de administrador?
                        </span>
                        <input type='checkbox' onChange={() => setChecked(!checked)} checked={checked} />
                        {checked && (
                          <TextField
                            type='password'
                            label='Ingrese su clave admin'
                            value={headerKey}
                            fullWidth
                            onChange={(e) => setHeaderKey(e.target.value)}
                          />
                        )}
                      </div>
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
