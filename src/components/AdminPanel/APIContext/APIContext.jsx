import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { createContext, useContext, useEffect, useState } from "react";

const ApiContextData = createContext();
const APIContext = ({ children }) => {
  const [userContextData, setUserContextData] = useState([]);
  const [DepartmentContext, setDepartmentContext] = useState([]);
  const [contextData, setContextData] = useState([]);
  const [loading, setLoading] = useState(false);

  const storedToken = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(storedToken);
  const userID = decodedToken.id;

  useEffect(() => {
    if (userID && contextData.length === 0) {
      axios.get(`http://44.211.225.140:8000/userauth/${userID}`).then((res) => {
        setContextData(res.data);
      });
    }

    axios.get("http://192.168.29.116:8080/api/get_all_users").then((res) => {
      setUserContextData(res.data.data);
      setLoading(true);
    });

    axios
      .get("http://192.168.29.116:8080/api/get_all_departments")
      .then((res) => {
        setDepartmentContext(res.data);
      });
  }, []);
  console.log("userData context hai ");

  return (
    <ApiContextData.Provider
      value={{ userContextData, loading, DepartmentContext, contextData }}
    >
      {children}
    </ApiContextData.Provider>
  );
};

const useAPIGlobalContext = () => {
  return useContext(ApiContextData);
};

export { APIContext, ApiContextData, useAPIGlobalContext };
