import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Navigate } from "react-router-dom";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useGlobalContext } from "../../../Context/Context";
import Select from "react-select";
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
      .get("https://jarvis-work-backend.onrender.com/api/get_all_departments")
      .then((res) => setDeptData(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://jarvis-work-backend.onrender.com/api/add_obj", {
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

        {/* <FieldContainer
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
        </FieldContainer> */}
        <div className="form-group col-6">
          <label className="form-label">
            Department <sup style={{ color: "red" }}>*</sup>
          </label>
          <Select
            options={deptData.map((option) => ({
              value: option.dept_id,
              label: `${option.dept_name}`,
            }))}
            value={{
              value: selectedDepartment,
              label:
                deptData.find((user) => user.dept_id === selectedDepartment)
                  ?.dept_name || "",
            }}
            onChange={(e) => {
              setSelectedDepartment(e.value);
            }}
            required
          />
        </div>
      </FormContainer>
    </>
  );
};

export default ObjectMaster;
