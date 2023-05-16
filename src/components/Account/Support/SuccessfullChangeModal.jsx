import { useTranslation } from "react-i18next";

export const SuccessfullChangeModal = ({ handleClose }) => {
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
          {t("account.security.Password Change")}
        </div>
        <p className="mt-2 mb-4" style={{ fontSize: 16, textAlign: "center" }}>
          {t("account.security.Your password has been changed successfully")}
        </p>
        <p className="mt-1 mb-2" style={{ fontSize: 16, textAlign: "center" }}>
          {t("account.security.Please Login Again")}
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
