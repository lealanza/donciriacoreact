import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { useFormik } from 'formik';
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
  const formik = useFormik({
    initialValues: {
      nombre: '',
      email: '',
      telefono: '',
      provincia: '',
      localidad: '',
      codigoPostal: '',
      direccion: '',
    },
    onSubmit: (values) => {
      window.location.href = '/login';
    },
    validate: (values) => {
      const errors = {};

      if (!values.nombre) {
        errors.nombre = 'El nombre es requerido';
      }
      if (!values.email) {
        errors.email = 'El email es requerido';
      }
      if (!values.telefono) {
        errors.telefono = 'El telefono es requerido';
      }
      if (!values.provincia) {
        errors.provincia = 'La provincia es requerida';
      }
      if (!values.localidad) {
        errors.localidad = 'La localidad es requerida';
      }
      if (!values.codigoPostal) {
        errors.codigoPostal = 'El codigo postal es requerido';
      }
      if (!values.direccion) {
        errors.direccion = 'La direccion es requerida';
      }


      return errors;
    },
  });

  return (
    <>
      <Helmet title={'Checkout'}>
        <CommonSection title={'Checkout'} />
        <Container>
          <Row>
            <Col lg='8'>
              <h6 className='mb-4 mt-5 fw-bold'>Información de facturación</h6>
              <form onSubmit={formik.handleSubmit} className='form__group'>
                <label htmlFor="nombre">Nombre:</label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.nombre}
                  className={formik.touched.nombre && formik.errors.nombre ? 'has-error' : ''}
                />
                {formik.touched.nombre && formik.errors.nombre ? (
                  <span className="error-message">{formik.errors.nombre}</span>
                ) : null}

     
                  <label htmlFor="email">Email:</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className={formik.touched.email && formik.errors.email ? 'has-error' : ''}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <span className="error-message">{formik.errors.email}</span>
                  ) : null}

                 
              
                <label htmlFor="telefono">Teléfono:</label>
                <input
                  id="telefono"
                  name="telefono"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.telefono}
                  className={formik.touched.telefono && formik.errors.telefono ? 'has-error' : ''}
                />
                {formik.touched.telefono && formik.errors.telefono ? (
                  <span className="error-message">{formik.errors.telefono}</span>
                ) : null}
                <label htmlFor="provincia">Provincia:</label>
                <input
                  id="provincia"
                  name="provincia"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.provincia}
                  className={formik.touched.provincia && formik.errors.provincia ? 'has-error' : ''}
                />
                {formik.touched.provincia && formik.errors.provincia ? (
                  <span className="error-message">{formik.errors.provincia}</span>
                ) : null}
                <label htmlFor="localidad">Localidad:</label>
                <input
                  id="localidad"
                  name="localidad"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.localidad}
                  className={formik.touched.localidad && formik.errors.localidad ? 'has-error' : ''}
                />
                {formik.touched.localidad && formik.errors.localidad ? (
                  <span className="error-message">{formik.errors.localidad}</span>
                ) : null}
                <label htmlFor="codigoPostal">Codigo Postal:</label>
                <input
                  id="codigoPostal"
                  name="codigoPostal"
                  type="number"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.codigoPostal}
                  className={formik.touched.codigoPostal && formik.errors.codigoPostal ? 'has-error' : ''}
                />
                {formik.touched.codigoPostal && formik.errors.codigoPostal ? (
                  <span className="error-message">{formik.errors.codigoPostal}</span>
                ) : null}
                <label htmlFor="direccion">Direccion:</label>
                <input
                  id="direccion"
                  name="direccion"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.direccion}
                  className={formik.touched.direccion && formik.errors.direccion ? 'has-error' : ''}
                />
                {formik.touched.direccion && formik.errors.direccion ? (
                  <span className="error-message">{formik.errors.direccion}</span>
                ) : null}
              </form>
            </Col>
            <Col lg='4'>
              <div className="checkout__cart mt-5">
                <h6>Total Prodcutos: <span>{total} productos</span></h6>
                <h6>SubTotal:<span>{formattedTotal}</span></h6>
                <h6><span>Envio: <br />Envio Gratis</span><span>0</span></h6>
                <h4>Total a pagar: <span>{formattedTotal}</span></h4>
                <button onClick={formik.submitForm} className='buy__btn text-white'>Validar y continuar</button>
              </div>
            </Col>
          </Row>
        </Container>
      </Helmet>
    </>
  )
}

export default CheckOut
