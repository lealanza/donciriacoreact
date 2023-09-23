import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Form, FormGroup } from 'react-bootstrap';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/Ui/CommonSection';
import { toast } from 'react-toastify';
import { createOrder } from '../axios/axios-order';
import { useDispatch } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';

const CheckOut = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    user: currentUser._id,
    total: totalAmount,
    orderNumber: '',
    cellphone: '',
    direction: '',
    city: '',
    state: '',
    products: [],
    status: 'pending',
    postalCode: '',
  });
  const userId = currentUser?._id;
  const isBuyButtonDisabled = totalAmount === 0;
  const formattedTotal = `$${totalAmount.toFixed(2)}`;
  console.log(cartItems)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productsCart = cartItems.map((item) => {
        return {
          product: item.productName,
          quantity: item.quantity,
          price: item.price,
        };
      });  
      const orderInfo = {
        user: currentUser._id,
        total: totalAmount,
        orderNumber: userInfo.orderNumber + 1,
        cellphone: userInfo.cellphone,
        direction: userInfo.direction,
        city: userInfo.city,
        state: userInfo.state,
        products: productsCart,
        status: 'pending',
        postalCode: userInfo.postalCode,
      };
  
      await createOrder(userId, orderInfo);
      toast.success('Gracias por tu compra, en breve será despachada a tu domicilio!');
      dispatch(cartActions.clearCart());
      navigate('/profile');
    } catch (error) {
      console.error('Error processing order:', error);
      toast.error('Ha ocurrido un error al procesar su pedido. Por favor, inténtelo de nuevo.');
    }
  };
  
  console.log({currentUser})
  return (
    <>
      <Helmet title={'Checkout'}>
        <CommonSection title={'Checkout'} />
        <section>
          <Container>
            <Row>
              <Col lg="8">
                <h6 className="mb-4 mt-5 fw-bold">Información de facturación</h6>
                {isBuyButtonDisabled && (
                  <h4 className="text-danger mb-4 mt-4 fs-1">
                    Por favor, debes agregar un producto para poder realizar el pedido.
                  </h4>
                )}
                <Form className="billing__form" onSubmit={handleSubmit}>
                  <FormGroup className="form__group">
                    <input
                      type="tel"
                      placeholder="Telefono"
                      name="phone"
                      value={userInfo.cellphone}
                      onChange={(e) => setUserInfo((prevState) => ({ ...prevState, cellphone: e.target.value }))}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Direccion"
                      name="direction"
                      value={userInfo.direction}
                      onChange={(e) => setUserInfo((prevState) => ({ ...prevState, direction: e.target.value }))}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Ciudad"
                      name="city"
                      value={userInfo.city}
                      onChange={(e) => setUserInfo((prevState) => ({ ...prevState, city: e.target.value }))}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="number"
                      placeholder="Codigo Postal"
                      name="postalCode"
                      value={userInfo.postalCode}
                      onChange={(e) => setUserInfo((prevState) => ({ ...prevState, postalCode: e.target.value }))}
                      required
                    />
                  </FormGroup>
                  <FormGroup className="form__group">
                    <input
                      type="text"
                      placeholder="Provincia"
                      name="province"
                      value={userInfo.state}
                      onChange={(e) => setUserInfo((prevState) => ({ ...prevState, state: e.target.value }))}
                      required
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
                    Total Productos: <span>{cartItems.length} productos</span>
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