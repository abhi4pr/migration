import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import { set } from "lodash";
import React, { useEffect } from "react";
import { useState } from "react";
import jwtDecode from "jwt-decode";
const Confirmation = ({
  confirmation,
  setSnackbar,
  setConfirmation,
  rowData,
  value,
  remark,
  setReload,
  status,
}) => {
  const [open, setOpen] = useState(confirmation);
  const [data, setData] = useState(rowData);
  const storedToken = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(storedToken);
  const userID = decodedToken.id;
  useEffect(() => {
    setData(rowData);
  }, []);

  const handleYes = () => {
    const date = new Date();
const datePart = date.toDateString();
const timePart = date.toLocaleTimeString();

console.log(`Date: ${datePart}, Time: ${timePart}`);

    if (status == 2) {
      const payload = {
        loggedin_user_id: userID,
        sale_booking_id: data.sale_booking_id,
        sale_booking_execution_id: data.sale_booking_execution_id,
        // execution_date: "",
        // execution_remark: "helloo text",
        start_date_:new Date(),
        execution_status: 2,
        
      };
      axios
        .put(`http://44.211.225.140:8000/executionSummary`, payload)
        .then((res) => {
          console.log(res); 
          setReload((preVal) => !preVal);
        })
        .catch((err) => {
          console.log(err);
        });

        setOpen(false);
        setConfirmation(false);

        const payload1 = {
          loggedin_user_id: userID,
          sale_booking_id: data.sale_booking_id,
          execution_date: value?new Date(value).toLocaleDateString():new Date().toLocaleDateString(),
          execution_remark: "helloo text",
          start_date_:new Date().toLocaleDateString(),
          execution_status: 2,
        };
      axios
      .post(
        `https://production.sales.creativefuel.io/webservices/RestController.php?view=executionSummaryUpdate`, payload1)
      .then((res) => {
        console.log(res);
        setSnackbar({
          children: "Lead successfully assign",
          severity: "success",
        });
        setReload((preVal) => !preVal);
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({
          open: true,
          message: "Error Updating",
          severity: "error",
        });
      });
  
      setOpen(false);
      setConfirmation(false);
    } else if (status == 3) {
      const payload = {
        loggedin_user_id: userID,
        sale_booking_id: data.sale_booking_id,
        // execution_date: "",
        execution_remark: remark,
        execution_status: 3,
        start_date_:data.start_date_,
        sale_booking_execution_id: data.sale_booking_execution_id,
        end_date:new Date(),
      };
      axios
        .put(`http://44.211.225.140:8000/executionSummary`, payload)
        .then((res) => {
          console.log(res); 
          setReload((preVal) => !preVal);
        })
        .catch((err) => {
          console.log(err);
        });

        setOpen(false);
        setConfirmation(false);
        const payload1 = {
          loggedin_user_id: userID,
          sale_booking_id: data.sale_booking_id,
          execution_date: value?new Date(value).toLocaleDateString():new Date().toLocaleDateString(),
          execution_remark: "helloo text",
          start_date_:new Date().toLocaleDateString(),
          execution_status: 2,
        };
      axios
      .post(
        `https://production.sales.creativefuel.io/webservices/RestController.php?view=executionSummaryUpdate`, payload1)
      .then((res) => {
        console.log(res);
        setSnackbar({
          children: "Lead successfully assign",
          severity: "success",
        });
        setReload((preVal) => !preVal);
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({
          open: true,
          message: "Error Updating",
          severity: "error",
        });
      });
  
      setOpen(false);
      setConfirmation(false);
    } else  if (status == 1){
      const payload = {
        loggedin_user_id: userID,
        sale_booking_id: data.sale_booking_id,
        execution_date: value?value:new Date(),
        execution_remark:remark,
        execution_status: 1,
        start_date_:data.start_date_,
        end_date:new Date(),
        sale_booking_execution_id: data.sale_booking_execution_id,

      };
      axios
        .put(`http://44.211.225.140:8000/executionSummary`, payload)
        .then((res) => {
          console.log(res); 
          setReload((preVal) => !preVal);
        })
        .catch((err) => {
          console.log(err);
        });

        setOpen(false);
        setConfirmation(false);
        const payload1 = {
          loggedin_user_id: userID,
          sale_booking_id: data.sale_booking_id,
          execution_date: value?new Date(value).toLocaleDateString():new Date().toLocaleDateString(),
          execution_remark: remark,
          start_date_:new Date().toLocaleDateString(),
          execution_status: 2,
          
        };
      axios
      .post(
        `https://production.sales.creativefuel.io/webservices/RestController.php?view=executionSummaryUpdate`, payload1)
      .then((res) => {
        console.log(res);
        setSnackbar({
          children: "Lead successfully assign",
          severity: "success",
        });
        setReload((preVal) => !preVal);
      })
      .catch((err) => {
        console.log(err);
        setSnackbar({
          open: true,
          message: "Error Updating",
          severity: "error",
        });
      });
  
      setOpen(false);
      setConfirmation(false);
    }
    
  };
  const handleNo = () => {
    setOpen(false);
    setSnackbar(null);
    setConfirmation(false);
  };
  return (
    <Dialog
      maxWidth="xs"
      open={open}
      // TransitionProps={{ onEntered: handleEntered }}
      // open={!!promiseArguments}
    >
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent dividers>
        {`Pressing 'Yes' will Update the status.`}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleYes}>Yes</Button>
        <Button onClick={handleNo}>No</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirmation;