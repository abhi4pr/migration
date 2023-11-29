import { DataGrid } from "@mui/x-data-grid";
import CampaignDetailes from "./CampaignDetailes";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import PageDetaling from "./PageDetailing";

import {
  Paper,
  TextField,
  Grid,
  Typography,
  Autocomplete,
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
  const [searched,setSearched]=useState(false)
  const [campaignName,setCampaignName] = useState(null)
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
    } else setSelectedFollower(null)
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
  const handleSearchChange=(e,op) => {
    
    if(!e.target.value.length ==0) {
      clearTimeout(timer)
      timer=setTimeout(()=>{

        const searched = filterdPages.filter(page=>{
          
          return page.page_name==e.target.value
        })
        console.log(searched)
        setSearchedPages(searched)
        setSearched(true)
      },500)
    
    }else{
      
      console.log("empty")
      setSearched(false)
    // if(e.targe)
  }
  }

  const getCampaignName=(detail)=>{
    setCampaignName(detail.exeCmpName)
  }
  // console.log(allPageData)
  console.log(selectedFollower)


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
        </Paper>
        <PageDetaling pages={filterdPages} search={searched} searchedpages={searchedPages} campaignId={id} campaignName={campaignName} type={"plan"}  />
      </div>
    </>
  );
};

export default PlanCreation;
