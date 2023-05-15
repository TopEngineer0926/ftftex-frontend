import { useTranslation } from "react-i18next";
import "./index.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLoggedIn } from "utils";
import ApiService from "services/apiService";
import ContentLoader from "react-content-loader";

const TransactionHistory = () => {
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
    {
      time: "15-02-2023 19:20:24",
      type: "Deposit",
      asset: "ETH",
      amount: "50",
      dest: "0xb73e...1ad39",
      to: "123c...1231",
      status: 1,
    },
    {
      time: "13-02-2023 21:23:24",
      type: "Withdrawal",
      asset: "BTC",
      amount: "155",
      dest: "0c1233...13at7",
      to: "123a...k41d5",
      status: 1,
    },
    {
      time: "11-01-2023 20:12:21",
      type: "Deposit",
      asset: "XRP",
      amount: "1,000",
      dest: "0xb73e...1ad39",
      to: "123c...1231",
      status: 0,
    },
    {
      time: "02-01-2023 19:20:24",
      type: "Withdrawal",
      asset: "BTC",
      amount: ".05",
      dest: "0xb73e...1ad39",
      to: "123c...1231",
      status: 1,
    },
    {
      time: "15-02-2023 19:20:24",
      type: "Withdrawal",
      asset: "DOGE",
      amount: "1,321,301",
      dest: "0xb73e...1ad39",
      to: "123c...1231",
      status: 1,
    },
  ]);
  const [loader, setLoader] = useState(false);
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

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
    <div className="wt-box p-3" style={{ height: "100%" }}>
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
                  Time
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
                  Type
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
                  Asset
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
                  Destination
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
                  To
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
                  Status
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
                  <td className="normal-td">{dta.time}</td>
                  <td className="normal-td">{dta.asset}</td>
                  <td className="normal-td">{dta.type}</td>
                  <td className="normal-td">{dta.amount}</td>
                  <td className="normal-td">{dta.dest}</td>
                  <td className="normal-td">{dta.to}</td>
                  <td className="normal-td">
                    {dta.status ? (
                      <span className="completed-status">Complete</span>
                    ) : (
                      <span className="pending-status">Pending</span>
                    )}
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
    </div>
  );
};

export default TransactionHistory;
