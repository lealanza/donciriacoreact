import axios from 'axios';
import {URL} from '../data/utlis';

export const getOrders = async () => {
  try{
    const response = await axios.get(`${URL}order/get`)
    return response.data;
  }
  catch(error){
    console.log(error.response.data);
  }
}
export const deleteOrder = async (_id) => {
  try {
    const response = await axios.delete(`${URL}order/delete/${_id}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}

export const orderStatus = async (_id, status) =>{
  try{
    const response = await axios.post(`${URL}order/status/${_id}`,{status},{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',

      }});
    return response.data;
  }
  catch(error){
    console.log(error.response.data);
  }
}



export const getOrderByUser = async (_id) => {
  try {
    const response = await axios.get(`${URL}order/user/${_id}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}

export const createOrder = async (_id,{ cellphone,user,direction,city,postalCode,state,products,total,status,orderNumber}) => {
  try {
    const response = await axios.post(`${URL}order/create/${_id}`, { cellphone,user,direction,city,orderNumber,postalCode,state,products,total,status },{
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',

      }});
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
}