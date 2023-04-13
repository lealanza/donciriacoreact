import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import Button from '@mui/material/Button';
import heroImg from '../images/hero.jpg'
import '../styles/home.css'
import { Link } from 'react-router-dom';



const Home = () => {
  const year= new Date().getFullYear()
  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg='6'md='6'>
              <div className="hero__content">
                <p className="hero__subtitle">Lo mas vendido en {year}!</p>
                <h2>Te traemos lo mejor del mercado, para que tus entrenamientos y salidas sean mas divertidas!!</h2>
                <p>Tambien te ofrece el mejor cuidado para que bicicleta, siempre utilizando las mejores herramientas y los productos acordes para cada servicio</p>
                <button variant="outlined" className='buy__btn'><Link to='/shop'>Ver Productos</Link></button>
              </div>
            </Col>
            
          </Row>
        </Container>
      </section>
    </Helmet>
  )
}

export default Home