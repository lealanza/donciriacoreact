import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import heroImagen from '../images/hero.png'
import '../styles/home.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import Services from '../services/Services'
import ProductsList from '../components/Ui/ProductsList'


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
                <h3>Te traemos lo mejor del mercado, para que tus entrenamientos y salidas sean mas divertidas!!</h3>
                <p>Tambien te ofrece el mejor cuidado para que bicicleta, siempre utilizando las mejores herramientas y los productos acordes para cada servicio</p>
                <motion.button whileTap={{scale:1.1}} className='buy__btn'><Link to='/shop'>Ver Productos</Link></motion.button>
              </div>
             
             
              
            </Col>
            <Col lg='6'md='6'>
            <div className='hero__img'>
                <img src={heroImagen} className='heroImg' />
              </div>
            </Col>
            
          </Row>
        </Container>
      </section>
      <Services/>
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section__title'>Podructos destacados</h2>
            </Col>
            <ProductsList/>
          </Row>
        </Container>
      </section>

    </Helmet>
  )
}

export default Home