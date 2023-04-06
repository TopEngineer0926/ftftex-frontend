import { NavLink, useParams } from "react-router-dom";
import "./index.scss";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import ApiService from "services/apiService";
import { FTFTexContext } from "App";
import TradingDataService from "services/tradingDataService";

const SingleExchange = () => {
  const { t } = useTranslation();
  const param = useParams();
  const [Data, setData] = useState([]);
  const [category, setCategory] = useState("spot");
  const [Pairs, setPairs] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);
  const [AvailablePairs, setAvailablePairs] = useState(
    TradingDataService.Pairs
  );

  useEffect(() => {
    setAvailablePairs(TradingDataService.Pairs);
  }, []);

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  const shortHTTP = (value) => {
    let data = value.replace("https://", "");
    data = data.replace("http://", "");
    data = data.replace(/\/$/, "");

    return data;
  };

  const numberWithCommas = (number) => {
    return number ? number.toLocaleString() : 0;
  };

  const numberSuffix = (num) => {
    if (num >= 1000000000) {
      return numberWithCommas(num / 1000000000) + "B";
    } else if (num >= 1000000) {
      return numberWithCommas(num / 1000000) + "M";
    } else if (num >= 1000) {
      return num / 1000 + "K";
    } else {
      return num ? num : 0;
    }
  };

  const loadMarket = (category) => {
    ApiService.GetExchangePairs(param.id, param.slug, category, 100).then(
      (res) => {
        const Allpairs = JSON.parse(res.data.response["Result: "]).data
          .market_pairs;
        console.log(Allpairs);
        let tempPairs = [];
        for (let dta of Allpairs) {
          if (dta.market_pair_quote.currency_symbol === "USDT") {
            console.log("==", AvailablePairs);
            if (AvailablePairs.includes(dta.market_pair.replace("/", ""))) {
              tempPairs.push(dta);
            }
          }
        }
        setPairs(tempPairs);
      }
    );
  };

  const changeDataType = (value) => {
    setPairs([]);
    setCategory(value);
    loadMarket(value);
  };

  useEffect(() => {
    if (param.id && param.slug) {
      ApiService.GetSingleExchange(param.id, param.slug).then((res) => {
        let tempData = JSON.parse(res.data.response["Result: "]).data[param.id];
        setData(tempData);
        loadMarket(category);
      });
    }
  }, [param]);

  return (
    <div className="min-h-full">
      {Data && Pairs && (
        <div className="my-4 container wt-box p-4">
          <div className="row">
            <div className="col mt-md-0">
              <div className="d-flex flex-wrap m-head">
                <img
                  className="align-self-center"
                  src={Data?.logo}
                  height={45}
                  width={45}
                />
                <div className="align-self-center ml-3">
                  <h1 className="mb-0 s-bld mt-0"> {Data?.name}</h1>
                  <div className="d-flex">
                    <div className="stk-gr font-weight-bold">
                      {t("Exchange")}
                    </div>
                  </div>
                </div>
                <div className="ml-md-5 p-tik">
                  <p className="title mb-0 s-bld">{t("Market Cap")}</p>
                  <h1
                    className="mb-0 s-bld price mt-0"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {" "}
                    $ {numberWithCommas(Data?.spot_volume_usd)}
                  </h1>
                </div>
              </div>
              <div className="d-flex my-4 flex-wrap">
                {Data?.urls?.website[0] && (
                  <div className="btn-def  d-flex m-1">
                    <span className="material-symbols-outlined align-self-center">
                      link{" "}
                    </span>
                    <a
                      className="align-self-center ml-2"
                      href={Data?.urls?.website[0]}
                      target="_blank"
                    >
                      {shortHTTP(Data?.urls?.website[0])}
                    </a>
                  </div>
                )}
                {Data?.urls?.fee[0] && (
                  <div className="btn-def  d-flex m-1">
                    <span className="material-symbols-outlined align-self-center">
                      account_balance{" "}
                    </span>
                    <a
                      className="align-self-center ml-2"
                      href={Data?.urls?.fee[0]}
                      target="_blank"
                    >
                      Fee
                    </a>
                  </div>
                )}
                {Data?.urls?.twitter[0] && (
                  <div className="btn-def  d-flex m-1">
                    <span className="material-symbols-outlined align-self-center">
                      groups{" "}
                    </span>
                    <a
                      className="align-self-center ml-2"
                      href={Data?.urls?.twitter[0]}
                      target="_blank"
                    >
                      {shortHTTP(Data?.urls?.twitter[0])}
                    </a>
                  </div>
                )}
                {Data?.urls?.chat[0] && (
                  <div className="btn-def  d-flex m-1">
                    <span className="material-symbols-outlined align-self-center">
                      chat{" "}
                    </span>
                    <a
                      className="align-self-center ml-2"
                      href={Data?.urls?.chat[0]}
                      target="_blank"
                    >
                      {shortHTTP(Data?.urls?.chat[0])}
                    </a>
                  </div>
                )}
              </div>
              <hr />
            </div>
          </div>
          {Pairs.length > 0 && (
            <div className="row">
              <div className="col-md-12">
                <div className="d-flex justify-content-between mb-3">
                  <h3 className="s-bld mb-0">{t("Pairs")}</h3>
                  <div className="chart-filters">
                    <div
                      className={
                        category === "spot"
                          ? "btn btn-sm btn-sm-activated"
                          : "btn btn-sm"
                      }
                      onClick={() => changeDataType("spot")}
                    >
                      Spot
                    </div>
                    {/* <div className="btn btn-sm" [ngClass]="{'btn-sm-activated' : category === 'perpetual'}"  onClick={() => changeDataType('perpetual')}>Perpetual</div>
            <div className="btn btn-sm"  [ngClass]="{'btn-sm-activated' : category === 'futures'}" onClick={() => changeDataType('futures')}>Futures</div> */}
                  </div>
                </div>
                <div className="x-m-overflow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">{t("Pair")}</th>

                        <th scope="col">{t("Price")}</th>
                        {!isMobile && (
                          <>
                            <th scope="col">{t("Volume")}</th>
                            {category !== "futures" && (
                              <th scope="col">{t("Volume %")}</th>
                            )}
                            <th className="text-right">{t("Updated")}</th>
                          </>
                        )}
                        {Data?.name === "Binance" && (
                          <th className="text-right"></th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {Pairs.map((dta, i) => {
                        const last_updated_date = moment(
                          dta.quote.USD.last_updated
                        );

                        return (
                          <tr key={i}>
                            <td className="s-bld">{i + 1}</td>
                            <td className="font-weight-bold">
                              <div className="d-flex">
                                <img
                                  className="align-self-center"
                                  loading="lazy"
                                  src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${dta?.market_pair_base?.currency_id}.png`}
                                  height={30}
                                />
                                <div className="align-self-center ml-2">
                                  <p className="mb-0 s-bld">
                                    {" "}
                                    {dta?.market_pair}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="s-bld">
                              $ {numberWithCommas(dta?.quote?.USD?.price)}{" "}
                            </td>
                            {!isMobile && (
                              <>
                                {/* <td *ngIf="category === 'spot'"><ng-container *ngIf="dta?.quote?.USD?.depth_negative_two">$ {{dta?.quote?.USD?.depth_negative_two | number}} </ng-container> </td>
                 <td *ngIf="category === 'spot'"><ng-container *ngIf="dta?.quote?.USD?.depth_positive_two">$ {{dta?.quote?.USD?.depth_positive_two | number}} </ng-container> </td> */}
                                <td>
                                  $ {numberSuffix(dta?.quote.USD?.volume_24h)}
                                </td>
                                {category !== "futures" && (
                                  <td className="s-bld">
                                    {numberWithCommas(
                                      dta?.quote.exchange_reported
                                        ?.volume_percentage
                                    )}{" "}
                                    %
                                  </td>
                                )}
                                <td className="text-right">
                                  {last_updated_date.fromNow()}
                                </td>
                              </>
                            )}
                            {Data?.name === "Binance" && (
                              <td className="text-right">
                                <NavLink
                                  className="btn text-white buy-btn px-4"
                                  to={
                                    "/trade/" +
                                    dta?.market_pair_base?.currency_symbol +
                                    "_" +
                                    dta?.market_pair_quote?.currency_symbol
                                  }
                                >
                                  Trade
                                </NavLink>
                              </td>
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SingleExchange;
