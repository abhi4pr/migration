import React, { useEffect } from "react";
import axios from "axios";
import { useGlobalContext } from "../../Context/Context";

const DocumentTab = ({ documentData, setDocumentData, getDocuments }) => {
  const { toastAlert } = useGlobalContext();

  const updateDocumentData = (documentId, key, value) => {
    setDocumentData((prevDocumentData) =>
      prevDocumentData.map((doc) =>
        doc._id === documentId ? { ...doc, [key]: value } : doc
      )
    );
  };

  const handleFileUpload = (file, documentId) => {
    updateDocumentData(documentId, "file", file);
    updateDocumentData(documentId, "status", "Pending");
  };

  const handleSubmit = async () => {
    try {
      for (const document of documentData) {
        if (document.file) {
          let formData = new FormData();
          formData.append("doc_image", document.file);
          formData.append("_id", document._id);
          formData.append("status", document.status);
          const response = await axios.put(
            "http://34.93.135.33:8080/api/update_user_doc",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        } else {
          console.log(`No file uploaded for document ${document._id}`);
        }
      }
      toastAlert("Documents Updated");
      getDocuments();
    } catch (error) {
      console.error("Error submitting documents", error);
    }
  };

  return (
    <>
      <div className="documentarea">
        <div className="document_box">
          <h2>Documents</h2>

          <div className="docTable table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Document Type</th>
                  <th scope="col">Period (Days)</th>
                  <th scope="col">Time</th>
                  <th scope="col">Upload</th>
                  <th scope="col" className="text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {documentData.map((item) => (
                  <tr key={item._id}>
                    <td scope="row">{item.document.doc_type}</td>
                    <td>{item.document.period} days</td>
                    <td>1 Day</td>
                    <td>
                      <div className="uploadDocBtn">
                        <span>
                          <i className="bi bi-cloud-arrow-up" /> Upload
                        </span>
                        {/* <span className="color_success">
                          <i className="bi bi-check" /> Done
                        </span> */}
                        <input
                          type="file"
                          onChange={(e) =>
                            handleFileUpload(e.target.files[0], item._id)
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <div className="docStatus">
                        <span className="warning_badges reject">
                          <h4>
                            {item.status !== "" ? item.status : "Not Uploaded"}
                          </h4>
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="ml-auto mr-auto text-center">
            <button
              className="btn btn_pill btn_cmn btn_white"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DocumentTab;
