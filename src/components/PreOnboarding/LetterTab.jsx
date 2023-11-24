import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import DigitalSignature from "../DigitalSignature/DigitalSignature";
import { TextField } from "@mui/material";
import { FcDownload } from "react-icons/fc";

const LetterTab = ({ allUserData, gettingData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reasonField, setReasonField] = useState(false);
  const [reason, setReason] = useState("");

  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const todayDate = `${year}-${month}-${day}`;

  const handleReject = () => {
    const formData = new FormData();
    formData.append("user_id", allUserData.user_id);
    formData.append("offer_later_status", false);
    formData.append("offer_later_reject_reason", reason);

    axios
      .put(`http://34.93.135.33:8080/api/update_user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        gettingData();
        setReason("");
      });
  };

  return (
    <>
      <button
        className="btn btn-primary"
        onClick={() => {
          setIsModalOpen(true), setReasonField(false);
        }}
      >
        Accept
      </button>
      <button className="btn btn-danger" onClick={() => setReasonField(true)}>
        Reject
      </button>

      <FcDownload
        onClick={() =>
          window.open(
            allUserData.offer_later_pdf_url,
            "_blank",
            "noopener,noreferrer"
          )
        }
      />

      {reasonField && (
        <>
          <div className="form-group">
            <TextField
              id="outlined-basic"
              label="Reason"
              variant="outlined"
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={() => handleReject()}>
            Submit
          </button>
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Example Modal"
        appElement={document.getElementById("root")}
      >
        <DigitalSignature
          userID={allUserData.user_id}
          closeModal={() => setIsModalOpen(false)}
          offetLetterAcceptanceDate={todayDate}
          offerLetterStatus={true}
          gettingData={gettingData}
        />
      </Modal>
    </>
  );
};

export default LetterTab;
