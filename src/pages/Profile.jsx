import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getOrderByUser } from '../axios/axios-order';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // Para rastrear la orden expandida
  const userId = useSelector((state) => state.user.currentUser?._id);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrderByUser(userId);
          setOrders(response.orders);
      } catch (error) {
        // Manejar errores aquí
      }
    };

    fetchOrders();
  }, [userId, navigate, currentUser]);

  const formattedOrders = orders.map((orderItem) => ({
    ...orderItem,
    id: orderItem._id,
    updatedAt: new Date(orderItem.updatedAt),
    status: orderItem.status === 'paid' ? 'Pagada' : orderItem.status === 'canceled' ? 'Cancelada' : 'Pendiente'
  }));

  const columns = [
    { field: 'orderNumber', headerName: 'Numero de orden', flex: 1 },
    {
      field: 'updatedAt',
      headerName: 'Fecha de la orden',
      flex: 1,
      valueGetter: (params) => {
        const fechaOrden = params.row.updatedAt;
        const dia = fechaOrden.getDate();
        const mes = fechaOrden.getMonth() + 1;
        const anio = fechaOrden.getFullYear();
        return `${dia < 10 ? '0' : ''}${dia}/${mes < 10 ? '0' : ''}${mes}/${anio}`;
      },
    },
    { field: 'total', headerName: 'Total de la orden', flex: 1 },
    { field: 'status', headerName: 'Estado de la orden', flex: 1 },
  ];

  const handleOrderClick = (orderId) => {
    setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
  };
  const containerStyle = {
    width: '100%',
    maxWidth: '1300px',
    margin: 'auto',
    padding: '16px', 
  };

  const dataGridContainerStyle = {
    width: '100%',
    overflowX: 'auto', 
  };

  return (
    <div style={containerStyle}>
      {currentUser && (
        <>
          <h1>Hola {currentUser.name}!</h1>
          <div style={dataGridContainerStyle}>
            <DataGrid
              rows={formattedOrders? formattedOrders : "No relaizo ninguna orden aun"}
              columns={columns}
              getRowId={(row) => row.id}
              autoHeight
              disableColumnMenu 
              onRowClick={(params) => handleOrderClick(params.row.id)}
            />
          </div>
          {expandedOrderId && (
            <Accordion expanded={expandedOrderId !== null}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
              >
                <Typography>Detalles de la orden</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                {expandedOrderId && formattedOrders && formattedOrders.find((order) => order.id === expandedOrderId).products.map((e) => (
                  <Typography>
                    <h4>{e.product}</h4>
                    <h4>{e.quantity} unidades</h4>
                    <h4>Precio: ${e.price}</h4>
                  </Typography>
                ))}
                
                 
                  
                </Typography>
              </AccordionDetails>
            </Accordion>
          )}
        </>
      )}
    </div>
  );
}

export default Profile;
