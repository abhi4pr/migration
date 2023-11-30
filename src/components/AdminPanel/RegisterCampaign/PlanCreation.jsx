import CampaignDetailes from "./CampaignDetailes";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import PageDetaling from "./PageDetailing";
import { DataGrid } from "@mui/x-data-grid";

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
} from "@mui/material";

let options = []
const PlanCreation = () => {
  const param = useParams()
  const id = param.id

  const [allPageData, setAllPageData] = useState([])
  const [filterdPages, setFilteredPages] = useState([])
  const [searchedPages, setSearchedPages] = useState([])
  const [selectedCategory, setSelectedCategory] = useState([])
  const [selectedFollower, setSelectedFollower] = useState(null)
  const [searched, setSearched] = useState(false)
  const [campaignName, setCampaignName] = useState(null)
  const [remainingPages, setRemainingPages] = useState([])
  const [modalSearchPage, setModalSearchPage] = useState([])
  const [modalSearchPageStatus, setModalSearchPageStatus] = useState(false)
  const [selectedRows, setSelectedRows] = useState([]);
  // const [options,setOptions] = useState([])

  // const options = [];
  const Follower_Count = [
    "<10k",
    "10k to 100k ",
    "100k to 1M ",
    "1M to 5M ",
    ">5M ",
  ];
  const page_health = ["Active", "nonActive"];



  //to fetch all pages
  const getPageData = async () => {
    const pageData = await axios.get(`https://purchase.creativefuel.io/webservices/RestController.php?view=inventoryDataList`)
    setAllPageData(pageData.data.body)
    setFilteredPages(pageData.data.body)
    // setSearchedPages(pageData.data.body)

  }

  //to call getPageData function
  useEffect(() => {
    getPageData()
  }, [])

  useEffect(() => {
    const remainingData = allPageData.filter(
      (item) => !filterdPages.some((selectedItem) => selectedItem.p_id == item.p_id)
    );
    setRemainingPages(remainingData)
  }, [filterdPages])
  console.log(remainingPages)
  //this function will feed the category data to categories option array
  const categorySet = () => {
    allPageData.forEach(data => {
      if (!options.includes(data.cat_name)) {
        // setOptions([...options, data.cat_name])
        options.push(data.cat_name)
      }
    })
  }
  //whenever a pageData is available call categoryset function
  useEffect(() => {
    if (allPageData.length > 0) {
      categorySet()
    }
  }, [allPageData])

  //useEffect for category selection change events
  useEffect(() => {
    if (selectedCategory.length > 0 && selectedFollower) {
      //if there is a selected category and selected follower
      const page = allPageData.filter(pages => {
        //based on the selected follower a condition will be executed

        if (selectedFollower == "<10k") {
          if (selectedCategory.length > 0) {
            //if there is category selected then this 
            return Number(pages.follower_count) <= 10000 && selectedCategory.includes(pages.cat_name)
          } else {
            //if there is no category selected
            return Number(pages.follower_count) <= 10000
          }
        }
        if (selectedFollower == "10k to 100k ") {
          if (selectedCategory.length > 0) {

            return Number(pages.follower_count) <= 100000 && Number(pages.follower_count) > 10000 && selectedCategory.includes(pages.cat_name)
          } else {
            return Number(pages.follower_count) <= 100000 && Number(pages.follower_count) > 10000
          }

        }
        if (selectedFollower == "100k to 1M ") {
          if (selectedCategory.length > 0) {

            return Number(pages.follower_count) <= 1000000 && Number(pages.follower_count) > 100000 && selectedCategory.includes(pages.cat_name)
          } else {
            return Number(pages.follower_count) <= 1000000 && Number(pages.follower_count) > 100000
          }
        }
        if (selectedFollower == "1M to 5M ") {
          if (selectedCategory.length > 0) {

            return Number(pages.follower_count) <= 5000000 && Number(pages.follower_count) > 1000000 && selectedCategory.includes(pages.cat_name)
          } else {
            return Number(pages.follower_count) <= 5000000 && Number(pages.follower_count) > 1000000
          }
        }
        if (selectedFollower == ">5M ") {
          if (selectedCategory.length > 0) {

            return Number(pages.follower_count) > 5000000 && selectedCategory.includes(pages.cat_name)
          } else {
            return Number(pages.follower_count) > 5000000
          }
        }
        // return selectedCategory.includes(pages.cat_name)
      })
      //to set the filtered page
      setFilteredPages(page)
    } else if (selectedCategory.length > 0 && !selectedFollower) {

      //in case category is present but follower count is not selected
      const page = allPageData.filter(pages => {
        return selectedCategory.includes(pages.cat_name)
      })
      setFilteredPages(page)
      // setSelectedFollower(null)
    } else if(selectedCategory.length==0 && !selectedFollower){
      setFilteredPages(allPageData)
    }else if(selectedCategory.length==0 && selectedFollower){

    }
  }, [selectedCategory])

  // useEffect(()=>{

  //   setSearchedPages(filterdPages)
  // },[filterdPages])

  //useEffect for follower selection change events
  useEffect(() => {
    //
    if (selectedFollower) {
      const page = allPageData.filter(pages => {
        if (selectedFollower == "<10k") {
          if (selectedCategory.length > 0) {

            return Number(pages.follower_count) <= 10000 && selectedCategory.includes(pages.cat_name)
          } else {
            return Number(pages.follower_count) <= 10000
          }
        }
        if (selectedFollower == "10k to 100k ") {
          if (selectedCategory.length > 0) {

            return Number(pages.follower_count) <= 100000 && Number(pages.follower_count) > 10000 && selectedCategory.includes(pages.cat_name)
          } else {
            return Number(pages.follower_count) <= 100000 && Number(pages.follower_count) > 10000
          }

        }
        if (selectedFollower == "100k to 1M ") {
          if (selectedCategory.length > 0) {

            return Number(pages.follower_count) <= 1000000 && Number(pages.follower_count) > 100000 && selectedCategory.includes(pages.cat_name)
          } else {
            return Number(pages.follower_count) <= 1000000 && Number(pages.follower_count) > 100000
          }
        }
        if (selectedFollower == "1M to 5M ") {
          if (selectedCategory.length > 0) {

            return Number(pages.follower_count) <= 5000000 && Number(pages.follower_count) > 1000000 && selectedCategory.includes(pages.cat_name)
          } else {
            return Number(pages.follower_count) <= 5000000 && Number(pages.follower_count) > 1000000
          }
        }
        if (selectedFollower == ">5M ") {
          if (selectedCategory.length > 0) {

            return Number(pages.follower_count) > 5000000 && selectedCategory.includes(pages.cat_name)
          } else {
            return Number(pages.follower_count) > 5000000
          }
        }
        // return selectedCategory.includes(pages.cat_name)
      })
      setFilteredPages(page)
    } else {
      if (selectedCategory.length > 0) {
        const page = allPageData.filter(pages => {
          return selectedCategory.includes(pages.cat_name)
        })
        setFilteredPages(page)
      } else setFilteredPages(allPageData)
    }
  }, [selectedFollower])

  //this functin will be called whenever category is changed
  const categoryChangeHandler = (e, op) => {
    setSelectedCategory(op)
  }

  //this functin will be called whenever follower count is changed
  const followerChangeHandler = (e, op) => {
    setSelectedFollower(op)
  }



  let timer
  const handleSearchChange = (e) => {

    if (!e.target.value.length == 0) {
      clearTimeout(timer)
      timer = setTimeout(() => {

        const searched = filterdPages.filter(page => {
          return page.page_name.toLowerCase().includes(e.target.value.toLowerCase()) || page.cat_name.toLowerCase().includes(e.target.value.toLowerCase())
        })

       
        console.log(searched)
        setSearchedPages(searched)
        setSearched(true)
      }, 500)

    } else {

      console.log("empty")
      setSearched(false)
      // if(e.targe)
    }
  }

  
  

  const getCampaignName = (detail) => {
    setCampaignName(detail.exeCmpName)
  }
  // console.log(allPageData)
  console.log(selectedFollower)

  //all logic related to add new page modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(isModalOpen, "dasdas");
  const handleClick = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSeachChangeModal = (e) => {
    if (!e.target.value.length == 0) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        console.log(e.target.value)
        const searched = remainingPages.filter(page => {
          return page.page_name.toLowerCase().includes(e.target.value.toLowerCase()) || page.cat_name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        console.log(searched)
        setModalSearchPage(searched)
        setModalSearchPageStatus(true)
      
      }, 500)

    } else {


    }
  }

  const handleModalPageAdd=()=>{
    
    const selectedRowData = selectedRows.map((rowId) =>
            remainingPages.find((row) => row.p_id === rowId)
          );
          console.log(selectedRowData)
    setFilteredPages([...filterdPages,...selectedRowData])
    setModalSearchPageStatus(false)
    setIsModalOpen(false);
  }

  const handleSelectionChange=(newSelection)=>{
    setSelectedRows(newSelection);
  }

  console.log(selectedRows)
  // useEffect(()=>{
  //   setModalSearchPage
  // },[selectedRows])


  const columns = [
    {
      field: "S.NO",
      headerName: "S.NO",
      width: 90,
      renderCell: (params) => {
        const rowIndex = remainingPages.indexOf(params.row);
        return <div>{rowIndex + 1}</div>;
      },
    },
    {
      field: "page_name",
      headerName: "pages",
      width: 150,
      editable: true,
    },
    {
      field: "follower_count",
      headerName: "follower",
      width: 150,
      editable: true,
    },
    {
      field: "cat_name",
      headerName: "cat_name",
      width: 150,
      editable: true,
    },
    {
      field: "post_page",
      headerName: "post / page",
      width: 150,

      renderCell: (params) => {
        return (
          <input
            style={{ width: "60%" }}
            type="number"
            value={params.row.postPerPage}

          />
        );
      },
    },
    {
      field: "platform",
      headerName: "vender",
      width: 150,
      editable: true,
    },
  ];


  return (
    <>
      <div>
        <div className="form_heading_title">
          <h2 className="form-heading">Plan Creation</h2>
        </div>
      </div>
      <CampaignDetailes cid={id} getCampaign={getCampaignName} />

      <div style={{ height: 400, width: "100%" }}>
        <Paper sx={{ display: "flex", gap: "10" }}>
          <Autocomplete
            multiple
            id="combo-box-demo"
            options={options}
            // sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Category" />}
            onChange={categoryChangeHandler}

          />
          <Autocomplete
            id="combo-box-demo"
            options={Follower_Count}
            getOptionLabel={(option) => option}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Follower Count" />
            )}
            onChange={followerChangeHandler}
          />
          <Autocomplete
            id="combo-box-demo"
            options={page_health}
            getOptionLabel={(option) => option}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Page health" />
            )}
          />
          <TextField
            label="Search"
            variant="outlined"
            // value={searchText}
            onChange={handleSearchChange}
            style={{ margin: "10px" }}

          />
          <Button variant="contained" onClick={handleClick}>
            Add More Pages
          </Button>
        </Paper>
        <PageDetaling pages={filterdPages} search={searched} searchedpages={searchedPages} campaignId={id} campaignName={campaignName} type={"plan"} />
      </div>
      <>
        <Dialog open={isModalOpen}>
          <DialogTitle>Add more Pages</DialogTitle>
          <DialogContent>
            <Box sx={{ height: 400, width: "100%" }}>
              <TextField
                label="Search"
                variant="outlined"
                // value={searchText}
                onChange={handleSeachChangeModal}
                style={{ margin: "10px" }}

              />
              {
                modalSearchPageStatus ? <DataGrid
                rows={modalSearchPage || []}
                columns={columns}
                getRowId={(row) => row.p_id}
                pageSizeOptions={[5]}
                checkboxSelection
                onRowSelectionModelChange={(row)=>handleSelectionChange(row)}
                rowSelectionModel={selectedRows.map((row) => row)}
              /> : <DataGrid
              rows={remainingPages || []}
              columns={columns}
              getRowId={(row) => row.p_id}
              pageSizeOptions={[5]}
              checkboxSelection
              onRowSelectionModelChange={(row)=>handleSelectionChange(row)}
              rowSelectionModel={selectedRows.map((row) => row)}
            /> 
              }
              
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button color="primary" onClick={handleModalPageAdd}>Add</Button>
          </DialogActions>
        </Dialog>
      </>
    </>
  );
};

export default PlanCreation;