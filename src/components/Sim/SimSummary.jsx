import axios from "axios";
import React, { useEffect, useState } from "react";
import FormContainer from "../AdminPanel/FormContainer";
import UserNav from "../Pantry/UserPanel/UserNav";
import { useParams } from "react-router";
import jwtDecode from "jwt-decode";

const SimSummary = () => {
  const [showInfo, setShowInfo] = useState({});
  const { id } = useParams();

  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const loginUserId = decodedToken.id;

  function getData() {
    axios
      .get(`http://34.93.135.33:8080/api/get_allocation_data_by_id/${id}`)
      .then((res) => setShowInfo(res.data));
  }
  useEffect(() => {
    // if (id) {
    getData();
  }, []);

  // }, [id]);

  function handleDelete(e, sum) {
    e.preventDefault();
    axios
      .put("http://34.93.135.33:8080/api/update_allocationsim", {
        sim_id: sum.sim_id,
        id: sum.allo_id,
        user_id: sum.user_id,
        dept_id: sum.dept_id,
        status: "Deleted",
        submitted_by: loginUserId,
        Last_updated_by: loginUserId,
        Reason: sum.reason,
        // submitted_at: submissionDate,
      })
      .then(() => getData());
  }

  // console.log(showInfo, "show info");
  return (
    <>
      <div>
        <UserNav />

        <div className="section section_padding sec_bg h100vh">
          <div className="container">
            <div className="action_heading">
              <div className="action_title">
                <FormContainer
                  mainTitle="Sim"
                  link="/sim-master"
                  // buttonAccess={buttonAccess}
                />
              </div>
            </div>
            <div className="summary_cards">
              {showInfo.length > 0 &&
                showInfo.map((sum) => {
                  const lastUpdatedDate = new Date(sum.Last_updated_date);
                  const submittedDate = new Date(sum.submitted_at);
                  const differenceInMilliseconds =
                    submittedDate - lastUpdatedDate;
                  const differenceInDays =
                    differenceInMilliseconds / (1000 * 60 * 60 * 24);

                  return (
                    <div className="summary_card" key={sum.id}>
                      <div className="summary_cardtitle">
                        <h5>
                          Allocated user - <span>{sum.user_name}</span>
                        </h5>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          title="Delete"
                          onClick={(e) => handleDelete(e, sum)}
                        >
                          <i class="bi bi-trash3"></i>
                        </button>
                      </div>
                      <div className="summary_cardbody">
                        <div className="summary_cardrow">
                          <div className="summary_box summary_allocatebox">
                            <h4>
                              <span>Allocated date</span>
                              {sum.Creation_date
                                ? sum.Creation_date.slice(0, 10)
                                : ""}
                            </h4>
                          </div>
                          <div className="summary_box summary_returnbox">
                            <h4>
                              <span>Returned date</span>
                              {sum.submitted_at
                                ? sum.submitted_at.slice(0, 10)
                                : ""}
                            </h4>
                          </div>
                          <div className="summary_box summary_numbox">
                            <h4>
                              <span>Mobile Number</span>
                              {sum.mobile_number}
                            </h4>
                          </div>
                        </div>
                        <div className="summary_box summary_reasonbox">
                          <h4>
                            <span>Reason</span>
                            {sum.reason}
                          </h4>
                        </div>
                        <div className="summary_box summary_returnbox">
                          <h4>
                            <span>Date difference (in days)</span>
                            {differenceInDays}
                          </h4>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <div style={{ width: "80%", margin: "0 0 0 10%" }}></div>
    </>
  );
};

export default SimSummary;
