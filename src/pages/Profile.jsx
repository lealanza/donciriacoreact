import { useState, useEffect } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";
import { getOrderByUser } from "../axios/axios-order";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [order, setOrder] = useState([]);
  const userId = useSelector((state) => state.user.currentUser && state.user.currentUser._id);
  const dispatch = useDispatch(); 
  const history = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      history('/login');
    } else {
      const fetchOrders = async () => {
        const response = await getOrderByUser(userId);
        setOrder(response.orders);
      };
      fetchOrders();
    }
  }, [currentUser, userId, history]);

  return (
    <>
      <div style={{
        width: '1300px',
        margin: 'auto',
      }}>
        {currentUser ? (
          <>
            <h1>Hola {currentUser.name}!</h1>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}>
              {order.map((order) => {
                const border = order.status === 'paid' ? '5px solid green' : order.status === 'pending' ? '5px solid red' : 'white';
                const status = order.status==='paid' ? 'Pagada' : 'Pendiente' 
                const fechaOrden = new Date(order.updatedAt);
                const dia = fechaOrden.getDate();
                const mes = fechaOrden.getMonth() + 1; 
                const anio = fechaOrden.getFullYear();
                const fechaFormateada = `${dia} / ${mes} / ${anio}`;
                return (
                  <div key={order._id} style={{ width: '800px', margin: 'auto', border, padding: '10px', borderRadius: '20px', margin: '20px' }}>
                    <table style={{ width: '100%'}}>
                      <tr>
                        <td colspan="2" style={{
                          textAlign: 'center',
                          fontWeight: 'bold',
                          margin: '10px',
                          padding: '10px',
                        }}>Información de la orden</td>
                      </tr>
                      <tr>
                        <td style={{
                          fontWeight:600
                        }}>Numero de orden:</td>
                        <td>{order.orderNumber}</td>
                      </tr>
                      <tr>
                        <td style={{
                          fontWeight:600
                        }}>Fecha de la orden:</td>
                        <td>{fechaFormateada}</td>
                      </tr>
                      <tr>
                        <td style={{
                          fontWeight:600
                        }}>Total de la orden:</td>
                        <td>{order.total}</td>
                      </tr>
                      <tr>
                        <td style={{
                          fontWeight:600
                        }}>Estado de la orden:</td>
                        <td>{status}</td>
                      </tr>
                    </table>
                  </div>
                );
              })}
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}

export default Profile;
