import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useGlobalContext } from "../../../Context/Context";
import DataTable from "react-data-table-component";

const PendingApprovalRefund = () => {
  
  const { toastAlert } = useGlobalContext();
  const [displaySeq, setDisplaySeq] = useState("");
  const [heading, setHeading] = useState("");
  const [headingDesc, setHeadingDesc] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [datas, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [contextData, setDatas] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [status, setStatus] = useState("");
  const [refundImage, setRefundImage] = useState(null);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
      const formData = new FormData();
      formData.append("status",status)
      formData.append("refund_image",refundImage)
      await axios.post("http://34.93.135.33:8080/api/", formData ,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });

      toastAlert("Data updated");
      setIsFormSubmitted(true);
  };

  function getData() {
    axios.post("http://34.93.135.33:8080/api/add_php_payment_refund_data_in_node").then((res)=>{
      console.log('data save in local success')
    })
    axios.get("http://34.93.135.33:8080/api/get_all_php_payment_refund_data_pending").then((res) => {
      setData(res.data.data);
      setFilterData(res.data.data);
    });
  }

  useEffect(() => {
    getData();
  }, []);

  const handleStatusChange = (row, selectedStatus) => {
    setStatus(selectedStatus)
  };

  useEffect(() => {
    const result = datas.filter((d) => {
      return (
        d.cust_name?.toLowerCase().match(search.toLowerCase())
      );
    });
    setFilterData(result);
  }, [search]);

  const columns = [
    {
      name: "Id",
      cell: (row, index) => <div>{index + 1}</div>,
      width: "9%",
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.cust_name,
      sortable: true,
    },
    {
      name: "Refund Amount",
      selector: (row) => row.refund_amount,
    },
    {
      name: "Finance refund reason",
      selector: (row) => row.finance_refund_reason,
    },
    {
      name: "Refund Request Date",
      selector: (row) => row.creation_date,
    },
    {
      name: "Refund Updated Date",
      selector: (row) =>row.last_updated_date 
    },
    {
      name: "Refund Payment Image",
      selector: (row) => (
        <form>
            <input type="file" name="refund_image" onChange={(e)=>setRefundImage(e.target.files[0])} />
            <button type="submit" value="upload">Upload</button>
        </form>
      )
    },
    {
      name: "Action",
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
  ];

  return (
    <>
      <FormContainer
        mainTitle="Payment Refund List"
        link="/admin/finance-pedingapprovalrefund"
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
            title="Pending Approval for Refund"
            columns={columns}
            data={filterData}
            fixedHeader
            // pagination
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

export default PendingApprovalRefund;