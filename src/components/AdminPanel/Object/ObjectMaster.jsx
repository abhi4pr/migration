import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useGlobalContext } from "../../../Context/Context";
const ObjectMaster = () => {
  const { toastAlert } = useGlobalContext();
  const [objectName, setObjectName] = useState("");
  const [softwareName, setSoftwareName] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [deptData, setDeptData] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  useEffect(() => {
    axios
      .get("http://44.211.225.140:8000/alldept")
      .then((res) => setDeptData(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://44.211.225.140:8000/obj", {
        obj_name: objectName,
        soft_name: softwareName,
        dept_id: selectedDepartment,
        created_by: userId,
      })
      .then(() => {
        setObjectName("");
        setSoftwareName("");
        setSelectedDepartment("");
        toastAlert("Form Submitted success");
        setIsFormSubmitted(true);
      });
  };

  if (isFormSubmitted) {
    return <Navigate to="/admin/object-overview" />;
  }
  return (
    <>
      <FormContainer
        mainTitle="Object"
        title="Object Master"
        handleSubmit={handleSubmit}
      >
        <FieldContainer
          label="Object Name"
          value={objectName}
          onChange={(e) => setObjectName(e.target.value)}
        />

        <FieldContainer
          label="Software Name"
          value={softwareName}
          onChange={(e) => setSoftwareName(e.target.value)}
        />

        <FieldContainer
          label="Department"
          Tag="select"
          className="form-select"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(Number(e.target.value))}
        >
          <option disabled selected value="">
            Choose...
          </option>
          {deptData.map((d) => (
            <option key={d.dept_id} value={d.dept_id}>
              {d.dept_name}
            </option>
          ))}
        </FieldContainer>
      </FormContainer>
    </>
  );
};

export default ObjectMaster;
