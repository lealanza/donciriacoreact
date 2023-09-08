import axios from 'axios';

export const getOrderByUser = async (_id) => {
  try {
    const response = await axios.get('https://apie-pied.vercel.app/order/user/'+_id);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}


export const createOrder = async (
    cellphone,
    email, 
    direction,
    city,
    postalCode,
    state,
    products,
    status,
    total
) => {
    try {
    const response = await axios.post('https://apie-pied.vercel.app/order/create');
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }

}
