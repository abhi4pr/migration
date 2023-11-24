import { Paper, TextField, Grid } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from 'react';

const PhaseCreation = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());

    return (
        <>
            <div className="form-heading">
                <div className="form_heading_title">
                    <h2>Phase Creation</h2>
                </div>
            </div>
            <Paper style={{ padding: "20px", margin: "20px" }}>
                <Grid container spacing={2}>
                    <Grid>
                        <TextField
                            disabled
                            label="Plan Name"
                            defaultValue=" ABC"
                            sx={{ marginRight: "5px", paddingBottom: "10px" }}
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            disabled
                            label="Commitment"
                            defaultValue=" Tiger 3"
                            sx={{ marginRight: "5px", paddingBottom: "10px" }}
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            disabled
                            label="Page Name"
                            defaultValue=" naughty World"
                            sx={{ marginRight: "5px", paddingBottom: "10px" }}
                        />
                    </Grid>
                    <Grid>
                        <TextField
                            disabled
                            label="Campaign Detailing"
                            defaultValue=" naughty World"
                            sx={{ marginRight: "5px" }}
                        />
                    </Grid>
                </Grid>
            </Paper>

            <Paper>
                <TextField
                    disabled
                    label="Campaign "
                    defaultValue=" naughty World"
                    sx={{ marginRight: "5px" }}
                />
                <TextField
                    label="Campaign Detailing"
                    defaultValue=" naughty World"
                    sx={{ marginRight: "5px" }}
                />
                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Start Date & Time"
                        value={selectedDate}
                        onChange={(newValue) => {
                            setSelectedDate(newValue);
                        }}
                    />
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="End Date & Time"
                        value={selectedEndDate}
                        onChange={(newValue) => {
                            setSelectedEndDate(newValue);
                        }}
                    />
                </LocalizationProvider> */}
            </Paper>
        </>
    );
};

export default PhaseCreation;
