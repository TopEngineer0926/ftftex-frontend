import { useTranslation } from "react-i18next";
import "./index.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLoggedIn } from "utils";
import ApiService from "services/apiService";
import { Modal } from "react-bootstrap";
import Deposit from "components/Wallet/Deposit";
import Transfer from "components/Wallet/Transfer";
import Withdraw from "components/Wallet/Withdraw";

const TradingAccount = () => {
  const { t } = useTranslation();
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const [tab, setTab] = useState("deposit");
  const [deposits, setDeposits] = useState([]);
  const [trading, setTrading] = useState([]);
  const [showDipositModal, setShowDipositModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const param = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    setType(param.type);
  }, [param]);

  useEffect(() => {
    const data = getLoggedIn();
    if (!data[0]) {
      navigate("/login");
    } else {
      setLogginIn(data);
    }
  }, []);

  useEffect(() => {
    if (LogginIn[5]) {
      getSubAccTradeBalance();
      getSubAccFoundBalance();
    }
  }, [LogginIn]);

  const getSubAccTradeBalance = () => {
    const params = {
      subAcct: LogginIn[5],
    };
    ApiService.getSubAccTradeBalance(params).then((res) => {
      let tmpTrading = JSON.parse(res.data["KYC Api resuult"])?.data[0].details;
      setTrading(tmpTrading);
    });
  };

  const getSubAccFoundBalance = () => {
    const params = {
      subAcct: LogginIn[5],
    };
    ApiService.getSubAccFoundBalance(params).then((res) => {
      let tmpDeposits = JSON.parse(res.data["KYC Api resuult"])?.data;
      setDeposits(tmpDeposits);
    });
  };

  const openDepositModal = () => {
    setShowDipositModal(true);
  };

  const openTransferModal = () => {
    setShowTransferModal(true);
  };

  const openWithdrawalModal = () => {
    setShowWithdrawalModal(true);
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="wt-box p-3" style={{ height: "100%" }}>
      <div
        className="row"
        style={{
          margin: 15,
          gap: 20,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "grid", gap: 15 }}>
          <div>
            <h4 style={{ fontWeight: "bold" }}>Trading Account</h4>
            <span>Estimated balance</span>
          </div>
          <h5>1,231 = 0.01051 BTC</h5>
          <input
            type="text"
            value={search}
            onChange={handleChangeSearch}
            placeholder="Search"
          />
        </div>
        <div className="wallet-details-button-layout">
          <div className="button-item">
            <button
              class={
                type === "okx"
                  ? "btn d-block okx-button"
                  : type === "huobi"
                  ? "btn d-block huobi-button"
                  : type === "xt"
                  ? "btn d-block xt-button"
                  : "btn d-block"
              }
              onClick={openTransferModal}
            >
              <span class="material-symbols-outlined">east</span>
            </button>
            <span>{t("Transfer")}</span>
          </div>
          <div className="button-item">
            <button
              class={
                type === "okx"
                  ? "btn d-block okx-button"
                  : type === "huobi"
                  ? "btn d-block huobi-button"
                  : type === "xt"
                  ? "btn d-block xt-button"
                  : "btn d-block"
              }
              onClick={openDepositModal}
            >
              <span class="material-symbols-outlined">north</span>
            </button>
            <span>{t("Deposit")}</span>
          </div>
          <div className="button-item">
            <button
              class={
                type === "okx"
                  ? "btn d-block okx-button"
                  : type === "huobi"
                  ? "btn d-block huobi-button"
                  : type === "xt"
                  ? "btn d-block xt-button"
                  : "btn d-block"
              }
              onClick={openWithdrawalModal}
            >
              <span class="material-symbols-outlined">south</span>
            </button>
            <span>{t("Withdrawal")}</span>
          </div>
        </div>
      </div>
      <hr />
      <Modal
        show={showDipositModal}
        onHide={() => setShowDipositModal(false)}
        centered
        scrollable
      >
        <Deposit type={type} />
      </Modal>
      <Modal
        show={showTransferModal}
        onHide={() => setShowTransferModal(false)}
        centered
        scrollable
      >
        <Transfer
          type={type}
          balances={deposits}
          tradings={trading}
          onClose={() => setShowTransferModal(false)}
        />
      </Modal>
      <Modal
        show={showWithdrawalModal}
        onHide={() => setShowWithdrawalModal(false)}
        centered
        scrollable
      >
        <Withdraw
          type={type}
          balances={deposits}
          onClose={() => setShowWithdrawalModal(false)}
        />
      </Modal>
    </div>
  );
};

export default TradingAccount;
