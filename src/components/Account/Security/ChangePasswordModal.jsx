import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ApiService from "../../../services/apiService";
import { Spinner } from "react-bootstrap";

const ChangePasswordModal = ({
  onClose,
  setShowOTPModal,
  failedAttempts,
  newPassword,
  setNewPassword,
}) => {
  const { t } = useTranslation();
  const blockedTime = localStorage.getItem("blockPasswordTime");
  const now = new Date().getTime();
  const [currentPassword, setCurrentPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [DialingCode, setDialingCode] = useState(ApiService.DialingCode);
  const date1 = new Date(parseInt(blockedTime));
  const date2 = new Date(now);
  const diffInMs = date1 - date2;
  const minutes = Math.floor(diffInMs / 60000);

  useEffect(() => {
    if (blockedTime && now < blockedTime) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
      localStorage.removeItem("blockPasswordTime");
    }
  }, []);

  const checkPassword = (password) => {
    let passwordError = "";
    if (password.length < 8) {
      passwordError = t(
        "account.security.Password must be at least 8 characters"
      );
    }
    if (password.search(/[a-z]/) < 0) {
      passwordError = t(
        "account.security.Password must contain at least one small letter"
      );
    }
    if (password.search(/[A-Z]/) < 0) {
      passwordError = t(
        "account.security.Password must contain at least one capital letter"
      );
    }
    if (password.search(/[0-9]/) < 0) {
      passwordError = t(
        "account.security.Password must contain at least one digit"
      );
    }
    if (currentPassword.length === 0) {
      passwordError = t("account.security.Enter your current password");
    }
    setPasswordError(passwordError);
    return passwordError;
  };

  const changePassword = async () => {
    const error = checkPassword(newPassword);
    const email = JSON.parse(localStorage.getItem("usr"));
    if (failedAttempts === 3) {
      const oneHour = new Date(new Date().getTime() + 60 * 60 * 1000);
      localStorage.setItem("blockPasswordTime", oneHour.getTime().toString());
      setIsDisabled(true);
    } else {
      if (error.length === 0) {
        setIsLoading(true);
        const sendEmailResponse = await ApiService.ForgotPassword(
          { email: email[4] },
          "email",
          DialingCode.dialCode
        );
        if (sendEmailResponse.status === 200) {
          console.log(sendEmailResponse);
          setIsLoading(false);
          setShowOTPModal(true);
          onClose();
        }
      }
    }
  };

  return (
    <div className="container p-4">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <span
          className="acc-box-i align-self-center my-4"
          style={{ fontSize: 35, opacity: 0.4 }}
        >
          {t("Change password")}
        </span>
        <div className="row py-2 mt-2 col-11">
          <div className="col-4">
            <p>{t("account.security.Current Password")}</p>
          </div>
          <div className="col-8">
            <div className="d-flex flex-column">
              <input
                className="form-control w-100"
                type="password"
                disabled={isDisabled}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row py-2 mt-2 col-11">
          <div className="col-4">
            <p>{t("account.security.New Password")}</p>
          </div>
          <div className="col-8">
            <div className="d-flex flex-column">
              <input
                className="form-control w-100"
                type="password"
                disabled={isDisabled}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {passwordError.length > 0 && (
                <span className="align-self-end helper-text">
                  {passwordError}
                </span>
              )}
            </div>
          </div>
        </div>
        {isDisabled ? (
          <span className="align-self-center mt-4">
            {t("account.security.You can change your password only after")}
            {` ${minutes} minutes`}
          </span>
        ) : (
          <div className="d-flex mb-2 mt-4">
            <div className="btn btn-outlined mr-2" onClick={onClose}>
              {t("Cancel")}
            </div>
            <div className="btn save-btn" onClick={changePassword}>
              {isLoading ? (
                <Spinner animation="border" variant="primary" />
              ) : (
                t("Save")
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordModal;
