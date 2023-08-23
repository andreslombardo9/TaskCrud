import { createContext, useState, useContext, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyTokenRequest,
} from "../api/auth.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Please wrap your component with the auth provider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res);
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    }
  };

const logout = () => {
  Cookies.remove("token");
  setIsAuthenticated(false);
  setUser(null);
}


  //timer para los carteles,se dispara cuando cambiar "errors"
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => setErrors([]), 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);


 

  useEffect(() => {
    async function checkLogin() {
      //Obtengo las cookies
      const cookies = Cookies.get();
      //Si las cookies tienen el token hago una peticion al back
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
    }
    try {
      const res = await verifyTokenRequest(cookies.token);
      if (!res.data) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      setIsAuthenticated(true);
      setUser(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
      setUser(null);
    }
  }
    //Luego de cargar se ejecuta la funcion
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin,logout,loading ,user, isAuthenticated, errors }}
    >
      {children}
    </AuthContext.Provider>
  );
};
