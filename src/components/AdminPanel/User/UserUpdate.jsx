import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useGlobalContext } from "../../../Context/Context";
import { AiOutlineReload } from "react-icons/ai";
import Select from "react-select";
import jwtDecode from "jwt-decode";
import WhatsappAPI from "../../WhatsappAPI/WhatsappAPI";

const colourOptions = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi" },
  { value: "Other", label: "Other" },
];

const UserUpdate = () => {
  const whatsappApi = WhatsappAPI();
  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;
  const { id } = useParams();
  const { toastAlert } = useGlobalContext();
  const [username, setUserName] = useState("");

  const [roles, setRoles] = useState("");
  const [roledata, getRoleData] = useState([]);

  const [reportL1, setReportL1] = useState("");
  const [reportL2, setReportL2] = useState("");
  const [reportL3, setReportL3] = useState("");

  const [profile, setProfile] = useState([]);

  const [email, setEmail] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const [contact, setContact] = useState("");
  const [personalContact, setPersonalContact] = useState();
  const [isValidcontact, setValidContact] = useState(true);
  const [isValidcontact1, setValidContact1] = useState(true);
  const [isContactTouched, setisContactTouched] = useState(false);
  const [isContactTouched1, setisContactTouched1] = useState(false);

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [incomingPassword, setIncomingPassword] = useState("");

  const [jobType, setJobType] = useState("");
  const [sitting, setSitting] = useState("");
  const [roomId, setRoomId] = useState("");
  const [refrenceData, setRefrenceData] = useState([]);

  const [department, setDepartment] = useState("");
  const [departmentdata, getDepartmentData] = useState([]);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [usersData, getUsersData] = useState([]);

  const [designation, setDesignation] = useState("");
  const [designationData, setDesignationData] = useState([]);

  const [uid, setUID] = useState({ name: "sumit.jpg" });
  const [panUpload, setPanUpload] = useState("");
  const [highestUpload, setHighestUpload] = useState("");
  const [otherUpload, setOtherUpload] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [releavingDate, setReleavingDate] = useState("");
  const [salary, setSalary] = useState(0);
  const [incomingUserStatus, setIncomingUserStatus] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);
  const [tempLanguage, setTempLanguage] = useState([]);
  const [speakingLanguage, setSpeakingLanguage] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationality, setNationality] = useState("Indian");

  const [age, setAge] = useState(0);

  const [FatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [maritialStatus, setMaritialStatus] = useState("");
  const [dateOfMarraige, setDateOfMarraige] = useState("");
  const [error, setError] = useState("");

  // TDS State
  const [tdsApplicable, setTdsApplicable] = useState("No");
  const [tdsPercentage, setTdsPercentage] = useState(0);
  const [showTdsPercentage, setShowTdsPercentage] = useState(false);
  const [panNo, setPanNo] = useState("");
  const [uidNo, setUidNo] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const [otherDocuments, setOtherDocuments] = useState();
  const [subDepartmentData, setSubDepartmentData] = useState([]);
  const [subDepartment, setSubDeparment] = useState([]);
  const [higestQualification, setHigestQualification] = useState("");
  const [isValidPAN, setIsValidPAN] = useState(true);
  const [isValidUID, setIsValidUID] = useState(true); // State to track UID validation
  const [defaultSeatData, setDefaultSeatData] = useState([]);
  const higestQualificationData = [
    "10th",
    "12th",
    "Diploma",
    "Graduation",
    "Post Graduation",
    "Other",
  ];
  const jobTypeData = ["WFO", "WFH"];
  const genderData = ["Male", "Female", "Other"];
  const bloodGroupData = [
    "A+ (A Positive)",
    "A- (A Negetive)",
    "B+ (B Positive)",
    "B- (B Negetive)",
    "AB+ (AB Positive)",
    "AB- (AB Negetive)",
    "O+ (O Positive)",
    "O- (O Negetive)",
  ];
  const tdsApplicableData = ["Yes", "No"];
  const statusData = ["Active", "Exit", "On Leave", "Resign"];
  const maritialStatusData = ["Married", "Unmarried"];
  const handlePANChange = (e) => {
    const inputPAN = e.target.value.toUpperCase();
    setPanNo(inputPAN);

    // Validate PAN when input changes
    const isValid = validatePAN(inputPAN);
    setIsValidPAN(isValid);
  };
  // Function to validate PAN
  const validatePAN = (pan) => {
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panPattern.test(pan);
  };
  const handleUIDInputChange = (e) => {
    const inputUID = e.target.value;
    setUidNo(inputUID);

    // Validate Aadhaar number when input changes
    const isValid = validateAadhaarNumber(inputUID);
    setIsValidUID(isValid);
  };
  // Function to validate Aadhaar number (UID)
  const validateAadhaarNumber = (uid) => {
    // Aadhaar number format: 12 digits
    const uidPattern = /^\d{12}$/;
    return uidPattern.test(uid);
  };
  // const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);

  // const [speakingLanguage, setSpeakingLanguage] = useState("");
  // const [gender, setGender] = useState("");
  // const [dateOfBirth, setDateOfBirth] = useState("");
  // const [nationality, setNationality] = useState("Indian");

  // const [age, setAge] = useState(0);

  // const [FatherName, setFatherName] = useState("");
  // const [motherName, setMotherName] = useState("");
  // const [hobbies, setHobbies] = useState("");
  // const [bloodGroup, setBloodGroup] = useState("");
  // const [maritialStatus, setMaritialStatus] = useState("");
  // const [dateOfMarraige, setDateOfMarraige] = useState("");
  // const [error, setError] = useState("");

  // // TDS State
  // const [tdsApplicable, setTdsApplicable] = useState("No");
  // const [tdsPercentage, setTdsPercentage] = useState(0);
  // const [showTdsPercentage, setShowTdsPercentage] = useState(false);

  useEffect(() => {
    const selectedOption = defaultSeatData.find(
      (option) => option?.sitting_id === Number(sitting)
    );
    setRoomId(selectedOption);
  }, [sitting, refrenceData, roomId]);

  useEffect(() => {
    axios
      .get(`http://34.93.135.33:8080/api/get_subdept_from_dept/${department}`)
      .then((res) => setSubDepartmentData(res.data));
  }, [department]);

  useEffect(() => {
    if (tdsApplicable === "Yes") {
      setShowTdsPercentage(true);
    } else {
      setShowTdsPercentage(false);
    }
  }, [tdsApplicable]);

  useEffect(() => {
    axios
      .get("http://34.93.135.33:8080/api/get_all_roles")
      .then((res) => {
        getRoleData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://34.93.135.33:8080/api/get_all_departments")
      .then((res) => {
        getDepartmentData(res.data);
      });

    axios.get("http://44.211.225.140:8000/notallocsitting").then((res) => {
      setRefrenceData(res.data.data);
    });

    axios.get("http://34.93.135.33:8080/api/get_all_sittings").then((res) => {
      setDefaultSeatData(res.data.data);
    });

    axios.get("http://44.211.225.140:8000/allusers").then((res) => {
      getUsersData(res.data.data);
    });

    axios
      .get("http://34.93.135.33:8080/api/get_all_designations")
      .then((res) => {
        setDesignationData(res.data.data);
      });
  }, []);

  function getOtherDocument() {
    axios
      .get(`http://44.211.225.140:8000/allusersotherfielddata/${id}`)
      .then((res) => {
        setOtherDocuments(res.data.data);
      });
  }

  useEffect(() => {
    axios
      .get(`http://44.211.225.140:8000/usernew/${id}`)
      .then((res) => {
        const fetchedData = res.data;

        const {
          user_name,
          role_id,
          user_email_id,
          user_contact_no,
          user_login_id,
          user_login_password,
          sitting_id,
          room_id,
          dept_id,
          job_type,
          Report_L1,
          Report_L2,
          Report_L3,
          PersonalEmail,
          PersonalNumber,
          user_designation,
          UID,
          pan,
          highest_upload,
          other_upload,
          joining_date,
          releaving_date,
          salary,
          SpokenLanguages,
          Gender,
          Nationality,
          DOB,
          user_status,
          Age,
          fatherName,
          motherName,
          Hobbies,
          BloodGroup,
          MartialStatus,
          DateOfMarriage,
          tbs_applicable,
          tds_per,
          pan_no,
          uid_no,
          spouse_name,
          sub_dept_id,
          highest_qualification_name,
        } = fetchedData;
        setPanNo(pan_no);
        setUidNo(uid_no);
        setSpouseName(spouse_name);
        setUserName(user_name);
        setUserStatus(user_status);
        setIncomingUserStatus(user_status);
        setEmail(user_email_id);
        setLoginId(user_login_id);
        setContact(user_contact_no);
        setPassword(user_login_password);
        setIncomingPassword(user_login_password);
        setRoles(role_id);
        setDepartment(dept_id);
        setSitting(sitting_id);
        setRoomId(room_id);
        setPersonalContact(PersonalNumber);
        setPersonalEmail(PersonalEmail);
        setJobType(job_type);
        setReportL1(Report_L1);
        setReportL2(Report_L2);
        setReportL3(Report_L3);
        setDesignation(user_designation);
        setUID(UID);
        setPanUpload(pan);
        setHighestUpload(highest_upload);
        setOtherUpload(other_upload);
        setJoiningDate(joining_date?.split("T")?.[0]);
        setReleavingDate(releaving_date?.split("T")?.[0]);
        setSalary(salary);
        setSpeakingLanguage(SpokenLanguages);
        setGender(Gender);
        setNationality(Nationality);
        setDateOfBirth(DOB.split("T")?.[0]);
        setAge(Age);
        setFatherName(fatherName);
        setMotherName(motherName);
        setHobbies(Hobbies);
        setBloodGroup(BloodGroup);
        setMaritialStatus(MartialStatus);
        setDateOfMarraige(DateOfMarriage);
        setTdsApplicable(tbs_applicable);
        setTdsPercentage(tds_per);
        setSubDeparment(sub_dept_id);
        setHigestQualification(highest_qualification_name);
        // set;
      })
      .then(() => {
        // console.log(uid, "yee get ke bd hai");
      });
    getOtherDocument();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("user_status", userStatus);
    formData.append("id", id);
    formData.append("user_name", username);
    formData.append("role_id", roles);
    formData.append("image", profile);
    formData.append("user_email_id", email);
    formData.append("user_login_id", loginId);
    formData.append("user_login_password", password);
    formData.append("user_contact_no", contact);
    formData.append("sitting_id", sitting);
    formData.append("room_id", roomId.room_id);
    // console.log("room id he yha", roomId);
    // formData.append("room_id", roomId);
    formData.append("dept_id", department);
    formData.append("job_type", jobType);
    formData.append("personal_number", personalContact);
    formData.append("Personal_email", personalEmail);
    formData.append("report_L1", Number(reportL1));
    formData.append("report_L2", Number(reportL2));
    formData.append("report_L3", Number(reportL3));
    formData.append("user_designation", designation);

    formData.append("UID", uid);
    formData.append("pan", panUpload);
    formData.append("highest_upload", highestUpload);
    formData.append("other_upload", otherUpload);
    formData.append("joining_date", joiningDate);
    formData.append("releaving_date", releavingDate);
    formData.append("salary", Number(salary));

    formData.append("SpokenLanguages", speakingLanguage);
    formData.append("Gender", gender);

    formData.append("Nationality", nationality);
    formData.append("DOB", dateOfBirth);
    formData.append("Age", age);
    formData.append("FatherName", FatherName);
    formData.append("MotherName", motherName);
    formData.append("Hobbies", hobbies);
    formData.append("BloodGroup", bloodGroup);
    formData.append("MartialStatus", maritialStatus);
    formData.append("DateofMarriage", dateOfMarraige);

    formData.append("tds_applicable", tdsApplicable);
    formData.append("tds_per", tdsPercentage);
    formData.append("pan_no", panNo);
    formData.append("uid_no", uidNo);
    // formData.append("spouse_name", spouseName);
    formData.append("sub_dept_id", subDepartment);
    formData.append("highest_qualification_name", higestQualification);
    const formDataa = new FormData();
    if (isValidcontact == true && validEmail == true) {
      axios.put(`http://44.211.225.140:8000/userupdate`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (incomingPassword !== password) {
        whatsappApi.callWhatsAPI(
          "User Password Update by Admin",
          contact,
          username,
          [loginId, password, "http://jarviscloud.in/"]
        );
      }

      if (incomingUserStatus !== userStatus) {
        whatsappApi.callWhatsAPI("User Status Change", contact, username, [
          username,
          userStatus,
        ]);
      }

      for (const element of otherDocuments) {
        formDataa.append("id", element.id);
        formDataa.append("field_name", element.field_name);
        formDataa.append("lastupdated_by", loginUserId);
        formDataa.append("field_value", element.field_value);
        axios.put(
          `http://44.211.225.140:8000/updateuserotherfielddata/${id}`,
          // {
          //   id:element.id,
          //   field_name: element.field_name,
          //   lastUpdatedBy: loginUserId,
          //   field_value: element.field_value,
          // }
          formDataa,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        formDataa.delete("id");
        formDataa.delete("field_name");
        formDataa.delete("lastupdated_by");
        formDataa.delete("field_value");
      }

      // console.log(uid, "yha uid hai put ke bad");
      // console.log(panUpload, "pan hai yha");
      // axios
      //   .post("http://44.211.225.140:8000/mail2", {
      //     email: email,
      //     subject: "User Registration",
      //     text: "A new user has been registered.",
      //     attachment: profile,
      //     login_id: loginId,
      //     name: username,
      //     password: password,
      //   })
      //   .then((res) => {
      //     console.log("Email sent successfully:", res.data);
      //   })
      //   .catch((error) => {
      //     console.log("Failed to send email:", error);
      //   });

      toastAlert("User Update");
      setIsFormSubmitted(true);
    } else {
      if (contact.length !== 10) {
        if (isValidcontact == false)
          alert("Enter Phone Number in Proper Format");
      } else if (validEmail != true) {
        alert("Enter Valid Email");
      }
    }
  };

  function handleLanguageSelect(selectedOption) {
    setTempLanguage(selectedOption);
  }

  useEffect(() => {
    const test = tempLanguage?.map((option) => option.value).join();
    setSpeakingLanguage(test);
  }, [tempLanguage]);
  function otherDocumentNameChangeHandle(e, index) {
    setOtherDocuments((prev) => {
      const newOtherDocuments = [...prev];
      newOtherDocuments[index] = {
        ...newOtherDocuments[index],
        field_name: e.target.value,
      };
      return newOtherDocuments;
    });
  }
  const otherDocumentImageChangeHandler = (e, index) => {
    otherDocuments[index] = {
      ...otherDocuments[index],
      field_value: e.target.files[0],
    };
  };
  const handleAccordionButtonClick = (index) => {
    // {
    setActiveAccordionIndex(index);
    //     alert("fill all the fields");
    // }
  };

  // const handleFileChange = (e) => {
  //   if (e.target.files.length > 0) {
  //     setProfile(e.target.files[0]);
  //     setUID(e.target.files[0]);
  //     setPanUpload(e.target.files[0]);
  //     setHighestUpload(e.target.files[0]);
  //     setOtherUpload(e.target.files[0]);
  //   } else {
  //     setProfile(null);
  //     setUID(null);
  //     setPanUpload(null);
  //     setHighestUpload(null);
  //     setOtherUpload(null);
  //   }
  // };

  // Number validation
  function handleEmailChange(e) {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail === "") {
      setValidEmail(false);
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setValidEmail(emailRegex.test(newEmail));
    }
  }

  function handleContactChange(event) {
    const newContact = event.target.value;
    setContact(newContact);

    if (newContact === "") {
      setValidContact(false);
    } else {
      setValidContact(/^(\+91[ \-\s]?)?[0]?(91)?[6789]\d{9}$/.test(newContact));
    }
  }

  function handlePersonalContactChange(event) {
    const newContact1 = event.target.value;
    setPersonalContact(newContact1);

    if (newContact1 === "") {
      setValidContact1(false);
    } else {
      setValidContact1(
        /^(\+91[ \-\s]?)?[0]?(91)?[6789]\d{9}$/.test(newContact1)
      );
    }
  }

  function handleContentBlur() {
    setisContactTouched(true);
    setisContactTouched1(true);
    if (contact.length < 10) {
      setValidContact(false);
      setValidContact1(false);
    }
  }

  // After form submittion navigate
  if (isFormSubmitted) {
    return <Navigate to="/admin/user-overview" />;
  }

  // Password Auto Genrate
  const generatePassword = () => {
    const length = 8;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let generatePassword = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatePassword += charset[randomIndex];
    }
    setPassword(generatePassword);
  };

  const generateLoginId = () => {
    const randomSuffix = Math.floor(Math.random() * 1000);
    const generatedLoginId = `${username}@${randomSuffix}`;
    setLoginId(generatedLoginId);
  };

  const handleLoginIdChange = (event) => {
    const selectedLoginId = event.target.value;
    setLoginId(selectedLoginId);
  };
  const calculateAge = (selectedDate) => {
    const today = new Date();
    const birthDate = new Date(selectedDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
  };
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDateOfBirth(selectedDate);
    calculateAge(selectedDate);

    // calculateAge(selectedDate);
  };

  const accordionButtons = ["Genral", "Personal", "Salary", "Documents"];

  const genralFields = (
    <>
      <FieldContainer
        label="Full Name *"
        fieldGrid={3}
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />

      <div className="form-group col-3">
        <label className="form-label">
          Designation <sup style={{ color: "red" }}>*</sup>
        </label>
        <Select
          className=""
          options={designationData.map((option) => ({
            value: option.desi_id,
            label: `${option.desi_name}`,
          }))}
          value={{
            value: designation,
            label:
              designationData.find((user) => user.desi_id == designation)
                ?.desi_name || "",
          }}
          onChange={(e) => {
            setDesignation(e.value);
          }}
          required
        />
      </div>

      <div className="form-group col-3">
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
      <div className="form-group col-3">
        <label className="form-label">
          Sub Department <sup style={{ color: "red" }}>*</sup>
        </label>
        <Select
          className=""
          options={subDepartmentData.map((option) => ({
            value: option.id,
            label: `${option.sub_dept_name}`,
          }))}
          value={{
            value: subDepartmentData,
            label:
              subDepartmentData.find((user) => user.id === subDepartment)
                ?.sub_dept_name || "",
          }}
          onChange={(e) => {
            setSubDeparment(e.value);
          }}
          required
        />
      </div>

      <div className="form-group col-3">
        <label className="form-label">
          Report L1 <sup style={{ color: "red" }}>*</sup>
        </label>
        <Select
          className=""
          options={usersData.map((option) => ({
            value: option.user_id,
            label: `${option.user_name}`,
          }))}
          value={{
            value: reportL1,
            label:
              usersData.find((user) => user.user_id === reportL1)?.user_name ||
              "",
          }}
          onChange={(e) => {
            setReportL1(e.value);
          }}
          required
        />
      </div>

      <div className="form-group col-3">
        <label className="form-label">
          Report L2 <sup style={{ color: "red" }}>*</sup>
        </label>
        <Select
          className=""
          options={usersData.map((option) => ({
            value: option.user_id,
            label: `${option.user_name}`,
          }))}
          value={{
            value: reportL2,
            label:
              usersData.find((user) => user.user_id === reportL2)?.user_name ||
              "",
          }}
          onChange={(e) => {
            setReportL2(e.value);
          }}
          required={false}
        />
      </div>

      <div className="form-group col-3">
        <label className="form-label">
          Report L3 <sup style={{ color: "red" }}>*</sup>
        </label>
        <Select
          className=""
          options={usersData.map((option) => ({
            value: option.user_id,
            label: `${option.user_name}`,
          }))}
          value={{
            value: reportL3,
            label:
              usersData.find((user) => user.user_id === reportL3)?.user_name ||
              "",
          }}
          onChange={(e) => {
            setReportL3(e.value);
          }}
          required={false}
        />
      </div>

      <div className="form-group col-3">
        <label className="form-label">
          Role <sup style={{ color: "red" }}>*</sup>
        </label>
        <Select
          options={roledata.map((option) => ({
            value: option.role_id,
            label: option.Role_name,
          }))}
          value={{
            value: roles,
            label:
              roledata.find((role) => role.role_id === roles)?.Role_name || "",
          }}
          onChange={(e) => {
            setRoles(e.value);
          }}
        ></Select>
      </div>

      <FieldContainer
        label="Official Email"
        type="email"
        fieldGrid={3}
        required={false}
        value={email}
        onChange={handleEmailChange}
      />
      {!validEmail && <p style={{ color: "red" }}>*Please enter valid email</p>}
      <FieldContainer
        label="Personal Email *"
        type="email"
        fieldGrid={3}
        required={false}
        value={personalEmail}
        onChange={(e) => setPersonalEmail(e.target.value)}
      />
      <FieldContainer
        label="Official Contact"
        type="number"
        fieldGrid={3}
        value={contact}
        required={true}
        onChange={handleContactChange}
        onBlur={handleContentBlur}
      />
      {(isContactTouched || contact?.length >= 10) && !isValidcontact && (
        <p style={{ color: "red" }}>*Please enter a valid Number</p>
      )}
      <FieldContainer
        label="Personal Contact *"
        type="number"
        fieldGrid={3}
        value={personalContact}
        required={false}
        onChange={handlePersonalContactChange}
        onBlur={handleContentBlur}
      />
      {isContactTouched1 && !isValidcontact1 && (
        <p style={{ color: "red" }}>*Please enter a valid Number</p>
      )}
      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
        <div className="form-group">
          <label>Login ID *</label>
          <div className="input-group">
            <input
              className="form-control"
              value={loginId}
              onChange={handleLoginIdChange}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-primary"
                onClick={generateLoginId}
                type="button"
              >
                <AiOutlineReload />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
        <div className="form-group">
          <label>Generate Password *</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-primary"
                onClick={generatePassword}
                type="button"
              >
                <i className="fa-solid fa-repeat"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group col-3">
        <label className="form-label">
          Seat Number <sup style={{ color: "red" }}>*</sup>
        </label>
        <Select
          className=""
          options={refrenceData.map((option) => ({
            value: `${option?.Sitting_id}`,
            label: `${option?.Sitting_ref_no} | ${option?.Sitting_area}`,
          }))}
          value={{
            value: `${sitting ? sitting : ""}`,
            label: `${roomId?.Sitting_ref_no} ${roomId ? "|" : ""} ${
              roomId?.Sitting_area
            }`,
          }}
          onChange={(e) => {
            const selectedSittingId = e.value;
            setSitting(selectedSittingId);
            const selectedOption = refrenceData.find(
              (option) => option.Sitting_id === Number(selectedSittingId)
            );
            setRoomId(selectedOption);
          }}
          required={false}
        />
      </div>
    </>
  );

  const salaryFields = (
    <>
      <FieldContainer
        type="date"
        label="Joining Date"
        fieldGrid={3}
        value={joiningDate}
        onChange={(e) => setJoiningDate(e.target.value)}
      />
      {/* <FieldContainer
        type="date"
        label=" Releaving Date "
        fieldGrid={3}
        value={releavingDate}
        required={false}
        onChange={(e) => setReleavingDate(e.target.value)}
      /> */}
      <div className="form-group col-3">
        <label className="form-label">
          Job Type <sup style={{ color: "red" }}>*</sup>
        </label>
        <Select
          className=""
          options={jobTypeData.map((option) => ({
            value: `${option}`,
            label: `${option}`,
          }))}
          value={{
            value: jobType,
            label: `${jobType}`,
          }}
          onChange={(e) => {
            setJobType(e.value);
          }}
          required
        />
      </div>
      {jobType === "WFH" && (
        <>
          <FieldContainer
            label="Salary"
            type="number"
            fieldGrid={3}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
          <div className="form-group col-3">
            <label className="form-label">
              TDS Applicable<sup style={{ color: "red" }}>*</sup>
            </label>
            <Select
              className=""
              options={tdsApplicableData.map((option) => ({
                value: `${option}`,
                label: `${option}`,
              }))}
              value={{
                value: tdsApplicable,
                label: `${tdsApplicable}`,
              }}
              onChange={(e) => {
                const selectedValue = e.value;
                setTdsApplicable(e.value);
                setShowTdsPercentage(selectedValue === "Yes");
              }}
              // required
            />
          </div>
          {showTdsPercentage && (
            <FieldContainer
              label="TDS Percentage"
              fieldGrid={3}
              type="number"
              value={tdsPercentage}
              required={false}
              onChange={(e) => setTdsPercentage(e.target.value)}
            />
          )}
        </>
      )}
      <div className="form-group col-3">
        <label className="form-label">
          Status <sup style={{ color: "red" }}>*</sup>
        </label>
        <Select
          className=""
          options={statusData.map((option) => ({
            value: `${option}`,
            label: `${option}`,
          }))}
          value={{
            value: userStatus,
            label: `${userStatus}`,
          }}
          onChange={(e) => {
            setUserStatus(e.value);
          }}
          required
        />
      </div>
      {userStatus == "Resign" && (
        <FieldContainer
          type="date"
          label="Date of Resign"
          fieldGrid={3}
          value={releavingDate}
          onChange={(e) => setReleavingDate(e.target.value)}
        />
      )}

      {/*       
      <FieldContainer
      type="date"
        label="Date of Resign"
        fieldGrid={3}
        value={dateOfBirth}
        // onChange={handleDateChange}
      /> */}
    </>
  );

  const documentsFields = (
    <>
      {/* <FieldContainer
        label="Profile Picture"
        onChange={(e)=>setProfile(e.target.files[0]}
        fieldGrid={3}
        type="file"
        required={false}
      /> */}
      <FieldContainer
        label="UID Number"
        onChange={handleUIDInputChange}
        fieldGrid={3}
        type="text"
        required={false}
        value={uidNo}
      />
      {/* <FieldContainer
        label="UID Number"
        onChange={(e) => setUidNo(e.target.value)}
        fieldGrid={3}
        type="text"
       
        required={false}
      /> */}
      <FieldContainer
        label="UID"
        onChange={(e) => setUID(e.target.files[0])}
        fieldGrid={3}
        type="file"
        required={false}
      />
      <FieldContainer
        label="PAN Number"
        onChange={handlePANChange}
        fieldGrid={3}
        type="text"
        required={false}
        value={panNo}
      />
      {/* <FieldContainer
        label="PAN Number"
        onChange={(e) => setPanNo(e.target.value.toUpperCase())}
        fieldGrid={3}
        type="text"
        value={panNo}
        required={false}
      /> */}
      <FieldContainer
        label="Pan Image"
        onChange={(e) => setPanUpload(e.target.files[0])}
        fieldGrid={3}
        type="file"
        required={false}
      />
      <div className="form-group col-3">
        <label className="form-label">
          Higest Qualification <sup style={{ color: "red" }}>*</sup>
        </label>
        <Select
          className=""
          options={higestQualificationData.map((option) => ({
            value: `${option}`,
            label: `${option}`,
          }))}
          value={{
            value: higestQualification,
            label: `${higestQualification}`,
          }}
          onChange={(e) => {
            setHigestQualification(e.value);
          }}
          required
        />
      </div>
      <FieldContainer
        label="Highest Qualification"
        onChange={(e) => setHighestUpload(e.target.files[0])}
        fieldGrid={3}
        type="file"
        required={false}
      />
      <FieldContainer
        label="Other Image"
        onChange={(e) => setOtherUpload(e.target.files[0])}
        fieldGrid={3}
        type="file"
        required={false}
      />
      {!isValidPAN && <p style={{ color: "red" }}>Invalid PAN format</p>}
      {!isValidUID && (
        <p style={{ color: "red" }}>Invalid Aadhaar number format</p>
      )}
      {error}
      {otherDocuments && (
        <div>
          <h3>Other Documents</h3>
          {otherDocuments.map((item, index) => {
            return (
              <div key={index} className="d-flex ">
                <input
                  type="text"
                  className="form-control mt-2 col-6 me-2"
                  value={item.field_name}
                  onChange={(e) => otherDocumentNameChangeHandle(e, index)}
                />
                <input
                  className="form-control mt-2 col-6 "
                  label={item.field_name}
                  onChange={(e) => otherDocumentImageChangeHandler(e, index)}
                  type="file"
                  required={false}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );

  const personalFields = (
    <>
      <div className="form-group col-3">
        <label className="form-label">
          Spoken Languages <sup style={{ color: "red" }}>*</sup>
        </label>
        <Select
          isMulti
          name="langauages"
          options={colourOptions}
          className="basic-multi-select"
          classNamePrefix="select"
          value={tempLanguage}
          onChange={handleLanguageSelect}
          required={false}
        />
      </div>
      <div className="form-group col-3">
        <label className="form-label">
          Gender <sup style={{ color: "red" }}>*</sup>
        </label>
        <Select
          className=""
          options={genderData.map((option) => ({
            value: `${option}`,
            label: `${option}`,
          }))}
          value={{
            value: gender,
            label: `${gender}`,
          }}
          onChange={(e) => {
            setGender(e.value);
          }}
          required
        />
      </div>
      {/* <FieldContainer
        label="Gender *"
        Tag="select"
        value={ }
        onChange={(e) => setGender(e.target.value)}
        required
      >
        <option value="">Chooose...</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </FieldContainer> */}
      <FieldContainer
        label="Nationality"
        value={nationality}
        onChange={(e) => setNationality(e.target.value)}
      />
      <FieldContainer
        label="DOB"
        type="date"
        value={dateOfBirth}
        onChange={handleDateChange}
      />
      {dateOfBirth !== "" && <FieldContainer label="Age" value={age} />}
      <FieldContainer
        label="Father's Name"
        value={FatherName}
        required={false}
        onChange={(e) => setFatherName(e.target.value)}
      />
      <FieldContainer
        label="Mother's Name"
        value={motherName}
        required={false}
        onChange={(e) => setMotherName(e.target.value)}
      />
      <FieldContainer
        label="Hobbies"
        value={hobbies}
        required={false}
        onChange={(e) => setHobbies(e.target.value)}
      />
      <div className="form-group col-6">
        <label className="form-label">
          Blood Group <sup style={{ color: "red" }}>*</sup>
        </label>
        <Select
          className=""
          options={bloodGroupData.map((option) => ({
            value: `${option}`,
            label: `${option}`,
          }))}
          value={{
            value: bloodGroup,
            label: `${bloodGroup}`,
          }}
          onChange={(e) => {
            setBloodGroup(e.value);
          }}
          required={false}
        />
      </div>

      <div className="form-group col-6">
        <label className="form-label">
          Maritial Status <sup style={{ color: "red" }}>*</sup>
        </label>
        <Select
          className=""
          options={maritialStatusData.map((option) => ({
            value: `${option}`,
            label: `${option}`,
          }))}
          value={{
            value: maritialStatus,
            label: `${maritialStatus}`,
          }}
          onChange={(e) => {
            setMaritialStatus(e.value);
          }}
          required={false}
        />
      </div>
      {maritialStatus == "Married" && (
        <FieldContainer
          label="Spouse Name"
          type="text"
          value={spouseName}
          onChange={(e) => setSpouseName(e.target.value)}
          required={false}
        />
      )}
      {maritialStatus == "Married" && (
        <FieldContainer
          label="Date Of Marriage"
          type="date"
          value={dateOfMarraige}
          onChange={(e) => setDateOfMarraige(e.target.value)}
          required={false}
        />
      )}
    </>
  );

  return (
    <>
      <FormContainer
        mainTitle="User Update"
        title="User Registration"
        handleSubmit={handleSubmit}
        accordionButtons={accordionButtons}
        activeAccordionIndex={activeAccordionIndex}
        onAccordionButtonClick={handleAccordionButtonClick}
      >
        {activeAccordionIndex === 0 && genralFields}
        {activeAccordionIndex === 1 && personalFields}
        {activeAccordionIndex === 2 && salaryFields}
        {activeAccordionIndex === 3 && documentsFields}
      </FormContainer>
    </>
  );
};

export default UserUpdate;
