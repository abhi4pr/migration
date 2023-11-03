import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { createTheme } from "react-data-table-component";
import { Link } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import { Button } from "@mui/material";
import PaymentDetailDailog from "../PaymentDetailDailog";
import PointOfSaleTwoToneIcon from "@mui/icons-material/PointOfSaleTwoTone";


export default function ExecutionRejected() {
  const storedToken = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(storedToken);
  const userID = decodedToken.id;

  const [data, setData] = useState([]);
  const [contextData, setContextData] = useState(false);

  const [openPaymentDetailDialog, setOpenPaymentDetaliDialog] = useState(false);
  const [paymentDialogDetails, setPaymentDialogDetails] = useState([{}]);

  const handleClickOpenPaymentDetailDialog = (data) => {
    console.log(data);
    setPaymentDialogDetails(data);
    setOpenPaymentDetaliDialog(true);
  };
  const handleClosePaymentDetailDialog = () => {
    setOpenPaymentDetaliDialog(false);
  };

  const fetchData = async () => {
    try {
      if (userID && contextData == false) {
        axios
          .get(
            `http://34.93.135.33:8080/api/get_single_user_auth_detail/${userID}`
          )
          .then((res) => {
            console.log("this is res data", res.data)
            if (res.data[26].view_value == 1) {
              setContextData(true);
              console.log("this is trye value");
            }
            console.log(res.data[26].view_value);
          });
      }
      const formData = new URLSearchParams();

      console.log(formData);
      axios
        .get(
          "http://34.93.135.33:8080/api/get_exe_sum"
          // formData
        )
        .then((res) => {
          setData(res.data.filter((ele) => ele.execution_status == "3"));
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    axios.post("http://34.93.135.33:8080/api/exe_sum_post", {
      loggedin_user_id: 52,
    });
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(13, 110, 253)",
      },
    },
  });
  useEffect(() => {
    fetchData();
    console.log(contextData, "this is context data" ,  userID, "this is user id")
  }, []);

  const columns = [
    {
      field: "",
      headerName: "S No",
      width: 90,
      renderCell: (params) => {
        const rowIndex = data.indexOf(params.row);
        return <div>{rowIndex + 1}</div>;
      },
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
        if (params.row.execution_status == "3") {
          return (
            <Button size="small" color="error" variant="outlined">
              Rejected
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
        return new Date(params.row.sale_booking_date).toLocaleDateString(
          "en-GB"
        );
      },
    },

    {
      field: "summary",
      headerName: "Summary",
      type: "number",
      width: 110,
    },
    {
      field: "execution_remark",
      headerName: "Remarks",
      type: "number",
      width: 110,
    },

   contextData ?{
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 300,
      cellClassName: "actions",
      getActions: (params) => {
        const { id } = params;
        return [ 
          <GridActionsCellItem
            key={id}
            icon={<PointOfSaleTwoToneIcon />}
            onClick={() => handleClickOpenPaymentDetailDialog(params.row)}
            color="inherit"
          />,
          <Link key={id} to={`/admin/exeexecution/${id}`}>
            <GridActionsCellItem
              icon={<ListAltOutlinedIcon />}
              label="Delete"
              color="inherit"
            />
          </Link>,
        ];
      },
    }:{
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 300,
      cellClassName: "actions",
      getActions: (params) => {
        const { id } = params;
        return [
          <Link key={id} to={`/admin/exeexecution/${id}`}>
            <GridActionsCellItem
              icon={<ListAltOutlinedIcon />}
              label="Delete"
              color="inherit"
            />
          </Link>,
        ];
      },
    },
  ];

  return (
    <div>
      <div>
        <div className="form_heading_title">
          <h2 className="form-heading">Execution Rejected Summary</h2>
        </div>
      </div>
      <>
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={data}
            touchrippleref={false}
            columns={columns}
            getRowId={(row) => row.sale_booking_execution_id}
          />
        </ThemeProvider>
        <PaymentDetailDailog
          handleClickOpenPaymentDetailDialog={
            handleClickOpenPaymentDetailDialog
          }
          handleClosePaymentDetailDialog={handleClosePaymentDetailDialog}
          openPaymentDetailDialog={openPaymentDetailDialog}
          paymentDialogDetails={paymentDialogDetails}
        />
      </>
    </div>
  );
}
