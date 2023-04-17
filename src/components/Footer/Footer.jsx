import React from 'react'
import logo from '../../LOGOS/ciriacioicon.png'
import './footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'

const Footer = () => {
  const año = new Date().getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg='4'>
            <div className='footer-logo'>
              <Link className="logo" to="/home">
                <img src={logo} alt="logo" />
              </Link>
              

            </div>
            <div>
            <p className='footer-text mt-4'>Tenemos todo para el armado de bicicletas adecuadas a cada persona según uso, presupuesto y gustos. Una bike para cada persona, armá la tuya como quieras! Bicicletas de competición, XC, 4X, DH, Urban. La mayor variedad en bikes, partes, repuestos y las mejores marcas.</p>
            </div>

          </Col>
          <Col lg='3'>
            <div className="footer__quicks-links">
              <h4 className="quicks__link-title">Top Categorias</h4>
              <ListGroup >
                  <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Mountain Bike</Link>
                  </ListGroupItem>
                  <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Ruta</Link>
                  </ListGroupItem>
                  <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Gravel</Link>
                  </ListGroupItem>
                  <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Respuestos</Link>
                  </ListGroupItem>
                  <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Cascos</Link>
                  </ListGroupItem>
                  <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Accesorios</Link>
                  </ListGroupItem>
                </ListGroup>
            </div>
          </Col>
          <Col lg='2'>
          <div className="footer__quicks-links">
              <h4 className="quicks__link-title">Links Utiles</h4>
              <ListGroup >
                  <ListGroupItem className='ps-0 border-0'>
                  <Link to='/shop'>Tienda</Link>
                  </ListGroupItem>
                  <ListGroupItem className='ps-0 border-0'>
                  <Link to='/cart'>Carrito</Link>
                  </ListGroupItem>
                  <ListGroupItem className='ps-0 border-0'>
                  <Link to='/login'>Login</Link>
                  </ListGroupItem>
                  <ListGroupItem className='ps-0 border-0'>
                  <Link to='#'>Politicas de privacidad</Link>
                  </ListGroupItem>
                  
                </ListGroup>
            </div>
          </Col>
          <Col lg='3'>
          <div className="footer__quicks-links">
              <h4 className="quicks__link-title">Contacto</h4>
              <ListGroup >
                  <ListGroupItem className='ps-0 border-0 d-flex align-item-center gap-2'>
                  <span><i class="ri-map-pin-3-line"></i></span>
                  <p>San Cristobal, Santa Fe</p>
                  </ListGroupItem>
                  <ListGroupItem className='ps-0 border-0 d-flex align-item-center gap-2'>
                 <span><i class="ri-whatsapp-line"></i></span>
                 <p>+1111111111</p>
                  </ListGroupItem>
                  <ListGroupItem className='ps-0 border-0 d-flex align-item-center gap-2'>
                 <span><i class="ri-mail-send-fill"></i></span>
                 <p>info@donciriaco.com.ar</p>
                  </ListGroupItem>
                </ListGroup>
            </div>
          </Col>
          <Col lg='12'>
            <p className='footer__copy'>Copyright {año} desarrollado por Leandro Lanza. | Derechos Reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>

    )
}

export default Footer