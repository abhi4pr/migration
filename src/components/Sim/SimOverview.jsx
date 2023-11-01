import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import FormContainer from "../AdminPanel/FormContainer";
import DeleteButton from "../AdminPanel/DeleteButton";
import UserNav from "../Pantry/UserPanel/UserNav";
import FieldContainer from "../AdminPanel/FieldContainer";
import jwtDecode from "jwt-decode";
import * as XLSX from "xlsx";
import Select from "react-select";
const SimOverview = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [designationData, setDesignationData] = useState([]);
  const [userData, setUserData] = useState([]);

  const [simTypeFilter, setSimTypeFilter] = useState("");
  const [providerFilter, setProviderFilter] = useState("");

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [designationFilter, setDesignationFilter] = useState("");

  const [simallocationdata, setSimAllocationData] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState("Allocated");

  const [selectedUserTransfer, setSelectedUserTransfer] = useState("");

  const [modalData, setModalData] = useState([]);

  const [particularUserName, setParticularUserName] = useState("");

  const [modalSelectedUserData, setModalSelectedUserData] = useState([]);

  const [simAllocationTransferData, setSimAllocationTransferData] = useState(
    []
  );
  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken.id;

  function getData() {
    axios.get("http://192.168.29.116:8080/api/get_all_sims").then((res) => {
      const simAllData = res.data.data;
      if (selectedStatus !== "") {
        const AvailableData = simAllData.filter(
          (data) => data.status == selectedStatus
        );
        setData(AvailableData);
        setFilterData(AvailableData);
      } else {
        setData(simAllData);
        setFilterData(simAllData);
      }
    });
  }

  useEffect(() => {
    const MSD = userData.filter((data) => data.user_id == selectedUserTransfer);
    // setSelectedModalUserData(modalSelectedUserData);
    console.log(MSD[0], "MSD");
    console.log(selectedUserTransfer);
    setModalSelectedUserData(MSD);
  }, [selectedUserTransfer]);
  useEffect(() => {
    getData();
  }, [selectedStatus]);

  useEffect(() => {
    axios
      .get("http://192.168.29.116:8080/api/get_all_departments")
      .then((res) => {
        setDepartmentData(res.data);
      });

    axios
      .get("http://192.168.29.116:8080/api/get_all_designations")
      .then((res) => {
        setDesignationData(res.data.data);
      });

    axios
      .get("http://192.168.29.116:8080/api/get_all_allocations")
      .then((res) => {
        setSimAllocationData(res.data.data);
      });

    axios.get("http://192.168.29.116:8080/api/get_all_users").then((res) => {
      setUserData(res.data.data);
    });
  }, []);

  useEffect(() => {
    const result = data.filter((d) => {
      const simTypeMatch =
        !simTypeFilter ||
        d.s_type.toLowerCase() === simTypeFilter.toLowerCase();
      const providerMatch =
        !providerFilter ||
        d.provider.toLowerCase() === providerFilter.toLowerCase();
      const departmentMatch = !departmentFilter || d.dept == departmentFilter;
      const designationMatch =
        !designationFilter || d.desi == designationFilter;
      return (
        simTypeMatch && providerMatch && departmentMatch && designationMatch
      );
    });
    setFilterData(result);
  }, [simTypeFilter, providerFilter, departmentFilter, designationFilter]);

  useEffect(() => {
    const result = data.filter((d) => {
      return (
        d.mobileNumber.toLowerCase().match(search.toLowerCase()) ||
        d.provider.toLowerCase().match(search.toLowerCase()) ||
        d.type.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterData(result);
  }, [search]);

  function handleParticularSimData(simId) {
    axios
      .get(`http://192.168.29.116:8080/api/get_single_sim/${simId}`)
      .then((res) => {
        setModalData(res.data.data);
      });
  }

  useEffect(() => {
    if (modalData) {
      const simAllocationTransfer = simallocationdata.filter(
        (data) => data.sim_id == modalData.sim_id
      );
      setSimAllocationTransferData(simAllocationTransfer);
      console.log(simAllocationTransfer, "simAllocationTransfer");
      console.log(modalData, "modalData");
      console.log(simallocationdata, "simallocationdata");
    }
  }, [modalData]);

  useEffect(() => {
    if (simAllocationTransferData.length > 0) {
      const commonUserId = userData.filter(
        (data) => data.user_id == simAllocationTransferData[0].user_id
      );
      setParticularUserName(commonUserId[0].user_name);
      console.log(
        simAllocationTransferData[0].user_id,
        "simAllocationTransferData[0].user_id"
      );
    }
  }, [simAllocationTransferData, userData]);

  function handleTransfer() {
    if (selectedUserTransfer != "") {
      const currDate = new Date().toISOString();
      const dateString = currDate.replace("T", " ").replace("Z", "");
      axios.put("http://192.168.29.116:8080/api/update_allocationsim", {
        sim_id: simAllocationTransferData[0].sim_id,
        id: simAllocationTransferData[0].allo_id,
        user_id: simAllocationTransferData[0].user_id,
        dept_id: modalSelectedUserData[0].dept_id,
        status: "Available",
        submitted_by: userID,
        Last_updated_by: userID,
        Reason: "",
        submitted_at: dateString,
      });

      axios.post("http://192.168.29.116:8080/api/add_sim_allocation", {
        user_id: Number(selectedUserTransfer),
        sim_id: Number(simAllocationTransferData[0].sim_id),
        dept_id: Number(modalSelectedUserData[0].dept_id),
        created_by: userID,
      });
      setSelectedUserTransfer("");
    } else {
      alert("Please Select User");
    }
  }

  function handleSimAllocation() {
    if (selectedUserTransfer !== "") {
      axios.post("http://192.168.29.116:8080/api/add_sim_allocation", {
        user_id: Number(selectedUserTransfer),

        sim_id: Number(modalData.sim_id),
        dept_id: Number(modalSelectedUserData[0].dept_id),
        created_by: userID,
      });

      axios.put("http://192.168.29.116:8080/api/update_sim", {
        id: modalData.sim_id,
        mobilenumber: modalData.mobileNumber,
        sim_no: modalData.sim_no,
        provider: modalData.provider,
        dept_id: Number(modalSelectedUserData[0].dept_id),
        desi_id: Number(modalSelectedUserData[0].user_designation),
        status: "Allocated",
        s_type: modalData.s_type,
        type: modalData.type,
        remark: modalData.Remarks,
      });
      setSelectedUserTransfer("");
    } else {
      alert("Please select user first");
    }
  }

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => <div>{index + 1}</div>,
      width: "5%",
      sortable: true,
    },
    {
      name: "Mobile Number",
      cell: (row) => (
        <Link to={`/sim-update/${row.sim_id}`}>{row.mobileNumber}</Link>
      ),
      sortable: true,
    },
    {
      name: "Sim Number",
      selector: (row) => row.sim_no,
      sortable: true,
    },
    {
      name: "Provider",
      selector: (row) => row.provider,
      sortable: true,
    },
    {
      name: "Allocated To",
      selector: (row) => row.allocated_username,
      sortable: true,
    },
    {
      name: "Sim Type",
      selector: (row) => row.s_type,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },
    {
      name: "Duration",
      selector: (row) => row.date_difference + " days",
    },
    {
      name: "Type",
      selector: (row) => row.type,
    },
    {
      name: "Designation",
      selector: (row) => row.designation,
    },
    {
      name: "Department",
      selector: (row) => row.department_name,
    },
    {
      name: "Remarks",
      selector: (row) => row.Remarks,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          <Link to={`/sim-update/${row.sim_id}`}>
            <button
              title="Edit"
              className="btn btn-outline-primary btn-sm user-button"
            >
              <FaEdit />{" "}
            </button>
          </Link>

          <DeleteButton
            endpoint="delete_sim"
            id={row.sim_id}
            getData={getData}
          />

          <Link to={`/sim-summary/${row.sim_id}`}>
            <button
              title="Summary"
              className="btn btn-outline-primary btn-sm user-button"
            >
              <i className="bi bi-journal-text"></i>
            </button>
          </Link>

          {selectedStatus == "Allocated" && (
            <button
              type="button"
              className="btn btn-outline-primary btn-sm user-button"
              data-toggle="modal"
              data-target="#exampleModal"
              data-whatever="@mdo"
              onClick={() => handleParticularSimData(row.sim_id)}
            >
              <i className="bi bi-arrow-up-right"></i>
            </button>
          )}

          {selectedStatus == "Available" && (
            <button
              type="button"
              className="btn btn-outline-primary btn-sm user-button"
              data-toggle="modal"
              data-target="#AllocationModal"
              data-whatever="@mdo"
              onClick={() => handleParticularSimData(row.sim_id)}
            >
              A
            </button>
          )}
        </>
      ),
      allowOverflow: true,
      width: "22%",
    },
  ];

  const [buttonAccess, setButtonAccess] = useState(false);

  const handleExport = () => {
    const fileName = "data.xlsx";
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <>
      <div>
        <UserNav />

        <div className="section section_padding sec_bg h100vh">
          <div className="container">
            <div className="action_heading">
              <div className="action_title">
                <FormContainer
                  mainTitle="Sim"
                  // addNewButtonName="Add New SIM"
                  link="/sim-master"
                  // buttonAccess={true}
                  submitButton={false}
                />
              </div>
              <div className="action_btns">
                <button
                  type="button"
                  className={"btn btn-outline-primary btn-sm"}
                >
                  <Link to="/sim-dashboard">Dashboard</Link>
                </button>
                <button
                  type="button"
                  className={`btn ${
                    selectedStatus == "Available"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  } btn-sm`}
                  onClick={() => setSelectedStatus("Available")}
                >
                  Available
                </button>
                <button
                  type="button"
                  className={`btn ${
                    selectedStatus == "Allocated"
                      ? "btn-primary"
                      : "btn-outline-primary"
                  } btn-sm`}
                  onClick={() => setSelectedStatus("Allocated")}
                >
                  Allocated
                </button>
                <button
                  type="button"
                  className={`btn ${
                    selectedStatus == "" ? "btn-primary" : "btn-outline-primary"
                  } btn-sm`}
                  onClick={() => setSelectedStatus("")}
                >
                  Master
                </button>

                <Link to="/sim-allocation-overview">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Return SIM
                  </button>
                </Link>
                <Link to="/sim-master">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm"
                  >
                    Add New SIM
                  </button>
                </Link>
              </div>
            </div>
            <div className="card mb-4">
              <div className="card-body pb0 pb4">
                <div className="row thm_form">
                  <FieldContainer
                    label="Sim Type"
                    Tag="select"
                    fieldGrid={3}
                    value={simTypeFilter}
                    onChange={(e) => setSimTypeFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Physical Sim">Physical Sim</option>
                    <option value="E-Sim">E-Sim</option>
                  </FieldContainer>
                  <FieldContainer
                    label="Provider"
                    Tag="select"
                    fieldGrid={3}
                    value={providerFilter}
                    onChange={(e) => setProviderFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Jio">Jio</option>
                    <option value="Airtel">Airtel</option>
                    <option value="Vodafone Idea (VI)">
                      Vodafone Idea (VI)
                    </option>
                    <option value="BSNL">BSNL</option>
                  </FieldContainer>
                  <FieldContainer
                    label="Department"
                    Tag="select"
                    fieldGrid={3}
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                  >
                    <option value="">All</option>
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
                    onChange={(e) => setDesignationFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    {designationData.map((option) => (
                      <option value={option.desi_id} key={option.desi_id}>
                        {option.desi_name}
                      </option>
                    ))}
                  </FieldContainer>
                </div>
              </div>
            </div>
            <div className="page_height">
              <div className="card mb-4">
                <div className="data_tbl table-responsive">
                  <DataTable
                    title="User Overview"
                    columns={columns}
                    data={filterdata}
                    fixedHeader
                    // pagination
                    fixedHeaderScrollHeight="64vh"
                    exportToCSV
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
                        <button onClick={handleExport}>Export TO Exvel</button>
                      </>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Start */}
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
                Transfer
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

            {/* Modal here----------------------- */}

            <div className="modal-body">
              <form className="modal_formdata">
                <div className="modal_formbx">
                  <ul>
                    <li>
                      <span>Mobile Number : </span>
                      {modalData.mobileNumber}
                    </li>
                    <li>
                      <span>Provider: </span>
                      {modalData.provider}
                    </li>
                    <li>
                      <span>Registered TO: </span>
                      {modalData.register}
                    </li>
                    <li>
                      <span>Sim No: </span>
                      {modalData.sim_no}
                    </li>
                    <li>
                      <span>Status: </span>
                      {modalData.status}
                    </li>
                    <li>
                      <span>Type : </span>
                      {modalData.type}
                    </li>
                    <li>
                      <span>Allocated To: </span>
                      {particularUserName}
                    </li>
                    <li>
                      <span>Sim Type: </span>
                      {modalData.s_type}
                    </li>
                  </ul>
                </div>
                {/* <div className="modal_formbx row thm_form">
                  <FieldContainer
                    label="Allocate TO"
                    fieldGrid={12}
                    Tag="select"
                    value={selectedUserTransfer}
                    onChange={(e) => setSelectedUserTransfer(e.target.value)}
                  >
                    <option value="">Please Select</option>
                    {userData.map((data) => (
                      <option value={data.user_id} key={data.user_id}>
                        {data.user_name}
                      </option>
                    ))}
                  </FieldContainer>
                </div> */}
                <div className="modal_formbx row thm_form">
                  <div className="form-group col-12">
                    <label className="form-label">
                      Allocate To <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <Select
                      className=""
                      options={userData.map((option) => ({
                        value: option.user_id,
                        label: `${option.user_name}`,
                      }))}
                      value={{
                        value: selectedUserTransfer,
                        label:
                          userData.find(
                            (user) => user.user_id == selectedUserTransfer
                          )?.user_name || "",
                      }}
                      onChange={(e) => {
                        setSelectedUserTransfer(e.value);
                      }}
                      required
                    />
                  </div>
                </div>
                {modalSelectedUserData.length > 0 && (
                  <div className="modal_formbx">
                    <ul>
                      <li>
                        <span>Department : </span>
                        {modalSelectedUserData[0].department_name}
                      </li>
                      <li>
                        <span>Designation : </span>
                        {modalSelectedUserData[0].designation_name}
                      </li>
                    </ul>
                  </div>
                )}
              </form>
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
                onClick={handleTransfer}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="AllocationModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="AllocationModal"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="AllocationModal">
                Allocation
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
              <form className="modal_formdata">
                <div className="modal_formbx">
                  <ul>
                    <li>
                      <span>Mobile Number : </span>
                      {modalData.mobileNumber}
                    </li>
                    <li>
                      <span>Provider: </span>
                      {modalData.provider}
                    </li>
                    <li>
                      <span>Registered TO: </span>
                      {modalData.register}
                    </li>
                    <li>
                      <span>Sim No: </span>
                      {modalData.sim_no}
                    </li>
                    <li>
                      <span>Status: </span>
                      {modalData.status}
                    </li>
                    <li>
                      <span>Type : </span>
                      {modalData.type}
                    </li>
                    <li>
                      <span>Sim Type: </span>
                      {modalData.s_type}
                    </li>
                  </ul>
                </div>
                {/* <div className="modal_formbx row thm_form">
                  <FieldContainer
                    label="Users"
                    Tag="select"
                    fieldGrid={12}
                    value={selectedUserTransfer}
                    onChange={(e) => setSelectedUserTransfer(e.target.value)}
                  >
                    <option value="">Please Select</option>
                    {userData.map((data) => (
                      <option value={data.user_id} key={data.user_id}>
                        {data.user_name}
                      </option>
                    ))}
                  </FieldContainer>
                </div> */}
                <div className="modal_formbx row thm_form">
                  <div className="form-group col-12">
                    <label className="form-label">
                      Allocate To <sup style={{ color: "red" }}>*</sup>
                    </label>
                    <Select
                      className=""
                      options={userData.map((option) => ({
                        value: option.user_id,
                        label: `${option.user_name}`,
                      }))}
                      value={{
                        value: selectedUserTransfer,
                        label:
                          userData.find(
                            (user) => user.user_id == selectedUserTransfer
                          )?.user_name || "",
                      }}
                      onChange={(e) => {
                        setSelectedUserTransfer(e.value);
                      }}
                      required
                    />
                  </div>
                </div>

                {modalSelectedUserData.length > 0 && (
                  <div className="modal_formbx">
                    <ul>
                      <li>
                        <span>Department : </span>
                        {modalSelectedUserData[0].department_name}
                      </li>
                      <li>
                        <span>Designation : </span>
                        {modalSelectedUserData[0].designation_name}
                      </li>
                    </ul>
                  </div>
                )}
              </form>
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
                onClick={handleSimAllocation}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SimOverview;
