import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import '../styles/cart.css'
import CommonSection from '../components/Ui/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import { motion } from 'framer-motion'
import { cartActions } from '../redux/slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Cart = () => {

  const cartItems = useSelector((state) => state.cart.cartItems)
  const totalAmount = useSelector ((state)=> state.cart.totalAmount)
  return (
    <Helmet title={"Cart"}>
      <CommonSection title={'Carrito de compras!!'} />
      <section>
        <Container>
          <Row>
            <Col lg='9'>
              {
                cartItems.length === 0 ? (
                  <h2 className='fs4 text-center'>No agrego ningun producto la carrito</h2>
                ) : (
                  <table className="table borderred">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Titulo</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Borrar x 1</th>
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
                <h6 className='d-flex align-items-center justify-content-between'>Subtotal: <span className='fs-4 fw-bold'>${totalAmount}</span></h6>
                
                <p className='fs-6 mt-2'>costos de envios podras calcular ....</p>
                <div>
                  
                  <button className='buy__btn w-100 mt-3'><Link to='/checkout'>Checkout</Link></button>
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
        <td>{item.productName}</td>
        <td>${item.price}</td>
        <td>{item.quantity}</td>
        <td><span onClick={deleteProductOne}>-1</span></td>
        <td><motion.i whileTap={{ scale: 1.2 }} class="ri-delete-bin-line" onClick={deleteProduct}></motion.i></td>
      </tr>
    )

}

export default Cart