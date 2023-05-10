import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import { auth, db } from '../firebase.config';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderCartItems, setSelectedOrderCartItems] = useState([]);
  const [cart, setCart] = useState([]);
  const fetchUserOrders = async (uid) => {
    const ordersRef = collection(db, 'orders');
    const ordersQuery = query(ordersRef, where('uId', '==', uid));
    const querySnapshot = await getDocs(ordersQuery);
    const userOrdersData = querySnapshot.docs.map((doc) => doc.data());
    setUserOrders(userOrdersData);
  };

  const deleteOrder = async (orderId, uid) => {
    try {
      if (uid === user.uid) {
        await deleteDoc(doc(db, 'orders', orderId));
        setSelectedOrder(null);
        toast.success('Pedido borrado con éxito');
      } else {
        toast.error('No tienes permiso para borrar este pedido');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al borrar el pedido');
    }
  };
  

  const repeatOrder = () => {
    selectedOrder.cartItems.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        setCart((prevCart) => [...prevCart, item]);
      }
    });
    navigate('/cart');
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        await fetchUserOrders(user.uid);
      } else {
        setUser(null);
        setUserOrders([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchSelectedOrderCartItems = async () => {
      if (selectedOrder) {
        const orderRef = doc(db, 'orders', selectedOrder.uid);
        const orderDoc = await getDoc(orderRef);
        if (orderDoc.exists()) {
          setSelectedOrderCartItems(orderDoc.data().cartItems);
        } else {
          setSelectedOrderCartItems([]);
        }
      }
    };
    fetchSelectedOrderCartItems();
  }, [selectedOrder]);
  const navigate = useNavigate();

  return (
    <Helmet title='Perfil'>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              {user ? (
                <div className='profile__wrapper'>
                  <h3 className='profile__username'>Perfil de {user.displayName}</h3>
                  <div className="filter__widget">
                    <h4>Órdenes:</h4>
                    <select
                      onChange={(e) => setSelectedDate(e.target.value)}
                      value={selectedDate}
                    >
                      <option value=''>Seleccione una fecha</option>
                      {userOrders.map((order) => (
                        <option
                          key={order.uid}
                          value={order.date.seconds.toString()}
                        >
                          {new Date(
                            order.date.seconds * 1000
                          ).toLocaleDateString()}{' '}
                          -{' '}
                          {new Date(
                            order.date.seconds * 1000
                          ).toLocaleTimeString()}
                        </option>
                      ))}
                    </select>
                    <ul>
                      {userOrders
                        .filter(
                          (order) =>
                            selectedDate &&
                            order.date.seconds === parseInt(selectedDate)
                        )
                        .map((order) => (
                          <li key={order.uid} className='d-flex align-items-center justify-content-between li__details'>
                            Fecha del pedido:{' '}
                            {new Date(
                              order.date.seconds * 1000
                            ).toLocaleDateString()}{' '}
                            -{' '}
                            {new Date(
                              order.date.seconds * 1000
                            ).toLocaleTimeString()}{' '}
                            <button onClick={() => setSelectedOrder(order)} className='btn__details'>
                              Ver detalles
                            </button>
                            {selectedOrder && (
                              <div className="select__order mt-5">
                                <h3 className="mb-4 mt-5 fw-bold">Pedido seleccionado:</h3>
                                <p>
                                  Fecha:{' '}
                                  <span className='fw-bold'>{new Date(
                                    selectedOrder.date.seconds * 1000
                                  ).toString()}</span>
                                </p>
                                <p>ID del pedido: <span className='fw-bold'>{selectedOrder.orderId}</span></p>
                                <ul className='ul_details'>
                                  {selectedOrder.cartItems.map((item) => (
                                    <li key={item.id}>
                                      <p >Producto: <span className=' fw-small fs-6'>{item.productName}</span></p>
                                      <p >Producto: <span className='fw-small fs-6'>{item.quantity}</span></p>
                                      <p >Precio unitario: <span className='fw-small fs-6'>{item.price}</span></p>
                                      <img src={item.imgUrl} alt={item.id} />
                                    </li>
                                  ))}
                                </ul>
                                <button className='btn__details'
                                  onClick={() => {
                                    repeatOrder(selectedOrder);
                                  }}
                                >
                                  Repetir
                                </button>
                              </div>
                            )}
                            <button onClick={() => deleteOrder(selectedOrder)} className='btn__details text-white'>
                              Borrar pedido
                            </button>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p>No estás autenticado</p>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Profile;
