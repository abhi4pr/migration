import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import FormContainer from "../FormContainer";
import DeleteButton from "../DeleteButton";
import jwtDecode from "jwt-decode";

const RoleOverView = () => {
  const [search, setSearch] = useState("");
  const [datas, setData] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [contextData, setDatas] = useState([]);

  const storedToken = sessionStorage.getItem("token");
  console.log(storedToken, "stored token");
  const decodedToken = jwtDecode(storedToken);
  const userID = decodedToken.id;
  useEffect(() => {
    if (userID && contextData.length === 0) {
      axios.get( `https://jarvis-work-backend.onrender.com/api/get_single_user_auth_detail/${userID}`).then((res) => {
        setDatas(res.data);
      });
    }
  }, [userID]);

  async function getData() {
    try {
      const response = await axios.get("https://jarvis-work-backend.onrender.com/api/get_all_roles");
      setData(response.data.data);
      setFilterData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  

  const columns = [
    {
      name: "S.No",
      // selector: (row) => row.Role_id,
      cell: (row, index) => <div>{index + 1}</div>,
      width: "10%",
      sortable: true,
    },
    {
      name: "Role Name",
      selector: (row) => row.Role_name,
      width: "20%",
      sortable: true,
    },
    {
      name: "Created By",
      selector: (row) => row.created_by_name,
      width: "20%",
      sortable: true,
    },

    {
      name: "remark",
      selector: (row) => row.Remarks,
    },
    {
      name: "Action",
      width: "15%",
      cell: (row) => (
        <>
          {contextData &&
            contextData[4] &&
            contextData[4].update_value === 1 && (
              <Link to="/admin/role-update">
                <button
                  title="Edit"
                  className="btn btn-outline-primary btn-sml"
                  onClick={() =>
                    setToLocalStorage(
                      row.role_id,
                      row.Role_name,
                      row.Remarks,
                      row.Creation_date,
                      row.created_by_name,
                      row.Last_updated_by,
                      row.Last_updated_date
                    )
                  }
                >
                  <FaEdit />{" "}
                </button>
              </Link>
            )}
          {contextData &&
            contextData[4] &&
            contextData[4].delete_flag_value === 1 && (
              <DeleteButton
                endpoint="roledelete"
                id={row.role_id}
                getData={getData}
              />
            )}
        </>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const result = datas.filter((d) => {
      return d.Role_name.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [search]);

  const setToLocalStorage = (
    role_id,
    Role_name,
    Remarks,
    Creation_date,
    created_by_name,
    Last_updated_by,
    Last_updated_date
  ) => {
    localStorage.setItem("role_id", role_id);
    localStorage.setItem("Role_name", Role_name);
    localStorage.setItem("Remarks", Remarks);
    localStorage.setItem("Creation_date", Creation_date);
    localStorage.setItem("created_by_name", created_by_name);
    localStorage.setItem("Last_updated_by", Last_updated_by);
    localStorage.setItem("Last_updated_date", Last_updated_date);
  };

  return (
    <>
      <FormContainer
        mainTitle="Role"
        link="/admin/role"
        buttonAccess={
          contextData &&
          contextData[4] &&
          contextData[4].insert_value === 1 &&
          true
        }
      />
      <div className="card">
        <div className="data_tbl table-responsive">
          <DataTable
            title="Role Overview"
            columns={columns}
            data={filterdata}
            fixedHeader
            // pagination
            fixedHeaderScrollHeight="62vh"
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

export default RoleOverView;
