import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  // states
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [registerInputs, setRegisterInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loginInputs, setLoginInputs] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alert, setAlert] = useState("");

  // managing current user
  const saveUser = (user) => setUser(user);
  const removeUser = () => setUser(null);
  const fetchUser = async () => {
    try {
      const {
        data: { user },
      } = await axios.get("/api/v1/users/showMe");
      saveUser(user);
    } catch (error) {
      removeUser();
    }
    setLoading(false);
  };

  const logoutUser = async () => {
    try {
      const { data } = await axios.delete("api/v1/auth/logout");
      removeUser();
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        alerts,
        loading,
        user,
        setLoading,
        saveUser,
        logoutUser,
        registerInputs,
        setRegisterInputs,
        loginInputs,
        setLoginInputs,
        error,
        setError,
        success,
        setSuccess,
        alert,
        setAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
