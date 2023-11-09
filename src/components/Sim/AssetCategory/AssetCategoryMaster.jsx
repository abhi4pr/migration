import React, { useState } from "react";
import FormContainer from "../../AdminPanel/FormContainer";
import FieldContainer from "../../AdminPanel/FieldContainer";
import { useGlobalContext } from "../../../Context/Context";
import jwtDecode from "jwt-decode";
import axios from "axios";
import UserNav from "../../Pantry/UserPanel/UserNav";

const AssetCategoryMaster = () => {
  const { toastAlert } = useGlobalContext();
  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://192.168.29.116:8080/api/add_asset_category", {
        category_name: categoryName,
        description: description,
        created_by: loginUserId,
        last_updated_by: loginUserId,
      });
      toastAlert("Data posted successfully!");
      setCategoryName("");
      setDescription("");
    } catch (error) {
      toastAlert("Failed to post data. Please try again later.");
    }
  };
  return (
    <>
      <UserNav />
      <div style={{ width: "80%", margin: "40px 0 0 10%" }}>
        <FormContainer
          mainTitle="Asset "
          title="Category Master"
          handleSubmit={handleSubmit}
          buttonAccess={false}
        >
          <FieldContainer
            label="Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <FieldContainer
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormContainer>
      </div>
    </>
  );
};

export default AssetCategoryMaster;
