import { Button, TextField } from "@mui/material";
import { Page } from "@react-pdf/renderer";
import axios from "axios";
import { useState } from "react";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    if (email.trim() === "") {
      alert("Please enter email");
      return;
    } else {
      axios
        .post("http://34.93.135.33:8080/api/forgot_pass", {
          user_email_id: email,
        })
        .then((res) => {
          console.log(res);
          if (res.data.message === "Successfully Sent email.") {
            alert("Email sent successfully");
            setEmail("");
          } else {
            alert(res.data.message);
          }
        });
    }
  };

  return (
    // <div className="limiter newlogin">
    //     <div className="container-login100">
    //       <div className="wrap-login100"></div>
    <div style={{display:"grid",alignItems:"center" ,height:"100vh",width:"100vw", justifyContent:"center"}}>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="login100-form d-flex  validate-form p-l-55 p-r-55 p-t-178 "
      >
        <Page className="d-flex flex-column justify-content-center align-items-center bg-danger p-5 border-radius-3 ">
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="outlined"
        />
        <Button type="submit" variant="contained" className="mt-3">
          Submit
        </Button>
        </Page>
      </form>
    </div>
    // </div>
    // </div>
    
  );
}
