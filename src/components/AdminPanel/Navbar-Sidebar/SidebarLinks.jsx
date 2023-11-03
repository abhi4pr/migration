import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const SidebarLinks = () => {
  const [contextData, setData] = useState([]);

  const storedToken = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(storedToken);
  const userID = decodedToken.id;

  useEffect(() => {
    if (userID && contextData.length === 0) {
      axios
        .get(
          `http://34.93.135.33:8080/api/get_single_user_auth_detail/${userID}`
        )
        .then((res) => {
          setData(res.data);
        });
    }
  }, [userID]);

  const isUserManagementVisible = [0, 1, 2, 6, 16, 23].some(
    (index) => contextData[index]?.view_value === 1
  );
  const isWFHVisible = [17, 19].some(
    (index) => contextData[index]?.view_value === 1
  );
  const isPantryManagementVisible = [5, 8, 9].some(
    (index) => contextData[index]?.view_value === 1
  );
  const isOnboardingVisible = [18, 20, 21].some(
    (index) => contextData[index]?.view_value === 1
  );
  const isLeadManagementVisible = [22].some(
    (index) => contextData[index]?.view_value === 1
  );
  const isExecutionVisible = [24, 31, 32].some(
    (index) => contextData[index]?.view_value === 1
  );
  const isInstaApiVisible = [25].some(
    (index) => contextData[index]?.view_value === 1
  );

  return (
    <>
      <li className="nav-item nav-item-single active">
        <Link className="nav-link" to="/admin">
          <i className="bi bi-columns-gap" />
          <span>Dashboard</span>
        </Link>
      </li>
      {isUserManagementVisible && (
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseTwo"
            aria-expanded="true"
            aria-controls="collapseTwo"
          >
            <i className="bi bi-person-gear" />
            <span>User Management</span>
          </Link>
          <div
            id="collapseTwo"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white collapse-inner">
              {contextData &&
                contextData[0] &&
                contextData[0].view_value === 1 && (
                  <Link className="collapse-item" to="/admin/user-overview">
                    User
                  </Link>
                )}

              {/* <Link
                className="collapse-item"
                to="/admin/only-pre-onboard-user-data"
              >
                Pre Onboarding
              </Link> */}

              {contextData &&
                contextData[21] &&
                contextData[21].view_value === 1 && (
                  <Link className="collapse-item" to="/admin/user-directory">
                    User Directory
                  </Link>
                )}

              {contextData &&
                contextData[1] &&
                contextData[1].view_value === 1 && (
                  <Link
                    className="collapse-item"
                    to="/admin/user-respons-overivew"
                  >
                    User Responsibility
                  </Link>
                )}
              {contextData &&
                contextData[2] &&
                contextData[2].view_value === 1 && (
                  <Link className="collapse-item" to="/admin/object-overview">
                    Object
                  </Link>
                )}

              {contextData &&
                contextData[6] &&
                contextData[6].view_value === 1 && (
                  <Link
                    className="collapse-item"
                    to="/admin/office-mast-overview"
                  >
                    Office
                  </Link>
                )}

              {contextData &&
                contextData[16] &&
                contextData[16].view_value === 1 && (
                  <>
                    <Link
                      className="collapse-item"
                      to="/admin/responsibility-overview"
                    >
                      Responsibility Register
                    </Link>
                  </>
                )}
            </div>
          </div>
        </li>
      )}

      {isWFHVisible && (
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseFour"
            aria-expanded="true"
            aria-controls="collapseFour"
          >
            <i className="bi bi-person-gear" />
            <span>WFH</span>
          </Link>
          <div
            id="collapseFour"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white collapse-inner">
              {contextData &&
                contextData[17] &&
                contextData[17].view_value === 1 && (
                  <Link className="collapse-item" to="/admin/salary-dashboard">
                    Dashboard
                  </Link>
                )}
              {contextData &&
                contextData[17] &&
                contextData[17].view_value === 1 && (
                  <Link className="collapse-item" to="/admin/billing-overview">
                    Billing
                  </Link>
                )}

              {contextData &&
                contextData[17] &&
                contextData[17].view_value === 1 && (
                  <Link className="collapse-item" to="/admin/attendence-mast">
                    Attendance
                  </Link>
                )}

              {contextData &&
                contextData[19] &&
                contextData[19].view_value === 1 && (
                  <Link className="collapse-item" to="/admin/salaryWFH">
                    Salary
                  </Link>
                )}
            </div>
          </div>
        </li>
      )}

      {isPantryManagementVisible && (
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseThree"
            aria-expanded="true"
            aria-controls="collapseThree"
          >
            <i className="bi bi-person-gear" />
            <span>Pantry Management</span>
          </Link>
          <div
            id="collapseThree"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white collapse-inner">
              {contextData &&
                contextData[5] &&
                contextData[5].view_value === 1 && (
                  <Link className="collapse-item" to="/admin/product-overview">
                    Product
                  </Link>
                )}

              {contextData &&
                contextData[8] &&
                contextData[8].view_value === 1 && (
                  <Link className="collapse-item" to="/pantry-user">
                    Pantry User
                  </Link>
                )}
              {contextData &&
                contextData[9] &&
                contextData[9].view_value === 1 && (
                  <Link className="collapse-item" to="/pantry-delivery">
                    Pantry Delivery
                  </Link>
                )}
            </div>
          </div>
        </li>
      )}

      {isOnboardingVisible && (
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseFive"
            aria-expanded="true"
            aria-controls="collapseFive"
          >
            <i className="bi bi-person-gear" />
            <span>Onboarding</span>
          </Link>
          <div
            id="collapseFive"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white collapse-inner">
              {contextData &&
                contextData[18] &&
                contextData[18].view_value === 1 && (
                  <Link className="collapse-item" to="/admin/pre-onboarding">
                    Add Pre Onboarding
                  </Link>
                )}

              {contextData && contextData[18]?.view_value == 1 && (
                <Link
                  className="collapse-item"
                  to="/admin/pre-onboarding-overview"
                >
                  Overview
                </Link>
              )}
              {contextData && contextData[18]?.view_value == 1 && (
                <Link
                  className="collapse-item"
                  to="/admin/pre-onboard-extend-date-overview"
                >
                  Extend Date Overview
                </Link>
              )}

              {/* {contextData &&
                contextData[20] &&
                contextData[20].insert_value === 1 && (
                  <Link className="collapse-item" to="/admin/announcement-post">
                    Announcement Post
                  </Link>
                )}
              {contextData &&
                contextData[21] &&
                contextData[21].view_value === 1 && (
                  <Link className="collapse-item" to="/admin/announcement-view">
                    Announcement View
                  </Link>
                )} */}
            </div>
          </div>
        </li>
      )}

      {isLeadManagementVisible && (
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseSix"
            aria-expanded="true"
            aria-controls="collapseSix"
          >
            <i className="bi bi-person-gear" />
            <span>Lead Management</span>
          </Link>
          <div
            id="collapseSix"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white collapse-inner">
              {contextData &&
                contextData[22] &&
                contextData[22].view_value === 1 && (
                  <Link className="collapse-item" to="/admin/explore-leads">
                    Explore Leads
                  </Link>
                )}
            </div>
          </div>
        </li>
      )}

      {isExecutionVisible && (
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseSeven"
            aria-expanded="true"
            aria-controls="collapseSeven"
          >
            <i className="bi bi-person-gear" />
            <span>Operation</span>
          </Link>
          <div
            id="collapseSeven"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white collapse-inner">
              {contextData &&
                contextData[24] &&
                contextData[24].view_value === 1 && (
                  <Link className="collapse-item" to="/admin/execution">
                    Dashboard
                  </Link>
                )}
              {contextData &&
                contextData[24] &&
                contextData[24].view_value === 1 && (
                  <Link className="collapse-item" to="/admin/exeinventory">
                    Inventory
                  </Link>
                )}
              {contextData &&
                contextData[24] &&
                contextData[24].view_value === 1 && (
                  <li className="nav-item">
                    <a
                      className="nav-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapsInnerOne"
                      aria-expanded="true"
                      aria-controls="collapsInnerOne"
                    >
                      {/* <i className="bi bi-person-gear" /> */}
                      <span>Execution</span>
                    </a>
                    <div
                      id="collapsInnerOne"
                      className="collapse"
                      aria-labelledby="headingTwo"
                      // data-parent="#accordionSidebar"
                    >
                      <div className="bg-white collapse-inner">
                        <Link
                          className="collapse-item"
                          to="/admin/exeexecution/pending"
                        >
                          Pending
                        </Link>{" "}
                        <Link
                          className="collapse-item"
                          to="/admin/exeexecution/done"
                        >
                          Executed
                        </Link>{" "}
                        {/* <Link
                          className="collapse-item"
                          to="/admin/exeexecution/accepted"
                        >
                          In Progress
                        </Link>{" "} */}
                        <Link
                          className="collapse-item"
                          to="/admin/exeexecution/rejected"
                        >
                          Rejected
                        </Link>
                      </div>
                    </div>
                  </li>
                )}
              {contextData &&
                contextData[24] &&
                contextData[24].view_value === 1 && (
                  <li className="nav-item">
                    <Link
                      className="nav-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapsInnerTwo"
                      aria-expanded="true"
                      aria-controls="collapsInnerTwo"
                    >
                      <span>Register a Campaign</span>
                    </Link>
                    <div
                      id="collapsInnerTwo"
                      className="collapse"
                      aria-labelledby="headingTwo"
                      // data-parent="#accordionSidebar"
                    >
                      <div className="bg-white collapse-inner">
                        <>
                          <Link
                            className="collapse-item"
                            to="/admin/register-campaign"
                          >
                            Add Campaign
                          </Link>
                          <Link
                            className="collapse-item"
                            to="/admin/registered-campaign"
                          >
                            Registered Campaign
                          </Link>
                          <Link
                            className="collapse-item"
                            to="/admin/checkPageFollowers"
                          >
                            Check Page Follower
                          </Link>
                          <Link
                            className="collapse-item"
                            to="/admin/brandmaster"
                          >
                            Brand Master
                          </Link>
                          <Link
                            className="collapse-item"
                            to="/admin/contenttype"
                          >
                            Content Type Master
                          </Link>
                          <Link
                            className="collapse-item"
                            to="/admin/campaigncommitment"
                          >
                            Campaign Master
                          </Link>

                          <Link
                            className="collapse-item"
                            to="/admin/categorymaster"
                          >
                            Category Master
                          </Link>
                          <Link
                            className="collapse-item"
                            to="/admin/subcategory"
                          >
                            subcategory Master
                          </Link>
                          <Link
                            className="collapse-item"
                            to="/admin/contentcreater"
                          >
                            Commitment Master
                          </Link>
                        </>
                      </div>
                    </div>
                  </li>
                )}
              {contextData &&
                contextData[31] &&
                contextData[31].view_value === 1 && (
                  <li className="nav-item">
                    <Link
                      className="nav-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapsInnerTwo"
                      aria-expanded="true"
                      aria-controls="collapsInnerTwo"
                    >
                      <span>Content Creation </span>
                    </Link>
                    <div
                      id="collapsInnerTwo"
                      className="collapse"
                      aria-labelledby="headingTwo"
                      // data-parent="#accordionSidebar"
                    >
                      <div className="bg-white collapse-inner">
                        <>
                          {/* <Link
                            className="collapse-item"
                            to="/admin/register-campaign"
                          >
                            Add Campaign
                          </Link>
                          <Link
                            className="collapse-item"
                            to="/admin/registered-campaign"
                          >
                            Registered Campaign
                          </Link> */}
                          <Link
                            className="collapse-item"
                            to="/admin/createrdashboard"
                          >
                            Creater Dashborad
                          </Link>
                        </>
                      </div>
                    </div>
                  </li>
                )}
              {contextData &&
                contextData[32] &&
                contextData[32].view_value === 1 && (
                  <li className="nav-item">
                    <Link
                      className="nav-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapsInnerThree"
                      aria-expanded="true"
                      aria-controls="collapsInnerThree"
                    >
                      <span>Content Creation Admin</span>
                    </Link>
                    <div
                      id="collapsInnerThree"
                      className="collapse"
                      aria-labelledby="headingTwo"
                      // data-parent="#accordionSidebar"
                    >
                      <div className="bg-white collapse-inner">
                        <>
                          <Link
                            className="collapse-item"
                            to="/admin/campaign-admin"
                          >
                            Campaign Admin
                          </Link>
                        </>
                      </div>
                    </div>
                  </li>
                )}
            </div>
          </div>
        </li>
      )}

      {isInstaApiVisible && (
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseEight"
            aria-expanded="true"
            aria-controls="collapseEight"
          >
            <i className="bi bi-person-gear" />
            <span>Insta API</span>
          </Link>
          <div
            id="collapseEight"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white collapse-inner">
              {contextData &&
                contextData[25] &&
                contextData[25].view_value === 1 && (
                  <>
                    <Link
                      className="collapse-item"
                      to="/admin/instaapi/analytic"
                    >
                      Analytics
                    </Link>
                    <Link className="collapse-item" to="/admin/instaapi">
                      Explore
                    </Link>
                  </>
                )}
              {contextData &&
                contextData[29] &&
                contextData[29].view_value === 1 && (
                  <Link className="collapse-item" to="/admin/instaapi/track">
                    Track Page
                  </Link>
                )}
              {/* {contextData &&
                contextData[28] &&
                contextData[28].view_value === 1 && (
                  <Link
                    className="collapse-item"
                    to="/admin/instaapi/interpretor"
                  >
                    Interpretor
                  </Link>
                )} */}
            </div>
          </div>
        </li>
      )}
    </>
  );
};

export default SidebarLinks;
