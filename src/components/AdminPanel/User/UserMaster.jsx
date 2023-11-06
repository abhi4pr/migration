import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { AiOutlineReload } from "react-icons/ai";
import { useGlobalContext } from "../../../Context/Context";
import imageTest1 from "../../../assets/img/product/Avtrar1.png";
import imageTest2 from "../../../assets/img/product/Avtrar2.png";
import imageTest3 from "../../../assets/img/product/Avtrar3.png";
import imageTest14 from "../../../assets/img/product/Avtrar14.png";
import imageTest5 from "../../../assets/img/product/Avtrar5.png";
import imageTest6 from "../../../assets/img/product/Avtrar6.png";
import imageTest7 from "../../../assets/img/product/Avtrar7.png";
import imageTest8 from "../../../assets/img/product/Avtrar8.png";
import imageTest15 from "../../../assets/img/product/Avtar15.png";
import imageTest16 from "../../../assets/img/product/Avtar16.png";
import imageTest17 from "../../../assets/img/product/Avtar17.png";
import imageTest18 from "../../../assets/img/product/Avtar18.png";
import imageTest19 from "../../../assets/img/product/Avtar19.png";
import imageTest20 from "../../../assets/img/product/Avtar20.png";
import imageTest21 from "../../../assets/img/product/Avtar21.png";
import imageTest22 from "../../../assets/img/product/Avtar22.png";
import imageTest23 from "../../../assets/img/product/Avtar23.png";
import imageTest24 from "../../../assets/img/product/Avtar24.png";
import imageTest25 from "../../../assets/img/product/Avtar25.png";
import imageTest26 from "../../../assets/img/product/Avtar26.png";
import imageTest27 from "../../../assets/img/product/Avtar27.png";
import imageTest28 from "../../../assets/img/product/Avtar28.png";
import imageTest29 from "../../../assets/img/product/Avtar29.png";
import imageTest30 from "../../../assets/img/product/Avtar30.png";
import Select from "react-select";

const colourOptions = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi" },
  { value: "Other", label: "Other" },
];

const UserMaster = () => {
  const { toastAlert } = useGlobalContext();
  const [username, setUserName] = useState("");

  const [activeTab, setActiveTab] = useState(1);

  const [jobType, setJobType] = useState("");
  const [roles, setRoles] = useState("");
  const [reportL1, setReportL1] = useState("");
  const [reportL2, setReportL2] = useState("");
  const [reportL3, setReportL3] = useState("");

  const [roledata, getRoleData] = useState([]);

  const [email, setEmail] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const [contact, setContact] = useState("");
  const [personalContact, setPersonalContact] = useState("");
  const [isValidcontact, setValidContact] = useState(false);
  const [isValidcontact1, setValidContact1] = useState(false);
  const [isContactTouched, setisContactTouched] = useState(false);
  const [isContactTouched1, setisContactTouched1] = useState(false);

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  // const [sitting, setSitting] = useState("");

  const [sitting, setSitting] = useState("");
  const [roomId, setRoomId] = useState("");
  const [refrenceData, getRefrenceData] = useState([]);

  const [department, setDepartment] = useState("");
  const [departmentdata, getDepartmentData] = useState([]);

  const [usersData, getUsersData] = useState([]);

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [designation, setDesignation] = useState("");
  const [designationData, setDesignationData] = useState([]);

  const [uid, setUID] = useState("");
  const [panUpload, setPanUpload] = useState("");
  const [highestUpload, setHighestUpload] = useState("");
  const [otherUpload, setOtherUpload] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [releavingDate, setReleavingDate] = useState("");
  const [salary, setSalary] = useState(0);
  const [allUsersSittings, setAllUsersSittings] = useState([]);

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

  const [isEmptyRequiredField, setIsEmptyRequiredField] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [imagePreview, setImagePreview] = useState(null);

  // TDS State
  const [tdsApplicable, setTdsApplicable] = useState("No");
  const [tdsPercentage, setTdsPercentage] = useState(0);
  const [showTdsPercentage, setShowTdsPercentage] = useState(false);
  const [subDepartmentData, setSubDepartmentData] = useState([]);
  const [subDepartment, setSubDeparment] = useState([]);
  const [status, setStatus] = useState("");
  const [documents, setDocuments] = useState([]);
  const [UIDNumber, setUIDNumber] = useState("");
  const [PANNumber, setPANNumber] = useState("");
  const [spouseName, setSpouseName] = useState("");
  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;
  const [higestQualification, setHigestQualification] = useState("");
  const [isValidPAN, setIsValidPAN] = useState(true);
  const [isValidUID, setIsValidUID] = useState(true); // State to track UID validation
  const higestQualificationData = [
    "10th",
    "12th",
    "Diploma",
    "Graduation",
    "Post Graduation",
    "Other",
  ];
  const jobTypeData = ["WFO", "WFH"];
  const tdsApplicableData = ["Yes", "No"];
  const statusData = ["Active", "Exit", "On Leave", "Resign"];
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
  const maritialStatusData = ["Single", "Married"]; //,"Divorced","Widowed","Separated"
  const handlePANChange = (e) => {
    const inputPAN = e.target.value.toUpperCase();
    setPANNumber(inputPAN);

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
    setUIDNumber(inputUID);

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
  useEffect(() => {
    if (department) {
      axios
        .get(`http://34.93.135.33:8080/api/get_subdept_from_dept/${department}`)
        .then((res) => setSubDepartmentData(res.data));
    }
  }, [department]);

  useEffect(() => {
    axios.get("http://34.93.135.33:8080/api/get_all_roles").then((res) => {
      getRoleData(res.data.data);
    });

    axios
      .get("http://34.93.135.33:8080/api/get_all_departments")
      .then((res) => {
        getDepartmentData(res.data);
      });

    axios.get("http://34.93.135.33:8080/api/not_alloc_sitting").then((res) => {
      getRefrenceData(res.data.data);
    });

    axios.get("http://34.93.135.33:8080/api/get_all_users").then((res) => {
      getUsersData(res.data.data);
      const userSitting = res.data.data.map((user) => user.sitting_id);
      setAllUsersSittings(userSitting);
    });

    axios
      .get("http://34.93.135.33:8080/api/get_all_designations")
      .then((res) => {
        setDesignationData(res.data.data);
      });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (
    //   !username ||
    //   !gender ||
    //   !personalEmail ||
    //   !personalContact ||
    //   !loginId ||
    //   !password ||
    //   !dateOfBirth ||
    //   !gender
    // ) {
    //   setError("Please select All required Fields");
    //   return;
    // }
    const formData = new FormData();
    // const formDataa = new FormData();
    formData.append("created_by", loginUserId);
    formData.append("user_name", username);
    formData.append("role_id", roles);
    formData.append("image", selectedImage);
    formData.append("user_email_id", email);
    formData.append("user_login_id", loginId);
    formData.append("user_login_password", password);
    formData.append("user_contact_no", contact);
    formData.append("sitting_id", sitting);
    formData.append("room_id", roomId.room_id);
    formData.append("dept_id", department);
    formData.append("job_type", jobType);
    formData.append("personal_number", personalContact);
    formData.append("Personal_email", personalEmail);
    formData.append("report_L1", reportL1);
    formData.append("report_L2", reportL2);
    formData.append("report_L3", reportL3);
    formData.append("user_designation", designation);
    formData.append("UID", uid);
    formData.append("pan", panUpload);
    formData.append("highest_upload", highestUpload);
    formData.append("other_upload", otherUpload);
    formData.append("joining_date", joiningDate);
    // formData.append("releaving_date", releavingDate);
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
    formData.append("user_status", status);
    formData.append("tds_applicable", tdsApplicable);
    formData.append("tds_per", tdsPercentage);
    formData.append("uid_no", UIDNumber);
    formData.append("pan_no", PANNumber);
    formData.append("spouse_name", spouseName);
    formData.append("sub_dept_id", subDepartment);
    formData.append("highest_qualification_name", higestQualification);
    if (isValidcontact == true && validEmail == true) {
      try {
        const isLoginIdExists = usersData.some(
          (user) =>
            user.user_login_id.toLocaleLowerCase() ===
            loginId.toLocaleLowerCase()
        );
        if (isLoginIdExists) {
          alert("this login ID already exists");
        } else {
          await axios.post("http://34.93.135.33:8080/api/add_user", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          for (const elements of documents) {
            // formData.append("user_id", loginId);
            // formDataa.append("remark", loginUserId);
            // formDataa.append("created_by", loginId);
            // formDataa.append("field_name", elements.name);
            // formDataa.append("field_value", elements.file);
            // formData.append("remark", "remark");

            axios.post(
              "http://34.93.135.33:8080/api/add_user_other_field",
              { field_name: elements.name, field_value: elements.file },
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
          }
          axios
            .post("http://34.93.135.33:8080/api/add_send_user_mail", {
              email: email,
              subject: "User Registration",
              text: "A new user has been registered.",
              attachment: selectedImage,
              login_id: loginId,
              name: username,
              password: password,
            })
            .then((res) => {
              console.log("Email sent successfully:", res.data);
            })
            .catch((error) => {
              console.log("Failed to send email:", error);
            });
          // setUserName("");
          // setRoles("");
          // setEmail("");
          // setPersonalEmail("");
          // setLoginId("");
          // setContact("");
          // setPersonalContact("");
          // setPassword("");
          // setDepartment("");
          // setSitting("");
          // setRoomId("");
          // setPersonalContact("");
          // setPersonalEmail("");
          // setJobType("");
          // setReportL1("");
          // setReportL2("");
          // setReportL3("");
          // setDesignation("");

          toastAlert("User Registerd");
          setIsFormSubmitted(true);
        }
      } catch (error) {
        console.log("Failed to submit form", error);
      }
    } else {
      if (contact.length !== 10) {
        if (isValidcontact == false)
          alert("Enter Phone Number in Proper Format");
      } else if (validEmail != true) {
        alert("Enter Valid Email");
      }
    }
  };

  // const handleFileChange = (e) => {
  //   if (e.target.files.length > 0) {
  //     setUID(e.target.files[0]);
  //     setPanUpload(e.target.files[0]);
  //     setHighestUpload(e.target.files[0]);
  //     setOtherUpload(e.target.files[0]);
  //   } else {
  //     setUID(null);
  //     setPanUpload(null);
  //     setHighestUpload(null);
  //     setOtherUpload(null);
  //   }
  // };
  // Email Validation
  function handleEmailChange(e) {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (newEmail == "") {
      setValidEmail(false);
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      setValidEmail(emailRegex.test(newEmail));
    }
  }

  // Number validation
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

  const handleAccordionButtonClick = (index) => {
    // {
    setActiveAccordionIndex(index);
    // alert("fill all the fields");
    // }
  };

  const images = [
    imageTest1,
    imageTest2,
    imageTest3,
    imageTest14,
    imageTest5,
    imageTest6,
    imageTest7,
    imageTest8,
    imageTest15,
    imageTest16,
    imageTest17,
    imageTest18,
    imageTest19,
    imageTest20,
    imageTest21,
    imageTest22,
    imageTest23,
    imageTest24,
    imageTest25,
    imageTest26,
    imageTest27,
    imageTest28,
    imageTest29,
    imageTest30,
  ];

  const handleImageClick = async (image) => {
    try {
      const response = await axios.get(image, {
        responseType: "arraybuffer", // Request the image as an array buffer
      });

      setImagePreview(image);

      const blob = new Blob([response.data], { type: "image/jpeg" });
      setSelectedImage(blob);
    } catch (error) {
      console.error("Error loading image:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    setSelectedImage(file);
  };

  const calculateAge = (dob) => {
    const currentDate = new Date();
    const birthDate = new Date(dob);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    setAge(age);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDateOfBirth(selectedDate);
    calculateAge(selectedDate);
  };

  function addMore() {
    setDocuments([...documents, { name: "", file: null }]);
  }
  function reomveField() {
    setDocuments(documents.slice(0, -1));
  }
  function handleDocumentName(index, value) {
    const updatedDocuments = [...documents];
    updatedDocuments[index].name = value;
    setDocuments(updatedDocuments);
  }
  function handleDocumentChange(index, file) {
    const updatedDocuments = [...documents];
    updatedDocuments[index].file = file;
    setDocuments(updatedDocuments);
  }

  function handleLanguageSelect(selectedOption) {
    setTempLanguage(selectedOption);
  }

  // useEffect(() => {
  //   const test = tempLanguage?.map((option) => option.value).join();
  //   setSpeakingLanguage(test);
  // }, [tempLanguage]);

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
              designationData.find((user) => user.desi_id === designation)
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
      {(isContactTouched || contact.length >= 10) && !isValidcontact && (
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
      {(isContactTouched1 || personalContact.length >= 10) &&
        !isValidcontact1 && (
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
            value: `${option?.sitting_id}`,
            label: `${option?.sitting_ref_no} | ${option?.sitting_area}`,
          }))}
          value={{
            value: `${sitting ? sitting : ""}`,
            label: `${roomId?.sitting_ref_no ? roomId?.sitting_ref_no : ""} ${
              roomId ? "|" : ""
            } ${roomId?.sitting_area ? roomId?.sitting_area : ""}`,
          }}
          onChange={(e) => {
            const selectedSittingId = e.value;
            setSitting(selectedSittingId);
            const selectedOption = refrenceData.find(
              (option) => option.sitting_id === Number(selectedSittingId)
            );
            // console.log(selectedSittingId, "selectedSittingId")
            // console.log(selectedOption.room_id, "selectedOption")
            setRoomId(selectedOption);
          }}
          required={true}
        />
      </div>

      {/* <FieldContainer
        label="Seat Number"
        Tag="select"
        value={sitting}
        fieldGrid={3}
        required={false}
        onChange={(e) => {
          const selectedSittingId = e.target.value;
          setSitting(selectedSittingId);
          const selectedOption = refrenceData.find(
            (option) => option.Sitting_id === Number(selectedSittingId)
          );
          setRoomId(selectedOption ? selectedOption.room_id : "");
        }}
      >
        <option selected disabled value="">
          Choose...
        </option>
        {refrenceData.map((option) => (
          <option key={option.Sitting_id} value={option.Sitting_id}>
            {option.Sitting_ref_no} | {option.Sitting_area}
          </option>
        ))}
      </FieldContainer> */}
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
              required={false}
            />
          </div>
          {showTdsPercentage && (
            <FieldContainer
              label="TDS Percentage"
              fieldGrid={3}
              type="number"
              value={tdsPercentage}
              onChange={(e) => setTdsPercentage(e.target.value)}
              required={false}
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
            value: status,
            label: `${status}`,
          }}
          onChange={(e) => {
            setStatus(e.value);
          }}
          required
        />
      </div>
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
      />
      <FieldContainer
        label="UID"
        onChange={(e) => setUID(e.target.files[0])}
        fieldGrid={3}
        type="file"
        required={false}
      />
      {/* <div>
        <label>PAN Number</label>
        <input
          type="text"
          value={PANNumber}
          onChange={handlePANChange}
          style={{ borderColor: isValidPAN ? "initial" : "red" }} // Change border color on validation
        />
        {!isValidPAN && <p style={{ color: "red" }}>Invalid PAN format</p>}
      </div> */}

      <FieldContainer
        label="PAN Number"
        onChange={handlePANChange}
        fieldGrid={3}
        type="text"
        value={PANNumber}
        required={false}
      />

      <FieldContainer
        label="Pan Image"
        onChange={(e) => setPanUpload(e.target.files[0])}
        fieldGrid={3}
        type="file"
        required={false}
      />
      <FieldContainer
        label="Highest Qualification Image"
        onChange={(e) => setHighestUpload(e.target.files[0])}
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
          required={false}
        />
      </div>
      {/* <FieldContainer
        label="Highest Qualification"
        Tag="select"
        fieldGrid={3}
        value={higestQualification}
        onChange={(e) => {
          setHigestQualification(e.target.value);
        }}
      >
        <option>Choose...</option>
        {higestQualificationData.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </FieldContainer> */}
      <FieldContainer
        label="Other Image"
        onChange={(e) => setOtherUpload(e.target.files[0])}
        fieldGrid={3}
        type="file"
        required={false}
      />
      <div>
        {documents.map((document, index) => {
          return (
            <div className="d-flex" key={index}>
              <FieldContainer
                label={"Document Name"}
                type="text"
                value={document.name}
                onChange={(e) => handleDocumentName(index, e.target.value)}
                required={false}
              />
              <FieldContainer
                label={"Image"}
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => handleDocumentChange(index, e.target.files[0])}
                required={false}
              />
            </div>
          );
        })}
        {!isValidPAN && <p style={{ color: "red" }}>Invalid PAN format</p>}
        {!isValidUID && (
          <p style={{ color: "red" }}>Invalid Aadhaar number format</p>
        )}
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={addMore}
          >
            Add More
          </button>
          {documents.length > 0 && (
            <button className="btn btn-primary" onClick={reomveField}>
              Remove Field
            </button>
          )}
        </div>
      </div>
      {error}
    </>
  );

  const personalFields = (
    <>
      <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12">
        <div className="form-group">
          <label className="form-label"> </label>
          <button
            className="btn btn-success d-block w-100"
            data-bs-toggle="modal"
            data-bs-target="#transferModal"
          >
            Profile
          </button>
        </div>
      </div>
      {/* Transfer Modal Start */}
      <div
        className="modal fade alert_modal transfer_modal "
        id="transferModal"
        tabIndex={-1}
        aria-labelledby="transferModalLabel"
        aria-hidden="true"
        style={{ marginLeft: "7%" }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-body">
              <div>
                {selectedImage && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      src={imagePreview}
                      alt="Selected"
                      style={{
                        width: "150px",
                        height: "80px",
                        marginBottom: "10px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                )}

                <div>
                  <h5>Choose Image:</h5>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    {images.map((image) => (
                      <img
                        key={image}
                        src={image}
                        // alt={imageName}
                        style={{
                          width: "80px",
                          height: "80px",
                          margin: "5px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                        onClick={() => handleImageClick(image)}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h5>Upload Image:</h5>
                  <input
                    className="form-control"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required={false}
                  />
                </div>
              </div>
              <div className="alert_text">
                <button
                  className="btn cmnbtn btn_success"
                  data-bs-dismiss="modal"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
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
        onChange={(e) => setFatherName(e.target.value)}
        required={false}
      />
      <FieldContainer
        label="Mother's Name"
        value={motherName}
        onChange={(e) => setMotherName(e.target.value)}
        required={false}
      />
      <FieldContainer
        label="Hobbies"
        value={hobbies}
        onChange={(e) => setHobbies(e.target.value)}
        required={false}
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
      {maritialStatus === "Married" && (
        <FieldContainer
          label="Spouse Name"
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
        mainTitle="User"
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

export default UserMaster;
