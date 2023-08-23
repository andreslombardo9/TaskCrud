import axios from './axios';

export const registerRequest = async (user) => {
    try {
      const response = await axios.post(`/register`, user);
      // Manejar la respuesta exitosa aquí si es necesario
      return response.data;
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
      // Manejar el error de manera adecuada, mostrar un mensaje de error al usuario, etc.
      throw error;
    }
  };


  export const loginRequest = async (user) => {
    try {
      const response = await axios.post(`/login`, user);
      // Manejar la respuesta exitosa aquí si es necesario
      return response.data;
    } catch (error) {
      console.error('Error al realizar la solicitud:', error.message);
      // Manejar el error de manera adecuada, mostrar un mensaje de error al usuario, etc.
      throw error;
    }
  };

  
  export const verifyTokenRequest = () => axios.get('/verify');

