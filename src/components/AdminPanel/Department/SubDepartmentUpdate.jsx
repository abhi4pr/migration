import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../../../Context/Context";

export default function SubDepartmentUpdate() {
  const { toastAlert } = useGlobalContext();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [subDepartmentName, setSubDepartmentName] = useState("");
  const [remark, setRemark] = useState("");
  const [departmentData, setDepartmentData] = useState([]);
  const [deptId, setDeptId] = useState(null);
  const { id } = useParams();

  function getData() {
    axios
      .get("http://34.93.135.33:8080/api/get_all_departments")
      .then((res) => {
        setDepartmentData(res.data);
      });

    axios
      .get(`http://34.93.135.33:8080/api/get_subdept_from_id/${id}`)
      .then((res) => {
        console.log(res.data.dept_id, "yha deta hai");
        setDeptId(res.data.dept_id);
        setRemark(res.data.remark);
        setSubDepartmentName(res.data.sub_dept_name);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    // sub_dept_name, dept_id, remark, last_updated_by {target by id}
    await axios.put(`http://34.93.135.33:8080/api/update_sub_department`, {
      id: Number(id),
      sub_dept_name: subDepartmentName,
      dept_id: Number(deptId),
      remark: remark,
    });
    setIsFormSubmitted(true);
    toastAlert("Submitted success");
  }
  if (isFormSubmitted) {
    return <Navigate to="/admin/sub-department-overview" />;
  }
  // console.log(deptId, "dept id hai yaha")
  return (
    <div>
      <>
        <FormContainer
          mainTitle="Sub-Department"
          title="Sub-Department Update"
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
            value={deptId}
            onChange={(e) => {
              setDeptId(e.target.value);
            }}
          >
            <option selected disabled value="">
              Choose...
            </option>
            {departmentData.map((option) => (
              <option key={option.dept_id} value={option.dept_id}>
                {option.dept_name}
              </option>
            ))}
          </FieldContainer>
          <FieldContainer
            label="Remark"
            // disabled
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
          />

          {/* {error && <p style={{ color: "red" }}>{error}</p>} */}
        </FormContainer>
      </>
    </div>
  );
}
