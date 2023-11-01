import { useEffect, useState } from "react";
import FieldContainer from "../FieldContainer";
import FormContainer from "../FormContainer";
import axios from "axios";
import { useGlobalContext } from "../../../Context/Context";
import { Navigate } from "react-router-dom";

const Designation = () => {
  const { toastAlert } = useGlobalContext();
  const [designationName, setDesignationName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  const [remark, setRemark] = useState("");
  const [departmentdata, getDepartmentData] = useState([]);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get("http://192.168.29.116:8080/api/get_all_departments")
      .then((res) => {
        getDepartmentData(res.data).catch((error) => console.log(error));
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://192.168.29.116:8080/api/add_designation", {
      desi_name: designationName,
      dept_id: departmentName,
      remark: remark,
    });
    setDesignationName("");
    setDepartmentName("");
    setRemark("");

    toastAlert("Submitted success");
    setIsFormSubmitted(true);
  };
  if (isFormSubmitted) {
    return <Navigate to="/admin/designation-overview" />;
  }
  return (
    <>
      <FormContainer
        mainTitle="Designation"
        title="Designation"
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
          fieldGrid={3}
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
          value={remark}
          required={false}
          Tag="textarea"
          onChange={(e) => setRemark(e.target.value)}
        />
      </FormContainer>
    </>
  );
};

export default Designation;
