import { createContext, useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";

export const AnalyticsContext = createContext();

function AnalyticsContextAPIs({ children }) {
  const [allpost, setAllpost] = useState([]);
  const [isLoadinganalytics, setLoadingAnalytics] = useState(false);
  //   const [allcampaign, setAllCampaign] = useState([]);
  //   const [pagedetail, setPagedetail] = useState([]);
  //   const [pagecategory, setPageCategory] = useState([]);
  //   const [brandSubCategory, setBrandSubCategory] = useState([]);
  //   const [brandsobj, setBrandsobj] = useState([]);
  //   const [agency, setAgency] = useState([]);

  //   const [reloadcampaign, setReloadcampaign] = useState(false);
  //   const [reloadbrands, setReloadbrands] = useState(false);
  console.log("analytics call");
  useEffect(() => {
    try {
      axios
        .post("http://34.93.135.33:8080/api/get_all_posts_by_id", {
          posttype_decision: 2,
        })
        .then((res) => {
          setAllpost(res.data);
          setLoadingAnalytics(true);
          // console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <AnalyticsContext.Provider
        value={{
          allpost,
          isLoadinganalytics,
        }}
      >
        {children}
      </AnalyticsContext.Provider>
    </>
  );
}
export default AnalyticsContextAPIs;
