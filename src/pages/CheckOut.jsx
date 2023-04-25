import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/Ui/CommonSection';
import '../styles/checkout.css';

const CheckOut = () => {
  const total = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const formattedTotal = totalAmount.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });
  

  return (
    <>
      <Helmet title={'Checkout'}>
        <CommonSection title={'Checkout'} />
        <section>
        <Container>
          <Row>
            <Col lg='8'>
            <h6 className='mb-4 mt-5 fw-bold'>Información de facturación</h6>
            <Form className='billing__form'>
              <FormGroup className='form__group'>
                <input type="text" placeholder='Ingrese su Nombre' />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="email" placeholder='Ingrese su Email' />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="number" placeholder='Telefono' />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="text" placeholder='Provincia' />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="text" placeholder='Ciudad' />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="number" placeholder='Codigo Postal' />
              </FormGroup>
              <FormGroup className='form__group'>
                <input type="text" placeholder='Direccion' />
              </FormGroup>
            </Form>
            </Col>
            <Col lg='4'>
              <div className="checkout__cart mt-5">
                <h6>Total Prodcutos: <span>{total} productos</span></h6>
                <h6>SubTotal:<span>{formattedTotal}</span></h6>
                <h6><span>Envio: <br />Envio Gratis</span><span>0</span></h6>
                <h4>Total a pagar: <span>{formattedTotal}</span></h4>
                <button className='buy__btn text-white'><Link to='/login'>Haz tu compra</Link></button>
              </div>
            </Col>
          </Row>
        </Container>
        </section>
        
      </Helmet>
    </>
  )
}

export default CheckOut
