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
import ContentLoader from "react-content-loader";

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
  const [order, setOrder] = useState({
    field: "rank",
    reversed: false,
  });
  const [walletAssetData, setWalletAssetData] = useState([
    { id: 1, name: "Bitcoin", quantity: "0.12", total: "2,100", pro: "65.36" },
    { id: 21794, name: "Aptos", quantity: "4.432", total: "821", pro: "25.55" },
    { id: 7278, name: "Aave", quantity: "748", total: "292", pro: "9.08" },
  ]);
  const [loader, setLoader] = useState(false);
  const [items, setItems] = useState([]);

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
    const tempItems = Array(10)
      .fill(0)
      .map((x, i) => i + 1);
    setItems(tempItems);

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

  const numberWithCommas = (number) => {
    return number?.toLocaleString();
  };

  useEffect(() => {
    const sortedWalletAssetData = walletAssetData.sort((a, b) => {
      let fieldA = a["rank"];
      let fieldB = b["rank"];

      switch (order.field) {
        case "name":
          fieldA = a.name;
          fieldB = b.name;
          break;
        case "num_coins":
          fieldA = a.num_coins;
          fieldB = b.num_coins;
          break;
        case "num_market_pairs":
          fieldA = a.num_market_pairs;
          fieldB = b.num_market_pairs;
          break;
        case "quote.USD.effective_liquidity_24h":
          fieldA = a.quote.USD.effective_liquidity_24h;
          fieldB = b.quote.USD.effective_liquidity_24h;
          break;
        case "quote.USD.volume_24h":
          fieldA = a.quote.USD.volume_24h;
          fieldB = b.quote.USD.volume_24h;
          break;
        case "exchange_score":
          fieldA = a.exchange_score;
          fieldB = b.exchange_score;
          break;
      }

      if (fieldA < fieldB) {
        return order.reversed ? 1 : -1;
      }
      if (fieldA > fieldB) {
        return order.reversed ? -1 : 1;
      }
      return 0;
    });

    setWalletAssetData(sortedWalletAssetData);
  }, [order]);

  const doSort = (value) => {
    if (order.field == value) {
      if (order.reversed) {
        setOrder({
          ...order,
          reversed: false,
        });
      } else {
        setOrder({
          ...order,
          reversed: true,
        });
      }
    } else {
      setOrder({
        reversed: false,
        field: value,
      });
    }
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
        <div
          className="wt-box p-3"
          style={{ minHeight: 200, display: "grid", gap: 20 }}
        >
          Huobi Wallet Assets
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="cu-p" onClick={() => doSort("rank")}>
                  <div className="d-flex">
                    #
                    {order.field === "rank" && order.reversed === true && (
                      <span className="material-symbols-outlined align-self-center">
                        arrow_drop_up
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="cu-p" onClick={() => doSort("name")}>
                  <div className="d-flex">
                    Cryptocurrency
                    {order.field === "name" && order.reversed === true && (
                      <span className="material-symbols-outlined align-self-center">
                        arrow_drop_up
                      </span>
                    )}
                    {order.field === "name" && order.reversed === false && (
                      <span className="material-symbols-outlined align-self-center">
                        arrow_drop_down
                      </span>
                    )}
                  </div>
                </th>

                <th
                  scope="col"
                  className="cu-p"
                  onClick={() => doSort("quote.USD.volume_24h")}
                >
                  <div className="d-flex">
                    Quantity
                    {order.field === "quote.USD.volume_24h" &&
                      order.reversed === true && (
                        <span className="material-symbols-outlined align-self-center">
                          arrow_drop_up
                        </span>
                      )}
                    {order.field === "quote.USD.volume_24h" &&
                      order.reversed === false && (
                        <span className="material-symbols-outlined align-self-center">
                          arrow_drop_down
                        </span>
                      )}
                  </div>
                </th>

                <th
                  scope="col"
                  className="cu-p"
                  onClick={() => doSort("quote.USD.volume_24h")}
                >
                  <div className="d-flex">
                    Total
                    {order.field === "quote.USD.volume_24h" &&
                      order.reversed === true && (
                        <span className="material-symbols-outlined align-self-center">
                          arrow_drop_up
                        </span>
                      )}
                    {order.field === "quote.USD.volume_24h" &&
                      order.reversed === false && (
                        <span className="material-symbols-outlined align-self-center">
                          arrow_drop_down
                        </span>
                      )}
                  </div>
                </th>

                <th
                  scope="col"
                  className="cu-p"
                  onClick={() => doSort("quote.USD.volume_24h")}
                >
                  <div className="d-flex">
                    Wallet %
                    {order.field === "quote.USD.volume_24h" &&
                      order.reversed === true && (
                        <span className="material-symbols-outlined align-self-center">
                          arrow_drop_up
                        </span>
                      )}
                    {order.field === "quote.USD.volume_24h" &&
                      order.reversed === false && (
                        <span className="material-symbols-outlined align-self-center">
                          arrow_drop_down
                        </span>
                      )}
                  </div>
                </th>
              </tr>
            </thead>
            {loader === false && (
              <tbody>
                {walletAssetData.map((dta, index) => (
                  <tr key={index}>
                    <td className="normal-td">{index + 1}</td>
                    <td className="font-weight-bold">
                      <div className="d-flex cu-p">
                        <img
                          className="align-self-center"
                          loading="lazy"
                          src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${dta.id}.png`}
                          height={30}
                        />
                        <div className="align-self-center ml-2">
                          <p className="mb-0 normal-td"> {dta.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="normal-td">{dta.quantity}</td>
                    <td className="normal-td">{dta.total} USDT</td>
                    <td className="normal-td">{dta.pro} %</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {loader === true && (
            <table className="table">
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <ContentLoader
                        backgroundColor="rgba(217,217,217,0.24)"
                        foregroundColor="rgba(187,187,187,0.06)"
                      >
                        <rect
                          x="0"
                          y="0"
                          rx="3"
                          ry="3"
                          width="250"
                          height="60"
                        />
                      </ContentLoader>
                    </td>
                    <td>
                      <ContentLoader
                        backgroundColor="rgba(217,217,217,0.24)"
                        foregroundColor="rgba(187,187,187,0.06)"
                      >
                        <rect
                          x="0"
                          y="0"
                          rx="3"
                          ry="3"
                          width="500"
                          height="60"
                        />
                      </ContentLoader>
                    </td>
                    <td>
                      <ContentLoader
                        backgroundColor="rgba(217,217,217,0.24)"
                        foregroundColor="rgba(187,187,187,0.06)"
                      >
                        <rect
                          x="0"
                          y="0"
                          rx="3"
                          ry="3"
                          width="500"
                          height="60"
                        />
                      </ContentLoader>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
            <h4 className="normal-td">Huobi Trade</h4>
          </div>
        </div>
        <div
          className="d-flex d-lg-block mb-4"
          style={{ minHeight: 600, overflow: "auto" }}
        >
          <table className="table">
            <thead>
              <tr>
                <th scope="col" className="cu-p" onClick={() => doSort("rank")}>
                  <div className="d-flex">
                    #
                    {order.field === "rank" && order.reversed === true && (
                      <span className="material-symbols-outlined align-self-center">
                        arrow_drop_up
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="cu-p" onClick={() => doSort("name")}>
                  <div className="d-flex">
                    Wallet
                    {order.field === "name" && order.reversed === true && (
                      <span className="material-symbols-outlined align-self-center">
                        arrow_drop_up
                      </span>
                    )}
                    {order.field === "name" && order.reversed === false && (
                      <span className="material-symbols-outlined align-self-center">
                        arrow_drop_down
                      </span>
                    )}
                  </div>
                </th>

                <th
                  scope="col"
                  className="cu-p"
                  onClick={() => doSort("quote.USD.volume_24h")}
                >
                  <div className="d-flex">
                    Total
                    {order.field === "quote.USD.volume_24h" &&
                      order.reversed === true && (
                        <span className="material-symbols-outlined align-self-center">
                          arrow_drop_up
                        </span>
                      )}
                    {order.field === "quote.USD.volume_24h" &&
                      order.reversed === false && (
                        <span className="material-symbols-outlined align-self-center">
                          arrow_drop_down
                        </span>
                      )}
                  </div>
                </th>

                <th
                  scope="col"
                  className="cu-p"
                  onClick={() => doSort("quote.USD.volume_24h")}
                >
                  <div className="d-flex">
                    Wallet %
                    {order.field === "quote.USD.volume_24h" &&
                      order.reversed === true && (
                        <span className="material-symbols-outlined align-self-center">
                          arrow_drop_up
                        </span>
                      )}
                    {order.field === "quote.USD.volume_24h" &&
                      order.reversed === false && (
                        <span className="material-symbols-outlined align-self-center">
                          arrow_drop_down
                        </span>
                      )}
                  </div>
                </th>
              </tr>
            </thead>
            {loader === false && (
              <tbody>
                {walletAssetData.map((dta, index) => (
                  <tr key={index}>
                    <td className="normal-td">{index + 1}</td>
                    <td className="font-weight-bold">
                      <div className="d-flex cu-p">
                        <img
                          className="align-self-center"
                          loading="lazy"
                          src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${dta.id}.png`}
                          height={30}
                        />
                        <div className="align-self-center ml-2">
                          <p className="mb-0 normal-td"> {dta.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="normal-td">{dta.total} USDT</td>
                    <td className="normal-td">{dta.pro} %</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {loader === true && (
            <table className="table">
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <ContentLoader
                        backgroundColor="rgba(217,217,217,0.24)"
                        foregroundColor="rgba(187,187,187,0.06)"
                      >
                        <rect
                          x="0"
                          y="0"
                          rx="3"
                          ry="3"
                          width="250"
                          height="60"
                        />
                      </ContentLoader>
                    </td>
                    <td>
                      <ContentLoader
                        backgroundColor="rgba(217,217,217,0.24)"
                        foregroundColor="rgba(187,187,187,0.06)"
                      >
                        <rect
                          x="0"
                          y="0"
                          rx="3"
                          ry="3"
                          width="500"
                          height="60"
                        />
                      </ContentLoader>
                    </td>
                    <td>
                      <ContentLoader
                        backgroundColor="rgba(217,217,217,0.24)"
                        foregroundColor="rgba(187,187,187,0.06)"
                      >
                        <rect
                          x="0"
                          y="0"
                          rx="3"
                          ry="3"
                          width="500"
                          height="60"
                        />
                      </ContentLoader>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Huobi;
