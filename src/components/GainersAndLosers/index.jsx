import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import numeral from "numeral";
import ContentLoader from "react-content-loader";
import ApiService from "services/apiService";
import { useContext, useEffect, useState } from "react";
import { FTFTexContext } from "App";
import "./index.scss";

const GainersAndLosers = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [CoinData, setCoinData] = useState([]);
  const limit = 8;
  const [sortDir, setSortDir] = useState("desc");
  const [loader, setLoader] = useState(false);

  const [order, setOrder] = useState({
    field: "#",
    reversed: false,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  const numberWithCommas = (number) => {
    return number ? number.toLocaleString() : "";
  };

  const numberSuffix = (num) => {
    if (num >= 1000000000) {
      return numberWithCommas(Math.round(num / 1000000000)) + "B";
    } else if (num >= 1000000) {
      return numberWithCommas(Math.round(num / 1000000)) + "M";
    } else if (num >= 1000) {
      return Math.round(num / 1000) + "K";
    } else {
      return num;
    }
  };

  useEffect(() => {
    const tempItems = Array(9)
      .fill(0)
      .map((x, i) => i + 1);
    setItems(tempItems);

    syncData(sortDir);
  }, []);

  const syncData = (sortDir) => {
    setLoader(true);
    ApiService.GainersAndLosers(sortDir, limit).then((res) => {
      let tmpCoinData = JSON.parse(res.data.response["Result: "]).data;
      setCoinData(tmpCoinData);
      setLoader(false);
    });
  };

  const changeTag = (value) => {
    setSortDir(value);
    setCoinData([]);
    syncData(value);
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

  useEffect(() => {
    const sortedCoins = CoinData.sort((a, b) => {
      let fieldA = a["name"];
      let fieldB = b["name"];

      switch (order.field) {
        case "name":
          fieldA = a.name;
          fieldB = b.name;
          break;
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
      <div className="d-flex t-head">
        <h2 className="mr-auto s-bld mb-0">{t("Top Gainers & Losers")}</h2>
        <div
          className={
            sortDir === "desc"
              ? "sub-menu-btn btn mr-2 px-4 sub-menu-btn-activate"
              : "sub-menu-btn btn mr-2 px-4"
          }
          onClick={() => changeTag("desc")}
        >
          Gainers
        </div>
        <div
          className={
            sortDir === "asc"
              ? "sub-menu-btn btn mr-2 px-4 sub-menu-btn-activate"
              : "sub-menu-btn btn mr-2 px-4"
          }
          onClick={() => changeTag("asc")}
        >
          Losers
        </div>
      </div>
      <div className="wt-box x-m-overflow mt-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="cu-p">
                #
              </th>
              <th scope="col" className="cu-p" onClick={() => doSort("name")}>
                <div className="d-flex">
                  {t("Name")}
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
                onClick={() => doSort("quote.USD.price")}
              >
                <div className="d-flex">
                  {t("Price")}
                  {order.field === "quote.USD.price" &&
                    order.reversed === true && (
                      <span className="material-symbols-outlined align-self-center">
                        arrow_drop_up
                      </span>
                    )}
                  {order.field === "quote.USD.price" &&
                    order.reversed === false && (
                      <span className="material-symbols-outlined align-self-center">
                        arrow_drop_down
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
                    {order.field === "quote.USD.percent_change_24h" &&
                      order.reversed === true && (
                        <span className="material-symbols-outlined align-self-center">
                          arrow_drop_up
                        </span>
                      )}
                    {order.field === "quote.USD.percent_change_24h" &&
                      order.reversed === false && (
                        <span className="material-symbols-outlined align-self-center">
                          arrow_drop_down
                        </span>
                      )}
                  </div>
                </th>
              )}
              <th
                scope="col"
                className="cu-p"
                onClick={() => doSort("quote.USD.volume_24h")}
              >
                <div className="d-flex justify-content-end">
                  {t("Volume(24h)")}
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
                        height={30}
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
                            dta?.quote.USD.percent_change_24h < 0
                              ? "txt-green s-bld txt-red"
                              : "txt-green s-bld"
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
                              {numeral(
                                Math.abs(dta.quote.USD.percent_change_24h)
                              ).format("0,0.0-2")}{" "}
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
                            dta?.quote.USD.percent_change_24h < 0
                              ? "txt-green s-bld txt-red"
                              : "txt-green s-bld"
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
                              {numeral(
                                Math.abs(dta.quote.USD.percent_change_24h)
                              ).format("0,0.0-2")}{" "}
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
                        dta?.quote.USD.percent_change_24h < 0
                          ? "txt-green s-bld txt-red"
                          : "txt-green s-bld"
                      }
                    >
                      <div className="d-flex">
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
                          {numeral(
                            Math.abs(dta.quote.USD.percent_change_24h)
                          ).format("0,0.0-2")}{" "}
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
                      <rect x="0" y="0" rx="3" ry="3" width="250" height="60" />
                    </ContentLoader>
                  </td>
                  <td>
                    <ContentLoader
                      backgroundColor="rgba(217,217,217,0.24)"
                      foregroundColor="rgba(187,187,187,0.06)"
                    >
                      <rect x="0" y="0" rx="3" ry="3" width="250" height="60" />
                    </ContentLoader>
                  </td>
                  {!isMobile && (
                    <>
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
  );
};

export default GainersAndLosers;
