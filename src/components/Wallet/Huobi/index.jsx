import { NavLink, useNavigate } from "react-router-dom";
import "./index.scss";
import ReactApexChart from "react-apexcharts";
import { useEffect, useState, useContext } from "react";
import { getLoggedIn } from "utils";
import ApiService from "services/apiService";
import { Modal } from "react-bootstrap";
import Deposit from "components/Wallet/Deposit";
import Transfer from "components/Wallet/Transfer";
import Withdraw from "components/Wallet/Withdraw";
import { useTranslation } from "react-i18next";
import { FTFTexContext } from "App";

const Huobi = () => {
  const { t } = useTranslation();
  const [showDipositModal, setShowDipositModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [deposits, setDeposits] = useState([]);
  const [trading, setTrading] = useState([]);
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  const seriesData = [
    {
      name: "Amount",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
    },
  ];

  const options = {
    chart: {
      type: "area",
      height: 300,
      background: "#f4f4f4",
    },
    colors: ["#059adb"],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    stroke: {
      curve: "smooth",
    },
    yaxis: {
      title: {
        text: "Amount (USD)",
      },
    },
    title: {
      text: "Wallet History",
    },
  };

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

  const goToDetails = (event) => {
    navigate("/wallet/details/funding-account/huobi");
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      className="row"
      style={{
        gap: 20,
        flexDirection: isMobile ? "column" : "row",
      }}
    >
      <div style={{ display: "grid", gap: 30 }} className="col-lg-7">
        <div
          className="wt-box p-3"
          style={{ gap: 10, display: "grid", cursor: "pointer" }}
          onClick={goToDetails}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
            }}
          >
            <NavLink to={"/wallet/okx"} onClick={stopPropagation}>
              <span class="material-symbols-outlined">arrow_left</span>
            </NavLink>
            <img
              className="align-self-center"
              src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/102.png"
              height={50}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "gray" }}>WID: 12345679</span>
              <span>Huobi Wallet (37.5 %)</span>
            </div>
            <span className="huobi-wallet-details">Wallet Details</span>
            <div
              style={{
                display: "flex",
                flexDirection: "row-reverse",
                alignItems: "center",
              }}
            >
              <span
                class="material-symbols-outlined"
                style={{
                  position: isMobile ? "relative" : "absolute",
                  right: isMobile ? 0 : 30,
                }}
              >
                <NavLink to={"/wallet/xt"} onClick={stopPropagation}>
                  arrow_right
                </NavLink>
              </span>
            </div>
          </div>
          <div className="px-5">
            <span style={{ fontWeight: "bold" }}>Overview</span>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: "50%" }}>
                <span style={{ color: "gray" }}>Balance</span>
                <span style={{ marginLeft: 20 }}>1,000 USDT</span>
              </div>
              <div style={{ width: "50%" }}>
                <span style={{ color: "gray" }}>P & L</span>
                <span style={{ marginLeft: 20 }}>0.38 USDT</span>{" "}
                <span style={{ color: "lightgreen", marginLeft: 10 }}>
                  0.03%
                </span>
              </div>
            </div>
            <span style={{ color: "gray", fontSize: 14 }}>
              Information is updated every minute. Last update 14:43 GMT+4
            </span>
          </div>
        </div>
        <div className="wt-box p-3">
          <ReactApexChart
            options={options}
            series={seriesData}
            type="area"
            height={300}
          />
        </div>
        <div className="wallet-button-layout">
          <div className="wallet-button-group">
            <div className="button-item">
              <button
                class="btn d-block huobi-button"
                onClick={openTransferModal}
              >
                <span class="material-symbols-outlined">east</span>
              </button>
              <span>{t("Transfer")}</span>
            </div>
            <div className="button-item">
              <button
                class="btn d-block huobi-button"
                onClick={openDepositModal}
              >
                <span class="material-symbols-outlined">north</span>
              </button>
              <span>{t("Deposit")}</span>
            </div>
            <div className="button-item">
              <button
                class="btn d-block huobi-button"
                onClick={openWithdrawalModal}
              >
                <span class="material-symbols-outlined">south</span>
              </button>
              <span>{t("Withdrawal")}</span>
            </div>
          </div>
        </div>
        <div className="wt-box p-3" style={{ minHeight: 200 }}>
          Huobi Wallet Assets
        </div>
        <Modal
          show={showDipositModal}
          onHide={() => setShowDipositModal(false)}
          centered
          scrollable
        >
          <Deposit type="huobi" />
        </Modal>
        <Modal
          show={showTransferModal}
          onHide={() => setShowTransferModal(false)}
          centered
          scrollable
        >
          <Transfer
            type="huobi"
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
            type="huobi"
            balances={deposits}
            onClose={() => setShowWithdrawalModal(false)}
          />
        </Modal>
      </div>
      <div
        className={
          isMobile ? "wt-box col-lg-4 p-4" : "wt-box col-lg-4 ml-4 p-4"
        }
        style={{ position: "sticky", top: 0, margin: isMobile && "1rem" }}
      >
        <div className="d-flex align-items-center mb-2">
          <div className="d-flex flex-column">
            <h4 className="s-bld">Huobi Trade</h4>
          </div>
        </div>
        <div
          className="d-flex d-lg-block mb-4"
          style={{ minHeight: 600 }}
        ></div>
      </div>
    </div>
  );
};

export default Huobi;
