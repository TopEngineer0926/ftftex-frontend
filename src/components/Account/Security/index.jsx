import "./index.scss";
import {useTranslation} from "react-i18next";
import { useContext, useEffect, useState } from "react";
import ApiService from "../../../services/apiService";
import {Divider} from "@mui/material";
import {Modal, Spinner} from "react-bootstrap";
import ChangePasswordModal from "./ChangePasswordModal";
import {useSnackbar} from "notistack";
import {useNavigate} from "react-router-dom";
import { getTheme } from "../../../utils";
import { FTFTexContext } from "../../../App";
import { InputOTPModal } from "./InputOTPModal";
import { FaildAttemptModal } from "./FaildAttemptModal";
import { SuccessfullChangeModal } from "../Support/SuccessfullChangeModal";

const Security = () => {
  const {enqueueSnackbar} = useSnackbar();
  const {t} = useTranslation();
  const navigate = useNavigate();
  const ftftexValue = useContext(FTFTexContext);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isChangePhone, setIsChangePhone] = useState(false);
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showFaildAttemptModal, setShowFaildAttemptModal] = useState(false);
  const [suceessfullChangeModal, setSuceessfullChangeModal] = useState(false);


  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    setIsMobile(ftftexValue[0].isMobile);
  }, [ftftexValue[0].isMobile]);

  const getUser = async () => {
    const response = await ApiService.getUser(localStorage.getItem("userId"));
    const userData = response.data.userDetails[0];
    setUser(userData);
    setNewPhone(userData.phone);
    setNewEmail(userData.email);
    setIsLoading(false);
  }

  const userHiddenEmail = (email) => {
    const emailArr = email.split('@');
    return email.slice(0, 2) + '*'.repeat(emailArr[0].slice(2).length) + '@' + emailArr[1];
  }

  const userHiddenPhone = (phone) => {
    return phone.slice(0, 4) + '*'.repeat(phone.slice(4, 9).length) + phone.slice(9);
  }

  const handleCloseModal = () => {
    setIsChangePassword(false);
  }

  const editUserPhone = async () => {
    const checkPhone = newPhone.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
    if (checkPhone !== null) {
      const data = {
        id: localStorage.getItem("userId"),
        phone: newPhone
      }
      const response = await ApiService.editUserPhone(data);
      if (response.status === 200) {
        getUser();
        const result = response.data.Success;
        enqueueSnackbar(t(result), {
          variant: 'success'
        });
        setIsChangePhone(false);
      }
    } else {
      enqueueSnackbar(t('account.security.Please enter a valid phone number'), {
        variant: 'error'
      });
    }
  }

  const editUserEmail = async () => {
    const checkEmail = newEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    if (checkEmail !== null) {
      const data = {
        id: localStorage.getItem("userId"),
        email: newEmail
      }
      const response = await ApiService.editUserEmail(data);
      if (response.status === 200) {
        getUser();
        const result = response.data.Success;
        enqueueSnackbar(t(result), {
          variant: 'success'
        });
        setIsChangeEmail(false);
        localStorage.clear();
        window.location.reload();
        navigate("/login");
        navigate(0);
      }
    } else {
      enqueueSnackbar(t('account.security.Please enter a valid email'), {
        variant: 'error'
      });
    }
  }

  const handleChangePassword = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/login");
    navigate(0);
  };

  return (
    <>
      {isLoading ? (
        <Spinner animation="border" variant="primary" className="loading" />
      ) : (
        <div className="container mt-4 mb-4 p-4">
          <div className="pb-2 light-border-bottom">
            <h4
              className={`${
                getTheme() === "dark" ? "sub-title-dark" : "sub-title"
              }`}
            >
              {t("Security")}
            </h4>
            <Divider />
          </div>
          <div className="row mt-2 setting-block">
            <div className="col-4">
              <div
                className={`${
                  getTheme() === "dark" ? "sub-point-dark" : "sub-point"
                }`}
              >
                {t("Password")}
              </div>
            </div>
            <div className="col-5">
              <span className="font-weight-bold">
                {"*".repeat(user.password.length)}
              </span>
            </div>
            <div
              className="col-3 pointer"
              onClick={() => setIsChangePassword(true)}
            >
              <div className="d-flex justify-content-end">
                <span
                  className="material-symbols-outlined acc-box-i align-self-center ml-auto"
                  style={{ fontSize: 26, opacity: 0.4 }}
                >
                  expand_more
                </span>
              </div>
            </div>
          </div>
          <div className="row mt-2 pointer setting-block align-items-center">
            <div className="col-2">
              <div
                className={`mr-4 ${
                  getTheme() === "dark" ? "sub-point-dark" : "sub-point"
                }`}
              >
                {t("Email")}
              </div>
            </div>
            <div className="col-2 linked-text">{t("Linked")}</div>
            {!isChangeEmail ? (
              <>
                <div className="col-5">
                  <span className="font-weight-bold">
                    {userHiddenEmail(user.email)}
                  </span>
                </div>
                <div className="col-3" onClick={() => setIsChangeEmail(true)}>
                  <div className="d-flex justify-content-end">
                    <span
                      className="material-symbols-outlined acc-box-i align-self-center ml-auto"
                      style={{ fontSize: 26, opacity: 0.4 }}
                    >
                      expand_more
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={isMobile ? "col-8" : "col-5"}>
                  <div className="d-flex flex-column">
                    <input
                      className="form-control w-100"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className={isMobile ? "mt-3 wt-box mx-auto" : "col-3"}>
                  <div
                    className={
                      isMobile
                        ? "d-flex align-items-center"
                        : "d-flex justify-content-end"
                    }
                  >
                    <button
                      className="btn btn-outlined ml-2"
                      onClick={() => setIsChangeEmail(false)}
                    >
                      {t("Cancel")}
                    </button>
                    <a
                      className="btn save-btn ml-3"
                      onClick={() => editUserEmail()}
                    >
                      {t("Save")}
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="row mt-2 align-items-center pointer setting-block">
            <div className="col-2">
              <div
                className={`mr-4 ${
                  getTheme() === "dark" ? "sub-point-dark" : "sub-point"
                }`}
              >
                {t("Phone")}
              </div>
            </div>
            <div className="col-2 unlinked-text">Unlinked</div>
            {!isChangePhone ? (
              <>
                <div className="col-5">
                  <span className="font-weight-bold">
                    {userHiddenPhone(user.phone)}
                  </span>
                </div>
                <div className="col-3" onClick={() => setIsChangePhone(true)}>
                  <div className="d-flex justify-content-end">
                    <span
                      className="material-symbols-outlined acc-box-i align-self-center ml-auto"
                      style={{ fontSize: 26, opacity: 0.4 }}
                    >
                      expand_more
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className={isMobile ? "col-8" : "col-5"}>
                  <div className="d-flex flex-column">
                    <input
                      className="form-control w-100"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className={isMobile ? "mt-3 wt-box mx-auto" : "col-3"}>
                  <div
                    className={
                      isMobile
                        ? "d-flex align-items-center"
                        : "d-flex justify-content-end"
                    }
                  >
                    <button
                      className="btn btn-outlined ml-2"
                      onClick={() => setIsChangePhone(false)}
                    >
                      {t("Cancel")}
                    </button>
                    <a className="btn save-btn ml-3" onClick={editUserPhone}>
                      {t("account.community.Save")}
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="row py-2 mt-2 pointer setting-block">
            <div className="col-3">
              <div
                className={`mr-4 ${
                  getTheme() === "dark" ? "sub-point-dark" : "sub-point"
                }`}
              >
                {t("2FA")}
              </div>
            </div>
            <div className="col-9">
              <div className="d-flex justify-content-end">
                <span
                  className="material-symbols-outlined acc-box-i align-self-center ml-auto"
                  style={{ fontSize: 26, opacity: 0.4 }}
                >
                  chevron_right
                </span>
              </div>
            </div>
          </div>
          <a href="/account/verification" className="row mt-2 setting-block">
            <div className="col-3">
              <div
                className={`mr-4 ${
                  getTheme() === "dark" ? "sub-point-dark" : "sub-point"
                }`}
              >
                {t("Account Verification")}
              </div>
            </div>
            <div className="col-9">
              <div className="d-flex justify-content-end">
                <span
                  className="material-symbols-outlined acc-box-i align-self-center ml-auto"
                  style={{ fontSize: 26, opacity: 0.4 }}
                >
                  chevron_right
                </span>
              </div>
            </div>
          </a>
        </div>
      )}
      <Modal
        show={isChangePassword}
        onHide={handleCloseModal}
        centered
        size="lg"
      >
        <ChangePasswordModal
          onClose={handleCloseModal}
          setShowOTPModal={setShowOTPModal}
          failedAttempts={failedAttempts}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
        />
      </Modal>
      <Modal show={showOTPModal} onHide={() => setShowOTPModal(false)} centered>
        <InputOTPModal
          onClose={() => setShowOTPModal(false)}
          email={user.email}
          newPassword={newPassword}
          failedAttempts={failedAttempts}
          setFailedAttempts={setFailedAttempts}
          setShowFaildAttemptModal={setShowFaildAttemptModal}
          setSuceessfullChangeModal={setSuceessfullChangeModal}
        />
      </Modal>
      <Modal
        show={showFaildAttemptModal}
        onHide={() => setShowFaildAttemptModal(false)}
        centered
      >
        <FaildAttemptModal
          handleClose={() => setShowFaildAttemptModal(false)}
          show={showFaildAttemptModal}
          faildAttemps={failedAttempts}
        />
      </Modal>
      <Modal
        show={suceessfullChangeModal}
        onHide={() => setSuceessfullChangeModal(false)}
        centered
      >
        <SuccessfullChangeModal handleClose={handleChangePassword} />
      </Modal>
    </>
  );
};

export default Security;
