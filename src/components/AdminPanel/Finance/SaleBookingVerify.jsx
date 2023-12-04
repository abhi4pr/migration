import { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import { useGlobalContext } from "../../../Context/Context";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const SaleBookingVerify = () => {
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

    await axios.post("http://34.93.135.33:8080/api/", {
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
      return d.assetsName?.toLowerCase().match(search.toLowerCase());
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
      selector: (row) => row.sub_category_name,
    },
    {
      name: "Sales Executive Name",
      selector: (row) => row.vendor_name,
    },
    {
      name: "Booking Date",
      selector: (row) => row.vendor_name,
    },
    {
      name: "Campaign Amount",
      selector: (row) => row.vendor_name,
    },
    {
      name: "Base Amount",
      selector: (row) => row.vendor_name,
    },
    {
      name: "GST Amount",
      selector: (row) => row.vendor_name,
    },
    {
      name: "Net Amount",
      selector: (row) => row.vendor_name,
    },
    {
      name: "Paid Amount",
      selector: (row) => row.vendor_name,
    },
    {
      name: "Paid Amount",
      selector: (row) => row.vendor_name,
    },
    {
      name: "Refund Balance Amount",
      selector: (row) => row.vendor_name,
    },
    {
      name: "Net Balance Customer To Pay Amount",
      selector: (row) => row.vendor_name,
    },
    {
      name: "Net Balance Customer to pay Amount (In %)",
      selector: (row) => row.vendor_name,
    },
    {
      name: "Booking Created Date",
      selector: (row) => row.vendor_name,
    },
    {
      name: "Action",
      selector: (row) => row.vendor_name,
    },
  ];

  return (
    <>
      <FormContainer
        mainTitle="Sale Booking "
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
            title="Sale Booking Close"
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

export default SaleBookingVerify;
