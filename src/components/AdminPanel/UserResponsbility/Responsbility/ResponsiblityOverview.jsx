import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { FaEdit } from "react-icons/fa";
import jwtDecode from "jwt-decode";
import DeleteButton from "../../DeleteButton";
import FormContainer from "../../FormContainer";

const ResponsiblityOverview = () => {
  const [search, setSearch] = useState("");
  const [datas, setData] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [allResponsiblility, setAllResponsibility] = useState([]);
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
    axios
      .get("http://34.93.135.33:8080/api/get_all_responsibilitys")
      .then((res) => {
        setData(res.data);
        setFilterData(res.data);
      });
  }
  useEffect(() => {
    getData();
    axios
      .get("http://34.93.135.33:8080/api/get_all_jobresponsibilitys")
      .then((res) => {
        setAllResponsibility(res.data.data);
      });
  }, []);

  useEffect(() => {
    const result = datas.filter((d) => {
      return d.sjob_responsibility.toLowerCase().match(search.toLowerCase());
    });
    setFilterData(result);
  }, [search]);

  const columns = [
    {
      name: "S.No",
      // selector: (row) => row.user_id,
      cell: (row, index) => <div>{index + 1}</div>,
      width: "9%",
      sortable: true,
    },
    {
      name: "Responsibility",
      selector: (row) => row.respo_name,
      sortable: true,
      width: "15%",
    },
    {
      name: "Assign Responsibility",
      cell: (row) => {
        return allResponsiblility.filter(
          (data) => data.sjob_responsibility == row.respo_name
        ).length;
      },
      width: "7%",
      sortable: true,
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
            contextData[16] &&
            contextData[16].update_value === 1 && (
              <Link to={`/admin/responsibility-update/${row.id}`}>
                <button
                  title="Edit"
                  className="btn btn-outline-primary btn-sm user-button"
                >
                  <FaEdit />
                </button>
              </Link>
            )}
          {contextData &&
            contextData[16] &&
            contextData[16].delete_flag_value === 1 && (
              <DeleteButton
                endpoint="delete_responsibility"
                id={row.id}
                getData={getData}
              />
            )}
        </>
      ),
      allowOverflow: true,
      width: "22%",
    },
  ];

  return (
    <>
      {allResponsiblility.map((d) => {
        <h1>{d.user_name}</h1>;
      })}
      <FormContainer
        mainTitle="Resposibility"
        link="/admin/responsibility-master"
        buttonAccess={
          contextData &&
          contextData[16] &&
          contextData[16].insert_value === 1 &&
          true
        }
      />
      <div className="page_height">
        <div className="card mb-4">
          <div className="data_tbl table-responsive">
            <DataTable
              title="Responsibility Overview"
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
export default ResponsiblityOverview;
