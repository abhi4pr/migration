import React, { use } from "react";
import Stack from "@mui/material/Stack";
import {
  Autocomplete,
  Button,
  Checkbox,
  InputAdornment,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useGlobalContext } from "../../Context/Context";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { Country, City } from "country-state-city";
import { param } from "jquery";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function ExecutionAll() {
  const { toastAlert } = useGlobalContext();
  const [rows, setRows] = useState([]);
  const [pagemode, setPagemode] = useState(1);
  const [alldata, setAlldata] = useState([]);

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
  const [stateForIsNotQuater, setStateForIsNotQuater] = useState(false);
  const [quater, setQuater] = useState("");
  const [quaterIsValid, setQuaterIsValid] = useState(false);

  const [endDateIsValid, setEndDateIsValid] = useState(false);
  const [reachValidation, setReachValidation] = useState(true);
  const [impressionValidation, setImpressionValidation] = useState(true);
  const [engagementValidation, setEngagementValidation] = useState(true);
  const [storyViewValidation, setStoryViewValidation] = useState(true);
  const storedToken = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(storedToken);
  const userID = decodedToken.id;
  const [contextData, setContextData] = useState(false);
  const [alert, setAlert] = useState([]);
  const [openExeDialog, setOpenExeDialog] = React.useState(false);
  const [reachandImpressionImg, setReachandImpressionImg] = useState();
  const [engagementImg, setEngagementImg] = useState();
  const [storyViewImg, setStoryViewImg] = useState();
  const [storyViewVideo, setStoryViewVideo] = useState();
  const [city1, setCity1] = useState();
  const [city2, setCity2] = useState();
  const [city3, setCity3] = useState();
  const [city4, setCity4] = useState();
  const [city5, setCity5] = useState();
  const [city1Percentage, setCity1Percentage] = useState(0);
  const [city2Percentage, setCity2Percentage] = useState(0);
  const [city3Percentage, setCity3Percentage] = useState(0);
  const [city4Percentage, setCity4Percentage] = useState(0);
  const [city5Percentage, setCity5Percentage] = useState(0);
  const [cityImg, setCityImg] = useState();
  const [malePercentage, setMalePercentage] = useState(0);
  const [femalePercentage, setFemalePercentage] = useState(0);
  const [age1Percentage, setAge1Percentage] = useState(0);
  const [age2Percentage, setAge2Percentage] = useState(0);
  const [age3Percentage, setAge3Percentage] = useState(0);
  const [age4Percentage, setAge4Percentage] = useState(0);
  const [age5Percentage, setAge5Percentage] = useState(0);
  const [age6percentage, setAge6Percentage] = useState(0);
  const [age7Percentage, setAge7Percentage] = useState(0);
  const [ageImg, setAgeImg] = useState("");
  const [profileVisit, setProfileVisit] = useState(0);
  const [countryList, setCountryList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [country1, setCountry1] = useState();
  const [country2, setCountry2] = useState();
  const [country3, setCountry3] = useState();
  const [country4, setCountry4] = useState();
  const [country5, setCountry5] = useState();
  const [country1Percentage, setCountry1Percentage] = useState(0);
  const [country2Percentage, setCountry2Percentage] = useState(0);
  const [country3Percentage, setCountry3Percentage] = useState(0);
  const [country4Percentage, setCountry4Percentage] = useState(0);
  const [country5Percentage, setCountry5Percentage] = useState(0);
  const [countryImg, setCountryImg] = useState();
  const [updatePercentage, setSetUpdatePercentage] = useState([]);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [statsUpdateFlag, setSetStatsUpdateFlag] = useState([]);

  const handlePercentageChange = (value, setter) => {
    const newValue = parseFloat(value);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
      setter(newValue);
    }
  };

  useEffect(() => {
    const sum =
      age1Percentage +
      age2Percentage +
      age3Percentage +
      age4Percentage +
      age5Percentage +
      +age6percentage +
      +age7Percentage;
    setTotalPercentage(sum);
  }, [
    age1Percentage,
    age2Percentage,
    age3Percentage,
    age4Percentage,
    age5Percentage,
    age6percentage,
    age7Percentage,
  ]);

  useEffect(() => {
    setCountryList(Country.getAllCountries());
    setCityList([
      ...new Set(City.getCitiesOfCountry("IN").map((city) => city.name)),
    ]);
  }, []);

  const cityCopyValidation = (value) => {
    setTimeout(() => {
      let tempCityList = cityList;
      tempCityList = tempCityList.filter((city) => !value.includes(city));
      setCityList(tempCityList);
    }, 400);
  };

  const countryCopyValidation = (value) => {
    setTimeout(() => {
      let tempCountryList = countryList;
      tempCountryList = tempCountryList.filter(
        (country) => !value.includes(country.name)
      );
      setCountryList(tempCountryList);
    }, 400);
  };

  const handleClickOpenExeDialog = () => {
    setOpenExeDialog(true);
  };

  const navigate = useNavigate();

  const handleCloseExeModal = () => {
    setQuater("");
    setStatesFor(null);
    setStartDate(null);
    setEndDate(null);
    setReach(0);
    setImpression(0);
    setEngagement(0);
    setStoryView(0);
    setRowData({});
    setCity1();
    setCity2();
    setCity3();
    setCity4();
    setCity5();
    setCity1Percentage(0);
    setCity2Percentage(0);
    setCity3Percentage(0);
    setCity4Percentage(0);
    setCity5Percentage(0);
    setMalePercentage(0);
    setFemalePercentage(0);
    setAge1Percentage(0);
    setAge2Percentage(0);
    setAge3Percentage(0);
    setAge4Percentage(0);
    setAge5Percentage(0);
    setAge6Percentage(0);
    setAge7Percentage(0);
    setAgeImg();
    setCityImg();
    setReachandImpressionImg();
    setEngagementImg();
    setStoryViewImg();
    setStoryViewVideo();
    setProfileVisit(0);
    setCountry1();
    setCountry2();
    setCountry3();
    setCountry4();
    setCountry5();
    setCountry1Percentage(0);
    setCountry2Percentage(0);
    setCountry3Percentage(0);
    setCountry4Percentage(0);
    setCountry5Percentage(0);
    setCountryImg();
  };

  const dropdownStaticData = [
    "Daily",
    "Weekly",
    "Fortnight",
    "Monthly",
    "Quarterly",
  ];

  const QuarterStaticData = [
    "Quater 1 (Jan-Mar)",
    "Quater 2 (Apr-Jun)",
    "Quater 3 (Jul-Sep)",
    "Quater 4 (Oct-Dec)",
  ];

  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(13, 110, 253)",
      },
    },
  });

  useEffect(() => {
    const formData = new URLSearchParams();
    formData.append("loggedin_user_id", 36);

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
        setAlldata(res.data.body);
        let tempdata = res.data.body.filter((ele) => {
          return ele.platform.toLowerCase() == "instagram";
        });
        setRows(tempdata);

        for (let i = 0; i < tempdata.length; i++) {
          axios
            .post(`http://34.93.135.33:8080/api/get_percentage`, {
              p_id: tempdata[i].p_id,
            })
            .then((res) => {
              if (res.status == 200) {
                setSetUpdatePercentage((prev) => [...prev, res.data]);
              }
            });
        }

        for (let i = 0; i < tempdata.length; i++) {
          axios
            .get(
              `http://34.93.135.33:8080/api/get_stats_update_flag/${tempdata[i].p_id}`
            )
            .then((res) => {
              if (res.status == 200) {
                setSetStatsUpdateFlag((prev) => [...prev, res.data]);
              }
            });
        }
      });
    if (userID && contextData == false) {
      axios
        .get(
          `http://34.93.135.33:8080/api/get_single_user_auth_detail/${userID}`
        )
        .then((res) => {
          if (res.data[33].view_value == 1) {
            setContextData(true);
            setAlert(res.data);
          }
        });
    }
  }, []);

  const converttoclipboard = (copydata) => {
    const copyData = copydata
      .map((row) => {
        let rowData = "";
        for (const key in row) {
          rowData += `${key}: ${row[key]}\n`;
        }
        return rowData;
      })
      .join("\n");

    navigator.clipboard
      .writeText(copyData)
      .then(() => {})
      .catch((err) => {
        console.error("Unable to copy to clipboard: ", err);
      });
  };
  const option = ["Story", "Post", "Both", "Note"];
  const copySelectedRows = (id) => {
    let copydata = [];
    let set = new Set();

    for (let i = 0; i < rowSelectionModel.length; i++) {
      set.add(rowSelectionModel[i]);
    }
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
    }
    copydata.push([rows.length, Followerscount]);
    converttoclipboard(copydata);
  };

  const handlefilter = (name, id) => {
    let ftrdata = alldata.filter((ele) => {
      return ele.platform == name;
    });

    setRows(ftrdata);
    setPagemode(id);
  };

  const handleStartDateChange = (newValue) => {
    const date = new Date(newValue.$d);
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    const date = new Date(newValue.$d);
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    setEndDate(newValue);
  };

  const handleHistoryRowClick = (row) => {
    navigate(`/admin/exe-history/${row.p_id}`, { state: row.p_id });
  };

  const handleUpdateRowClick = (row) => {
    axios
      .get(`http://34.93.135.33:8080/api/get_exe_ip_count_history/${row.p_id}`)
      .then((res) => {
        let data = res.data.data.filter((e) => {
          return e.isDeleted !== true;
        });
        data = data[data.length - 1];
        navigate(`/admin/exe-update/${data._id}`, { state: row.p_id });
      });
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
          width: 250,
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
          renderCell: (params) => {
            const date = params.row.page_link;
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
          renderCell: (params) => {
            const date = params.row.account_link;

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
          renderCell: (params) => {
            const date = params.row.channel_link;
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
        }
      : pagemode == 2
      ? ({
          field: "follower_count",
          headerName: "Followers",
        },
        {
          field: "page_likes",
          headerName: "Page Likes",
        })
      : {
          field: "subscribers",
          headerName: "Subscribers",
        },

    contextData && {
      field: "update",
      headerName: "Update",
      width: 130,
      renderCell: (params) => {
        return (
          <button
            type="button"
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#myModal1"
            disabled={
              Math.round(
                +updatePercentage.filter(
                  (e) => e.latestEntry.p_id == params.row.p_id
                )[0]?.totalPercentage
              ) == 0 ||
              Math.round(
                updatePercentage.filter(
                  (e) => e.latestEntry.p_id == params.row.p_id
                )[0]?.totalPercentage
              ) == 100
                ? false
                : true
            }
            onClick={() => handleRowClick(params.row)}
          >
            Set Stats
          </button>
        );
      },
    },
    {
      field: "history",
      width: 150,
      headerName: "History",
      renderCell: (params) => {
        console.log( 
        statsUpdateFlag.find(e => e.latestEntry?.p_id == params.row.p_id)
        ,`p_id ${params.row.p_id}`)
        return (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleHistoryRowClick(params.row)}
            disabled={
               ! statsUpdateFlag.find(e => e.latestEntry?.p_id == params.row.p_id)
          }
          >
            See History
          </button>
        );
      },
    },
    {
      field: "statsUpdate",
      width: 150,
      headerName: "Stats Update",
      renderCell: (params) => {
        return (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleUpdateRowClick(params.row)}
          >
            Update
          </button>
        );
      },
    },
    {
      field: "Update percentage",
      width: 150,
      headerName: "Stats Update %",
      renderCell: (params) => {
        const num =
          updatePercentage.filter((e) => e.latestEntry.p_id == params.row.p_id)
            .length > 0
            ? updatePercentage.filter(
                (e) => e.latestEntry.p_id == params.row.p_id
              )[0].totalPercentage
            : 0;
        const a =
          statsUpdateFlag.filter((e) => e.latestEntry.p_id == params.row.p_id)
            .length > 0
            ? statsUpdateFlag.filter(
                (e) => e.latestEntry.p_id == params.row.p_id
              )[0]?.latestEntry?.stats_update_flag
            : false;
        const res = a ? num : 0;
        return Math.round(+res) + "%";
      },
    },
    {
      field: "statsupdateflag ",
      width: 150,
      headerName: "Stats Update Flag",
      renderCell: (params) => {
        const num =
          statsUpdateFlag.filter((e) => e.latestEntry.p_id == params.row.p_id)
            .length > 0
            ? statsUpdateFlag.filter(
                (e) => e.latestEntry.p_id == params.row.p_id
              )[0]?.latestEntry?.stats_update_flag
            : false;
        return num ? "Yes" : "No";
      },
    },
  ];

  const handleRowClick = (row) => {
    setRowData(row);
    handleClickOpenExeDialog();
  };

  const saveStats = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("p_id", rowData.p_id);
    formData.append("reach", reach);
    formData.append("impression", impression);
    formData.append("engagement", engagement);
    formData.append("story_view", storyView);
    demoFile ? formData.append("media", demoFile) : "";
    quater ? formData.append("quater", quater) : "";
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("stats_for", statesFor);
    formData.append("reach_impression_upload_image", reachandImpressionImg);
    formData.append("engagement_upload_image", engagementImg);
    formData.append("story_view_upload_image", storyViewImg);
    formData.append("story_view_upload_video", storyViewVideo);
    formData.append("city_image_upload", cityImg);
    formData.append("Age_upload", ageImg);
    formData.append("city1_name", city1);
    formData.append("city2_name", city2);
    formData.append("city3_name", city3);
    formData.append("city4_name", city4);
    formData.append("city5_name", city5);
    formData.append("percentage_city1_name", city1Percentage);
    formData.append("percentage_city2_name", city2Percentage);
    formData.append("percentage_city3_name", city3Percentage);
    formData.append("percentage_city4_name", city4Percentage);
    formData.append("percentage_city5_name", city5Percentage);
    formData.append("male_percent", malePercentage);
    formData.append("female_percent", femalePercentage);
    formData.append("Age_13_17_percent", age1Percentage);
    formData.append("Age_18_24_percent", age2Percentage);
    formData.append("Age_25_34_percent", age3Percentage);
    formData.append("Age_35_44_percent", age4Percentage);
    formData.append("Age_45_54_percent", age5Percentage);
    formData.append("Age_55_64_percent", age6percentage);
    formData.append("Age_65_plus_percent", age7Percentage);
    formData.append("profile_visit", profileVisit);
    formData.append("country1_name", country1);
    formData.append("country2_name", country2);
    formData.append("country3_name", country3);
    formData.append("country4_name", country4);
    formData.append("country5_name", country5);
    formData.append("percentage_country1_name", country1Percentage);
    formData.append("percentage_country2_name", country2Percentage);
    formData.append("percentage_country3_name", country3Percentage);
    formData.append("percentage_country4_name", country4Percentage);
    formData.append("percentage_country5_name", country5Percentage);
    formData.append("country_image_upload", countryImg);

    axios
      .post(`http://34.93.135.33:8080/api/add_exe_pid_history`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        setQuater("");
        setStatesFor(null);
        setStartDate(null);
        setEndDate(null);
        setReach(0);
        setImpression(0);
        setEngagement(0);
        setStoryView(0);
        setRowData({});
        setCity1();
        setCity2();
        setCity3();
        setCity4();
        setCity5();
        setCity1Percentage(0);
        setCity2Percentage(0);
        setCity3Percentage(0);
        setCity4Percentage(0);
        setCity5Percentage(0);
        setMalePercentage(0);
        setFemalePercentage(0);
        setAge1Percentage(0);
        setAge2Percentage(0);
        setAge3Percentage(0);
        setAge4Percentage(0);
        setAge5Percentage(0);
        setAge6Percentage(0);
        setAge7Percentage(0);
        setAgeImg("");
        setCityImg("");
        setReachandImpressionImg("");
        setEngagementImg("");
        setStoryViewImg("");
        setStoryViewVideo("");
        setProfileVisit(0);
        setCountry1();
        setCountry2();
        setCountry3();
        setCountry4();
        setCountry5();
        setCountry1Percentage(0);
        setCountry2Percentage(0);
        setCountry3Percentage(0);
        setCountry4Percentage(0);
        setCountry5Percentage(0);
        setCountryImg();

        toastAlert("Form Submitted success");
      });
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
  };

  return (
    <>
      <ThemeProvider theme={theme}>
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
              className="col-lg-2"
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
        <TextField
          label="Search by Page Name"
          onChange={(e) => {
            const temp = alldata.filter((ele) => {
              return ele.page_name
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
            });
            setRows(temp);
          }}
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
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 50,
                  },
                },
              }}
              slots={{ toolbar: GridToolbar, columnMenu: CustomColumnMenu }}
              pageSizeOptions={[5, 25, 50, 100, 500]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(newRowSelectionModel) => {
                setRowSelectionModel(newRowSelectionModel);
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
        <div
          className="modal-dialog"
          style={{ marginLeft: "20%", height: "100vh", marginTop: "-10%" }}
        >
          <div
            className="modal-content"
            style={{ width: "70vw", height: "auto" }}
          >
            <div className="modal-header">
              <h4 className="modal-title">Page Name :- {rowData.page_name}</h4>
              <button
                type="button"
                className="close"
                onClick={handleCloseExeModal}
                data-dismiss="modal"
              >
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="row" style={{ height: "auto" }}>
                <div className="mb-1 col-lg-3 me-3 p-1 ">
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={dropdownStaticData}
                    onChange={(e, value) => {
                      setStatesFor(value),
                        value !== "Quarterly"
                          ? setStateForIsNotQuater(true)
                          : setStateForIsNotQuater(false);
                      value?.length > 0
                        ? setStateForIsValid(true)
                        : setStateForIsValid(false);
                      value == "Daily"
                        ? setStartDate(dayjs())
                        : setStartDate("");
                      value == "Daily" ? setEndDate(dayjs()) : setEndDate("");
                    }}
                    value={statesFor}
                    // sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Stats for *"
                        error={!stateForIsValid}
                        helperText={
                          !stateForIsValid ? "Please select an option" : ""
                        }
                      />
                    )}
                  />
                </div>
                {statesFor !== "Quarterly" &&
                  statesFor !== null &&
                  stateForIsNotQuater && (
                    <div className="mb-1 col-lg-3 me-3 p-1 ">
                      <LocalizationProvider
                        className=" col-lg-3 my-3 mx-3"
                        dateAdapter={AdapterDayjs}
                      >
                        <DatePicker
                          // className="col-lg-4 mt-2"
                          label="Start Date *"
                          format="DD/MM/YY"
                          value={startDate}
                          onChange={(newValue) => {
                            handleStartDateChange(newValue);
                            statesFor == "Daily" ? setEndDate(newValue) : "";
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                  )}

                {statesFor !== null &&
                  statesFor !== "Quarterly" &&
                  stateForIsNotQuater && (
                    <div className="mb-1 col-lg-3 me-3 p-1 ">
                      <LocalizationProvider
                        className=" col-lg-3 my-3 mx-3"
                        dateAdapter={AdapterDayjs}
                      >
                        <DatePicker
                          label="End Date *"
                          format="DD/MM/YY"
                          value={endDate}
                          onChange={(newValue) => {
                            handleEndDateChange(newValue);
                          }}
                        />
                      </LocalizationProvider>
                    </div>
                  )}
                {statesFor == "Quarterly" && !stateForIsNotQuater && (
                  <div className="mb-1 col-lg-8  ">
                    <Autocomplete
                      className=" col-lg-4"
                      disablePortal
                      id="combo-box-demo"
                      options={QuarterStaticData}
                      onChange={(e, value) => {
                        setQuater(value);
                        value?.length > 0
                          ? setQuaterIsValid(true)
                          : setQuaterIsValid(false);
                      }}
                      value={quater}
                      sx={{ width: 300 }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Quater *"
                          error={!quaterIsValid}
                          helperText={
                            !quaterIsValid ? "Please select an option" : ""
                          }
                        />
                      )}
                    />
                  </div>
                )}
              </div>
              <div className="row gap-4">
                <div className="card   col-sm-12 col-lg-3">
                  <div>
                    <div className="col-md-3 col-lg-12 d-block my-2">
                      <TextField
                        label="Reach "
                        type="number"
                        value={reach}
                        onChange={(e) => {
                          e.target.value > 0
                            ? setReachValidation(true)
                            : setReachValidation(false),
                            setReach(e.target.value);
                        }}
                        error={!reachValidation}
                        helperText={
                          !reachValidation ? "Please enter a valid Count" : ""
                        }
                      />
                    </div>
                    <div className="col-md-3 col-lg-12 my-2">
                      <TextField
                        label="Impressions *"
                        type="number"
                        value={impression}
                        // fieldGrid={4}
                        onChange={(e) => {
                          e.target.value > 0
                            ? setImpressionValidation(true)
                            : setImpressionValidation(false),
                            setImpression(e.target.value);
                        }}
                        error={!impressionValidation}
                        helperText={
                          !impressionValidation
                            ? "Please enter a valid Count"
                            : ""
                        }
                      />
                    </div>
                    <div className="col-md-3 py-1 mb-2">
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        size="small"
                        title="Reach & Impression"
                      >
                        Image
                        <VisuallyHiddenInput
                          onChange={(e) => {
                            setReachandImpressionImg(e.target.files[0]);
                          }}
                          type="file"
                          accept="image/png, image/jpeg"
                        />
                      </Button>
                    </div>
                    <div className="col-md-3 col-lg-12 my-2">
                      <TextField
                        label="Engagement *"
                        type="number"
                        value={engagement}
                        // fieldGrid={4}
                        onChange={(e) => {
                          e.target.value > 0
                            ? setEngagementValidation(true)
                            : setEndDateIsValid(false),
                            setEngagement(e.target.value);
                        }}
                        error={!engagementValidation}
                        helperText={
                          !engagementValidation
                            ? "Please enter a valid Count"
                            : ""
                        }
                      />
                    </div>
                    <div className="col-md-3 py-1 mb-2">
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        size="small"
                      >
                        Image
                        <VisuallyHiddenInput
                          onChange={(e) => {
                            setEngagementImg(e.target.files[0]);
                          }}
                          type="file"
                          accept="image/png, image/jpeg"
                        />
                      </Button>
                    </div>
                    <div className="col-md-3 col-lg-12  my-2">
                      <TextField
                        label="Story View *"
                        type="number"
                        value={storyView}
                        // fieldGrid={4}
                        onChange={(e) => {
                          e.target.value > 0
                            ? setStoryViewValidation(true)
                            : setStoryViewValidation(false),
                            setStoryView(e.target.value);
                        }}
                        error={!storyViewValidation}
                        helperText={
                          !storyViewValidation
                            ? "Please enter a valid Count"
                            : ""
                        }
                      />
                    </div>
                    <div className="col-md-3 col-lg-12 py-1 mb-2">
                      <Button
                        className="me-1"
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        size="small"
                      >
                        image
                        <VisuallyHiddenInput
                          onChange={(e) => {
                            setStoryViewImg(e.target.files[0]);
                          }}
                          type="file"
                          accept="image/png, image/jpeg"
                        />
                      </Button>
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        size="small"
                      >
                        video
                        <VisuallyHiddenInput
                          onChange={(e) => {
                            setStoryViewVideo(e.target.files[0]);
                          }}
                          type="file"
                          accept=" video/mp4, video/avi"
                        />
                      </Button>
                    </div>
                    <div className="col-md-3 col-lg-12 my-2">
                      <TextField
                        label="Profile Visit"
                        type="number"
                        value={profileVisit}
                        onChange={(e) => setProfileVisit(e.target.value)}
                      />
                    </div>
                    {/* </div> */}
                  </div>
                </div>
                <div className="card  col-sm-12 col-lg-3">
                  <div>
                    <label className="mt-3 h6">City</label>
                    <Autocomplete
                      id="combo-box-demo"
                      value={city1}
                      options={cityList.map((city) => city)}
                      onChange={(e, value) => {
                        cityCopyValidation(value);
                        setCity1(value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="City 1" />
                      )}
                    />
                    <TextField
                      className="mb-1 "
                      type="number"
                      value={city1Percentage}
                      onChange={(e) => {
                        setCity1Percentage(e.target.value);
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                        inputProps: {
                          min: 0,
                          max: 100,
                        },
                      }}
                    />
                    <Autocomplete
                      id="combo-box-demo"
                      value={city2}
                      options={cityList.map((city) => city)}
                      onChange={(e, value) => {
                        setCity2(value);
                        cityCopyValidation(value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="City 2" />
                      )}
                    />
                    <TextField
                      className="mb-2"
                      value={city2Percentage}
                      onChange={(e) => {
                        setCity2Percentage(e.target.value);
                      }}
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                        inputProps: {
                          min: 0,
                          max: 100,
                        },
                      }}
                    />
                    <Autocomplete
                      id="combo-box-demo"
                      value={city3}
                      options={cityList.map((city) => city)}
                      onChange={(e, value) => {
                        setCity3(value);
                        cityCopyValidation(value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="City 3" />
                      )}
                    />
                    <TextField
                      className="mb-2"
                      type="number"
                      value={city3Percentage}
                      onChange={(e) => {
                        setCity3Percentage(e.target.value);
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                        inputProps: {
                          min: 0,
                          max: 100,
                        },
                      }}
                    />
                    <Autocomplete
                      id="combo-box-demo"
                      value={city4}
                      options={cityList.map((city) => city)}
                      onChange={(e, value) => {
                        setCity4(value);
                        cityCopyValidation(value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="City 4" />
                      )}
                    />
                    <TextField
                      className="mb-2"
                      type="number"
                      value={city4Percentage}
                      onChange={(e) => {
                        setCity4Percentage(e.target.value);
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                        inputProps: {
                          min: 0,
                          max: 100,
                        },
                      }}
                    />
                    <Autocomplete
                      // className="mt-3"
                      id="combo-box-demo"
                      value={city5}
                      options={cityList.map((city) => city)}
                      onChange={(e, value) => {
                        setCity5(value);
                        cityCopyValidation(value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="City 5" />
                      )}
                    />
                    <TextField
                      // className="me-2 mt-3"
                      type="number"
                      value={city5Percentage}
                      onChange={(e) => {
                        setCity5Percentage(e.target.value);
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                        inputProps: {
                          min: 0,
                          max: 100,
                        },
                      }}
                    />
                    <div>
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        size="small"
                        className="mt-4"
                        onChange={(e) => {
                          setCityImg(e.target.files[0]);
                        }}
                      >
                        Image
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/png, image/jpeg"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="card  col-sm-12 col-lg-3">
                  <div>
                    <label className="mt-3 h6">Country</label>
                    <Autocomplete
                      id="combo-box-demo"
                      value={country1}
                      options={countryList.map((country) => country.name)}
                      onChange={(e, value) => {
                        countryCopyValidation(value);
                        setCountry1(value);
                      }}
                      // sx={{ width: 250 }}
                      renderInput={(params) => (
                        <TextField {...params} label="Country 1" />
                      )}
                    />
                    <TextField
                      className="mb-2"
                      type="number"
                      value={country1Percentage}
                      onChange={(e) => {
                        setCountry1Percentage(e.target.value);
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                        inputProps: {
                          min: 0,
                          max: 100,
                        },
                      }}
                    />
                    <Autocomplete
                      disablePortal
                      value={country2}
                      onChange={(e, value) => {
                        countryCopyValidation(value);
                        setCountry2(value);
                      }}
                      id="combo-box-demo"
                      options={countryList.map((country) => country.name)}
                      renderInput={(params) => (
                        <TextField {...params} label="Country 2" />
                      )}
                    />
                    <TextField
                      className="mb-2"
                      value={country2Percentage}
                      onChange={(e) => {
                        setCountry2Percentage(e.target.value);
                      }}
                      type="number"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                        inputProps: {
                          min: 0,
                          max: 100,
                        },
                      }}
                    />
                    <Autocomplete
                      disablePortal
                      value={country3}
                      onChange={(e, value) => {
                        setCountry3(value);
                        countryCopyValidation(value);
                      }}
                      id="combo-box-demo"
                      options={countryList.map((country) => country.name)}
                      renderInput={(params) => (
                        <TextField {...params} label="Country 3" />
                      )}
                    />
                    <TextField
                      className="mb-2"
                      type="number"
                      value={country3Percentage}
                      onChange={(e) => {
                        setCountry3Percentage(e.target.value);
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                        inputProps: {
                          min: 0,
                          max: 100,
                        },
                      }}
                    />
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={countryList.map((country) => country.name)}
                      value={country4}
                      onChange={(e, value) => {
                        setCountry4(value);
                        countryCopyValidation(value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Country 4" />
                      )}
                    />
                    <TextField
                      className="mb-2"
                      type="number"
                      value={country4Percentage}
                      onChange={(e) => {
                        setCountry4Percentage(e.target.value);
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                        inputProps: {
                          min: 0,
                          max: 100,
                        },
                      }}
                    />
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={countryList.map((country) => country.name)}
                      value={country5}
                      onChange={(e, value) => {
                        setCountry5(value);
                        countryCopyValidation(value);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} label="Country 5" />
                      )}
                    />
                    <TextField
                      className="mb-2"
                      type="number"
                      value={country5Percentage}
                      onChange={(e) => {
                        setCountry5Percentage(e.target.value);
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">%</InputAdornment>
                        ),
                        inputProps: {
                          min: 0,
                          max: 100,
                        },
                      }}
                    />
                    <div>
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        size="small"
                        className="mt-3"
                        onChange={(e) => {
                          setCountryImg(e.target.files[0]);
                        }}
                      >
                        Image
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/png, image/jpeg"
                        />
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="card  col-sm-12 col-lg-2">
                  <div>
                    <label className="h6 d-block">Age Group</label>
                    <div className="d-flex flex-col">
                      <TextField
                        label="13-17"
                        type="number"
                        className="mb-2"
                        value={age1Percentage}
                        onChange={(e) =>
                          handlePercentageChange(
                            e.target.value,
                            setAge1Percentage
                          )
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                          inputProps: {
                            min: 0,
                            max: 100,
                          },
                        }}
                      />
                      <TextField
                        label="18-24"
                        type="number"
                        className="mb-2"
                        value={age2Percentage}
                        onChange={(e) =>
                          handlePercentageChange(
                            e.target.value,
                            setAge2Percentage
                          )
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                          inputProps: {
                            min: 0,
                            max: 100,
                          },
                        }}
                      />
                      <TextField
                        label="25-34"
                        type="number"
                        className="mb-2"
                        value={age3Percentage}
                        onChange={(e) =>
                          handlePercentageChange(
                            e.target.value,
                            setAge3Percentage
                          )
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                          inputProps: {
                            min: 0,
                            max: 100,
                          },
                        }}
                      />
                      <TextField
                        label="35-44"
                        type="number"
                        className="mb-2"
                        value={age4Percentage}
                        onChange={(e) =>
                          handlePercentageChange(
                            e.target.value,
                            setAge4Percentage
                          )
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                          inputProps: {
                            min: 0,
                            max: 100,
                          },
                        }}
                      />
                      <TextField
                        label="45-54"
                        type="number"
                        className="mb-2"
                        value={age5Percentage}
                        onChange={(e) =>
                          handlePercentageChange(
                            e.target.value,
                            setAge5Percentage
                          )
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                          inputProps: {
                            min: 0,
                            max: 100,
                          },
                        }}
                      />
                      <TextField
                        label="55-64"
                        type="number"
                        className="mb-2"
                        value={age6percentage}
                        onChange={(e) => {
                          setAge6Percentage(e.target.value);
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                          inputProps: {
                            min: 0,
                            max: 100,
                          },
                        }}
                      />
                      <TextField
                        label="65+"
                        type="number"
                        className="mb-2"
                        value={age7Percentage}
                        onChange={(e) => {
                          setAge7Percentage(e.target.value);
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                          inputProps: {
                            min: 0,
                            max: 100,
                          },
                        }}
                      />
                      <Button
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        size="small"
                        className="mt-4"
                        onChange={(e) => {
                          setAgeImg(e.target.files[0]);
                        }}
                      >
                        Image
                        <VisuallyHiddenInput
                          type="file"
                          accept="image/png, image/jpeg"
                        />
                      </Button>

                      {totalPercentage < 98 && (
                        <span style={{ color: "red" }}>
                          Total percentage must be at least 98%
                        </span>
                      )}
                      {totalPercentage > 100 && (
                        <span style={{ color: "red" }}>
                          Total percentage cannot exceed 100%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-2">
                <div className="card-body">
                  <label className="h6 d-block">Gender</label>
                  <div className="row">
                    <div className="col-sm-12 col-lg-2 mt-2">
                      <TextField
                        label="Male"
                        type="number"
                        value={malePercentage}
                        onChange={(e) => {
                          setMalePercentage(e.target.value);
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                          inputProps: {
                            min: 0,
                            max: 100,
                          },
                        }}
                      />
                    </div>
                    <div className="col-sm-12 col-lg-2 mt-2">
                      <TextField
                        label="Female"
                        type="number"
                        // className="mx-3"
                        value={femalePercentage}
                        onChange={(e) => {
                          setFemalePercentage(e.target.value);
                        }}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">%</InputAdornment>
                          ),
                          inputProps: {
                            min: 0,
                            max: 100,
                          },
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={handleCloseExeModal}
              >
                Cancel
              </button>
              <button
                onClick={saveStats}
                type="button"
                className="btn btn-success"
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
