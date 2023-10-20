import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import axios from "axios";
import { Link } from "react-router-dom";

import { Button, TextField } from "@mui/material";
import Confirmation from "./Confirmation";
import jwtDecode from "jwt-decode";
import { GridToolbar } from "@mui/x-data-grid";
import ExecutionUpdate from "./ExecutionUpdate";

function ExecutionPending() {
  const [snackbar, setSnackbar] = useState(null);
  const [confirmation, setConfirmation] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState([]);
  const [reload, setReload] = useState(false);
  const [contextData, setContextData] = useState(false);
  const [executionStatus, setExecutionStatus] = useState();
  // const [date, setDate] = useState(new Date().toGMTString());
  const storedToken = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(storedToken);
  const userID = decodedToken.id;
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  // const filteredData = data.filter((row) => {
  //   const nameMatches = row.cust_name.toLowerCase().includes(searchQuery.toLowerCase());
  //   const dateMatches = !dateFilter || row.sale_booking_date === dateFilter;
  //   return nameMatches && dateMatches;
  // });

  // const columns = [
  //   // Your column configuration here
  // ];

  const handleAccept = (row) => {
    console.log(row);
    setRowData(row);
    setConfirmation(true);
    setExecutionStatus(2);
  };
  const handleReject = (row) => {
    console.log(row);
    setRowData(row);
    setConfirmation(true);
    setExecutionStatus(3);
  };
  const handleDone = (row) => {
    console.log(row);
    setRowData(row);
    // setConfirmation(true);
    setExecutionStatus(1);
    setReload(true);
  };
  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, [reload]);
  const fetchData = async () => {
    try {
      if (userID && contextData == false) {
        axios
          .get(`http://44.211.225.140:8000/userauth/${userID}`)
          .then((res) => {
            if (res.data[26].view_value == 1) {
              setContextData(true);
              setAlert(res.data);
              console.log(contextData);
            }
            console.log(res.data[26].view_value);
          });
      }
      const response = axios
        .get("http://44.211.225.140:8000/executionSummary")
        .then((res) => {
          setData(
            res.data.filter(
              (ele) => ele.execution_status == 0 || ele.execution_status == 2
            )
          );
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    axios.post("http://44.211.225.140:8000/executionSummary", {
      loggedin_user_id: 52,
    });
  };

  const handleViewClick = (id) => {
    const selected = data.find((ele) => ele.sale_booking_id == id);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(13, 110, 253)",
      },
    },
  });
  const addSerialNumber = (rows) => {
    return rows.map((row, index) => ({
      ...row,
      S_No: index + 1,
    }));
  };
  const columns = [
    {
      field: "S_No",
      headerName: "S No",
      width: 90,
    },
    {
      field: "cust_name",
      headerName: "Client Name",
      width: 150,
    },
    {
      field: "sales_executive_name",
      headerName: "Sales Executive",
      width: 150,
    },
    {
      field: "execution_status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        if (params.row.execution_status == "0") {
          return (
            <Button
              size="small"
              color="error"
              variant="outlined"
              fontSize="inherit"
            >
              Pending
            </Button>
          );
        } else if (params.row.execution_status == "2") {
          return (
            <Button
              size="small"
              color="success"
              variant="outlined"
              fontSize="inherit"
            >
              In Progress
            </Button>
          );
        }
      },
    },

    {
      field: "sale_booking_date",
      headerName: "Booking Date",
      type: "number",
      width: 110,
      renderCell: (params) => {
        return new Date(params?.row.sale_booking_date).toLocaleDateString();
      },
    },
    {
      filed: "start_date_",
      headerName: "Start Date",
      width: 150,
      renderCell: (params) => {
        if (params.row.execution_status == "2") {
          return new Date(params?.row.start_date_).toLocaleDateString();
        }
      },
    },
    contextData && {
      field: "campaign_amount",
      headerName: "Amount",
      width: 120,
    },
   
    {
      field: "page_ids",
      headerName: "Page Counts",
      width: 100,
      renderCell: (params) => {
        return params?.row?.page_ids
          ? params.row?.page_ids.split(",").length
          : 0;
      },
    },
    {
      field: "summary",
      headerName: "Summary",
      width: 110,
    },
    {
      field: "payment_type",
      headerName: "Payment Status",
      width: 150,
    },
    {
      field:"payment_status_show",
      headerName:"Credit Status",
      width:150,
    },
    {
      field: "Time passed",
      headerName: "Time passed",
      type: "number",
      width: 110,
      renderCell: (params) => {
        if (params.row.execution_status == "2") {
          return (
            Math.floor(
              Math.abs((new Date(params.row.start_date_) - new Date()) / 36e5)
            ) + " hours"
          );
        }
      },
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 300,
      cellClassName: "actions",
      getActions: (params) => {
        const { id, row } = params; // Destructure the id and row from params
        const executionStatus = row.execution_status; // Get the execution_status
        if (executionStatus == "0") {
          // Show Accept and Reject buttons when execution_status is "0"
          return [
            <Link key={id} to={`/admin/exeexecution/${id}`}>
              <GridActionsCellItem
                icon={<ListAltOutlinedIcon />}
                label="Delete"
                onClick={handleViewClick(id)}
                color="inherit"
              />
            </Link>,
            <GridActionsCellItem
              key={id}
              icon={
                // <Button color="error" variant="outlined">
                //   Reject
                // </Button>
                <ExecutionUpdate
                  setReload={setReload}
                  id={id}
                  rowData={row}
                  status={3}
                />
              }
              label="Delete"
              // onClick={() => handleReject(row)}
              color="inherit"
            />,
            <GridActionsCellItem
              key={id}
              icon={<Button variant="outlined">Accept</Button>}
              label="Delete"
              onClick={() => handleAccept(row)}
              color="inherit"
            />,
          ];
        } else if (executionStatus == "2") {
          // Show "Done" button when execution_status is "2"
          return [
            <Link key={id} to={`/admin/exeexecution/${id}`}>
              <GridActionsCellItem
                icon={<ListAltOutlinedIcon />}
                label="Delete"
                onClick={handleViewClick(id)}
                color="inherit"
              />
            </Link>,
            <GridActionsCellItem
              key={id}
              icon={
                <ExecutionUpdate
                  setReload={setReload}
                  id={id}
                  rowData={row}
                  status={1}
                />
              }
              label="Delete"
              onClick={() => handleDone(row)}
              color="inherit"
            />,
          ];
        } else {
          // Default case, no special buttons
          return [
            <Link key={id} to={`/admin/exeexecution/${id}`}>
              <GridActionsCellItem
                icon={<ListAltOutlinedIcon />}
                label="Delete"
                onClick={handleViewClick(id)}
                color="inherit"
              />
            </Link>,
          ];
        }
      },
    },
  ];
  return (
    <>
      {confirmation && (
        <Confirmation
          rowData={rowData}
          value={new Date()}
          status={executionStatus ? (executionStatus == 2 ? 2 : 3) : 3}
          setReload={setReload}
          confirmation={confirmation}
          setSnackbar={setSnackbar}
          setConfirmation={setConfirmation}
          type={
            executionStatus
              ? executionStatus == 2
                ? "Accept"
                : "Reject"
              : "Reject"
          }
        />
      )}
      <ThemeProvider theme={theme}>
        <div className="form-heading">
          <div className="form_heading_title">
            <h2>Execution Pending Summary</h2>
          </div>
        </div>
        {console.log(contextData)}
        <div>
          <TextField
            label="Search by Client Name"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {/* 
      <TextField
        label="Filter by Date"
        type="date"
        variant="outlined"
        value={dateFilter}
        onChange={handleDateFilterChange}
        InputLabelProps={{
          shrink: true,
        }}
      /> */}

          <DataGrid
            rows={addSerialNumber(data)}
            columns={columns}
            getRowId={(row) => row.sale_booking_execution_id}
            slots={{ toolbar: GridToolbar }}
          >
            {/* <DataGridToolbar> */}
            {/* <div>
            <TextField
              label="Search by Client Name"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
            />

            <TextField
              label="Filter by Date"
              type="date"
              variant="outlined"
              value={dateFilter}
              onChange={handleDateFilterChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div> */}
            {/* </DataGridToolbar> */}
          </DataGrid>
        </div>
      </ThemeProvider>
    </>
  );
}

export default ExecutionPending;
