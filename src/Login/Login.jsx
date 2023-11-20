import axios from "axios";
import { useState } from "react";
import "./Login.css";
import "./LoginResponsive.css";
import { useNavigate } from "react-router-dom";
import loginlogo from "../assets/img/logo/logo_login1.png";
import jwtDecode from "jwt-decode";
import { useGlobalContext } from "../Context/Context";

const Login = () => {
  const { toastError } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isError, setIsError] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
    // http://34.93.135.33:8080/api/login_user
    axios
      .post("http://34.93.135.33:8080/api/login_user", {
        user_login_id: email,
        user_login_password: password,
      })
      .then((res) => {
        if (!res.data.token) {
          navigate("/login");
        } else {
          const token = res.data.token;
          const decodedToken = jwtDecode(token);
          const status = decodedToken.user_status;
          if (status == "Active") {
            navigate("/");
            sessionStorage.setItem("token", token);
          } else {
            navigate("/login");
            toastError("You are an inactive user");
          }
        }
      })
      .catch((error) => {
        setIsError(error);
      });
  };
  return (
    <>
      {/* new login page  */}
      {/* <div className="limiter newlogin">
        <div className="container-login100"> */}
      {/* <div className="wrap-login100"> */}
      {/* <form
              onSubmit={handleSubmit}
              className="login100-form validate-form p-l-55 p-r-55 p-t-178"
            >
              <span className="login100-form-title"> Welcome Jarvis</span>
              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Please enter username"
              >
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  className="input100"
                  name="email / username"
                  placeholder="Login ID"
                />
                <span className="focus-input100" />
              </div>
              <div
                className="wrap-input100 validate-input"
                data-validate="Please enter password"
              >
                <div className="input-box">
                  <span className="icon">
                    <ion-icon name="lock-closed" />
                  </span>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "password" : "text"}
                    className="input100"
                    name="password"
                    placeholder="Password"
                  />
                </div>
                <span className="focus-input100" />
              </div>
              <div className="text-right">
                {isError !== "" && (
                  <span className="mb-1 d-block" style={{ color: "red" }}>
                    Invalid Login Id or Password
                  </span>
                )}
              </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn" type="submit">
                  Log in
                </button>
                <button
                  className="btn btn-danger"
                  type="submit"
                  onClick={() => {
                    navigate("/forget-password");
                  }}
                >
                  Forget Password
                </button>
              </div>
              <div className="flex-col-c p-t-170 p-b-40">
                <span className="txt1 p-b-9"> Creativefuel </span>
              </div>
            </form> */}
      {/* </div> */}

      <section className="section authwrapper">
        <div className="authbox">
          <div
            className="authtext authbrand_spacing"
            style={{ display: "none" }}
          >
            <h1>Welcome.</h1>
            <p>
              To Creativefuel <br /> A Leading Marketing Agency. <br /> Let's
              onboard you to your next home.
            </p>
          </div>
          <div className="authlogo authbrand_spacing">
            <img src={loginlogo} alt="CreativeFuel" />
          </div>
          <div className="authform_area">
            <div className="authform_head">
              <h2>Login</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="authform">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? "password" : "text"}
                  />
                </div>
                <div className="text-right p-t-13 p-b-23">
                  {isError !== "" && (
                    <span className="mb-1 d-block" style={{ color: "red" }}>
                      Invalid Login Id or Password
                    </span>
                  )}
                </div>
                <div className="form-group mb-0">
                  <button className="btn btn-icon btn_primary" type="submit">
                    <i className="fas fa-arrow-right" />
                  </button>

                  <button
                    className="btn btn-outline-danger mt-2"
                    type="submit"
                    onClick={() => {
                      navigate("/forget-password");
                    }}
                  >
                    Forget Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
      {/* </div>
      </div> */}
    </>
  );
};
export default Login;
