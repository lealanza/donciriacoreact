import axios from "axios";
export const loginUser = async (email, password) => {
    try {
      const response = await axios.post('https://apie-pied.vercel.app/user/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return alert(error.response.data.msg);
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