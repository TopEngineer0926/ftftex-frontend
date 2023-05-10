import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const Logout = ({ handleClose }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const logOut = () => {
    localStorage.clear();
    window.location.reload();
    queryParams.delete("logout");
  };

  return (
    <div className="container p-4">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <span
          className="material-symbols-outlined acc-box-i align-self-center my-4"
          style={{ fontSize: 35, opacity: 0.6 }}
        >
          logout
        </span>
        <p
          className="mb-4"
          style={{ fontSize: 27, maxWidth: 200, textAlign: "center" }}
        >
          {t("account.Are you sure you want to logout?")}
        </p>
        <div className="d-flex mb-2">
          <a className="btn btn-outlined mr-2" onClick={handleClose}>
            {t("Cancel")}
          </a>
          <a className="btn btn-primary" onClick={logOut} href={"/"}>
            {t("Logout")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Logout;
