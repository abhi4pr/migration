import { Paper, TextField, Grid } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

let commInfo=[]
const CampaignDetailes = ({ cid }) => {
  const [campaignData, setCampaignData] = useState({});
  const [brandData, setBrandData] = useState([]);
  const [cmpName,setCmpName]=useState({})
  const [commitData,setCommitData]=useState([])
  const getData = () => {
    axios
      .get(`http://34.93.135.33:8080/api/register_campaign/${cid}`)
      .then((res) => {
        // console.log(res);
       
        setCampaignData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getBrandInfo=async ()=>{
    // const brandId=campaignData?.brand_id
    const brand=await axios.get(`http://34.93.135.33:8080/api/get_brands`)
    const myBrand=brand.data.data.find((brand)=>brand.brand_id==campaignData.brand_id)

    // console.log(myBrand)
    setBrandData(myBrand)
  }

  const getCampaignName=async ()=>{
    // const brandId=campaignData?.brand_id
    const camp=await axios.get(`http://34.93.135.33:8080/api/exe_campaign`)
    const mycamp=camp.data.data.find((camp)=>camp.exeCmpId ==campaignData.exeCmpId  )

    // console.log(mycamp)
    setCmpName(mycamp)
  }
  useEffect(() => {
    getData();
  }, []);

  const getCommitments=async()=>{
    const comm=await axios.get('http://34.93.135.33:8080/api/get_all_commitments')
    const myComm=comm.data.data.filter((comm)=>commInfo.includes(comm.cmtId))
    // console.log(myComm)
    setCommitData(myComm)

  }
  

  useEffect(() => {
    if(campaignData.brand_id){
        // console.log(campaignData.brand_id)
        campaignData.commitment.forEach(element => {
            commInfo.push(element.selectValue)
        })
        getBrandInfo()
        getCampaignName()
        getCommitments()
    }
  }, [campaignData]);

//   console.log(campaignData)
//   console.log(cmpName)
//   console.log(commInfo)


  return (
    <>
      {/* Non editable campaigning detailes */}
      <Paper sx={{ p: 2, m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              disabled
              fullWidth
            //   label="Brand Name"
            //   defaultValue=" ABC"
            value={brandData.brand_name}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              value={cmpName.exeCmpName}
              disabled
              fullWidth
            //   label="Campaign Name"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              disabled
              fullWidth
            //   label="Campaign Detailing"
            value={campaignData.detailing}
            //   defaultValue=" naughty World"
            />
          </Grid>
          {
            commitData.length>0 &&
            
                commitData.map(comm=>{
                    return  <div>
                        <Grid item xs={12} sm={6} >
                    <TextField
                      disabled
                      fullWidth
                      label="Commitment"
                    //   defaultValue=" Tiger 3"
                    value={comm.cmtName}
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                        <Grid item xs={12} sm={6} >
                    <TextField
                      disabled
                      fullWidth
                      label="value"
                      value={comm.value}

                    //   defaultValue=" Tiger 3"
                      sx={{ mb: 2 }}
                    />
                  </Grid>
                    </div>
                })
            
          }
         
        </Grid>
      </Paper>
    </>
  );
};

export default CampaignDetailes;
