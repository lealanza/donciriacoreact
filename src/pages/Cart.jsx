import React, {useEffect}from 'react'
import Helmet from '../components/Helmet/Helmet'
import '../styles/cart.css'
import CommonSection from '../components/Ui/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import { motion } from 'framer-motion'
import { cartActions } from '../redux/slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'


const Cart = () => {
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalAmount = useSelector ((state)=> state.cart.totalAmount)
  const formattedTotal = totalAmount.toLocaleString('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });
  

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate('/checkout');
    }
  };
  useEffect(()=>{
    window.scrollTo(0,0);
  }, [cartItems]);
  return (
    <Helmet title={"Cart"}>
      <CommonSection title={'Carrito de compras!!'} />
      <section>
        <Container>
          <Row>
            <Col lg='9'>
              {
                cartItems.length === 0 ? (
                  <h2 className='fs-4 text-center'>No agrego ningun producto la carrito</h2>
                ) : (
                  <table className="table borderred">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Titulo</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Borrar</th>
                        <th>Borrar Todos</th>

                      </tr>
                    </thead>
                    <tbody>
                      {
                      cartItems.map((item, index) => (<Tr item={item} key={index}/>))
                      }
                    
                    </tbody>
                  </table>
                )
              }

            </Col>
            <Col lg='3'>
              <div>
                <h6 className='d-flex align-items-center justify-content-between'>Subtotal: <span className='fs-4 fw-bold'>{formattedTotal}</span></h6>
                
               
                <div>
                  
                <button className='buy__btn w-100 mt-3 text-white' disabled={cartItems.length === 0} onClick={handleCheckout}>Checkout</button>
                <button className='buy__btn w-100 mt-3'><Link to='/shop'>Continuar comprando</Link></button>
                </div>
              </div>
            </Col>
          </Row>
        </Container></section>
    </Helmet>

  )
};
const Tr = ({item}) =>{

  const dispatch =useDispatch()
  const deleteProduct = () =>{
    dispatch(cartActions.deleteItem(item.id))
  }
  const deleteProductOne = ()=>{
    dispatch(cartActions.deleteItemOne(item.id))
  }
  return(
      <tr>
        <td>
          <img src={item.imgUrl} alt="" />
        </td>
        <td>{item.title}</td>
        <td>${item.price}</td>
        <td>{item.quantity}</td>
        <td><motion.i onClick={deleteProductOne} className='ri-delete-bin-4-fill delete__btn'></motion.i></td>
        <td><motion.i whileTap={{ scale: 1.2 }} class="ri-delete-bin-6-fill" onClick={deleteProduct}></motion.i></td>
      </tr>
    )

}

export default Cart