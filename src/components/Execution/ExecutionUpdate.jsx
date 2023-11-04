import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import { Alert, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { TimeField, TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Snackbar from "@mui/material/Snackbar";
import Confirmation from "./Confirmation";
import axios from "axios";
import { da } from "date-fns/locale";
// import { StaticDatePicker } from "@mui/x-date-pickers";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function ExecutionUpdate({ id, rowData, setReload, status }) {
  console.log(rowData.execution_status);
  const [remark, setRemark] = useState("");
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  // const [date, time] = formatDate(new Date()).split(" ");
  const currentDate = new Date();
  var now = currentDate.toLocaleString();
  // console.log(currentDate.getDate()); // 👉️ 2021-12-31
  // console.log(now);
  // console.log(currentDate);
  const [snackbar, setSnackbar] = useState(null);
  const [value, setValue] = useState(null);
  const [confirmation, setConfirmation] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSave = () => {
    handleClose();
  };

  const handleClose = () => {
    validation();

    // console.log("hitted");
    console.log(value);
  };
  const validation = () => {
    console.log("validation call");
    setOpen(false);
    setConfirmation(true);

    // return true;
  };
  const handleCloseSnackbar = () => setSnackbar(null);
  useEffect(() => {
    setData(rowData);
  }, []);
  return (
    <div>
      {/* <Button onClick={handleClickOpen}> */}

      <Button
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
        color={rowData?.execution_status == 0 ? "error" : "success"}
      >
        {rowData?.execution_status == 0 ? "Reject" : "Done"}
      </Button>
      {/* <EditIcon
        onClick={() => {
          // console.log(rowData);
          setOpen(true);
        }}
      /> */}
      {/* </Button> */}
      {confirmation && (
        <Confirmation
          rowData={rowData}
          value={value}
          remark={remark}
          status={status}
          setReload={setReload}
          confirmation={confirmation}
          setSnackbar={setSnackbar}
          setConfirmation={setConfirmation}
        />
      )}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Update Execution Status
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setOpen(false);
          }}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            You are about to update the execution status.
          </Typography>
          {rowData?.execution_status !== 0 && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={value}
                onChange={setValue}
                format="DD/MM/YYYY"
                sx={{ mb: 2, mr: 2 }}
              />
              <TimePicker value={value} onChange={setValue} />
            </LocalizationProvider>
          )}
          <TextField
            fullWidth
            id="fullWidth"
            label="Update Remark"
            variant="outlined"
            onChange={(e) => {
              setRemark(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSave}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert sx={{ ml: 80 }} {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}
