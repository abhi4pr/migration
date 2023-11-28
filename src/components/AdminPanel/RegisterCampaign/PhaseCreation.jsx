import {
  Paper,
  TextField,
  Grid,
  Typography,
  Autocomplete,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CampaignDetailes from "./CampaignDetailes";
// import { useState } from "react";
const PhaseCreation = () => {
  const options = ["Category 1", "Category 2", "Category 3", "Category 4", "Category 5", "Category 6", "Category 7"];
  const Follower_Count = [
    "100k",
    "100k to 1000k ",
    "1000k to 1M ",
    "1M to 5M ",
  ];
  const page_health = ["Active", "nonActive"];
  return (
    <>
      <div>
        <div className="form_heading_title">
          <h2 className="form-heading">Phase Creation</h2>
        </div>
      </div>
      <>
        <CampaignDetailes />
      </>
       <Paper sx={{ display: "flex", gap: "10" }}>
        <Autocomplete
          multiple
          id="combo-box-demo"
          options={options}
          getOptionLabel={(option) => option}
          // sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Category" />}
        />
        <Autocomplete
          id="combo-box-demo"
          options={Follower_Count}
          getOptionLabel={(option) => option}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Follower Count" />
          )}
        />
        <Autocomplete
          id="combo-box-demo"
          options={page_health}
          getOptionLabel={(option) => option}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Page health" />
          )}
        />
        <TextField
        label="Search"
        variant="outlined"
        // value={searchText}
        // onChange={handleSearchChange}
        style={{ margin: "10px" }}
      />
      </Paper>
     
      <Grid item xs={12} sm={3}>
        <Typography
          variant="h6"
          sx={{ marginLeft: "50px", fontWeight: "40px" }}
        >
          Phase Detailes
        </Typography>
      </Grid>
      <Paper sx={{ p: 2, m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              disabled
              label="Campaign"
              defaultValue=" naughty World"
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Phase" defaultValue=" Trailer" />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField label="Description" defaultValue=" description" />
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Start Date *" format="DD/MM/YY" />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="End Date *" format="DD/MM/YY" />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
export default PhaseCreation;