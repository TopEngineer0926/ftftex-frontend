import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ApiService from "services/apiService";
import CheckImg from "assets/images/check.svg";
import LoginVisual from "assets/images/login_visual.png";
import "./index.scss";
import { FTFTexContext } from "App";
import DialingCodes from "./DialingCodes";

const Login = () => {
  const { t } = useTranslation();
  const [loginType, setLoginType] = useState("email");
  const [Form, setForm] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [DialingCode, setDialingCode] = useState(ApiService.DialingCode);
  const [LoginErrors, setLoginErrors] = useState("");
  const [showRegistrationDoneModal, setShowRegistrationDoneModal] =
    useState(false);
  const [showDialingCodesModal, setShowDialingCodesModal] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  useEffect(() => {
    setDialingCode(ftftexValue.DialingCode);
  }, [ftftexValue.DialingCode]);

  const switchLoginType = (value) => {
    setLoginType(value);
  };

  const login = () => {
    ApiService.LoginUser(Form, loginType, DialingCode.dialCode).then((res) => {
      if (res.data.message === "User not found, Please Sign-up") {
        if (loginType === "mobile") {
          setLoginErrors("Invalid mobile number or password !");
        }
        if (loginType === "email") {
          setLoginErrors("Invalid email or password !");
        }
      } else {
        if (res.data["user-details"]) {
          localStorage.setItem("usr", JSON.stringify(res.data["user-details"]));
          localStorage.setItem("userId", res.data["user-details"][8]);
          if (
            JSON.stringify(res.data["user-details"][3] === "test@ftftex.com")
          ) {
            let tmpAssets = {
              ordered: [],
              coins: {
                usdt: 1000,
                eth: 0,
                bnb: 0,
                btc: 0,
                sol: 0,
                ada: 0,
                dot: 0,
                doge: 0,
                shib: 0,
                matic: 0,
                uni: 0,
                ltc: 0,
                trx: 0,
                xrp: 0,
              },
            };
            ApiService.ChangeAssets(tmpAssets);
            setFtftexValue({
              ...ftftexValue,
              Assets: tmpAssets,
            });
          }
          setFtftexValue({
            ...ftftexValue,
            Loggedin: res.data["user-details"],
          });
          setShowRegistrationDoneModal(true);
        } else {
          setLoginErrors(res.message);
        }
      }
    });
  };

  const myContinue = () => {
    setShowRegistrationDoneModal(false);
    setShowDialingCodesModal(false);
    navigate("/");
  };

  const openDialingCodes = () => {
    setShowDialingCodesModal(true);
  };

  const handleCloseDialingCodesModal = () => {
    setShowDialingCodesModal(false);
  };

  const handleCloseRegistrationDoneModal = () => {
    setShowRegistrationDoneModal(false);
  };

  const handleChangeForm = (e, type) => {
    setForm({
      ...Form,
      [type]: e.target.value,
    });
  };

  return (
    <>
      <div className="bg-wt">
        <div
          className="container fh-minus-100"
          style={{
            maxWidth: "100%",
            margin: "unset",
            minHeight: isMobile ? "calc(100vh - 100px)" : 1000,
          }}
        >
          <div className="row" style={{ height: "100%" }}>
            {!isMobile && (
              <div
                className="col-lg-5 login-visual bg-dark"
                style={{ height: isMobile ? "calc(100vh - 100px)" : "100%" }}
              >
                <div
                  style={{
                    position: "absolute",
                    zIndex: 100,
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <h1>Trade Wise, Trade Easy</h1>
                  <p>
                    Access real-time crypto market data & Trade BTC, ETH
                    <br />
                    and more across exchanges on a single interface.
                  </p>
                </div>
                <img
                  src={LoginVisual}
                  width="100%"
                  style={{ position: "absolute", bottom: 0 }}
                />
              </div>
            )}
            <div
              className="col-lg-7"
              style={{
                display: isMobile ? "block" : "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                className="p-4 mt-lg-5"
                style={{ margin: isMobile ? "auto" : "100px" }}
              >
                <h1 className="s-bld mb-4">{t("Login")}</h1>
                <hr />
                <div className="d-flex w-100 mb-5">
                  <span
                    className={loginType === "email" ? "selected mr-5" : "mr-5"}
                    style={{ cursor: "pointer" }}
                    onClick={() => switchLoginType("email")}
                  >
                    {t("Email")}
                  </span>
                  <span
                    className={
                      loginType === "mobile" ? "selected mr-5" : "mr-5"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => switchLoginType("mobile")}
                  >
                    {t("Mobile")}
                  </span>
                </div>

                <div>
                  {loginType === "email" && (
                    <>
                      <label>{t("Email")}</label>
                      <input
                        className="form-control"
                        placeholder="Email"
                        value={Form.email}
                        onChange={(e) => handleChangeForm(e, "email")}
                      />
                    </>
                  )}

                  {loginType === "mobile" && (
                    <>
                      <label>{t("Mobile")}</label>

                      <div className="d-flex">
                        <div
                          className="btn co-code-btn  d-flex"
                          onClick={openDialingCodes}
                        >
                          <img
                            src={DialingCode.flag}
                            height={20}
                            width={20}
                            className="align-self-center "
                          />
                          <p className="mb-0 align-self-center s-bld ml-2">
                            {" "}
                            {DialingCode.dialCode}
                          </p>
                        </div>
                        <input
                          type="number"
                          className="form-control mobile-field"
                          placeholder="Mobile No"
                          value={Form.phone}
                          onChange={(e) => handleChangeForm(e, "phone")}
                        />
                      </div>
                    </>
                  )}

                  <label className="mt-3">{t("Password")}</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    value={Form.password}
                    onChange={(e) => handleChangeForm(e, "password")}
                  />
                  <p className="mt-2 text-right " style={{ color: "gray" }}>
                    <NavLink to={"/forgot-password"}>
                      Forgot your password ?{" "}
                    </NavLink>
                  </p>
                  <p className="mt-4 text-center error-msg">{LoginErrors} </p>
                  <button
                    className="btn btn-primary btn-lg mt-5 d-block font-weight-bold px-5"
                    style={{ width: "100%" }}
                    disabled={
                      !Form.password ||
                      (loginType === "email" ? !Form.email : !Form.phone)
                    }
                    onClick={login}
                  >
                    {t("Login")}
                  </button>
                </div>
                <p className="text-right">
                  {t("Don't have an account ?")}{" "}
                  <NavLink to={"/register"} className="selected">
                    <b>{t("Register here")}</b>
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showRegistrationDoneModal}
        onHide={handleCloseRegistrationDoneModal}
        centered
        aria-labelledby="modal-basic-title"
      >
        <div className="modal-body">
          <img
            src={CheckImg}
            className="mx-auto d-block mb-3 mt-5"
            height={60}
          />
          <h2 className="mb-5 text-center s-bld">Success</h2>
          <button
            type="button"
            className="btn btn-primary btn-lg px-5 w-100"
            onClick={myContinue}
          >
            Continue
          </button>
        </div>
      </Modal>
      <Modal
        show={showDialingCodesModal}
        onHide={handleCloseDialingCodesModal}
        centered
      >
        <DialingCodes onClose={handleCloseDialingCodesModal} />
      </Modal>
    </>
  );
};

export default Login;
