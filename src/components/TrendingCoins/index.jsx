import "./index.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import ContentLoader from "react-content-loader";
import { getTheme } from "utils";
import { FTFTexContext } from "App";
import ApiService from "services/apiService";

const TrendingCoins = ({ ViewType }) => {
  const { t } = useTranslation();
  const timeline = useRef(null);
  const [isAppended, setIsAppended] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);
  const [loader, setLoader] = useState(false);
  const [CoinData, setCoinData] = useState([]);
  const [order, setOrder] = useState({
    field: "#",
    reversed: false,
  });

  const page = 1;
  const limit = 8;
  let sortDir = "desc";
  const [items, setItems] = useState([]);

  const changeTag = (value) => {
    // this.sortDir = value;
    // this.CoinData = [];
    // this.syncData();
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

  const syncData = () => {
    setLoader(true);
    ApiService.GetTrendingCoins(limit)
      .then((res) => {
        const data = JSON.parse(res.data.response["Result: "])?.data;
        setCoinData(data);
        setLoader(false);
      })
      .finally(() => {});
  };

  useEffect(() => {
    const tempItems = Array(9)
      .fill(0)
      .map((x, i) => i + 1);
    setItems(tempItems);

    if (!isAppended && ViewType !== "full") {
      let script = document.createElement("script");
      script.type = `text/javascript`;
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-timeline.js";
      script.text = `{
          "feedMode": "all_symbols",
          "colorTheme":"${getTheme()}",
          "isTransparent": false,
          "displayMode": "regular",
          "width": "100%",
          "height": "830",
          "locale": "en"
        }`;
      timeline.current.appendChild(script);
      setIsAppended(true);
    }

    syncData();

  }, []);

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  const numberSuffix = (num) => {
    if (num >= 1000000) {
      return numberWithCommas((num / 1000000).toFixed(2)) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K";
    } else {
      return num;
    }
  };

  const numberWithCommas = (number) => {
    return number.toLocaleString();
  };

  useEffect(() => {
    const sortedCoins = CoinData.sort((a, b) => {
      let fieldA = a["name"];
      let fieldB = b["name"];

      switch (order.field) {
        case "quote.USD.price":
          fieldA = a.quote.USD.price;
          fieldB = b.quote.USD.price;
          break;
        case "quote.USD.percent_change_24h":
          fieldA = a.quote.USD.percent_change_24h;
          fieldB = b.quote.USD.percent_change_24h;
          break;
        case "quote.USD.volume_24h":
          fieldA = a.quote.USD.volume_24h;
          fieldB = b.quote.USD.volume_24h;
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

    setCoinData(sortedCoins);
  }, [order]);
  return (
    <>
      {ViewType === "full" ? (
        <>
          <div className="d-flex  t-head">
            <span className="material-symbols-outlined align-self-center">
              local_fire_department
            </span>
            <h2 className="mr-auto s-bld mb-0 align-self-center">
              {t("Trending Coins")}
            </h2>
          </div>
          <div className="wt-box x-m-overflow mt-4">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th
                    scope="col"
                    className="cu-p"
                    onClick={() => doSort("name")}
                  >
                    <div className="d-flex">
                      {t("Name")}
                      {order.field === "name" && (
                        <span className="material-symbols-outlined align-self-center">
                          {order.reversed === true
                            ? "arrow_drop_up"
                            : "arrow_drop_down"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="cu-p"
                    onClick={() => doSort("quote.USD.price")}
                  >
                    <div className="d-flex w-fit">
                      {t("Price")}
                      {order.field === "quote.USD.price" && (
                        <span className="material-symbols-outlined align-self-center">
                          {order.reversed === true
                            ? "arrow_drop_up"
                            : "arrow_drop_down"}
                        </span>
                      )}
                    </div>
                  </th>
                  {!isMobile && (
                    <th
                      scope="col"
                      className="cu-p"
                      onClick={() => doSort("quote.USD.percent_change_24h")}
                    >
                      <div className="d-flex">
                        {t("24h")}
                        {order.field === "quote.USD.percent_change_24h" && (
                          <span className="material-symbols-outlined align-self-center">
                            {order.reversed === true
                              ? "arrow_drop_up"
                              : "arrow_drop_down"}
                          </span>
                        )}
                      </div>
                    </th>
                  )}
                  <th
                    scope="col"
                    className="cu-p text-right"
                    onClick={() => doSort("quote.USD.volume_24h")}
                  >
                    <div className="d-flex justify-content-end">
                      {t("Volume(24h)")}
                      {order.field === "quote.USD.volume_24h" && (
                        <span className="material-symbols-outlined align-self-center">
                          {order.reversed === true
                            ? "arrow_drop_up"
                            : "arrow_drop_down"}
                        </span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              {loader === false && (
                <tbody>
                  {CoinData.map((dta, i) => (
                    <tr key={i}>
                      <td className="s-bld">{i + 1}</td>
                      <td className="font-weight-bold">
                        <NavLink
                          className="d-flex cu-p"
                          to={"/coin/" + dta.id + "/" + dta.slug}
                        >
                          <img
                            className="align-self-center"
                            loading="lazy"
                            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${dta.id}.png`}
                            height="30"
                          />
                          <div className="align-self-center ml-2">
                            <p className="mb-0 s-bld c-symb"> {dta.symbol}</p>
                            <p className="mb-0 c-name "> {dta.name}</p>
                          </div>
                        </NavLink>
                      </td>
                      {dta.quote.USD.price > 1.1 && (
                        <td className="s-bld" style={{ width: 120 }}>
                          $ {numberWithCommas(dta.quote.USD.price)}
                          {isMobile && (
                            <span
                              className={
                                "txt-green s-bld " +
                                  dta?.quote.USD.percent_change_24h <
                                0
                                  ? "txt-red"
                                  : ""
                              }
                            >
                              <span className="d-flex">
                                {dta?.quote.USD.percent_change_24h < 0 && (
                                  <span className="material-symbols-outlined align-self-center">
                                    arrow_drop_down
                                  </span>
                                )}
                                {dta?.quote.USD.percent_change_24h > 0 && (
                                  <span className="material-symbols-outlined align-self-center">
                                    arrow_drop_up
                                  </span>
                                )}
                                <span className="align-self-center">
                                  {numberWithCommas(
                                    Math.abs(
                                      dta.quote.USD.percent_change_24h.toFixed(
                                        2
                                      )
                                    )
                                  )}{" "}
                                  %
                                </span>
                              </span>
                            </span>
                          )}
                        </td>
                      )}
                      {dta.quote.USD.price < 1.1 && (
                        <td className="s-bld" style={{ width: 120 }}>
                          $ {numberWithCommas(dta.quote.USD.price.toFixed(8))}
                          {isMobile && (
                            <span
                              className={
                                "txt-green s-bld " +
                                  dta?.quote.USD.percent_change_24h <
                                0
                                  ? "txt-red"
                                  : ""
                              }
                            >
                              <span className="d-flex">
                                {dta?.quote.USD.percent_change_24h < 0 && (
                                  <span className="material-symbols-outlined align-self-center">
                                    arrow_drop_down
                                  </span>
                                )}
                                {dta?.quote.USD.percent_change_24h > 0 && (
                                  <span className="material-symbols-outlined align-self-center">
                                    arrow_drop_up
                                  </span>
                                )}
                                <span className="align-self-center">
                                  {numberWithCommas(
                                    Math.abs(
                                      dta.quote.USD.percent_change_24h.toFixed(
                                        2
                                      )
                                    )
                                  )}{" "}
                                  %
                                </span>
                              </span>
                            </span>
                          )}
                        </td>
                      )}

                      {!isMobile && (
                        <td
                          className={
                            "txt-green s-bld " +
                              dta?.quote.USD.percent_change_24h <
                            0
                              ? "txt-red"
                              : ""
                          }
                        >
                          <div className="d-flex">
                            <span className="material-symbols-outlined align-self-center">
                              {dta?.quote.USD.percent_change_24h < 0
                                ? "arrow_drop_down"
                                : "arrow_drop_up"}
                            </span>
                            <span className="align-self-center">
                              {numberWithCommas(
                                Math.abs(
                                  dta.quote.USD.percent_change_24h.toFixed(2)
                                )
                              )}{" "}
                              %
                            </span>
                          </div>
                        </td>
                      )}
                      <td className="s-bld text-right">
                        $ {numberSuffix(dta.quote.USD.volume_24h)}
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
                          foregroundColor="rgba(187,187,187,0.06)"
                          backgroundColor="rgba(217,217,217,0.24)"
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
                          foregroundColor="rgba(217,217,217,0.24)"
                          backgroundColor="rgba(187,187,187,0.06)"
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
                          foregroundColor="rgba(217,217,217,0.24)"
                          backgroundColor="rgba(187,187,187,0.06)"
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

                      {!isMobile && (
                        <>
                          <td>
                            <ContentLoader
                              foregroundColor="rgba(217,217,217,0.24)"
                              backgroundColor="rgba(187,187,187,0.06)"
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
                              foregroundColor="rgba(217,217,217,0.24)"
                              backgroundColor="rgba(187,187,187,0.06)"
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
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="wt-box x-m-overflow d-none d-lg-block">
            <div className="t-head-widget d-none d-lg-flex mb-3 mt-4">
              <span className="material-symbols-outlined ml-2">
                local_fire_department
              </span>
              <h2 className="mr-auto s-bld mb-0 align-self-center">
                {t("Trending Coins")}
              </h2>
            </div>
            <table className="table table-widget">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="cu-p"
                    onClick={() => doSort("name")}
                  >
                    <div className="d-flex">
                      {t("Coin")}
                      {order.field === "name" && (
                        <span className="material-symbols-outlined align-self-center">
                          {order.reversed === true
                            ? "arrow_drop_up"
                            : "arrow_drop_down"}
                        </span>
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="cu-p"
                    onClick={() => doSort("quote.USD.price")}
                  >
                    <div className="d-flex">
                      {t("Price")}
                      {order.field === "quote.USD.price" && (
                        <span className="material-symbols-outlined align-self-center">
                          {order.reversed === true
                            ? "arrow_drop_up"
                            : "arrow_drop_down"}
                        </span>
                      )}
                    </div>
                  </th>
                </tr>
              </thead>
              {loader === false && (
                <tbody>
                  {CoinData.map((dta, i) => (
                    <tr key={i}>
                      <td className="font-weight-bold">
                        <NavLink
                          className="d-flex cu-p"
                          to={`/coin/${dta.id}/${dta.slug}`}
                        >
                          <img
                            className="align-self-center"
                            loading="lazy"
                            src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${dta.id}.png`}
                            height="30"
                          />
                          <div className="align-self-center ml-2">
                            <p className="mb-0 s-bld"> {dta.symbol}</p>
                            <p className="mb-0 c-name "> {dta.name}</p>
                          </div>
                        </NavLink>
                      </td>
                      {dta.quote.USD.price > 1.1 && (
                        <td className="s-bld">
                          $ {numberWithCommas(dta.quote.USD.price)}
                        </td>
                      )}
                      {dta.quote.USD.price < 1.1 && (
                        <td className="s-bld">
                          $ {numberWithCommas(dta.quote.USD.price.toFixed(8))}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
            {loader === true && (
              <table className="table">
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i}>
                      <td>
                        <ContentLoader
                          foregroundColor="rgba(217,217,217,0.24)"
                          backgroundColor="rgba(187,187,187,0.06)"
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
                        //   foregroundColor="rgba(217,217,217,0.24)"
                        //   backgroundColor="rgba(187,187,187,0.06)"
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
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          <div className="tradingview-widget-container">
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright" ref={timeline}>
              <a
                href="https://www.tradingview.com/key-events/"
                rel="noopener"
                target="_blank"
              >
                <span className="blue-text">Daily news roundup </span>
              </a>
              by TradingView
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default TrendingCoins;
