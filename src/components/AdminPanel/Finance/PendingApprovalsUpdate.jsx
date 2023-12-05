import { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useGlobalContext } from "../../../Context/Context";
import DataTable from "react-data-table-component";

const PendingApprovalUpdate = () => {
   
  const { toastAlert } = useGlobalContext();
  const [displaySeq, setDisplaySeq] = useState("");
  const [heading, setHeading] = useState("");
  const [headingDesc, setHeadingDesc] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [datas, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [contextData, setDatas] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  const handleStatusChange = (row, selectedStatus) => {
  console.log(selectedStatus)
  toastAlert("Status Update Successfully");
      axios
        .put("http://34.93.135.33:8080/api", {
          status: selectedStatus
        })
        .then(() => {
          getData();
          toastAlert("Status Update Successfully");
        });
    
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
                
      await axios.post("http://34.93.135.33:8080/api/",{
        display_sequence: displaySeq,
      });

      toastAlert("Coc created");
      setIsFormSubmitted(true);
  };

  function getData() {
    axios.post("http://34.93.135.33:8080/api/add_php_payment_refund_data_in_node").then((res)=>{
      console.log('data save in local success')
    })
    axios.get("http://34.93.135.33:8080/api/get_all_php_payment_refund_data").then((res) => {
      setData(res.data.data);
      setFilterData(res.data.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const result = datas.filter((d) => {
      return (
        d.assetsName?.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterData(result);
  }, [search]);
  const columns = [
    {
      name: "Id",
      cell: (row, index) => <div style={{ whiteSpace: 'normal' }}>{index + 1} </div>,
      width: "4%",
      sortable: true,
    },
    {
      name: <div style={{ whiteSpace: 'normal' }}>Requested By</div>,
      selector: (row) => <div style={{ whiteSpace: 'normal' }}>Growth Manager </div>,
      width: "7%",
      sortable: false,
    },
    {
      name:<div style={{ whiteSpace: 'normal' }}>Customer Name</div>,
      selector: (row) => <div style={{ whiteSpace: 'normal' }}>Arvind Kejriwal| 2023-11-28| 1200 </div>,
      width: "8%",
    },
    {
      name: <div style={{ whiteSpace: 'normal' }}>Campaign Amount</div>,
      selector: (row) => <div style={{ whiteSpace: 'normal' }}>1200 </div>,
      width: "6%",
    },
    {
      name: <div style={{ whiteSpace: 'normal' }}>Campaign Amount Without Gst</div>,
      selector: (row) => "2800",
      width: "6%",
    },
    {
      name: <div style={{ whiteSpace: 'normal' }}>Payment On Date</div>,
      selector: (row) => "28-11-2023",
      width: "7%",
    },
    {
      name: <div style={{ whiteSpace: 'normal' }}>Payment Amount</div>,
      selector: (row) => "2100",
      width: "6%",
    },
    {
      name: <div style={{ whiteSpace: 'normal' }}>Payment Mode</div>,
      selector: (row) => "UPI",
      width: "6%",
    },
    {
      name: <div style={{ whiteSpace: 'normal' }}>Payment View</div>,
      selector: (row) => "",
    },
    {
      name: "Bank Name",
      selector: (row) => <div style={{ whiteSpace: 'normal' }}>GST Payment Details </div>,
    },
    {
      name: "Bank Detail",
      selector: (row) => <div style={{ whiteSpace: 'normal' }}>Bank Name: Kotak Mahindra Bank Account Name: Creativefuel Pvt Ltd Account No: 2814216875 IFSE Code: KKBK0005915 Branch: Vijay Nagar, Indore (M.P.) </div>,
      width: "12%",
    },
    {
      name: <div style={{ whiteSpace: 'normal' }}>Reference No</div>,
      selector: (row) => "mdfklkb",
      width: "5%",
    },
    {
      name: "Remarks",
      selector: (row) => "test remarks",
      width: "8%",
    },
    {
      name: "Status",
      selector: (row) => (
        <select
          className="form-control"
          value={row.statusDropdown}
          onChange={(e) => handleStatusChange(row, e.target.value)}
        >
          <option value="">Select</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      ),
      width: "7%",
    },
    {
      name: "Payment Requested Date and Time",
      selector: (row) => "12-10-2023 11:36",
      width: "8%",
    },
    {
      name: "Action",
      selector: (row,index) => <><Link to={`/admin/payment-summary/${index + 1}`}>
      <button
        title="Summary"
        className="btn btn-outline-primary btn-sm user-button"
      >
        <i className="bi bi-journal-text"></i>
      </button>
    </Link></>,
      width: "4%",
    },
   
  ];

   return (
    <>
      <FormContainer
        mainTitle="All Transactions"
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
            title="All Refund Request"
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