import "./index.scss";
import { useTranslation } from "react-i18next";
import ContentLoader from "react-content-loader";
import { NavLink, useNavigate } from "react-router-dom";
import numeral from "numeral";
import { useContext, useEffect, useState } from "react";
import { FTFTexContext } from "App";
import ApiService from "services/apiService";
import TradingDataService from "services/tradingDataService";
import { Modal } from "react-bootstrap";
import SelectExchangePop from "./SelectExchangePop";

const Coin = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [CoinData, setCoinData] = useState([]);
  const [tag, setTag] = useState("all");
  const [loader, setLoader] = useState(false);
  const [order, setOrder] = useState({
    field: "cmc_rank",
    reversed: false,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);
  const [AlowedPairs, setAlowedPairs] = useState(TradingDataService.Pairs);
  const [showModal, setShowModal] = useState(false);
  const [popData, setPopData] = useState({
    url: "",
    coin: "",
  });

  const page = 1;
  const limit = 8;
  const sort = "market_cap";
  const sort_dir = "desc";

  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const numberWithCommas = (number) => {
    return number.toLocaleString();
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
    const tempItems = Array(10)
      .fill(0)
      .map((x, i) => i + 1);
    setItems(tempItems);

    syncData(tag);
  }, []);

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  const syncData = (tag) => {
    setLoader(true);
    ApiService.getCoinData(page, limit, tag, sort, sort_dir)
      .then((res) => {
        let tmpCoinData = JSON.parse(res.data.response["Result: "])?.data;
        console.log("========", tmpCoinData);
        setCoinData(tmpCoinData);
      })
      .finally(() => setLoader(false));
  };

  const changeTag = (value) => {
    setTag(value);
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

  const navigationCheck = (url, coin) => {
    if (AlowedPairs.includes(coin + "USDT")) {
      setPopData({ url, coin });
    } else {
      navigate(`/coin/${url}`);
    }
  };

  useEffect(() => {
    if (popData.url !== "" && popData.coin !== "") {
      setShowModal(true);
    }
  }, [popData]);

  useEffect(() => {
    const sortedCoins = CoinData.sort((a, b) => {
      let fieldA = a["cmc_rank"];
      let fieldB = b["cmc_rank"];

      switch (order.field) {
        case "name":
          fieldA = a.name;
          fieldB = b.name;
          break;
        case "quote.USD.price":
          fieldA = a.quote.USD.price;
          fieldB = b.quote.USD.price;
          break;
        case "quote.USD.percent_change_1h":
          fieldA = a.quote.USD.percent_change_1h;
          fieldB = b.quote.USD.percent_change_1h;
          break;
        case "quote.USD.percent_change_2h":
          fieldA = a.quote.USD.percent_change_2h;
          fieldB = b.quote.USD.percent_change_2h;
          break;
        case "quote.USD.percent_change_7d":
          fieldA = a.quote.USD.percent_change_7d;
          fieldB = b.quote.USD.percent_change_7d;
          break;
        case "quote.USD.market_cap":
          fieldA = a.quote.USD.market_cap;
          fieldB = b.quote.USD.market_cap;
          break;
        case "quote.USD.volume_24h":
          fieldA = a.quote.USD.volume_24h;
          fieldB = b.quote.USD.volume_24h;
          break;
        case "total_supply":
          fieldA = a.total_supply;
          fieldB = b.total_supply;
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
      <div className="d-flex t-head mt-4">
        {tag === "all" && (
          <h2 className="mr-auto s-bld mb-0">{t("Cryptocurrency Ranking")}</h2>
        )}
        {tag === "defi" && (
          <h2 className="mr-auto s-bld mb-0">{t("DeFi Tokens Ranking")}</h2>
        )}
        <div
          className={
            tag === "all"
              ? "sub-menu-btn btn mr-2 px-4 sub-menu-btn-activate"
              : "sub-menu-btn btn mr-2 px-4"
          }
          onClick={() => changeTag("all")}
        >
          {t("Cryptocurrencies")}
        </div>
        <div
          className={
            tag === "defi"
              ? "sub-menu-btn btn mr-2 px-4 sub-menu-btn-activate"
              : "sub-menu-btn btn mr-2 px-4"
          }
          onClick={() => changeTag("defi")}
        >
          {t("DeFi")}
        </div>
      </div>
      <div className="wt-box x-m-overflow mt-4">
        {loader === false && (
          <table className="table">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="cu-p"
                  onClick={() => doSort("cmc_rank")}
                >
                  <div className="d-flex">
                    #
                    {order.field === "cmc_rank" && order.reversed === true && (
                      <span className="material-symbols-outlined align-self-center">
                        arrow_drop_down
                      </span>
                    )}
                  </div>
                </th>
                <th scope="col" className="cu-p" onClick={() => doSort("name")}>
                  <div className="d-flex">
                    {" "}
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
                    {" "}
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
                  <>
                    <th
                      scope="col"
                      className="cu-p"
                      onClick={() => doSort("quote.USD.percent_change_1h")}
                    >
                      <div className="d-flex">
                        {" "}
                        {t("1h")}
                        {order.field === "quote.USD.percent_change_1h" &&
                          order.reversed === true && (
                            <span className="material-symbols-outlined align-self-center">
                              arrow_drop_up
                            </span>
                          )}
                        {order.field === "quote.USD.percent_change_1h" &&
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
                      onClick={() => doSort("quote.USD.percent_change_2h")}
                    >
                      <div className="d-flex">
                        {t("24h")}
                        {order.field === "quote.USD.percent_change_2h" &&
                          order.reversed === true && (
                            <span className="material-symbols-outlined align-self-center">
                              arrow_drop_up
                            </span>
                          )}
                        {order.field === "quote.USD.percent_change_2h" &&
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
                      onClick={() => doSort("quote.USD.percent_change_7d")}
                    >
                      <div className="d-flex">
                        {t("7d")}
                        {order.field === "quote.USD.percent_change_7d" &&
                          order.reversed === true && (
                            <span className="material-symbols-outlined align-self-center">
                              arrow_drop_up
                            </span>
                          )}
                        {order.field === "quote.USD.percent_change_7d" &&
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
                      onClick={() => doSort("quote.USD.market_cap")}
                    >
                      <div className="d-flex">
                        {t("Market Cap")}
                        {order.field === "quote.USD.market_cap" &&
                          order.reversed === true && (
                            <span className="material-symbols-outlined align-self-center">
                              arrow_drop_up
                            </span>
                          )}
                        {order.field === "quote.USD.market_cap" &&
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
                    <th
                      scope="col"
                      className="cu-p"
                      onClick={() => doSort("total_supply")}
                    >
                      <div className="d-flex">
                        {t("Total Supply")}
                        {order.field === "total_supply" &&
                          order.reversed === true && (
                            <span className="material-symbols-outlined align-self-center">
                              arrow_drop_up
                            </span>
                          )}
                        {order.field === "total_supply" &&
                          order.reversed === false && (
                            <span className="material-symbols-outlined align-self-center">
                              arrow_drop_down
                            </span>
                          )}
                      </div>
                    </th>
                  </>
                )}
                <th scope="col" className="text-right">
                  {t("Last 7 Days")}
                </th>
              </tr>
            </thead>
            <tbody>
              {CoinData.map((dta, index) => (
                <tr
                  className="cu-p"
                  onClick={() =>
                    navigationCheck(dta.id + "/" + dta.slug, dta.symbol)
                  }
                  key={index}
                >
                  <td className="s-bld td-rank">{dta.cmc_rank}</td>
                  <td className="font-weight-bold">
                    <div className="d-flex cu-p">
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
                    </div>
                  </td>
                  {dta.quote.USD.price > 1.1 && (
                    <td className="s-bld">
                      $ {numberWithCommas(dta.quote.USD.price)}
                      {isMobile && (
                        <span
                          className={
                            dta?.quote.USD.percent_change_24h < 0
                              ? "txt-green txt-red"
                              : "txt-green"
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
                    <td className="s-bld">
                      $ {numeral(dta.quote.USD.price).format("0,0.0-8")}
                      {isMobile && (
                        <span
                          className={
                            dta?.quote.USD.percent_change_24h < 0
                              ? "txt-green txt-red"
                              : "txt-green"
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
                  {dta.quote.USD.price === 0 && <td className="s-bld">--</td>}
                  {!isMobile && (
                    <>
                      <td
                        className={
                          dta?.quote.USD.percent_change_1h < 0
                            ? "txt-green txt-red"
                            : "txt-green"
                        }
                      >
                        <div className="d-flex">
                          {dta?.quote.USD.percent_change_1h < 0 && (
                            <span className="material-symbols-outlined align-self-center">
                              arrow_drop_down
                            </span>
                          )}
                          {dta?.quote.USD.percent_change_1h > 0 && (
                            <span className="material-symbols-outlined align-self-center">
                              arrow_drop_up
                            </span>
                          )}
                          <span className="align-self-center">
                            {numeral(
                              Math.abs(dta.quote.USD.percent_change_1h)
                            ).format("0,0.0-2")}{" "}
                            %
                          </span>
                        </div>
                      </td>
                      <td
                        className={
                          dta?.quote.USD.percent_change_24h < 0
                            ? "txt-green txt-red"
                            : "txt-green"
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
                      <td
                        className={
                          dta?.quote.USD.percent_change_7d < 0
                            ? "txt-green txt-red"
                            : "txt-green"
                        }
                      >
                        <div className="d-flex">
                          {dta?.quote.USD.percent_change_7d < 0 && (
                            <span className="material-symbols-outlined align-self-center">
                              arrow_drop_down
                            </span>
                          )}
                          {dta?.quote.USD.percent_change_7d > 0 && (
                            <span className="material-symbols-outlined align-self-center">
                              arrow_drop_up
                            </span>
                          )}
                          <span className="align-self-center">
                            {numeral(
                              Math.abs(dta.quote.USD.percent_change_7d)
                            ).format("0,0.0-2")}{" "}
                            %{" "}
                          </span>
                        </div>
                      </td>

                      {dta.quote.USD.market_cap > 1.1 && (
                        <td className="s-bld">
                          $ {numberSuffix(dta.quote.USD.market_cap)}
                        </td>
                      )}
                      {dta.quote.USD.market_cap < 1.1 &&
                        dta.quote.USD.market_cap > 0 && (
                          <td className="s-bld">
                            ${" "}
                            {numeral(dta.quote.USD.market_cap).format(
                              "0,0.0-8"
                            )}
                          </td>
                        )}
                      {dta.quote.USD.market_cap === 0 && (
                        <td className="s-bld">--</td>
                      )}

                      {dta.quote.USD.volume_24h > 1.1 && (
                        <td className="s-bld">
                          $ {numberSuffix(dta.quote.USD.volume_24h)}
                        </td>
                      )}
                      {dta.quote.USD.volume_24h < 1.1 &&
                        dta.quote.USD.volume_24h > 0 && (
                          <td className="s-bld">
                            ${" "}
                            {numeral(dta.quote.USD.volume_24h).format(
                              "0,0.0-8"
                            )}
                          </td>
                        )}
                      {dta.quote.USD.volume_24h === 0 && (
                        <td className="s-bld">--</td>
                      )}

                      {dta.total_supply > 1.1 && (
                        <td className="s-bld">
                          {numberSuffix(dta.total_supply)}
                        </td>
                      )}
                      {dta.total_supply < 1.1 && dta.total_supply > 0 && (
                        <td className="s-bld">
                          {numeral(dta.total_supply).format("0,0.0-8")}
                        </td>
                      )}
                      {dta.total_supply === 0 && <td className="s-bld">--</td>}
                    </>
                  )}
                  <td className="grp-clr text-right">
                    <img
                      className="chart-line"
                      src={`https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${dta.id}.svg`}
                      loading="lazy"
                      height={40}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
                      <rect x="0" y="0" rx="3" ry="3" width="400" height="60" />
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

                  {isMobile === false && (
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
                            width="400"
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
        {loader === false && (
          <button className="btn sub-menu-btn text-center mx-auto d-block px-4 mb-2">
            <NavLink to="/coins">{t("Show more")}</NavLink>
          </button>
        )}
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <SelectExchangePop data={popData} onClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default Coin;
