import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import { useGlobalContext } from "../../../Context/Context";
import DataTable from "react-data-table-component";
import { Autocomplete, TextField } from "@mui/material";

const PendingApprovalUpdate = () => {
  const { toastAlert } = useGlobalContext();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [datas, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [contextData, setDatas] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [status, setStatus] = useState("");

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  const handleStatusChange = async (row, selectedStatus) => {
    setStatus(selectedStatus);

    const formData = new FormData();
    formData.append("loggedin_user_id", 36);
    formData.append("payment_update_id", row.payment_update_id);
    formData.append("payment_approval_status", selectedStatus);
    formData.append("sale_booking_id", row.sale_booking_id);
    formData.append("action_reason", "");

    await axios.post(
      "https://production.sales.creativefuel.io/webservices/RestController.php?view=change_payment_update_status",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toastAlert("Data updated");
    setIsFormSubmitted(true);
  };

  function getData() {
    axios
      .post("http://34.93.135.33:8080/api/add_php_finance_data_in_node")
      .then((res) => {
        console.log("data save in local success");
      });
    axios
      .get("http://34.93.135.33:8080/api/get_all_php_finance_data_pending")
      .then((res) => {
        setData(res.data.data);
        setFilterData(res.data.data);
      });
  }

  function convertDateToDDMMYYYY(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const result = datas.filter((d) => {
      return d.assetsName?.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [search]);
  const columns = [
    {
      name: "S.No",
      cell: (row, index) => (
        <div style={{ whiteSpace: "normal" }}>{index + 1} </div>
      ),
      width: "80px",
      sortable: true,
    },
    {
      name: <div style={{ whiteSpace: "normal" }}>Requested By</div>,
      selector: (row) => (
        <div style={{ whiteSpace: "normal" }}>{row.user_name} </div>
      ),
      width: "100px",
      sortable: false,
    },
    {
      name: <div style={{ whiteSpace: "normal" }}>Customer Name</div>,
      selector: (row) => (
        <div style={{ whiteSpace: "normal" }}>{row.cust_name}</div>
      ),
      width: "200px",
    },
    {
      name: <div style={{ whiteSpace: "normal" }}>Campaign Amount</div>,
      selector: (row) => (
        <div style={{ whiteSpace: "normal" }}>{row.campaign_amount} </div>
      ),
      width: "150px",
    },
    {
      name: (
        <div style={{ whiteSpace: "normal" }}>Campaign Amount Without Gst</div>
      ),
      selector: (row) => row.campaign_amount_without_gst,
      width: "200px",
    },
    {
      name: <div style={{ whiteSpace: "normal" }}>Payment On Date</div>,
      // selector: (row) => row.payment_date,
      cell: (row) => (
        <div style={{ whiteSpace: "normal" }}>
          {convertDateToDDMMYYYY(row.payment_date)}
        </div>
      ),
      width: "150px",
    },
    {
      name: <div style={{ whiteSpace: "normal" }}>Screenshot</div>,
      // selector: (row) => row.payment_time,
      cell: (row) => (
        <div style={{ whiteSpace: "normal" }}>
          <img src={row.payment_screenshot?`https://salesdev.we-fit.in/${row.payment_screenshot}`:""}  />
        </div>
      ),
      width: "150px",
    },
    {
      name: <div style={{ whiteSpace: "normal" }}>Payment Amount</div>,
      selector: (row) => row.payment_amount,
      width: "150px",
    },
    {
      name: <div style={{ whiteSpace: "normal" }}>Payment Mode</div>,
      selector: (row) => row.payment_mode,
      width: "150px",
    },
    {
      name: <div style={{ whiteSpace: "normal" }}>Payment Status</div>,
      // selector: (row) => row.payment_approval_status, // 0 = pending, 1 = approved, 2 = rejected
      cell: (row) => (
        <div style={{ whiteSpace: "normal" }}>
          {row.payment_approval_status === 0
            ? "Pending"
            : row.payment_approval_status === 1
            ? "Approved"
            : row.payment_approval_status === 2
            ? "Rejected"
            : ""}
        </div>
      ),
    },
    {
      name: "Bank Name",
      selector: (row) => (
        <div style={{ whiteSpace: "normal" }}>{row.title} </div>
      ),
    },
    {
      name: "Bank Detail",
      selector: (row) => (
        <div style={{ whiteSpace: "normal" }}> {row.detail} </div>
      ),
      width: "250px",
    },
    {
      name: <div style={{ whiteSpace: "normal" }}>Reference No</div>,
      selector: (row) => row.payment_ref_no,
      width: "150px",
    },
    {
      name: "Remarks",
      selector: (row) => row.remarks,
      width: "200px",
    },
    {
      name: "Status",
      selector: (row) => (
        // <select
        //   className="form-control"
        //   value={row.statusDropdown}
        //   onChange={(e) => handleStatusChange(row, e.target.value)}
        // >
        //   <option value="">Select</option>
        //   <option value="1">Approved</option>
        //   <option value="0">Rejected</option>
        // </select>

        <Autocomplete
          className="my-2"
          id="combo-box-demo"
          value={row.statusDropdown}
          options={[
            { label: "Approved", value: 1 },
            { label: "Rejected", value: 0 },
          ]}
          getOptionLabel={(option) => option.label}
          onChange={(e) => {
            handleStatusChange(row, e.target.value),
              console.log(e.target.value);
          }}
          style={{ width: 180 }}
          renderInput={(params) => (
            <TextField {...params} label="Status" variant="outlined" />
          )}
        />
      ),
      width: "230px",
    },
    // {
    //   name: "Payment Requested Date and Time",
    //   selector: (row) => row.balance_payment_ondate,
    //   width: "200px",
    // },
    {
      name: "Action",
      selector: (row) => (
        <>
          <Link to={`/admin/payment-summary/${row.cust_id}`}>
            <button
              title="Summary"
              className="btn btn-outline-primary btn-sm user-button"
            >
              <i className="bi bi-journal-text"></i>
            </button>
          </Link>
        </>
      ),
      width: "150px",
    },
  ];

  return (
    <>
      <FormContainer
        mainTitle="Pending approval for update"
        link="/admin/finance-alltransaction"
        buttonAccess={
          contextData &&
          contextData[2] &&
          contextData[2].insert_value === 1 &&
          false
        }
      />

      <div className="card">
        <div className="data_tbl table-responsive">
          <DataTable
            title="Pending approval for update"
            columns={columns}
            data={filterData}
            fixedHeader
            pagination
            fixedHeaderScrollHeight="64vh"
            highlightOnHover
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search here"
                className="w-50 form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        </div>
      </div>
    </>
  );
};

export default PendingApprovalUpdate;
