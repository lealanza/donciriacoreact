import React, { useState } from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col, Form, FormGroup } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.css'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firabase.config'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const singIn = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential= await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      console.log(user)
      setLoading(false)
      toast.success('Iniciando sesión con éxito')
      navigate('/checkout')
    } catch (error) {
      setLoading(false)
      toast.error(error.message)
    }


  }

  return (
    <Helmet title='Login'>
      <section>
        <Container>
          <Row>
            {
              loading ? 
              (
                <Col lg='12' className='text-center'><h3 className='fw-bold'>Cargando.....</h3></Col>
              ):(
              <Col lg='6' className='m-auto text-center'>
              <h3 className='mb-4 fw-bold'>Login</h3>
               <Form className='auth__form' onSubmit={singIn}>
                 <FormGroup className='form__group'>
                   <input type="email" placeholder='Ingrese su Email'
                   value={email} onChange={(e)=>setEmail(e.target.value)} />
                 </FormGroup>
                 <FormGroup className='form__group'>
                   <input type="password" placeholder='Ingrese su password'
                    value={password} onChange={(e)=>setPassword(e.target.value)}/>
                 </FormGroup>
                <button type='submit' className='buy__btn auth__btn'>Entrar</button>
                <p>No tienes una cuenta? <Link to='/singup'>Create una cuenta</Link> </p>
               </Form>
             </Col>
             )
            }
            
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Login
