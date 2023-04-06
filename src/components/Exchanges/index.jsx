import "./index.scss";
import { useTranslation } from "react-i18next";
import ContentLoader from "react-content-loader";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ApiService from "services/apiService";
import { FTFTexContext } from "App";

const Exchanges = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [ExchangeData, setExchangeData] = useState([]);
  const [Category, setCategory] = useState("spot");
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);
  const [totalCount, setTotalCount] = useState(0);
  const [order, setOrder] = useState({
    field: "rank",
    reversed: false,
  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const tempItems = Array(10)
      .fill(0)
      .map((x, i) => i + 1);
    setItems(tempItems);

    syncData(Category, page);
  }, []);

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  const numberWithCommas = (number) => {
    return number?.toLocaleString();
  };

  const syncData = (category, p) => {
    setLoader(true);
    ApiService.GetExchangesList(category, p, limit)
      .then((res) => {
        let tempExchangeData = JSON.parse(res.data.response["Result: "])?.data;
        let tempTotalCount = JSON.parse(res.data.response["Result: "]).status
          .total_count;
        setExchangeData(tempExchangeData);
        setTotalCount(tempTotalCount);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const switchSubTab = (value) => {
    setCategory(value);
    setPage(1);
    setExchangeData([]);
    syncData(value, 1);
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

  const changePage = (p) => {
    setPage(p);
    syncData(Category, p);
    window.scroll(0, 0);
  };

  useEffect(() => {
    const sortedExchanges = ExchangeData.sort((a, b) => {
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

    setExchangeData(sortedExchanges);
  }, [order]);

  return (
    <div className="container mb-5">
      <div className="row mt-5">
        <div className="col-md-12">
          <div className="d-flex t-head">
            <h2 className="mr-auto s-bld mb-0">
              {t("Top Cryptocurrency Exchanges")}
            </h2>
            {/* <!-- <div className="sub-menu-btn btn mr-2 px-4" [ngClass]="{'sub-menu-btn-activate' : Category === 'spot'}" onClick="switchSubTab('spot')">{t("Spot")}</div>-->
<!--        <div className="sub-menu-btn btn mr-2 px-4" [ngClass]="{'sub-menu-btn-activate' : Category === 'derivatives'}" onClick="switchSubTab('derivatives')">{t("Derivatives")}</div>-->
  <!--      <div className="sub-menu-btn btn mr-2" [ngClass]="{'sub-menu-btn-activate' : Category === 'dex'}" onClick="switchSubTab('dex')">Dex</div>
        <div className="sub-menu-btn btn mr-2" [ngClass]="{'sub-menu-btn-activate' : Category === 'lending'}" onClick="switchSubTab('lending')">Lending</div>--> */}
          </div>
        </div>
      </div>
      <div className="wt-box x-m-overflow mt-2 mt-lg-4">
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
                  {t("Exchange")}
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
              {isMobile === false && (
                <>
                  <th
                    scope="col"
                    className="cu-p"
                    onClick={() => doSort("exchange_score")}
                  >
                    <div className="d-flex">
                      {t("Exchange Score")}
                      {order.field === "exchange_score" &&
                        order.reversed === true && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_up
                          </span>
                        )}
                      {order.field === "exchange_score" &&
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
                    onClick={() => doSort("quote.USD.effective_liquidity_24h")}
                  >
                    <div className="d-flex">
                      {t("Avg.Liquidity")}
                      {order.field === "quote.USD.effective_liquidity_24h" &&
                        order.reversed === true && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_up
                          </span>
                        )}
                      {order.field === "quote.USD.effective_liquidity_24h" &&
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
                    onClick={() => doSort("num_market_pairs")}
                  >
                    <div className="d-flex">
                      {t("#Markets")}
                      {order.field === "num_market_pairs" &&
                        order.reversed === true && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_up
                          </span>
                        )}
                      {order.field === "num_market_pairs" &&
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
                    onClick={() => doSort("num_coins")}
                  >
                    <div className="d-flex">
                      {t("#Coins")}
                      {order.field === "num_coins" &&
                        order.reversed === true && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_up
                          </span>
                        )}
                      {order.field === "num_coins" &&
                        order.reversed === false && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_down
                          </span>
                        )}
                    </div>
                  </th>
                  <th scope="col">{t("Volume Graph (7d)")}</th>
                </>
              )}
            </tr>
          </thead>
          {loader === false && (
            <tbody>
              {ExchangeData.map((dta, index) => (
                <tr key={index}>
                  <td className="s-bld">{dta.rank}</td>
                  <td className="font-weight-bold">
                    <NavLink
                      className="d-flex cu-p"
                      to={"/exchange/" + dta.id + "/" + dta.slug}
                    >
                      <img
                        className="align-self-center"
                        loading="lazy"
                        src={`https://s2.coinmarketcap.com/static/img/exchanges/64x64/${dta.id}.png`}
                        height={30}
                      />
                      <div className="align-self-center ml-2">
                        <p className="mb-0 s-bld">
                          {" "}
                          {dta.name.replace("Exchange", "")}
                        </p>
                      </div>
                    </NavLink>
                  </td>

                  <td className=" s-bld">
                    {dta.quote.USD.volume_24h > 0 && (
                      <span className="align-self-center">
                        $ {numberWithCommas(dta.quote.USD.volume_24h)}
                      </span>
                    )}
                    {dta.quote.USD.volume_24h < 0 && (
                      <span className="align-self-center">--</span>
                    )}
                    <div
                      className={
                        dta?.quote.USD.percent_change_volume_24h < 0
                          ? "d-flex txt-green txt-red"
                          : "d-flex txt-green"
                      }
                    >
                      {dta?.quote.USD.percent_change_volume_24h < 0 && (
                        <span className="material-symbols-outlined align-self-center">
                          arrow_drop_down
                        </span>
                      )}
                      {dta?.quote.USD.percent_change_volume_24h > 0 && (
                        <span className="material-symbols-outlined align-self-center">
                          arrow_drop_up
                        </span>
                      )}
                      <span className="align-self-center">
                        {numberWithCommas(
                          (
                            Math.abs(
                              dta.quote.USD.percent_change_volume_24h * 100
                            ) / 100
                          ).toFixed(2)
                        )}{" "}
                        %
                      </span>
                    </div>
                  </td>
                  {isMobile === false && (
                    <>
                      <td className="s-bld">
                        {numberWithCommas(dta.exchange_score)}
                      </td>
                      <td className="s-bld">
                        {numberWithCommas(
                          dta.quote.USD.effective_liquidity_24h
                        )}
                      </td>
                      {dta.num_market_pairs > 0 && (
                        <td className="s-bld">{dta.num_market_pairs}</td>
                      )}
                      {dta.num_market_pairs < 0 && (
                        <td className="s-bld">--</td>
                      )}
                      <td className="s-bld">{dta.num_coins}</td>
                      <td>
                        <img
                          className="grp-clr"
                          src={`https://s3.coinmarketcap.com/generated/sparklines/exchanges/web/7d/usd/${dta.id}.svg`}
                          loading="lazy"
                          height="40"
                        />
                      </td>
                    </>
                  )}
                </tr>
              ))}
              {/* <ng-container *ngFor="let dta of ExchangeData | orderBy: order.field : order.reversed | paginate: { id: 'foo', itemsPerPage: 100,currentPage: page, totalItems: this.totalCount } ">
        
      </ng-container> */}
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
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* <pagination-controls [id]="foo"  (pageChange)="changePage($event)"   [maxSize]="10"  [directionLinks]="false" ></pagination-controls> */}
      </div>
    </div>
  );
};

export default Exchanges;
