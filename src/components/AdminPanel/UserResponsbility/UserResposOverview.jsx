import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import FormContainer from "../FormContainer";
import DeleteButton from "../DeleteButton";
import jwtDecode from "jwt-decode";

const UserResposOverview = () => {
  const [search, setSearch] = useState("");
  const [datas, setData] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [contextData, setDatas] = useState([]);

  const storedToken = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(storedToken);
  const userID = decodedToken.id;
  useEffect(() => {
    if (userID && contextData.length === 0) {
      axios.get(`http://44.211.225.140:8000/userauth/${userID}`).then((res) => {
        setDatas(res.data);
      });
    }
  }, [userID]);

  function getData() {
    axios.get("http://44.211.225.140:8000/alluserjobrespo").then((res) => {
      setData(res.data.data);
      setFilterData(res.data.data);
    });
  }
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const result = datas.filter((d) => {
      return d.user_name?.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [search]);

  const columns = [
    {
      name: "S.No",
      cell: (row, index) => <div>{index + 1}</div>,
      width: "3%",
      sortable: true,
    },
    {
      name: "User Name",
      selector: (row) => (
        <Link
          style={{ color: "blue" }}
          title="KRA"
          to={`/admin/kra/${row.user_id}`}
        >
          {row.user_name}
        </Link>
      ),
      sortable: true,
      width: "10%",
    },
    {
      name: "Job Responsibility",
      selector: (row) => (
        <Link
          style={{ color: "green" }}
          title="User Wise Responsibility"
          to={`/admin/user-wise-responsibility/${row.sjob_responsibility}`}
        >
          {row.sjob_responsibility}
        </Link>
      ),
      sortable: true,
      width: "12%",
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          {contextData &&
            contextData[1] &&
            contextData[1].update_value === 1 && (
              <Link to="/admin/user-respons-update">
                <button
                  title="Edit"
                  className="btn btn-outline-primary btn-sm user-button"
                  onClick={() =>
                    setToLocalStorage(
                      row.Job_res_id,
                      row.user_id,
                      row.sjob_responsibility,
                      row.description
                    )
                  }
                >
                  <FaEdit />
                </button>
              </Link>
            )}
          {contextData &&
            contextData[1] &&
            contextData[1].delete_flag_value === 1 && (
              <DeleteButton
                endpoint="userjobrespodelete"
                id={row.Job_res_id}
                getData={getData}
              />
            )}
        </>
      ),
      allowOverflow: true,
      width: "22%",
    },
  ];

  const setToLocalStorage = (
    Job_res_id,
    user_id,
    sjob_responsibility,
    description
  ) => {
    localStorage.setItem("Job_res_id", Job_res_id);
    localStorage.setItem("user_id", user_id);
    localStorage.setItem("sjob_responsibility", sjob_responsibility);
    localStorage.setItem("description", description);
  };

  return (
    <>
      <FormContainer
        mainTitle="User Resposibility"
        link="/admin/user-responsbility"
        buttonAccess={
          contextData &&
          contextData[1] &&
          contextData[1].insert_value === 1 &&
          true
        }
      />

      <div className="page_height">
        <div className="card mb-4">
          <div className="data_tbl table-responsive">
            <DataTable
              title="Responsibility"
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
    </>
  );
};
export default UserResposOverview;
