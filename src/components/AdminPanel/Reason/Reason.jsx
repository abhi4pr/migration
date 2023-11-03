import { useState } from "react";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import jwtDecode from "jwt-decode";
import axios from "axios";

const Reason = () => {
  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserID = decodedToken.id;

  const [reason, setReason] = useState("");
  const [remark, setRemark] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://192.168.29.116:8080/api/add_reason", {
        created_by: loginUserID,
        reason: reason,
        remark: remark,
      })
      .then(() => setReason(""), setRemark(""));
  }
  return (
    <FormContainer
      mainTitle="Reason"
      title="Reason"
      handleSubmit={handleSubmit}
    >
      <FieldContainer
        label="Reason"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
      <FieldContainer
        label="Remark"
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
      />
    </FormContainer>
  );
};

export default Reason;
