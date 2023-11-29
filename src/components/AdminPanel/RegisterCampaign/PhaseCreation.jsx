import { Paper, TextField, Typography, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CampaignDetailes from "./CampaignDetailes";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const PhaseCreation = () => {
  const param = useParams();
  const id = param.id;
  console.log(id);
  const [allPageData, setAllPageData] = useState([]);
  const [phaseData, setPhaseData] = useState("");
  const [phaseDcripation, setPhaseDcripation] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
console.log(allPageData);
  const getPageData = async () => {
    const pageData = await axios.get(
      `http://34.93.135.33:8080/api/campaignplan/${id}`
    );
    console.log(pageData.data.data);
    setAllPageData(pageData.data.data);
  };
  useEffect(() => {

    getPageData();
  }, []);
  const columns = [
    {
      field: "S.NO",
      headerName: "S.NO",
      width: 90,
      renderCell: (params) => {
        const rowIndex = allPageData.indexOf(params.row);
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      field: "page_name",
      headerName: "Pages",
      width: 150,
      editable: true,
    },
    {
      field: "follower_count",
      headerName: "Follower Count",
      width: 150,
      editable: true,
    },
    {
      field: "cat_name",
      headerName: "Category Name",
      width: 150,
      editable: true,
    },
    {
      field: "postPerPage",
      headerName: "post / page",
      width: 150,
    },
    {
      field: "platform",
      headerName: "vender",
      width: 150,
      editable: true,
    },
  ];

  return (
    <>
      <div className="form_heading_title">
        <h2 className="form-heading">Phase Creation</h2>
      </div>

      <CampaignDetailes cid={id} />
      <Typography variant="h6" sx={{ margin: "20px", fontWeight: "40px" }}>
        Phase Details
      </Typography>
      <Paper sx={{ p: 2, m: 2, display: "flex" }}>
        <TextField
          label="Phase"
          value={phaseData}
          onChange={(e) => setPhaseData(e.target.value)}
          sx={{ m: 2 }}
        />
        <TextField
          label="Description"
          value={phaseDcripation}
          onChange={(e) => setPhaseDcripation(e.target.value)}
          sx={{ m: 2 }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date *"
            format="DD/MM/YY"
            fullWidth
            value={startDate}
            onChange={(e) => setStartDate(e)}
            sx={{ m: 2 }}
          />
          <DatePicker
            label="End Date *"
            format="DD/MM/YY"
            fullWidth
            value={endDate}
            onChange={(e) => setEndDate(e)}
            sx={{ m: 2 }}
          />
        </LocalizationProvider>
      </Paper>
      <DataGrid
        rows={allPageData}
        columns={columns}
        getRowId={(row) => row.p_id}
        pageSizeOptions={[5]}
        slots={{
          toolbar: GridToolbar,
        }}
      />
      <Button variant="contained" onClick={""}>
        Contained
      </Button>
    </>
  );
};
export default PhaseCreation;
