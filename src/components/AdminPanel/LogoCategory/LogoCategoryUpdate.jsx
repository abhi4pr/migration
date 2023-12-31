import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useGlobalContext } from "../../../Context/Context";
import jwtDecode from "jwt-decode";

const LogoCategoryUpdate = () => {
  const { toastAlert } = useGlobalContext();
  const { id } = useParams();
  const [categoryName, setCategoryName] = useState("");
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserID = decodedToken.id;

  useEffect(() => {
    if (id) {
      console.log(id);
      axios.get(`http://34.93.135.33:8080/api/getlogodata/${id}`);
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    axios
      .put("http://34.93.135.33:8080/api/logocatupdate", {
        id: id,
        cat_name: categoryName,
        remarks: remark,
        last_updated_by: loginUserID,
      })
      .then(() => {
        setCategoryName("");
        setRemark("");
      })
      .catch((error) => {
        setError("An error occurred while submitting the form.");
        console.error(error);
      });
    setCategoryName("");
    setRemark("");

    toastAlert("Submitted success");
    setIsFormSubmitted(true);
  };

  if (isFormSubmitted) {
    return <Navigate to="/admin/logo-category-overview" />;
  }

  return (
    <>
      <FormContainer
        mainTitle="Logo Category"
        title="Logo Category Master"
        handleSubmit={handleSubmit}
      >
        <FieldContainer
          label="Category Name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <FieldContainer
          label="Remark"
          Tag="textarea"
          value={remark}
          required={false}
          onChange={(e) => setRemark(e.target.value)}
        />
      </FormContainer>
    </>
  );
};

export default LogoCategoryUpdate;
