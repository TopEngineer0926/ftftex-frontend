import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { FTFTexContext } from "App";
import ApiService from "services/apiService";
import { NavLink, useNavigate } from "react-router-dom";
import DialingCodes from "components/Login/DialingCodes";
import "./index.scss";
import LoginVisual from "assets/images/login_visual.png";

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [showEmailVerifyPopModal, setShowEmailVerifyPopModal] = useState(false);
  const [loginType, setLoginType] = useState("email");
  const [Form, setForm] = useState({
    email: "",
    phone: "",
  });

  const [DialingCode, setDialingCode] = useState(ApiService.DialingCode);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);

  const [LoginErrors, setLoginErrors] = useState("");
  const [OTP, setOTP] = useState("");
  const [OTPVerificationMessage, setOTPVerificationMessage] = useState("");
  const [showDialingCodesModal, setShowDialingCodesModal] = useState(false);
  const [RegisterResponse, setRegisterResponse] = useState({});
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
    ApiService.ForgotPassword(Form, loginType, DialingCode.dialCode).then(
      (res) => {
        console.log(res, "res");
        if (res.data.message === "not found") {
          if (loginType === "mobile") {
            setLoginErrors("Invalid mobile number!");
          }
          if (loginType === "email") {
            setLoginErrors("Invalid email!");
          }
        } else {
          if (res.data.userId) {
            setRegisterResponse(res.data);
            console.log(res.data, "RegisterResponse");
            setShowEmailVerifyPopModal(true);
          }
        }
      }
    );
  };

  const verifyUser = () => {
    const data = {
      userId: RegisterResponse.userId,
      email: Form.email,
      pinCode: OTP,
      service: "change_password",
    };

    ApiService.VerifyUser(data).then(
      (res) => {
        if (res.data.Message === "User verified successfully") {
          dismissAll();
          navigate(`/set-password/${RegisterResponse.userId}`);
        } else {
          setOTPVerificationMessage("Invalid !");
        }
      },
      () => {
        setOTPVerificationMessage("Invalid !");
      }
    );
  };

  const openDialingCodes = () => {
    setShowDialingCodesModal(true);
  };

  const dismissAll = () => {
    setShowEmailVerifyPopModal(false);
    setShowDialingCodesModal(false);
  };

  const handleCloseEmailVerifyPopModal = () => {
    setShowEmailVerifyPopModal(false);
  };

  const handleCloseDialingCodesModal = () => {
    setShowDialingCodesModal(false);
  };

  const handleChangeForm = (e, type) => {
    setForm({
      ...Form,
      [type]: e.target.value,
    });
  };

  const handleChangeOTP = (e) => {
    setOTP(e.target.value);
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
                <h1 className="s-bld mb-4">{t("Forgot Password")}</h1>
                <hr />
                <div className="d-flex w-100 mb-5">
                  <span
                    className={loginType === "email" ? "selected mr-5" : "mr-5"}
                    style={{ cursor: "pointer" }}
                    onClick={() => switchLoginType("email")}
                  >
                    {t("Email")}
                  </span>
                  {/* <!--            <button className="btn sub-menu-btn flex-fill" [ngClass]="{'sub-menu-btn-activate' : loginType === 'mobile'}" onClick="switchLoginType('mobile')">{t("Mobile")}</button>--> */}
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
                          onChange={(e) => handleChangeForm("phone")}
                        />
                      </div>
                    </>
                  )}

                  <p className="mt-4 text-center error-msg">{LoginErrors} </p>

                  <button
                    className="btn btn-primary btn-lg mt-5 mx-auto d-block font-weight-bold px-5"
                    disabled={
                      (loginType === "email" && !Form.email) ||
                      (loginType === "mobile" && !Form.phone)
                    }
                    onClick={login}
                  >
                    {t("Send")}
                  </button>
                </div>
                <p className="mt-4 text-center">
                  <NavLink to="/login">Back to Login</NavLink>{" "}
                </p>
                {/* <!--          <hr>-->
<!--          <h5 className="text-center">{t("Don't have an account ?")} <a [routerLink]="'/register'"><b>{t("Register here")}</b></a></h5>--> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showEmailVerifyPopModal}
        onHide={handleCloseEmailVerifyPopModal}
        centered
        backdrop="static"
        aria-labelledby="modal-basic-title"
      >
        <div className="modal-body">
          <span
            className="material-symbols-outlined d-block mx-auto text-center"
            style={{ fontSize: 90 }}
          >
            mail
          </span>
          <p className="text-center mt-2">
            Verification code has been sent to <br /> <b>{Form.email}</b>
          </p>
          <input
            className="form-control mx-auto w-75 mt-4"
            value={OTP}
            placeholder="OTP"
            onChange={handleChangeOTP}
          />
          {OTPVerificationMessage && (
            <p className="text-center error-msg mt-4">
              {OTPVerificationMessage}
            </p>
          )}
          <div className="d-flex justify-content-center mt-5">
            <button
              type="button"
              className="btn btn-outline-primary btn-lg px-5  d-block"
              onClick={handleCloseEmailVerifyPopModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary btn-lg px-5 ml-3  d-block"
              onClick={verifyUser}
            >
              Verify
            </button>
          </div>
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

export default ForgotPassword;
