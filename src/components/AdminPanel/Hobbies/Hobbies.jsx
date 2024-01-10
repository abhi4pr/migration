import React, { useState, useEffect } from "react";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import axios from "axios";
import { useGlobalContext } from "../../../Context/Context";
import { useNavigate, useParams } from "react-router-dom";

const Hobbies = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toastAlert } = useGlobalContext();
  const [hobby, setHobby] = useState("");

  useEffect(() => {
    if (id !== 0) getData();
  }, [id]);

  const getData = async () => {
    try {
      const response = await axios.get(
        `https://jarvis-work-backend.onrender.com/api/get_single_hobby/${id}`
      );
      const hobbyName = response.data.data.hobby_name;
      setHobby(hobbyName);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id == 0) {
        const response = await axios.post(
          "https://jarvis-work-backend.onrender.com/api/add_hobby",
          {
            hobby_name: hobby,
          }
        );
      } else {
        const response = await axios.put(
          `https://jarvis-work-backend.onrender.com/api/update_hobby`,
          {
            hobby_id: id,
            hobby_name: hobby,
          }
        );
      }
      toastAlert("Submited Succesfully");
      setHobby("");
      navigate("/admin/hobbies-overview");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <FormContainer
        mainTitle="Hobbies"
        title="Hobbies Creation"
        handleSubmit={handleSubmit}
      >
        <FieldContainer
          label="Hobbie"
          fieldGrid={3}
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
        />
      </FormContainer>
    </>
  );
};

export default Hobbies;
