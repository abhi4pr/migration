import React from "react";
import Stack from "@mui/material/Stack";
import {
  Autocomplete,
  Button,
  Checkbox,
  OutlinedInput,
  Paper,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import CopyAllOutlinedIcon from "@mui/icons-material/CopyAllOutlined";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { DataGrid, GridColumnMenu, GridToolbar } from "@mui/x-data-grid";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import CircularWithValueLabel from "../InstaApi.jsx/CircularWithValueLabel";
import { useCallback } from "react";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { toast } from "react-toastify";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function ExecutionAll() {
  const [rows, setRows] = useState([]);
  const [pagemode, setPagemode] = useState(1);
  const [alldata, setAlldata] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [copiedData, setCopiedData] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [reach, setReach] = useState(0);
  const [impression, setImpression] = useState(0);
  const [engagement, setEngagement] = useState(0);
  const [storyView, setStoryView] = useState(0);
  const [rowData, setRowData] = useState({});
  const [statesFor, setStatesFor] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [demoFile, setDemoFile] = useState();
  const [stateForIsValid, setStateForIsValid] = useState(false);

  const dropdownStaticData = [
    "Daily",
    "weekly",
    "fortnight",
    "monthly",
    "quarterly",
  ];

  const handleFileChange = (event) => {
    setDemoFile(event.target.files[0]);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(13, 110, 253)",
      },
      //   secondary: purple,
    },
  });

  useEffect(() => {
    const formData = new URLSearchParams();
    formData.append("loggedin_user_id", 36);
    // formData.append("filter_criteria", "m");
    // formData.append("pendingorcomplete", "pending");
    console.log(formData);
    axios
      .post(
        "https://purchase.creativefuel.io/webservices/RestController.php?view=inventoryDataList",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        // console.log(res.data.body);
        setAlldata(res.data.body);
        let tempdata = res.data.body.filter((ele) => {
          return ele.platform.toLowerCase() == "instagram";
        });
        setRows(tempdata);
        // console.log(tempdata);
      });
  }, []);
  const converttoclipboard = (copydata) => {
    const copyData = copydata
      .map((row) => {
        // Modify this loop to construct your desired data format
        let rowData = "";
        for (const key in row) {
          rowData += `${key}: ${row[key]}\n`;
        }
        return rowData;
      })
      .join("\n");

    // Copy data to the clipboard
    navigator.clipboard
      .writeText(copyData)
      .then(() => {
        // Data successfully copied to the clipboard
        console.log("Copied to clipboard: ", copyData);
      })
      .catch((err) => {
        // Handle errors
        console.error("Unable to copy to clipboard: ", err);
      });
  };
  const option = ["Story", "Post", "Both", "Note"];
  const copySelectedRows = (id) => {
    console.log(id);
    // console.log(rowSelectionModel);
    let copydata = [];
    let set = new Set();

    for (let i = 0; i < rowSelectionModel.length; i++) {
      set.add(rowSelectionModel[i]);
    }

    // console.log(set);
    for (let i = 0; i < rows.length; i++) {
      if (set.has(rows[i].p_id)) {
        let temp = [
          `Page Name : ${rows[i].page_name}`,
          `  Followers ${rows[i].follower_count}`,
          ` Page Link: ${rows[i].page_link}`,
        ];
        if (id == 1 && selectedOptions.includes("Story")) {
          temp.push(`Story : ${rows[i].story}`);
        }
        if (id == 1 && selectedOptions.includes("Post")) {
          temp.push(`Post : ${rows[i].post}`);
        }
        if (id == 1 && selectedOptions.includes("Both")) {
          temp.push(`Both : ${rows[i].both_}`);
        }
        if (id == 1 && selectedOptions.includes("Note")) {
          temp.push(`Note : ${rows[i].note}`);
        }
        copydata.push(temp);
      }
    }
    console.log(copydata);

    converttoclipboard(copydata);
  };

  const copyAllRows = () => {
    let copydata = [];
    let Followerscount = 0;
    for (let i = 0; i < rows.length; i++) {
      // if (set.has(alldata[i].p_id)) {
      let temp = [
        `Page Name : ${rows[i].page_name}`,
        `  Followers ${rows[i].follower_count}`,
        ` Page Link: ${rows[i].page_link}`,
      ];
      Followerscount += Number(rows[i].follower_count);
      copydata.push(temp);
      // }
    }
    copydata.push([rows.length, Followerscount]);
    converttoclipboard(copydata);
  };

  const handlefilter = (name, id) => {
    console.log(name, "check", id);
    let ftrdata = alldata.filter((ele) => {
      return ele.platform == name;
    });
    // console.log(ftrdata);
    setRows(ftrdata);
    setPagemode(id);
  };

  const handleStartDateChange = (newValue) => {
    const date = new Date(newValue.$d);
    const isoDate = date.toISOString(); // This will be in UTC

    console.log(isoDate); // Outputs: 2023-10-20T08:27:54.738Z

    // If you want to display the date with the original offset (+00:00)
    console.log(isoDate.replace("Z", "+00:00")); // Outputs: 2023-10-20T08:27:54.738+00:00

    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    const date = new Date(newValue.$d);
    const isoDate = date.toISOString(); // This will be in UTC

    console.log(isoDate); // Outputs: 2023-10-20T08:27:54.738Z

    // If you want to display the date with the original offset (+00:00)
    console.log(isoDate.replace("Z", "+00:00")); // Outputs: 2023-10-20T08:27:54.738+00:00

    setEndDate(newValue);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 40,
      renderCell: (params) => {
        const rowIndex = rows.indexOf(params.row);
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      field: "platform",
      headerName: "Platform",
      // width: 150,
    },
    pagemode == 1 || pagemode == 2
      ? {
          field: "page_name",
          headerName: "Page Name",
          // width: 150,
        }
      : pagemode == 3 || pagemode == 4
      ? {
          field: "account_name",
          headerName: "Account Name",
          // width: 150,
        }
      : {
          field: "channel_username",
          headerName: "Channel Name",
          // width: 150,
        },
    {
      field: "service_name",
      headerName: "Page Type",
      // width: 150,
    },
    {
      field: "cat_name",
      headerName: "Account Category",
      width: 150,
    },
    pagemode == 1 || pagemode == 2
      ? {
          field: "page_link",
          headerName: "Link",
          // width: 160,
          renderCell: (params) => {
            const date = params.row.page_link;
            // console.log(date);
            return (
              <div style={{ color: "blue" }}>
                <a href={date} target="blank">
                  {date == "" ? "" : "Link"}
                </a>
              </div>
            );
          },
        }
      : pagemode == 3 || pagemode == 4
      ? {
          field: "account_link",
          headerName: "Link",
          // width: 160,
          renderCell: (params) => {
            const date = params.row.account_link;
            // console.log(date);
            return (
              <div style={{ color: "blue" }}>
                <a href={date} target="blank">
                  {date == "" ? "" : "Link"}
                </a>
              </div>
            );
          },
        }
      : {
          field: "channel_link",
          headerName: "Link",
          // width: 160,
          renderCell: (params) => {
            const date = params.row.channel_link;
            // console.log(date);
            return (
              <div style={{ color: "blue" }}>
                <a href={date} target="blank">
                  {date == "" ? "" : "Link"}
                </a>
              </div>
            );
          },
        },
    pagemode == 1 || pagemode == 4
      ? {
          field: "follower_count",
          headerName: "Followers",
          // width: 150,
        }
      : pagemode == 2
      ? ({
          field: "follower_count",
          headerName: "Followers",
          // width: 150,
        },
        {
          field: "page_likes",
          headerName: "Page Likes",
        })
      : {
          field: "subscribers",
          headerName: "Subscribers",
          // width: 150,
        },
    pagemode == 1 || pagemode == 2
      ? {
          field: "reach",
          headerName: "Reach",
        }
      : pagemode == 3
      ? {
          field: "post",
          headerName: "Post",
          // width: 150,
        }
      : pagemode == 4
      ? ({
          field: "post",
          headerName: "Post",
          // width: 150,
        },
        {
          field: "repost",
          headerName: "Repost",
          // width: 150,
        })
      : ({
          field: "shorts",
          headerName: "Shorts",
          // width: 150,
        },
        {
          field: "logo_Integration",
          headerName: "Logo Integration",
          // width: 150,
        },
        {
          field: "brand_Integration",
          headerName: "Brand Integration",
          // width: 150,
        }),
    {
      field: "impression",
      headerName: "Impression",
    },
    {
      field: "engagement",
      headerName: "Engagement",
    },
    {
      field: "story_view",
      headerName: "Story view",
    },
    {
      headerName: "Update",
      renderCell: (params) => {
        return (
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#myModal1"
            onClick={() => handleRowClick(params.row)}
          >
            Set Stats
          </button>
        );
      },
    },
  ];

  const handleRowClick = (row) => {
    setRowData(row);
  };

  const saveStats = async (e) => {
    const formData = new FormData();
    formData.append("p_id", rowData.p_id);
    formData.append("reach", reach);
    formData.append("impression", impression);
    formData.append("engagement", engagement);
    formData.append("story_view", storyView);
    formData.append("media", demoFile);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("state", statesFor);

    e.preventDefault();
    axios.post(`http://34.93.135.33:8080/api/add_exe_pid_history`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
    
    ).then((res) => {
      console.log(res);
      console.log(res.data);
      
      toast("Form Submitted success")
    });
    // setIsFormSubmitted(true);
  };

  function CustomColumnMenu(props) {
    return (
      <GridColumnMenu
        {...props}
        slots={{
          // Hide `columnMenuColumnsItem`
          columnMenuColumnsItem: null,
        }}
      />
    );
  }
  const handleOptionChange = (event, value) => {
    setSelectedOptions(value);
    console.log(value);
  };
  const handleoptions = (option, props) => {
    console.log(option, "*****");
    console.log(props);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <div style={{}}> */}
        <div className="form-heading">
          <div className="form_heading_title">
            <h2>Pages</h2>
          </div>
        </div>
        <Paper
          justifyContent="space-between"
          sx={{
            flexWrap: "wrap",
            flexDirection: "row",
            pt: 3,
            pb: 3,
            pl: 2,
            pr: 2,
          }}
        >
          {/* <Typography>h1. Heading</Typography> */}
          <Stack direction="row" sx={{}} justifyContent="space-between">
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={option}
              disableCloseOnSelect
              size="small"
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    // onClick={handleoptions(props.key, props.aria - selected)}
                    // onClick={(e) => e.stopPropagation()}
                    checked={selected}
                  />
                  {option}
                </li>
              )}
              style={{ minWidth: 150 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Checkboxes"
                  placeholder="Select"
                />
              )}
              value={selectedOptions}
              onChange={handleOptionChange}
            />
            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<ContentCopyOutlinedIcon />}
                onClick={() => copySelectedRows(1)}
              >
                Copy Selected Pages
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<CopyAllOutlinedIcon />}
                onClick={copyAllRows}
              >
                Copy All Pages
              </Button>
              <Button
                size="small"
                variant="outlined"
                startIcon={<ContentPasteIcon />}
                onClick={() => copySelectedRows(0)}
              >
                Copy Page Name & Links
              </Button>
            </Stack>
          </Stack>
        </Paper>
        {/* Second Paper */}
        <Paper
          sx={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            flexDirection: "row",
            p: 3,
            mt: 3,
            mb: 4,
          }}
        >
          <Typography sx={{ mb: 4 }}>Rate Of Conversion</Typography>

          <Stack direction="row" justifyContent="space-between" spacing={1}>
            <Button
              size="medium"
              variant="contained"
              onClick={() => handlefilter("Instagram", 1)}
            >
              Instagram
            </Button>
            <Button
              size="medium"
              variant="contained"
              onClick={() => handlefilter("Facebook", 2)}
            >
              Facebook
            </Button>
            <Button
              size="medium"
              variant="contained"
              onClick={() => handlefilter("Telegram", 3)}
            >
              Telegram
            </Button>
            <Button
              size="medium"
              variant="contained"
              onClick={() => handlefilter("Threads", 4)}
            >
              Threads
            </Button>
            <Button
              size="medium"
              variant="contained"
              onClick={() => handlefilter("X", 5)}
            >
              X
            </Button>
            <Button
              size="medium"
              variant="contained"
              onClick={() => handlefilter("Youtube", 6)}
            >
              YouTube
            </Button>
          </Stack>
        </Paper>
        {/* Third Paper */}
        <TextField label="Search by Page Name"
         onChange={e=>{
          const temp = alldata.filter((ele) => {
            return ele.page_name.toLowerCase().includes(e.target.value.toLowerCase());
          });
          setRows(temp);

        }
      }
        />
        <Paper
          justifyContent="space-between"
          sx={{ flexWrap: "wrap", flexDirection: "row", p: 3, mt: 3, mb: 4 }}
        >
          <Typography sx={{ mb: 1 }}>Page Summary</Typography>

          {rows != [] ? (
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.p_id}
              // rowModesModel={rowModesModel}
              // onRowModesModelChange
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 50,
                  },
                },
              }}
              // processRowUpdate={processRowUpdate}
              slots={{ toolbar: GridToolbar, columnMenu: CustomColumnMenu }}
              pageSizeOptions={[5, 25, 50, 100, 500]}
              // processRowUpdate={processRowUpdate}
              // onRowClick={handleCheckBox}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
                // console.log(newRowSelectionModel);
              }}
              rowSelectionModel={rowSelectionModel}
              onClipboardCopy={(copiedString) => setCopiedData(copiedString)}
              unstable_ignoreValueFormatterDuringExport
            />
          ) : (
            <CircularWithValueLabel />
          )}
        </Paper>
      </ThemeProvider>

      <div id="myModal1" className="modal fade" role="dialog">
        <div className="modal-dialog" style={{ marginLeft: "25%" }}>
          <div className="modal-content" style={{ width: "150%" }}>
            <div className="modal-header">
              <h4 className="modal-title">Page Name :- {rowData.page_name}</h4>
              <button type="button" className="close" data-dismiss="modal">
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-6">
                  <label>Reach:- &nbsp;</label>
                  <input
                    label="Reach"
                    type="number"
                    value={reach}
                    // fieldGrid={4}
                    onChange={(e) => setReach(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label>Impression:- &nbsp;</label>
                  <input
                    label="Impressions"
                    type="number"
                    value={impression}
                    // fieldGrid={4}
                    onChange={(e) => setImpression(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Engagement:- &nbsp;</label>
                  <input
                    label="Engagement"
                    type="number"
                    value={engagement}
                    // fieldGrid={4}
                    onChange={(e) => setEngagement(e.target.value)}
                  />
                </div>
                <div className="col-md-6">
                  <label>Story View:- &nbsp;</label>
                  <input
                    label="Story View"
                    type="number"
                    value={storyView}
                    // fieldGrid={4}
                    onChange={(e) => setStoryView(e.target.value)}
                  />
                </div>
              </div>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={dropdownStaticData}
                onChange={(e, value) =>{ setStatesFor(value),value?.length>0?setStateForIsValid(true):setStateForIsValid(false)}}
                value={statesFor}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="States for" />
                )}
              />
         { stateForIsValid &&    <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DateTimePicker
                className="my-3"
                  label="Start Date"
                  format="MM/DD/YY hh:mm a"
                  value={startDate}
                  onChange={(newValue) => handleStartDateChange(newValue)}
                />
              </LocalizationProvider>}
              { stateForIsValid &&   <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                className="my-3 mx-3"
                  label="End Date"
                  format="MM/DD/YY hh:mm a"
                  // timezone="merica/New_York"
                  value={endDate}
                  onChange={(newValue) => handleEndDateChange(newValue)}
                />
              </LocalizationProvider>}
              <OutlinedInput
                // variant="outlined"
                type="file"
                accept="image/png, image/jpeg, video/mp4, video/avi"
                inputProps={{
                  accept: ".pdf, .doc, .docx, .mp4, .avi, .png, .jpeg",
                }}
                sx={{ width: "50%", ml: 1 }}
                onChange={(event) => handleFileChange(event)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={saveStats}
                data-dismiss="modal"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ExecutionAll;
