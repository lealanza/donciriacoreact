import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { cartActions } from '../redux/slices/cartSlice';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/Ui/CommonSection';
import '../styles/checkout.css';
import { toast } from 'react-toastify';
import { db, auth } from '../firabase.config'; // Agrega el servicio de autenticación de Firebase Auth
import { addDoc, collection, doc } from 'firebase/firestore';

const CheckOut = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    province: '',
    city: '',
    postalCode: '',
    address: '',
  });
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems)
  const total = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const isBuyButtonDisabled = totalAmount === 0;
  const formattedTotal = totalAmount.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });
  const generateOrderId = () => {
    const newOrderRef = doc(collection(db, 'orders'));
    return newOrderRef.id;
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Agregar el pedido a la colección "orders" en Firestore
        const currentUser = auth.currentUser; // Obtener el usuario actual

        const newOrderRef = await addDoc(collection(db, 'orders'), {
          date: new Date(),
          orderId: generateOrderId(),
          uId: currentUser.uid, // Agregar uid del usuario a la orden
          email: currentUser.email, // Agregar email del usuario a la orden
          name: formData.name,
          phone: formData.phone,
          province: formData.province,
          city: formData.city,
          postalCode: formData.postalCode,
          address: formData.address,
          cartItems,
        });
        toast.success(
          'Gracias por tu compra, en breve sera despachada a tu domicilio!'
        );
        setTimeout(() => {
          navigate('/home');
        }, 3000);
        dispatch(cartActions.clearCart());
      } catch (error) {
        console.error('Error adding document: ', error);
        toast.error('Ha ocurrido un error al procesar su pedido.');
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    for (let key in formData) {
      if (formData[key] === '') {
        toast.error(
          'Complete el formulario, para poder realizar el envio con exito'
        );
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  return (
    <>
      <Helmet title={'Checkout'}>
        <CommonSection title={'Checkout'} />
        <section>
          <Container>
            <Row>
              <Col lg="8">
                <h6 className="mb-4 mt-5 fw-bold">Información de facturación</h6>
                {isBuyButtonDisabled && (<h4 className='text-danger mb-4 mt-4 fs-1'>Por favor, debe agregar un producto para poder realizar el pedido</h4>)}
                <Form className="billing__form" onSubmit={handleSubmit}>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Ingrese su Nombre"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="email"
                      placeholder="Ingrese su Email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="number"
                      placeholder="Telefono"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Provincia"
                      name="province"
                      value={formData.province}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Ciudad"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="number"
                      placeholder="Codigo Postal"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Direccion"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <button className="buy__btn text-white" type="submit" disabled={isBuyButtonDisabled}>
                    Haz tu compra
                  </button>
                </Form>
              </Col>
              <Col lg="4">
                <div className="checkout__cart mt-5">
                  <h6>
                    Total Prodcutos: <span>{total} productos</span>
                  </h6>
                  <h6>
                    SubTotal:<span>{formattedTotal}</span>
                  </h6>
                  <h6>
                    <span>
                      Envio: <br />Envio Gratis
                    </span>
                    <span>0</span>
                  </h6>
                  <h4>
                    Total a pagar: <span>{formattedTotal}</span>
                  </h4>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default CheckOut;
