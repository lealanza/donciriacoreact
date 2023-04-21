import React from 'react';
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { Formik } from 'formik'
import {  Form, Field } from 'formik';
import * as Yup from 'yup';
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

  const history = useNavigate();

  const handleSubmit = (values) => {
    console.log(values);
    history.push('/login');
  };

  return (
    <>
      <Helmet title={'Checkout'}>
        <CommonSection title={'Checkout'} />
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className='mb-4 mt-5 fw-bold'>Información de facturación</h6>
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  phone: '',
                  province: '',
                  city: '',
                  postalCode: '',
                  address: '',
                }}
                onSubmit={handleSubmit}
                validationSchema={CheckOutSchema}
              >
                {({ errors, touched }) => (
                  <Form className='billing__form'>
                    <div className="form__group">
                      <label htmlFor="name">Nombre</label>
                      <Field type="text" name="name" placeholder="Nombre" />
                      {errors.name && touched.name && <div className="error">{errors.name}</div>}
                    </div>
                    <div className="form__group">
                      <label htmlFor="email">Email</label>
                      <Field type="email" name="email" placeholder="Email" />
                      {errors.email && touched.email && <div className="error">{errors.email}</div>}
                    </div>
                    <div className="form__group">
                      <label htmlFor="phone">Teléfono</label>
                      <Field type="text" name="phone" placeholder="Teléfono" />
                      {errors.phone && touched.phone && <div className="error">{errors.phone}</div>}
                    </div>
                    <div className="form__group">
                      <label htmlFor="province">Provincia</label>
                      <Field type="text" name="province" placeholder="Provincia" />
                      {errors.province && touched.province && <div className="error">{errors.province}</div>}
                    </div>
                    <div className="form__group">
                      <Field type="text" name="city" placeholder='Localidad' />
                      <errors.city name="city" component="div" className="error" />
                    </div>
                    <div className="form__group">
                      <Field type="text" name="postalCode" placeholder='Codigo Postal' />
                      <errors.postalCode name="postalCode" component="div" className="error" />
                    </div>
                    <div className="form__group">
                      <Field type="text" name="address" placeholder='Dirrecion' />
                      <errors.address name="address" component="div" className="error" />
                    </div>
                  </Form>)}
              </Formik>
            </Col>   
          <Col lg='4'>
            <div className="checkout__cart mt-5">
              <h6>Total Prodcutos: <span>{total} productos</span></h6>
              <h6>SubTotal:<span>{formattedTotal}</span></h6>
              <h6><span>Envio: <br />Envio Gratis</span><span>0</span></h6>
              <h4>Total a pagar: <span>{formattedTotal}</span></h4>
              <button className='buy__btn auth__btn w-100 text-white mb-3' type='submit'>
                  Haz tu pedido
                </button>           
               </div>
          </Col>
          </Row>
        </Container>
      </Helmet>
    </>
   )
  }
  
  export default CheckOut