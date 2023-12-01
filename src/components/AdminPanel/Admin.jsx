import { Route, Routes } from "react-router-dom";
// import { useGlobalContext } from "../../Context/Context";
import SittingMaster from "./Sitting/SittingMaster";
import NavSideBar from "./Navbar-Sidebar/NavSideBar";
import UserMaster from "./User/UserMaster";
import UserView from "./User/UserView";
import UserUpdate from "./User/UserUpdate";
import UserOverview from "./User/UserOverview";
import RoleMaster from "./Role/RoleMaster";
import RoleOverView from "./Role/RoleOverview";
import RoleMastUpdate from "./Role/RoleMastUpdate";
import DepartmentOverview from "./Department/DepartmentOverview";
import DepartmentMaster from "./Department/DepartmentMaster";
import DepartmentUpdate from "./Department/DepartmentUpdate";
import ProductMaster from "./Product/ProductMaster";
import ProductOverview from "./Product/ProductOverview";
import ProductUpdate from "./Product/ProductUpdate";
import SittingOverview from "./Sitting/SittingOverview";
import SittingUpdate from "./Sitting/SittingUpdate";
import OfficeMast from "./Office/OfficeMaster";
import OfficeMastOverview from "./Office/OfficeMastOverview";
import OfficeMastUpdate from "./Office/OfficeMastUpdate";
import UserResposOverview from "./UserResponsbility/UserResposOverview";
import UserResponsbility from "./UserResponsbility/UserResponsbility";
import UserResponsbilityUpdate from "./UserResponsbility/userResponsbilityUpdate";
import UserAuthDetail from "./UserAuthDetail/UserAuthDetail";
import ObjectMaster from "./Object/ObjectMaster";
import ObjectOverview from "./Object/ObjectOverview";
import ObjectUpdate from "./Object/ObjectUpdate";
import DeliverdOrder from "../Pantry/DeliverdOrder/DeliverdOrder";
import PendingOrder from "../Pantry/PendingOrder/PendingOrder";
import Dashboard from "./Dashboard/Dashboard";
import TransferReq from "../Pantry/TransferReq/TransferReq";
import AllOrder from "../Pantry/AllOrders/AllOrders";
import DesignationOverview from "./Designation/DesignationOverview";
import Designation from "./Designation/Designation";
import DesignationUpdate from "./Designation/DesignationUpdate";
// import { useGlobalContext } from "../../Context/Context";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import LogoCategoryMaster from "./LogoCategory/LogoCategoryMaster";
import LogoCategoryOverview from "./LogoCategory/LogoCategoryOverview";
import LogoCategoryUpdate from "./LogoCategory/LogoCategoryUpdate";
import PantryHome from "../Pantry/PantryHome/PantryHome";
import ResponsibilityMast from "./UserResponsbility/Responsbility/ResponsibilityMast";
import ResponsiblityOverview from "./UserResponsbility/Responsbility/ResponsiblityOverview";
import ResponsibilityUpdate from "./UserResponsbility/Responsbility/ResponsibilityUpdate";
import IpTypeMaster from "./IpType/IpTypeMaster";
import IpTypeOverview from "./IpType/IpTypeOverview";
import IpTypeUpdate from "./IpType/IpTypeUpdate";
import PlatformMaster from "./Platform/PlatformMaster";
import PlatformOverview from "./Platform/PlatformOverview";
import PlatformUpdate from "./Platform/PlatformUpdate";
import DeclinedOrder from "../Pantry/DeclinedOrder/DeclinedOrder";
import UserDirectory from "./User/UserDirectory";
import AdminPreOnboarding from "./AdminPreOnboarding/AdminPreOnboarding";
import AnnoucementPost from "./Announcement/AnnoucementPost";
import AnnouncementView from "./Announcement/AnnouncementView";
import Attendence from "./WFH/Attendence";
import AttendanceOverview from "./WFH/AttendanceOverview";
import UserDashboard from "./User/UserDashboard/UserDashboard";
import KRA from "./KRA/KRA";
import UserWiseResponsibility from "./UserResponsbility/UserWiseResponsibility/UserWiseResponsibility";
import UserWiseDashboard from "./User/UserWIseDashboard/UserWiseDashboard";
import SalaryWFH from "./WFH/SalaryGeneration/SalaryWFH";
import UserHierarchy from "./User/UserHierarchy";
import UserSingle from "./User/UserSingle";
import DashboardWFHUser from "./WFH/DashboardWFHUser";
import DashboardWFHCardDetails from "./WFH/DashboardWFHCardDetails";
import LeadApp from "../LeadManagement/LeadApp";
import LeadManagement from "../LeadManagement/LeadManagement";
import EditLead from "../LeadManagement/EditLead";
import LeadHome from "../LeadManagement/LeadHome";
import SELeadTable from "../LeadManagement/SELeadTable";
import Reason from "./Reason/Reason";
import SubDepartmentMaster from "./Department/SubDepartmentMaster";
import SubDepartmentOverview from "./Department/SubDepartmentOverview";
import SubDepartmentUpdate from "./Department/SubDepartmentUpdate";
import ExecutionInventory from "../Execution/ExecutionInventory";
import ExecutionPending from "../Execution/ExecutionPending";
import OverviewIndex from "../Execution/overview/OverviewIndex";
import ExecutionDetail from "../Execution/ExecutionDetail";
import InstaAPIHome from "../InstaApi.jsx/InstaAPIHome";
import InstaPageDashboard from "../InstaApi.jsx/InstaPageDashboard";
import InstaPostDashboard from "../InstaApi.jsx/InstaPostDashboard";
import InstaPageDetail from "../InstaApi.jsx/InstaPageDetail";
// import ExecutionUpdate from "../Execution/ExecutionUpdate";
import CronExpression from "../InstaApi.jsx/CronExpression";
import InstaApiContext from "../InstaApi.jsx/InstaApiContext";
import PreOnboardVerifyDetails from "./AdminPreOnboarding/PreOnboardVerifyDetails";
import PreOnboardUserDetailsProfile from "./AdminPreOnboarding/PreOnboardUserDetailsProfile";
import PreOnboardingOverview from "./AdminPreOnboarding/PreOnboardOverview";
import OnboardExtendDateOverview from "./AdminPreOnboarding/OnboardExtendDateOverview";
import AuditorTrack from "../InstaApi.jsx/Auditor/AuditorTrack";
import ExecutionDone from "../Execution/Done/ExecutionDone";
import ExecutionAccepted from "../Execution/Accepted/ExecutionAccepted";
import RegisterCampaign from "./RegisterCampaign/registerCampaign";
import ExecutionRejected from "../Execution/Rejected/ExecutionRejected";
import RegisteredCampaign from "./RegisterCampaign/RegisteredCampaign";
import SalaryDashboard from "./WFH/SalaryGeneration/SalaryDashboard";
import CampignAdmin from "./CampaginAdmin/CampignAdmin";
import BrandMaster from "./RegisterCampaign/BrandMaster";
import CategoryMaster from "./RegisterCampaign/CategoryMaster";
import ContentType from "./RegisterCampaign/ContentType";
import CampaignCommitment from "./RegisterCampaign/CampaignCommitment";
import ContentCreater from "./RegisterCampaign/ContentCreater";
import CheckPageFollowers from "./RegisterCampaign/CheckPageFollowers";
import SubCategoryMaster from "./RegisterCampaign/SubCategoryMaster";

import CreaterDashboard from "./RegisterCampaign/CreaterDashboard";
import BillingOverview from "./WFH/Billing/BillingOverview";
import BillingMast from "./WFH/Billing/BillingMast";
import BillingUpdate from "./WFH/Billing/BillingUpdate";
// import InterpretorPage from "../InstaApi.jsx/Interpretor/InterpretorPage";
import InterpretorPostDashboard from "../InstaApi.jsx/Interpretor/InterpretorPostDashboard";
import InterpretorPageDashboard from "../InstaApi.jsx/Interpretor/InterpretorPageDashboard";
import AdminPageView from "../InstaApi.jsx/InstaAdmin/AdminPageView";
import AdminPostView from "../InstaApi.jsx/InstaAdmin/AdminPostView";
import AuditorPageView from "../InstaApi.jsx/Auditor/AuditorPageView";
import InterpretorContext from "../InstaApi.jsx/Interpretor/InterpretorContext";
import AccountsOverviewWFH from "./AccountsDepartment/AccountsOverviewWFH";
import WFHSingleUser from "./WFH/WFHSingleUser/WFHSingleUser";
import AnalyticsDashboard from "../InstaApi.jsx/Analytics/AnalyticsDashboard";

import ExecutionAll from "../Execution/ExecutionAll";
import ExecutionOwn from "../Execution/ExecutionOwn";
import ExecutionOther from "../Execution/ExecutionOther";
import CocUpdate from "./AdminPreOnboarding/CocUpdate";
import CocMaster from "./AdminPreOnboarding/CocMaster";
import CocOverview from "./AdminPreOnboarding/CocOverview";
import NotificationHistory from "./AdminPreOnboarding/NotificationHistory";
import CocHistory from "./AdminPreOnboarding/CocHistory";
import LoginHistory from "./AdminPreOnboarding/LoginHistory";
import PreonboardingDocuments from "./AdminPreOnboarding/AdminPreDocuments/PreonboardingDocuments";
import PreonboardingDocumentOverview from "./AdminPreOnboarding/AdminPreDocuments/PreonboardingDocumentOverview";
import PreonboardingDocumentsUpdate from "./AdminPreOnboarding/AdminPreDocuments/PreonboardingDocumentsUpdate";
import PlanOverview from "./RegisterCampaign/PlanOverview";
import PhaseCreation from "./RegisterCampaign/PhaseCreation";
import PlanCreation from "./RegisterCampaign/PlanCreation";
import ExeUPdate from "../Execution/ExeUPdate";
import ExeHistory from "../Execution/ExeHistory";
import { SelfAudit } from "./AssetNotifier/SelfAudit";
import StatsAllPagesDetail from "../Execution/StatsAllPagesDetail";
import ExecutionDashboard from "../Execution/ExecutionDashboard";

const Admin = () => {
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

  return (
    <>
      <div id="wrapper">
        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <div className="page_content">
              <Routes>
                <Route path="/" element={<NavSideBar />}>
                  <Route path="/" element={<Dashboard />} />

                  <Route path="/all-pending-order" element={<PendingOrder />} />
                  <Route path="/transfer-req" element={<TransferReq />} />
                  <Route path="/all-order" element={<AllOrder />} />
                  <Route
                    path="/all-declined-order"
                    element={<DeclinedOrder />}
                  />
                  <Route
                    path="/all-deliverd-order"
                    element={<DeliverdOrder />}
                  />
                  <Route path="/users-dashboard" element={<UserDashboard />} />
                  <Route
                    path="/dashboard_department_wise_user/:id"
                    element={<UserWiseDashboard />}
                  />

                  <Route path="/kra/:id" element={<KRA />} />
                  <Route
                    path="/user-wise-responsibility/:id"
                    element={<UserWiseResponsibility />}
                  />

                  {contextData &&
                    contextData[10] &&
                    contextData[10].view_value === 1 && (
                      <>
                        <Route
                          path="/designation-overview"
                          element={<DesignationOverview />}
                        />
                        <Route
                          path="/designation-update/:desi_id"
                          element={<DesignationUpdate />}
                        />
                      </>
                    )}
                  <Route path="/designation-master" element={<Designation />} />
                  {contextData &&
                    contextData[0] &&
                    contextData[0].view_value === 1 && (
                      <>
                        <Route path="/user" element={<UserMaster />} />
                        <Route
                          path="/user-overview"
                          element={<UserOverview />}
                        />
                        <Route
                          path="/user-update/:id"
                          element={<UserUpdate />}
                        />
                        <Route path="/user_view/:id" element={<UserView />} />
                        <Route
                          path="/user-auth-detail/:id"
                          element={<UserAuthDetail />}
                        />
                        <Route
                          path="/user-directory"
                          element={<UserDirectory />}
                        />
                        <Route
                          path="/user-hierarchy"
                          element={<UserHierarchy />}
                        />
                        <Route
                          path="/user-single/:id"
                          element={<UserSingle />}
                        />
                      </>
                    )}

                  {/* Attendence  */}
                  <Route
                    path="/salary-dashboard/:id"
                    element={<SalaryDashboard />}
                  />
                  <Route
                    path="/billing-overview"
                    element={<BillingOverview />}
                  />
                  <Route path="/billing-master" element={<BillingMast />} />
                  <Route
                    path="/billing-update/:id"
                    element={<BillingUpdate />}
                  />
                  <Route
                    path="/attendence-overview"
                    element={<AttendanceOverview />}
                  />
                  <Route path="/attendence-mast" element={<Attendence />} />

                  {/* Salary */}
                  <Route path="/salaryWFH" element={<SalaryWFH />} />
                  {/* Accounts/Finance */}
                  <Route
                    path="/accounts-finance-overview"
                    element={<AccountsOverviewWFH />}
                  />

                  <Route path="/wfh-single-user" element={<WFHSingleUser />} />
                  <Route
                    path="/wfh-user-dashboard"
                    element={<DashboardWFHUser />}
                  />

                  <Route
                    path="/wfh-dashboard-overview/:id"
                    element={<DashboardWFHCardDetails />}
                  />

                  {/* <Route
                    path="/wfh-user-dashboard"
                    element={<DashboardWFHUser />}
                  />
                  <Route
                    path="/wfh-dashboard-overview/:id"
                    element={<DashboardWFHCardDetails />}
                  /> */}

                  {contextData &&
                    contextData[1] &&
                    contextData[1].view_value === 1 && (
                      <>
                        <Route
                          path="/user-respons-overivew"
                          element={<UserResposOverview />}
                        />
                        <Route
                          path="/user-responsbility"
                          element={<UserResponsbility />}
                        />
                        <Route
                          path="/user-respons-update"
                          element={<UserResponsbilityUpdate />}
                        />
                      </>
                    )}

                  {contextData &&
                    contextData[2] &&
                    contextData[2].view_value === 1 && (
                      <>
                        <Route
                          path="/object-master"
                          element={<ObjectMaster />}
                        />
                        <Route
                          path="/object-overview"
                          element={<ObjectOverview />}
                        />
                        <Route
                          path="/object-update/:id"
                          element={<ObjectUpdate />}
                        />
                      </>
                    )}
                  {contextData &&
                    contextData[3] &&
                    contextData[3].view_value === 1 && (
                      <>
                        <Route
                          path="/department-overview"
                          element={<DepartmentOverview />}
                        />
                        <Route
                          path="/department-master"
                          element={<DepartmentMaster />}
                        />
                        <Route
                          path="/department-update"
                          element={<DepartmentUpdate />}
                        />
                      </>
                    )}
                  {contextData &&
                    contextData[4] &&
                    contextData[4].view_value === 1 && (
                      <>
                        <Route path="/role" element={<RoleMaster />} />
                        <Route
                          path="/role-overview"
                          element={<RoleOverView />}
                        />
                        <Route
                          path="/role-update"
                          element={<RoleMastUpdate />}
                        />
                      </>
                    )}
                  {contextData &&
                    contextData[5] &&
                    contextData[5].view_value === 1 && (
                      <>
                        <Route
                          path="/product-master"
                          element={<ProductMaster />}
                        />
                        <Route
                          path="/product-overview"
                          element={<ProductOverview />}
                        />
                        <Route
                          path="/product-update"
                          element={<ProductUpdate />}
                        />
                      </>
                    )}
                    {/* {contextData &&
                    contextData[5] &&
                    contextData[5].view_value === 1 && ( */}
                      <>
                        <Route
                          path="/self-audit"
                          element={<SelfAudit />}
                        />
                       {/* <Route
                          path="/product-overview"
                          element={<ProductOverview />}
                        /> */}

                      </>
                    {/* )} */}
                  {contextData &&
                    contextData[6] &&
                    contextData[6].view_value === 1 && (
                      <>
                        <Route path="/office-mast" element={<OfficeMast />} />
                        <Route
                          path="/office-mast-overview"
                          element={<OfficeMastOverview />}
                        />
                        <Route
                          path="/office-mast-update"
                          element={<OfficeMastUpdate />}
                        />
                      </>
                    )}
                  {contextData &&
                    contextData[7] &&
                    contextData[7].view_value === 1 && (
                      <>
                        <Route
                          path="/sitting-master"
                          element={<SittingMaster />}
                        />
                        <Route
                          path="/sitting-overview"
                          element={<SittingOverview />}
                        />
                        <Route
                          path="/sitting-update"
                          element={<SittingUpdate />}
                        />
                      </>
                    )}

                  <Route
                    path="/responsibility-master"
                    element={<ResponsibilityMast />}
                  />
                  <Route
                    path="/responsibility-overview"
                    element={<ResponsiblityOverview />}
                  />

                  <Route
                    path="/responsibility-update/:id"
                    element={<ResponsibilityUpdate />}
                  />

                  <Route
                    path="/logo-category-master"
                    element={<LogoCategoryMaster />}
                  />
                  <Route
                    path="/logo-category-overview"
                    element={<LogoCategoryOverview />}
                  />
                  <Route
                    path="/logo-category-update/:id"
                    element={<LogoCategoryUpdate />}
                  />

                  <Route path="/pantry-home" element={<PantryHome />} />

                  <Route path="/iptype-master" element={<IpTypeMaster />} />
                  <Route path="/iptype-overview" element={<IpTypeOverview />} />
                  <Route path="/iptype-update/:id" element={<IpTypeUpdate />} />
                  <Route path="/platform-master" element={<PlatformMaster />} />
                  <Route
                    path="/platform-overview"
                    element={<PlatformOverview />}
                  />
                  <Route
                    path="/platform-update/:id"
                    element={<PlatformUpdate />}
                  />
                  <Route
                    path="/pre-onboarding"
                    element={<AdminPreOnboarding />}
                  />
                  <Route
                    path="/pre-onboard-extend-date-overview"
                    element={<OnboardExtendDateOverview />}
                  />
                  <Route
                    path="/pre-onboard-coc-master"
                    element={<CocMaster />}
                  />
                  <Route
                    path="/pre-onboard-coc-overview"
                    element={<CocOverview />}
                  />
                  <Route
                    path="/pre-onboard-all-notifications"
                    element={<NotificationHistory />}
                  />
                  <Route
                    path="/pre-onboard-coc-update/:id"
                    element={<CocUpdate />}
                  />
                  <Route
                    path="/pre-onboard-coc-history/:id"
                    element={<CocHistory />}
                  />
                  <Route
                    path="/pre-onboard-user-login-history"
                    element={<LoginHistory />}
                  />
                  <Route
                    path="/only-pre-onboard-user-data"
                    element={<PreOnboardVerifyDetails />}
                  />
                  <Route
                    path="/pre-onboarding-overview"
                    element={<PreOnboardingOverview />}
                  />
                  <Route
                    path="/preOnboard-user-details-profile/:id"
                    element={<PreOnboardUserDetailsProfile />}
                  />
                  <Route
                    path="/preonboarding-documents"
                    element={<PreonboardingDocuments />}
                  />
                  <Route
                    path="/preonboarding-documents-overview"
                    element={<PreonboardingDocumentOverview />}
                  />
                  <Route
                    path="/preonboarding-documents-update/:id"
                    element={<PreonboardingDocumentsUpdate />}
                  />
                  <Route
                    path="/annoucement-post"
                    element={<AnnoucementPost />}
                  />
                  <Route
                    path="/annoucement-view"
                    element={<AnnouncementView />}
                  />
                  <Route path="/reason" element={<Reason />} />
                  <Route
                    path="/sub-department-overview"
                    element={<SubDepartmentOverview />}
                  />
                  <Route
                    path="/sub-department-master"
                    element={<SubDepartmentMaster />}
                  />
                  <Route
                    path="/sub-department-update/:id"
                    element={<SubDepartmentUpdate />}
                  />
                  <Route
                    path="/register-campaign"
                    element={<RegisterCampaign />}
                  />
                  <Route
                    path="/registered-campaign"
                    element={<RegisteredCampaign />}
                  />
                  <Route path="/campaign-admin" element={<CampignAdmin />} />
                  <Route
                    path="/createrdashboard"
                    element={<CreaterDashboard />}
                  />
                  <Route path="/planOverview/:id" element={<PlanOverview />} />
                  <Route path="/phase/:id" element={<PhaseCreation />} />
                  <Route path="/planCreation/:id" element={<PlanCreation />} />


                  <Route
                    path="/checkPageFollowers"
                    element={<CheckPageFollowers />}
                  />
                  <Route path="/brandmaster" element={<BrandMaster />} />
                  <Route path="/contenttype" element={<ContentType />} />
                  <Route
                    path="/campaigncommitment"
                    element={<CampaignCommitment />}
                  />
                  <Route path="/categorymaster" element={<CategoryMaster />} />
                  <Route path="/subcategory" element={<SubCategoryMaster />} />

                  <Route path="/contentcreater" element={<ContentCreater />} />
                
                  {/* ----------------------lead source routes -----------------------------*/}
                  <Route
                    path="/exploreleads"
                    element={
                      <LeadApp>
                        <LeadHome />{" "}
                      </LeadApp>
                    }
                  />
                  <Route
                    path="/newlead"
                    element={
                      <LeadApp>
                        <LeadManagement />
                      </LeadApp>
                    }
                  />
                  <Route
                    path="/updatelead"
                    element={
                      <LeadApp>
                        <EditLead />
                      </LeadApp>
                    }
                  />

                  <Route
                    path="/:id"
                    element={
                      <LeadApp>
                        <SELeadTable />
                      </LeadApp>
                    }
                  />

                  {/*------------------------ Execution --------------------------------*/}
                    <Route path="/exeexecution/dashboard" element={<ExecutionDashboard />} />
                  <Route path="/exe-update/:id" element={<ExeUPdate />} />
                  <Route path="/exe-history/:id" element={<ExeHistory />} />
                  <Route path="/execution" element={<OverviewIndex />} />
                  <Route path="/exeexecution/all" element={<ExecutionAll />} />
                  <Route path="/exeexecution/allpagesdetail" element={<StatsAllPagesDetail />} />
                  <Route path="/exeexecution/own" element={<ExecutionOwn />} />
                  <Route
                    path="/exeexecution/other"
                    element={<ExecutionOther />}
                  />
                  <Route
                    path="/exeexecution/pending"
                    element={
                      <ExecutionPending />

                      // </LeadApp>
                    }
                  />
                  <Route
                    path="/exeexecution/done"
                    element={<ExecutionDone />}
                  />
                  <Route
                    path="/exeexecution/accepted"
                    element={<ExecutionAccepted />}
                  />
                  <Route
                    path="/exeexecution/rejected"
                    element={<ExecutionRejected />}
                  />
                  <Route
                    path="/exeinventory"
                    element={
                      <ExecutionInventory />

                      // </LeadApp>
                    }
                  />

                  <Route
                    path="/exeexecution/:id"
                    element={<ExecutionDetail />}
                  />

                  {/* -------------------Insta Api--------------------------- */}
                  <Route
                    path="/instaapi"
                    element={
                      <InstaApiContext>
                        <InstaAPIHome />
                      </InstaApiContext>
                    }
                  />
                  <Route
                    path="/instaapi/:creatorName"
                    element={
                      <InstaApiContext>
                        <InstaPageDashboard />
                      </InstaApiContext>
                    }
                  />
                  <Route
                    path="/instaapi/all/:creatorName"
                    element={
                      <InstaApiContext>
                        <AdminPageView />
                      </InstaApiContext>
                    }
                  />
                  <Route
                    path="/instaapi/interpretor/:creatorName"
                    element={
                      <InstaApiContext>
                        <InterpretorContext>
                          <InterpretorPageDashboard />
                        </InterpretorContext>
                      </InstaApiContext>
                    }
                  />
                  <Route
                    path="/instaapi/auditor/:creatorName"
                    element={
                      <InstaApiContext>
                        <AuditorPageView />
                      </InstaApiContext>
                    }
                  />
                  <Route
                    path="/instaapi/all/:creatorName/:shortCode"
                    element={
                      <InstaApiContext>
                        <AdminPostView />
                      </InstaApiContext>
                    }
                  />
                  <Route
                    path="/instaapi/:creatorName/:shortCode"
                    element={
                      <InstaApiContext>
                        <InstaPostDashboard />
                      </InstaApiContext>
                    }
                  />
                  <Route
                    path="/instaapi/:creatorName/track/:shortCode"
                    element={
                      <InstaApiContext>
                        <CronExpression />
                      </InstaApiContext>
                    }
                  />
                  <Route
                    path="/instaapi/analytics/:creatorName"
                    element={
                      <InstaApiContext>
                        <InstaPageDetail />
                      </InstaApiContext>
                    }
                  />
                  <Route
                    path="/instaapi/analytic"
                    element={
                      <InstaApiContext>
                        <AnalyticsDashboard />
                      </InstaApiContext>
                    }
                  />
                  <Route
                    path="/instaapi/track"
                    element={
                      <InstaApiContext>
                        <AuditorTrack />
                      </InstaApiContext>
                    }
                  />
                  <Route
                    path="/instaapi/interpretor/:creatorName/:shortCode"
                    element={
                      <InstaApiContext>
                        <InterpretorContext>
                          <InterpretorPostDashboard />
                        </InterpretorContext>
                      </InstaApiContext>
                    }
                  />

                  <Route
                    path="/instaapi/interpretor/:creatorName/post"
                    element={
                      <InstaApiContext>
                        <InterpretorContext>
                          <InterpretorPostDashboard />
                        </InterpretorContext>
                      </InstaApiContext>
                    }
                  />
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;
