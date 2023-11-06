import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useGlobalContext } from "../../../Context/Context";

const OfficeMast = () => {
  const { toastAlert } = useGlobalContext();
  const [sittingMast, setSittingMast] = useState("");
  const [roomimage, setRoomImage] = useState("");
  const [remark, setRemark] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [officeData, setOfficeData] = useState([]);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  useEffect(() => {
    axios.get("http://34.93.135.33:8080/api/get_all_rooms").then((res) => {
      setOfficeData(res.data.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("sitting_ref_no", sittingMast);
    formData.append("room_image", roomimage);
    formData.append("remarks", remark);
    formData.append("created_by", loginUserId);
    try {
      const isLoginIdExists = officeData.some(
        (data) => data.sitting_ref_no === sittingMast
      );
      if (isLoginIdExists) {
        alert("this Room No already exists");
      } else {
        await axios.post("http://34.93.135.33:8080/api/add_room", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSittingMast("");
        setRemark("");
        setCreatedBy("");

        toastAlert("Form Submitted success");
        setIsFormSubmitted(true);
      }
    } catch (error) {
      console.log("Failed to submit form", error);
    }
  };

  if (isFormSubmitted) {
    return <Navigate to="/admin/office-mast-overview" />;
  }
  return (
    <>
      <FormContainer
        mainTitle="Office"
        title="Office Register"
        handleSubmit={handleSubmit}
      >
        <FieldContainer
          label="Sitting Area (Room)"
          type="number"
          value={sittingMast}
          onChange={(e) => setSittingMast(e.target.value)}
        />
        <FieldContainer
          label="Room Image"
          type="file"
          fieldGrid={3}
          onChange={(e) => setRoomImage(e.target.files[0])}
        />
        <FieldContainer
          label="Created By"
          value={createdBy}
          fieldGrid={3}
          onChange={(e) => setCreatedBy(e.target.value)}
          disabled
        />
        <FieldContainer
          label="Remark"
          Tag="textarea"
          rows={3}
          required={false}
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
      </FormContainer>
    </>
  );
};

export default OfficeMast;
