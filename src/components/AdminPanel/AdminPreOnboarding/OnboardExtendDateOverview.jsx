import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import WhatsappAPI from "../../WhatsappAPI/WhatsappAPI";

const OnboardExtendDateOverview = () => {
  const whatsappApi = WhatsappAPI();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filterdata, setFilterData] = useState([]);
  const [contextData, setDatas] = useState([]);
  const [extendStatus, setExtendStatus] = useState("");

  const storedToken = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(storedToken);
  const userID = decodedToken.id;

  useEffect(() => {
    if (userID && contextData.length === 0) {
      axios
        .get(
          `http://192.168.29.116:8080/api/get_single_user_auth_detail/${userID}`
        )
        .then((res) => {
          setDatas(res.data);
        });
    }
  }, []);

  async function getData() {
    try {
      const response = await axios.get(
        "http://192.168.29.116:8080/api/get_all_users"
      );
      const data = response.data.data.filter(
        (item) => item.joining_date_extend_status == "Requested"
        // const data = response.data.data;
      );

      setDatas(data);
      setFilterData(data);
      console.log(data, "all data");
    } catch (error) {
      console.log("Error fething Data", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const statusUpdate = (user_id, status, PersonalNumber) => {
    console.log("lalit hai yha", user_id, status, PersonalNumber);
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("joining_date_extend_status", status);
    axios
      .put("http://192.168.29.116:8080/api/update_user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        axios.post("http://192.168.29.116:8080/api/add_send_user_mail", {
          email: "lalit@creativefuel.io",
          subject: "Extend Date Status",
          text: status,
          attachment: "",
          // login_id: loginId,
          // name: username,
          // password: password,
        });
        whatsappApi.callWhatsAPI(
          "Extend Date Admin",
          JSON.stringify(PersonalNumber),
          user_id,
          [status]
        );
      })
      .then(() => getData());
  };

  useEffect(() => {
    const result = data.filter((d) => {
      return d.desi_name.toLowerCase().match(search.toLowerCase());
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
      name: "User Name",
      selector: (row) => row.user_name,
      sortable: true,
    },
    {
      name: "Joining Date",
      selector: (row) => row.joining_date,
      sortable: true,
    },
    {
      name: "Extended Date",
      selector: (row) => row.joining_date_extend_status,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.joining_date_extend_status,
      sortable: true,
    },
    {
      name: "Prove of Doc",
      selector: (row) => row.joining_extend_document,
      sortable: true,
    },
    {
      name: "Reason",
      selector: (row) => row.joining_date_extend_reason,
      sortable: true,
    },

    {
      name: "Action",
      cell: (row) => (
        <>
          {console.log(row)}
          {/* {contextData &&
            contextData[10] &&
            contextData[10].update_value === 1 && ( */}
          <button
            title="Approve"
            className="btn btn-outline-primary btn-md user-button"
            onClick={() =>
              statusUpdate(row.user_id, "Approve", row.PersonalNumber)
            }
          >
            Approve
          </button>
          {/* {contextData &&
            contextData[10] &&
            contextData[10].update_value === 1 && ( */}
          <button
            title="Reject"
            className="btn btn-outline-primary btn-md user-button"
            onClick={() =>
              statusUpdate(row.user_id, "Reject", row.PersonalNumber)
            }
          >
            Reject
          </button>
          {/* )} */}
        </>
      ),
      allowOverflow: true,
      width: "22%",
    },
  ];

  return (
    <>
      <FormContainer
        mainTitle="Extend Date Overview"
        link="/admin/designation-master"
        buttonAccess={
          contextData &&
          contextData[10] &&
          contextData[10].insert_value === 1 &&
          true
        }
      />
      <div className="page_height">
        <div className="card mb-4">
          <div className="data_tbl table-responsive">
            <DataTable
              title=" Overview"
              columns={columns}
              data={filterdata}
              fixedHeader
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

export default OnboardExtendDateOverview;
