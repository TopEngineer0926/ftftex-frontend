import moment from "moment";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import ContentLoader from "react-content-loader";
import { useContext, useEffect, useState } from "react";
import ApiService from "services/apiService";
import { FTFTexContext } from "App";

const Markets = ({ coinData, Param }) => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [MarketData, setMarketData] = useState([]);
  const [category, setCategory] = useState("spot");
  const [loader, setLoader] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  useEffect(() => {
    const tempItems = Array(10)
      .fill(0)
      .map((x, i) => i + 1);
    setItems(tempItems);

    syncData(category);
  }, []);

  const syncData = (category) => {
    setLoader(true);
    ApiService.GetPairs(Param.id, Param.slug, category)
      .then((res) => {
        let tempMarketData = JSON.parse(res.data.response["Result: "]).data
          .market_pairs;
        setMarketData(tempMarketData);
      })
      .finally(() => setLoader(false));
  };

  const changeDataType = (value) => {
    setCategory(value);
    setMarketData([]);
    syncData(value);
  };

  const numberWithCommas = (number) => {
    return number.toLocaleString();
  };

  return (
    <>
      <div className="d-flex flex-wrap justify-content-between mb-3">
        <h3 className="s-bld mb-0">
          {coinData.name} {t("Markets")}
        </h3>
        <div className="chart-filters">
          <div
            className={
              category === "spot" ? "btn btn-sm btn-sm-activated" : "btn btn-sm"
            }
            onClick={() => changeDataType("spot")}
          >
            {t("Spot")}
          </div>
          <div
            className={
              category === "perpetual"
                ? "btn btn-sm btn-sm-activated"
                : "btn btn-sm"
            }
            onClick={() => changeDataType("perpetual")}
          >
            {t("Perpetual")}
          </div>
          {/* <div className={category === 'futures' ? "btn btn-sm tn-sm-activated" : "btn btn-sm"} onClick={() => changeDataType('futures')}>Futures</div> */}
        </div>
      </div>

      <div className="x-m-overflow">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">{t("Source")}</th>
              <th scope="col">{t("Pairs")}</th>
              <th scope="col">{t("Price")}</th>
              <th scope="col">{t("Volume")}</th>
              <th scope="col">{t("Fee Type")}</th>
              <th className="text-right">{t("Updated")}</th>
            </tr>
          </thead>
          <tbody>
            {MarketData.map((dta, i) => {
              const last_updated = moment(dta.quote.USD.last_updated);
              return (
                <tr key={i}>
                  <td className="s-bld">{i + 1}</td>
                  <td className="font-weight-bold">
                    <NavLink
                      className="d-flex"
                      to={
                        "/exchange/" + dta.exchange.id + "/" + dta.exchange.slug
                      }
                    >
                      <img
                        className="align-self-center"
                        loading="lazy"
                        src={`https://s2.coinmarketcap.com/static/img/exchanges/64x64/${dta.exchange.id}.png`}
                        height={30}
                      />
                      <div className="align-self-center ml-2">
                        <p className="mb-0 s-bld"> {dta.exchange.name}</p>
                      </div>
                    </NavLink>
                  </td>
                  <td className="s-bld">{dta.market_pair}</td>
                  <td className="s-bld">
                    $ {numberWithCommas(dta.quote.USD.price)}{" "}
                  </td>
                  <td>$ {numberWithCommas(dta.quote.USD.volume_24h)}</td>
                  <td>{dta.fee_type}</td>
                  <td className="text-right">{last_updated.fromNow()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Markets;
