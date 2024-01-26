import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DigitalSignature from "../../../DigitalSignature/DigitalSignature";
import getDecodedToken from "../../../../utils/DecodedToken";
import axios from "axios";

const ViewEditDigiSignature = () => {
  const token = getDecodedToken();
  const loginUserId = token.id;
  const [digitalSignatureImage, setDigitalSignatureImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const gettingData = async () => {
    try {
      const response = await axios.get(
        `https://api-dot-react-migration-project.el.r.appspot.com/api/get_single_user/${loginUserId}`
      );
      const DSImage = await response?.data?.digital_signature_image_url;
      setDigitalSignatureImage(DSImage);
    } catch (error) {
      console.error("Error fetching digital signature image", error);
    }
  };

  useEffect(() => {
    gettingData();
  }, [loginUserId]);

  console.log("Image here", digitalSignatureImage);
  return (
    <>
      <div>
        Your Digital Signature is:
        {digitalSignatureImage ? (
          <img
            src={digitalSignatureImage}
            alt="Digital Signature Preview"
            style={{ maxWidth: "600px", height: "300px" }}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <button className="btn btn-primary mr-3" onClick={openModal}>
        Add New Digital Signature
      </button>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        appElement={document.getElementById("root")}
      >
        <DigitalSignature
          userID={token.id}
          closeModal={closeModal}
          gettingData={gettingData}
        />
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </>
  );
};

export default ViewEditDigiSignature;