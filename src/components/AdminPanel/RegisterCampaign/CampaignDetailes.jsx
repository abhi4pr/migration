import { Paper, TextField, Grid } from "@mui/material";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";


const CampaignDetailes = () => {
    const params =useParams()
    // console.log(params,"params");
    const id = params.id
    // console.log(id,"id");
    // const [data, setData] = useState([])
    const getData = () => {
        axios.get(`http://34.93.135.33:8080/api/register_campaign/${id}`).then((res) => {
            console.log(res);
            // setData(res.data.data)
        }).catch((err)=>{
  console.log(err);
        })
        
    }
    useEffect(() => {

        getData()
    }, [])
    // console.log(data,"set data new ");

    return (
        <>
            {/* Non editable campaigning detailes */}
            <Paper sx={{ p: 2, m: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            disabled
                            fullWidth
                            label="Brand Name"
                            defaultValue=" ABC"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            disabled
                            fullWidth
                            label="Campaign Name"
                            defaultValue=" naughty World"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            disabled
                            fullWidth
                            label="Campaign Detailing"
                            defaultValue=" naughty World"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <TextField
                            disabled
                            fullWidth
                            label="Commitment"
                            defaultValue=" Tiger 3"
                            sx={{ mb: 2 }}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default CampaignDetailes;
