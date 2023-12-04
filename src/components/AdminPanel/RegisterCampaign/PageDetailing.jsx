import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import {
  TextField,
  Button,
  DialogActions,
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import axios from "axios";
import { Paper, Autocomplete } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalContext } from "../../../Context/Context";

let options = [];
const PageDetaling = ({
  pageName,
  realPageData,
  pages,
  search,
  searchedpages,
  data,
  setFilteredPages,
}) => {
  const { toastAlert ,toastError} = useGlobalContext();

  const navigate = useNavigate();
  const [allPages, setAllPages] = useState([]);
  const [postpage, setPostPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [deletingPageId, setDeletingPageId] = useState(null);
  const [remainingPages, setRemainingPages] = useState([]);

  useEffect(() => {
    if (search == false) {
      if (pages?.length > 0) {
        const addPost = pages.map((page) => {
          return { ...page, postPerPage: 0 };
        });
        setAllPages([...addPost]);
        const differenceArray = realPageData?.filter((element) => {
          if (!pages.includes(element)) {
            options.push(element.page_name);
            return !pages.includes(element);
          }
        });
        setRemainingPages(differenceArray);
      }
    } else {
      if (searchedpages?.length > 0) {
        console.log("first");
        const addPost = searchedpages.map((page) => {
          return { ...page, postPerPage: 0 };
        });
        setAllPages([...addPost]);
      }
    }
  }, [pages, search, searchedpages]);

  const pageReplacement = (e, params, index) => {
    // console.log(e.target.innerText,params,index)

    const pageReplacement = realPageData.find((page) => {
      return page.page_name == e.target.innerText;
    });
    // console.log(pageReplacement)
    const z = [...allPages];
    z.splice(index, 1, pageReplacement);
    // console.log(z)
    setAllPages(z);
  };
  const columns = [
    {
      field: "S.NO",
      headerName: "S.NO",
      width: 90,
      renderCell: (params) => {
        const rowIndex = allPages.indexOf(params.row);
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      field: "page_name",
      headerName: "Pages",
      width: 150,
      editable: true,
      renderCell: (params) => {
        // console.log(params)
        return params?.row?.status == false ? (
          <Autocomplete
            id="combo-box-demo"
            options={options}
            getOptionLabel={(option) => option}
            sx={{ width: 300 }}
            renderInput={(param) => (
              // console.log(params)
              <TextField {...param} label={params.row.page_name} />
            )}
            onChange={(e) =>
              pageReplacement(e, params.row, allPages.indexOf(params.row))
            }
          />
        ) : (
          params.page_name
        );
      },
    },
    {
      field: "follower_count",
      headerName: "Follower",
      width: 150,
      editable: true,
    },
    {
      field: "cat_name",
      headerName: "Category",
      width: 150,
      editable: true,
    },
    {
      field: "post_page",
      headerName: "Post / Page",
      width: 150,

      renderCell: (params) => {
        // params.value=params.row.postPerPage
        return (
          <input
            style={{ width: "60%" }}
            type="number"
            value={params.value}
            placeholder={params.row.postPerPage}
            onChange={(e) => {
              const update = allPages.map((page) => {
                if (params.row.p_id == page.p_id) {
                  return { ...page, postPerPage: e.target.value };
                }
                return page;
              });
              console.log(update);
            }}
          />
        );
      },
    },
    // {
    //   field: "platform",
    //   headerName: "vender",
    //   width: 150,
    //   editable: true,
    // },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <Button onClick={() => removePage(params)}>
            {" "}
            <DeleteIcon />
          </Button>
        );
      },
    },
  ];

  const removePage = (params) => {
    setOpenDialog(true);
    setDeletingPageId(params.id);
  };
  const confirmDelete = () => {
    const newData = allPages.filter((page) => page.p_id != deletingPageId);
    setFilteredPages(newData);
    setOpenDialog(false);
  };
  const handlePost = (e) => {
    const ppp = allPages.map((page) => {
      return { ...page, postPerPage: Number(e.target.value) };
    });
    setAllPages(ppp);
    setPostPage(Number(e.target.value));
  };

  const submitPlan = async (e) => {
    e.preventDefault();
    if (pageName == "planCreation") {
      const planName = data.campaignName + "plan";

      const newdata = {
        planName,
        campaignName: data.campaignName,
        campaignId: data.campaignId,
        pages: allPages,
      };
      try {
        const result = await axios.post(
          "http://34.93.135.33:8080/api/campaignplan",
          newdata
        );
        console.log(result);
        toastAlert("Plan Created SuccessFully");
        setTimeout(() => {
          navigate("/admin/registered-campaign");
        }, 2000);
      } catch (error) {
        toastError("Plan not Created");
      }
    }
    if (pageName == "phaseCreation") {
    }
  };
  console.log(allPages);
  return (
    <Paper>
      <Box sx={{ p: 2 }}>
        <TextField
          id="outlined-basic"
          label="Post/pages"
          variant="outlined"
          onChange={handlePost}
        />
      </Box>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={allPages || []}
          columns={columns}
          getRowId={(row) => row.p_id}
          pageSizeOptions={[5]}
          getRowClassName={(params) => {
            return params.row.status == false ? "unavailable" : "available";
          }}
          sx={{
            ml: 2,
            ".unavailable": {
              bgcolor: " #FF4433",
              "&:hover": {
                bgcolor: "#E30B5C",
              },
            },
          }}
        />
      </Box>
      {!search && (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            sx={{ mt: 2, mb: 4 }}
            onClick={submitPlan}
          >
            submit
          </Button>{" "}
        </div>
      )}
      <>
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Remove Page</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to Remove this page?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} variant="outlined">
              Cancel
            </Button>
            <Button onClick={confirmDelete} variant="outlined" color="error">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </>
    </Paper>
  );
};

export default PageDetaling;
