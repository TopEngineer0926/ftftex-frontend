import { useTranslation } from "react-i18next";
import { getLoggedIn } from "../../../utils";
import ApiService from "../../../services/apiService";

const DeleteTradingAccountModal = ({ onClose }) => {
  const { t } = useTranslation();

  const deleteTradingAccount = async () => {
    const data = getLoggedIn();
    const response = await ApiService.deleteSubAccount({ subAcct: data[5] });
    if (response.status === 200) {
      onClose();
    }
  };

  return (
    <div className="container p-4">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <span
          className="material-symbols-outlined acc-box-i align-self-center my-4"
          style={{ fontSize: 35, opacity: 0.4 }}
        >
          delete
        </span>
        <p
          className="mb-4"
          style={{ fontSize: 27, maxWidth: 200, textAlign: "center" }}
        >
          {t("account.Are you sure you want to delete trading account?")}
        </p>
        <div className="d-flex mb-2">
          <div className="btn btn-outlined mr-2" onClick={onClose}>
            {t("Cancel")}
          </div>
          <div className="btn btn-primary" onClick={deleteTradingAccount}>
            {t("Delete")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTradingAccountModal;
