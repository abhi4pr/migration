import React from "react";

const InvoiceTemplate1 = ({ data }) => {
  return (
    <div>
      <h1>Invoice Template 1</h1>
      <p>{data.net_salary}</p>
      <p>Invoice: {data?.attendence_id}</p>
      <p>Date:{data?.Creation_date.split("T")[0]}</p>
      <p>Name: {data?.user_name}</p>
      <p>Address: {data?.current_address}</p>
      <p>To pay: {data?.toPay}</p>
      <p>ID: {data?.id}</p>
      <p>Description: {data.description}</p>
    </div>
  );
};

export default InvoiceTemplate1;
