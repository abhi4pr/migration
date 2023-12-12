import {
  Autocomplete,
  Button,
  FormControl,
  Grid,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

let options = [];
let plateformvar = [];

const ExpertiesUpdate = () => {
  const [allPageData, setAllPageData] = useState([]);
  const [getUserData, setGetUserData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedFollower, setSelectedFollower] = useState([]);
  const [pageHealth, setPageHealth] = useState([]);
  const [platform, setPlatfrom] = useState([]);
  const [expertdata, setExpertData] = useState([]);

  const [expertiesusername, setExpertiesUserName] = useState("");

  const Follower_Count = [
    "<10k",
    "10k to 100k ",
    "100k to 1M ",
    "1M to 5M ",
    ">5M ",
  ];
  const page_health = ["Active", "nonActive"];

  const getPageData = async () => {
    const pageData = await axios.get(
      `https://purchase.creativefuel.io/webservices/RestController.php?view=inventoryDataList`
    );
    setAllPageData(pageData.data.body);
  };

  const getAllUsers = async () => {
    const alluser = await axios.get(
      "http://34.93.135.33:8080/api/get_all_users"
    );
    setGetUserData(alluser.data.data);
  };

  useEffect(() => {
    getPageData();
    getAllUsers();
  }, []);

  const categorySet = () => {
    allPageData?.forEach((data) => {
      if (!options.includes(data.cat_name)) {
        options.push(data.cat_name);
      }
    });
  };

  const platformset = () => {
    allPageData?.forEach((data) => {
      if (!plateformvar.includes(data.platform)) {
        plateformvar.push(data.platform);
      }
    });
  };

  useEffect(() => {
    if (allPageData.length > 0) {
      categorySet();
      platformset();
    }
  }, [allPageData]);

  const categoryChangeHandler = (e, op) => {
    setSelectedCategory(op);
  };
  const plateformHandler = (e, op) => {
    setPlatfrom(op);
  };

  const followerChangeHandler = (e, op) => {
    setSelectedFollower(op);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        "http://192.168.29.110:8080/api/expertise",
        {
          user_id: expertiesusername.user_id,
          area_of_expertise: {
            category: selectedCategory,
            follower_count: selectedFollower,
            platform: platform,
            pageHealth: pageHealth,
          },
        }
      );
    } catch {}
  };

  return (
    <>
      <div>
        <div className="form_heading_title">
          <h2 className="form-heading">Experties</h2>
        </div>
      </div>

      <FormControl sx={{ width: "100%" }}>
        <div className="row " sx={{ width: "100vw" }}>
          <div className="col-sm-12 col-lg-12 mb-4">
            <Autocomplete
              fullWidth={true}
              disablePortal
              id="combo-box-demo"
              options={getUserData.map((user) => ({
                label: user.user_name,
                value: user.user_id,
              }))}
              onChange={(e, newvalue) => {
                if (newvalue != null) {
                  setExpertiesUserName((prev) => ({
                    label: newvalue.label,
                    user_id: newvalue.value,
                  }));
                }
              }}
              renderInput={(params) => (
                <TextField {...params} label="User Name" />
              )}
            />
          </div>
          <div className="col-sm-12 col-lg-3">
            <Autocomplete
              multiple
              id="combo-box-demo"
              options={options}
              renderInput={(params) => (
                <TextField {...params} label="Category" />
              )}
              onChange={categoryChangeHandler}
            />
          </div>
          <div className="col-sm-12 col-lg-3">
            <Autocomplete
              multiple
              id="combo-box-demo"
              options={plateformvar}
              renderInput={(params) => (
                <TextField {...params} label="Platform" />
              )}
              onChange={plateformHandler}
            />
          </div>
          <div className="col-sm-12 col-lg-3">
            <Autocomplete
              multiple
              id="combo-box-demo"
              options={Follower_Count}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField {...params} label="Follower Count" />
              )}
              onChange={followerChangeHandler}
            />
          </div>
          <div className="col-sm-12 col-lg-3">
            <Autocomplete
              multiple
              id="combo-box-demo"
              options={page_health}
              value={pageHealth}
              onChange={(e, newvalue) => setPageHealth(newvalue)}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField {...params} label="Page health" />
              )}
            />
          </div>
        </div>
        <div className="col-sm-12 col-lg-3 mt-2">
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </FormControl>
    </>
  );
};

export default ExpertiesUpdate;
