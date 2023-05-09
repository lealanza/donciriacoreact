import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Helmet from '../components/Helmet/Helmet';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firabase.config';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import '../styles/profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchUserOrders = async (uid) => {
    const ordersRef = collection(db, 'orders');
    const ordersQuery = query(ordersRef, where('uId', '==', uid));
    const querySnapshot = await getDocs(ordersQuery);
    const userOrdersData = querySnapshot.docs.map((doc) => doc.data());
    setUserOrders(userOrdersData);
  };

  const deleteOrder = async (order) => {
    try {
      await deleteDoc(doc(db, 'orders', order.uid));
      setSelectedOrder(null);
      toast.success('Pedido borrado con éxito');
    } catch (error) {
      console.error(error);
      toast.error('Error al borrar el pedido');
    }
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

  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success('Cerró sesión');
      })
      .catch((err) => {
        toast.err(err.message);
      });
  };

  return (
    <Helmet title='Perfil'>
      <section>
        <Container>
          <Row>
            <Col lg='12'>
              {user ? (
                <div>
                  <h2>Perfil de usuario</h2>
                  <div className='profile__wrapper'>
                    <div className='profile__content'>
                      <img
                        src={user.photoURL}
                        alt='Foto de perfil'
                        className='img__profile'
                      />
                      <h3 className='profile__username'>{user.displayName}</h3>
                    </div>
                    <div>
                      <button
                        onClick={logout}
                        className='buy__btn text-white'
                      >
                        Logout
                      </button>
                    </div>
                  </div>
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
                        <li key={order.uid}>
                          Fecha del pedido:{' '}
                          {new Date(
                            order.date.seconds * 1000
                          ).toLocaleDateString()}{' '}
                          -{' '}
                          {new Date(
                            order.date.seconds * 1000
                          ).toLocaleTimeString()}{' '}
                          <button onClick={() => setSelectedOrder(order.orderId)}>
                            Ver detalles
                          </button>
                        </li>
                      ))}
                  </ul>
                  {selectedOrder && (
                    <div>
                      <h3>Pedido seleccionado:</h3>
                      <p>
                        Fecha:{' '}
                        {new Date(
                          selectedOrder.date.seconds * 1000
                        ).toString()}
                      </p>
                      <p>ID del pedido: {selectedOrder.orderId}</p>
                      <ul>
                        {selectedOrder.items.map((item) => (
                          <li key={item.id}>
                            {item.name} - Cantidad: {item.quantity} - Precio: $
                            {item.price}
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => deleteOrder(selectedOrder)}>
                        Borrar pedido
                      </button>
                    </div>
                  )}
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

