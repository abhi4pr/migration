import { useNavigate, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useEffect, useState } from "react";
import imageTest1 from "../../../assets/img/product/Avtrar1.png";
const Navbar = () => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userName = decodedToken.name;
  const loginUserId = decodedToken.id;
  const handleLogOut = () => {
    sessionStorage.clear("token");
    navigate("/login");
  };
  const [loginUserData, setLoginUserData] = useState([]);
  useEffect(() => {
    axios
      .post("http://34.93.135.33:8080/api/login_user_data", {
        user_id: loginUserId,
      })
      .then((res) => setLoginUserData(res.data));
  }, []);
  return (
    <>
      {/* Topbar Start */}
      <nav className="navbar navbar-expand topbar shadow">
        <button className="btn sidebar_tglbtn" id="sidebarToggle">
          <i className="bi bi-list" />
        </button>
        <ul className="navbar-nav align-items-center ml-auto">
          <li className="nav-item dropdown no-arrow d-sm-none">
            <a
              className="nav-link dropdown-toggle nav_icon_link"
              id="searchDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="bi bi-search" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
              aria-labelledby="searchDropdown"
            >
              <form className="form-inline mr-auto w-100 navbar-search">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control bg-light border-0 small"
                    placeholder="Search for..."
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary" type="button">
                      <i className="bi bi-search" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </li>
          <li className="nav-item">
            <div className="theme-switch">
              <input type="checkbox" id="theme-toggle" />
              <label htmlFor="theme-toggle" />
            </div>
          </li>
          <li className="nav-item dropdown no-arrow user_dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <span>{userName}</span>
              {loginUserData[0]?.image == null ? (
                <img className="img-profile" src={imageTest1} />
              ) : (
                // loginUserData.map((d) => (
                <img
                  key={1}
                  className="img-profile"
                  src={loginUserData[0]?.image}
                  alt="user"
                />
                // ))
              )}
            </a>
            <div
              className="dropdown-menu dropdown-menu-right shadow animated--grow-in mt16"
              aria-labelledby="userDropdown"
            >
              {/* <Link to="/profile">
                <a className="dropdown-item">
                  <i className="bi bi-person" />
                  Profile
                </a>
              </Link> */}
              <a onClick={handleLogOut} className="dropdown-item">
                <i className="bi bi-box-arrow-left" />
                Logout
              </a>
            </div>
          </li>
        </ul>
      </nav>
      {/* Topbar End */}
    </>
  );
};
export default Navbar;
