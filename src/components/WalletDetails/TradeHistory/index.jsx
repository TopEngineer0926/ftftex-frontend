import { useTranslation } from "react-i18next";
import "./index.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getLoggedIn } from "utils";
import ApiService from "services/apiService";
import DatePicker from "react-datepicker";
import { FTFTexContext } from "App";
import ContentLoader from "react-content-loader";

const TradeHistory = () => {
  const { t } = useTranslation();
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const [tab, setTab] = useState("deposit");
  const [deposits, setDeposits] = useState([]);
  const [trading, setTrading] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);
  const [filterDate, setFilterDate] = useState([
    {
      value: "1 Day",
      isSelected: false,
    },
    {
      value: "1 Week",
      isSelected: false,
    },
    {
      value: "1 Month",
      isSelected: false,
    },
    {
      value: "3 Months",
      isSelected: false,
    },
  ]);

  const [searchDate, setSearchDate] = useState({
    from: "",
    to: "",
  });
  const [order, setOrder] = useState({
    field: "rank",
    reversed: false,
  });
  const [tradeHisData, setTradeHisData] = useState([
    {
      date: "15-02-2023",
      time: "19:20:24",
      pair: "ETH/USDT",
      side: 1, // 1: Sell, 0: Buy
      price: "1.5212",
      executed: "0.234",
      fee: "0.5435",
      role: 1, // 1: Taker, 0: Maker
      total: "542.712",
      profit: "544.11",
    },
    {
      date: "14-02-2023",
      time: "17:35:21",
      pair: "BTC/USDT",
      side: 0,
      price: "28,810",
      executed: "1.2",
      fee: "15.5435",
      role: 0,
      total: "30,131",
      profit: "3,023",
    },
  ]);
  const [loader, setLoader] = useState(false);
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

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

  const handleChangeSelect = (index) => {
    let tmpFilterDate = [...filterDate];

    tmpFilterDate = tmpFilterDate.map((d, k) => {
      if (k === index) {
        return {
          value: d.value,
          isSelected: !d.isSelected,
        };
      }
      return {
        value: d.value,
        isSelected: false,
      };
    });

    setFilterDate(tmpFilterDate);
  };

  const handleClickReset = () => {};

  const handleClickSearch = () => {};

  useEffect(() => {
    const tmpTradeHisData = tradeHisData.sort((a, b) => {
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

    setTradeHisData(tmpTradeHisData);
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
      <div style={{ margin: 15 }}>
        <div style={{ display: "grid", gap: 15 }}>
          <div>
            <h4 style={{ fontWeight: "bold" }}>Trade History</h4>
            <span>Estimated balance</span>
          </div>
          <h5>0.018433 = 0.00021 BTC</h5>
        </div>
        <div
          className="row"
          style={{
            gap: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="filter-date-button-layout">
            {filterDate.map((d, index) => (
              <button
                class={
                  d.isSelected
                    ? "btn d-block filter-date filter-date-selected"
                    : "btn d-block filter-date"
                }
                onClick={() => handleChangeSelect(index)}
              >
                {d.value}
              </button>
            ))}
          </div>
          <div
            style={{
              gap: 10,
              display: isMobile ? "grid" : "flex",
              overflow: "auto",
            }}
          >
            <div className="col-xs-12 date-picker-panel">
              From{" "}
              <DatePicker
                selected={searchDate.from}
                onChange={(date) =>
                  setSearchDate({ ...searchDate, from: date })
                }
                className="form-control rounded-0 date-picker-width"
                placeholderText="yyyy-mm-dd"
                dateFormat={"yyyy-mm-dd"}
              />
            </div>
            <div className="col-xs-12 date-picker-panel">
              To{" "}
              <DatePicker
                selected={searchDate.to}
                onChange={(date) => setSearchDate({ ...searchDate, to: date })}
                className="form-control rounded-0 date-picker-width"
                placeholderText="yyyy-mm-dd"
                dateFormat={"yyyy-mm-dd"}
              />
            </div>
            <div className="col-xs-12 date-picker-panel">
              <button
                class="btn d-block filter-date-selected"
                onClick={handleClickSearch}
              >
                Search
              </button>
              <button class="btn d-block" onClick={handleClickReset}>
                Reset
              </button>
            </div>
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
                  Date
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
                  Time
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
                  Pair
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
                  Side
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
                  Price
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
                  Executed
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
                  Fee
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
                  Role
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
                  Profit
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
              {tradeHisData.map((dta, index) => (
                <tr key={index}>
                  <td className="normal-td">{index + 1}</td>
                  <td className="normal-td">{dta.date}</td>
                  <td className="normal-td">{dta.time}</td>
                  <td className="normal-td">{dta.pair}</td>
                  <td className="normal-td">
                    {dta.side ? (
                      <span className="sell-status">Sell</span>
                    ) : (
                      <span className="buy-status">Buy</span>
                    )}
                  </td>
                  <td className="normal-td">{dta.price}</td>
                  <td className="normal-td">{dta.executed}</td>
                  <td className="normal-td">{dta.fee} USDT</td>
                  <td className="normal-td">
                    {dta.role ? (
                      <span className="completed-status">Taker</span>
                    ) : (
                      <span>Maker</span>
                    )}
                  </td>
                  <td className="normal-td">{dta.total} USDT</td>
                  <td className="normal-td">{dta.profit} USDT</td>
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

export default TradeHistory;
