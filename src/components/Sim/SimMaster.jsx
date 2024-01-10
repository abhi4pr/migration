import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useGlobalContext } from "../../Context/Context";
import UserNav from "../Pantry/UserPanel/UserNav";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";

const SimMaster = () => {
  const { toastAlert, toastError, categoryDataContext, getBrandDataContext } =
    useGlobalContext();
  const [assetsName, setAssetsName] = useState("");

  const [assetsID, setAssetsID] = useState("");
  const [assetsIDError, setAssetsIDError] = useState(""); // Define the error state

  const [assetsOtherID, setAssetsOtherID] = useState("");
  const [isValidcontact, setValidContact] = useState(false);
  const [assetType, setAssetType] = useState("");

  const [assetsCategory, setAssetsCategory] = useState("");
  const [assetsCategoryError, setAssetsCategoryError] = useState("");

  const [subCategory, setSubCategory] = useState("");
  const [subcategoryError, setSubCategoryError] = useState("");

  const [vendorName, setVendorName] = useState("");
  const [vendorNameError, setVendorNameError] = useState("");

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

  const [subcategoryData, setSubCategoryData] = useState([]);
  const [vendorData, setVendorData] = useState([]);

  const [finacialType, setFinacialType] = useState("");
  const [depreciation, setDescription] = useState("");

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  const [imageType, setImageType] = useState("HR");
  const inWarrantyOption = ["No", "Yes"];
  const IMGType = ["HR", "User"];
  const assettype = ["New", "Old"];
  const FinacinalType = [
    "Current assets",
    "Fixed assets",
    " Tangible assets",
    "Intangible assets",
    "Operating assets",
    "Non-operating assets",
  ];
  const [modalData, setModalData] = useState([]);
  const [modalName, setModalName] = useState("");
  const [brandName, setBrandName] = useState("");
  console.log(assetType, "asset type");

  // All Category , subcategory and vendor api here
  // const [categoryData, setCategoryData] = useState([]);
  // const getAllCategory = () => {
  //   axios
  //     .get("https://jarvis-work-backend.onrender.com/api/get_all_asset_category")
  //     .then((res) => {
  //       setCategoryData(res.data);
  //     });
  // };

  // const [brandData, setBrandData] = useState([]);
  // async function getBrandData() {
  //   const res = await axios.get(
  //     "https://jarvis-work-backend.onrender.com/api/get_all_asset_brands"
  //   );
  //   setBrandData(res.data.data);
  // }

  const getAllSubCategory = () => {
    if (assetsCategory.category_id) {
      axios
        .get(
          `https://jarvis-work-backend.onrender.com/api/get_single_asset_sub_category/${assetsCategory.category_id}`
        )
        .then((res) => {
          setSubCategoryData(res.data);
        });
    }
  };
  useEffect(() => {
    const selectedSubcat = subcategoryData.filter(
      (d) => d.sub_category_id === subCategory.sub_category_id
    );
    if (selectedSubcat) {
      setInWarranty(selectedSubcat[0]?.inWarranty);
    }
  }, [subCategory.sub_category_id, subcategoryData]);

  const getAllVendor = () => {
    axios.get("https://jarvis-work-backend.onrender.com/api/get_all_vendor").then((res) => {
      setVendorData(res.data);
    });
  };
  async function getModalData() {
    const res = await axios.get(
      "https://jarvis-work-backend.onrender.com/api/get_all_asset_modals"
    );
    setModalData(res.data);
  }

  useEffect(() => {
    const selectedCategory = categoryDataContext.filter(
      (d) => d.category_id === assetsCategory.category_id
    );
    if (selectedCategory) {
      setSelfAuditPeriod(selectedCategory[0]?.selfAuditPeriod);
      setSelfAuditUnit(selectedCategory[0]?.selfAuditUnit);
      setHrSelfAuditPeriod(selectedCategory[0]?.hrAuditPeriod);
      setHrSelfAuditUnit(selectedCategory[0]?.hrAuditUnit);
    }
  }, [assetsCategory.category_id, categoryDataContext]);
  useEffect(() => {
    getModalData();
    // getBrandData();
    // getAllCategory();
    getAllVendor();
  }, []);

  useEffect(() => {
    getAllSubCategory();
  }, [assetsCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (assetsID === "") {
      setAssetsIDError("Assets ID is required");
    }
    if (!assetsCategory || !assetsCategory.category_id) {
      setAssetsCategoryError("Assets Category is required");
    }
    if (!subCategory || !subCategory.sub_category_id) {
      setSubCategoryError("Assets SubCategory is required");
    }
    if (!vendorName || !vendorName.vendor_id) {
      setVendorNameError("Vendor Name is required");
    }
    try {
      const formData = new FormData();
      formData.append("assetsName", assetsName);
      formData.append("sim_no", assetsID);
      formData.append("assetsOtherID", assetsOtherID);
      formData.append("s_type", String(assetType));
      formData.append("asset_modal_id", modalName.asset_modal_id);
      formData.append("asset_brand_id", brandName.asset_brand_id);
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
      formData.append("asset_financial_type", finacialType);
      formData.append("depreciation_percentage", depreciation);
      formData.append("status", "Available");

      //There is asssets post data api
      const response = await axios.post(
        "https://jarvis-work-backend.onrender.com/api/add_sim",
        formData
      );

      const responseSimID = await response.data.simv.sim_id;

      const imageData = new FormData();
      imageData.append("sim_id", responseSimID);
      imageData.append("uploaded_by", 90);
      imageData.append("type", imageType);
      imageData.append("img1", assetsImg1);
      imageData.append("img2", assetsImg2);
      imageData.append("img3", assetsImg3);
      imageData.append("img4", assetsImg4);
      await axios.post(
        "https://jarvis-work-backend.onrender.com/api/add_assets_images",
        imageData
      );

      toastAlert("Form Submitted success");
      setIsFormSubmitted(true);
    } catch {
      toastError("Form submission failed. Please try again.");
    }
  };
  const handleAssetsIDChange = (e) => {
    setAssetsID(e.target.value);
    if (assetsIDError) {
      setAssetsIDError("");
    }
  };

  //Redirect to sim overview page
  if (isFormSubmitted) {
    return <Navigate to="/sim-overview" />;
  }
  return (
    <div style={{ width: "80%", margin: "0 0 0 10%" }}>
      <UserNav />
      <div className="form-heading">
        <div className="action_heading">
          <div className="form_heading_title">
            <h2>Assets Registration</h2>
          </div>
        </div>
        <div className="action_btns">
          <Link to="/brand-mast">
            <button type="button" className="btn btn-outline-primary btn-sm">
              Brand Master
            </button>
          </Link>
          <Link to="/modal-mast">
            <button type="button" className="btn btn-outline-primary btn-sm">
              Add Modal
            </button>
          </Link>
        </div>
      </div>
      <form mainTitle="Assets" title="Assets Register" onSubmit={handleSubmit}>
        <div className="formarea">
          <div className="row">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={assettype}
                  value={assetType}
                  onChange={(e, newvalue) => setAssetType(newvalue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Asset Type" />
                  )}
                />
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={categoryDataContext.map((cat) => ({
                    label: cat.category_name,
                    value: cat.category_id,
                  }))}
                  // value={assetsCategory}
                  onChange={(e, newvalue) => {
                    // if (newvalue != null) {
                    setAssetsCategory({
                      label: newvalue.label,
                      category_id: newvalue.value,
                    });
                    // console.log(newvalue, "there is new value");
                    if (assetsCategoryError) {
                      setAssetsCategoryError("");
                    }
                    // }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Assets Category *"
                      error={!!assetsCategoryError}
                      helperText={assetsCategoryError}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={subcategoryData.map((sub) => ({
                    label: sub.sub_category_name,
                    value: sub.sub_category_id,
                  }))}
                  value={subCategory}
                  onChange={(e, newvalue) => {
                    setSubCategory((pre) => ({
                      label: newvalue.label,
                      sub_category_id: newvalue.value,
                    }));
                    if (subcategoryError) {
                      setSubCategoryError("");
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Sub Category *"
                      error={!!subcategoryError}
                      helperText={subcategoryError}
                    />
                  )}
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={getBrandDataContext.map((cat) => ({
                    label: cat.asset_brand_name,
                    value: cat.asset_brand_id,
                  }))}
                  onChange={(e, newvalue) => {
                    if (newvalue != null) {
                      setBrandName((pre) => ({
                        label: newvalue.label,
                        asset_brand_id: newvalue.value,
                      }));
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Brand Name" />
                  )}
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group ">
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="Assets Name"
                  type="text"
                  value={assetsName}
                  onChange={(e) => setAssetsName(e.target.value)}
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={modalData.map((cat) => ({
                    label: cat.asset_modal_name,
                    value: cat.asset_modal_id,
                  }))}
                  onChange={(e, newvalue) => {
                    if (newvalue != null) {
                      setModalName((pre) => ({
                        label: newvalue.label,
                        asset_modal_id: newvalue.value,
                      }));
                    }
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Add Modal" />
                  )}
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="Assets ID *"
                  type="number"
                  value={assetsID}
                  // onChange={(e) => setAssetsID(e.target.value)}
                  onChange={handleAssetsIDChange}
                  error={!!assetsIDError}
                  helperText={assetsIDError}
                />
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="Assets Other ID"
                  type="number"
                  value={assetsOtherID}
                  onChange={(e) => setAssetsOtherID(e.target.value)}
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  disabled
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
              <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
                <div className="form-group">
                  <TextField
                    fullWidth={true}
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

            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  InputLabelProps={{ shrink: true }}
                  label="Date of Purchase"
                  type="date"
                  value={dateOfPurchase}
                  onChange={(e) => setDateOfPurchase(e.target.value)}
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={vendorData.map((vendor) => ({
                    label: vendor.vendor_name,
                    value: vendor.vendor_id,
                  }))}
                  value={vendorName}
                  onChange={(e, newvalue) => {
                    setVendorName((pre) => ({
                      label: newvalue.label,
                      vendor_id: newvalue.value,
                    }));
                    if (vendorNameError) {
                      setVendorNameError("");
                    }
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Vendor Name *"
                      error={!!vendorNameError}
                      helperText={vendorNameError}
                    />
                  )}
                />
              </div>
            </div>

            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  fullWidth={true}
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
                  fullWidth={true}
                  id="outlined-basic"
                  label="Self Audit Period in days"
                  type="number"
                  disabled={true}
                  value={selfAuditPeriod}
                  onChange={(e) => setSelfAuditPeriod(e.target.value)}
                />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  fullWidth={true}
                  disabled={true}
                  id="outlined-basic"
                  label="Self Audit Unit"
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
                  fullWidth={true}
                  id="outlined-basic"
                  label="HR Self Audit Period in days"
                  type="number"
                  disabled={true}
                  value={hrselfAuditPeriod}
                  onChange={(e) => setHrSelfAuditPeriod(e.target.value)}
                />
              </div>
            </div>

            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  fullWidth={true}
                  disabled={true}
                  id="outlined-basic"
                  label="HR Self Audit Unit"
                  value={hrselfAuditUnit}
                  onChange={(e) => setHrSelfAuditUnit(e.target.value)}
                />
              </div>
            </div>

            <h5 className="mb-3">Assets Image</h5>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  fullWidth={true}
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
                  fullWidth={true}
                  id="outlined-basic"
                  InputLabelProps={{ shrink: true }}
                  label="IMG 2"
                  type="file"
                  onChange={(e) => setAssetsImg2(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  InputLabelProps={{ shrink: true }}
                  label="IMG 3"
                  type="file"
                  onChange={(e) => setAssetsImg3(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  InputLabelProps={{ shrink: true }}
                  label="IMG 4"
                  type="file"
                  onChange={(e) => setAssetsImg4(e.target.files[0])}
                />
              </div>
            </div>
            <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-12">
              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  disabled
                  // sx={{ width: 600 }}
                  id="combo-box-demo"
                  options={IMGType}
                  value={imageType}
                  onChange={(e, newvalue) => setImageType(newvalue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Type" />
                  )}
                />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="Assets Value"
                  type="number"
                  value={assetsValue}
                  onChange={(e) => setAssetsValue(e.target.value)}
                />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="Assets Current Value"
                  type="number"
                  value={assetsCurrentValue}
                  onChange={(e) => setAssetsCurrentValue(e.target.value)}
                />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
              <div className="form-group form_select">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={FinacinalType}
                  value={finacialType}
                  onChange={(e, newvalue) => setFinacialType(newvalue)}
                  renderInput={(params) => (
                    <TextField {...params} label="Assets Finacial Type" />
                  )}
                />
              </div>
            </div>
            <div className="col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="
                  Depreciation Percentage"
                  type="number"
                  value={depreciation}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group">
                <TextField
                  fullWidth={true}
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

export default SimMaster;
