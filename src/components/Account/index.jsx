import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { getLoggedIn } from "utils";
import "./index.scss";

const Account = () => {
  const { t } = useTranslation();
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const res = getLoggedIn();

    if (!res[0]) {
      navigate("/login");
    } else {
      setLogginIn(res);
    }
  }, []);

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="vh-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="wt-box mt-3 p-lg-3">
              <h4 className="s-bld">{t("My Account")}</h4>
              <hr />

              <div className="acc-box mb-2">
                <span className="material-symbols-outlined acc-box-i align-self-center mr-3">
                  account_circle
                </span>
                <div className="align-self-center">
                  <p className="mb-0">Account</p>
                  <p className="mb-0 s-bld">
                    {LogginIn[0]} {LogginIn[1]}
                  </p>
                </div>
                <div className="align-self-center ml-auto">
                  <a className="btn btn-outline-primary">Edit</a>
                </div>
              </div>

              <div className="acc-box mb-2">
                <span className="material-symbols-outlined acc-box-i align-self-center mr-3">
                  verified_user
                </span>
                <div className="align-self-center">
                  <p className="mb-0">
                    {LogginIn[6] === "verified"
                      ? "Verified"
                      : "Personal Verification"}
                  </p>
                  {LogginIn[6] !== "verified" && (
                    <p className="mb-0 s-bld">-- Not verified -- </p>
                  )}
                </div>
                <div className="align-self-center ml-auto">
                  {LogginIn[6] !== "verified" && (
                    <NavLink
                      className="btn btn-primary"
                      to={"/account/verification"}
                    >
                      Verify
                    </NavLink>
                  )}
                </div>
              </div>

              <div className="acc-box mb-2">
                <span className="material-symbols-outlined acc-box-i align-self-center mr-3">
                  smartphone
                </span>
                <div className="align-self-center">
                  <p className="mb-0">Mobile No.</p>
                  <p className="mb-0 s-bld sht-txt">{LogginIn[3]}</p>
                </div>
                <div className="align-self-center ml-auto">
                  <a className="btn btn-outline-primary mr-3">Edit</a>
                  <a className="btn btn-primary">Verify</a>
                </div>
              </div>

              <div className="acc-box mb-2">
                <span className="material-symbols-outlined acc-box-i align-self-center mr-3">
                  email
                </span>
                <div className="align-self-center ">
                  <p className="mb-0">Email</p>
                  <p className="mb-0 s-bld sht-txt">{LogginIn[4]}</p>
                </div>
                <div className="align-self-center ml-auto">
                  <a className="btn btn-outline-primary mr-3">Edit</a>
                  <a className="btn btn-primary">Verify</a>
                </div>
              </div>

              <div className="acc-box mb-2">
                <span className="material-symbols-outlined acc-box-i align-self-center mr-3">
                  lock
                </span>
                <div className="align-self-center ">
                  <p className="mb-0">Password</p>
                  <p className="mb-0 s-bld ">*******</p>
                </div>
                <div className="align-self-center ml-auto">
                  <a className="btn btn-outline-primary">Change</a>
                </div>
              </div>

              <div className="w-100 d-block text-center mt-5">
                <a
                  className="btn btn-primary align-self-center px-5 mx-auto"
                  onClick={logOut}
                >
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
