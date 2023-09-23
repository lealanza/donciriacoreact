import axios from "axios";
import { URL } from "../data/utlis";


export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${URL}user/login`, {
        email,
        password,
      });
      return response.data;
  } catch (error) {
    console.error(error.response.data.errors || error.message);
    }
  };
  export const createUser = async (userName, email, password, name, lastName,headerKey ) => {
    try {
        const userData = {
            userName,
            email,
            password,
            name,
            lastName
        };
        const response = await axios.post(`${URL}user/create`, userData, {
          headers: {
              'admin-key': headerKey
          }
      });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
export const resetPassword = async (email, password) => {
    try {
      const response = await axios.patch(`${URL}user/reset`, {
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
      const response = await axios.patch(`${URL}user/verified`, {
      email,
      code,
    });
    return response.data;
    } catch (error) {
      console.error(error.response.data.errors || error.message);
      return error.message;
    }
  }

  export const getUser = async ()=>{
    try {
      const response = await axios.get(`${URL}user/get`);
      return response.data;
    } catch (error) {
      console.error(error.response.data.errors || error.message);

      
    }
  }