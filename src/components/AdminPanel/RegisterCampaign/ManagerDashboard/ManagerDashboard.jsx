import React, { useState, useEffect } from "react";
import axios from "axios";
import { TextField } from "@mui/material";
import FormContainer from "../../FormContainer";
import Pending from "./Pending";
import Executed from "./Executed";
import Verified from "./Verified";
import Rejected from "./Rejected";
import  {useParams}  from "react-router-dom";

const ManagerDashboard = () => {
  const param =useParams()
  const Cid = param.id
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);
  const [pending, setPending] = useState([]);
  const [executedData, setExecutedData] = useState([]);
  const [verifiedData, setVerifiedData] = useState([]);
  const [rejectedData, setRejectedData] = useState([]);
  const [filterData, setfilterData] = useState("");

  const Assigndata = async () => {
    try {
      const response = await axios.get(
        `http://34.93.135.33:8080/api/assignment/campaign/${Cid}`
      );

      const assigned = response.data?.data?.filter(
        (item) =>
          item.ass_status === "assigned" || item.ass_status === "pending"
      );
      const executed = response.data?.data?.filter(
        (item) => item.ass_status === "executed"
      );
      const verified = response.data?.data?.filter(
        (item) => item.ass_status === "verified"
      );
      const rejected = response.data?.data?.filter(
        (item) => item.ass_status === "rejected"
      );

      setPending(assigned);
      setExecutedData(executed);
      setVerifiedData(verified);
      setRejectedData(rejected);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    Assigndata();
  }, []);

  const handleAccordionButtonClick = (index) => {
    setActiveAccordionIndex(index);
  };

  const handleFilterChange = (event) => {
    setfilterData(event.target.value);
  };

  const filteredPending = pending.filter((item) =>
    item.exp_name.toLowerCase().includes(filterData.toLowerCase())
  );
  const filteredExecuted = executedData.filter((item) =>
    item.exp_name.toLowerCase().includes(filterData.toLowerCase())
  );
  const filteredVerified = verifiedData.filter((item) =>
    item.exp_name.toLowerCase().includes(filterData.toLowerCase())
  );
  const filteredRejected = rejectedData.filter((item) =>
    item.exp_name.toLowerCase().includes(filterData.toLowerCase())
  );
  
    const forceRender=()=>{
      Assigndata()
    }

  const tab1 = <Pending pending={filteredPending} forceRender={forceRender} />;
  const tab2 = <Executed executed={filteredExecuted} forceRender={forceRender} />;
  const tab3 = <Verified verified={filteredVerified} forceRender={forceRender} />;
  const tab4 = <Rejected rejected={filteredRejected} forceRender={forceRender} />;

  const accordionButtons = ["Pending", "Executed", "Verified", "Rejected"];

  return (
    <>
      <FormContainer
        submitButton={false}
        mainTitle="Manager Dashboard"
        accordionButtons={accordionButtons}
        activeAccordionIndex={activeAccordionIndex}
        onAccordionButtonClick={handleAccordionButtonClick}
      >
        <div>
          <TextField
            label="Search Experts"
            type="text"
            value={filterData}
            onChange={handleFilterChange}
            sx={{ mb: 2, width: "20%" }}
          />
        </div>
        {activeAccordionIndex === 0 && tab1}
        {activeAccordionIndex === 1 && tab2}
        {activeAccordionIndex === 2 && tab3}
        {activeAccordionIndex === 3 && tab4}
      </FormContainer>
    </>
  );
};

export default ManagerDashboard;
