import { useTranslation } from "react-i18next";

export const FaildAttemptModal = ({ handleClose, faildAttemps }) => {
  const { t } = useTranslation();

  return (
    <div className="container p-4">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div
          style={{
            fontSize: 20,
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          {" "}
          {t("account.security.Password Change Failed")}
        </div>
        <p
          className="mt-1 mb-1 blue-text"
          style={{ fontSize: 14, textAlign: "center" }}
        >
          {t("account.security.Attempt") + " " + faildAttemps + "/3"}
        </p>
        <p className="mt-2 mb-4" style={{ fontSize: 16, textAlign: "center" }}>
          {t("account.security.One or both entered OTPs are incorrect")}
        </p>
        <div className="d-flex mb-2">
          <a className="btn save-btn mr-2" onClick={handleClose}>
            {t("Try again")}
          </a>
        </div>
      </div>
    </div>
  );
};
