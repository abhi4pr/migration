import { useEffect, useState } from "react";
import axios from "axios";
import FormContainer from "../AdminPanel/FormContainer";
import UserNav from "../Pantry/UserPanel/UserNav";
import jwtDecode from "jwt-decode";
import { useGlobalContext } from "../../Context/Context";

const SimDashboard = () => {
  const { toastAlert } = useGlobalContext();

  const [simData, setSimData] = useState([]);
  const [availableObjects, setAvailableCount] = useState([])
  const [allocatedObjects, setAllocatedCount] = useState([])
  const [departmentData, setDepartmentData] = useState([])

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken.id;

  function getData() {
    axios.get("http://34.93.135.33:8080/api/get_all_sims").then((res) => {
      setSimData(res.data.data);
      
      const availableObjects = res.data.data.filter((item) => item.status === 'Available');
      setAvailableCount(availableObjects);
  
      const allocatedObjects = res.data.data.filter((item) => item.status === 'Allocated');
      setAllocatedCount(allocatedObjects)
    });

    axios.get('http://34.93.135.33:8080/api/get_all_departments').then((res)=>{
      setDepartmentData(res.data)
    });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <UserNav />

      <div className="section section_padding sec_bg h100vh">
        <div className="container">
          <div className="action_heading">
            <div className="action_title">
              <FormContainer
                mainTitle="Sim Dashboard"
                link="/sim-dashboard"
                // buttonAccess={buttonAccess}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 col-sm-12 d_infocard_col">
              <div className="d_infocard card shadow">
                <div className="card-body">
                  <div className="d_infocard_txt">
                    <h3>Total</h3>
                    <h2>Sim</h2>
                  </div>
                  <div className="d_infocard_icon">
                  <span>
                    {simData.length}
                  </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 col-sm-12 d_infocard_col">
              <div className="d_infocard card shadow">
                <div className="card-body">
                  <div className="d_infocard_txt">
                    <h3>Available</h3>
                    <h2>Sim</h2>
                  </div>
                  <div className="d_infocard_icon">
                  <span>
                    {availableObjects.length}
                  </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 col-sm-12 d_infocard_col">
              <div className="d_infocard card shadow">
                <div className="card-body">
                  <div className="d_infocard_txt">
                    <h3>Allocated</h3>
                    <h2>Sim</h2>
                  </div>
                  <div className="d_infocard_icon">
                  <span>
                    {allocatedObjects.length}
                  </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {departmentData.map((item)=>(
            <div className="col-xxl-4 col-xl-3 col-lg-4 col-md-6 col-sm-12 d_infocard_col">
              <div className="d_infocard card shadow">
                <div className="card-body">
                  <div className="d_infocard_txt">
                    <h3>{item.dept_name}</h3>
                    <h2>Sim</h2>
                  </div>
                  <div className="d_infocard_icon">
                  <span>
                    {simData.filter((match)=>match.dept == item.dept_id).length}
                  </span>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
      </div> 
    </div>           
  );
};
export default SimDashboard;