import { useTranslation } from "react-i18next";
import "./index.scss";
import AccountSettings from "./AccountSettings";
import TradingSettings from "./TradingSettings";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import DeleteTradingAccountModal from "./DeleteTradingAccountModal";

const SettingsAccount = () => {
  const { t } = useTranslation();
  const [isDeleteTradingAccount, setIsDeleteTradingAccount] = useState(false);

  const handleCloseModal = () => {
    setIsDeleteTradingAccount(false);
  };

  return (
    <div className="container p-4">
      <AccountSettings />
      <TradingSettings />
      <div
        className="d-flex justify-content-end"
        onClick={() => setIsDeleteTradingAccount(true)}
      >
        <a className="btn btn-outlined mr-3 mt-4">
          {t("account.settings.Delete Trading Account")}
        </a>
      </div>
      <Modal show={isDeleteTradingAccount} onHide={handleCloseModal} centered>
        <DeleteTradingAccountModal onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default SettingsAccount;
