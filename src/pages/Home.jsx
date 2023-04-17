import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import { Container, Row, Col } from 'reactstrap'
import heroImagen from '../images/hero.png'
import timerImg from '../images/timer.png'
import '../styles/home.css'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'
import Services from '../services/Services'
import ProductsList from '../components/Ui/ProductsList'
import products from '../data/data'
import { useEffect, useState } from 'react'
import Clock from '../components/Ui/Clock'


const Home = () => {
  const [trendingProducts, setTrendingProducts] = useState([])
  const [bestSalesProducts, setBestSalesProducts] = useState([])
  const [bicicletasRuta, setBicicletasRuta] = useState([])
  const [bicicletasMtb, setBicicletasMtb] = useState([])
  const year = new Date().getFullYear()
  useEffect(() => {
    const filterTrendingProducts = products.filter(item => item.category === 'gravel');
    const filterBestSalesProducts = products.filter(item => item.avgRating > '4.5');
    const filterBicicletasMtb = products.filter(item => item.category === 'mtb');
    const filterBicicletasRuta = products.filter(item => item.category === 'ruta');

    setTrendingProducts(filterTrendingProducts);
    setBestSalesProducts(filterBestSalesProducts);
    setBicicletasMtb(filterBicicletasMtb);
    setBicicletasRuta(filterBicicletasRuta);


  }, []);
  return (
    <Helmet title={"Home"}>
      <section className="hero__section">
        <Container>
          <Row>
            <Col lg='6' md='6'>

              <div className="hero__content">
                <p className="hero__subtitle">Lo mas vendido en {year}!</p>
                <h3>Te traemos lo mejor del mercado, para que tus entrenamientos y salidas sean mas divertidas!!</h3>
                <p>Tambien te ofrece el mejor cuidado para que bicicleta, siempre utilizando las mejores herramientas y los productos acordes para cada servicio</p>
                <motion.button whileTap={{ scale: 1.1 }} className='buy__btn'><Link to='/shop'>Ver Productos</Link></motion.button>
              </div>
            </Col>
            <Col lg='6' md='6'>
              <div className='hero__img'>
                <img src={heroImagen} className='heroImg' />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <Services />
      <section className="trending__products">
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section__title'>Podructos destacados</h2>
            </Col>
            <ProductsList data={trendingProducts} />
          </Row>
        </Container>
      </section>
      <section className="best__sales">
        <Container>
          <Row>
            <Col lg='12' className='text-center'>
              <h2 className='section__title'>Mas Vendidos</h2>
            </Col>
            <ProductsList data={bestSalesProducts} />
          </Row>
        </Container>
      </section>
      <section className="timer__count">
        <Container>
          <Row>
            <Col lg='6' md='6'>
              <div className="clock__top-content">
                <h4 className='text-white fs-6 mb-2'>Ofertas de tiempo limitado</h4>
                <h3 className='text-white fs-5 mb-3' ></h3>
              </div>
              <Clock />

              <motion.button
                whileTap={{ scale: 1.2 }}
                className="buy__btn store__btn">
                <Link to='/shop'>Visitar Tienda</Link>
              </motion.button>
            </Col>
            <Col lg='6' md='6' className='text-end'>
              <img src={timerImg} alt="" />
            </Col>


          </Row>
        </Container>
      </section>
      <section className="new__arrivals">
        <Container>
          <Row>
            <Col lg='12' className='text-center mb-5'>
            <h2 className='section__title'>Nuevos ingresos!!!</h2>
            </Col>
            <ProductsList data={bicicletasMtb} /> 
            <ProductsList data={bicicletasRuta} />           

            
          </Row>
        </Container>
      </section>

    </Helmet>
  )
}

export default Home