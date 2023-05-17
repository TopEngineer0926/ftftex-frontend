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
import ContentLoader from "react-content-loader";

const TradingAccount = () => {
  const { t } = useTranslation();
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const [tab, setTab] = useState("deposit");
  const [deposits, setDeposits] = useState([]);
  const [trading, setTrading] = useState([]);
  const [sum, setSum] = useState(0);
  const [showDipositModal, setShowDipositModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const param = useParams();
  const [order, setOrder] = useState({
    field: "rank",
    reversed: false,
  });
  const [walletData, setWalletData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [items, setItems] = useState([]);

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
    if (LogginIn[5] && type === "okx") {
      getSubAccTradeBalance();
      getSubAccFoundBalance();
    } else if (LogginIn[5] && type === "huobi") {
      getSubAccountBalanceHuobi();
    }
  }, [LogginIn]);

  const getSubAccountBalanceHuobi = () => {
    const params = {
      sub_uid: "436895311",
    };
    ApiService.getSubAccountBalanceHuobi(params).then((res) => {
      console.log(res, "res");
      const tempBalance = JSON.parse(res.data["API Result"])?.data;
      if (tempBalance[0].list?.length) {
        const data = tempBalance[0].list.map((el) => {
          return {
            ...el,
            availBal: el.available,
            bal: el.balance,
            ccy: el.currency.toUpperCase(),
            frozenBal: 0,
          };
        });
        console.log(tempBalance, "tempBalance");
        setWalletData(data);
      }

      // setTrading(tmpTrading);
    });
  };

  const getSubAccTradeBalance = () => {
    const params = {
      subAcct: LogginIn[5],
    };
    ApiService.getSubAccTradeBalance(params).then((res) => {
      let tmpTrading = JSON.parse(res.data["KYC Api resuult"])?.data[0]?.details;
      console.log(tmpTrading, "tmpTrading");
      let sum = 0;
      if (tmpTrading.length) {
        tmpTrading.forEach((item) => {
          console.log(item, "item");
          sum += +item.eqUsd;
        });
      }
      setSum(sum);
      setTrading(tmpTrading);
      setWalletData(tmpTrading);
      console.log(tmpTrading, "tmpTrading");
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

  const numberWithCommas = (number) => {
    return number?.toLocaleString();
  };

  useEffect(() => {
    const sortedWallets = walletData.sort((a, b) => {
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

    setWalletData(sortedWallets);
  }, [order]);

  const goToTrade = (ccy) => {
    if (ccy !== "USDT") {
      navigate(`/trade/${ccy.toUpperCase()}_USDT`);
    } else {
      navigate(`/trade/BTC_USDT`);
    }
  };

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
          <h5>{sum} USD</h5>
          <input
            type="text"
            value={search}
            onChange={handleChangeSearch}
            placeholder="Search"
          />
        </div>
        <div className="wallet-details-button-layout">
          {type === "okx" && (
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
          )}
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
                  Asset
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
                  Amount
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
                  BTC Value
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
                  Available
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
                  Frozen
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
                  Action
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
              {walletData.map((dta, index) => (
                <tr key={index}>
                  <td className="normal-td">{index + 1}</td>
                  <td className="font-weight-bold">
                    <span className="d-flex cu-p">
                      {/*<img*/}
                      {/*  className="align-self-center"*/}
                      {/*  loading="lazy"*/}
                      {/*  src={`https://s2.coinmarketcap.com/static/img/exchanges/64x64/${dta.id}.png`}*/}
                      {/*  height={30}*/}
                      {/*/>*/}
                      <div className="align-self-center ml-2">
                        <p className="mb-0 normal-td"> {dta.ccy}</p>
                      </div>
                    </span>
                  </td>
                  <td className="normal-td">{dta.availBal}</td>
                  <td className="normal-td">{dta.eqUsd}</td>
                  <td className="normal-td">{dta.availBal}</td>
                  <td className="normal-td">{dta.frozenBal}</td>
                  <td className="normal-td">
                    {" "}
                    <button
                      class="btn d-block filter-date filter-date-selected"
                      onClick={() => goToTrade(dta.ccy)}
                    >
                      Buy/Sell
                    </button>
                  </td>
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
                      <rect x="0" y="0" rx="3" ry="3" width="250" height="60" />
                    </ContentLoader>
                  </td>
                  <td>
                    <ContentLoader
                      backgroundColor="rgba(217,217,217,0.24)"
                      foregroundColor="rgba(187,187,187,0.06)"
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="500" height="60" />
                    </ContentLoader>
                  </td>
                  <td>
                    <ContentLoader
                      backgroundColor="rgba(217,217,217,0.24)"
                      foregroundColor="rgba(187,187,187,0.06)"
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="500" height="60" />
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
