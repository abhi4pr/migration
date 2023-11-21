import { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { useGlobalContext } from "../../Context/Context";
import WhatsappAPI from "../WhatsappAPI/WhatsappAPI";

const url = "http://34.93.135.33:8080/api/";

const ExtendJoining = ({
  gettingData,
  id,
  loginId,
  username,
  password,
  closeModal,
}) => {
  const { toastAlert } = useGlobalContext();
  const whatsappApi = WhatsappAPI();
  const [joingingExtendDate, setJoiningExtendDate] = useState("");
  const [joiningExtendReason, setJoiningExtendReason] = useState("");
  const [joingingExtendDocument, setJoiningExtendDocument] = useState(null);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 30);

  const formatDate = (date) => {
    let month = "" + (date.getMonth() + 1),
      day = "" + date.getDate(),
      year = date.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const minDate = formatDate(today);
  const maxDateFormatted = formatDate(maxDate);

  const handleJoiningExtend = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", id);
    formData.append("joining_date_extend", joingingExtendDate);
    formData.append("joining_date_extend_status", "Requested");
    formData.append("joining_date_extend_reason", joiningExtendReason);
    formData.append("joining_extend_document", joingingExtendDocument);

    try {
      // Update user
      await axios.put(`${url}update_user`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toastAlert("Extend Date Requested Successfully");

      // Send email
      const emailResponse = await axios.post(`${url}add_send_user_mail`, {
        email: "lalit@creativefuel.io",
        subject: "User Pre Onboarding Extend Date",
        text: joiningExtendReason,
        attachment: "",
        login_id: loginId,
        name: username,
        password: password,
      });
      console.log("Email sent successfully:", emailResponse.data);

      // Call WhatsApp API
      await whatsappApi.callWhatsAPI(
        "CF_Extend_request_new",
        "9826116769",
        username,
        [username, joingingExtendDate.split("-").reverse().join("-")]
      );

      // Reset form and refresh data
      setJoiningExtendDate("");
      setJoiningExtendReason("");
      setJoiningExtendDocument(null);
      gettingData();
      closeModal();
    } catch (error) {
      console.error("An error occurred:", error);
      // Handle the error appropriately
      // For example: Show an error message to the user
    }
  };

  return (
    <>
      <form>
        <div className="formarea">
          <div className="row spacing_lg">
            <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="board_form">
                <div className="form-group">
                  <TextField
                    id="outlined-basic"
                    label="Extend To"
                    variant="outlined"
                    type="date"
                    value={joingingExtendDate}
                    onChange={(e) => setJoiningExtendDate(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{
                      min: minDate,
                      max: maxDateFormatted,
                    }}
                  />
                </div>

                <div className="form-group">
                  <TextField
                    id="outlined-basic"
                    label="Reason"
                    variant="outlined"
                    type="text"
                    value={joiningExtendReason}
                    onChange={(e) => setJoiningExtendReason(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <ul className="doc_items_list">
                    <li
                      className={
                        joingingExtendDocument
                          ? "doc_item doc_item_active"
                          : "doc_item"
                      }
                    >
                      <p>Upload file</p>
                      <input
                        type="file"
                        value=""
                        onChange={(e) =>
                          setJoiningExtendDocument(e.target.files[0])
                        }
                      />
                      <span
                        className="delete"
                        onClick={() => setJoiningExtendDocument(null)}
                      >
                        <a href="#">
                          <i className="bi bi-x-lg" />
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="form-group">
                  <input
                    type="file"
                    placeholder="upload file here"
                    // value={joingingExtendDocument}
                    onChange={(e) =>
                      setJoiningExtendDocument(e.target.files[0])
                    }
                  />
                </div>
              </div>
            </div>
            {/* {allUserData?.joining_date_extend_status == "Reject" && (
              <h1>
                Request Rejected: {allUserData?.joining_date_extend_reason}
              </h1>
            )} */}
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="form-group ml-auto mr-auto text-center">
                <button
                  className="btn btn_pill btn_cmn btn_white"
                  onClick={handleJoiningExtend}
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ExtendJoining;