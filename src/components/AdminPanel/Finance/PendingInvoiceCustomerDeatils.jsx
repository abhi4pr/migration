import React from "react";
import FormContainer from "../FormContainer";
const PendingInvoiceCustomerDeatils = () => {
  return (
    <>
      <FormContainer
        mainTitle="Customer Details"
        title="Customer Detail"
        submitButton={false}
      >
        <div>Customer Type:</div>
        <div>Customer Name:</div>
        <div>Company Name:</div>
        <div>GST Number:</div>
        <div>Mobile:</div>
        <div>Alternate Number:</div>
        <div>Email:</div>
        <div>Country: India</div>
        <div>State: Andhra Pradesh</div>
        <div>City:</div>
        <div>Website:</div>
        <div>Instagram username:</div>
        <div>Category: Dating & Matchmaking Remarks</div>
      </FormContainer>
    </>
  );
};

export default PendingInvoiceCustomerDeatils;
