import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { Chart } from 'chart.js';
import React from 'react'
import { useState } from 'react';


export default function PerformanceGraphDialog({setOpenPerformanceGraphDialog}) {
    const [open, setOpen] = useState(true);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
    //   setOpen(false);
        setOpenPerformanceGraphDialog(false);
    };

    var ctx = document.getElementById("linechart");
      var myChart = new Chart(ctx, {
        type: "doughnut",
        data: setStatsDataGraph,
      });
  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
        <div className="uuuuu col-md-7" style={{ height: "300px" }}>
                  <canvas id="linechart" width="400" height="300"></canvas>
                </div>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}
