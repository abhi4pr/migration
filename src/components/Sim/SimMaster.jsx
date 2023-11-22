import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useGlobalContext } from "../../Context/Context";
import UserNav from "../Pantry/UserPanel/UserNav";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

const SimMaster = () => {
  const { toastAlert } = useGlobalContext();
  const [assetsName, setAssetsName] = useState("");
  const [assetsID, setAssetsID] = useState("");
  const [assetsOtherID, setAssetsOtherID] = useState("");
  const [isValidcontact, setValidContact] = useState(false);
  // const [isContactTouched, setisContactTouched] = useState(false);
  const [assetsCategory, setAssetsCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [invoiceCopy, setInvoiceCopy] = useState("");
  const [inWarranty, setInWarranty] = useState("");
  const [warrantyDate, setWarrantyDate] = useState("");
  const [dateOfPurchase, setDateOfPurchase] = useState("");
  const [selfAuditPeriod, setSelfAuditPeriod] = useState("");
  const [selfAuditUnit, setSelfAuditUnit] = useState("");
  const [hrselfAuditPeriod, setHrSelfAuditPeriod] = useState("");
  const [hrselfAuditUnit, setHrSelfAuditUnit] = useState("");

  const [assetsImg1, setAssetsImg1] = useState(null);
  const [assetsImg2, setAssetsImg2] = useState(null);
  const [assetsImg3, setAssetsImg3] = useState(null);
  const [assetsImg4, setAssetsImg4] = useState(null);

  const [assetsValue, setAssetsValue] = useState("");
  const [assetsCurrentValue, setAssetsCurrentValue] = useState("");

  const [remark, setRemark] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  const inWarrantyOption = ["No", "Yes"];
  const assetsCat = ["jio", "Air"];
  const subCat = ["Charger", "Laptop"];

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("assetsName", assetsName);
      formData.append("assetsID", assetsID);
      formData.append("assetsOtherID", assetsOtherID);
      formData.append("warrantyDate", warrantyDate);
      formData.append("inWarranty", inWarranty);
      formData.append("dateOfPurchase", dateOfPurchase);
      formData.append("assetsCategory", assetsCategory);
      formData.append("subCategory", subCategory);
      formData.append("vendorName", vendorName);
      formData.append("invoiceCopy", invoiceCopy);
      formData.append("selfAuditPeriod", selfAuditPeriod);
      formData.append("selfAuditUnit", selfAuditUnit);
      formData.append("hrselfAuditPeriod", hrselfAuditPeriod);
      formData.append("hrselfAuditUnit", hrselfAuditUnit);

      formData.append("assetsImg1", assetsImg1);
      formData.append("assetsImg2", assetsImg2);
      formData.append("assetsImg3", assetsImg3);
      formData.append("assetsImg4", assetsImg4);

      formData.append("assetsValue", assetsValue);
      formData.append("assetsCurrentValue", assetsCurrentValue);
      formData.append("remark", remark);
      formData.append("created_by", loginUserId);
      formData.append("status", "Available");

      axios.post("http://34.93.135.33:8080/api/add_sim", formData, {});
      setAssetsName("");
      setVendorName("");
      setAssetsID("");
      setAssetsCategory("");
      setDepartment("");
      setDesignation("");
      setRemark("");
      setRegister("");

      toastAlert("Form Submitted success");
      setIsFormSubmitted(true);
    } catch {
      console.error("Error:", error);
      toastAlert("Form submission failed. Please try again.");
    }
  };

  if (isFormSubmitted) {
    return <Navigate to="/sim-overview" />;
  }
  return (
    <div style={{ width: "80%", margin: "0 0 0 10%" }}>
      <UserNav />
      <div className="form-heading">
        <div className="form_heading_title">
          <h2>Assets Registration</h2>
        </div>
      </div>
      <form mainTitle="Assets" title="Assets Register" onSubmit={handleSubmit}>
        <div className="formarea">
          <div className="row spacing_lg">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <TextField
                id="outlined-basic"
                label="Assets Name"
                type="text"
                value={assetsName}
                onChange={(e) => setAssetsName(e.target.value)}
              />

              <TextField
                id="outlined-basic"
                label="Assets ID"
                type="number"
                value={assetsID}
                onChange={(e) => setAssetsID(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Assets Other ID"
                type="number"
                value={assetsOtherID}
                onChange={(e) => setAssetsOtherID(e.target.value)}
              />

              <Autocomplete
                disablePortal
                sx={{ width: 600 }}
                id="combo-box-demo"
                options={inWarrantyOption}
                value={inWarranty}
                onChange={(e, newvalue) => setInWarranty(newvalue)}
                defaultValue={inWarrantyOption[0]}
                renderInput={(params) => (
                  <TextField {...params} label="In Warranty" />
                )}
              />

              {inWarranty == "Yes" && (
                <div className="form-group">
                  <TextField
                    id="outlined-basic"
                    InputLabelProps={{ shrink: true }}
                    label="Warranty Date"
                    type="date"
                    value={warrantyDate}
                    onChange={(e) => setWarrantyDate(e.target.value)}
                  />
                </div>
              )}

              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  InputLabelProps={{ shrink: true }}
                  label="Date of Purchase"
                  type="date"
                  value={dateOfPurchase}
                  onChange={(e) => setDateOfPurchase(e.target.value)}
                />
              </div>

              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={assetsCat}
                  value={assetsCategory}
                  onChange={(e, newvalue) => setAssetsCategory(newvalue)}
                  defaultValue={assetsCat[0]}
                  renderInput={(params) => (
                    <TextField {...params} label="Assets Category" />
                  )}
                />
              </div>

              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={subCat}
                  value={subCategory}
                  onChange={(e, newvalue) => setSubCategory(newvalue)}
                  defaultValue={subCat[0]}
                  renderInput={(params) => (
                    <TextField {...params} label="Sub Category" />
                  )}
                />
              </div>

              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={subCat}
                  value={vendorName}
                  onCanPlay={(e, newvalue) => setVendorName(newvalue)}
                  defaultValue={subCat[0]}
                  renderInput={(params) => (
                    <TextField {...params} label="Vendor Name" />
                  )}
                />
              </div>

              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  InputLabelProps={{ shrink: true }}
                  label="Invoice Copy"
                  type="file"
                  onChange={(e) => setInvoiceCopy(e.target.files[0])}
                />
              </div>

              <h5>User Audit</h5>
              <hr />
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="Self Audit Period"
                  type="text"
                  value={selfAuditPeriod}
                  onChange={(e) => setSelfAuditPeriod(e.target.value)}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="Self Audit Unit"
                  type="number"
                  value={selfAuditUnit}
                  onChange={(e) => setSelfAuditUnit(e.target.value)}
                />
              </div>
              <hr />
              <h5>HR Audit</h5>
              <hr />
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="HR Self Audit Period"
                  type="text"
                  value={hrselfAuditPeriod}
                  onChange={(e) => setHrSelfAuditPeriod(e.target.value)}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="HR Self Audit Unit"
                  type="number"
                  value={hrselfAuditUnit}
                  onChange={(e) => setHrSelfAuditUnit(e.target.value)}
                />
              </div>
              <hr />
              <h5>Assets Image</h5>
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  InputLabelProps={{ shrink: true }}
                  label="IMG 1"
                  type="file"
                  onChange={(e) => setAssetsImg1(e.target.files[0])}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  InputLabelProps={{ shrink: true }}
                  label="IMG 2"
                  type="file"
                  onChange={(e) => setAssetsImg2(e.target.files[0])}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  InputLabelProps={{ shrink: true }}
                  label="IMG 3"
                  type="file"
                  onChange={(e) => setAssetsImg3(e.target.files[0])}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  InputLabelProps={{ shrink: true }}
                  label="IMG 4"
                  type="file"
                  onChange={(e) => setAssetsImg4(e.target.files[0])}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="Assets Value"
                  type="number"
                  value={assetsValue}
                  onChange={(e) => setAssetsValue(e.target.value)}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="Assets Current Value"
                  type="number"
                  value={assetsCurrentValue}
                  onChange={(e) => setAssetsCurrentValue(e.target.value)}
                />
              </div>
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="Remark"
                  Tag="textarea"
                  rows="3"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SimMaster;
