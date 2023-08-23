import axios from "axios";
//Determino a que dominio base va a consultar axios
const instance =  axios.create({
    baseURL: 'http://localhost:3000/api',
    //Donde va a establecer las cookies
    withCredentials: true
});
export default instance;