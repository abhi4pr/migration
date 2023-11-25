import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useGlobalContext } from "../../Context/Context";
import UserNav from "../Pantry/UserPanel/UserNav";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

const SimUpdate = () => {
  const { toastAlert } = useGlobalContext();
  const [assetsName, setAssetsName] = useState("");
  const [assetsID, setAssetsID] = useState("");
  const [assetsOtherID, setAssetsOtherID] = useState("");
  const [isValidcontact, setValidContact] = useState(false);
  // const [isContactTouched, setisContactTouched] = useState(false);

  const [assetType, setAssetType] = useState("");
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

  const [assetsValue, setAssetsValue] = useState("");
  const [assetsCurrentValue, setAssetsCurrentValue] = useState("");

  const [remark, setRemark] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [categoryData, setCategoryData] = useState([]);
  const [subcategoryData, setSubCategoryData] = useState([]);
  const [vendorData, setVendorData] = useState([]);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  const inWarrantyOption = ["No", "Yes"];
  const assettype = ["New", "Old"];
  const { id } = useParams();

  // All Category , subcategory and vendor api here
  const getAllCategory = () => {
    axios
      .get("http://34.93.135.33:8080/api/get_all_asset_category")
      .then((res) => {
        setCategoryData(res.data);
      });
  };
  const getAllSubCategory = () => {
    axios
      .get("http://34.93.135.33:8080/api/get_all_asset_sub_category")
      .then((res) => {
        setSubCategoryData(res.data);
      });
  };
  const getAllVendor = () => {
    axios.get("http://34.93.135.33:8080/api/get_all_vendor").then((res) => {
      setVendorData(res.data);
    });
  };
  useEffect(() => {
    getAllCategory();
    getAllSubCategory();
    getAllVendor();
  }, []);

  useEffect(() => {
    axios
      .get(`http://34.93.135.33:8080/api/get_single_sim/${20}`)
      .then((res) => {
        const fetchedData = res.data.data;
        //if (fetchedData.length > 0) {

        const {
          asset_id,
          asset_type,
          assetsName,
          assetsOtherID,
          category_id,
          status,
          sub_category_id,
          vendor_id,
          inWarranty,
          warrantyDate,
          selfAuditPeriod,
          selfAuditUnit,
          assetsValue,
          assetsCurrentValue,
          category_name,
          sub_category_name,
          vendor_name,
          dateOfPurchase,
        } = fetchedData;
        setAssetsName(assetsName);
        setAssetsID(asset_id);
        setAssetsOtherID(assetsOtherID);
        setAssetType(asset_type);
        setAssetsCategory(category_id);
        setSubCategory(sub_category_id);
        setVendorName(vendor_id);

        setInWarranty(inWarranty);
        setWarrantyDate();
        setDateOfPurchase();
        setSelfAuditPeriod(selfAuditPeriod);
        setSelfAuditUnit(selfAuditUnit);
        setHrSelfAuditPeriod();
        setHrSelfAuditUnit();
        setAssetsValue(assetsValue);
        setAssetsCurrentValue(assetsCurrentValue);
        setRemark;
        //}
        setSimData(fetchedData);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("assetsName", assetsName);
    formData.append("sim_no", assetsID);
    formData.append("assetsOtherID", assetsOtherID);
    formData.append("s_type", assetType);
    formData.append("warrantyDate", warrantyDate);
    formData.append("inWarranty", inWarranty);
    formData.append("dateOfPurchase", dateOfPurchase);
    formData.append("category_id", assetsCategory.category_id);
    formData.append("sub_category_id", subCategory.sub_category_id);
    formData.append("vendor_id", vendorName.vendor_id);
    formData.append("invoiceCopy", invoiceCopy);
    formData.append("selfAuditPeriod", selfAuditPeriod);
    formData.append("selfAuditUnit", selfAuditUnit);
    formData.append("hrselfAuditPeriod", hrselfAuditPeriod);
    formData.append("hrselfAuditUnit", hrselfAuditUnit);
    formData.append("assetsValue", assetsValue);
    formData.append("assetsCurrentValue", assetsCurrentValue);
    formData.append("remark", remark);
    formData.append("created_by", loginUserId);
    formData.append("status", "Available");

    axios.put(
      "http://34.93.135.33:8080/api/update_sim",
      formData
      // id: simId,
      // mobilenumber: mobileNumber,
      // sim_no: simNumber,
      // provider: provider,
      // status: status,
      // dept_id: Number(department),
      // desi_id: Number(designation),
      // s_type: simType,
      // type: type,
      // remark: remark,
      // createdBy: loginUserId,
      // register: register,
    );

    toastAlert("Form Submitted success");
    setIsFormSubmitted(true);
  };

  if (isFormSubmitted) {
    return <Navigate to="/sim-overview" />;
  }
  return (
    <div style={{ margin: "0 0 0 10%", width: "80%" }}>
      <UserNav />
      <div className="form-heading">
        <div className="form_heading_title">
          <h2>Assets Update</h2>
        </div>
      </div>
      <form mainTitle="Assets" title="Assets Register" onSubmit={handleSubmit}>
        <div className="formarea">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group ">
                <TextField
                  id="outlined-basic"
                  label="Assets Name"
                  type="text"
                  value={assetsName}
                  onChange={(e) => setAssetsName(e.target.value)}
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="Assets ID"
                  type="number"
                  value={assetsID}
                  onChange={(e) => setAssetsID(e.target.value)}
                />
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="Assets Other ID"
                  type="number"
                  value={assetsOtherID}
                  onChange={(e) => setAssetsOtherID(e.target.value)}
                />
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  // sx={{ width: 600 }}
                  id="combo-box-demo"
                  options={inWarrantyOption}
                  value={inWarranty}
                  onChange={(e, newvalue) => setInWarranty(newvalue)}
                  defaultValue={inWarrantyOption[0]}
                  renderInput={(params) => (
                    <TextField {...params} label="In Warranty" />
                  )}
                />
              </div>
            </div>

            {inWarranty == "Yes" && (
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
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
              </div>
            )}
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  // sx={{ width: 600 }}
                  id="combo-box-demo"
                  options={assettype}
                  value={assetType}
                  onChange={(e, newvalue) => setAssetType(newvalue)}
                  // defaultValue={assetcondition[0]}
                  renderInput={(params) => (
                    <TextField {...params} label="Asset Type" />
                  )}
                />
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
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
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={categoryData.map((cat) => ({
                    label: cat.category_name,
                    value: cat.category_id,
                  }))}
                  value={
                    assetsCategory
                      ? {
                          label:
                            categoryData.find(
                              (cat) => cat.category_id === assetsCategory
                            )?.category_name || "",
                          value: assetsCategory,
                        }
                      : null
                  }
                  onChange={(e, newvalue) => {
                    setAssetsCategory((pre) => ({
                      label: newvalue.label,
                      category_id: newvalue.value,
                    }));
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Assets Category" />
                  )}
                />
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={subcategoryData.map((sub) => ({
                    label: sub.sub_category_name,
                    value: sub.sub_category_id,
                  }))}
                  value={
                    subCategory
                      ? {
                          label:
                            subcategoryData.find(
                              (d) => d.sub_category_id === subCategory
                            )?.sub_category_name || "",
                          value: subCategory,
                        }
                      : null
                  }
                  onChange={(e, newvalue) => {
                    setSubCategory((pre) => ({
                      label: newvalue.label,
                      sub_category_id: newvalue.value,
                    }));
                  }}
                  // defaultValue={subCat[0]}
                  renderInput={(params) => (
                    <TextField {...params} label="Sub Category" />
                  )}
                />
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={vendorData.map((vendor) => ({
                    label: vendor.vendor_name,
                    value: vendor.vendor_id,
                  }))}
                  // value={vendorName}
                  value={
                    vendorName
                      ? {
                          label:
                            vendorData.find((d) => d.vendor_id === vendorName)
                              ?.vendor_name || "",
                          value: vendorName,
                        }
                      : null
                  }
                  onChange={(e, newvalue) => {
                    setVendorName((pre) => ({
                      label: newvalue.label,
                      vendor_id: newvalue.value,
                    }));
                  }}
                  // defaultValue={categoryData[0]}
                  renderInput={(params) => (
                    <TextField {...params} label="Vendor Name" />
                  )}
                />
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  InputLabelProps={{ shrink: true }}
                  label="Invoice Copy"
                  type="file"
                  onChange={(e) => setInvoiceCopy(e.target.files[0])}
                />
              </div>
            </div>

            <h5>User Audit</h5>
            <hr className="mb-2 mt-2" />
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="Self Audit Period"
                  type="text"
                  value={selfAuditPeriod}
                  onChange={(e) => setSelfAuditPeriod(e.target.value)}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="Self Audit Unit"
                  type="number"
                  value={selfAuditUnit}
                  onChange={(e) => setSelfAuditUnit(e.target.value)}
                />
              </div>
            </div>
            <hr className="mb-2" />
            <h5>HR Audit</h5>
            <hr className="mb-2 mt-2" />

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="HR Self Audit Period"
                  type="text"
                  value={hrselfAuditPeriod}
                  onChange={(e) => setHrSelfAuditPeriod(e.target.value)}
                />
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="HR Self Audit Unit"
                  type="number"
                  value={hrselfAuditUnit}
                  onChange={(e) => setHrSelfAuditUnit(e.target.value)}
                />
              </div>
            </div>

            <h5 className="mb-3">Assets Image</h5>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  InputLabelProps={{ shrink: true }}
                  label="IMG 1"
                  type="file"
                  onChange={(e) => setAssetsImg1(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  InputLabelProps={{ shrink: true }}
                  label="IMG 2"
                  type="file"
                  onChange={(e) => setAssetsImg2(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  InputLabelProps={{ shrink: true }}
                  label="IMG 3"
                  type="file"
                  onChange={(e) => setAssetsImg3(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  InputLabelProps={{ shrink: true }}
                  label="IMG 4"
                  type="file"
                  onChange={(e) => setAssetsImg4(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="Assets Value"
                  type="number"
                  value={assetsValue}
                  onChange={(e) => setAssetsValue(e.target.value)}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  id="outlined-basic"
                  label="Assets Current Value"
                  type="number"
                  value={assetsCurrentValue}
                  onChange={(e) => setAssetsCurrentValue(e.target.value)}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
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
            </div>
            <button className="btn btn-primary">Submit</button>
          </div>
        </div>
        {/* </div> */}
      </form>
    </div>
  );
};

export default SimUpdate;
