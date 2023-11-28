import { DataGrid } from "@mui/x-data-grid";
import CampaignDetailes from "./CampaignDetailes";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import PageDetaling from "./PageDetailing";


const PlanCreation = () => {
    const param = useParams()
    const id =param.id

    const [allPageData,setAllPageData]=useState([])



  const rows = [
    { id: 1, name: "John Doe", age: 25, Postpage: 6,vender:" mukesh kumar" },
    { id: 2, name: "Jane Smith", age: 30, Postpage: 4,vender:" nilesh kumar" },
  ];


  const getPageData=async()=>{
    const pageData=await axios.get(`https://purchase.creativefuel.io/webservices/RestController.php?view=inventoryDataList`)
    setAllPageData(pageData.data.body)
    
  }
  useEffect(()=>{
    getPageData()
  },[])

//   console.log(allPageData)
  

  return (
    <>
      <div>
        <div className="form_heading_title">
          <h2 className="form-heading">Plan Creation</h2>
        </div>
      </div>
      <CampaignDetailes cid={id} />
      
      <div style={{ height: 400, width: "100%" }}>
        <PageDetaling pages={allPageData}/>
      </div>
    </>
  );
};

export default PlanCreation;
