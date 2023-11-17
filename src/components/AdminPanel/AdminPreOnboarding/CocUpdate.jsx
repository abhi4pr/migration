import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { AiOutlineReload } from "react-icons/ai";
import { useGlobalContext } from "../../../Context/Context";
import Select from "react-select";
import WhatsappAPI from "../../WhatsappAPI/WhatsappAPI";

const CocUpdate = () => {
  const { id } = useParams();
  const { toastAlert } = useGlobalContext();
  const [displaySeq, setDisplaySeq] = useState("");
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  const [subHeadingSeq, setSubHeadingSeq] = useState("");
  const [description, setDescription] = useState("");
  const [remarks, setRemarks] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  useEffect(() => {
    axios.get(`http://34.93.135.33:8080/api/get_single_coc/${id}`).then((res) => {
      const fetchedData = res.data.data;
      setDisplaySeq(fetchedData.display_sequence);
      setHeading(fetchedData.heading);
      setSubHeading(fetchedData.sub_heading);
      setSubHeadingSeq(fetchedData.sub_heading_sequence);
      setDescription(fetchedData.description);
      setRemarks(fetchedData.remarks);
    });
  }, []);  

  const handleSubmit = async (e) => {
    e.preventDefault();
                
      await axios.put(`http://34.93.135.33:8080/api/update_coc/`,{
        _id: id,
        display_sequence: displaySeq,
        heading: heading,
        sub_heading: subHeading,
        sub_heading_sequence: subHeadingSeq,
        description: description,
        remarks: remarks,
        updated_by: loginUserId
      });

      setDisplaySeq("");
      setHeading("");
      setSubHeading("");
      setSubHeadingSeq("");
      setDescription("");
      setRemarks("");

      toastAlert("Coc created");
      setIsFormSubmitted(true);
  };

  if (isFormSubmitted) {
    return <Navigate to="/admin/pre-onboard-coc-overview" />
  }

  const handleDateChange = (e) => {
    
  };

  return (
    <>
      <FormContainer
        mainTitle="COC"
        title="Coc Creation"
        handleSubmit={handleSubmit}
      >
        <FieldContainer
          label="Display Sequence"
          type="number"
          fieldGrid={4}
          value={displaySeq}
          onChange={(e) => setDisplaySeq(e.target.value)}
        />

        <FieldContainer
          label="Heading"
          // type="email"
          fieldGrid={4}
          required={false}
          value={heading}
          onChange={(e)=> setHeading(e.target.value)}
        />

        <FieldContainer
          label="Sub Heading"
          // type="number"
          fieldGrid={4}
          value={subHeading}
          required={false}
          onChange={(e)=> setSubHeading(e.target.value)}
          // onChange={handlePersonalContactChange}
          // onBlur={handleContentBlur}
        />

        <FieldContainer
          label="Sub Heading Sequence"
          type="number"
          fieldGrid={4}
          value={subHeadingSeq}
          onChange={(e) => setSubHeadingSeq(e.target.value)}
        />

        <FieldContainer
          // type="description"
          label="description"
          fieldGrid={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <FieldContainer
          label="Remarks"
          // type="date"
          fieldGrid={4}
          value={remarks}
          onChange={(e) => setRemarks(e.target.value)}
        />

      </FormContainer>
    </>
  );
};

export default CocUpdate;