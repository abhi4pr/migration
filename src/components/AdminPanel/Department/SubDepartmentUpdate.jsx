import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useGlobalContext } from "../../../Context/Context";
import { useAPIGlobalContext } from "../APIContext/APIContext";
import Select from "react-select";

export default function SubDepartmentUpdate() {
  const { toastAlert } = useGlobalContext();
  const { DepartmentContext } = useAPIGlobalContext();

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [subDepartmentName, setSubDepartmentName] = useState("");
  const [remark, setRemark] = useState("");
  // const [departmentData, setDepartmentData] = useState([]);
  const [deptId, setDeptId] = useState(null);
  const { id } = useParams();

  function getData() {
    // axios
    //   .get("http://34.93.135.33:8080/api/get_all_departments")
    //   .then((res) => {
    //     setDepartmentData(res.data);
    //   });

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

  const departmentOptions = DepartmentContext.map((option) => ({
    value: option.dept_id,
    label: option.dept_name,
  }));

  const selectedDepartment =
    departmentOptions.find((option) => option.value === deptId) || null;
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

          <div className="form-group col-6">
            <label className="form-label">
              Department Name <sup style={{ color: "red" }}>*</sup>
            </label>
            <Select
              options={departmentOptions}
              value={selectedDepartment}
              onChange={(selectedOption) =>
                setDeptId(selectedOption ? selectedOption.value : null)
              }
            />
          </div>
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
