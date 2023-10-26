import { useEffect, useState } from "react";
import "./UserView.css";
import Logo from "../../../assets/img/logo/logo.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import FormContainer from "../FormContainer";
import DataTable from "react-data-table-component";
import { FcDownload } from "react-icons/fc";
import DateFormattingComponent from "../../DateFormator/DateFormared";
import { get } from "jquery";
import WhatsappAPI from "../../WhatsappAPI/WhatsappAPI";
const UserSingle = () => {
  const whatsappApi = WhatsappAPI();
  const [KRIData, setKRIData] = useState([]);
  const { id } = useParams();
  const [subDeptId, setSubDeptId] = useState([]);
  const [subDept, setSubDept] = useState();
  const [otherDocuments, setOtherDocuments] = useState("");
  const [defaultSeatData, setDefaultSeatData] = useState([]);
  const [roomId, setRoomId] = useState();

  //documents Reason
  const [panReason, setPanReason] = useState("");
  const [panReasonActive, setPanReasonActive] = useState(false);

  const [uidReason, setUidReason] = useState("");
  const [uidReasonActive, setUidReasonActive] = useState(false);

  const [tenthMarksheetReason, setTenthMarksheetReason] = useState("");
  const [tenthMarksheetReasonActive, setTenthMarksheetReasonActive] =
    useState(false);

  const [twelfthMarksheetReason, setTwelfthMarksheetReason] = useState("");
  const [twelfthMarksheetReasonActive, setTwelfthMarksheetReasonActive] =
    useState(false);

  const [UGMarksheetReason, setUGMarksheetReason] = useState("");
  const [UGMarksheetReasonActive, setUGMarksheetReasonActive] = useState(false);

  const [passportReason, setPassportReason] = useState("");
  const [passportReasonActive, setPassportReasonActive] = useState(false);

  const [preOfferLetterReason, setPreviousOfferLetterReason] = useState("");
  const [preOfferLetterReasonActive, setPreviousOfferLetterReasonActive] =
    useState(false);

  const [preExpLetterReason, setPreExpLetterReason] = useState("");
  const [preExpLetterReasonActive, setPreExpLetterReasonActive] =
    useState(false);

  const [preRelievingLetterReason, setPreRelievingLetter] = useState("");
  const [preRelievingLetterReasonActive, setPreRelievingLetterActive] =
    useState(false);

  const [bankPassChequeReason, setBankPassChequeReason] = useState("");
  const [bankPassChequeReasonActive, setBankPassChequeReasonActive] =
    useState(false);
  //documents reason End

  const KRAAPI = (userId) => {
    axios.get(`http://44.211.225.140:8000/jobrespon/${userId}`).then((res) => {
      setKRIData(res.data);
    });
  };
  function userOtherDocuments() {
    axios
      .get(`http://192.168.29.116:8080/api/get_all_usersotherfielddata/${id}`)
      .then((res) => {
        setOtherDocuments(res.data.data);
      });
  }
  // const subDep = async (dept_id) => {
  //   await axios
  //     .get(`http://44.211.225.140:8000/subdept/${dept_id}`)
  //     .then((res) => {
  //       setSubDept(res.data);
  //     });
  // };
  useEffect(() => {
    axios.get("http://192.168.29.116:8080/api/get_all_sittings").then((res) => {
      setDefaultSeatData(res.data.data);
    });
    KRAAPI(id);
  }, []);

  const [activeAccordionIndex, setActiveAccordionIndex] = useState(0);

  const [user, setUser] = useState([]);
  let fetchedData;
  const getData = () => {
    axios.get(`http://44.211.225.140:8000/user/${id}`).then((res) => {
      fetchedData = res.data.data;
      const { dept_id } = fetchedData;
      setUser(fetchedData);
      setSubDeptId(dept_id);
    });
  };

  useEffect(() => {
    getData();
    // subDep(subDeptId);
    userOtherDocuments();
  }, [id]);

  const handleAccordionButtonClick = (index) => {
    setActiveAccordionIndex(index);
  };

  useEffect(() => {
    const selectedOption = defaultSeatData.find(
      (option) => option?.sitting_id === Number(user?.sitting_id)
    );
    setRoomId(selectedOption);
  }, [defaultSeatData, user?.sitting_id]);
  const accordionButtons = ["Genral", "Professional", "KRA", "Documents"];

  const handleVerification = (
    e,
    fieldName,
    action,
    reasonField,
    reason,
    emptyState,
    hideField
  ) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("id", Number(id));
    formData.append(fieldName, action);
    if (emptyState && hideField) {
      formData.append(reasonField, reason);
    }

    axios({
      method: "put",
      url: "http://44.211.225.140:8000/userupdate",
      data: formData,
    }).then(() => {
      if (emptyState) emptyState("");
      if (hideField) hideField(false);
    });

    whatsappApi
      .callWhatsAPI(
        "doc_approve_reject",
        user.user_contact_no,
        user.user_name,
        [action]
      )
      .then(() => getData())
      .then(() => {
        axios
          .post("http://44.211.225.140:8000/mail2", {
            email: fetchedData[0].user_email_id,
            subject: "User Onboard",
            text: "Your Some Document is not clear Plzz Upload Again",
            attachment: "profile",
            login_id: user.user_login_id,
            name: user.user_name,
            password: user.user_login_password,
          })
          .then((res) => {
            console.log("Email sent successfully:", res.data);
          })
          .catch((error) => {
            console.log("Failed to send email:", error);
          });
      });
  };

  const tab1 = (
    <>
      <div className="profileInfo_area">
        <div className="row profileInfo_row pt-0">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Name</h3>
              <h4>{user.user_name}</h4>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Gender</h3>
              <h4>{user.Gender}</h4>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Father Name</h3>
              <h4>{user.fatherName ? user.fatherName : "NA"}</h4>
            </div>
          </div>
        </div>
        <div className="row profileInfo_row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Email Id</h3>
              <h4>{user.user_email_id}</h4>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Personal Email</h3>
              <h4>{user.PersonalEmail ? user.PersonalEmail : "NA"}</h4>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Mother Name</h3>
              <h4>{user.motherName ? user.motherName : "NA"}</h4>
            </div>
          </div>
        </div>
        <div className="row profileInfo_row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Personal Number</h3>
              <h4>{user.PersonalNumber}</h4>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>User Contact No</h3>
              <h4>{user.user_contact_no}</h4>
            </div>
          </div>
          <div
            className={`${
              user.job_type === "WFH"
                ? "col-xl-4 col-lg-4 col-md-6 col-sm-12"
                : "col-xl-4 col-lg-4 col-md-6 col-sm-12"
            }`}
          >
            <div className="profileInfo_box">
              <h3>Spoken Languages</h3>
              <h4>{user.SpokenLanguages ? user.SpokenLanguages : "NA"}</h4>
            </div>
          </div>
        </div>
        {user.job_type === "WFH" && (
          <div className="row profileInfo_row">
            {user.job_type === "WFH" && (
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div className="profileInfo_box">
                  <h3>TDS Applicable</h3>
                  <h4>{user.tbs_applicable}</h4>
                </div>
              </div>
            )}
            {user.job_type === "WFH" && (
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div className="profileInfo_box">
                  <h3>TDS</h3>
                  <h4>{user.tds_per}</h4>
                </div>
              </div>
            )}
            {user.job_type === "WFH" && (
              <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                <div className="profileInfo_box">
                  <h3>Salary</h3>
                  <h4>{user.salary}</h4>
                </div>
              </div>
            )}
          </div>
        )}
        <div className="row profileInfo_row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Designation</h3>
              <h4>{user.designation_name}</h4>
            </div>
          </div>

          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Department</h3>
              <h4>{user.department_name}</h4>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Sub Department</h3>
              <h4>{user.sub_dept_name ? user.sub_dept_name : "NA"}</h4>
            </div>
          </div>
        </div>
        <div className="row profileInfo_row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Nationality</h3>
              <h4>{user.Role_name ? user.Nationality : "NA"}</h4>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Date Of Birth</h3>
              <h4>
                {" "}
                <DateFormattingComponent date={user.DOB} />
              </h4>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Age</h3>
              <h4>{user.Age ? user.Age : "NA"}</h4>
            </div>
          </div>
        </div>
        <div className="row profileInfo_row">
          {user.MartialStatus === "Married" && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <div className="profileInfo_box">
                <h3>Seat Number</h3>
                <h4>
                  {roomId?.Sitting_ref_no ? roomId?.Sitting_ref_no : "NA"}{" "}
                  {roomId?.Sitting_ref_no ? "|" : ""}{" "}
                  {roomId?.Sitting_area ? roomId?.Sitting_area : "NA"}
                </h4>
              </div>
            </div>
          )}
          {user.MartialStatus === "Married" && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <div className="profileInfo_box">
                <h3>user Status</h3>
                <h4>{user.user_status ? user.user_status : "NA"}</h4>
              </div>
            </div>
          )}
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Martial Status</h3>
              <h4>{user.MartialStatus ? user.MartialStatus : "NA"}</h4>
            </div>
          </div>
        </div>
        <div className="row profileInfo_row">
          {user.MartialStatus === "Married" && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <div className="profileInfo_box">
                <h3>Date Of Marriage</h3>
                <h4>
                  {" "}
                  <DateFormattingComponent date={user.DateOfMarriage} />
                </h4>
              </div>
            </div>
          )}
          {user.MartialStatus === "Married" && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
              <div className="profileInfo_box">
                <h3>Spouse Name</h3>
                <h4>{user.spouse_name}</h4>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
  const tab3 = (
    <>
      <DataTable
        columns={[
          {
            name: "s.no",
            cell: (row, index) => <div>{index + 1}</div>,
          },
          { name: "Name", selector: "user_name" },
          { name: "Department", selector: "department_name" },
          {
            name: "Job Responsibility",
            selector: "sjob_responsibility",
          },
        ]}
        data={KRIData}
        highlightOnHover
      />
    </>
  );

  const tab4 = (
    <>
      <div className="documentCard_view">
        <div className="row align-items-baseline">
          {user.image_url && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card documentCard_bx">
                <div className="card-body">
                  <div className="img-thumbnail">
                    <img
                      className="img-fluid"
                      src={user.image_url}
                      alt="user_photo"
                    />
                  </div>
                  <div className="documentCard_text">
                    <h3>Image</h3>
                  </div>
                </div>
              </div>
            </div>
          )}
          {user.pan_url && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card documentCard_bx">
                <div className="card-body">
                  <div className="img-thumbnail">
                    <img
                      className="img-fluid"
                      src={user.pan_url}
                      alt="user_photo"
                    />
                  </div>
                  <div className="documentCard_text">
                    <h3>PAN</h3>
                    <div className="documentCard_download">
                      <a href={user.pan_url} download>
                        <FcDownload />
                      </a>
                    </div>
                  </div>
                  <div className="documentCard_action">
                    <button
                      className="btn btn-sm btn-success"
                      type="button"
                      onClick={(e) =>
                        handleVerification(e, "pan_validate", "Approve")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      type="button"
                      onClick={() => setPanReasonActive(true)}
                    >
                      Reject
                    </button>
                    <div className="documentCard_message">
                      <p className="color_danger">
                        <i className="bi bi-check-circle-fill"></i>
                        <i className="bi bi-x-circle-fill"></i>
                        {user.pan_validate}
                      </p>
                    </div>
                  </div>

                  {panReasonActive && (
                    <div className="documentCard_input">
                      <input
                        className="form-control"
                        type="text"
                        value={panReason}
                        onChange={(e) => setPanReason(e.target.value)}
                      />
                      <button
                        className="btn btn-sm btn-primary"
                        type="button"
                        onClick={(e) =>
                          handleVerification(
                            e,
                            "pan_validate",
                            "Reject",
                            "pan_remark",
                            panReason,
                            setPanReason,
                            setPanReasonActive
                          )
                        }
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* {user.other_upload_url && (
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card documentCard_bx">
              <div className="card-body">
                  <div className="img-thumbnail">
                    <img
                      className="img-fluid"
                      src={user.other_upload_url}
                      alt="user_photo"
                    />
                  </div>
                <div className="d-flex justify-content-between mb-4">
                  <h3 className="fs-4 mt-2">Other</h3>
                  <a
                    className="fs-4 mb-2"
                    href={user.other_upload_url}
                    download
                  >
                    <FcDownload />
                  </a>
                </div>
                <div className="d-flex">
                  <button
                    type="button"
                    onClick={(e) =>
                      handleVerification(e, "pan_validate", "Approve")
                    }
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={(e) =>
                      handleVerification(e, "pan_validate", "Reject")
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        )} */}
          {/* {user.highest_upload_url && (
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card documentCard_bx">
              <div className="card-body">
                  <div className="img-thumbnail">
                    <img
                      src={user.highest_upload_url}
                      className="img-fluid"
                      alt="user_photo"
                    />
                  </div>
                <div className="d-flex justify-content-between">
                  <h3 className="fs-4 mt-2">Higest Qualification</h3>
                  <a
                    className="fs-4 mb-2"
                    href={user.highest_upload_url}
                    download
                  >
                    <FcDownload />
                  </a>
                </div>
                <div className="d-flex">
                  <button
                    type="button"
                    onClick={(e) =>
                      handleVerification(e, "pan_validate", "Approve")
                    }
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={(e) =>
                      handleVerification(e, "pan_validate", "Reject")
                    }
                  >
                    Reject
                  </button>
                </div>
                <h5 className="fs-6">
                  <span className="text-black-50 ">
                    Higest Qualification :-
                  </span>
                  {user.highest_qualification_name
                    ? user.highest_qualification_name
                    : "NA"}
                </h5>
              </div>
            </div>
          </div>
        )} */}
          {user.uid_url && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card documentCard_bx">
                <div className="card-body">
                  <div className="img-thumbnail">
                    <img
                      src={user.uid_url}
                      className="img-fluid"
                      alt="user_photo"
                    />
                  </div>
                  <div className="documentCard_text">
                    <h3>UID</h3>
                    <div className="documentCard_download">
                      <a href={user.uid_url} download>
                        <FcDownload />
                      </a>
                    </div>
                  </div>
                  <div className="documentCard_action">
                    <button
                      className="btn btn-sm btn-success"
                      type="button"
                      onClick={(e) =>
                        handleVerification(e, "uid_validate", "Approve")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      type="button"
                      onClick={() => setUidReasonActive(true)}
                    >
                      Reject
                    </button>
                  </div>
                  {uidReasonActive && (
                    <div className="documentCard_input">
                      <input
                        className="form-control"
                        type="text"
                        value={uidReason}
                        onChange={(e) => uidReason(e.target.value)}
                      />
                      <button
                        className="btn btn-sm btn-primary"
                        type="button"
                        onClick={(e) =>
                          handleVerification(
                            e,
                            "uid_validate",
                            "Reject",
                            "uid_remark",
                            uidReason,
                            setUidReason,
                            setUidReasonActive
                          )
                        }
                      >
                        Submit
                      </button>
                    </div>
                  )}
                  {/* <h2 className="fs-6 ">
                  <span className="lead text-black-50 fs-6">UID No :-</span>
                  {user.uid_no}
                </h2> */}
                </div>
              </div>
            </div>
          )}

          {/* rest */}
          {user.tenth_marksheet_url && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card documentCard_bx">
                <div className="card-body">
                  <div className="img-thumbnail">
                    <img
                      src={user.tenth_marksheet_url}
                      className="img-fluid"
                      alt="user_photo"
                    />
                  </div>
                  <div className="documentCard_text">
                    <h3>X Marksheet</h3>
                    <div className="documentCard_download">
                      <a href={user.tenth_marksheet_url} download>
                        <FcDownload />
                      </a>
                    </div>
                  </div>
                  <div className="documentCard_action">
                    <button
                      className="btn btn-sm btn-success"
                      type="button"
                      onClick={(e) =>
                        handleVerification(
                          e,
                          "tenth_marksheet_validate",
                          "Approve"
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      type="button"
                      onClick={() => setTenthMarksheetReasonActive(true)}
                    >
                      Reject
                    </button>
                  </div>
                  {tenthMarksheetReasonActive && (
                    <div className="documentCard_input">
                      <input
                        className="form-control"
                        type="text"
                        value={tenthMarksheetReason}
                        onChange={(e) =>
                          setTenthMarksheetReason(e.target.value)
                        }
                      />
                      <button
                        className="btn btn-sm btn-primary"
                        type="button"
                        onClick={(e) =>
                          handleVerification(
                            e,
                            "tenth_marksheet_validate",
                            "Reject",
                            "tenth_marksheet_validate_remark",
                            tenthMarksheetReason,
                            setTenthMarksheetReason,
                            setTenthMarksheetReasonActive
                          )
                        }
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {user.twelveth_marksheet_url && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card documentCard_bx">
                <div className="card-body">
                  <div className="img-thumbnail">
                    <img
                      src={user.twelveth_marksheet_url}
                      className="img-fluid"
                      alt="user_photo"
                    />
                  </div>
                  <div className="documentCard_text">
                    <h3>XII Marksheet</h3>
                    <div className="documentCard_download">
                      <a href={user.twelveth_marksheet_url} download>
                        <FcDownload />
                      </a>
                    </div>
                  </div>
                  <div className="documentCard_action">
                    <button
                      className="btn btn-sm btn-success"
                      type="button"
                      onClick={(e) =>
                        handleVerification(
                          e,
                          "twelveth_marksheet_validate",
                          "Approve"
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      type="button"
                      onClick={() => setTwelfthMarksheetReasonActive(true)}
                    >
                      Reject
                    </button>
                  </div>
                  {twelfthMarksheetReasonActive && (
                    <div className="documentCard_input">
                      <input
                        className="form-control"
                        type="text"
                        value={twelfthMarksheetReason}
                        onChange={(e) =>
                          setTwelfthMarksheetReason(e.target.value)
                        }
                      />
                      <button
                        className="btn btn-sm btn-primary"
                        type="button"
                        onClick={(e) =>
                          handleVerification(
                            e,
                            "twelveth_marksheet_validate",
                            "Reject",
                            "twelveth_marksheet_validate_remark",
                            twelfthMarksheetReason,
                            setTwelfthMarksheetReason,
                            setTwelfthMarksheetReasonActive
                          )
                        }
                      >
                        Submit
                      </button>
                    </div>
                  )}
                  {/* <h2 className="fs-6 ">
                  <span className="lead text-black-50 fs-6">UID No :-</span>
                  {user.uid_no}
                </h2> */}
                </div>
              </div>
            </div>
          )}

          {user.UG_Marksheet_url && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card documentCard_bx">
                <div className="card-body">
                  <div className="img-thumbnail">
                    <img
                      src={user.UG_Marksheet_url}
                      className="img-fluid"
                      alt="user_photo"
                    />
                  </div>
                  <div className="documentCard_text">
                    <h3>UG Marksheet</h3>
                    <div className="documentCard_download">
                      <a href={user.UG_Marksheet_url} download>
                        <FcDownload />
                      </a>
                    </div>
                  </div>
                  <div className="documentCard_action">
                    <button
                      className="btn btn-sm btn-success"
                      type="button"
                      onClick={(e) =>
                        handleVerification(
                          e,
                          "UG_Marksheet_validate",
                          "Approve"
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      type="button"
                      onClick={() => setUGMarksheetReasonActive(true)}
                    >
                      Reject
                    </button>
                  </div>
                  {UGMarksheetReasonActive && (
                    <div className="documentCard_input">
                      <input
                        className="form-control"
                        type="text"
                        value={UGMarksheetReason}
                        onChange={(e) => setUGMarksheetReason(e.target.value)}
                      />
                      <button
                        className="btn btn-sm btn-primary"
                        type="button"
                        onClick={(e) =>
                          handleVerification(
                            e,
                            "UG_Marksheet_validate",
                            "Reject",
                            "UG_Marksheet_validate_remark",
                            UGMarksheetReason,
                            setUGMarksheetReason,
                            setUGMarksheetReasonActive
                          )
                        }
                      >
                        Submit
                      </button>
                    </div>
                  )}
                  {/* <h2 className="fs-6 ">
                  <span className ="lead text-black-50 fs-6">UID No :-</span>
                  {user.uid_no}
                </h2> */}
                </div>
              </div>
            </div>
          )}

          {user.pasport_url && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card documentCard_bx">
                <div className="card-body">
                  <div className="img-thumbnail">
                    <img
                      src={user.pasport_url}
                      className="img-fluid"
                      alt="user_photo"
                    />
                  </div>
                  <div className="documentCard_text">
                    <h3>Passport</h3>
                    <div className="documentCard_download">
                      <a href={user.pasport_url} download>
                        <FcDownload />
                      </a>
                    </div>
                  </div>
                  <div className="documentCard_action">
                    <button
                      className="btn btn-sm btn-success"
                      type="button"
                      onClick={(e) =>
                        handleVerification(e, "passport_validate", "Approve")
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      type="button"
                      onClick={() => setPassportReasonActive(true)}
                    >
                      Reject
                    </button>
                  </div>
                  {passportReasonActive && (
                    <div className="documentCard_input">
                      <input
                        className="form-control"
                        type="text"
                        value={passportReason}
                        onChange={(e) => setPassportReason(e.target.value)}
                      />
                      <button
                        className="btn btn-sm btn-primary"
                        type="button"
                        onClick={(e) =>
                          handleVerification(
                            e,
                            "passport_validate",
                            "Reject",
                            "passport_validate_remark",
                            passportReason,
                            setPassportReason,
                            setPassportReasonActive
                          )
                        }
                      >
                        Submit
                      </button>
                    </div>
                  )}
                  {/* <h2 className="fs-6 ">
                  <span className ="lead text-black-50 fs-6">UID No :-</span>
                  {user.uid_no}
                </h2> */}
                </div>
              </div>
            </div>
          )}

          {user.pre_off_letter_url && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card documentCard_bx">
                <div className="card-body">
                  <div className="img-thumbnail">
                    <img
                      src={user.pre_off_letter_url}
                      className="img-fluid"
                      alt="user_photo"
                    />
                  </div>
                  <div className="documentCard_text">
                    <h3>Previous Company Offer Letter</h3>
                    <div className="documentCard_download">
                      <a href={user.pre_off_letter_url} download>
                        <FcDownload />
                      </a>
                    </div>
                  </div>
                  <div className="documentCard_action">
                    <button
                      className="btn btn-sm btn-success"
                      type="button"
                      onClick={(e) =>
                        handleVerification(
                          e,
                          "pre_off_letter_validate",
                          "Approve"
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      type="button"
                      onClick={() => setPreviousOfferLetterReasonActive(true)}
                    >
                      Reject
                    </button>
                  </div>
                  {preOfferLetterReasonActive && (
                    <div className="documentCard_input">
                      <input
                        className="form-control"
                        type="text"
                        value={preOfferLetterReason}
                        onChange={(e) =>
                          setPreviousOfferLetterReason(e.target.value)
                        }
                      />
                      <button
                        className="btn btn-sm btn-primary"
                        type="button"
                        onClick={(e) =>
                          handleVerification(
                            e,
                            "pre_off_letter_validate",
                            "Reject",
                            "pre_off_letter_validate_remark",
                            preOfferLetterReason,
                            setPreviousOfferLetterReason,
                            setPreviousOfferLetterReasonActive
                          )
                        }
                      >
                        Submit
                      </button>
                    </div>
                  )}
                  {/* <h2 className="fs-6 ">
                  <span className ="lead text-black-50 fs-6">UID No :-</span>
                  {user.uid_no}
                </h2> */}
                </div>
              </div>
            </div>
          )}

          {user.pre_expe_letter_url && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card documentCard_bx">
                <div className="card-body">
                  <div className="img-thumbnail">
                    <img
                      src={user.pre_expe_letter_url}
                      className="img-fluid"
                      alt="user_photo"
                    />
                  </div>
                  <div className="documentCard_text">
                    <h3>Experience Letter</h3>
                    <div className="documentCard_download">
                      <a href={user.pre_expe_letter_url} download>
                        <FcDownload />
                      </a>
                    </div>
                  </div>
                  <div className="documentCard_action">
                    <button
                      className="btn btn-sm btn-success"
                      type="button"
                      onClick={(e) =>
                        handleVerification(
                          e,
                          "pre_expe_letter_validate",
                          "Approve"
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      type="button"
                      onClick={() => setPreExpLetterReasonActive(true)}
                    >
                      Reject
                    </button>
                  </div>
                  {preExpLetterReasonActive && (
                    <div className="documentCard_input">
                      <input
                        className="form-control"
                        type="text"
                        value={preExpLetterReason}
                        onChange={(e) => setPreExpLetterReason(e.target.value)}
                      />
                      <button
                        className="btn btn-sm btn-primary"
                        type="button"
                        onClick={(e) =>
                          handleVerification(
                            e,
                            "pre_expe_letter_validate",
                            "Reject",
                            "pre_expe_letter_validate_remark",
                            preExpLetterReason,
                            setPreExpLetterReason,
                            setPreExpLetterReasonActive
                          )
                        }
                      >
                        Submit
                      </button>
                    </div>
                  )}
                  {/* <h2 className="fs-6 ">
                  <span className ="lead text-black-50 fs-6">UID No :-</span>
                  {user.uid_no}
                </h2> */}
                </div>
              </div>
            </div>
          )}

          {user.Pre_relieving_letter_url && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card documentCard_bx">
                <div className="card-body">
                  <div className="img-thumbnail">
                    <img
                      src={user.Pre_relieving_letter_url}
                      className="img-fluid"
                      alt="user_photo"
                    />
                  </div>
                  <div className="documentCard_text">
                    <h3>Relieving Letter</h3>
                    <div className="documentCard_download">
                      <a href={user.Pre_relieving_letter_url} download>
                        <FcDownload />
                      </a>
                    </div>
                  </div>
                  <div className="documentCard_action">
                    <button
                      className="btn btn-sm btn-success"
                      type="button"
                      onClick={(e) =>
                        handleVerification(
                          e,
                          "pre_relieving_letter_validate",
                          "Approve"
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      type="button"
                      onClick={() => setPreRelievingLetterActive(true)}
                    >
                      Reject
                    </button>
                  </div>
                  {preRelievingLetterReasonActive && (
                    <div className="documentCard_input">
                      <input
                        className="form-control"
                        type="text"
                        value={preRelievingLetterReason}
                        onChange={(e) => setPreRelievingLetter(e.target.value)}
                      />
                      <button
                        className="btn btn-sm btn-primary"
                        type="button"
                        onClick={(e) =>
                          handleVerification(
                            e,
                            "pre_relieving_letter_validate",
                            "Reject",
                            "pre_relieving_letter_validate_remark",
                            preRelievingLetterReason,
                            setPreRelievingLetter,
                            setPreRelievingLetterActive
                          )
                        }
                      >
                        Submit
                      </button>
                    </div>
                  )}
                  {/* <h2 className="fs-6 ">
                  <span className ="lead text-black-50 fs-6">UID No :-</span>
                  {user.uid_no}
                </h2> */}
                </div>
              </div>
            </div>
          )}

          {user.bankPassBook_Cheque_url && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <div className="card documentCard_bx">
                <div className="card-body">
                  <div className="img-thumbnail">
                    <img
                      src={user.bankPassBook_Cheque_url}
                      className="img-fluid"
                      alt="user_photo"
                    />
                  </div>
                  <div className="documentCard_text">
                    <h3>Bank Passbook/Cheque</h3>
                    <div className="documentCard_download">
                      <a href={user.bankPassBook_Cheque_url} download>
                        <FcDownload />
                      </a>
                    </div>
                  </div>
                  <div className="documentCard_action">
                    <button
                      className="btn btn-sm btn-success"
                      type="button"
                      onClick={(e) =>
                        handleVerification(
                          e,
                          "bankPassBook_Cheque_validate",
                          "Approve"
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      type="button"
                      onClick={() => setBankPassChequeReasonActive(true)}
                    >
                      Reject
                    </button>
                  </div>
                  {bankPassChequeReasonActive && (
                    <div className="documentCard_input">
                      <input
                        className="form-control"
                        type="text"
                        value={bankPassChequeReason}
                        onChange={(e) =>
                          setBankPassChequeReason(e.target.value)
                        }
                      />
                      <button
                        className="btn btn-sm btn-primary"
                        type="button"
                        onClick={(e) =>
                          handleVerification(
                            e,
                            "bankPassBook_Cheque_validate",
                            "Reject",
                            "bankPassBook_Cheque_validate_remark",
                            bankPassChequeReason,
                            setBankPassChequeReason,
                            setBankPassChequeReasonActive
                          )
                        }
                      >
                        Submit
                      </button>
                    </div>
                  )}
                  {/* <h2 className="fs-6 ">
                  <span className ="lead text-black-50 fs-6">UID No :-</span>
                  {user.uid_no}
                </h2> */}
                </div>
              </div>
            </div>
          )}

          {otherDocuments &&
            otherDocuments.map((item, i) => {
              return (
                <div
                  key={i}
                  className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12"
                >
                  <div className="card documentCard_bx">
                    <div className="card-body">
                      {/* <h2>{item.field_name}</h2> */}
                      <div className="img-thumbnail">
                        <img
                          src={item.field_value}
                          className="img-fluid"
                          alt="user_photo"
                        />
                      </div>
                      <div className="documentCard_text">
                        <h3>{item.field_name}</h3>
                        <div className="documentCard_download">
                          <a
                            className="fs-4 mb-2"
                            href={item.field_value}
                            download
                          >
                            <FcDownload />
                          </a>
                        </div>
                      </div>

                      {/* <h2 className="fs-6 "><span className="lead text-black-50 fs-6">UID No :-</span>{user.uid_no}</h2> */}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );

  const tab2 = (
    <>
      <div className="profileInfo_area">
        <div className="row profileInfo_row pt-0">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Report L1N Name</h3>
              <h4>{user.Report_L1N ? user.Report_L1N : "NA"}</h4>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Report L2N Name</h3>
              <h4>{user.Report_L2N ? user.Report_L2N : "NA"}</h4>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Report L3N Name</h3>
              <h4>{user.Report_L3N ? user.Report_L3N : "NA"}</h4>
            </div>
          </div>
        </div>
        <div className="row profileInfo_row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Job Type</h3>
              <h4>{user.job_type}</h4>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>User Status</h3>
              <h4>{user.user_status ? user.user_status : "NA"}</h4>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Joining Date</h3>
              <h4>
                <DateFormattingComponent
                  date={user.joining_date?.split("T")[0]}
                />
              </h4>
            </div>
          </div>
        </div>
        <div className="row profileInfo_row">
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Hobbies</h3>
              <h4>{user.Hobbies ? user.Hobbies : "NA"}</h4>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Blood Group</h3>
              <h4>{user.BloodGroup ? user.BloodGroup : "NA"}</h4>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div className="profileInfo_box">
              <h3>Role Name</h3>
              <h4>{user.Role_name ? user.Role_name : "NA"}</h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      <div className="box">
        <div id="content">
          <div className="profileInfo_imgbox">
            <img src={Logo} alt="Circular Image" className="img-fluid" />
          </div>
          <FormContainer
            submitButton={false}
            mainTitle="User"
            title="User Registration"
            accordionButtons={accordionButtons}
            activeAccordionIndex={activeAccordionIndex}
            onAccordionButtonClick={handleAccordionButtonClick}
          >
            {activeAccordionIndex === 0 && tab1}
            {activeAccordionIndex === 1 && tab2}
            {activeAccordionIndex === 2 && tab3}
            {activeAccordionIndex === 3 && tab4}
          </FormContainer>
        </div>
      </div>
    </>
  );
};

export default UserSingle;
