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
  getDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderCartItems, setSelectedOrderCartItems] = useState([]);
  const [cart, setCart] = useState([]);
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
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
}

export default Profile;
