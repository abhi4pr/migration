import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import {
  Paper,
 
  Autocomplete,
 
} from "@mui/material";
let options=[]
const PageDetaling = ({ pageName, realPageData, pages, search, searchedpages, data, setFilteredPages }) => {

  const [allPages, setAllPages] = useState([])
  const [postpage, setPostPage] = useState(0)


  const [remainingPages, setRemainingPages] = useState([])


  useEffect(() => {
    if (search == false) {

      if (pages?.length > 0) {
        const addPost = pages.map(page => {
          return { ...page, postPerPage: 0 }
        })
        setAllPages([...addPost])
        const differenceArray = realPageData.filter((element) => {
          if(!pages.includes(element)){
            options.push(element.page_name)
            return !pages.includes(element)}
          }
          );
        setRemainingPages(differenceArray)
      }
    } else {
      if (searchedpages?.length > 0) {
        console.log("first")
        const addPost = searchedpages.map(page => {
          return { ...page, postPerPage: 0 }
        })
        setAllPages([...addPost])
      }

    }
  }, [pages, search, searchedpages])



const pageReplacement=(e,params,index)=>{
  console.log(e.target.innerText,params,index)
  
  const pageReplacement =realPageData.find((page)=>{
    return page.page_name==e.target.innerText
  })
  console.log(pageReplacement)
  const z=[...allPages]
 z.splice(index,1,pageReplacement)
  console.log(z)
  setAllPages(z)
}
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
      headerName: "pages",
      width: 150,
      editable: true,
      renderCell: (params) => {
        // console.log(params)
        return (
          params?.row?.status == false ?  <Autocomplete
          id="combo-box-demo"
          options={options}
          getOptionLabel={(option) => option}
          sx={{ width: 300 }}
          renderInput={(param) => (
            // console.log(params)
            <TextField {...param} label={params.row.page_name} />
          )}
          onChange={(e)=>pageReplacement(e,params.row,allPages.indexOf(params.row))}
        /> : params.page_name
          
        )
      }
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
        // params.value=params.row.postPerPage
        return (
          <input
            style={{ width: "60%" }}
            type="number"

            value={params.value}
            placeholder={params.row.postPerPage}
            onChange={(e) => {
              const update = allPages.map(page => {
                if (params.row.p_id == page.p_id) {
                  return { ...page, postPerPage: e.target.value }
                }
                return page
              })
              console.log(update)
            }}

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
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      editable: true,
      renderCell: (params) => {
        return (
          <Button onClick={() => removePage(params)}>Remove</Button>

        )
      }
    },
  ];

  const removePage = (params) => {
    // console.log(params)
    const newData = allPages.filter(page => {
      return page.p_id != params.id
    })
    setFilteredPages(newData)

  }
  const handlePost = (e) => {

    const ppp = allPages.map(page => {
      return { ...page, postPerPage: Number(e.target.value) }
    })
    setAllPages(ppp)
    setPostPage(Number(e.target.value))
  }

  const submitPlan = async (e) => {
    if (pageName == 'planCreation') {

      const planName = data.campaignName + "plan"

      const newdata = {
        planName,
        "campaignName": data.campaignName,
        "campaignId": data.campaignId,
        pages: allPages,

      }
      try {

        const result = await axios.post('http://34.93.135.33:8080/api/campaignplan', newdata)

        console.log(result)
      } catch (error) {
        console.log(error)
      }
    }
    if (pageName == 'phaseCreation') {

    }

  }
  console.log(allPages);
  return (
    <>
      <Box sx={{ pt: 2, pb: 2 }}>
        <TextField id="outlined-basic" label="Post/pages" variant="outlined" onChange={handlePost} />
      </Box>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={allPages || []}
          columns={columns}
          getRowId={(row) => row.p_id}
          pageSizeOptions={[5]}
        />
      </Box>
      {!search && <button onClick={submitPlan}>submit</button>}

    </>
  );
};

export default PageDetaling;
