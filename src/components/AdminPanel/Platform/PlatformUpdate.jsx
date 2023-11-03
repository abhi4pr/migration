import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useGlobalContext } from "../../../Context/Context";
import jwtDecode from "jwt-decode";

const PlatformUpdate = () => {
  const { toastAlert } = useGlobalContext();
  const { id } = useParams();
  const [platformName, setPlatformName] = useState("");
  const [remark, setRemark] = useState("");
  const [error, setError] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userID = decodedToken.id;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    axios
      .put(`http://44.211.225.140:8000/platformupdate/`, {
        id: Number(id),
        name: platformName,
        remark: remark,
        last_updated_by: userID
      })
      .then(() => {
        setPlatformName("");
        setRemark("");
      })
      .catch((error) => {
        setError("An error occurred while submitting the form.");
        console.error(error);
      });

    toastAlert("Submit Success");
    setIsFormSubmitted(true);
  };

  useEffect(() => {
    axios.get(`http://44.211.225.140:8000/dataofplatform/${id}`).then((res) => {
      const fetchedData = res.data[0];
      const {
        name,
        remark
      } = fetchedData;
      setPlatformName(name);
      setRemark(remark);
      setSimData(fetchedData);
    });
  }, [id]);

  if (isFormSubmitted) {
    return <Navigate to="/admin/platform-overview" />;
  }
  return (
    <>
      <FormContainer
        mainTitle="Platform"
        title="Platform Update"
        handleSubmit={handleSubmit}
      >
        <FieldContainer
          label="Platform Name"
          value={platformName}
          onChange={(e) => setPlatformName(e.target.value)}
        />

        <FieldContainer
          label="Remark"
          rows={"4"}
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />

        {error && <p style={{ color: "red" }}>{error}</p>}
      </FormContainer>
    </>
  );
};

export default PlatformUpdate;
