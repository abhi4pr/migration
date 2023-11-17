import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormContainer from "../AdminPanel/FormContainer";
import FieldContainer from "../AdminPanel/FieldContainer";
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
  const [inWarranty, setInWarranty] = useState("");
  const [warrantyDate, setWarrantyDate] = useState("");
  const [dateOfPurchase, setDateOfPurchase] = useState("");
  const [selfAuditPeriod, setSelfAuditPeriod] = useState("");
  const [selfAuditUnit, setSelfAuditUnit] = useState("");
  const [hrselfAuditPeriod, setHrSelfAuditPeriod] = useState("");
  const [hrselfAuditUnit, setHrSelfAuditUnit] = useState("");
  const [assetsValue, setAssetsValue] = useState("");
  const [assetsCurrentValue, setAssetsCurrentValue] = useState("");

  const [remark, setRemark] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  const inWarrantyOption = ["No", "Yes"];

  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("assetsName", assetsName);
    formData.append("assetsID", assetsID);
    formData.append("assetsCategory", assetsCategory);
    formData.append("subCategory", subCategory);
    formData.append("vendorName", vendorName);
    formData.append("inWarranty", inWarranty);
    formData.append("warrantyDate", warrantyDate);
    formData.append("dateOfPurchase", dateOfPurchase);
    formData.append("selfAuditPeriod", selfAuditPeriod);
    formData.append("selfAuditUnit", selfAuditUnit);
    formData.append("hrselfAuditPeriod", hrselfAuditPeriod);
    formData.append("hrselfAuditUnit", hrselfAuditUnit);
    formData.append("assetsValue", assetsValue);
    formData.append("assetsCurrentValue", assetsCurrentValue);
    formData.append("remark", remark);
    formData.append("created_by", loginUserId);
    formData.append("status", "Available");

    if (isValidcontact == true) {
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
    } else {
      alert("Enter Sim Number in Proper Format");
    }
  };

  if (isFormSubmitted) {
    return <Navigate to="/sim-overview" />;
  }
  return (
    <div style={{ width: "80%", margin: "0 0 0 10%" }}>
      <UserNav />
      <FormContainer
        mainTitle="Assets"
        title="Assets Register"
        handleSubmit={handleSubmit}
      >
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
          fieldGrid={3}
          type="number"
          value={assetsID}
          required={false}
          onChange={(e) => setAssetsID(e.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Assets Other ID"
          fieldGrid={3}
          type="number"
          value={assetsOtherID}
          required={false}
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
              label="Warranty Date"
              type="date"
              value={warrantyDate}
              required={false}
              onChange={(e) => setWarrantyDate(e.target.value)}
            />
          </div>
        )}

        <div className="form-group">
          <TextField
            id="outlined-basic"
            label="Date of Purchase"
            type="date"
            value={dateOfPurchase}
            required={false}
            onChange={(e) => setDateOfPurchase(e.target.value)}
          />
        </div>

        <div className="form-group">
          <FieldContainer
            label="Assets Category"
            Tag="select"
            value={assetsCategory}
            onChange={(e) => setAssetsCategory(e.target.value)}
          >
            <option value="Jio">Jio</option>
            <option value="Airtel">Airtel</option>
            <option value="Vodafone Idea (VI)">Vodafone Idea (VI)</option>
            <option value="BSNL">BSNL</option>
          </FieldContainer>
        </div>

        <div className="form-group">
          <FieldContainer
            label="Sub Category"
            Tag="select"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
          >
            <option value="Prepaid">Prepaid</option>
            <option value="Postpaid">Postpaid</option>
          </FieldContainer>
        </div>

        <div className="form-group">
          <FieldContainer
            label="Vendor Name"
            Tag="select"
            value={vendorName}
            onChange={(e) => setVendorName(e.target.value)}
          >
            <option value="Physical Sim">Physical Sim</option>
            <option value="E-Sim">E-Sim</option>
          </FieldContainer>
        </div>

        <div className="form-group">
          <TextField
            id="outlined-basic"
            label="Invoice Copy"
            type="file"
            required={false}
            onChange={(e) => setDateOfPurchase(e.target.files[0])}
          />
        </div>

        <h5>User Audit</h5>
        <hr />
        <div className="form-group">
          <TextField
            id="outlined-basic"
            label="Self Audit Period"
            type="text"
            required={false}
            value={selfAuditPeriod}
            onChange={(e) => setSelfAuditPeriod(e.target.value)}
          />
        </div>
        <div className="form-group">
          <TextField
            id="outlined-basic"
            label="Self Audit Unit"
            type="number"
            required={false}
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
            required={false}
            value={hrselfAuditPeriod}
            onChange={(e) => setHrSelfAuditPeriod(e.target.value)}
          />
        </div>
        <div className="form-group">
          <TextField
            id="outlined-basic"
            label="HR Self Audit Unit"
            type="number"
            required={false}
            value={hrselfAuditUnit}
            onChange={(e) => setHrSelfAuditUnit(e.target.value)}
          />
        </div>
        <hr />
        <h5>Assets Image</h5>
        <div className="form-group">
          <TextField
            id="outlined-basic"
            label="IMG 1"
            type="file"
            fieldGrid={3}
            required={false}
            onChange={(e) => setDateOfPurchase(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <TextField
            id="outlined-basic"
            label="IMG 2"
            fieldGrid={3}
            type="file"
            required={false}
            onChange={(e) => setDateOfPurchase(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <TextField
            id="outlined-basic"
            label="IMG 3"
            fieldGrid={3}
            type="file"
            required={false}
            onChange={(e) => setDateOfPurchase(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <TextField
            id="outlined-basic"
            label="IMG 4"
            fieldGrid={3}
            type="file"
            required={false}
            onChange={(e) => setDateOfPurchase(e.target.files[0])}
          />
        </div>
        <div className="form-group">
          <TextField
            id="outlined-basic"
            label="Assets Value"
            type="number"
            required={false}
            value={assetsValue}
            onChange={(e) => setAssetsValue(e.target.value)}
          />
        </div>
        <div className="form-group">
          <TextField
            id="outlined-basic"
            label="Assets Current Value"
            type="number"
            required={false}
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
            required={false}
            onChange={(e) => setRemark(e.target.value)}
          />
        </div>
      </FormContainer>
    </div>
  );
};

export default SimMaster;
