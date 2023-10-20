import { createContext, useEffect, useState } from "react";
// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditLead from "./EditLead";
import LeadHome from "./LeadHome";
import axios from "axios";
import LeadHeader from "./LeadHeader";
import SELeadTable from "./SELeadTable";
import { memo } from "react";
// import PlusSign from "./PlusSign";
import LeadManagement from "./LeadManagement";
export const UserContext = createContext();

function LeadApp({ children }) {
  // console.log("my api called");
  const [datalead, setDatalead] = useState([]);
  const [newdata, setNewData] = useState([]);
  const [se, setSE] = useState([]);
  const [seEmpID, setSeEmpID] = useState(null);
  const [reload, setReload] = useState(false);
  // var newseEmpID = 0;
  let ftrse = [];

  useEffect(() => {
    (async () => {
      try {
        const leadres = await axios.get(
          "http://44.211.225.140:8000/allleadmastdata"
        );
        const userres = await axios.get("http://44.211.225.140:8000/allusers");
        ftrse = [];
        leadres.data.map((ele) => {
          if (ele.assign_to == 0) {
            ftrse.push(ele);
          }
        });
        const tempse = [];
        // console.log("data get");
        userres.data.data.map((ele) => {
          if (ele.dept_id == 11) {
            tempse.push(ele);
          }
        });

        setSE(tempse);
        setNewData(ftrse);
        setDatalead(leadres.data);
        console.log(leadres.data);
      } catch (error) {
        console.log(error);
      }
    })();
    if (reload) {
      console.log("datalead updated");
    }
  }, [reload]);

  return (
    <>
      <UserContext.Provider
        value={{
          datalead,
          setDatalead,
          newdata,
          se,
          seEmpID,
          setSeEmpID,
          reload,
          setReload,
        }}
      >
        <LeadHeader />
        {children}
      </UserContext.Provider>
    </>
  );
}
export default LeadApp;
