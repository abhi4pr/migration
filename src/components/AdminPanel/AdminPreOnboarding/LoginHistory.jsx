import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import { FaEdit } from "react-icons/fa";
import DeleteButton from "../../AdminPanel/DeleteButton";
import FieldContainer from "../FieldContainer";
import DataTable from "react-data-table-component";
import { useGlobalContext } from "../../../Context/Context";

const LoginHistory = () => {
  
  const { toastAlert } = useGlobalContext();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filterdata, setFilterData] = useState([]);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  async function getData() {
    await axios
      .get("http://34.93.135.33:8080/api/get_all_login_history")
      .then((res) => {
        setData(res.data.data);
        setFilterData(res.data.data);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const result = data.filter((d) => {
      return d.user_email_id.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [search]);

  function getTime(timePortion){
    const baseTime = new Date(`1970-01-01T${timePortion}Z`);
    baseTime.setHours(baseTime.getHours() + 5);
    baseTime.setMinutes(baseTime.getMinutes() + 30);
    const resultTime = baseTime.toISOString().substr(11, 8);
    return resultTime;
  }

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => <div>{index + 1}</div>,
      width: "5%",
      sortable: true,
    },
    {
      name: "User Id",
      selector: (row) => row.user_id,
      sortable: true,
    },
    {
      name: "User Email Id",
      selector: (row) => row.user_email_id,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.login_date.split("T")[0],
      sortable: true,
    },
    {
      name: "Time",
      selector: (row) => getTime(row.login_date.slice(11,19)),
      width: "22%",
    },
  ];

  return (
    <>
      <FormContainer
        mainTitle="Login History"
        title="Onboarding user login history"
        // handleSubmit={handleSubmit}
        submitButton={false}
      >
      
      <div className="page_height">
        <div className="card mb-4">
          <div className="data_tbl table-responsive">
            <DataTable
              title="Pre Onboard User Login History"
              columns={columns}
              data={filterdata}
              fixedHeader
              // pagination
              fixedHeaderScrollHeight="64vh"
              highlightOnHover
              subHeader
              subHeaderComponent={
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-50 form-control "
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              }
            />
          </div>
        </div>
      </div>

      </FormContainer>
    </>
  );
};

export default LoginHistory;