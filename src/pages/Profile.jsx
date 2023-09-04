import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import { auth, db } from "../firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
<<<<<<< HEAD
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import '../styles/profile.css';
import { ClassNames } from '@emotion/react';
=======
  getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
>>>>>>> 4e9ff4fa60c4ac3548fb92268301a717985c6eb8

function Profile({ cartItems }) {
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
<<<<<<< HEAD
  const [showDetails, setShowDetails] = useState(false);

=======
  const [selectedOrderCartItems, setSelectedOrderCartItems] = useState([]);
  const [cart, setCart] = useState([]);
>>>>>>> 4e9ff4fa60c4ac3548fb92268301a717985c6eb8
  const fetchUserOrders = async (uid) => {
    const ordersRef = collection(db, "orders");
    const ordersQuery = query(ordersRef, where("uId", "==", uid));
    const querySnapshot = await getDocs(ordersQuery);
    const userOrdersData = querySnapshot.docs.map((doc) => doc.data());
    setUserOrders(userOrdersData);
  };

  const deleteOrder = async (orderId, uid) => {
    try {
      if (uid === user.uid) {
        await deleteDoc(doc(db, "orders", orderId));
        setSelectedOrder(null);
        toast.success("Pedido borrado con éxito");
      } else {
        toast.error("No tienes permiso para borrar este pedido");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al borrar el pedido");
    }
  };

  const repeatOrder = () => {
    selectedOrder.cartItems.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        setCart((prevCart) => [...prevCart, item]);
      }
    });
    navigate("/cart");
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
        const orderRef = doc(db, "orders", selectedOrder.uid);
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
<<<<<<< HEAD
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
=======
    <Helmet title="Perfil">
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {user ? (
                <div className="profile__wrapper">
                  <h3 className="profile__username">
                    Perfil de {user.displayName}
                  </h3>
                  <div className="filter__widget">
                    <h4>Órdenes:</h4>
                    <select
                      onChange={(e) => setSelectedDate(e.target.value)}
                      value={selectedDate}
                    >
                      <option value="">Seleccione una fecha</option>
                      {userOrders.map((order) => (
                        <option
                          key={order.uid}
                          value={order.date.seconds.toString()}
                        >
                          {new Date(
                            order.date.seconds * 1000
                          ).toLocaleDateString()}{" "}
                          -{" "}
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
                          <div key={order.uid} className=" li__details">
                            <div className="title-details-ped">
                              <h6 className="d-flex align-items-center text-center">Fecha del pedido:{" "}
                              {new Date(
                                order.date.seconds * 1000
                              ).toLocaleDateString()}{" "}
                              -{" "}
                              {new Date(
                                order.date.seconds * 1000
                              ).toLocaleTimeString()}{" "}</h6>
                              <button
                                onClick={() => setSelectedOrder(order)}
                                className="btn__details"
                              >
                                Ver detalles
                              </button>
                            </div>

                            {selectedOrder && (
                              <div className="select__order mt-5">
                                <table className="table borderred">
                                  <thead>
                                    <tr className="text-center">
                                      <th className="p-2">Producto</th>
                                      <th className="p-2">Cantidad</th>
                                      <th className="p-2">Precio</th>
                                      <th className="p-2">Imagen</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {selectedOrder.cartItems.map((item) => (
                                      <tr key={item.id}>
                                        <td>{item.productName}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                        <td>
                                          <img
                                            src={item.imgUrl}
                                            alt={item.id}
                                          />
                                        </td>
                                        
                                          
                                       
                                      </tr>
                                    ))}
                                  </tbody>
                                  
                                </table>
                                <div className="d-flex flex-start">
                                            <button
                                              className="btn__details p-40"
                                              onClick={() => {
                                                repeatOrder(selectedOrder);
                                              }}
                                            >
                                              Repetir
                                            </button>
                                            <button
                                              onClick={() =>
                                                deleteOrder(selectedOrder)
                                              }
                                              className="btn__details text-white "
                                            >
                                              Borrar pedido
                                            </button>
                                          </div>
                              </div>
                            )}
                          </div>
                        ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p>No estás autenticado</p>
>>>>>>> 4e9ff4fa60c4ac3548fb92268301a717985c6eb8
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
