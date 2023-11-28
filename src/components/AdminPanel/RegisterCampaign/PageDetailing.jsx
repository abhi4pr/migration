import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useEffect } from "react";
import { TextField } from "@mui/material";

const PageDetaling = ({ pages }) => {
    const [allPages,setAllPages]=useState([])
    const [postpage,setPostPage]=useState(0)
    useEffect(()=>{
        if(pages?.length>0){
            const addPost=pages.map(page=>{
                return {...page,postPerPage:0}
            })
            setAllPages([...addPost])
        }
    },[pages])
  const columns = [
    {
      field: "S.NO",
      headerName: "S.NO",
      width: 90,
      renderCell: (params) => {
        const rowIndex = pages.indexOf(params.row);
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
            onKeyDown={(e) => {
                if(e.key=='Backspace'){
                   const x=allPages.map(page=>{
                    if(params.row.p_id==page.p_id){
                        return {...page,postPerPage:0}
                    }else return page
                   })
                   setAllPages(x)

               }
                else{

                    const ppp=allPages.map(page=>{
                        if(params.row.p_id==page.p_id){
                            return {...page,postPerPage:Number(e.target.value)}
                        }else return page
                    })
                    setAllPages(ppp)
                }
               
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
  ];

  const handlePost=(e)=>{

    const ppp=allPages.map(page=>{
        return {...page,postPerPage:Number(e.target.value)}
    })
    setAllPages(ppp)
    setPostPage(Number(e.target.value))
  }

  console.log(allPages);
  return (
    <>
        <div>
        <TextField id="outlined-basic" label="Post/pages" variant="outlined" onChange={handlePost} />
        </div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={allPages || []}
          columns={columns}
          getRowId={(row) => row.p_id}
          pageSizeOptions={[5]}
        />
      </Box>
    </>
  );
};

export default PageDetaling;
