import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import { TextField } from "@mui/material";
import axios from "axios";

const PageDetaling = ({ pages,search,searchedpages,campaignName,type,campaignId }) => {
  console.log(searchedpages,search,campaignName)
    const [allPages,setAllPages]=useState([])
    const [postpage,setPostPage]=useState(0)
    useEffect(()=>{
      if(search==false){

        if(pages?.length>0){
            const addPost=pages.map(page=>{
                return {...page,postPerPage:0}
            })
            setAllPages([...addPost])
        }
      }else{
        if(searchedpages?.length>0){
          console.log("first")
            const addPost=searchedpages.map(page=>{
                return {...page,postPerPage:0}
            })
            setAllPages([...addPost])
        }
        
      }
    },[pages,search,searchedpages])
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
            onChange={(e)=>{
            const update=  allPages.map(page=>{
                if(params.row.p_id==page.p_id){
                  return {...page,postPerPage:e.target.value}
                }
                return page
              })
              console.log(update)
            }}
            // onKeyDown={(e) => {
            //     if(e.key=='Backspace'){
            //        const x=allPages.map(page=>{
            //         if(params.row.p_id==page.p_id){
            //             return {...page,postPerPage:0}
            //         }else return page
            //        })
            //        setAllPages(x)

            //    }
            //     else{

            //         const ppp=allPages.map(page=>{
            //             if(params.row.p_id==page.p_id){
            //                 return {...page,postPerPage:Number(e.target.value)}
            //             }else return page
            //         })
            //         setAllPages(ppp)
            //     }
               
            // }}
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

  const handlePost=(e)=>{

    const ppp=allPages.map(page=>{
        return {...page,postPerPage:Number(e.target.value)}
    })
    setAllPages(ppp)
    setPostPage(Number(e.target.value))
  }

  const submitPlan=async (e)=>{
    const planName=campaignName+"plan"
    const data={
      planName,
      campaignName,
      campaignId,
      pages:allPages,

    }
    try {
      
      const result=await axios.post('http://localhost:8080/api/campaignplan',data)
      console.log(result)
    } catch (error) {
      console.log(error)
    }

  }
  console.log(allPages);
  return (
    <>
        <Box sx={{pt:2,pb:2}}>
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
      {!search && <button onClick={submitPlan}>submit</button> }
      
    </>
  );
};

export default PageDetaling;
