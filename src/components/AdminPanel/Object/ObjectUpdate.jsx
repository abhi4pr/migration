import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useGlobalContext } from "../../../Context/Context";

function ObjectUpdate() {
  const { id } = useParams();
  const { toastAlert } = useGlobalContext();
  const [objData, setObjData] = useState([]);
  const [objectName, setObjectName] = useState("");
  const [softwareName, setSoftwareName] = useState("");
  const [deptData, setDeptData] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  useEffect(() => {
    axios
      .get(`https://api-dot-react-migration-project.el.r.appspot.com/api/objdata/${id}`)
      .then((res) => {
        const data = res.data.data;
        setObjData(data);
        setObjectName(data.obj_name);
        setSoftwareName(data.soft_name);
        setSelectedDepartment(data.Dept_id);
      })
      .catch((error) => console.error(error));
    axios
      .get("https://api-dot-react-migration-project.el.r.appspot.com/api/get_all_departments")
      .then((res) => setDeptData(res.data));
  }, [id]);
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://api-dot-react-migration-project.el.r.appspot.com/api/obj_update`, {
      obj_id: id,
      soft_name: softwareName,
      obj_name: objectName,
      dept_id: selectedDepartment,
      Last_updated_by: userId,
    });
    setObjectName("");
    setSoftwareName("");
    setSelectedDepartment("");

    toastAlert("Form Submitted success");
    setIsFormSubmitted(true);
  };

  function handleDepartment(e) {
    setSelectedDepartment(Number(e.target.value));
  }
  if (isFormSubmitted) {
    return <Navigate to="/admin/object-overview" />;
  }
  return (
    <>
      <FormContainer
        mainTitle="Object"
        title="Object Update"
        handleSubmit={handleSubmit}
      >
        <FieldContainer
          label="Object Name"
          value={objectName}
          onChange={(e) => setObjectName(e.target.value)}
        />
        <FieldContainer
          label="Software name"
          value={softwareName}
          onChange={(e) => setSoftwareName(e.target.value)}
        />

        <FieldContainer
          Tag="select"
          value={selectedDepartment}
          onChange={handleDepartment}
        >
          {deptData.map((d) => (
            <option key={d.dept_id} value={d.dept_id}>
              {d.dept_name}
            </option>
          ))}
        </FieldContainer>
      </FormContainer>
    </>
  );
}

export default ObjectUpdate;
