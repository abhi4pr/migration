import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormContainer from "../AdminPanel/FormContainer";
import FieldContainer from "../AdminPanel/FieldContainer";
import { useGlobalContext } from "../../Context/Context";
import UserNav from "../Pantry/UserPanel/UserNav";

const SimUpdate = () => {
  const { toastAlert } = useGlobalContext();
  const [mobileNumber, setMobileNumber] = useState("");
  const [simType, setSimType] = useState("Physical Sim");
  const [status, setStatus] = useState("Available");

  const [simNumber, setSimNumber] = useState("");
  const [isValidcontact, setValidContact] = useState(true);
  const [isContactTouched, setisContactTouched] = useState(false);
  const [provider, setProvider] = useState("Jio");
  const [type, setType] = useState("Prepaid");
  const [remark, setRemark] = useState("");
  const [register, setRegister] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [other, setOther] = useState("");
  const [simData, setSimData] = useState([]);
  const [simId, setSimId] = useState(0);

  const [designation, setDesignation] = useState("");
  const [designationData, setDesignationData] = useState([]);

  const [department, setDepartment] = useState("");
  const [departmentdata, getDepartmentData] = useState([]);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://192.168.29.116:8080/api/get_all_designations")
      .then((res) => {
        setDesignationData(res.data.data);
      });

    axios
      .get("http://192.168.29.116:8080/api/get_all_departments")
      .then((res) => {
        getDepartmentData(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://192.168.29.116:8080/api/get_single_sim/${id}`)
      .then((res) => {
        const fetchedData = res.data.data;
        //if (fetchedData.length > 0) {

        const {
          mobileNumber,
          s_type,
          sim_no,
          provider,
          sim_id,
          status,
          type,
          desi,
          dept,
          Remarks,
          register,
        } = fetchedData;
        setMobileNumber(mobileNumber);
        setSimNumber(sim_no);
        setProvider(provider);
        setSimType(s_type);
        setStatus(status);
        setDepartment(dept);
        setDesignation(desi);
        setSimId(sim_id);
        setType(type);
        setRemark(Remarks);
        setRegister(register);
        //}
        setSimData(fetchedData);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValidcontact == true) {
      axios.put("http://192.168.29.116:8080/api/update_sim", {
        id: simId,
        mobilenumber: mobileNumber,
        sim_no: simNumber,
        provider: provider,
        status: status,
        dept_id: Number(department),
        desi_id: Number(designation),
        s_type: simType,
        type: type,
        remark: remark,
        createdBy: loginUserId,
        register: register,
      });
      setMobileNumber("");
      setStatus("");
      setSimType("");
      setSimNumber("");
      setProvider("");
      setRemark("");
      setDepartment("");
      setDesignation("");

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
    <div style={{ margin: "0 0 0 10%", width: "80%" }}>
      <UserNav />
      <FormContainer mainTitle="Sim" title="Sim" handleSubmit={handleSubmit}>
        <FieldContainer
          label="Mobile Number"
          type="number"
          value={mobileNumber}
          onChange={handleContactChange}
          onBlur={handleContentBlur}
        />
        {isContactTouched && !isValidcontact && (
          <p style={{ color: "red" }}>*Please enter a valid Number</p>
        )}

        <FieldContainer
          label="Sim Number"
          type="number"
          required={false}
          value={simNumber}
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
          label="Status"
          Tag="select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Available">Available</option>
          <option value="Allocated">Allocated</option>
          <option value="Disabled">Disabled</option>
          <option value="Returned">Returned</option>
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
          label="Remark"
          Tag="textarea"
          required={false}
          rows="3"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />

        <FieldContainer
          label="Register"
          Tag="select"
          value={register}
          onChange={(e) => setRegister(e.target.value)}
        >
          <option value="">Please Select</option>
          <option value="CreativeFuel">CreativeFuel</option>
          <option value="">Other</option>
        </FieldContainer>

        {register !== "CreativeFuel" && (
          <FieldContainer
            label="Other"
            type="text"
            value={register}
            onChange={(e) => setRegister(e.target.value)}
          />
        )}
      </FormContainer>
    </div>
  );
};

export default SimUpdate;
