import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import FormContainer from "../FormContainer";
import jwtDecode from "jwt-decode";
const SittingOverview = () => {
  const [search, setSearch] = useState("");
  const [datas, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [contextData, setDatas] = useState([]);
  const [userData, getUsersData] = useState([]);
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
    axios.get("http://44.211.225.140:8000/allsitting").then((res) => {
      setData(res.data.data);
      setFilterData(res.data.data);
    });
  }
  useEffect(() => {
    getData();
    axios.get("http://44.211.225.140:8000/allusers").then((res) => {
      getUsersData(res.data.data);
    });
  }, []);
  useEffect(() => {
    const result = datas.filter((d) => {
      return (
        d.Sitting_area.toLowerCase().match(search.toLowerCase()) ||
        d.Sitting_ref_no.toLowerCase().match(search.toLowerCase())
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
      name: "Sitting Ref No.",
      selector: (row) => row.Sitting_ref_no,
      sortable: true,
    },
    {
      name: "Sitting Area",
      selector: (row) => row.Sitting_area,
      sortable: true,
    },
    {
      name: "UserName",
      selector: (row) => {
        const user = userData.find(
          (user) => user.sitting_id === row.Sitting_id
        );
        return <div>{user ? user.user_name : "N/A"}</div>;
      },
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          {contextData &&
            contextData[7] &&
            contextData[7].update_value === 1 && (
              <Link to="/admin/sitting-update">
                <button
                  title="Edit"
                  className="btn btn-outline-primary btn-sm user-button"
                  onClick={() =>
                    setToLocalStorage(
                      row.Sitting_id,
                      row.Sitting_ref_no,
                      row.Sitting_area,
                      row.Remarks,
                      row.Creation_date,
                      row.Created_by,
                      row.Last_updated_by,
                      row.Last_updated_date,
                      row.room_id
                    )
                  }
                >
                  <FaEdit />{" "}
                </button>
              </Link>
            )}
        </>
      ),
      allowOverflow: true,
      width: "22%",
    },
  ];
  const setToLocalStorage = (
    Sitting_id,
    Sitting_ref_no,
    Sitting_area,
    Remarks,
    Creation_date,
    Created_by,
    room_id,
    Last_updated_by,
    Last_updated_date
  ) => {
    localStorage.setItem("Sitting_id", Sitting_id);
    localStorage.setItem("Sitting_ref_no", Sitting_ref_no);
    localStorage.setItem("Sitting_area", Sitting_area);
    localStorage.setItem("Remarks", Remarks);
    localStorage.setItem("Creation_date", Creation_date);
    localStorage.setItem("Created_by", Created_by);
    localStorage.setItem("Last_updated_by", Last_updated_by);
    localStorage.setItem("Last_updated_date", Last_updated_date);
    localStorage.setItem("room_id", room_id);
  };
  return (
    <>
      <FormContainer
        mainTitle="Sitting"
        link="/admin/sitting-master"
        buttonAccess={
          contextData &&
          contextData[7] &&
          contextData[7].insert_value === 1 &&
          true
        }
      />
      <div className="card">
        <div className="data_tbl table-responsive">
          <DataTable
            title="Sitting Overview"
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
export default SittingOverview;