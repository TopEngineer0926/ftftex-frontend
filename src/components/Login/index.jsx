import { NavLink, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ApiService from "services/apiService";
import CheckImg from "assets/images/check.svg";
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
  const navigate = useNavigate();

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
        <div className="container fh-minus-100">
          <div className="row">
            <div className="col-lg-4 offset-lg-4">
              <div className="wt-box p-4 mt-lg-5">
                <h1 className="s-bld mb-4">{t("Login")}</h1>
                <hr />
                <div className="d-flex w-100 mb-5">
                  <button
                    className={
                      loginType === "email"
                        ? "btn sub-menu-btn flex-fill sub-menu-btn-activate"
                        : "btn sub-menu-btn flex-fill"
                    }
                    onClick={() => switchLoginType("email")}
                  >
                    {t("Email")}
                  </button>
                  <button
                    className={
                      loginType === "mobile"
                        ? "btn sub-menu-btn flex-fill sub-menu-btn-activate"
                        : "btn sub-menu-btn flex-fill"
                    }
                    onClick={() => switchLoginType("mobile")}
                  >
                    {t("Mobile")}
                  </button>
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
                  <p className="mt-4 text-center error-msg">{LoginErrors} </p>
                  <button
                    className="btn btn-primary btn-lg mt-5 mx-auto d-block font-weight-bold px-5"
                    disabled={
                      !Form.password ||
                      (loginType === "email" ? !Form.email : !Form.phone)
                    }
                    onClick={login}
                  >
                    {t("Login")}
                  </button>
                </div>
                <p className="mt-4 text-center ">
                  <NavLink to={"/forgot-password"}>
                    Forgot your password ?{" "}
                  </NavLink>
                </p>
                <hr />
                <h5 className="text-center">
                  {t("Don't have an account ?")}{" "}
                  <NavLink to={"/register"}>
                    <b>{t("Register here")}</b>
                  </NavLink>
                </h5>
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
