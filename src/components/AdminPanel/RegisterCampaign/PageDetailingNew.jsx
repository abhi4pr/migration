import React from "react";
import { useEffect, useState, useCallback, useRef } from "react";

import { TextareaAutosize as BaseTextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import millify from "millify";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { SiMicrosoftexcel } from "react-icons/si";
import {
  Paper,
  TextField,
  Button,
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import SummrayDetailes from "./SummrayDetailes";
import { useGlobalContext } from "../../../Context/Context";
import Loader from "./Loader/Loader";
import exportToCSV from "../../../utils/ExcelConverter";
import generatePDF from "../../../utils/PdfConverter";

import * as XLSX from 'xlsx';
let options = [];
let pageNames = [];
const Follower_Count = [
  "<10k",
  "10k to 100k ",
  "100k to 1M ",
  "1M to 5M ",
  ">5M ",
];

const page_health = ["Active", "nonActive"];
let x;
let timer;
let text;
let rejectedPages = [];

const PageDetailingNew = ({ pageName, data, setPhaseDataError, phaseInfo }) => {
  const { toastAlert, toastError } = useGlobalContext();
  const navigate = useNavigate();

  const [allPageData, setAllPageData] = useState([]);
  const [payload, setPayload] = useState([]);

  const [filteredPages, setFilteredPages] = useState([]);
  const [planPages, setPlanPages] = useState([]);

  const [isLoadingPlan, setIsLoadingPlan] = useState(false);
  const [isLoadingPhase, setIsLoadingPhase] = useState(false);

  const [selectedRows, setSelectedRows] = useState([]);
  const [radioSelected, setRadioSelected] = useState("all");

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedFollower, setSelectedFollower] = useState(null);
  const [searchedPages, setSearchedPages] = useState(null);

  const [isModalOpenCP, setIsModalOpenCP] = useState(false);
  const [unregisteredPages, setUnregisteredPages] = useState(null);

  const [externalPPP, setExternalPPP] = useState(null);
  const [searchField, setSearchField] = useState(false);

  const [excelUpload, setExcelUpload] = useState(false)

  useEffect(() => {
    getPageData();
  }, []);

  useEffect(() => {
    if (allPageData?.length > 0) {
      categorySet();
    }
  }, [allPageData]);

  useEffect(() => {
    if (!excelUpload) {

      if (selectedRows.length == 0) {
        setPayload([]);
      } else {
        const data = planPages.filter((page) => {
          if (selectedRows.includes(page.p_id)) {
            return page;
          }
        });

        setPayload(data);
      }
    }
  }, [selectedRows]);

  useEffect(() => {
    if (excelUpload) {
      let rows = []
      payload.map(item => {
        rows.push(item.p_id)
        return
      })
      setSelectedRows(rows)
    }
  }, [payload])

  useEffect(() => {
    if (radioSelected != "unregistered") {
      setUnregisteredPages(null);
      filterHandler();
    } else {
      setUnregisteredPages(rejectedPages);
    }
  }, [radioSelected, selectedCategory, selectedFollower]);

  useEffect(() => {
    pageNames = [];
    for (const page of allPageData) {
      // console.log(page)
      let counter = false;
      payload.some((x) => {
        if (x.p_id == page.p_id) {
          counter = true;
        }
      });
      if (!counter) {
        pageNames = [...pageNames, page.page_name];
      }
    }
  }, [unregisteredPages]);

  useEffect(() => { }, [externalPPP]);

  const resetToInitialState = () => {
    setPayload([]);
    setFilteredPages([]);
    setPlanPages([]);
    setSelectedRows([]);
    setRadioSelected("all");
    setSelectedCategory([]);
    setSelectedFollower(null);
    setSearchedPages(null);
    setSearchField(false);
    setUnregisteredPages(null);
  };

  const getPageData = async () => {
    try {
      if (pageName == "planCreation") {
        const pageData = await axios.get(
          `https://purchase.creativefuel.io/webservices/RestController.php?view=inventoryDataList`
        );
        setAllPageData(pageData.data.body);
        setPlanPages(pageData.data.body);
        setFilteredPages(pageData.data.body);
      } else if (pageName == "phaseCreation") {
        const pageD = await axios.get(
          `https://api-dot-react-migration-project.el.r.appspot.com/api/campaignplan/${data.campaignId}`
        );
     
        let newPageData = pageD.data.data
          .filter((page) => {
            return (
              page.replacement_status == "inactive" ||
              page.replacement_status == "replacement"
            );
          })
          .map((page) => {
            return { ...page, postPerPage: 0, storyPerPage: 0 };
          });
          console.log(phaseInfo.assignAll)
        if(phaseInfo.assignAll){
          let row=[]
          newPageData=newPageData.map(page=>{
            row.push(page.p_id)
            return {...page,postPerPage:page.postRemaining,storyPerPage:page.storyRemaining,postRemaining:0,storyRemaining:0}
          })
          x=row
          setSelectedRows(row)
          setPayload(newPageData)
        }
        setAllPageData(newPageData);
        setPlanPages(newPageData);
        setFilteredPages(newPageData);
      }
    } catch (error) { }
  };

  const categorySet = () => {
    allPageData.forEach((data) => {
      if (!options.includes(data.cat_name)) {
        options.push(data.cat_name);
      }
    });
  };

  const handleSelectionChange = (selectedIds) => {
    setSelectedRows(selectedIds);
  };

  const handleRadioChange = (e) => {
    const value = e.target.value;
    setRadioSelected(value);
  };

  const categoryChangeHandler = (e, op) => {
    setSelectedCategory(op);
  };

  const followerChangeHandler = (e, op) => {
    setSelectedFollower(op);
  };

  const filterHandler = () => {
    const radioData = planPages?.filter((page) => {
      if (radioSelected == "all") {
        return page;
      } else if (radioSelected == "selected") {
        // console.log("first")
        if (selectedRows.includes(page.p_id)) {
          return page;
        }
      } else if (radioSelected == "unselected") {
        if (!selectedRows.includes(page.p_id)) {
          return page;
        }
      }
    });

    if (selectedCategory?.length > 0 && selectedFollower) {
      //if there is a selected category and selected follower
      const data = radioData.filter((pages) => {
        //based on the selected follower a condition will be executed

        if (selectedFollower == "<10k") {
          if (selectedCategory?.length > 0) {
            //if there is category selected then this
            return (
              Number(pages.follower_count) <= 10000 &&
              selectedCategory.includes(pages.cat_name)
            );
          } else {
            //if there is no category selected
            return Number(pages.follower_count) <= 10000;
          }
        }
        if (selectedFollower == "10k to 100k ") {
          if (selectedCategory?.length > 0) {
            return (
              Number(pages.follower_count) <= 100000 &&
              Number(pages.follower_count) > 10000 &&
              selectedCategory.includes(pages.cat_name)
            );
          } else {
            return (
              Number(pages.follower_count) <= 100000 &&
              Number(pages.follower_count) > 10000
            );
          }
        }
        if (selectedFollower == "100k to 1M ") {
          if (selectedCategory?.length > 0) {
            return (
              Number(pages.follower_count) <= 1000000 &&
              Number(pages.follower_count) > 100000 &&
              selectedCategory.includes(pages.cat_name)
            );
          } else {
            return (
              Number(pages.follower_count) <= 1000000 &&
              Number(pages.follower_count) > 100000
            );
          }
        }

        if (selectedFollower == "1M to 5M ") {
          if (selectedCategory?.length > 0) {
            return (
              Number(pages.follower_count) <= 5000000 &&
              Number(pages.follower_count) > 1000000 &&
              selectedCategory.includes(pages.cat_name)
            );
          } else {
            return (
              Number(pages.follower_count) <= 5000000 &&
              Number(pages.follower_count) > 1000000
            );
          }
        }
        if (selectedFollower == ">5M ") {
          if (selectedCategory?.length > 0) {
            return (
              Number(pages.follower_count) > 5000000 &&
              selectedCategory.includes(pages.cat_name)
            );
          } else {
            return Number(pages.follower_count) > 5000000;
          }
        }
        // return selectedCategory.includes(pages.cat_name)
      });
      //to set the filtered page
      x = selectedRows;
      setFilteredPages(data);
    } else if (selectedCategory?.length > 0 && !selectedFollower) {
      //in case category is present but follower count is not selected
      const data = radioData.filter((pages) => {
        return selectedCategory.includes(pages.cat_name);
      });
      console.log(data);
      x = selectedRows;
      setFilteredPages(data);
      // setSelectedFollower(null)
    } else if (selectedCategory?.length == 0 && !selectedFollower) {
      console.log(radioData);
      x = selectedRows;
      setFilteredPages(radioData);
    } else if (selectedCategory?.length == 0 && selectedFollower) {
      const data = radioData.filter((pages) => {
        if (selectedFollower == "<10k") {
          return Number(pages.follower_count) <= 10000;
        } else if (selectedFollower == "10k to 100k ") {
          return (
            Number(pages.follower_count) <= 100000 &&
            Number(pages.follower_count) > 10000
          );
        } else if (selectedFollower == "100k to 1M ") {
          return (
            Number(pages.follower_count) <= 1000000 &&
            Number(pages.follower_count) > 100000
          );
        } else if (selectedFollower == "1M to 5M ") {
          return (
            Number(pages.follower_count) <= 5000000 &&
            Number(pages.follower_count) > 1000000
          );
        } else if (selectedFollower == ">5M ") {
          return Number(pages.follower_count) > 5000000;
        }
      });
      x = selectedRows;
      setFilteredPages(data);
    }

    // setFilteredPages(data)
  };
  const handleSearchChange = (e) => {
    if (!e.target.value.length == 0) {
      setSearchField(true);
      clearTimeout(timer);
      timer = setTimeout(() => {
        const searched = filteredPages.filter((page) => {
          return (
            page.page_name
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            page.cat_name.toLowerCase().includes(e.target.value.toLowerCase())
          );
        });

        x = selectedRows;
        setSearchedPages(searched);
      }, 500);
    } else {
      setSearchField(false);
      setSearchedPages(null);
      clearTimeout(timer);
    }
  };

  //this useEffect is to insure that the selectedRows data does not lost during  reRendering
  useEffect(() => {
    setSelectedRows(x);
  }, [filteredPages, searchedPages, unregisteredPages]);

  //copy paste logic starts here

  const handleCP = () => {
    setIsModalOpenCP(true);
  };

  const handleCloseCP = () => {
    setIsModalOpenCP(false);
  };

  const handleInputChange = (e) => {
    text = e.target.value;
  };
  const handleModalPageCP = () => {
    const pageInfo = text.split(/\s+/);
    // let rejectedPages=[]
    const newRows = [];
    for (const text of pageInfo) {
      let counter = false;
      allPageData.some((page) => {
        if (page.page_name == text) {
          counter = true;
          if (!selectedRows.includes(page.p_id)) {
            newRows.push(page.p_id);
          }
        }
      });
      if (!counter) {
        let pid = allPageData.length + Math.floor(Math.random() * 1000) + 1;
        rejectedPages = [...rejectedPages, { page_name: text, p_id: pid }];
      }
      console.log(newRows);
      x = [...selectedRows, ...newRows];
      setSelectedRows([...selectedRows, ...newRows]);
    }

    setRadioSelected("all");
    setIsModalOpenCP(false);
  };

  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };

  const grey = {
    50: "#F3F6F9",
    100: "#E5EAF2",
    200: "#DAE2ED",
    300: "#C7D0DD",
    400: "#B0B8C4",
    500: "#9DA8B7",
    600: "#6B7A90",
    700: "#434D5B",
    800: "#303740",
    900: "#1C2025",
  };

  const Textarea = styled(BaseTextareaAutosize)(
    ({ theme }) => `
        width: 320px;
        font-family: 'IBM Plex Sans', sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 8px 12px;
        border-radius: 8px;
        color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
        background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
        border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]
      };
        box-shadow: 0px 2px 2px ${theme.palette.mode === "dark" ? grey[900] : grey[50]
      };
    
        &:hover {
          border-color: ${blue[400]};
        }
    
        &:focus {
          border-color: ${blue[400]};
          box-shadow: 0 0 0 3px ${theme.palette.mode === "dark" ? blue[600] : blue[200]
      };
        }
    
        // firefox
        &:focus-visible {
          outline: 0;
        }
      `
  );

  const pageReplacement = (e, params) => {
    const toDelete = rejectedPages.filter(
      (page) => page.p_id != params.row.p_id
    );
    rejectedPages = toDelete;
    x = selectedRows;
    setRadioSelected("selected");
    setUnregisteredPages(rejectedPages);

    const pageReplacement = allPageData.find((page) => {
      return page.page_name == e.target.innerText;
    });

    setSelectedRows([...selectedRows, pageReplacement.p_id]);
  };
  //copy paste logic ends here
  // console.log(rejectedPages)
  const handlePost = (e, field) => {
    let updatedValue = e.target.value;

    const postperpage = payload.map((page) => {
      if (field == "post") {
        return { ...page, postPerPage: updatedValue };
      } else return { ...page, storyPerPage: updatedValue };
    });

    const newFilteredPages = planPages.map((page) => {
      if (selectedRows.includes(page.p_id)) {
        if (field == "post") {
          return { ...page, postPerPage: updatedValue };
        } else return { ...page, storyPerPage: updatedValue };
      } else return page;
    });

    x = selectedRows;
    setPayload(postperpage);
    setPlanPages(newFilteredPages);

    if (selectedCategory.length == 0 && selectedFollower == null) {
      console.log("first");

      if (radioSelected == "unselected") {
      } else if (radioSelected == "selected") {
        const ne = newFilteredPages.filter((page) => {
          if (selectedRows.includes(page.p_id)) {
            return page;
          }
        });
        setFilteredPages(ne);
      } else setFilteredPages(newFilteredPages);
    } else {
      console.log("second");
      if (radioSelected == "unselected") {
      } else if (radioSelected == "selected") {
        const ne = filteredPages.filter((page) => {
          if (selectedRows.includes(page.p_id)) {
            return page;
          }
        });
        setFilteredPages(ne);
      } else {
        const x = newFilteredPages.filter((page) => {
          return filteredPages.some((y) => y.p_id == page.p_id);
        });

        setFilteredPages(x);
      }
    }
  };

  const handlePostPerPageChange = (e, params, field) => {
    let updatedValue = e.target.value;

    if (field == "post") {
      if (e.target.value > Number(params.row.postRemaining)) {
        updatedValue = params.row.postRemaining;
      }
    } else {
      if (e.target.value > Number(params.row.storyRemaining)) {
        updatedValue = params.row.storyRemaining;
      }
    }

    // Check if the input value is being set or cleared
    if (updatedValue != params.value || updatedValue == "") {
      let updatedPages = planPages.map((page) => {
        if (selectedRows.includes(page.p_id) && params.row.p_id == page.p_id) {
          if (field == "post") {
            return { ...page, postPerPage: updatedValue, value: null };
          } else return { ...page, storyPerPage: updatedValue, value: null };
        } else return page;
      });

      const postperpage = payload.map((page) =>
        page.p_id === params.row.p_id
          ? field == "post"
            ? { ...page, postPerPage: updatedValue, value: null }
            : { ...page, storyPerPage: updatedValue, value: null }
          : page
      );

      if (radioSelected == "selected") {
        const filter = updatedPages.filter((page) => {
          if (selectedRows.includes(page.p_id)) {
            return page;
          }
        });
        x = selectedRows;

        setFilteredPages(filter);
      } else {
        x = selectedRows;

        if (radioSelected != "unselected") {
          setFilteredPages(updatedPages);
        }
      }

      setPayload(postperpage);
      setPlanPages(updatedPages);

      if (searchField) {
        const y = searchedPages.map((page) =>
          page.p_id === params.row.p_id
            ? field == "post"
              ? { ...page, postPerPage: updatedValue, value: null }
              : { ...page, storyPerPage: updatedValue, value: null }
            : page
        );

        setSearchedPages(y);
      }
    }
  };

  const submitPlan = async (e) => {
    if (pageName == "planCreation") {
      const planName = data.campaignName + "plan";

      const newdata = {
        planName,
        campaignName: data.campaignName,
        campaignId: data.campaignId,
        pages: payload,
      };
      try {
        setIsLoadingPlan(true);
        const result = await axios.post(
          "https://api-dot-react-migration-project.el.r.appspot.com/api/campaignplan",
          newdata
        );
        // console.log(result);
        setIsLoadingPlan(false);
        toastAlert("Plan Created SuccessFully");
        setTimeout(() => {
          navigate(`/admin/phase/${data.campaignId}`);
        }, 2000);
      } catch (error) {
        toastError("Plan not Created");
        setIsLoadingPlan(false);
      }
    }
    if (pageName == "phaseCreation") {
      if (phaseInfo.phaseDataError === "") {
        setPhaseDataError("Phase ID is Required");
      }
      const planName = data.campaignName + "plan";
      e.preventDefault();
      const finalPages = payload.map((page) => {
        return {
          ...page,
          postRemaining: page.postRemaining - page.postPerPage,
          storyRemaining: page.storyRemaining - page.storyPerPage,
        };
      });
      const newdata = {
        planName,
        campaignName: data.campaignName,
        campaignId: data.campaignId,
        pages: finalPages,
        phaseName: phaseInfo.phaseName,
        desciption: phaseInfo.description,
        commitment: phaseInfo.commitment,
      };
      try {
        setIsLoadingPhase(true);
        const result = await axios.post(
          "https://api-dot-react-migration-project.el.r.appspot.com/api/campaignphase",
          newdata
        );
        // console.log(result);
        phaseInfo.setExpanded(false);
        phaseInfo.setShowPageDetails(false);
        phaseInfo.getPhaseData();
        resetToInitialState();
        toastAlert("phase Created SuccessFully");

        setIsLoadingPhase(false);
      } catch (error) {
        toastError("phase not Created");
        setIsLoadingPhase(false);
      }
    }
  };
  const columnForPages = [
    {
      field: "S.NO",
      headerName: "S.NO",
      width: 90,
      renderCell: (params) => {
        const rowIndex = planPages.indexOf(params.row);
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      field: "page_name",
      headerName: "Pages",
      width: 150,
      editable: true,
      renderCell: (params, index) => {
        // console.log(params)
        return radioSelected == "unregistered" ? (
          <Autocomplete
            id="combo-box-demo"
            options={pageNames}
            getOptionLabel={(option) => option}
            sx={{ width: 300 }}
            renderInput={(param) => {
              return <TextField {...param} label={params.row.page_name} />;
            }}
            onChange={(e) => pageReplacement(e, params)}
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
      valueFormatter: (params) => millify(params.value),
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
        return (
          <input
            style={{ width: "60%" }}
            type="number"
            value={
              params.row.postPerPage !== null
                ? params.row.postPerPage
                : params.value || ""
            }
            placeholder={params.row.postPerPage || ""}
            onChange={(e) => handlePostPerPageChange(e, params, "post")}
          />
        );
      },
    },
    pageName != "planCreation" && {
      field: "remainingPages",
      headerName: "remaining post",
      width: 150,
      renderCell: (params) => {
        return (
          <input
            style={{ width: "60%" }}
            type="number"
            disabled
            placeholder={params.row.postRemaining}
          />
        );
      },
    },
    {
      field: "story_page",
      headerName: "story / Page",
      width: 150,

      renderCell: (params) => {
        return (
          <input
            style={{ width: "60%" }}
            type="number"
            value={
              params.row.storyPerPage !== null
                ? params.row.storyPerPage
                : params.value || ""
            }
            placeholder={params.row.storyPerPage || ""}
            onChange={(e) => handlePostPerPageChange(e, params, "story")}
          />
        );
      },
    },
    pageName != "planCreation" && {
      field: "remainingStory",
      headerName: "remaining story",
      width: 150,
      renderCell: (params) => {
        return (
          <input
            style={{ width: "60%" }}
            type="number"
            disabled
            placeholder={params.row.storyRemaining}
          />
        );
      },
    },
  ];

  console.log(selectedRows)
  const [excelData, setExcelData] = useState([]);
  //   const handleFile=(file)=>{

  //     const reader = new FileReader();
  //     setExcelUpload(true)
  //     reader.onload = (e) => {
  //       const data = new Uint8Array(e.target.result);
  //       const workbook = XLSX.read(data, { type: 'array' });
  //       const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
  //       const sheet = workbook.Sheets[sheetName];
  //       const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  //       let forLoad=[]
  //       let forFilter=[]
  //       let rows=[]
  //       const newData=allPageData?.forEach((item)=>{
  //         let flag
  //         if(jsonData.some(page=>{
  //           flag=page
  //           return page[1]==item.page_name
  //         })){
  //             rows.push(item.p_id)
  //           forLoad.push({...item,postPerPage:flag[5],storyPerPage:flag[6]}) 
  //           forFilter.push({...item,postPerPage:flag[5],storyPerPage:flag[6]}) 
  //         }else {
  //           forFilter.push(item)
  //         }
  //       })

  //       setPayload(forLoad);
  //       x=rows
  //       setFilteredPages(forFilter)
  //       setPlanPages(forFilter)
  //       // setSelectedRows(rows)
  //   }
  //   reader.readAsArrayBuffer(file);
  // }
  const handleFile = (file) => {

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetNames = workbook.SheetNames;

      // Combine data from all sheets except the first one
      const combinedData = combineSheets(workbook, sheetNames.slice(1))
        .filter((arr) => arr.length > 0)
        .map((arr) => JSON.stringify(arr))
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((str) => JSON.parse(str));

      setExcelData(combinedData);
      let forLoad = []
      let forFilter = []
      let rows = []
      const newData = allPageData?.forEach((item) => {
        let flag
        if (combinedData.some(page => {
          flag = page
          return page[1].charAt(0).toLowerCase() + page[1].slice(1) == item.page_name
        })) {
          rows.push(item.p_id)
          forLoad.push({ ...item, postPerPage: flag[4] || 0, storyPerPage: flag[6] ||0 })
          forFilter.push({ ...item, postPerPage: flag[4] || 0, storyPerPage: flag[6] || 0 })
        } else {
          forFilter.push(item)
        }
      })

      setPayload(forLoad);
      x = rows
      setFilteredPages(forFilter)
      setPlanPages(forFilter)
    };

    reader.readAsArrayBuffer(file);
  }

  const combineSheets = (workbook, sheetNames) => {
    const combinedData = [];
    sheetNames.forEach((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      combinedData.push(...jsonData);
    });
    return combinedData;
  };
  console.log(payload)
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      handleFile(file);
    }
  };
  console.log(excelData)
  if (isLoadingPhase) {
    return <Loader message="Phase creation in progress..." />;
  }
  if (isLoadingPlan) {
    return <Loader message="Plan creation in progress..." />;
  }

  return (
    <>
      <Paper sx={{ marginTop: "2rem", padding: "1rem" }}>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label"></FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={radioSelected}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="all" control={<Radio />} label="all" />
            <FormControlLabel
              value="selected"
              control={<Radio />}
              label="selected"
            />
            <FormControlLabel
              value="unselected"
              control={<Radio />}
              label="unselected"
            />
            <FormControlLabel
              value="unregistered"
              control={<Radio />}
              label="unregistered"
            />
          </RadioGroup>
        </FormControl>
      </Paper>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "1rem",
          padding: "1rem",
        }}
      >
        <Autocomplete
          multiple
          id="combo-box-demo"
          options={options}
          sx={{ width: 200 }}
          renderInput={(params) => <TextField {...params} label="Category" />}
          onChange={categoryChangeHandler}
        />
        <Autocomplete
          id="combo-box-demo"
          options={Follower_Count}
          getOptionLabel={(option) => option}
          sx={{ width: 200 }}
          renderInput={(params) => (
            <TextField {...params} label="Follower Count" />
          )}
          onChange={followerChangeHandler}
        />
        <Autocomplete
          id="combo-box-demo"
          options={page_health}
          getOptionLabel={(option) => option}
          sx={{ width: 200 }}
          renderInput={(params) => (
            <TextField {...params} label="Page health" />
          )}
        />
        <TextField
          label="Search"
          variant="outlined"
          onChange={handleSearchChange}
        />
        <Box>
          <Button variant="contained" onClick={handleCP} sx={{ m: 1 }}>
            Copy / paste
          </Button>


          <input type="file" id="fileInput" onChange={handleFileInputChange} />

        </Box>
      </Paper>
      <Box sx={{ p: 2 }}>
        <TextField
          id="outlined-basic"
          InputLabelProps={{ shrink: true }}
          label="Post/pages"
          variant="outlined"
          onChange={(e) => handlePost(e, "post")}
        />
        <TextField
          sx={{ ml: 2 }}
          id="outlined-basic"
          InputLabelProps={{ shrink: true }}
          label="story/pages"
          variant="outlined"
          onChange={(e) => handlePost(e, "story")}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            onClick={() => exportToCSV(payload)}
            variant="text"
            color="success"
            sx={{ fontSize: "30px" }}
            title="Download Excel"
          >
            <SiMicrosoftexcel />
          </Button>
          <Button
            onClick={() => generatePDF(payload)}
            variant="text"
            color="error"
            title="Download Pdf"
            sx={{ mr: 3 }}
          >
            <PictureAsPdfIcon sx={{ fontSize: "35px" }} />
          </Button>
        </Box>
      </Box>
      <Paper
        sx={{ display: "flex", justifyContent: "space-between", gap: 1.5 }}
      >
        <Box sx={{ height: 700, width: "63%" }}>
          <DataGrid
            rows={unregisteredPages || searchedPages || filteredPages || []}
            columns={columnForPages}
            getRowId={(row) => row.p_id}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(row) => handleSelectionChange(row)}
            rowSelectionModel={selectedRows?.map((row) => row)}
            getRowClassName={(params) => {
              return params.row.status == false ? "unavailable" : "available";
            }}
            sx={{
              ".unavailable": {
                bgcolor: " #FF4433",
                "&:hover": {
                  bgcolor: "#E30B5C",
                },
              },
            }}
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              sx={{ mt: 2, mb: 4 }}
              onClick={submitPlan}
            >
              submit
            </Button>{" "}
          </div>
        </Box>
        <SummrayDetailes payload={payload} />
      </Paper>
      {
        //copy paste modal contents
      }

      <Dialog open={isModalOpenCP}>
        <DialogTitle>Add Pages</DialogTitle>
        <DialogContent>
          <Box sx={{ height: "100%" }}>
            <Textarea
              onChange={handleInputChange}
              style={{ color: "green", fontSize: "20px" }}
              aria-label="minimum height"
              minRows={6}
              placeholder="copy paste here..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCP} color="primary">
            Cancel
          </Button>
          <Button color="primary" onClick={handleModalPageCP}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PageDetailingNew;
