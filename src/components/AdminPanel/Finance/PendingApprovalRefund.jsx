import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import { useGlobalContext } from "../../../Context/Context";
import DataTable from "react-data-table-component";

const PendingApprovalRefund = () => {
  const { toastAlert } = useGlobalContext();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [datas, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [contextData, setDatas] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [status, setStatus] = useState("");
  const [refundImage, setRefundImage] = useState([]);
  const [singleRow, setSingleRow] = useState({});
  const [imageChanged, setImageChanged] = useState(false);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  function getData() {
    axios
      .post("https://api-dot-react-migration-project.el.r.appspot.com/api/add_php_payment_refund_data_in_node")
      .then((res) => {
        console.log("data save in local success");
      });
    axios
      .get(
        "https://api-dot-react-migration-project.el.r.appspot.com/api/get_all_php_payment_refund_data_pending"
      )
      .then((res) => {
        setData(res.data.data);
        setFilterData(res.data.data);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const handleStatusChange = async (row, selectedStatus) => {
    setStatus(selectedStatus);

    const formData = new FormData();
    formData.append("loggedin_user_id", 36);
    formData.append("sale_booking_refund_id", row.sale_booking_refund_id);
    formData.append("sale_booking_id", row.sale_booking_id);
    formData.append("refund_approval_status", selectedStatus);
    formData.append("refund_reason", "");
    formData.append("refund_finance_approval", 1);

    await axios.post(
      "https://production.sales.creativefuel.io/webservices/RestController.php?view=refund_finance_approval",
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

  const uploadImage = async (e, row,index) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("loggedin_user_id", 36);
    formData.append("sale_booking_refund_id", row.sale_booking_refund_id);
    formData.append("sale_booking_id", row.sale_booking_id);
    formData.append("refund_files", refundImage[index]);

    await axios.post(
      "https://production.sales.creativefuel.io/webservices/RestController.php?view=refund_payment_upload_file",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).then((res) => {
      res.status === 200 && refundImage.splice(index, 1); // Remove the image from the array
    });

    toastAlert("Data updated");
    setIsFormSubmitted(true);
  };

  useEffect(() => {
    const result = datas.filter((d) => {
      return d.cust_name?.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [search]);

  const columns = [
    {
      name: "S.No",
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
      name: "Refund Request Reason",
      selector: (row) => row.finance_refund_reason,
    },
    {
      name: "Refund Request Date",
      selector: (row) => row.creation_date,
    },
    {
      name: "Refund Updated Date",
      selector: (row) => row.last_updated_date,
    },

    {
      name: "Refund Payment Image",
      selector: (row, index) => (
        <form method="POST" encType="multipart/form-data" action="">
          <input
            type="file"
            name="refund_image"
            onChange={(e) => {
              refundImage.splice(index, 1, e.target.files[0]);
              console.log(index);
              console.log(refundImage);
              setImageChanged(!imageChanged); // Toggle the state to trigger re-render
            }}
          />
          <br />
          <input
            key={index}
            type="submit"
            value="upload"
            disabled={!refundImage[index] ? true : false}
            onClick={(e) => {
              setSingleRow(row);
              uploadImage(e, row,index);
            }}
          />
        </form>
      ),
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
          <option value="1">Approved</option>
          <option value="2">Rejected</option>
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
