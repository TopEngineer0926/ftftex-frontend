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
        <h4>{t("account.settings.Delete Trading Account")}</h4>
      </div>
      <div className="red-text mt-lg-3 mb-4" style={{ fontSize: 14 }}>
        <p>You are about to delete your FTFTex Trading Account.</p>
        <p>The deletion of your account means:</p>
        <ul style={{ fontSize: 15 }}>
          <li>Deletion of your KYC information</li>
          <li>Deletion of your Trading History</li>
          <li>Deletion of your Transaction History</li>
          <li>
            You will not be able to deposit, withdraw or trade assets in your
            account.
          </li>
        </ul>
        <p>
          Be sure to withdraw or transfer your assets before deleting your
          treading account. FTFTex is not responsible for any lose after account
          deletion.
        </p>
        <div className="d-flex mb-2">
          <div
            className="btn btn-outlined mr-2"
            style={{ width: "150px", height: "40px" }}
            onClick={onClose}
          >
            {t("Cancel")}
          </div>
          <div
            className="btn btn-continue"
            style={{ width: "150px", height: "40px" }}
            onClick={deleteTradingAccount}
          >
            {t("Continue")}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTradingAccountModal;
