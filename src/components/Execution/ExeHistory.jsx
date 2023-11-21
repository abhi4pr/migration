import React, { useEffect, useState } from "react";
import FormContainer from "../AdminPanel/FormContainer";
import UserNav from "../Pantry/UserPanel/UserNav";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
import { set } from "date-fns";
import DeleteHistoryConfirmation from "./DeleteHistoryConfirmation";

export default function ExeHistory() {
  const id = useParams();
  const [buttonAccess, setButtonAccess] = useState(false);
  const [data, setData] = useState([]);
  const [rowData, setRowData] = useState([]);
  const [openDeleteHistoryConFirmation, setOpenDeleteHistoryConFirmation] =
    useState(false);

  const handleClickOpenDeleteHistoryConFirmation = () => {
    setOpenDeleteHistoryConFirmation(true);
  };
  const handleCloseDeleteHistoryConFirmation = () => {
    setOpenDeleteHistoryConFirmation(false);
  };

const apiCall=()=>{
  axios
  .get(`http://34.93.135.33:8080/api/get_exe_ip_count_history/${id.id}`)
  .then((res) => {
    const data = res.data.data.filter((e) => {
     return e.isDeleted !== true;
    });
    console.log(data);
    setData(data);
  });
}

  useEffect(() => {
    apiCall()
  }, []);

  const handleDeleteRowData = (data) => {
    setRowData(data);
    handleClickOpenDeleteHistoryConFirmation();
    // console.log(data);
  };

  const columns = [
    {
      field: "S.No",
      headerName: "S.No",
      renderCell: (params) => {
        const rowIndex = data.indexOf(params.row);
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      field: "reach",
      headerName: "Reach",
      width: 150,
    },
    {
      field: "impression",
      headerName: "Impression",
      width: 150,
    },
    {
      field: "engagement",
      headerName: "Engagement",
      width: 150,
    },
    {
      field: "story_view",
      headerName: "Story View",
      width: 150,
    },
    {
      field: "stats_for",
      headerName: "Stats For",
      width: 150,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      width: 150,
    },
    {
      field: "end_date",
      headerName: "End Date",
      width: 150,
    },
    {
      field: "creation_date",
      headerName: "Creation Date",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {new Date(params.row.creation_date).toISOString().substr(8, 2)}/
            {new Date(params.row.creation_date).toISOString().substr(5, 2)}/
            {new Date(params.row.creation_date).toISOString().substr(2, 2)}
          </div>
        );
      },
    },
    {
      field: "media",
      headerName: "Media",
      width: 150,
      renderCell: (params) => {
        return (
          <Button href={params.row.media} variant="contained" color="primary">
            Download
          </Button>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => handleDeleteRowData(params.row)}
            variant="contained"
            color="primary"
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <>
      {" "}
      <div style={{ width: "80%", margin: "0 0 0 10%" }}>
        <UserNav />
        <FormContainer
          mainTitle="Execution History"
          link="/ip-master"
          buttonAccess={buttonAccess}
        />
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      </div>
      <DeleteHistoryConfirmation
        handleCloseDeleteHistoryConFirmation={
          handleCloseDeleteHistoryConFirmation
        }
        openDeleteHistoryConFirmation={openDeleteHistoryConFirmation}
        rowData={rowData}
        apiCall={apiCall}
      />
    </>
  );
}
