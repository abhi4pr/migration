import { useState } from "react";
import FieldContainer from "../../FieldContainer";
import FormContainer from "../../FormContainer";
import Select from "react-select";
import { useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";

const BillingUpdate = () => {
  const { id } = useParams();
  const [bilingName, setBillingName] = useState("");
  const [department, setDepartment] = useState("");
  const [departmentdata, getDepartmentData] = useState([]);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get("http://192.168.29.116:8080/api/get_all_departments")
      .then((res) => {
        getDepartmentData(res.data);
      });

    axios.get(`http://44.211.225.140:8000/billingheader/${id}`).then((res) => {
      const fetchData = res.data;

      const [{ billing_header_name, dept_id }] = fetchData;
      setBillingName(billing_header_name);
      setDepartment(dept_id);
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put("http://44.211.225.140:8000/billingheader", {
      billing_id: id,
      billing_header_name: bilingName,
      dept_id: department,
    });
    setIsFormSubmitted(true);
  };

  if (isFormSubmitted) {
    return <Navigate to="/admin/billing-overview" />;
  }

  return (
    <>
      <FormContainer
        mainTitle="Billing Update"
        title="Billing"
        handleSubmit={handleSubmit}
      >
        <FieldContainer
          label="Billing Header Name"
          value={bilingName}
          onChange={(e) => setBillingName(e.target.value)}
        />

        <div className="form-group col-6">
          <label className="form-label">
            Department Name <sup style={{ color: "red" }}>*</sup>
          </label>
          <Select
            className=""
            options={departmentdata.map((option) => ({
              value: option.dept_id,
              label: `${option.dept_name}`,
            }))}
            value={{
              value: department,
              label:
                departmentdata.find((user) => user.dept_id === department)
                  ?.dept_name || "",
            }}
            onChange={(e) => {
              setDepartment(e.value);
            }}
            required
          />
        </div>
      </FormContainer>
    </>
  );
};

export default BillingUpdate;
