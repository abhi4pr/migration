import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormContainer from "../AdminPanel/FormContainer";
import FieldContainer from "../AdminPanel/FieldContainer";
import { useGlobalContext } from "../../Context/Context";
import UserNav from "../Pantry/UserPanel/UserNav";

const SimMaster = () => {
  const { toastAlert } = useGlobalContext();
  const [mobileNumber, setMobileNumber] = useState("");
  const [simNumber, setSimNumber] = useState("");
  const [isValidcontact, setValidContact] = useState(false);
  const [isContactTouched, setisContactTouched] = useState(false);
  const [provider, setProvider] = useState("Vodafone Idea (VI)");
  const [type, setType] = useState("Prepaid");
  const [simType, setSimType] = useState("Physical Sim");

  const [designation, setDesignation] = useState("");
  const [designationData, setDesignationData] = useState([]);

  const [department, setDepartment] = useState("");
  const [departmentdata, getDepartmentData] = useState([]);

  const [remark, setRemark] = useState("");
  const [register, setRegister] = useState("CreativeFuel");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [other, setOther] = useState("");

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  useEffect(() => {
    axios
      .get("http://192.168.29.116:8080/api/get_all_departments")
      .then((res) => {
        getDepartmentData(res.data);
      });

    axios
      .get("http://192.168.29.116:8080/api/get_all_designations")
      .then((res) => {
        setDesignationData(res.data.data);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidcontact == true) {
      axios.post("http://192.168.29.116:8080/api/add_sim", {
        mobileNumber: mobileNumber,
        sim_no: simNumber,
        provider: provider,
        status: "Available",
        s_type: simType,
        dept_id: Number(department),
        desi_id: Number(designation),
        type: type,
        remark: remark,
        created_by: loginUserId,
        register: register,
        other: other,
      });
      setMobileNumber("");
      setSimType("");
      setSimNumber("");
      setProvider("");
      setDepartment("");
      setDesignation("");
      setRemark("");
      setRegister("");

      toastAlert("Form Submitted success");
      setIsFormSubmitted(true);
    } else {
      alert("Enter Sim Number in Proper Format");
    }
  };

  function handleContactChange(event) {
    const newContact = event.target.value;
    setMobileNumber(newContact);

    if (newContact === "") {
      setValidContact(false);
    } else {
      setValidContact(/^(\+91[ \-\s]?)?[0]?(91)?[6789]\d{9}$/.test(newContact));
    }
  }

  function handleContentBlur() {
    setisContactTouched(true);
    if (mobileNumber.length < 10) {
      setValidContact(false);
    }
  }

  if (isFormSubmitted) {
    return <Navigate to="/sim-overview" />;
  }
  return (
    <div style={{ width: "80%", margin: "0 0 0 10%" }}>
      <UserNav />
      <FormContainer mainTitle="Sim" title="Sim" handleSubmit={handleSubmit}>
        <FieldContainer
          label="Mobile Number"
          type="number"
          value={mobileNumber}
          onChange={handleContactChange}
          onBlur={handleContentBlur}
        />
        {(isContactTouched || mobileNumber.length >= 10) && !isValidcontact && (
          <p style={{ color: "red" }}>*Please enter a valid Number</p>
        )}

        <FieldContainer
          label="Sim Number"
          type="number"
          value={simNumber}
          required={false}
          onChange={(e) => setSimNumber(e.target.value)}
        />

        <FieldContainer
          label="Provider"
          Tag="select"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
        >
          <option value="Jio">Jio</option>
          <option value="Airtel">Airtel</option>
          <option value="Vodafone Idea (VI)">Vodafone Idea (VI)</option>
          <option value="BSNL">BSNL</option>
        </FieldContainer>

        <FieldContainer
          label="Type"
          Tag="select"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Prepaid">Prepaid</option>
          <option value="Postpaid">Postpaid</option>
        </FieldContainer>

        <FieldContainer
          label="Sim Type"
          Tag="select"
          value={simType}
          onChange={(e) => setSimType(e.target.value)}
        >
          <option value="Physical Sim">Physical Sim</option>
          <option value="E-Sim">E-Sim</option>
        </FieldContainer>

        <FieldContainer
          Tag="select"
          label="Department Name"
          fieldGrid={3}
          value={department}
          required={false}
          onChange={(e) => setDepartment(e.target.value)}
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
          label="Designation"
          Tag="select"
          value={designation}
          fieldGrid={3}
          required={false}
          onChange={(e) => setDesignation(e.target.value)}
        >
          <option selected disabled value="">
            Choose...
          </option>
          {designationData.map((option) => (
            <option key={option.desi_id} value={option.desi_id}>
              {option.desi_name}
            </option>
          ))}
        </FieldContainer>

        <FieldContainer
          label="Register"
          Tag="select"
          value={register}
          onChange={(e) => setRegister(e.target.value)}
        >
          <option value="CreativeFuel">CreativeFuel</option>
          <option value={other}>Other</option>
        </FieldContainer>

        {register !== "CreativeFuel" && (
          <FieldContainer
            label="Other"
            type="text"
            // value={other}
            onChange={(e) => setOther(e.target.value)}
          />
        )}

        <FieldContainer
          label="Remark"
          Tag="textarea"
          rows="3"
          value={remark}
          required={false}
          onChange={(e) => setRemark(e.target.value)}
        />
      </FormContainer>
    </div>
  );
};

export default SimMaster;
