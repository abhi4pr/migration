import DataTable from "react-data-table-component";
import FormContainer from "../../FormContainer";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import DeleteButton from "../../DeleteButton";

const BillingOverview = () => {
  const [search, setSearch] = useState("");
  const [billData, setBillData] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [contextData, setDatas] = useState([]);

  const storedToken = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(storedToken);
  const userID = decodedToken.id;

  //get_wfh_users/${dept_id}

  const getData = () => {
    axios
      .get("https://jarvis-work-backend.onrender.com/api/get_all_billingheaders")
      .then((res) => {
        setBillData(res.data.result);
        setFilterData(res.data.result);
      });
  };
  useEffect(() => {
    getData();
    if (userID && contextData?.length === 0) {
      axios
        .get(
          `https://jarvis-work-backend.onrender.com/api/get_single_user_auth_detail/${userID}`
        )
        .then((res) => {
          setDatas(res.data);
        });
    }
  }, [userID]);

  const columns = [
    {
      name: "S.NO",
      selector: (row, index) => <div>{index + 1}</div>,
      sortable: true,
    },
    {
      name: "Billing Name",
      selector: (row) => row.billing_header_name,
    },
    {
      name: "Department",
      selector: (row) => row.department_name,
    },
    {
      name: "WFH Employees Count",
      selector: (row) => (
        <Link className="text-primary" to={`/admin/wfh-users-overview/${row.dept_id}`}>
          {row.wfhUserCount}
        </Link>
      ),
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          {contextData &&
            contextData[3] &&
            contextData[3].update_value === 1 && (
              <Link to={`/admin/billing-update/${row?.billingheader_id}`}>
                <button
                  title="Edit"
                  className="btn btn-outline-primary btn-sm user-button"
                >
                  <FaEdit />{" "}
                </button>
              </Link>
            )}
          {contextData &&
            contextData[3] &&
            contextData[3].delete_flag_value === 1 && (
              <DeleteButton
                endpoint="delete_billingheader"
                id={row.billingheader_id}
                getData={getData}
              />
            )}
        </>
      ),
    },
  ];

  useEffect(() => {
    const result = billData.filter((d) => {
      return d.billing_header_name.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [search]);
  return (
    <div>
      <FormContainer
        mainTitle="Billing"
        link="/admin/billing-master"
        buttonAccess={
          // contextData &&
          // contextData[3] &&
          // contextData[3].insert_value === 1 &&
          "true"
        }
      />
      <div className="card">
        <div className="data_tbl table-responsive">
          <DataTable
            title="Billing Overview"
            columns={columns}
            data={filterdata}
            fixedHeader
            fixedHeaderScrollHeight="64vh"
            highlightOnHover
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder="Search Here"
                className="w-50 form-control"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

export default BillingOverview;
