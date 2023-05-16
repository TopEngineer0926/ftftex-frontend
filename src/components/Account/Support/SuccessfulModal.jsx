import { useTranslation } from "react-i18next";

export const SuccessfulModal = ({ handleClose }) => {
  const { t } = useTranslation();

  return (
    <div className="container p-4">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div style={{ fontSize: 20, fontWeight: 600, textAlign: "center" }}>
          {" "}
          {t("account.support.Password Change Failed")}
        </div>
        <p className="mt-4 mb-4" style={{ fontSize: 16, textAlign: "center" }}>
          {t("account.settings.Attempt")}
        </p>
        <div className="d-flex mb-2">
          <a className="btn save-btn mr-2" onClick={handleClose}>
            {t("Continue")}
          </a>
        </div>
      </div>
    </div>
  );
};
