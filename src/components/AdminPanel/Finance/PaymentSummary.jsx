import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useGlobalContext } from "../../../Context/Context";
import DataTable from "react-data-table-component";

const PaymentSummary = () => {
  
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

  const handleSubmit = async (e) => {
    e.preventDefault();
                
      await axios.post("http://34.93.135.33:8080/api/",{
        display_sequence: displaySeq,
      });

      toastAlert("Coc created");
      setIsFormSubmitted(true);
  };

  function getData() {
    axios.get("http://34.93.135.33:8080/api/get_all_sims").then((res) => {
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
        d.assetsName?.toLowerCase().match(search.toLowerCase()) ||
        d.category_name?.toLowerCase().match(search.toLowerCase()) ||
        d.vendor_name?.toLowerCase().match(search.toLowerCase()) ||
        d.sub_category_name?.toLowerCase().match(search.toLowerCase())
       
      );
    });
    setFilterData(result);
  }, [search]);

  const columns = [
    {
      name: "ID",
      cell: (row, index) => <div>{index + 1}</div>,
      width: "6%",
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => "Arvind Kejriwal",
      sortable: false,
    },
    {
      name: "Sales Booking Date",
      selector: (row) => "28-11-2023",
    },
    {
      name: "Campaign Amount",
      selector: (row) => "1200",
    },
    {
      name: "Total Paid Amount",
      selector: (row) => "120",
    },
    {
      name: "Reason",
      selector: (row) => "",
    },
    {
      name: "Credit Approval Reason",
      selector: (row) => "",
    },
    {
      name: "Balance Payment Ondate",
      selector: (row) => "",
    },
    {
      name: "Status",
      selector: (row) => "Pending",
    }
  ];

  return (
    <>
      <FormContainer
        mainTitle="Payment Summary"
        link="/admin/finance-paymentmode"
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
            title="Customer Purchase History Finance Approval"
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

export default PaymentSummary;