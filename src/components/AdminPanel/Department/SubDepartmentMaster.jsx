import React, { useState } from "react";
import FieldContainer from "../FieldContainer";
import FormContainer from "../FormContainer";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../../Context/Context";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useAPIGlobalContext } from "../APIContext/APIContext";

export default function SubDepartmentMaster() {
  const { DepartmentContext } = useAPIGlobalContext();
  const { toastAlert } = useGlobalContext();
  const [subDepartmentName, setSubDepartmentName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [remark, setRemark] = useState("");

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  // const [departmentdata, getDepartmentData] = useState([]);
  // useEffect(() => {
  //   axios.get("http://44.211.225.140:8000/alldept").then((res) => {
  //     getDepartmentData(res.data).catch((error) => console.log(error));
  //   });
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://44.211.225.140:8000/subdept", {
      sub_dept_name: subDepartmentName,
      dept_id: departmentName,
      remark: remark,
      created_by: loginUserId,
    });
    setSubDepartmentName("");
    setDepartmentName("");
    setRemark("");

    toastAlert("Submitted success");
    setIsFormSubmitted(true);
  };
  if (isFormSubmitted) {
    return <Navigate to="/admin/sub-department-overview" />;
  }
  return (
    <>
      <FormContainer
        mainTitle="Sub-Department"
        title="Sub-Department"
        handleSubmit={handleSubmit}
      >
        <FieldContainer
          label="Sub-Department Name"
          value={subDepartmentName}
          onChange={(e) => setSubDepartmentName(e.target.value)}
        />
        <FieldContainer
          Tag="select"
          label="Department Name"
          fieldGrid={6}
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
        >
          <option selected disabled value="">
            Choose...
          </option>
          {DepartmentContext.map((option) => (
            <option key={option.dept_id} value={option.dept_id}>
              {option.dept_name}
            </option>
          ))}
        </FieldContainer>

        <FieldContainer
          label="Remark"
          value={remark}
          required={false}
          Tag="textarea"
          onChange={(e) => setRemark(e.target.value)}
        />
      </FormContainer>
    </>
  );
}
