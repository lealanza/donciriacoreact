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
import { ClassNames } from '@emotion/react';

function Profile({ cartItems }) {
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

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
    <Container>
      <Helmet title="Perfil" />
      {user ? (
        <>
          <h2>Perfil de usuario</h2>
          <p>Foto de perfil</p>
          <p>{user.displayName}</p>
          <button className="buy__btn text-white" onClick={() => logout()}>
            Logout
          </button>
          <br />
          <br />
          <h4>Órdenes:</h4>
          <ul>
            {userOrders.map((order) => (
              <li key={order.orderId}>
                {order.orderId} -{' '}
                {new Date(order.date.seconds * 1000).toLocaleDateString()} -{' '}
                {new Date(order.date.seconds * 1000).toLocaleTimeString()}
                <button
                  className="buy__btn text-white"
                  onClick={() => {
                    setSelectedOrder(order);
                    setShowDetails(true);
                  }}
                >
                  Ver detalles
                </button>
                {showDetails && (
  <div>
    <h5>{cartItems[0].name}</h5>
    <p>{cartItems[0].description}</p>
    <p>Precio: {cartItems[0].price}</p>
    <button>Comprar</button>
    <button
      className="buy__btn text-white"
      onClick={() => setShowDetails(false)}
    >
      Ocultar detalles
    </button>
  </div>
)}
              </li>
            ))}
          </ul>
          {selectedOrder && (
            <>
              <h4>Pedido seleccionado:</h4>
              <p>
                Fecha:{' '}
                {new Date(
                  selectedOrder.date.seconds * 1000
                ).toLocaleDateString()}{' '}
                {new Date(
                  selectedOrder.date.seconds * 1000
                ).toLocaleTimeString()}
              </p>
              {selectedOrder.items?.length > 0 && (
                <ul>
                  {selectedOrder.items.map((item) => (
                    <li key={item.name}>
                      {item.name} - Cantidad: {item.quantity} - Precio: $
                      {item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              )}
              <button
                className="buy__btn text-white"
                onClick={() => deleteOrder(selectedOrder)}
              >
                Borrar pedido
              </button>
            </>
          )}
        </>
      ) : (
        <p>No estás autenticado</p>
      )}
    </Container>
  );
}

export default Profile;
