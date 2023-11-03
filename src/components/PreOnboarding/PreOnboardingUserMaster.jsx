import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./onboardcss/onboard_style.css";
import "./onboardcss/onboard_responsive.css";
import "./onboardcss/onboard_animate.min.css";
import profilepic from "../../assets/imgs/user/naruto.png";
import welcomeImage from "../../assets/imgs/other/welcome.png";
import Select from "react-select";
import { AiOutlineReload } from "react-icons/ai";
import { useGlobalContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import WhatsappAPI from "../WhatsappAPI/WhatsappAPI";

const colourOptions = [
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi" },
  { value: "Other", label: "Other" },
];

const bloodGroupData = [
  "A+ (A Positive)",
  "A- (A Negative)",
  "B+ (B Positive)",
  "B- (B Negative)",
  "AB+ (AB Positive)",
  "AB- (AB Negative)",
  "O+ (O Positive)",
  "O- (O Negative)",
];

const maritialStatusData = ["Single", "Married"]; //,"Divorced","Widowed","Separated"

const genderData = ["Male", "Female", "Other"];

const PreOnboardingUserMaster = () => {
  const whatsappApi = WhatsappAPI();
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserName = decodedToken.name;
  const id = decodedToken.id;
  const { toastAlert } = useGlobalContext();

  const [activeTab, setActiveTab] = useState(0);

  const [allUserData, setAllUserData] = useState([]);
  const [username, setUserName] = useState("");

  const [email, setEmail] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);

  const [contact, setContact] = useState("");
  const [personalContact, setPersonalContact] = useState("");
  const [isValidcontact, setValidContact] = useState(false);
  const [isValidcontact1, setValidContact1] = useState(false);
  const [isContactTouched, setisContactTouched] = useState(false);
  const [isContactTouched1, setisContactTouched1] = useState(false);

  const [tempLanguage, setTempLanguage] = useState([]);
  const [speakingLanguage, setSpeakingLanguage] = useState("");

  const [joiningDate, setJoiningDate] = useState("");

  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [nationality, setNationality] = useState("Indian");
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [FatherName, setFatherName] = useState("");
  const [motherName, setMotherName] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const [maritialStatus, setMaritialStatus] = useState("");
  const [dateOfMarraige, setDateOfMarraige] = useState("");
  const [spouseName, setSpouseName] = useState("");

  // Documents states
  const [XMarksheet, setXMarksheet] = useState(null);
  const [XMarksheetValidation, setXMarksheetValidation] = useState("Pending");

  const [XIIMarksheet, setXIIMarksheet] = useState(null);
  const [XIIMarksheetValidation, setXIIMarksheetValidation] =
    useState("Pending");

  // const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  // const [imagePreviewUrlValidation, setImagePreviewUrlValidation] =
  //   useState("Pending");

  const [underGraduationDoc, setUnderGraduationDoc] = useState(null);
  const [underGraduationDocValidation, setUnderGraduationDocValidation] =
    useState("Pending");

  const [uid, setUID] = useState(null);
  const [uidValidation, setUIDValidation] = useState("Pending");

  const [panUpload, setPanUpload] = useState(null);
  const [panUploadValidation, setPanUploadValidation] = useState("Pending");

  const [Passport, setPassport] = useState(null);
  const [PassportValidation, setPassportValidation] = useState("Pending");

  const [experienceDoc, setExperienceDoc] = useState(null);
  const [experienceDocValidation, setExperienceDocValidation] =
    useState("Pending");

  const [passbookCheque, setPassbookCheque] = useState(null);
  const [passbookChequeValidation, setPassbookChequeValidation] =
    useState("Pending");

  const [previousOfferLetter, setPreviousOfferLetter] = useState(null);
  const [previousOfferLetterValidation, setPreviousOfferLetterValidation] =
    useState("Pending");

  const [previousRelievingLetter, setPreviousRelievingLetter] = useState(null);
  const [
    previousRelievingLetterValidation,
    setPreviousRelievingLetterValidation,
  ] = useState("Pending");

  //Permanent Address
  const [permanentAddress, setPermanentAddress] = useState("");
  const [permanentCity, setPermanentCity] = useState("");
  const [permanentState, setPermanentState] = useState("");
  const [permanentPincode, setPermanentPincode] = useState(null);

  //Current Address
  const [currentAddress, setCurrentAddress] = useState("");
  const [currentCity, setcurrentCity] = useState("");
  const [currentState, setcurrentState] = useState("");
  const [currentPincode, setcurrentPincode] = useState(null);

  const [sameAsCurrent, setSameAsCurrent] = useState(false);

  //Extend Joining Date
  const [joingingExtendDate, setJoiningExtendDate] = useState("");
  const [joiningExtendReason, setJoiningExtendReason] = useState("");
  const [joingingExtendDocument, setJoiningExtendDocument] = useState(null);

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setSameAsCurrent(checked);
    if (checked) {
      setPermanentAddress(currentAddress);
      setPermanentCity(currentCity);
      setPermanentState(currentState);
      setPermanentPincode(currentPincode);
    } else {
      setPermanentAddress("");
      setPermanentCity("");
      setPermanentState("");
      setPermanentPincode("");
    }
  };
  useEffect(() => {
    axios
      .get(`http://192.168.29.116:8080/api/get_single_user/${id}`)
      .then((res) => {
        const fetchedData = res.data;

        const {
          user_name,
          user_email_id,
          PersonalEmail,
          user_contact_no,
          PersonalNumber,
          fatherName,
          motherName,
          Hobbies,
          Gender,
          BloodGroup,
          Nationality,
          SpokenLanguages,
          user_login_id,
          user_login_password,
          joining_date,
          DOB,
          MartialStatus,
          DateOfMarriage,
          spouse_name,
          tenth_marksheet_validate,
          twelveth_marksheet_validate,
          UG_Marksheet_validate,
          uid_validate,
          pan_validate,
          passport_validate,
          pre_expe_letter_validate,
          pre_off_letter_validate,
          pre_relieving_letter_validate,
          bankPassBook_Cheque_validate,
          permanent_address,
          permanent_city,
          permanent_state,
          permanent_pin_code,
          current_address,
          current_city,
          current_state,
          current_pin_code,
        } = fetchedData;

        console.log(DOB, "yha birthday date hai");

        setAllUserData(fetchedData);
        setUserName(user_name);
        setEmail(user_email_id);
        setPersonalEmail(PersonalEmail);
        //setContact(PersonalNumber);
        //setPersonalContact(user_contact_no);
        setContact(user_contact_no);
        setPersonalContact(PersonalNumber);
        setPersonalEmail(PersonalEmail);
        setFatherName(fatherName);
        setMotherName(motherName);
        setHobbies(Hobbies);
        setGender(Gender);
        setBloodGroup(BloodGroup);
        {
          Nationality && setNationality(Nationality);
        }
        setSpeakingLanguage(SpokenLanguages);
        setLoginId(user_login_id);
        setPassword(user_login_password);
        setJoiningDate(joining_date?.split("T")?.[0]);
        setMaritialStatus(MartialStatus);
        setDateOfBirth(DOB?.split("T")?.[0]);
        setDateOfMarraige(DateOfMarriage);
        setSpouseName(spouse_name);
        {
          tenth_marksheet_validate !== "" &&
            setXMarksheetValidation(tenth_marksheet_validate);
        }
        {
          twelveth_marksheet_validate !== "" &&
            setXIIMarksheetValidation(twelveth_marksheet_validate);
        }
        {
          UG_Marksheet_validate !== "" &&
            setUnderGraduationDocValidation(UG_Marksheet_validate);
        }
        {
          uid_validate !== "" && setUIDValidation(uid_validate);
        }
        {
          pan_validate !== "" && setPanUploadValidation(pan_validate);
        }
        {
          passport_validate !== "" && setPassportValidation(passport_validate);
        }
        {
          pre_expe_letter_validate !== "" &&
            setExperienceDocValidation(pre_expe_letter_validate);
        }
        {
          pre_off_letter_validate !== "" &&
            setPreviousOfferLetterValidation(pre_off_letter_validate);
        }
        {
          pre_relieving_letter_validate !== "" &&
            setPreviousRelievingLetterValidation(pre_relieving_letter_validate);
        }
        {
          bankPassBook_Cheque_validate !== "" &&
            setPassbookChequeValidation(bankPassBook_Cheque_validate);
        }
        setPermanentAddress(permanent_address);
        setPermanentCity(permanent_city);
        setPermanentState(permanent_state);
        setPermanentPincode(permanent_pin_code);
        setCurrentAddress(current_address);
        setcurrentCity(current_city);
        setcurrentState(current_state);
        setcurrentPincode(current_pin_code);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", id);
    formData.append("user_name", username);
    formData.append("user_email_id", email);
    formData.append("user_login_id", loginId);
    formData.append("user_login_password", password);
    formData.append("user_contact_no", contact);
    formData.append("personal_number", personalContact);
    formData.append("Personal_email", personalEmail);

    // document open ---------->
    formData.append("tenth_marksheet", XMarksheet);
    formData.append("twelveth_marksheet", XIIMarksheet);
    formData.append("UG_Marksheet", underGraduationDoc);
    formData.append("UID", uid);
    formData.append("pan", panUpload);
    formData.append("passport", Passport);
    formData.append("pre_expe_letter", experienceDoc);
    formData.append("pre_off_letter", previousOfferLetter);
    formData.append("pre_relieving_letter", previousRelievingLetter);
    formData.append("bankPassBook_Cheque", passbookCheque);
    // document close ---------->

    // document verification open----------->
    formData.append("tenth_marksheet_validate", XMarksheetValidation);
    formData.append("twelveth_marksheet_validate", XIIMarksheetValidation);
    formData.append("UG_Marksheet_validate", underGraduationDocValidation);
    formData.append("uid_validate", uidValidation);
    formData.append("pan_validate", panUploadValidation);
    formData.append("passport_validate", PassportValidation);
    formData.append("pre_expe_letter_validate", experienceDocValidation);
    formData.append("pre_off_letter_validate", previousOfferLetterValidation);
    formData.append(
      "pre_relieving_letter_validate",
      previousRelievingLetterValidation
    );
    formData.append("bankPassBook_Cheque_validate", passbookChequeValidation);
    // document verification close----------->

    formData.append("joining_date", joiningDate);
    formData.append("SpokenLanguages", speakingLanguage);
    formData.append("Gender", gender);
    formData.append("Nationality", nationality);
    formData.append("DOB", dateOfBirth);
    formData.append("FatherName", FatherName);
    formData.append("MotherName", motherName);
    formData.append("Hobbies", hobbies);
    formData.append("BloodGroup", bloodGroup);
    formData.append("MartialStatus", maritialStatus);
    formData.append("DateofMarriage", dateOfMarraige);
    formData.append("spouse_name", spouseName);

    //Permanent address ------------>
    formData.append("permanent_address", permanentAddress);
    formData.append("permanent_city", permanentCity);
    formData.append("permanent_state", permanentState);
    formData.append("permanent_pin_code", Number(permanentPincode));

    //Cuurent Addresss -------------->
    formData.append("current_address", currentAddress);
    formData.append("current_city", currentCity);
    formData.append("current_state", currentState);
    formData.append("current_pin_code", Number(currentPincode));

    axios.put(`http://192.168.29.116:8080/api/update_user`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // After update send mail
    axios
      .post("http://192.168.29.116:8080/api/add_send_user_mail", {
        email: "lalit@creativefuel.io",
        subject: "User Pre Onboarding",
        text: "Pre Onboarding Data Update Successfully",
        attachment: "",
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
    whatsappApi.callWhatsAPI(
      "Onboarding user Fill Details",
      "8517907328",
      username,
      [username]
    );

    toastAlert("User Update");
  };

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

  function handleLanguageSelect(selectedOption) {
    setTempLanguage(selectedOption);
  }

  useEffect(() => {
    const test = tempLanguage?.map((option) => option.value).join();
    setSpeakingLanguage(test);
  }, [tempLanguage]);

  const handleLogOut = () => {
    sessionStorage.clear("toekn");
    navigate("/login");
  };

  const calculateProgressPercentage = () => {
    const filledFields = [
      username,
      email,
      loginId,
      password,
      contact,
      personalContact,
      personalEmail,
      joiningDate,
      speakingLanguage,
      gender,
      nationality,
      dateOfBirth,
      FatherName,
      motherName,
      hobbies,
      bloodGroup,
      maritialStatus,
      dateOfMarraige,
      spouseName,
      permanentAddress,
      permanentCity,
      permanentState,
      permanentPincode,
      currentAddress,
      currentCity,
      currentState,
      currentPincode,
    ];
    // const fileFields = [];
    // const filledFieldsCount = filledFields?.filter(
    //   (value) => value !== null && value?.trim() !== ""
    // ).length;
    const filledFieldsCount = filledFields?.filter(
      (value) => value !== null
    ).length;
    const totalFields = filledFields.length;
    const percentage = (filledFieldsCount / totalFields) * 100;
    return Math.ceil(percentage);
  };

  const handleJoiningExtend = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", id);
    formData.append("joining_date_extend", joingingExtendDate);
    formData.append("joining_date_extend_status", "Requested");
    formData.append("joining_date_extend_reason", joiningExtendReason);
    formData.append("joining_extend_document", joingingExtendDocument);

    axios.put(`http://192.168.29.116:8080/api/update_user`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    axios
      .post("http://192.168.29.116:8080/api/add_send_user_mail", {
        email: "lalit@creativefuel.io",
        subject: "User Pre Onboarding Extend Date",
        text: joiningExtendReason,
        attachment: "",
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
    whatsappApi.callWhatsAPI("Extend Date by User", "9977815413", username, [
      username,
      joingingExtendDate,
    ]);
  };

  const progressPercentage = calculateProgressPercentage();
  return (
    <>
      {/* Dashboard Section Start */}
      <section className="section">
        <div className="page_wrapper">
          <div className="sidebar_wrapper">
            <div className="sidebar_header">
              <h2>Home</h2>
            </div>
            <div className="sidebar_items">
              <div
                className={`sidebar_itembox ${
                  activeTab == 1 ? "sidebar_item_active" : ""
                }`}
                onClick={() => setActiveTab(1)}
              >
                {/* p-100 is percentage of document procedure */}
                <div
                  className={`progress-circle progressing p-${progressPercentage}`}
                >
                  <div className="progress-circle-border">
                    <div className="left-half-circle" />
                    <div className="right-half-circle" />
                  </div>
                  <div className="progress-circle-content">
                    <i className="bi bi-journal-text" />
                  </div>
                </div>
                <h2>Form</h2>
              </div>

              <div
                className={`sidebar_itembox ${
                  activeTab == 2 ? "sidebar_item_active" : ""
                }`}
                onClick={() => setActiveTab(2)}
              >
                <div className={`progress-circle progressing p-${"100"}`}>
                  <div className="progress-circle-border">
                    <div className="left-half-circle" />
                    <div className="right-half-circle" />
                  </div>
                  <div className="progress-circle-content">
                    <i className="bi bi-file-earmark-text" />
                  </div>
                </div>
                <h2>Documents</h2>
              </div>
              <div
                className={`sidebar_itembox ${
                  activeTab == 3 ? "sidebar_item_active" : ""
                }`}
                onClick={() => setActiveTab(3)}
              >
                <div className="progress-circle progressing p-26">
                  <div className="progress-circle-border">
                    <div className="left-half-circle" />
                    <div className="right-half-circle" />
                  </div>
                  <div className="progress-circle-content">
                    <i className="bi bi-book" />
                  </div>
                </div>
                <h2>Policy</h2>
              </div>
              <div
                className={`sidebar_itembox ${
                  activeTab == 4 ? "sidebar_item_active" : ""
                }`}
                onClick={() => setActiveTab(4)}
              >
                <div className="progress-circle progressing p-100">
                  <div className="progress-circle-border">
                    <div className="left-half-circle" />
                    <div className="right-half-circle" />
                  </div>
                  <div className="progress-circle-content">
                    <i className="bi bi-question-circle" />
                  </div>
                </div>
                <h2>FAQ</h2>
              </div>
            </div>
          </div>

          <div className="page_area">
            <div className="topnavbar">
              <div className="navbar_menu">
                <ul className="nav">
                  <li className="nav-item" onClick={() => setActiveTab(0)}>
                    <a
                      className={`nav-link ${activeTab == 0 ? "active" : ""}`}
                      href="#"
                    >
                      Welcome
                    </a>
                  </li>
                  <li className="nav-item" onClick={() => setActiveTab(1)}>
                    <a
                      className={`nav-link ${activeTab == 1 ? "active" : ""}`}
                      href="#"
                    >
                      Form
                    </a>
                  </li>
                  <li className="nav-item" onClick={() => setActiveTab(2)}>
                    <a
                      className={`nav-link ${activeTab == 2 ? "active" : ""}`}
                      href="#"
                    >
                      Documents
                    </a>
                  </li>
                  <li className="nav-item" onClick={() => setActiveTab(3)}>
                    <a
                      className={`nav-link ${activeTab == 3 ? "active" : ""}`}
                      href="#"
                    >
                      Policy
                    </a>
                  </li>
                  <li className="nav-item" onClick={() => setActiveTab(4)}>
                    <a
                      className={`nav-link ${activeTab == 4 ? "active" : ""}`}
                      href="#"
                    >
                      FAQ
                    </a>
                  </li>
                  <li className="nav-item" onClick={() => setActiveTab(5)}>
                    <a
                      className={`nav-link ${activeTab == 5 ? "active" : ""}`}
                      href="#"
                    >
                      Extend Joining
                    </a>
                  </li>
                </ul>
              </div>
              <div className="user_box">
                <div className="user_name">
                  <h3>
                    <span>Welcome back,</span>
                    {loginUserName}
                  </h3>
                </div>
                <div className="user_img">
                  <img src={profilepic} alt="user" />
                </div>
                <div className="user_logout">
                  <a href="#" onClick={handleLogOut}>
                    <i className="bi bi-power" />
                  </a>
                </div>
              </div>
            </div>
            <div className="dashboard_body">
              <div className="dashboard_body_inner">
                {/* Welcome Screen Start */}
                {activeTab == 0 && (
                  <div className="welcome_board">
                    <div className="welcome_board_heading">
                      <h1>Welcome </h1>
                      <h2>{loginUserName}</h2>
                    </div>
                    <div className="welcome_board_img">
                      <img src={welcomeImage} alt="welcome" />
                    </div>
                  </div>
                )}
                {/* Welcome Screen End */}

                {/* Form Screen Start */}
                {activeTab == 1 && (
                  <form onSubmit={handleSubmit}>
                    <div className="formarea">
                      <div className="row spacing_lg">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="board_form">
                            <h2>On-Boarding Form</h2>
                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Full Name"
                                variant="outlined"
                                type="text"
                                // className="form-control"
                                name="name"
                                // placeholder="Full Name"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                              />
                            </div>

                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Official Email"
                                variant="outlined"
                                type="email"
                                // className="form-control"
                                name="Official Email"
                                // placeholder="Official Email"
                                value={email}
                                onChange={handleEmailChange}
                              />
                              {!validEmail && (
                                <p className="validation_message error">
                                  *Please enter valid email
                                </p>
                              )}
                            </div>

                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Personal Email"
                                variant="outlined"
                                type="email"
                                // className="form-control"
                                // name="Personal Email"
                                // placeholder="Personal Email"
                                value={personalEmail}
                                onChange={(e) =>
                                  setPersonalEmail(e.target.value)
                                }
                              />
                            </div>

                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="official Contact"
                                variant="outlined"
                                type="text"
                                // className="form-control"
                                // name="official Contact"
                                // placeholder="official Contact"
                                value={contact}
                                onChange={handleContactChange}
                                onBlur={handleContentBlur}
                              />
                              {(isContactTouched || contact?.length >= 10) &&
                                !isValidcontact && (
                                  <p className="validation_message error">
                                    *Please enter valid number
                                  </p>
                                )}
                            </div>

                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Personal Contact"
                                variant="outlined"
                                type="text"
                                // className="form-control"
                                // name="Personal Contact"
                                // placeholder="Personal Contact"
                                value={personalContact}
                                onChange={handlePersonalContactChange}
                                onBlur={handleContentBlur}
                              />
                              {(isContactTouched1 ||
                                personalContact?.length >= 10) &&
                                !isValidcontact1 && (
                                  <p className="validation_message error">
                                    *Please enter valid number
                                  </p>
                                )}
                            </div>

                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Father Name"
                                variant="outlined"
                                type="text"
                                // className="form-control"
                                // name="father name"
                                // placeholder="Father Name"
                                value={FatherName}
                                onChange={(e) => setFatherName(e.target.value)}
                              />
                            </div>
                            <div className="form-group form_select">
                              {/* <Select
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
                            /> */}
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={genderData}
                                defaultValue={genderData[0]}
                                renderInput={(params) => (
                                  <TextField {...params} label="Gender" />
                                )}
                              />
                            </div>

                            <div className="from-group"></div>
                            {/* <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                name="father occupation "
                                placeholder="Father’s Occupation "
                              />
                            </div> */}
                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Mother Name"
                                variant="outlined"
                                type="text"
                                // className="form-control"
                                // name="mother name"
                                // placeholder="Mother Name"
                                value={motherName}
                                onChange={(e) => setMotherName(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Hobbies"
                                variant="outlined"
                                type="text"
                                // className="form-control"
                                // name="hobbies "
                                // placeholder="Hobbies "
                                value={hobbies}
                                onChange={(e) => setHobbies(e.target.value)}
                              />
                            </div>
                            <div className="form-group form_select">
                              {/* <Select
                                placeholder="Blood Group"
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
                              /> */}
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={bloodGroupData}
                                renderInput={(params) => (
                                  <TextField {...params} label="Blood Group" />
                                )}
                              />
                            </div>

                            <div className="form-group">
                              {/* <Select
                                placeholder="Maritial Status"
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
                                required
                              /> */}
                              <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={maritialStatusData}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Maritial Status"
                                  />
                                )}
                              />
                            </div>
                            {maritialStatus === "Married" && (
                              <div className="form-group">
                                <TextField
                                  id="outlined-basic"
                                  label="Spouse Name"
                                  variant="outlined"
                                  type="text"
                                  // className="form-control"
                                  // placeholder="Spouse Name"
                                  // name="Spouse Name"
                                  value={spouseName}
                                  onChange={(e) =>
                                    setSpouseName(e.target.value)
                                  }
                                />
                              </div>
                            )}
                            {maritialStatus == "Married" && (
                              <div className="form-group">
                                <TextField
                                  id="outlined-basic"
                                  label="Date Of Marriage"
                                  variant="outlined"
                                  // className="form-control"
                                  // label="Date Of Marriage"
                                  type="date"
                                  value={dateOfMarraige}
                                  onChange={(e) =>
                                    setDateOfMarraige(e.target.value)
                                  }
                                />
                              </div>
                            )}

                            <div className="form-group">
                              <Select
                                isMulti
                                name="languages"
                                options={colourOptions}
                                className="basic-multi-select"
                                classNamePrefix={tempLanguage}
                                onChange={handleLanguageSelect}
                              />
                            </div>

                            <div className="form-group Muiform_date">
                              <TextField
                                id="outlined-basic"
                                label="Date Of Birth"
                                variant="outlined"
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                              />
                            </div>

                            {/* <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Age"
                              value={age}
                            />
                          </div> */}
                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Login ID"
                                variant="outlined"
                                type="text"
                                // className="form-control"
                                // name="Login ID "
                                // placeholder="Login ID"
                                value={loginId}
                                onChange={handleLoginIdChange}
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={generateLoginId}
                                  type="button"
                                >
                                  <i className="bi bi-shuffle"></i>
                                </button>
                              </div>
                            </div>

                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Password"
                                variant="outlined"
                                type="text"
                                // className="form-control"
                                value={password}
                                // placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-outline-primary"
                                  onClick={generatePassword}
                                  type="button"
                                >
                                  <i class="bi bi-shuffle"></i>
                                </button>
                              </div>
                            </div>

                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Joining Date"
                                variant="outlined"
                                type="date"
                                // className="form-control"
                                // name="Joining Date "
                                // placeholder="Joining Date"
                                value={joiningDate}
                                onChange={(e) => setJoiningDate(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Nationality"
                                variant="outlined"
                                type="text"
                                value={nationality}
                                onChange={(e) => setNationality(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="board_form">
                            <h2>Current Address</h2>
                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Current Address"
                                variant="outlined"
                                type="text"
                                // className="form-control"
                                // name="complete address"
                                // placeholder="Complete Address"
                                value={currentAddress}
                                onChange={(e) =>
                                  setCurrentAddress(e.target.value)
                                }
                              />
                            </div>
                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="City"
                                variant="outlined"
                                type="text"
                                // className="form-control"
                                // name="City"
                                // placeholder="City"
                                value={currentCity}
                                onChange={(e) => setcurrentCity(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="State"
                                variant="outlined"
                                type="text"
                                // className="form-control"
                                // name="nearby landmark"
                                // placeholder="State"
                                value={currentState}
                                onChange={(e) =>
                                  setcurrentState(e.target.value)
                                }
                              />
                            </div>
                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Current Pincode"
                                variant="outlined"
                                type="text"
                                // className="form-control"
                                // name="pincode"
                                // placeholder="Pincode"
                                value={currentPincode}
                                onChange={(e) =>
                                  setcurrentPincode(e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="board_form form_checkbox">
                            <label class="cstm_check">
                              Same as Current Addresss
                              <input
                                className="form-control"
                                type="checkbox"
                                checked={sameAsCurrent}
                                onChange={handleCheckboxChange}
                              />
                              <span class="checkmark"></span>
                            </label>
                          </div>

                          <div className="board_form">
                            <h2>Permanent Address</h2>
                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Permanent Address"
                                variant="outlined"
                                type="text"
                                // className="form-control"
                                // name="complete address"
                                // placeholder="Complete Address"
                                value={permanentAddress}
                                onChange={(e) =>
                                  setPermanentAddress(e.target.value)
                                }
                              />
                            </div>
                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Permanent City"
                                variant="outlined"
                                type="text"
                                // className="form-control"
                                // name="City"
                                // placeholder="Ctiy"
                                value={permanentCity}
                                onChange={(e) =>
                                  setPermanentCity(e.target.value)
                                }
                              />
                            </div>
                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="State"
                                variant="outlined"
                                type="text"
                                // className="form-control"
                                // name="State"
                                // placeholder="State"
                                value={permanentState}
                                onChange={(e) =>
                                  setPermanentState(e.target.value)
                                }
                              />
                            </div>
                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Pincode"
                                variant="outlined"
                                type="text"
                                // className="form-control"
                                // name="pincode"
                                // placeholder="Pincode"
                                value={permanentPincode}
                                onChange={(e) =>
                                  setPermanentPincode(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="form-group ml-auto mr-auto text-center">
                            <button
                              className="btn btn_pill btn_cmn btn_white"
                              onClick={() => setActiveTab(2)}
                            >
                              Next
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
                {/* Form Screen End */}

                {/* Document Screen Start */}
                {activeTab == 2 && (
                  <div className="documentarea">
                    <div className="document_box">
                      <h2>Documents</h2>
                      <ul className="doc_items_list">
                        <li className="doc_list_item">
                          <div
                            className={
                              XMarksheet
                                ? "doc_item doc_item_active"
                                : "doc_item"
                            }
                          >
                            <p>10th Marksheet</p>
                            <input
                              type="file"
                              value=""
                              onChange={(e) => {
                                setXMarksheet(e.target.files[0]);
                              }}
                            />
                            <span
                              className="delete"
                              onClick={() => setXMarksheet(null)}
                            >
                              <a href="#">
                                <i className="bi bi-x-lg" />
                              </a>
                            </span>
                          </div>
                          {allUserData?.tenth_marksheet_validate ==
                            "Reject" && (
                            <div className="warning_badges reject">
                              <h4>Reject</h4>
                              <h5>
                                {allUserData?.tenth_marksheet_validate_remark}
                              </h5>
                            </div>
                          )}
                          {allUserData?.tenth_marksheet_validate ==
                            "Approve" && (
                            <div className="warning_badges approve">
                              <h4>Accepted</h4>
                            </div>
                          )}
                          {allUserData?.tenth_marksheet_validate ==
                            "Pending" && (
                            <div className="warning_badges reject">
                              <h4>Pending</h4>
                            </div>
                          )}
                        </li>

                        <li className="doc_list_item">
                          <div
                            className={
                              XIIMarksheet
                                ? "doc_item doc_item_active"
                                : "doc_item"
                            }
                          >
                            <p>12th Marksheet</p>
                            <input
                              type="file"
                              value=""
                              // name=""
                              onChange={(e) => {
                                setXIIMarksheet(e.target.files[0]);
                              }}
                            />

                            <span
                              className="delete"
                              onClick={() => setXIIMarksheet(null)}
                            >
                              <a href="#">
                                <i className="bi bi-x-lg" />
                              </a>
                            </span>
                          </div>
                          {allUserData?.twelveth_marksheet_validate ==
                            "Reject" && (
                            <div className="warning_badges reject">
                              <h4>Reject</h4>
                              <h5>
                                {
                                  allUserData?.twelveth_marksheet_validate_remark
                                }
                              </h5>
                            </div>
                          )}
                          {allUserData?.twelveth_marksheet_validate ==
                            "Approve" && (
                            <div className="warning_badges approve">
                              <h4>Accepted</h4>
                            </div>
                          )}
                          {allUserData?.twelveth_marksheet_validate ==
                            "Pending" && (
                            <div className="warning_badges reject">
                              <h4>Pending</h4>
                            </div>
                          )}
                        </li>
                        <li className="doc_list_item">
                          <div
                            className={
                              underGraduationDoc
                                ? "doc_item doc_item_active"
                                : "doc_item"
                            }
                          >
                            <p>Under Graduation</p>
                            <input
                              type="file"
                              value=""
                              onChange={(e) =>
                                setUnderGraduationDoc(e.target.files[0])
                              }
                            />

                            <span
                              className="delete"
                              onClick={() => setUnderGraduationDoc(null)}
                            >
                              <a href="#">
                                <i className="bi bi-x-lg" />
                              </a>
                            </span>
                          </div>
                          {allUserData?.UG_Marksheet_validate == "Reject" && (
                            <div className="warning_badges reject">
                              <h4>Reject</h4>
                              <h5>
                                {allUserData?.UG_Marksheet_validate_remark}
                              </h5>
                            </div>
                          )}
                          {allUserData?.UG_Marksheet_validate == "Approve" && (
                            <div className="warning_badges approve">
                              <h4>Accepted</h4>
                            </div>
                          )}
                          {allUserData?.UG_Marksheet_validate == "Pending" && (
                            <div className="warning_badges reject">
                              <h4>Pending</h4>
                            </div>
                          )}
                        </li>
                        <li className="doc_list_item">
                          <div
                            className={
                              uid ? "doc_item doc_item_active" : "doc_item"
                            }
                          >
                            <p>UID</p>
                            <input
                              type="file"
                              value=""
                              onChange={(e) => setUID(e.target.files[0])}
                            />

                            <span
                              className="delete"
                              onClick={() => setUID(null)}
                            >
                              <a href="#">
                                <i className="bi bi-x-lg" />
                              </a>
                            </span>
                          </div>
                          {allUserData?.uid_validate == "Reject" && (
                            <div className="warning_badges reject">
                              <h4>Reject</h4>
                              <h5>{allUserData?.uid_validate_remark}</h5>
                            </div>
                          )}
                          {allUserData?.uid_validate == "Approve" && (
                            <div className="warning_badges approve">
                              <h4>Accepted</h4>
                            </div>
                          )}
                          {allUserData?.uid_validate == "Pending" && (
                            <div className="warning_badges reject">
                              <h4>Pending</h4>
                            </div>
                          )}
                        </li>
                        <li className="doc_list_item">
                          <div
                            className={
                              panUpload
                                ? "doc_item doc_item_active"
                                : "doc_item"
                            }
                          >
                            <p>Pan Card</p>
                            <input
                              type="file"
                              value=""
                              onChange={(e) => setPanUpload(e.target.files[0])}
                            />

                            <span
                              className="delete"
                              onClick={() => setPanUpload(null)}
                            >
                              <a href="#">
                                <i className="bi bi-x-lg" />
                              </a>
                            </span>
                          </div>
                          {allUserData?.pan_validate == "Reject" && (
                            <div className="warning_badges reject">
                              <h4>Reject</h4>
                              <h5>{allUserData?.pan_remark}</h5>
                            </div>
                          )}
                          {allUserData?.pan_validate == "Approve" && (
                            <div className="warning_badges approve">
                              <h4>Accepted</h4>
                            </div>
                          )}
                          {allUserData?.pan_validate == "Pending" && (
                            <div className="warning_badges reject">
                              <h4>Pending</h4>
                            </div>
                          )}
                        </li>
                        <li className="doc_list_item">
                          <div
                            className={
                              Passport ? "doc_item doc_item_active" : "doc_item"
                            }
                          >
                            <p>Passport</p>
                            <input
                              type="file"
                              value=""
                              onChange={(e) => setPassport(e.target.files[0])}
                            />

                            <span
                              className="delete"
                              onClick={() => setPassport(null)}
                            >
                              <a href="#">
                                <i className="bi bi-x-lg" />
                              </a>
                            </span>
                          </div>
                          {allUserData?.passport_validate == "Reject" && (
                            <div className="warning_badges reject">
                              <h4>Reject</h4>
                              <h5>{allUserData?.passport_validate_remark}</h5>
                            </div>
                          )}
                          {allUserData?.passport_validate == "Approve" && (
                            <div className="warning_badges approve">
                              <h4>Accepted</h4>
                            </div>
                          )}
                          {allUserData?.passport_validate == "Pending" && (
                            <div className="warning_badges reject">
                              <h4>Pending</h4>
                            </div>
                          )}
                        </li>
                        <li className="doc_list_item">
                          <div
                            className={
                              previousOfferLetter
                                ? "doc_item doc_item_active"
                                : "doc_item"
                            }
                          >
                            <p>Previous Company’s Offer Letter</p>
                            <input
                              type="file"
                              value=""
                              onChange={(e) =>
                                setPreviousOfferLetter(e.target.files[0])
                              }
                            />

                            <span
                              className="delete"
                              onClick={() => setPreviousOfferLetter(null)}
                            >
                              <a href="#">
                                <i className="bi bi-x-lg" />
                              </a>
                            </span>
                          </div>
                          {allUserData?.pre_off_letter_validate == "Reject" && (
                            <div className="warning_badges reject">
                              <h4>Reject</h4>
                              <h5>
                                {allUserData?.pre_off_letter_validate_remark}
                              </h5>
                            </div>
                          )}
                          {allUserData?.pre_off_letter_validate ==
                            "Approve" && (
                            <div className="warning_badges approve">
                              <h4>Accepted</h4>
                            </div>
                          )}
                          {allUserData?.pre_off_letter_validate ==
                            "Pending" && (
                            <div className="warning_badges reject">
                              <h4>Pending</h4>
                            </div>
                          )}
                        </li>
                        <li className="doc_list_item">
                          <div
                            className={
                              previousRelievingLetter
                                ? "doc_item doc_item_active"
                                : "doc_item"
                            }
                          >
                            <p>Previous Company’s Relieving Letter</p>
                            <input
                              type="file"
                              value=""
                              onChange={(e) =>
                                setPreviousRelievingLetter(e.target.files[0])
                              }
                            />

                            <span
                              className="delete"
                              onClick={() => setPreviousRelievingLetter(null)}
                            >
                              <a href="#">
                                <i className="bi bi-x-lg" />
                              </a>
                            </span>
                          </div>
                          {allUserData?.pre_relieving_letter_validate ==
                            "Reject" && (
                            <div className="warning_badges reject">
                              <h4>Reject</h4>
                              <h5>
                                {allUserData?.pre_expe_letter_validate_remark}
                              </h5>
                            </div>
                          )}
                          {allUserData?.pre_relieving_letter_validate ==
                            "Approve" && (
                            <div className="warning_badges approve">
                              <h4>Accepted</h4>
                            </div>
                          )}
                          {allUserData?.pre_relieving_letter_validate ==
                            "Pending" && (
                            <div className="warning_badges reject">
                              <h4>Pending</h4>
                            </div>
                          )}
                        </li>
                        <li className="doc_list_item">
                          <div
                            className={
                              experienceDoc
                                ? "doc_item doc_item_active"
                                : "doc_item"
                            }
                          >
                            <p>Previous Company’s Experience Letter Letter</p>
                            <input
                              type="file"
                              value=""
                              onChange={(e) =>
                                setExperienceDoc(e.target.files[0])
                              }
                            />

                            <span
                              className="delete"
                              onClick={() => setExperienceDoc(null)}
                            >
                              <a href="#">
                                <i className="bi bi-x-lg" />
                              </a>
                            </span>
                          </div>
                          {allUserData?.pre_expe_letter_validate ==
                            "Reject" && (
                            <div className="warning_badges reject">
                              <h4>Reject</h4>
                              <h5>
                                {allUserData?.pre_expe_letter_validate_remark}
                              </h5>
                            </div>
                          )}
                          {allUserData?.pre_expe_letter_validate ==
                            "Approve" && (
                            <div className="warning_badges approve">
                              <h4>Accepted</h4>
                            </div>
                          )}
                          {allUserData?.pre_expe_letter_validate ==
                            "Pending" && (
                            <div className="warning_badges reject">
                              <h4>Pending</h4>
                            </div>
                          )}
                        </li>
                        <li className="doc_list_item">
                          <div
                            className={
                              passbookCheque
                                ? "doc_item doc_item_active"
                                : "doc_item"
                            }
                          >
                            <p>
                              Bank Passbook/Cancelled Cheque ( For Account
                              Registration )
                            </p>
                            <input
                              type="file"
                              value=""
                              onChange={(e) =>
                                setPassbookCheque(e.target.files[0])
                              }
                            />

                            <span
                              className="delete"
                              onClick={() => setPassbookCheque(null)}
                            >
                              <a href="#">
                                <i className="bi bi-x-lg" />
                              </a>
                            </span>
                          </div>
                          {allUserData?.bankPassBook_Cheque_validate ==
                            "Reject" && (
                            <div className="warning_badges reject">
                              <h4>Reject</h4>
                              <h5>
                                {
                                  allUserData?.bankPassBook_Cheque_validate_remark
                                }
                              </h5>
                            </div>
                          )}
                          {allUserData?.bankPassBook_Cheque_validate ==
                            "Approve" && (
                            <div className="warning_badges approve">
                              <h4>Accepted</h4>
                            </div>
                          )}
                          {allUserData?.bankPassBook_Cheque_validate ==
                            "Pending" && (
                            <div className="warning_badges reject">
                              <h4>Pending</h4>
                            </div>
                          )}
                        </li>
                      </ul>
                      <div className="ml-auto mr-auto text-center">
                        <button
                          className="btn btn_pill btn_cmn btn_white"
                          // type="submit"
                          onClick={handleSubmit}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* Document Screen End */}

                {/* Policy Screen Start */}
                {activeTab == 3 && (
                  <div className="policyarea">
                    <div className="thm_texthead">
                      <h2 className="text-center">Code of Conduct</h2>
                      <div className="thm_textarea">
                        <div className="thm_textbx">
                          <p>
                            As a team player, you are responsible to behave
                            appropriately at work. We outline our expectations
                            here. We can’t cover every single case of conduct,
                            but we trust you to always use your best judgment.
                            Always make decision in company’s best interest
                          </p>
                          <p>
                            Reach out to your manager or HR if you face any
                            issues or have any questions.
                          </p>
                        </div>
                        <div className="thm_textbx">
                          <h3>A. Cyber security and digital devices</h3>
                          <p>
                            This section deals with all things digital at work.
                            We want to set some guidelines for using computers,
                            phones, our internet connection and social media to
                            ensure security and protect our assets.
                          </p>
                        </div>
                        <div className="thm_textbx">
                          <h3>(1) Internet usage</h3>
                          <p>
                            Our corporate internet connection is primarily for
                            business. But, you can occasionally use our
                            connection for personal purposes as long as they
                            don’t interfere with your job responsibilities.
                            Also, we expect you to temporarily halt personal
                            activities that slow down our internet connection.
                          </p>
                        </div>
                      </div>
                      <div className="ml-auto mr-auto text-center">
                        {/* <button className="btn btn_pill btn_cmn btn_white">
                          Submit
                        </button> */}
                      </div>
                    </div>
                  </div>
                )}
                {/* Policy Screen End */}

                {/* FAQ Screen Start */}
                {activeTab == 4 && (
                  <div className="policyarea">
                    <div className="thm_texthead">
                      <h2 className="text-center">
                        FAQ (Frequently Asked Questions)
                      </h2>
                      <div className="thm_textarea">
                        <div className="thm_textbx">
                          <h3>1. What is this onboarding process for?</h3>
                          <p>
                            The on-boarding process is for all new Creative Fuel
                            employees to welcome them.
                          </p>
                        </div>
                        <div className="thm_textbx">
                          <h3>2. What will my First day look like?</h3>
                          <p>
                            You will have an orientation on your First day which
                            will help you adjust better in the work space.
                          </p>
                        </div>
                        <div className="thm_textbx">
                          <h3>3. How much on-the-job training is there?</h3>
                          <p>
                            On-the-training depends upon your experience and the
                            position you were hired for, most commonly, it does
                            not exceed 2 weeks.
                          </p>
                        </div>
                        <div className="thm_textbx">
                          <h3>
                            4. Information about the documents to be Filled
                            during the onboarding process.
                          </h3>
                          <p>
                            We have created an online on-boarding dashboard so
                            that you can easily access, which all documents are
                            required to get on-boarded.
                          </p>
                        </div>
                        <div className="thm_textbx">
                          <h3>
                            5. Who can I ask if I have questions about my job or
                            the company?
                          </h3>
                          <p>
                            The Human Resource team will always be readily
                            available to help you out with all your queries.
                          </p>
                        </div>
                        <div className="thm_textbx">
                          <h3>6. What is the leave policy?</h3>
                          <p>
                            Leaves must be scheduled in advance and in a manner
                            that balances both the individual desire &amp; the
                            company&#39;s need for appropriate coverage of team
                            and projects. Permission for WFH can be given in
                            case of a medical emergency only.
                          </p>
                          <p>
                            It&#39;s mandatory to inform us 48 Hrs prior. If
                            not, then the deduction will be doubled. No paid
                            leaves would be allowed. 2 days of WFH are allowed
                            during menstruation for female employees without any
                            deduction.
                          </p>
                        </div>
                        <div className="thm_textbx">
                          <h3>7. When and how do I get paid?</h3>
                          <p>
                            Refer to your Human Resources manager for any
                            compensation-related queries.
                          </p>
                        </div>
                        <div className="thm_textbx">
                          <h3>8. How do WFH works?</h3>
                          <p>
                            WFH is allowed only for severe medical reasons. 2
                            days of WFH are allowed during menstruation for
                            female employees.
                          </p>
                        </div>
                        <div className="thm_textbx">
                          <h3>
                            9. What’s the feedback form and how should I Fill it
                            out?
                          </h3>
                          <p>
                            Our employee feedback form will help us gather
                            honest feedback and to Find out how employees feel
                            about the work environment, employee beneits,
                            salary, company culture, or management. This
                            feedback form will be sent to you on your registered
                            mail id on your First day.
                          </p>
                        </div>
                      </div>
                      <div className="ml-auto mr-auto text-center">
                        <button className="btn btn_pill btn_cmn btn_white">
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* FAQ Screen End */}
                {activeTab == 5 && (
                  <form>
                    <div className="formarea">
                      {allUserData.joining_date_extend_status == "Reject" && (
                        <h1>Request is rejected</h1>
                      )}
                      {setAllUserData.joining_date_extend_status ==
                        "Approve" && <h1>Request is Accepted</h1>}
                      <div className="row spacing_lg">
                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                          <div className="board_form">
                            <h2>
                              Extend Joining Date <span></span>
                            </h2>
                            <h3>
                              Your Current Joning Date is:{" "}
                              <span>{joiningDate}</span>
                            </h3>
                            <div className="form-group">
                              {/* <input
                                className="form-control"
                                placeholder="Extend To"
                                type="date"
                                value={joingingExtendDate}
                                onChange={(e) =>
                                  setJoiningExtendDate(e.target.value)
                                }
                              /> */}

                              <TextField
                                id="outlined-basic"
                                label="Extend To"
                                variant="outlined"
                                type="date"
                                value={joingingExtendDate}
                                onChange={(e) =>
                                  setJoiningExtendDate(e.target.value)
                                }
                              />
                            </div>
                            {/* <div className="form-group">
                              <input
                                type="text"
                                placeholder="Reason"
                                className="form-control"
                                value={joiningExtendReason}
                                onChange={(e) =>
                                  setJoiningExtendReason(e.target.value)
                                }
                              />
                            </div> */}

                            <div className="form-group">
                              <TextField
                                id="outlined-basic"
                                label="Reason"
                                variant="outlined"
                                type="text"
                                value={joiningExtendReason}
                                onChange={(e) =>
                                  setJoiningExtendReason(e.target.value)
                                }
                              />
                            </div>

                            <div className="form-group">
                              <ul className="doc_items_list">
                                <li
                                  className={
                                    joingingExtendDocument
                                      ? "doc_item doc_item_active"
                                      : "doc_item"
                                  }
                                >
                                  <p>Upload file</p>
                                  <input
                                    type="file"
                                    value=""
                                    onChange={(e) =>
                                      setJoiningExtendDocument(
                                        e.target.files[0]
                                      )
                                    }
                                  />
                                  {/* {allUserData.tenth_marksheet_validate == "Reject" && (
                                    <>
                                      <h5>Rejected: Upload Again</h5>
                                      <h5>
                                        {allUserData?.tenth_marksheet_validate_remark}
                                      </h5>
                                    </>
                                  )} */}
                                  <span
                                    className="delete"
                                    onClick={() =>
                                      setJoiningExtendDocument(null)
                                    }
                                  >
                                    <a href="#">
                                      <i className="bi bi-x-lg" />
                                    </a>
                                  </span>
                                </li>
                              </ul>
                            </div>

                            {/* <div className="form-group">
                              <input
                                type="file"
                                placeholder="upload file here"
                                value={joingingExtendDocument}
                                onChange={(e) =>
                                  setJoiningExtendDocument(e.target.files[0])
                                }
                              />
                            </div> */}
                          </div>
                        </div>
                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                          <div className="form-group ml-auto mr-auto text-center">
                            <button
                              className="btn btn_pill btn_cmn btn_white"
                              onClick={handleJoiningExtend}
                            >
                              Request
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Dashboard Section End */}

      {/* Document Modal */}
      <div
        className="modal fade document_modal"
        id="documentModal"
        tabIndex={-1}
        aria-labelledby="documentModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="documentModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i className="bi bi-x-lg" />
              </button>
            </div>
            {/* <div className="modal-body">
              <div className="d-flex justify-content-center">
                {imagePreviewUrl && (
                  <img
                    style={{ height: "300px", width: "300px" }}
                    height={40}
                    src={imagePreviewUrl}
                    alt="Preview"
                  />
                )}
                {!imagePreviewUrl && <p>No image selected.</p>}
              </div>
            </div> */}
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn_pill btn_cmn btn_white"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreOnboardingUserMaster;
