import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import ModeCommentTwoToneIcon from "@mui/icons-material/ModeCommentTwoTone";
import DownloadTwoToneIcon from "@mui/icons-material/DownloadTwoTone";
import { useState } from "react";
import SourceIcon from "@mui/icons-material/Source";
import { SnippetFolderTwoTone } from "@mui/icons-material";

export default function Review() {
  const [reload, setReload] = useState(false);
  const [showData, setShowData] = useState([]);
  const [brandName, setBrandName] = useState([]);
  const [contentTypeList, setContentTypeList] = useState([]);
  const [commits, setCommits] = useState([]);
  const [assignToList, setAssignToList] = useState([]);
  const [commitmentModalData, setCommitmentModalData] = useState([{}]);
  const [open, setOpen] = React.useState(false);
  const [openActionModal, setOpenActionModal] = useState(false);
  const [actionModalData, setActionModalData] = useState({});
  const [actionType, setActionType] = useState("");
  const [actionRemark, setActionRemark] = useState("");

  const handleOpen = (params) => {
    setCommitmentModalData(params.row.commitment);
    console.log(params.row);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleOpenActionModal = (params, action) => {
    console.log(params.row);
    setActionModalData(params.row);
    setOpenActionModal(true);
    setActionType(action);
  };
  const handleCloseActionModal = () => setOpenActionModal(false);

  // const handleAction = (params,action) => {
  //   console.log("clicked to complect");
  //   console.log(params.row);
  //   handleOpenActionModal()
  //   setActionType(action)
  // };
  // const handleReject = (params) => {
  //   console.log("clicked to reject");
  //   console.log(params.row);
  //   axios
  //     .put("https://api-dot-react-migration-project.el.r.appspot.com/api/contentSectionReg", {
  //       content_section_id: params.row.content_section_id,
  //       status: "24",
  //       stage: "3",
  //     })
  //     .then((response) => {
  //       if (response.data.success == true) {
  //         setReload(!reload);
  //       }
  //     });
  // };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: "10px",
    transform: "translate(-40%, -50%)",
    width: "80vw",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 1,
  };

  const handleActionSubmit = () => {
    console.log(actionType);
    console.log(actionRemark);
    const status =
      actionType == "complect" ? "23" : actionType == "reject" ? "24" : "25";
    const stage =
      actionType == "complect" ? "4" : actionType == "reject" ? "3" : "3";
    axios
      .put("https://api-dot-react-migration-project.el.r.appspot.com/api/contentSectionReg", {
        content_section_id: actionModalData.content_section_id,
        status: status,
        stage: stage,
        creator_remark: actionRemark,
        ...(actionType === "complect" && { endDate: new Date() }),
      })
      .then((response) => {
        if (response.data.success == true) {
          setReload(!reload);
          handleCloseActionModal();
        }
      });
  };
  useEffect(() => {
    axios
      .get("https://api-dot-react-migration-project.el.r.appspot.com/api/contentSectionReg")
      .then((response) => {
        // console.log(response.data.data);
        const data = response.data.data.filter(
          (e) => e.status == "22" && e.stage == "3"
        );
        console.log(data);
        setShowData(data);
      });

    axios
      .get("https://api-dot-react-migration-project.el.r.appspot.com/api/get_brands")
      .then((response) => {
        setBrandName(response.data.data);
        // setTable1Data2(true);
      })
      .catch((err) => {
        console.log(err);
      });

    axios.get("https://api-dot-react-migration-project.el.r.appspot.com/api/content").then((response) => {
      setContentTypeList(response.data.data);
    });
    axios
      .get("https://api-dot-react-migration-project.el.r.appspot.com/api/get_all_commitments")
      .then((response) => {
        const data = response.data.data;

        setCommits(data);
      });
    axios.get("https://api-dot-react-migration-project.el.r.appspot.com/api/get_all_users").then((response) => {
      const data = response.data.data.filter((e) => e.dept_id == 13);
      console.log(data);
      setAssignToList(data);
    });
  }, []);

  useEffect(() => {
    axios
      .get("https://api-dot-react-migration-project.el.r.appspot.com/api/contentSectionReg")
      .then((response) => {
        const data = response.data.data.filter(
          (e) => e.status == "22" && e.stage == "3"
        );
        console.log(data);
        setShowData(data);
      });
  }, [reload]);

  const columns = [
    {
      field: "S.NO",
      headerName: "S.NO",
      width: 90,
      editable: false,
      renderCell: (params) => {
        const rowIndex = showData.indexOf(params.row);
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      field: "brand_id",
      headerName: "Brand Name",
      width: 150,
      renderCell: (params) => {
        return brandName.filter((e) => {
          return e.brand_id == params.row.brand_id;
        })[0]?.brand_name;
        //  return params.row.brand_id.filter(e=>brandName.map(e=>e.brand_id).includes(e))[0].brand_name
      },
    },
    {
      field: "assign_to",
      headerName: "Assigned To",
      width: 150,
      renderCell: (params) => {
        return assignToList.filter((e) => {
          return e.user_id == params.row.assign_to;
        })[0]?.user_name;
      },
    },
    {
      field: "brnad_dt",
      headerName: "Expected Data & Time",
      width: 200,
      renderCell: (params) => {
        return new Date(params.row.brnad_dt)
          .toLocaleString("en-GB", { timeZone: "UTC" })
          .replace(/(\d+)\/(\d+)\/(\d+), (\d+:\d+).*/, "$3/$2/$1 $4");
      },
    },

    {
      field: "content_type_id",
      headerName: "Content Type",
      width: 150,
      renderCell: (params) => {
        const matchingContentType = contentTypeList.find((e) => {
          return params.row?.content_type_id === e?.content_type_id;
        });
        return matchingContentType?.content_type || "";
      },
    },
    {
      field: "campaign_brief",
      headerName: "Campaign Brief",
      width: 150,
    },
    {
      field: "content_brief",
      headerName: "Content Remark",
      width: 150,
    },
    {
      field: "creator_remark",
      headerName: "Creator Remark",
      width: 150,
    },
    {
      field: "commits",
      headerName: "Commits",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <Button onClick={() => handleOpen(params)} variant="text">
              <ModeCommentTwoToneIcon />
            </Button>
          </div>
        );
      },
    },
    {
      field: "content_link",
      headerName: "Contents",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            {/* <a href={params.row.download_excel_file}> */}
            <Button variant="text">
              <a href={params.row.download_content_sec_file}>
                <SourceIcon />
              </a>
            </Button>
            {/* </a> */}
          </div>
        );
      },
    },
    {
      field: "cmpAdminDemoLink",
      headerName: "Link",
      width: 300,
      renderCell: (params) => {
        return (
          params.row.cmpAdminDemoLink && (
            <Button variant="text">
              <a
                href={params.row.cmpAdminDemoLink}
                target="_blank"
                rel="noreferrer"
              >
                {params.row.cmpAdminDemoLink}
              </a>
            </Button>
          )
        );
      },
    },
    {
      field: "downloadCmpAdminDemoFile",
      headerName: "File",
      renderCell: (params) => {
        return (
          params.row.downloadCmpAdminDemoFile && (
            <Button variant="text">
              <a href={params.row.downloadCmpAdminDemoFile}>
                <SnippetFolderTwoTone />
              </a>
            </Button>
          )
        );
      },
    },

    {
      field: "download_excel_file",
      headerName: "Excel Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <a href={params.row.download_excel_file}>
              <Button variant="text">
                <DownloadTwoToneIcon />
              </Button>
            </a>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Assign a Content Creator",
      renderCell: (params) => {
        return (
          <div className="d-flex text-center align-item-center justify-content-center">
            <Button
              type="button"
              variant="contained"
              color="success"
              sx={{ marginRight: "10px" }}
              onClick={() => handleOpenActionModal(params, "complect")}
            >
              Complete
            </Button>
            <Button
              onClick={() => handleOpenActionModal(params, "reject")}
              variant="contained"
              color="error"
              sx={{ marginRight: "10px" }}
            >
              Reject
            </Button>
            <Button
              onClick={() => handleOpenActionModal(params, "enhancement")}
              color="warning"
              variant="contained"
            >
              Enhancement
            </Button>
          </div>
        );
      },
      width: 400,
    },
  ];

  const commitColumns = [
    {
      field: "S.NO",
      headerName: "S.NO",
      width: 90,
      editable: false,
      renderCell: (params) => {
        const rowIndex = commitmentModalData.indexOf(params.row);
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      field: "selectValue",
      headerName: "Commits",
      width: 200,
      renderCell: (params) => {
        return commits.filter((e) => {
          return e.cmtId == params.row.selectValue;
        })[0]?.cmtName;
      },
    },
    {
      field: "textValue",
      headerName: "Value",
      width: 150,
    },
  ];
  return (
    <div>
      <div>
        <>
          <DataGrid
            rows={showData}
            columns={columns}
            pageSize={10}
            getRowId={(row) => row._id}
          />
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                sx={{ padding: "2px" }}
              >
                Commits
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2, mb: 3 }}>
                <Paper sx={{ padding: "10px" }}>
                  <div className="d-flex justify-content-between">
                    <DataGrid
                      rows={commitmentModalData}
                      columns={commitColumns}
                      pageSize={10}
                      getRowId={(row) => row.selectValue}
                    />
                  </div>
                  <Button
                    sx={{ marginTop: "10px" }}
                    variant="contained"
                    onClick={handleClose}
                    color="primary"
                  >
                    Cancle
                  </Button>
                </Paper>
              </Typography>
            </Box>
          </Modal>
        </>

        <Modal
          open={openActionModal}
          onClose={handleCloseActionModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              borderRadius: "10px",
              transform: "translate(-40%, -50%)",
              width: "30vw",
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 1,
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ padding: "2px" }}
            >
              {actionType == "complect"
                ? "Complect"
                : actionType == "reject"
                ? "Reject"
                : "Enhancement"}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {actionType == "reject" && (
                <div className="d-flex  justify-content-center">
                  <TextField
                    label="Multiline"
                    multiline
                    value={actionRemark}
                    rows={4}
                    onChange={(e) => setActionRemark(e.target.value)}
                    defaultValue="Default Value"
                  />
                </div>
              )}
              {actionType == "enhancement" && (
                <div className="d-flex  justify-content-center">
                  <TextField
                    label="Multiline"
                    multiline
                    value={actionRemark}
                    onChange={(e) => setActionRemark(e.target.value)}
                    rows={4}
                    defaultValue="Default Value"
                  />
                </div>
              )}
              <Paper
                sx={{
                  padding: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  sx={{ marginTop: "10px" }}
                  variant="contained"
                  onClick={handleCloseActionModal}
                  color="error"
                >
                  Cancle
                </Button>
                <Button
                  sx={{ marginTop: "10px" }}
                  variant="contained"
                  onClick={handleActionSubmit}
                  color="primary"
                >
                  Submit
                </Button>
              </Paper>
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}
