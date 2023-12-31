import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import { useGlobalContext } from "../../../Context/Context";
import DataTable from "react-data-table-component";
import { useNavigate, Link } from "react-router-dom";

const PendingInvoice = () => {
  const navigate = useNavigate();
  const { toastAlert } = useGlobalContext();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [datas, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [contextData, setDatas] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  const handleReject = async (row) => {
    const formData = new FormData();
      formData.append("loggedin_user_id",36)
      formData.append("sale_booking_id",row.sale_booking_id)

      await axios.post("https://production.sales.creativefuel.io/webservices/RestController.php?view=invoice_reject", formData ,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      });

      toastAlert("Data updated");
      setIsFormSubmitted(true);
  };

  const handleImageUpload = async(row, fileData) => {
    const formData = new FormData();
      formData.append("loggedin_user_id",36)
      formData.append("sale_booking_id",row.sale_booking_id)
      formData.append("invoiceFormSubmit",1)
      formData.append("invoice",fileData)

      await axios.post("https://production.sales.creativefuel.io/webservices/RestController.php?view=invoice_upload_file", formData,{
        headers:{
          "Content-Type": "multipart/form-data"
        }
      })
  }

  function getData() {
    axios.post("http://34.93.135.33:8080/api/add_php_pending_invoice_data_in_node").then((res)=>{
      console.log('data save in local success')
    })
    axios.get("http://34.93.135.33:8080/api/get_all_php_pending_invoice_data").then((res) => {
      setData(res.data.data);
      setFilterData(res.data.data);
    });
  }

  const convertDateToDDMMYYYY = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };



  useEffect(() => {
    getData();
  }, []);

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
      name: "Sales Person name",
      selector: (row) => row.sub_category_name,
    },
    {
      name: "Requested On Date",
      // selector: (row) => row.sale_booking_date,
      cell: (row) => convertDateToDDMMYYYY(row.sale_booking_date),
    },
    {
      name: "Sale Booking Description",
      selector: (row) => row.description,
      width: "17%",
    },
    {
      name: "Customer Name",
      // selector: (row) => row.cust_name,
      cell: (row) => (
        <>
        <Link className="text-primary"
         to={`/admin/finance-pendinginvoice/customer-details/${row.cust_id}`}>
          {row.cust_name}
        </Link>
        </>
      ),
      width: "15%",
    },
    {
      name: "Invoice particular",
      selector: (row) => row.invoice_particular_name,
      width: "13%",
    },
    {
      name: "Upload Invioce",
      selector: (row) => (
        <div>
          <form>
            <input type="file" name="upload_image" onChange={(e)=>handleImageUpload(row,e.target.files[0])} />
            <button type="submit" value="upload">Upload</button>
          </form>
          <br/>
          <button type="button" className="btn btn-success" onClick={()=>handleReject(row)}>Reject</button>
        </div>
    ),
    width: "13%",
    },
    {
      name: "Base Amount",
      selector: (row) => row.base_amount,
    },
    {
      name: "GST Amount",
      selector: (row) => row.gst_amount,
    },
    {
      name: "Net Amount",
      selector: (row) => row.net_amount,
    },
    // {
    //   name: "Action",
    //   cell: (row) => (
    //     <>
    //     <Link to={`/admin/finance-pendinginvoice/customer-details/${row.cust_id}`}>
    //       <button className="btn btn-primary" >
    //         Customer Details
    //       </button>
    //     </Link>
    //     </>
    //   ),
    // },
  ];

  return (
    <>
      <FormContainer
        mainTitle="Pending invoice "
        link="/admin/incentive-payment-list"
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
            title="Pending Invoice Creation"
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

export default PendingInvoice;
