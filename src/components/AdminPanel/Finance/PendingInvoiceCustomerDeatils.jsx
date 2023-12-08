import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useGlobalContext } from "../../../Context/Context";
import DataTable from "react-data-table-component";

const PendingInvoiceCustomerDeatils = () => {
  
  const {cust_id} = useParams();
  const { toastAlert } = useGlobalContext();
  const [datas, setData] = useState([]);
  const [contextData, setDatas] = useState([]);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  function getData() {
    axios.get(`http://34.93.135.33:8080/api/get_all_php_payment_acc_data_customers/${cust_id}`).then((res) => {
      setData(res.data.data);
      // setFilterData(res.data.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <FormContainer
        mainTitle="Customer Details"
        title="Customer Detail"
        submitButton={false}
      >
        <div>Customer Type: {'data'} </div>
        <div>Customer Name: {'data'} </div>
        <div>Company Name: {'data'} </div>
        <div>GST Number: {'data'} </div>
        <div>Mobile: {'data'} </div>
        <div>Alternate Number: {'data'} </div>
        <div>Email: {'data'} </div>
        <div>Country: {'data'} </div>
        <div>State: {'data'} </div>
        <div>City: {'data'} </div>
        <div>Website: {'data'} </div>
        <div>Instagram username: {'data'} </div>
        <div>Category: {'data'} </div>
      </FormContainer>
    
    </>
  );
};

export default PendingInvoiceCustomerDeatils;