import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { createTheme } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import { Button } from '@mui/material';

export default function ExecutionDone() {
  const storedToken = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(storedToken);
  const userID = decodedToken.id;

  const [data, setData] = useState([]);
  const [contextData, setContextData] = useState(false);

  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (userID && contextData == false) {
        axios.get(`http://44.211.225.140:8000/userauth/${userID}`).then((res) => {
          if (res.data[26].view_value == 1) {
            setContextData(true);
          }
          console.log(res.data[26].view_value);
        });
      }
      const formData = new URLSearchParams();
      formData.append("loggedin_user_id", 36);
      // formData.append("filter_criteria", "m");
      // formData.append("pendingorcomplete", "pending");
      console.log(formData);
      const response = axios
      .get(
        "http://44.211.225.140:8000/executionSummary",{loggedin_user_id:52}
      )
        .then((res) => {
          // {
          //   headers: {
          //     "Content-Type": "application/x-www-form-urlencoded",
          //   },
          // }
          // console.log(res.data.body);
          // const jsonData = res.data.body;
          // setData(jsonData);
          setData(res.data.filter((ele) => ele.execution_status == "1"));
          // console.log()
          // console.log(jsonData);
        });
    } catch (error) {
      console.error("Error fetching data:", error);
      // setLoading(false);
    }
  };


  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(13, 110, 253)",
      },
      //   secondary: purple,
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
        // const StatusDetail = data.indexOf(params.row);
        if (params.row.execution_status == "1") {
          return (
            <Button
              size="small"
              color="success"
              variant="outlined"
              // fontSize="inherit"
            >
              Done
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
     return   new Date(params?.row.sale_booking_date).toLocaleDateString();
      }
    },
    {
      field: "start_date_",
      headerName: "Start Date",
      width: 150,
      renderCell: (params) => {
        return   new Date(params?.row.start_date_).toLocaleDateString();
         }
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 150,
      renderCell: (params) => {
        return   new Date(params?.row.end_date).toLocaleDateString();
         }
    },
    contextData && {
      field: "campaign_amount",
      headerName: "Amount",
      width: 120,
    },
    {
      field:"page_ids",
      headerName:"Page Counts",
      width:100,
      renderCell: (params) => {
       return params?.row?.page_ids?params.row?.page_ids.split(',').length:0
      }
    
    },
    {
      field: "summary",
      headerName: "Summary",
      type: "number",
      width: 110,
    },

    {
      field: "Time passed",
      headerName: "Time Taken",
      type: "number",
      width: 110,
      renderCell: (params) => {
        if (params.row.execution_status == "1") {
            return (
              <div>
                {Math.floor(
                  Math.abs(
                    (new Date(params.row.start_date_) - new Date(params.row.execution_date.replace(' ', 'T') + 'Z')) / 36e5
                  )
                )} hours
              </div>
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
        return [
          <Link key={id} to={`/admin/exeexecution/${id}`}>
            <GridActionsCellItem
              icon={<ListAltOutlinedIcon />}
              label="Delete"
              // onClick={handleViewClick(id)}
              color="inherit"
            />
          </Link>,
          // <Link to={`/admin/executionupdate/${id}`}>,
          // <GridActionsCellItem
          //   key={id}
          //   icon={
          //     <Button color="error" variant="outlined">
          //       Done
          //     </Button>
          //   }
          //   label="Delete"
          //   // onClick={(e) => handleDone(row)}
          //   color="inherit"
          // />,
          // <GridActionsCellItem key={id}
          //   icon={<Button variant="outlined">Accept</Button>}
          //   label="Delete"
          //   // onClick={(e) => handleAccept(row)}
          //   color="inherit"
          // />,

          // <Button
          //   variant="outlined"
          //   color="danger"
          //   size="small"
          //   onClick={(e) => handleReject(row)}
          // >
          //   Reject
          // </Button>,
          // <GridActionsCellItem
          //   icon={
          //     <ExecutionUpdate id={id} rowData={row} setReload={setReload} />
          //   }
          //   label="Reject"
          //   className="textPrimary"
          //   // onClick={handleEditClick(id)}
          //   color="inherit"
          //   // color="primary"
          // />,
          // </Link>
        ];
      },
    },
  ];
  return (
    <div>
      <div>
        <div className="form_heading_title">
          <h2 className="form-heading">Execution Executed Summary</h2>
        </div>
      </div>
      <>
          {/* {confirmation && (
            <Confirmation
              rowData={rowData}
              value={new Date()}
              status={executionStatus ? (executionStatus == 2 ? 2 : 3) : 3}
              setReload={setReload}
              confirmation={confirmation}
              setSnackbar={setSnackbar}
              setConfirmation={setConfirmation}
            /> */}
          {/* )} */}
          <ThemeProvider theme={theme}>
            <DataGrid
              rows={addSerialNumber(data)}
              touchrippleref={false}
              columns={columns}
              getRowId={(row) => row.sale_booking_execution_id}
            />
          </ThemeProvider>
        </>
    </div>
  )
}

