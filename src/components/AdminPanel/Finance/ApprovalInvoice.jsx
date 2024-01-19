import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useGlobalContext } from "../../../Context/Context";

const ApprovalInvoice = () => {
  const { toastAlert } = useGlobalContext();
  const [displaySeq, setDisplaySeq] = useState("");
  const [heading, setHeading] = useState("");
  const [headingDesc, setHeadingDesc] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("https://api-dot-react-migration-project.el.r.appspot.com/api/", {
      display_sequence: displaySeq,
    });

    toastAlert("Coc created");
    setIsFormSubmitted(true);
  };

  if (isFormSubmitted) {
    return <Navigate to="/admin/finance" />;
  }

  const handleDateChange = (e) => {};

  return (
    <>
      <h3>Approval Invoice</h3>
    </>
  );
};

export default ApprovalInvoice;
