import { useEffect, useState } from "react";
import axios from "axios";
import "./ShowData.css";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import { RiLoginBoxLine } from "react-icons/ri";
import FormContainer from "../FormContainer";
import DeleteButton from "../DeleteButton";
import jwtDecode from "jwt-decode";
import FieldContainer from "../FieldContainer";
import Select from "react-select";
import { useGlobalContext } from "../../../Context/Context";
import Modal from "react-modal";
import WhatsappAPI from "../../WhatsappAPI/WhatsappAPI";

const UserOverview = () => {
  const whatsappApi = WhatsappAPI();
  const { toastAlert } = useGlobalContext();
  const [search, setSearch] = useState("");
  const [datas, setDatas] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [isloading, setLoading] = useState(true);
  const [contextData, setData] = useState([]);

  const [departmentData, setDepartmentData] = useState([]);
  const [designationData, setDesignationData] = useState([]);
  const [desiOrgData, setDesiOrgData] = useState([]);

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");
  const [jobType, setJobType] = useState("");

  const [transferResponsibilityData, setTransferResponsibilityData] = useState(
    []
  );
  const [remark, setRemark] = useState("");
  const [transferTo, setTransferTo] = useState(0);
  const [transferToUser, setTransferToUser] = useState([]);

  const [username, setUserName] = useState("");
  const [usercontact, setUserContact] = useState("");

  const navigate = useNavigate();
  const storedToken = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(storedToken);
  const userID = decodedToken.id;
  const roleToken = decodedToken.role_id;

  const oldToken = sessionStorage.getItem("token");

  const [checkedData, setCheckedData] = useState([]);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [separationReasonGet, setSeparationReasonGet] = useState([]);
  const [separationUserID, setSeparationUserID] = useState(null);
  const [separationStatus, setSeparationStatus] = useState("");
  const [separationReason, setSeparationReason] = useState("");
  const [separationRemark, setSeparationRemark] = useState("");
  const [separationReinstateDate, setSeparationReinstateDate] = useState("");
  const [separationResignationDate, setSeparationResignationDate] =
    useState("");
  const [separationLWD, setSeparationLWD] = useState("");

  const [filterCriteria, setFilterCriteria] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [KRIData, setKRIData] = useState([]);
  const handleKRA = (userId) => {
    setIsModalOpen(true);
    KRAAPI(userId);
  };
  const KRAAPI = (userId) => {
    axios
      .get(`http://192.168.29.116:8080/api/get_single_kra/${userId}`)
      .then((res) => {
        setKRIData(res.data);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setKRIData([]);
  };

  function handleSeprationReason(userId, username, user_contact_no) {
    setSeparationUserID(userId);
    setUserName(username);
    setUserContact(user_contact_no);
    axios
      .get("http://192.168.29.116:8080/api/get_all_reasons")
      .then((res) => setSeparationReasonGet(res.data));
  }

  function handleSeparationDataPost() {
    axios.post("http://192.168.29.116:8080/api/add_separation", {
      user_id: separationUserID,
      status: separationStatus,
      created_by: userID,
      resignation_date: separationResignationDate,
      last_working_day: separationLWD,
      remark: separationRemark,
      reason: separationReason,
    });
    whatsappApi.callWhatsAPI("separation user", usercontact, username, [
      separationStatus,
    ]);
  }

  useEffect(() => {
    if (userID && contextData.length === 0) {
      axios
        .get(
          `http://192.168.29.116:8080/api/get_single_user_auth_detail/${userID}`
        )
        .then((res) => {
          setData(res.data);
        });
    }
  }, [userID]);

  // Admin Login from User
  const handleLogin = (user_id, user_login_id, user_login_password) => {
    axios
      .post("http://192.168.29.116:8080/api/login_user", {
        user_id: user_id,
        user_login_id: user_login_id,
        user_login_password: user_login_password,
        role_id: roleToken,
      })
      .then((res) => {
        const token1 = res.data.token;
        sessionStorage.getItem("token", token1);
        if (oldToken && token1) {
          sessionStorage.setItem("token", token1);
          window.open("/", "_blank");
          sessionStorage.setItem("token", oldToken);
        } else {
          navigate("/admin/user-overview");
        }
      });
  };

  async function getData() {
    try {
      const response = await axios.get(
        "http://192.168.29.116:8080/api/get_all_users"
      );
      // const data = response.data.data.filter(
      //   (item) => item.onboard_status !== 2
      // );
      const data = response.data.data;
      setDatas(data);
      setFilterData(data);
      setTransferToUser(data);
    } catch (error) {
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  }

  const departmentAPI = () => {
    axios
      .get("http://192.168.29.116:8080/api/get_all_departments")
      .then((res) => {
        setDepartmentData(res.data);
        getData();
      });
  };

  const designationAPI = () => {
    axios
      .get("http://192.168.29.116:8080/api/get_all_designations")
      .then((res) => {
        setDesiOrgData(res.data.data);
      });
  };

  useEffect(() => {
    getData();
    departmentAPI();
    designationAPI();
  }, []);

  useEffect(() => {
    const deptWiseDesi = desiOrgData.filter(
      (d) => d.dept_id == departmentFilter
    );
    setDesignationData(deptWiseDesi);
  }, [departmentFilter]);

  useEffect(() => {
    const result1 = datas.filter((d) => {
      return (
        d.user_name?.toLowerCase().includes(search.toLowerCase()) ||
        d.department_name?.toLowerCase().includes(search.toLowerCase())
      );
    });
    setFilterData(result1);
  }, [search]);

  useEffect(() => {
    const result = datas.filter((d) => {
      const departmentMatch =
        !departmentFilter || d.dept_id == departmentFilter;
      const designationMatch =
        !designationFilter || d.user_designation == designationFilter;
      const jobtypeMatch = !jobType || d.job_type == jobType;
      return departmentMatch && designationMatch && jobtypeMatch;
    });
    setFilterData(result);
  }, [departmentFilter, designationFilter, jobType]);

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => <div>{index + 1}</div>,
      width: "5%",
      sortable: true,
    },
    {
      name: "User Name",
      selector: (row) => (
        <>
          <Link to={`/admin/user-single/${row.user_id}`}>
            <span style={{ color: "blue" }}>{row.user_name}</span>
          </Link>
        </>
      ),
      width: "10%",
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => row.Role_name,
      width: "5%",
      sortable: true,
    },
    {
      name: "Login ID",
      selector: (row) => row.user_login_id,
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designation_name,
      sortable: true,
      width: "10%",
    },
    {
      name: "Department",
      selector: (row) => row.department_name,
      sortable: true,
    },
    // {
    //   name: "Contact No",
    //   selector: (row) => row.user_contact_no,
    // },
    {
      name: "Email",
      selector: (row) => row.user_email_id,
      width: "16%",
    },
    {
      name: "Status",
      selector: (row) => row.user_status,
      width: "4%",
      // cell: (row) => (
      //   <>
      //     {row.user_status === "Active" ? (
      //       <span className="badge badge-success">Active</span>
      //     ) : (
      //       <span className="badge badge-warning">Inactive</span>
      //     )}
      //   </>
      // ),
      cell: (row) => (
        <>
          {row.user_status === "Active" ? (
            <span className="badge badge-success">Active</span>
          ) : row.user_status === "Exit" || row.user_status === "On Leave" ? (
            <span className="badge badge-warning">{row.user_status}</span>
          ) : row.user_status === "Resign" ? (
            <span className="badge badge-danger">Resigned</span>
          ) : null}
        </>
      ),
    },
    {
      name: "Auth",
      width: "6%",
      cell: (row) => (
        <>
          {contextData &&
            contextData[0] &&
            contextData[0].update_value === 1 && (
              <Link to={`/admin/user-auth-detail/${row.user_id}`}>
                <button className="btn btn-primary btn-sm">Auth</button>
              </Link>
            )}
        </>
      ),
    },
    {
      name: "KRA",
      width: "6%",
      cell: (row) => (
        <>
          {contextData &&
            contextData[0] &&
            contextData[0].update_value === 1 && (
              // <Link to={`/admin/user-auth-detail/${row.user_id}`}>
              <button
                onClick={() => handleKRA(row.user_id)}
                className="btn btn-primary btn-sm"
              >
                KRA
              </button>
              /* </Link> */
            )}
        </>
      ),
    },

    {
      name: "Log",
      cell: (row) => (
        <button
          title="Login"
          className="btn btn-primary btn-sm"
          onClick={() =>
            handleLogin(row.user_id, row.user_login_id, row.user_login_password)
          }
        >
          <RiLoginBoxLine />
        </button>
      ),
      width: "5%",
    },
    {
      name: "Transfer Res",
      selector: (row) => (
        <button
          type="button"
          className="btn btn-outline-warning btn-sm"
          data-toggle="modal"
          data-target="#exampleModal1"
          data-whatever="@mdo"
          onClick={() => handleTransfer(row.user_id)}
        >
          Transfer
        </button>
      ),
      width: "8%",
    },
    {
      name: "Separation",
      selector: (row) => (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={() =>
              handleSeprationReason(
                row.user_id,
                row.user_name,
                row.user_contact_no
              )
            }
          >
            Sep
          </button>
        </>
      ),
      width: "7%",
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          {contextData &&
            contextData[0] &&
            contextData[0].update_value === 1 && (
              <Link to={`/admin/user-update/${row.user_id}`}>
                <button
                  title="Edit"
                  className="btn btn-outline-primary btn-sm user-button"
                >
                  <FaEdit />
                </button>
              </Link>
            )}
          {/* <Link to={`/admin/user_view/${row.user_id}`}>
            <button title="View" className="btn btn-outline-success btn-sml">
              <BsFillEyeFill />{" "}
            </button>
          </Link> */}
          {contextData &&
            contextData[0] &&
            contextData[0].delete_flag_value === 1 && (
              <DeleteButton
                endpoint="delete_user"
                id={row.user_id}
                getData={getData}
              />
            )}
        </>
      ),
      allowOverflow: true,
      width: "22%",
    },
  ];

  const handleTransfer = (userId) => {
    axios
      .get(`http://192.168.29.116:8080/api/get_single_kra/${userId}`)
      .then((res) => {
        setTransferResponsibilityData(res.data);
      });
  };

  function handleAllCheckedData(event) {
    if (event.target.checked) {
      setCheckedData([...transferResponsibilityData]);
    } else {
      setCheckedData([]);
      const checkboxes = document.querySelectorAll(`input[type="checkbox"]`);
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
  }

  function handleCheckedData(row) {
    if (checkedData.includes(row)) {
      setCheckedData(checkedData.filter((r) => r !== row));
    } else {
      setCheckedData([...checkedData, row]);
    }
  }

  const handleTransferSubmit = () => {
    for (const element of checkedData) {
      const requestData = {
        user_to_id: transferTo,
        remarks: remark,
        created_by: userID,
        user_from_id: element.user_id,
        job_responsibility_id: element.Job_res_id,
        Job_res_id: element.Job_res_id,
      };
      axios
        .post("http://192.168.29.116:8080/api/add_kra", requestData)
        .then((res) => {
          setRemark("");
          setTransferTo("");
          toastAlert("KRA Transfer Successfully");

          const MailUser = transferToUser.find((d) => d.user_id == transferTo);

          axios.post("http://192.168.29.116:8080/api/add_send_user_mail", {
            email: MailUser.user_email_id,
            subject: "User Registration",
            text: "You Have Assign New KRA",
            // attachment: selectedImage,
            // login_id: loginId,
            // name: username,
            // password: password,
          });
        });
    }
  };

  return (
    <>
      <div className="action_heading">
        <div className="action_title">
          <FormContainer
            mainTitle="User"
            link="/admin/user"
            submitButton={false}
          />
        </div>
        <div className="action_btns">
          <Link to="/admin/reason">
            <button type="button" className="btn btn-outline-primary btn-sm">
              Reason
            </button>
          </Link>
          <Link to="/admin/role-overview">
            <button type="button" className="btn btn-outline-primary btn-sm">
              User Roles
            </button>
          </Link>
          <Link to="/admin/users-dashboard">
            <button type="button" className="btn btn-outline-primary btn-sm">
              Dashboard
            </button>
          </Link>
          {contextData && contextData[3] && contextData[3].view_value === 1 && (
            <Link to="/admin/department-overview">
              <button type="button" className="btn btn-outline-primary btn-sm">
                Department
              </button>
            </Link>
          )}
          {contextData && contextData[3] && contextData[3].view_value === 1 && (
            <Link to="/admin/sub-department-overview">
              <button type="button" className="btn btn-outline-primary btn-sm">
                Sub Department
              </button>
            </Link>
          )}
          {contextData &&
            contextData[10] &&
            contextData[10].view_value === 1 && (
              <Link to="/admin/designation-overview">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                >
                  Designation
                </button>
              </Link>
            )}
          {contextData &&
            contextData[0] &&
            contextData[0].insert_value === 1 && (
              <Link to="/admin/user">
                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm"
                >
                  Add New User
                </button>
              </Link>
            )}
        </div>
      </div>

      {isloading ? (
        <div className="loader">
          <div>
            <ul>
              <li>
                <svg fill="currentColor" viewBox="0 0 90 120">
                  <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                </svg>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 90 120">
                  <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                </svg>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 90 120">
                  <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                </svg>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 90 120">
                  <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                </svg>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 90 120">
                  <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                </svg>
              </li>
              <li>
                <svg fill="currentColor" viewBox="0 0 90 120">
                  <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z"></path>
                </svg>
              </li>
            </ul>
          </div>
          <span>Loading</span>
        </div>
      ) : (
        <div className="page_height">
          <div className="card mb-4">
            <div className="card-body pb0 pb4">
              <div className="row thm_form">
                <FieldContainer
                  label="Department"
                  Tag="select"
                  fieldGrid={3}
                  value={departmentFilter}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    setDepartmentFilter(selectedValue);
                    if (selectedValue === "All") {
                      getData();
                    }
                  }}
                >
                  <option value="All">All</option>
                  {departmentData.map((option) => (
                    <option value={option.dept_id} key={option.dept_id}>
                      {option.dept_name}
                    </option>
                  ))}
                </FieldContainer>
                <FieldContainer
                  label="Designation"
                  Tag="select"
                  fieldGrid={3}
                  value={designationFilter}
                  onChange={(e) => {
                    const desiAll = e.target.value;
                    setDesignationFilter(desiAll);
                  }}
                >
                  <option value="All">All</option>
                  {designationData.map((option) => (
                    <option value={option.desi_id} key={option.desi_id}>
                      {option.desi_name}
                    </option>
                  ))}
                </FieldContainer>
                <FieldContainer
                  label="Job Type"
                  Tag="select"
                  fieldGrid={3}
                  value={jobType}
                  onChange={(e) => {
                    setJobType(e.target.value);
                  }}
                >
                  <option value="WFO">WFO</option>
                  <option value="WFH">WFH</option>
                </FieldContainer>
              </div>
            </div>
            <div className="data_tbl table-responsive">
              <DataTable
                title="User Overview"
                columns={columns}
                data={filterdata}
                fixedHeader
                // pagination
                fixedHeaderScrollHeight="64vh"
                highlightOnHover
                subHeader
                subHeaderComponent={
                  <>
                    <input
                      type="text"
                      placeholder="Search here"
                      className="w-50 form-control "
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </>
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Modal here  */}
      <div
        className="modal fade"
        id="exampleModal1"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div
            className="modal-content"
            style={{ height: "90vh", overflow: "scroll", width: "140%" }}
          >
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Transfer KRA
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div>
                <div className="row">
                  <div className="form-group col-3">
                    <label className="form-label">
                      Transfer Kra <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <Select
                      className=""
                      options={transferToUser.map((option) => ({
                        value: option.user_id,
                        label: `${option.user_name}`,
                      }))}
                      value={{
                        value: transferTo,
                        label:
                          transferToUser.find(
                            (user) => user.user_id === transferTo
                          )?.user_name || "",
                      }}
                      onChange={(e) => {
                        setTransferTo(e.value);
                      }}
                      required
                    />
                  </div>
                  <div className="form-group col-9">
                    <label className="form-label">Reason</label>
                    <input
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                      className="form-control"
                      type="text"
                    />
                  </div>
                </div>
                <DataTable
                  columns={[
                    {
                      name: (
                        <input
                          type="checkbox"
                          checked={
                            checkedData.length ===
                            transferResponsibilityData.length
                          }
                          onChange={handleAllCheckedData}
                        />
                      ),
                      cell: (row) => (
                        <input
                          type="checkbox"
                          checked={checkedData.includes(row)}
                          onChange={() => handleCheckedData(row)}
                        />
                      ),
                    },
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
                  data={transferResponsibilityData}
                  highlightOnHover
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                onClick={() => handleTransferSubmit()}
                className="btn btn-primary"
              >
                Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Separation
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <FieldContainer
                label="Status"
                Tag="select"
                value={separationStatus}
                onChange={(e) => setSeparationStatus(e.target.value)}
              >
                <option value="" disabled>
                  Choose...
                </option>
                <option value="Resigned">Resigned</option>
                <option value="Resign Accepted">Resign Accepted</option>
                <option value="On Long Leave">On Long Leave</option>
                <option value="Subatical">Subatical</option>
                <option value="Suspended">Suspended</option>
              </FieldContainer>
              <FieldContainer
                label="Reason"
                Tag="select"
                value={separationReason}
                onChange={(e) => setSeparationReason(e.target.value)}
              >
                {separationReasonGet.map((option) => (
                  <option value={option.id} key={option.id}>
                    {" "}
                    {option.reason}
                  </option>
                ))}
              </FieldContainer>
              <FieldContainer
                label="Remark"
                value={separationRemark}
                onChange={(e) => setSeparationRemark(e.target.value)}
              />
              {/* {["On Long Leave", "Subatical", "Suspended"].includes(
                separationStatus
              ) && (
                <FieldContainer
                  label="Reinstated Date"
                  type="date"
                  value={separationReinstateDate}
                  onChange={(e) => setSeparationReinstateDate(e.target.value)}
                />
              )} */}
              {(separationStatus === "On Long Leave" ||
                separationStatus === "Subatical" ||
                separationStatus === "Suspended") && (
                <FieldContainer
                  label="Reinstated Date"
                  type="date"
                  value={separationReinstateDate}
                  onChange={(e) => setSeparationReinstateDate(e.target.value)}
                />
              )}
              {separationStatus == "Resign Accepted" && (
                <FieldContainer
                  label="Last Working Day"
                  type="date"
                  value={separationLWD}
                  onChange={(e) => setSeparationLWD(e.target.value)}
                />
              )}
              {separationStatus == "Resigned" && (
                <FieldContainer
                  label="Resignation Date"
                  type="date"
                  value={separationResignationDate}
                  onChange={(e) => setSeparationResignationDate(e.target.value)}
                />
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSeparationDataPost()}
                data-dismiss="modal"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for user KRA */}
      <Modal
        appElement={document.getElementById("root")}
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={{
          content: {
            width: "80%",
            height: "85%",
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <>
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              KRA
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={handleCloseModal}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

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
      </Modal>
    </>
  );
};
export default UserOverview;
