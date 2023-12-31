import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
export default function CampaignCommitment() {
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [isPutOpen, setIsPutOpen] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] =
    useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [postData, setPostData] = useState({
    exeCmpName: "",
    exeHashTag: "",
    exeRemark: "",
  });
  console.log(rows);
  function EditToolbar() {
    const handleClick = () => {
      setIsModalOpen(true);
    };
    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleClick}
        >
          Add record
        </Button>
      </GridToolbarContainer>
    );
  }
  //post data =======>

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!postData.exeCmpName || !postData.exeHashTag || !postData.exeRemark) {
      setErrorMessage("* fields are required.");
      return;
    }
    axios
      .post("http://34.93.135.33:8080/api/exe_campaign", postData)
      .then((response) => {
        setIsModalOpen(false);
        getData();
        console.log("Data saved:", response.data);
      })
      .catch((error) => {
        console.error("Error saving data:", error);
      });
    setIsModalOpen(false);
  };

  // get api ========>
  const getData = () => {
    axios.get("http://34.93.135.33:8080/api/exe_campaign").then((res) => {
      console.log(res.data.data, "yyyyyyyyyyyyyy");
      const data = res.data.data;
      const uniqueCmtNames = new Set();
      const uniqueRows = data.filter((row) => {
        if (uniqueCmtNames.has(row.exeCmpName)) {
          console.log(
            "Brand name already exists. Duplicate values are not allowed."
          );
          return false;
        } else {
          uniqueCmtNames.add(row.exeCmpName);
          return true;
        }
      });
      setRows(uniqueRows);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };
  // put api =============>
  const handlePutData = () => {
    axios
      .put(`http://34.93.135.33:8080/api/exe_campaign`, {
        exeCmpId: editData.exeCmpId,
        exeCmpName: editData.exeCmpName,
        exeHashTag: editData.exeHashTag,
        exeRemark: editData.exeRemark,
      })
      .then((res) => {
        console.log(res.data);
        setIsPutOpen(true);
      })
      .then(() => {
        setIsPutOpen(false);
        getData();
      });
    console.log("put data");
  };
  const handleEditClick = (id, row) => () => {
    setEditData(row);
    console.log(row);
    setIsPutOpen(true);
  };
  // delete ======>
  const handleDeleteClick = (id) => () => {
    setItemToDeleteId(id);
    setIsDeleteConfirmationOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDeleteId) {
      axios
        .delete(`http://34.93.135.33:8080/api/exe_campaign/${itemToDeleteId}`)
        .then(() => {
          getData();
          console.log("Data deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting data:", error);
        })
        .finally(() => {
          setIsDeleteConfirmationOpen(false);
          setItemToDeleteId(null);
        });
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: "S.NO",
      headerName: "S.NO",
      width: 90,
      editable: false,
      renderCell: (params) => {
        const rowIndex = rows.indexOf(params.row);
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      field: "exeCmpName",
      headerName: "Campaign Name",
      width: 180,
    },

    {
      field: "exeHashTag",
      headerName: "Hash Tag",
      width: 180,
    },
    {
      field: "exeRemark",
      headerName: "Remark",
      width: 180,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        const { id, row } = params;
        return [
          // eslint-disable-next-line react/jsx-key
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id, row)}
            color="inherit"
          />,
          // eslint-disable-next-line react/jsx-key
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];
  const filterRows = () => {
    const filtered = rows.filter((row) =>
      row.exeCmpName.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredRows(filtered);
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {
    filterRows();
  }, [searchInput, rows]);

  return (
    <>
      <Paper>
        <div className="form-heading">
          <div className="form_heading_title">
            <h2> Campaign </h2>
          </div>
        </div>
      </Paper>

      <TextField
        label="Search"
        variant="outlined"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        style={{ marginBottom: "10px" }}
      />

      <Box
        sx={{
          height: 500,
          width: "100%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}
      >
        <DataGrid
          rows={filteredRows}
          columns={columns}
          editMode="row"
          getRowId={(row) => row.exeCmpId}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>

      {/* AddRecordModal post data */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Add Record</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <>
                <TextField
                  id="outlined-password-input"
                  label="Campaign Name"
                  name="exeCmpName"
                  type="text"
                  value={postData.exeCmpName}
                  onChange={handleChange}
                />
                {errorMessage && (
                  <div style={{ color: "red", marginBottom: "10px" }}>
                    {errorMessage}
                  </div>
                )}
              </>

              <>
                <TextField
                  id="outlined-password-input"
                  label="Hash Tag"
                  name="exeHashTag"
                  type="text"
                  value={postData.exeHashTag}
                  onChange={handleChange}
                />

                {errorMessage && (
                  <div style={{ color: "red", marginBottom: "10px" }}>
                    {errorMessage}
                  </div>
                )}
              </>

              <>
                <TextField
                  id="outlined-password-input"
                  label="Remark"
                  name="exeRemark"
                  type="text"
                  value={postData.exeRemark}
                  onChange={handleChange}
                />
                {errorMessage && (
                  <div style={{ color: "red", marginBottom: "10px" }}>
                    {errorMessage}
                  </div>
                )}
              </>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* perform put data */}
      <Dialog open={isPutOpen} onClose={() => setIsPutOpen(false)}>
        <DialogTitle>Edit Record</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <TextField
                id="outlined-password-input"
                label="Campaign Name"
                name="exeCmpName"
                type="text"
                value={editData.exeCmpName}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    exeCmpName: e.target.value,
                  }))
                }
              />

              <TextField
                id="outlined-password-input"
                label="Hash Tag"
                name="exeHashTag"
                type="text"
                value={editData.exeHashTag}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    exeHashTag: e.target.value,
                  }))
                }
              />

              <TextField
                id="outlined-password-input"
                label="Reamrk"
                name="exeRemark"
                type="text"
                value={editData.exeRemark}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    exeRemark: e.target.value,
                  }))
                }
              />
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsPutOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handlePutData} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <>
        <Dialog
          open={isDeleteConfirmationOpen}
          onClose={() => setIsDeleteConfirmationOpen(false)}
        >
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setIsDeleteConfirmationOpen(false)}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="primary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
}
