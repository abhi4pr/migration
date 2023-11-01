import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useGlobalContext } from "../../../Context/Context";

const DepartmentMaster = () => {
  const { toastAlert } = useGlobalContext();
  const [departmentName, setDepartmentName] = useState("");
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    axios
      .post("http://192.168.29.116:8080/api/add_department", {
        dept_name: departmentName,
        remark: remark,
      })
      .then(() => {
        setDepartmentName("");
        setRemark("");
      })
      .catch((error) => {
        setError("An error occurred while submitting the form.");
        console.error(error);
      });
    setDepartmentName("");
    setRemark("");

    toastAlert("Submitted success");
    setIsFormSubmitted(true);
  };

  if (isFormSubmitted) {
    return <Navigate to="/admin/department-overview" />;
  }

  return (
    <>
      <FormContainer
        mainTitle="Department"
        title="Department"
        handleSubmit={handleSubmit}
      >
        <FieldContainer
          label="Deparment Name"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        />
        <FieldContainer
          label="Remark"
          Tag="textarea"
          value={remark}
          required={false}
          onChange={(e) => setRemark(e.target.value)}
        />
        {error && <p style={{ color: "red" }}>{error}</p>}
      </FormContainer>
    </>
  );
};

export default DepartmentMaster;
