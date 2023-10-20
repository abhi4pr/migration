import { useEffect, useState } from "react";
import FieldContainer from "../FieldContainer";
import FormContainer from "../FormContainer";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../../Context/Context";

const DesignationUpdate = () => {
  const { toastAlert } = useGlobalContext();
  const [id, setID] = useState(0);
  const [designationName, setDesignationName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [remark, setRemark] = useState("");
  const [departmentdata, getDepartmentData] = useState([]);
  const { desi_id } = useParams();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    axios.get("http://44.211.225.140:8000/alldept").then((res) => {
      getDepartmentData(res.data);
    });

    axios.get(`http://44.211.225.140:8000/desi/${desi_id}`).then((res) => {
      const fetchedData = res.data.data;
      const { desi_id, desi_name, dept_id, remark } = fetchedData;

      setID(desi_id);
      setDesignationName(desi_name);
      setDepartmentName(dept_id);
      setRemark(remark);
    });
  }, [desi_id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put("http://44.211.225.140:8000/desidataupdate", {
      id: id,
      desi_name: designationName,
      dept_id: departmentName,
      remark: remark,
    });
    setDesignationName("");
    setDepartmentName("");
    setRemark("");

    toastAlert("Updated success");
    setIsFormSubmitted(true);
  };

  if (isFormSubmitted) {
    return <Navigate to="/admin/designation-overview" />;
  }
  return (
    <>
      <FormContainer
        mainTitle="Designation Update"
        title="Designation Update"
        handleSubmit={handleSubmit}
      >
        <FieldContainer
          label="Designation Name"
          value={designationName}
          onChange={(e) => setDesignationName(e.target.value)}
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
          {departmentdata.map((option) => (
            <option key={option.dept_id} value={option.dept_id}>
              {option.dept_name}
            </option>
          ))}
        </FieldContainer>
        <FieldContainer
          label="Remark"
          required={false}
          value={remark}
          Tag="textarea"
          onChange={(e) => setRemark(e.target.value)}
        />
      </FormContainer>
    </>
  );
};

export default DesignationUpdate;
