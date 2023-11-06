import React, { useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";
import { useGlobalContext } from "../../Context/Context";

const DigitalSignature = ({ userID, closeModal }) => {
  const { toastAlert } = useGlobalContext();

  const [signature, setSignature] = useState();

  const handleClear = () => {
    signature.clear();
  };

  const handleGenerate = () => {
    const canvas = signature.getTrimmedCanvas();
    canvas.toBlob((blob) => {
      if (blob) {
        const formData = new FormData();
        formData.append("id", userID);
        formData.append("digital_signature_image", blob);

        axios
          .put(`http://34.93.135.33:8080/api/update_user`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            closeModal();
            toastAlert("Submitted");
          });
        signature.clear();
      }
    }, "image/png");
  };

  return (
    <>
      <div style={{ border: "2px solid black", width: 500, height: 200 }}>
        <SignatureCanvas
          ref={(data) => setSignature(data)}
          canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
        />
      </div>
      <button className="btn btn-outline-danger" onClick={handleClear}>
        Clear
      </button>
      <button className="btn btn-primary" onClick={handleGenerate}>
        Save
      </button>
      <br />
    </>
  );
};

export default DigitalSignature;
