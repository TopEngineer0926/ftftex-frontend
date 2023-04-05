import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./index.scss";
import ApiService from "services/apiService";
import Overview from "./Overview";
import Markets from "./Markets";
import { useTranslation } from "react-i18next";

const SingleCoin = () => {
  const [Data, setData] = useState({});
  const [PriceData, setPriceData] = useState({});
  const [Param, setParam] = useState({
    id: "",
    slug: "",
  });
  const [Submenu, setSubmenu] = useState("overview");
  const param = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    window.scroll(0, 0);

    ApiService.getSingleCoinData(param.id, param.slug)
      .then((res) => {
        let tempData = JSON.parse(res.data.response["Result: "]).data[param.id];
        setData(tempData);
      })
      .then(() => {
        ApiService.getSingleCoinPrices(param.id, param.slug).then((res) => {
          let tempPriceData = JSON.parse(res.data.response["Result: "]).data[
            param.id
          ];
          setPriceData(tempPriceData);
        });
      });

    setParam(param);
  }, [param]);

  const switchSubTab = (val) => {
    setSubmenu(val);
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

  const numberWithCommas = (number) => {
    return number ? number.toLocaleString() : 0;
  };

  const shortHTTP = (value) => {
    let data = value.replace("https://", "");
    data = data.replace("http://", "");
    data = data.replace(/\/$/, "");

    return data;
  };

  return (
    <div className="min-h-full">
      {Data && PriceData && (
        <div className="my-4 container wt-box p-4 ">
          <div className="row">
            <div className="col mt-4 mt-md-0">
              <div className="d-flex flex-wrap m-head">
                <img
                  className="align-self-center"
                  src={Data.logo}
                  height={45}
                  width={45}
                />
                <div className="align-self-center ml-3">
                  <h1 className="mb-0 s-bld mt-0"> {Data.name}</h1>
                  <div className="d-flex">
                    <div className="stk-gr font-weight-bold">
                      {" "}
                      {Data.symbol}
                    </div>
                    <div className="stk-gr font-weight-bold ml-2">
                      Rank #{PriceData.cmc_rank}
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="ml-md-5 price align-self-center mr-3">
                    {PriceData?.quote?.USD?.price > 1.1 && (
                      <h1
                        className="mb-0 s-bld mt-0"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {" "}
                        $ {numberWithCommas(PriceData?.quote?.USD?.price)}
                      </h1>
                    )}
                    {PriceData?.quote?.USD?.price < 1.1 && (
                      <h1
                        className="mb-0 s-bld mt-0"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {" "}
                        ${" "}
                        {numberWithCommas(
                          PriceData?.quote?.USD?.price.toFixed(8)
                        )}
                      </h1>
                    )}
                  </div>
                  <div className="ml-md-3 price-p align-self-center">
                    <div
                      className={
                        PriceData?.quote?.USD?.percent_change_24h < 0
                          ? "stk-green txt-sm font-weight-bold d-flex px-2 stk-red"
                          : "stk-green txt-sm font-weight-bold d-flex px-2"
                      }
                    >
                      {PriceData?.quote?.USD.percent_change_24h < 0 && (
                        <span className="material-symbols-outlined align-self-center">
                          arrow_drop_down
                        </span>
                      )}
                      {PriceData?.quote?.USD.percent_change_24h > 0 && (
                        <span className="material-symbols-outlined align-self-center">
                          arrow_drop_up
                        </span>
                      )}
                      <span
                        className="align-self-center"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        {numberWithCommas(
                          Math.abs(PriceData?.quote?.USD?.percent_change_24h)
                        )}{" "}
                        %
                      </span>
                    </div>
                  </div>
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

                {Data.urls?.explorer && (
                  <div className="dropdown m-1">
                    <div className="btn-def d-flex">
                      <span className="material-symbols-outlined align-self-center">
                        search{" "}
                      </span>
                      <span className="align-self-center ml-2">Explorer</span>
                    </div>
                    <div className="dropdown-content">
                      {Data.urls?.explorer.map((dta, index) => (
                        <a
                          className="d-block"
                          href={dta}
                          target="_blank"
                          key={index}
                        >
                          {shortHTTP(dta)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="dropdown m-1">
                  <div className="btn-def d-flex">
                    <span className="material-symbols-outlined align-self-center">
                      groups{" "}
                    </span>
                    <span className="align-self-center ml-2">Community</span>
                  </div>
                  <div className="dropdown-content">
                    {Data.urls?.facebook[0] && (
                      <a
                        className="d-block"
                        href={Data.urls?.facebook[0]}
                        target="_blank"
                      >
                        {shortHTTP(Data.urls?.facebook[0])}
                      </a>
                    )}
                    {Data.urls?.twitter[0] && (
                      <a
                        className="d-block"
                        href={Data.urls?.twitter[0]}
                        target="_blank"
                      >
                        {shortHTTP(Data.urls?.twitter[0])}
                      </a>
                    )}
                    {Data.urls?.reddit[0] && (
                      <a
                        className="d-block"
                        href={Data.urls?.reddit[0]}
                        target="_blank"
                      >
                        {shortHTTP(Data.urls?.reddit[0])}
                      </a>
                    )}
                    {Data.urls?.message_board[0] && (
                      <a
                        className="d-block"
                        href={Data.urls?.message_board[0]}
                        target="_blank"
                      >
                        {shortHTTP(Data.urls?.message_board[0])}
                      </a>
                    )}
                  </div>
                </div>
                {Data?.urls?.source_code[0] && (
                  <div className="btn-def  d-flex m-1">
                    <span className="material-symbols-outlined align-self-center">
                      code{" "}
                    </span>
                    <a
                      className="align-self-center ml-2"
                      href={Data?.urls?.source_code[0]}
                      target="_blank"
                    >
                      Source Code
                    </a>
                  </div>
                )}
                {Data?.urls?.technical_doc[0] && (
                  <div className="btn-def  d-flex m-1">
                    <span className="material-symbols-outlined align-self-center">
                      description{" "}
                    </span>
                    <a
                      className="align-self-center ml-2"
                      href={Data?.urls?.technical_doc[0]}
                      target="_blank"
                    >
                      White Paper
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="col">
              <div>
                <div className="d-flex coin-info flex-wrap">
                  <div className="block-c flex-fill">
                    <p className="title">{t("Market Cap")}</p>
                    <p className="value mt-2">
                      {numberSuffix(PriceData?.quote?.USD.market_cap)}
                    </p>
                    <div>
                      <span
                        className={
                          PriceData?.quote?.USD.percent_change_24h < 0
                            ? "txt-green d-flex txt-red"
                            : "txt-green d-flex"
                        }
                      >
                        {PriceData?.quote?.USD.percent_change_24h < 0 && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_down
                          </span>
                        )}
                        {PriceData?.quote?.USD.percent_change_24h > 0 && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_up
                          </span>
                        )}
                        <span className=" align-self-center">
                          {numberWithCommas(
                            Math.abs(PriceData?.quote?.USD.percent_change_24h)
                          )}{" "}
                          %
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="block-c">
                    <p className="title">{t("Volume(24h)")}</p>
                    <p className="value mt-2">
                      {numberSuffix(PriceData?.quote?.USD.volume_24h)}
                    </p>
                    <div>
                      <span
                        className={
                          PriceData?.quote?.USD.volume_change_24h < 0
                            ? "txt-green d-flex txt-red"
                            : "txt-green d-flex"
                        }
                      >
                        {PriceData?.quote?.USD.volume_change_24h < 0 && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_down
                          </span>
                        )}
                        {PriceData?.quote?.USD.volume_change_24h > 0 && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_up
                          </span>
                        )}
                        <span className=" align-self-center">
                          {numberWithCommas(
                            Math.abs(PriceData?.quote?.USD.volume_change_24h)
                          )}{" "}
                          %{" "}
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="block-c">
                    <p className="title">{t("Volume / Market Cap")}</p>
                    <p className="value mt-2">
                      {numberWithCommas(
                        PriceData?.quote?.USD.volume_24h /
                          PriceData?.quote?.USD.market_cap
                      )}
                    </p>
                  </div>
                  <div className="block-c">
                    <p className="title">{t("Circulating Supply")}</p>
                    <p className="value">
                      {numberSuffix(PriceData?.circulating_supply)}{" "}
                      {PriceData?.symbol}
                    </p>
                    <p className="title mt-2">{t("Max Supply")}</p>
                    {PriceData?.max_supply && (
                      <p className="value">
                        {numberSuffix(PriceData?.max_supply)}{" "}
                        {PriceData?.symbol}
                      </p>
                    )}
                    {!PriceData?.max_supply && <p className="value">∞</p>}
                  </div>
                </div>
                <div className="d-flex coin-info flex-wrap mt-4 ">
                  <div className="block-c ml-auto">
                    <p className="title">{t("1H")}</p>
                    <div>
                      <span
                        className={
                          PriceData?.quote?.USD.percent_change_1h < 0
                            ? "txt-green d-flex txt-red"
                            : "txt-green d-flex"
                        }
                      >
                        {PriceData?.quote?.USD.percent_change_1h < 0 && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_down
                          </span>
                        )}
                        {PriceData?.quote?.USD.percent_change_1h > 0 && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_up
                          </span>
                        )}
                        <span className="align-self-center">
                          {numberWithCommas(
                            PriceData?.quote?.USD.percent_change_1h
                          )}{" "}
                          %
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="block-c">
                    <p className="title">{t("24H")}</p>
                    <div>
                      <span
                        className={
                          PriceData?.quote?.USD.percent_change_24h < 0
                            ? "txt-green d-flex txt-red"
                            : "txt-green d-flex"
                        }
                      >
                        {PriceData?.quote?.USD.percent_change_24h < 0 && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_down
                          </span>
                        )}
                        {PriceData?.quote?.USD.percent_change_24h > 0 && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_up
                          </span>
                        )}
                        <span className="align-self-center">
                          {numberWithCommas(
                            PriceData?.quote?.USD.percent_change_24h
                          )}{" "}
                          %
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="block-c">
                    <p className="title">{t("7d")}</p>
                    <div>
                      <span
                        className={
                          PriceData?.quote?.USD.percent_change_7d < 0
                            ? "txt-green d-flex txt-red"
                            : "txt-green d-flex"
                        }
                      >
                        {PriceData?.quote?.USD.percent_change_7d < 0 && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_down
                          </span>
                        )}
                        {PriceData?.quote?.USD.percent_change_7d > 0 && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_up
                          </span>
                        )}
                        <span className="align-self-center">
                          {numberWithCommas(
                            PriceData?.quote?.USD.percent_change_7d
                          )}{" "}
                          %
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="block-c">
                    <p className="title">{t("30d")}</p>
                    <div>
                      <span
                        className={
                          PriceData?.quote?.USD.percent_change_30d < 0
                            ? "txt-green d-flex txt-red"
                            : "txt-green d-flex"
                        }
                      >
                        {PriceData?.quote?.USD.percent_change_30d < 0 && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_down
                          </span>
                        )}
                        {PriceData?.quote?.USD.percent_change_30d > 0 && (
                          <span className="material-symbols-outlined align-self-center">
                            arrow_drop_up
                          </span>
                        )}
                        <span className="align-self-center">
                          {numberWithCommas(
                            PriceData?.quote?.USD.percent_change_30d
                          )}{" "}
                          %
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12">
              <div className="d-flex">
                <div
                  className={
                    Submenu === "overview"
                      ? "sub-menu-btn btn mr-2 sub-menu-btn-activate"
                      : "sub-menu-btn btn mr-2"
                  }
                  onClick={() => switchSubTab("overview")}
                >
                  {t("Overview")}
                </div>
                <div
                  className={
                    Submenu === "markets"
                      ? "sub-menu-btn btn mr-2 sub-menu-btn-activate"
                      : "sub-menu-btn btn mr-2"
                  }
                  onClick={() => switchSubTab("markets")}
                >
                  {t("Markets")}
                </div>
                {/* <div className={Submenu === 'historical' ? "sub-menu-btn btn mr-2 sub-menu-btn-activate": "sub-menu-btn btn mr-2"} onClick={() => switchSubTab('historical')}>Historical Data</div> */}
              </div>
            </div>
          </div>
          <hr />
          {Submenu === "overview" && (
            <Overview Data={Data} PriceData={PriceData} Param={Param} />
          )}
          {Submenu === "markets" && <Markets coinData={Data} Param={Param} />}
        </div>
      )}
    </div>
  );
};

export default SingleCoin;
