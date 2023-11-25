import { Paper, TextField, Grid, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CampaignDetailes from "./CampaignDetailes";

const PhaseCreation = () => {
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
              <DatePicker  label="Start Date *" format="DD/MM/YY" />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker  label="End Date *" format="DD/MM/YY" />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default PhaseCreation;
