import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  Button,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { getOrders, deleteOrder, orderStatus as updateOrderStatus } from '../axios/axios-order';

const containerStyle = {
  width: '100%',
  maxWidth: '1000px',
  margin: 'auto',
  padding: '3px',
};

const AllOrders = () => {
  const { currentUser, userId } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(undefined);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // Para rastrear la orden expandida
  const [statusMappings, setStatusMappings] = useState({
    'Cancelada': 'canceled',
    'Pagada': 'paid'
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getOrders(userId);
        setOrders(response);
      } catch (error) {
        console.log(error.response.error)
      }
    };

    fetchData();
  }, [userId]);

  const handleDeleteOrder = useCallback(async (orderId) => {
    await Promise.all([deleteOrder(orderId), getOrders(userId)])
      .then(([_, result]) => setOrders(result));
  }, [userId]);

  const handleSubmit = useCallback(async (e, orderId) =>{
    e.preventDefault();
    try {
      await updateOrderStatus(orderId, statusMappings[selectedOrderStatus]);
      const response = await getOrders(userId);
      setOrders(response);
    } catch (error) {
      console.log(error.response.error)
    }
  }, [selectedOrderStatus, statusMappings, userId]);

  const formattedOrders = useMemo(
    () =>
      orders.map((orderItem) => ({
        ...orderItem,
        id: orderItem._id,
        updatedAt: new Date(orderItem.updatedAt),
        status:
          orderItem.status === 'paid'
            ? 'Pagada'
            : orderItem.status === 'canceled'
              ? 'Cancelada'
              : 'Pendiente',
      })),
    [orders]
  );

  return (
    <div style={containerStyle}>
      {currentUser && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Grid container spacing={3}>
            {formattedOrders.map((order) => (
              <Grid item xs={6} key={order._id}>
                <Accordion
                  expanded={expandedOrderId === order.id}
                  onChange={() =>
                    setExpandedOrderId((prevState) =>
                      prevState === order.id ? null : order.id
                    )
                  }
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container spacing={{ xs: 2, md: 0 }}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="h5" color='blue'>
                          Orden No. {order.orderNumber}
                        </Typography>
                        <Typography variant="subtitle1">
                          Fecha de la orden:{' '}
                          {order.dateString ||
                            (order.createdAt &&
                              new Date(order.createdAt).toLocaleDateString())}
                        </Typography>
                        <Typography variant="subtitle1" color='black' style={{fontWeight:800}}>
                          Total: ${order.total}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            color:
                              order.status === 'Pagada'
                                ? '#4caf50' // Green 600
                                : order.status === 'Cancelada'
                                  ? '#b71c1c' // Red 900
                                  : '#2196f3', // Blue 600
                          }}
                        >
                          Estado: {order.status}
                        </Typography>
                      </Grid>

                      <div style={{ width: 100 }}>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => {
                            if (window.confirm('¿Estás seguro que deseas eliminar esta orden?')) {
                              handleDeleteOrder(order._id)
                            }
                          }}
                          sx={{ margin: 2 }}
                        >
                          Eliminar
                        </Button>

                        {
                          order.status === 'Pendiente' ? (<form onSubmit={(e) => handleSubmit(e, order._id)}>
                          <TextField
                            label="Estado"
                            value={selectedOrderStatus}
                            onChange={(e) => (setSelectedOrderStatus(e.target.value))}
                          />
                          <Button type='submit'>enviar</Button>
                        </form>):null
                        }
                      </div>
                    </Grid>
                  </AccordionSummary>

                  <AccordionDetails>
                    <Typography>
                      <Typography variant="subtitle1">
                        Productos:
                      </Typography>
                      {order.products.map((product) => (
                        <Typography key={product._id}>
                          <h6>{product.product}</h6>
                          <p>Cantidad: {product.quantity}</p>
                          <p>Precio: ${product.price * product.quantity}</p>
                        </Typography>
                      ))}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}

export default AllOrders;
