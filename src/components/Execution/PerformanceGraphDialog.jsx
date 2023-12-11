import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Chart } from "chart.js";
import React, { useEffect } from "react";
import { useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const setFollowersDataY = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "# of Followers",
      data: [100, 20, 33, 24, 5, 61, 7, 48, 9, 10, 91, 112],
      backgroundColor: "rgb(242, 31, 12)",
      borderColor: "rgb(255, 165, 0)",
      borderWidth: 1,
    },
    {
      label: "# of Post Counts",
      data: [10, 120, 33, 244, 50, 1, 70, 48, 90, 10, 91, 12],
      backgroundColor: "rgb(23, 3, 252)",
      borderColor: "rgb(255, 165, 0)",
      borderWidth: 1,
    },
  ],
};

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];
export default function PerformanceGraphDialog({
  setOpenPerformanceGraphDialog,
}) {
  const [open, setOpen] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    //   setOpen(false);
    setOpenPerformanceGraphDialog(false);
  };



  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>


          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={500}
            height={300}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
