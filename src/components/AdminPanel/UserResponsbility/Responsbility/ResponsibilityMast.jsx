import { useState } from "react";
import FieldContainer from "../../FieldContainer";
import FormContainer from "../../FormContainer";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useGlobalContext } from "../../../../Context/Context";
import { Navigate } from "react-router-dom";

const ResponsibilityMast = () => {
  const { toastAlert } = useGlobalContext();
  const [responsibility, setResponsibility] = useState("");
  const [description, setDescription] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://44.211.225.140:8000/reponsi", {
      respo_name: responsibility,
      description: description,
      created_by: userId,
    });
    setResponsibility("");
    setDescription("");
    toastAlert("Form submitted");
    setIsFormSubmitted(true);
  };

  if (isFormSubmitted) {
    return <Navigate to="/admin/responsibility-overview" />;
  }
  return (
    <>
      <FormContainer
        mainTitle="Responsibility"
        title="Responsiblity"
        handleSubmit={handleSubmit}
      >
        <FieldContainer
          label="Responsibility"
          value={responsibility}
          onChange={(e) => setResponsibility(e.target.value)}
        />

        <FieldContainer
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </FormContainer>
    </>
  );
};

export default ResponsibilityMast;
