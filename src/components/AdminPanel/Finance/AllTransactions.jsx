import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useGlobalContext } from "../../../Context/Context";
import DataTable from "react-data-table-component";

const AllTransactions = () => {
  
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
        d.assetsName?.toLowerCase().match(search.toLowerCase())
      );
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
      name: "Request By",
      selector: (row) => row.assetsName,
      sortable: true,
    },
    {
      name: "Customer Name",
      selector: (row) => row.sub_category_name,
    },
    {
      name: "Campaign Amount",
      selector: (row) => row.category_name,
    },
    {
      name: "Campaign amt without gst",
      selector: (row) => row.vendor_name,
    },
    {
      name: "Payment On Date",
      selector: (row) =>row.dateOfPurchase 
    },
    {
      name: "Payment Amount",
      selector: (row) => row.paymentAmount
    },
    {
      name: "Payment View",
      selector: (row) => row.paymentMode
    },
    {
      name: "Bank Name",
      selector: (row) => row.paymentMode
    },
    {
      name: "Bank Details",
      selector: (row) => row.paymentMode
    },
    {
      name: "Reference Number",
      selector: (row) => row.paymentMode
    },
    {
      name: "Remarks",
      selector: (row) => row.paymentMode
    },
    {
      name: "Status",
      selector: (row) => row.status
    },
    {
      name: "Action",
      selector: (row) => (
          <button
            className="btn btn-outline-success"
            // onClick={() => handleImageClick(row)}
          >
            Summary
          </button>
        ),
    }
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
            title="All Transactions"
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

export default AllTransactions;