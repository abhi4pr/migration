import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import FormContainer from "../FormContainer";
import FieldContainer from "../FieldContainer";
import { useGlobalContext } from "../../../Context/Context";
const UserResponsbilityUpdate = () => {
  const { toastAlert } = useGlobalContext();
  const [id, setId] = useState(0);
  const [userName, setUserName] = useState("");
  const [responsbility, setResponsibility] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [submitButtonAccess, setSubmitButtonAccess] = useState(false);
  const [todos, setTodos] = useState([]);
  const [userData, getUserData] = useState([]);

  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");

  useEffect(() => {
    axios.get("http://44.211.225.140:8000/allusers").then((res) => {
      getUserData(res.data.data);
    });
  }, []);

  useEffect(() => {
    const selectedData = userData.filter(
      (data) => data.user_id == Number(userName)
    );
    if (selectedData !== 0) {
      setDepartment(selectedData[0]?.department_name);
      setDesignation(selectedData[0]?.designation_name);
    }
  }, [userName]);

  useEffect(() => {
    setId(localStorage.getItem("Job_res_id"));
    setUserName(localStorage.getItem("user_id"));
    setResponsibility(localStorage.getItem("sjob_responsibility"));
    setDescription(localStorage.getItem("description"));
    if (todos.length !== 0) {
      setSubmitButtonAccess(true);
    } else {
      setSubmitButtonAccess(false);
    }
  }, [todos]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    for (const element of todos) {
      axios
        .put(`http://34.93.135.33:8080/api/update_jobresponsibility`, {
          Job_res_id: id,
          user_id: userName,
          job_responsi: element.responsbility,
          description: element.description,
        })
        .then(() => {
          setUserName("");
          setResponsibility("");
          setDescription("");
        })
        .catch((error) => {
          setError("An error occurred while submitting the form.");
          console.error(error);
        });
    }
    setUserName("");
    setResponsibility("");
    setDescription("");
    toastAlert("Submitted success");
    setIsFormSubmitted(true);
  };
  if (isFormSubmitted) {
    return <Navigate to="/admin/user-respons-overivew" />;
  }
  const handleAddTodo = () => {
    if (responsbility.trim() === "" || description.trim() === "") {
      return;
    }
    setTodos(() => [
      // ...prevTodos,
      { description: description, responsbility: responsbility },
    ]);
    setResponsibility("");
    setDescription("");
  };
  return (
    <>
      <FormContainer
        submitButton={submitButtonAccess}
        mainTitle="Responsibility"
        title="Responsibility Update"
        handleSubmit={handleSubmit}
      >
        <FieldContainer
          label="User Name"
          Tag="select"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        >
          <option selected disabled value="">
            choose...
          </option>
          {userData.map((d) => (
            <option value={d.user_id} key={d.user_id}>
              {d.user_name}
            </option>
          ))}
        </FieldContainer>
        {userName !== "" && (
          <>
            <FieldContainer
              label="Department"
              value={department}
              fieldGrid={3}
              required={false}
            />
            <FieldContainer
              label="Designation"
              value={designation}
              fieldGrid={3}
              required={false}
            />
          </>
        )}

        <FieldContainer
          label="Responsibility"
          value={responsbility}
          onChange={(e) => setResponsibility(e.target.value)}
        />
        <FieldContainer
          label="Description"
          Tag="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12">
          <button
            className="btn btn-success"
            style={{ marginRight: "5px" }}
            type="button"
            onClick={handleAddTodo}
          >
            Add Todo
          </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </FormContainer>
      {todos.length > 0 && (
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="res_des_card">
                <div className="responsibility_main_box">
                  <div className=" d-flex">
                    <div className="responsibility_s_box">
                      <div className="profile_data_box_head">
                        <h2 className="">Responsibility</h2>
                      </div>
                    </div>
                    <div className="description_s_box">
                      <div className="profile_data_box_head">
                        <h2 className="">Description</h2>
                      </div>
                    </div>
                  </div>
                  <div className="profile_data_box_body">
                    <ul>
                      {todos.map((todo, index) => (
                        <li key={index}>
                          <span>{todo.responsbility}</span>
                          <p> {todo.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default UserResponsbilityUpdate;
