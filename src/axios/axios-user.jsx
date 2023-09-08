import axios from "axios";
import {toast} from 'react-toastify';


export const loginUser = async (email, password) => {
    try {
      const response = await axios.post('https://apie-pied.vercel.app/user/login', {
        email,
        password,
      });
      return response.data;
  } catch (error) {
    console.error(error.response.data.errors || error.message);
    }
  };

  export const createUser = async (name, email,lastName, userName, password) => {
    try {
        const response = await axios.post('https://apie-pied.vercel.app/user/create', {
        userName,
        email,
        name,
        password,
        lastName
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return alert(error.response.data.msg);
    }
  };

  export const resetPassword = async (email, password) => {
    try {
      const response = await axios.patch('https://apie-pied.vercel.app/user/reset', {
        email,
        password,
      });
      return response.data;
  } catch (error) {
    console.error(error.response.data.errors || error.message);
    return error.message;
    }
  } 

  export const userVerified = async (email, code) => {
    try {
      const response = await axios.patch('https://apie-pied.vercel.app/user/verified', {
      email,
      code,
    });
    return response.data;
    } catch (error) {
      console.error(error.response.data.errors || error.message);
      return error.message;
    }
  }