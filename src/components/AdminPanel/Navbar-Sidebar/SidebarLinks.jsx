import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";

const SidebarLinks = () => {
  const [contextData, setData] = useState([]);
  const [allCount, setAllCount] = useState();
  const [ownCount, setOwnCount] = useState();
  const [otherCount, setOtherCount] = useState();

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

  useEffect(() => {
    const formData = new URLSearchParams();
    formData.append("loggedin_user_id", 36);
    axios
      .post(
        "https://purchase.creativefuel.io/webservices/RestController.php?view=inventoryDataList",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        const filterVendorId = res.data.body.filter(
          (check) => check.vendor_id == "8"
        ).length;
        setOwnCount(filterVendorId);
        const filterVendorId1 = res.data.body.length;
        setAllCount(filterVendorId1);
        const filterVendorId2 = res.data.body.filter(
          (check) => check.vendor_id !== "8"
        ).length;
        setOtherCount(filterVendorId2);
      });
  }, []);

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
  const isExecutionVisible = [24, 31, 32, 34].some(
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
              <Link className="collapse-item" to="/sim-overview">
                Asset Management
              </Link>
              <Link className="collapse-item" to="/admin/user-graph">
                User Graphs
              </Link>
              <Link
                className="collapse-item"
                to="/admin/email-template-overview"
              >
                Email Templates
              </Link>
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
              <Link className="collapse-item" to="/admin/wfh-user-dashboard">
                Dashboard
              </Link>
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
                contextData[36] &&
                contextData[36].view_value === 1 && (
                  <Link className="collapse-item" to="/admin/salaryWFH">
                    Payroll
                  </Link>
                )}
              {contextData &&
                contextData[36] &&
                contextData[36].view_value === 1 && (
                  <Link className="collapse-item" to="/admin/all-salary">
                    Salary History
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

      {/* {isAssetNotifierVisible && ( */}
      <li className="nav-item">
        <Link
          className="nav-link collapsed"
          data-toggle="collapse"
          data-target="#collapseEight"
          aria-expanded="true"
          aria-controls="collapseEight"
        >
          <i className="bi bi-person-gear" />
          <span>Asset Notifier</span>
        </Link>
        <div
          id="collapseEight"
          className="collapse"
          aria-labelledby="headingTwo"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white collapse-inner">
            {/* {contextData &&
                contextData[5] &&
                contextData[5].view_value === 1 && ( */}
            <Link className="collapse-item" to="/admin/self-audit">
              Audit asset
            </Link>
            <Link className="collapse-item" to="/admin/asset-visible-to-hr">
              Repair Request To HR
            </Link>
            <Link
              className="collapse-item"
              to="/admin/asset-visible-to-taged-person"
            >
              Repair Request To Taged Person
            </Link>
            {/* )} */}

            {/* {contextData &&
                contextData[8] &&
                contextData[8].view_value === 1 && ( */}
            {/* <Link className="collapse-item" to="/admin/hr-audit">
                  Hr Audit
                  </Link> */}
            {/* )} */}
          </div>
        </div>
      </li>
      {/* )} */}

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
            <span>Org</span>
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
              {contextData && contextData[18]?.view_value == 1 && (
                <Link
                  className="collapse-item"
                  to="/admin/pre-onboard-coc-master"
                >
                  Coc Master
                </Link>
              )}
              {contextData && contextData[18]?.view_value == 1 && (
                <Link
                  className="collapse-item"
                  to="/admin/pre-onboard-coc-overview"
                >
                  Coc Overview
                </Link>
              )}
              {contextData && contextData[18]?.view_value == 1 && (
                <Link
                  className="collapse-item"
                  to="/admin/pre-onboard-user-login-history"
                >
                  Login History
                </Link>
              )}
              {contextData && contextData[18]?.view_value == 1 && (
                <Link
                  className="collapse-item"
                  to="/admin/pre-onboard-all-notifications"
                >
                  All Notifications
                </Link>
              )}

              <Link
                className="collapse-item"
                to="/admin/preonboarding-documents-overview"
              >
                Documents
              </Link>

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

      {/* {isLeadManagementVisible && (
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
      )} */}

      {/* {contextData && contextData[34] && contextData[34].view_value === 1 && (
        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapsInnerOne"
            aria-expanded="true"
            aria-controls="collapsInnerOne"
          >
            <i className="bi bi-person-gear" />
            <span>Inventory</span>
          </a>
          <div
            id="collapsInnerOne"
            className="collapse"
            aria-labelledby="headingTwo"
          >
            <div className="bg-white collapse-inner">
              
              <Link className="collapse-item" to="/admin/cityMsater">
                City Mast
              </Link>{" "}
              <Link
                className="collapse-item"
                to="/admin/exeexecution/PagePerformanceAnalytics"
              >
                Analytics
              </Link>{" "}
              <Link
                to="/admin/exeexecution/dashboard"
                className="collapse-item"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/exeexecution/PagePerformanceDashboard"
                className="collapse-item"
              >
                Page Performance Dashboard
              </Link>
              <Link
                className="collapse-item"
                to="/admin/exeexecution/allpagesdetail"
              >
                All Pages Detailed
              </Link>{" "}
              <Link
                to="/admin/exeexecution/dashboard"
                className="collapse-item"
              >
                Dashboard
              </Link>
              <Link className="collapse-item" to="/admin/exeexecution/all">
                All ({allCount})
              </Link>{" "}
              <Link className="collapse-item" to="/admin/exeexecution/own">
                Own ({ownCount})
              </Link>{" "}
              <Link className="collapse-item" to="/admin/exeexecution/other">
                Other ({otherCount})
              </Link>
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
                  <li className="nav-item">
                    <a
                      className="nav-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapsInnerOne"
                      aria-expanded="true"
                      aria-controls="collapsInnerOne"
                    >
                     
                      <span>Execution</span>
                    </a>
                    <div
                      id="collapsInnerOne"
                      className="collapse"
                      aria-labelledby="headingTwo"
                      
                    >
                      <div className="bg-white collapse-inner">
                        <Link className="collapse-item" to="/admin/execution">
                          Dashboard
                        </Link>
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
                      
                    >
                      <div className="bg-white collapse-inner">
                        <>
                          <Link
                            className="collapse-item"
                            to="/admin/manager-campaign"
                          >
                            Manager Campaign Dashboard
                          </Link>
                          <Link
                            className="collapse-item"
                            to="/admin/manager-dashboard"
                          >
                            Manager Dashboard
                          </Link>
                          <Link
                            className="collapse-item"
                            to="/admin/phase-dashboard"
                          >
                            Phase Dashboard
                          </Link>
                          <Link
                            className="collapse-item"
                            to="/admin/replacement-dashboard"
                          >
                            Replacement Dashboard
                          </Link>
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
                            to="/admin/experties-overview"
                          >
                            Experties
                          </Link>
                          
                          <Link
                            className="collapse-item"
                            to="/admin/checkPageFollowers"
                          >
                            Check Page Follower
                          </Link>
                          <Link
                            className="collapse-item"
                            to="/admin/createAssign"
                          >
                            createAssign
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
                      
                    >
                      <div className="bg-white collapse-inner">
                        <>
                          <Link
                            className="collapse-item"
                            to="/admin/createrdashboard"
                          >
                            Creater Dashborad
                          </Link>
                          <Link
                            className="collapse-item"
                            to="/admin/excusionCampaign"
                          >
                            Excusion Campaign
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

      {isUserManagementVisible && (
        <li className="nav-item">
          <Link
            className="nav-link collapsed"
            data-toggle="collapse"
            data-target="#collapseNine"
            aria-expanded="true"
            aria-controls="collapseNine"
          >
            <i className="bi bi-person-gear" />
            <span>Finance</span>
          </Link>
          <div
            id="collapseNine"
            className="collapse"
            aria-labelledby="headingTwo"
            data-parent="#accordionSidebar"
          >
            <div className="bg-white collapse-inner">
              <li className="nav-item">
                <a
                  className="nav-link collapsed"
                  data-toggle="collapse"
                  data-target="#collapsInnerOneFinance"
                  aria-expanded="true"
                  aria-controls="collapsInnerOneFinance"
                >
                  <span>Payment Update</span>
                </a>
                <div
                  id="collapsInnerOneFinance"
                  className="collapse"
                  aria-labelledby="headingTwo"
                >
                  <div className="bg-white collapse-inner">
                    <Link
                      className="collapse-item"
                      to="/admin/finance-paymentmode"
                    >
                      Payment Mode
                    </Link>
                    <Link
                      className="collapse-item"
                      to="/admin/finance-pendingapproveupdate"
                    >
                      Pending Approval
                    </Link>
                    <Link
                      className="collapse-item"
                      to="/admin/finance-alltransactions"
                    >
                      All Transaction
                    </Link>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link collapsed"
                  data-toggle="collapse"
                  data-target="#collapsInnerOneFinanceSecound"
                  aria-expanded="true"
                  aria-controls="collapsInnerOneFinanceSecound"
                >
                 
                  <span>Payment Refund</span>
                </a>
                <div
                  id="collapsInnerOneFinanceSecound"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  
                >
                  <div className="bg-white collapse-inner">
                    <Link
                      className="collapse-item"
                      to="/admin/finance-pendingapproverefund"
                    >
                      Pending Approval Refund
                    </Link>
                    <Link
                      className="collapse-item"
                      to="/admin/finance-pendingrequests"
                    >
                      All Refund Request
                    </Link>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link collapsed"
                  data-toggle="collapse"
                  data-target="#collapsInnerThree"
                  aria-expanded="true"
                  aria-controls="collapsInnerThree"
                >
                  <span>Balance Payment Update</span>
                </Link>
                <div
                  id="collapsInnerThree"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  
                >
                  <div className="bg-white collapse-inner">
                    <>
                      <Link
                        className="collapse-item"
                        to="/admin/finance-balancepayment"
                      >
                        List
                      </Link>
                    </>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link collapsed"
                  data-toggle="collapse"
                  data-target="#collapsInnerFourFinance"
                  aria-expanded="true"
                  aria-controls="collapsInnerFourFinance"
                >
                  <span>Incentive Payment</span>
                </Link>
                <div
                  id="collapsInnerFourFinance"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  
                >
                  <div className="bg-white collapse-inner">
                    <>
                      <Link
                        className="collapse-item"
                        to="/admin/finance-incentivepayment"
                      >
                        View Incentive Payment
                      </Link>
                    </>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link collapsed"
                  data-toggle="collapse"
                  data-target="#collapsInnerFiveFinance"
                  aria-expanded="true"
                  aria-controls="collapsInnerFiveFinance"
                >
                  <span>Invoice</span>
                </Link>
                <div
                  id="collapsInnerFiveFinance"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  
                >
                  <div className="bg-white collapse-inner">
                    <>
                      <Link
                        className="collapse-item"
                        to="/admin/finance-pendinginvoice"
                      >
                        Pending Invoice Creation
                      </Link>
                      <Link
                        className="collapse-item"
                        to="/admin/finance-createdinvoice"
                      >
                        Invoice Created
                      </Link>
                    </>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link collapsed"
                  data-toggle="collapse"
                  data-target="#collapsInnerSevenFinance"
                  aria-expanded="true"
                  aria-controls="collapsInnerSevenFinance"
                >
                  <span>TDS</span>
                </Link>
                <div
                  id="collapsInnerSevenFinance"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  
                >
                  <div className="bg-white collapse-inner">
                    <>
                      <Link
                        className="collapse-item"
                        to="/admin/finance-salebookingclose"
                      >
                        Sales Booking Closing
                      </Link>
                      <Link
                        className="collapse-item"
                        to="/admin/finance-salebookingverify"
                      >
                        Sales Booking Verification
                      </Link>
                    </>
                  </div>
                </div>
              </li>
            </div>
          </div>
        </li>
      )} */}

    </>
  );
};

export default SidebarLinks;
