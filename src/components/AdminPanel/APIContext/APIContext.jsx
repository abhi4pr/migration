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
      axios
        .get(
          `http://34.93.135.33:8080/api/get_single_user_auth_detail/${userID}`
        )
        .then((res) => {
          setContextData(res.data);
        });
    }

    axios.get("http://34.93.135.33:8080/api/get_all_users").then((res) => {
      setUserContextData(res.data.data);
      setLoading(true);
    });

    axios
      .get("http://34.93.135.33:8080/api/get_all_departments")
      .then((res) => {
        setDepartmentContext(res.data);
      });
  }, [userID]);

  return (
    <ApiContextData.Provider
      value={{
        userContextData,
        loading,
        DepartmentContext,
        contextData,
        userID,
      }}
    >
      {children}
    </ApiContextData.Provider>
  );
};

const useAPIGlobalContext = () => {
  return useContext(ApiContextData);
};

export { APIContext, ApiContextData, useAPIGlobalContext };
