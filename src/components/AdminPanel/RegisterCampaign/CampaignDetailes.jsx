import { Paper, TextField, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

let commInfo = [];
// eslint-disable-next-line react/prop-types
const CampaignDetailes = ({ cid,getCampaign }) => {
  const [campaignData, setCampaignData] = useState({});
  const [brandData, setBrandData] = useState([]);
  const [cmpName, setCmpName] = useState({});
  const [commitData, setCommitData] = useState([]);
  const getData = async () => {
    await axios
      .get(`http://34.93.135.33:8080/api/register_campaign/${cid}`)
      .then((res) => {
        setCampaignData(res.data.data);
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(campaignData);
  console.log(commitData)
  const getBrandInfo = async () => {
    const brand = await axios.get(`http://34.93.135.33:8080/api/get_brands`);
    const myBrand = brand.data.data.find(
      (brand) => brand.brand_id == campaignData.brand_id
    );
    setBrandData(myBrand);
  };

  const getCampaignName = async () => {
    const camp = await axios.get(`http://34.93.135.33:8080/api/exe_campaign`);
    const mycamp = camp.data.data.find(
      (camp) => camp.exeCmpId == campaignData.exeCmpId
    );
    setCmpName(mycamp);
    getCampaign(mycamp)
  };
  useEffect(() => {
    getData();
  }, []);

  const getCommitments = async () => {
    const comm = await axios.get(
      "http://34.93.135.33:8080/api/get_all_commitments"
    );
    const myComm = comm.data.data.filter((comm) =>
      commInfo.includes(comm.cmtId)
    );
    setCommitData(myComm);
  };
  
  useEffect(() => {
    if (campaignData.brand_id) {
      campaignData.commitment.forEach((element) => {
        commInfo.push(element.selectValue);
      });
      getBrandInfo();
      getCampaignName();
      getCommitments();
    }
  }, [campaignData]);


  return (
    <>
      {/* Non editable campaigning detailes */}
      <Paper sx={{p:1}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <label> Brand Name</label>
            <TextField
            // label="dfsd"
              disabled
              fullWidth
              value={brandData.brand_name}
              sx={{ m: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <label> Campaign Name</label>

            <TextField
              disabled
              fullWidth
              value={cmpName.exeCmpName}
              sx={{ m: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <label> Campaign Details</label>

            <TextField
              disabled
              fullWidth
              value={campaignData.detailing}
              sx={{ m: 2 }}
            />
          </Grid>
          {commitData.length > 0 &&
            commitData.map((comm,index) => (
              <>
                <Grid item xs={12} sm={6} sx={{ mb: 2 , }}>
                  <TextField
                    disabled
                    fullWidth
                    label="Commitment"
                    value={comm.cmtName}
                  />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
                  <TextField
                    disabled
                    fullWidth
                    label="value"
                    value={campaignData?.commitment[index].textValue}
                  />
                </Grid>
              </>
            ))}
        </Grid>
      </Paper>
    </>
  );
};

export default CampaignDetailes;
