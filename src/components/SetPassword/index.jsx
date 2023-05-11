import { useTranslation } from "react-i18next";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CheckImg from "assets/images/check.svg";
import { Modal } from "react-bootstrap";
import "./index.scss";
import ApiService from "services/apiService";
import { useEffect, useState, useContext } from "react";
import LoginVisual from "assets/images/login_visual.png";
import { FTFTexContext } from "App";

const SetPassword = () => {
  const { t } = useTranslation();
  const [showRegistrationDoneModal, setShowRegistrationDoneModal] =
    useState(false);
  const [Form, setForm] = useState({
    password: "",
  });
  const [userId, setUserId] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  useEffect(() => {
    let tmpUserId = location?.state?.userId;
    setUserId(tmpUserId);

    if (tmpUserId) {
      navigate("/login");
    }
  }, []);

  const setPassword = () => {
    ApiService.changePassword(Form, userId).then((res) => {
      if (res.data.message) {
        setShowRegistrationDoneModal(true);
      }
    });
  };

  const myContinue = () => {
    setShowRegistrationDoneModal(false);
    navigate("/login");
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
                <h1 className="s-bld mb-4">{t("Set Password")}</h1>
                <hr />
                <div>
                  <label className="mt-3">{t("Password")}</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={Form.password}
                    onChange={(e) => handleChangeForm(e, "password")}
                    required
                  />

                  {/* <p className="mt-4 text-center error-msg">{LoginErrors} </p> */}
                  <button
                    className="btn btn-primary btn-lg mt-5 mx-auto d-block font-weight-bold px-5"
                    disabled="Form.invalid"
                    onClick={setPassword}
                  >
                    {t("Set")}
                  </button>
                </div>
                <p className="mt-4 text-center">
                  <NavLink to="/login">Back to Login</NavLink>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showRegistrationDoneModal}
        onHide={() => setShowRegistrationDoneModal(false)}
        centered
        aria-labelledby="modal-basic-title"
      >
        <div className="modal-body">
          <img
            src={CheckImg}
            className="mx-auto d-block mb-3 mt-5"
            height={60}
          />
          <h2 className="mb-5 text-center s-bld">
            Password changed successful
          </h2>
          <button
            type="button"
            className="btn btn-primary btn-lg px-5 w-100"
            onClick={myContinue}
          >
            Continue
          </button>
        </div>
      </Modal>
    </>
  );
};

export default SetPassword;
