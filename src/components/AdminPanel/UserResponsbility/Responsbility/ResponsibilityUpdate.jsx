import { useEffect, useState } from "react";
import FieldContainer from "../../FieldContainer";
import FormContainer from "../../FormContainer";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useGlobalContext } from "../../../../Context/Context";
import { Navigate, useParams } from "react-router-dom";

const ResponsibilityUpdate = () => {
  const { id } = useParams();
  const { toastAlert } = useGlobalContext();
  const [responsibility, setResponsibility] = useState("");
  const [description, setDescription] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;

  useEffect(() => {
    axios
      .get(`http://34.93.135.33:8080/api/get_single_responsibility/${id}`)
      .then((res) => {
        const fetchedData = res.data;
        setResponsibility(fetchedData.respo_name);
        setDescription(fetchedData.description);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://34.93.135.33:8080/api/edit_responsibility/${id}`, {
      respo_name: responsibility,
      description: description,
      Last_updated_by: userId,
    });
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

export default ResponsibilityUpdate;
