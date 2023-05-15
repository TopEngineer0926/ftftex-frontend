import { useTranslation } from "react-i18next";
import "./index.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getLoggedIn } from "utils";
import ApiService from "services/apiService";
import ReactApexChart from "react-apexcharts";
import ContentLoader from "react-content-loader";
import { FTFTexContext } from "App";

const WalletMain = () => {
  const { t } = useTranslation();
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const [tab, setTab] = useState("deposit");
  const [deposits, setDeposits] = useState([]);
  const [trading, setTrading] = useState([]);
  const [order, setOrder] = useState({
    field: "rank",
    reversed: false,
  });
  const [walletData, setWalletData] = useState([
    { id: 294, name: "OKX", total: "2,000", pro: "62.50" },
    { id: 102, name: "Huobi", total: "1,200", pro: "37.50" },
    { id: 525, name: "XT.com", total: "-", pro: "0.00" },
  ]);
  const [loader, setLoader] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);
  const [isMobile, setIsMobile] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  const navigate = useNavigate();

  const seriesData = [
    {
      name: "Sales",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
    },
  ];

  const options = {
    chart: {
      type: "area",
      height: 300,
      background: "#f4f4f4",
    },
    colors: ["#001fff"],
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

  const numberWithCommas = (number) => {
    return number?.toLocaleString();
  };

  const getSubAccTradeBalance = () => {
    const params = {
      subAcct: LogginIn[5],
    };
    ApiService.getSubAccTradeBalance(params).then((res) => {
      let tmpTrading = JSON.parse(res.data["KYC Api resuult"])?.data[0]?.details;
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
      style={{ display: "grid", gap: 30, padding: "unset" }}
      className="col-lg-10"
    >
      <div className="wt-box p-3" style={{ gap: 10, display: "grid" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
          }}
        >
          <span
            class="material-symbols-outlined"
            style={{ visibility: "hidden" }}
          >
            arrow_left
          </span>
          <img className="align-self-center" src="/favicon.svg" height={50} />
          <span style={{ fontSize: 20 }}>Aggregated Wallet</span>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <span
              class="material-symbols-outlined"
              style={{ position: "absolute", right: 30 }}
            >
              <NavLink to={"/wallet/okx"}>arrow_right</NavLink>
            </span>
          </div>
        </div>
        <div className="px-5">
          <span style={{ fontWeight: "bold" }}>Overview</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "50%" }}>
              <span style={{ color: "gray" }}>Balance</span>
              <span style={{ marginLeft: 20 }}>3,200 USDT</span>
            </div>
            <div style={{ width: "50%" }}>
              <span style={{ color: "gray" }}>P & L</span>
              <span style={{ marginLeft: 20 }}>50 USDT</span>{" "}
              <span style={{ color: "lightgreen", marginLeft: 10 }}>1.7%</span>
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
              class="btn d-block purchase-button"
              onClick={() => navigate("/wallet/purchase-crypto")}
            >
              <span class="material-symbols-outlined">shopping_cart</span>
            </button>
            <span>{t("Purchase Crypto")}</span>
          </div>
        </div>
      </div>
      <div
        className="wt-box p-3"
        style={{ minHeight: 200, display: "grid", gap: 20 }}
      >
        Wallet Composition
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
                  Agg.Wallet %
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
                    <NavLink className="d-flex cu-p">
                      <img
                        className="align-self-center"
                        loading="lazy"
                        src={`https://s2.coinmarketcap.com/static/img/exchanges/64x64/${dta.id}.png`}
                        height={30}
                      />
                      <div className="align-self-center ml-2">
                        <p className="mb-0 normal-td"> {dta.name}</p>
                      </div>
                    </NavLink>
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
    </div>
  );
};

export default WalletMain;
