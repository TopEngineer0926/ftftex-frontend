import CandleChart from "../CandleChart";
import TradingViewTdChart from "../TradingViewTdChart";
import "./index.scss";
import { useTranslation } from "react-i18next";
import TradingViewBuyAndSell from "components/Common/TradingViewBuyAndSell";
import { useEffect, useState } from "react";
import ApiService from "services/apiService";
import moment from "moment";
import { IgrFinancialChart } from "igniteui-react-charts";
import { IgrFinancialChartModule } from "igniteui-react-charts";

IgrFinancialChartModule.register();

const Overview = ({ Data, PriceData, Param }) => {
  const { t } = useTranslation();
  const [ShowTradingView, setShowTradingView] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [period, setPeriod] = useState("daily");
  const [interval, setinterval] = useState("daily");
  const [count, setCount] = useState(200);
  const [ChartType, setChartType] = useState("price");

  const Submenu = "overview";

  const tooltip = {
    enable: true,
    shared: true,
    format: "${series.name} : ${point.x} : ${point.y}",
  };

  const crosshair = {
    enable: true,
    line: { width: 1, color: "rgba(0,0,0,0.35)" },
  };

  const primaryXAxis = {
    valueType: "DateTime",
    labelFormat: "d-M-y",
    crosshairTooltip: { enable: true, fill: "#1577FF" },
    lineStyle: { width: 2 },
    majorGridLines: { width: 0 },
  };

  const primaryYAxis = {
    labelFormat: "${value}",
    crosshairTooltip: { enable: true, fill: "#1577FF" },
    lineStyle: { width: 2 },
  };

  const marker = {
    dataLabel: {
      visible: false,
    },
  };

  const legendSettings = {
    visible: false,
  };

  const coins = [
    "BTC",
    "ETH",
    "BNB",
    "XRP",
    "ADA",
    "SOL",
    "MATIC",
    "DOGE",
    "SHIB",
    "AVAX",
    "DOT",
    "ATOM",
    "TRX",
    "UNI",
    "WBTC",
    "ETC",
    "LTC",
    "XTZ",
  ];

  useEffect(() => {
    window.scroll(0, 0);

    if (coins.includes(Data.symbol)) {
      setShowTradingView(true);
    } else {
      if (Param.id && Data.slug) {
        loadChart(period, interval, count);
      }
    }
  }, [Param, Data]);

  const numberWithCommas = (number) => {
    return number.toLocaleString();
  };

  const changeChartType = (value) => {
    setChartType(value);
    if (value === "candle-chart") {
      setCount(50);
      loadChart(period, interval, 50);
    } else {
      setCount(200);
      loadChart(period, interval, 200);
    }
  };

  const loadChart = (p, i, cnt) => {
    let tempChartData = [];
    ApiService.OCHLData(Param.id, Data.slug, p, i, cnt).then((res) => {
      tempChartData = [];
      const d = JSON.parse(res.data.response["Result: "]).data.quotes;
      /* const Data = res.data.quotes;*/

      for (let dta of d) {
        tempChartData.push({
          date: new Date(
            moment(dta.quote.USD.timestamp).format("MM/DD/YYYY HH:mm")
          ),
          price: dta.quote.USD.close,
          market_cap: dta.quote.USD.market_cap,
          open: dta.quote.USD.open,
          close: dta.quote.USD.close,
          high: dta.quote.USD.high,
          low: dta.quote.USD.low,
          volume: dta.quote.USD.volume,
        });
      }

      setChartData(tempChartData);
    });
  };

  const changeChartInterval = (value, value2, cnt) => {
    setPeriod(value);
    setinterval(value2);
    setCount(cnt);
    setChartData([]);
    loadChart(value, value2, cnt);
  };

  return (
    <>
      {Submenu === "overview" && (
        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="d-flex justify-content-between mb-4 flex-wrap">
              <div className="chart-filters mb-4">
                <div
                  className={
                    ChartType === "price"
                      ? "btn btn-sm btn-sm-activated"
                      : "btn btn-sm"
                  }
                  onClick={() => changeChartType("price")}
                >
                  {t("Price")}
                </div>
                <div
                  className={
                    ChartType === "market-cap"
                      ? "btn btn-sm btn-sm-activated"
                      : "btn btn-sm"
                  }
                  onClick={() => changeChartType("market-cap")}
                >
                  {t("Market Cap")}
                </div>
                <div
                  className={
                    ChartType === "candle-chart"
                      ? "btn btn-sm btn-sm-activated"
                      : "btn btn-sm"
                  }
                  onClick={() => changeChartType("candle-chart")}
                >
                  {t("Candle Chart")}
                </div>
              </div>

              {ShowTradingView === false && (
                <div className="chart-filters mb-4">
                  <div
                    className="btn btn-sm"
                    onClick={() => changeChartInterval("daily", "daily", 50)}
                  >
                    {t("7D")}
                  </div>
                  <div
                    className="btn btn-sm"
                    onClick={() => changeChartInterval("daily", "daily", 100)}
                  >
                    {t("1M")}
                  </div>
                  <div
                    className="btn btn-sm"
                    onClick={() => changeChartInterval("daily", "daily", 150)}
                  >
                    {t("3M")}
                  </div>
                  <div
                    className="btn btn-sm"
                    onClick={() => changeChartInterval("daily", "daily", 200)}
                  >
                    {t("1Y")}
                  </div>
                </div>
              )}
            </div>
            {ShowTradingView === false && (
              <div style={{ display: "block", height: "auto" }}>
                {ChartType === "price" && (
                  // <ChartComponent
                  //   id="spline-chartcontainer"
                  //   primaryXAxis={primaryXAxis}
                  //   primaryYAxis={primaryYAxis}
                  //   legendSettings={legendSettings}
                  //   tooltip={tooltip}
                  //   crosshair={crosshair}
                  // >
                  //   <SeriesCollectionDirective>
                  //     <SeriesDirective
                  //       dataSource={chartData}
                  //       width={3}
                  //       type="Line"
                  //       xName="date"
                  //       yName="price"
                  //       name="price"
                  //       fill="#1577FF"
                  //       marker={marker}
                  //     ></SeriesDirective>
                  //     {/* <SeriesDirective dataSource={chartData}  type='Column' width={2} type='Line' xName='date' yName='market_cap' name='Market Cap' fill="#000" [marker]={marker}></SeriesDirective> */}
                  //   </SeriesCollectionDirective>
                  // </ChartComponent>
                  <IgrFinancialChart
                    width="100%"
                    height="400px"
                    chartType="Line"
                    thickness={3}
                    dataSource={chartData}
                    isToolbarVisible={false}
                    legend={legendSettings}
                    toolTipType={"Item"}
                  />
                )}
                {ChartType === "market-cap" && (
                  // <ChartComponent
                  //   id="spline-chartcontainer"
                  //   primaryXAxis={primaryXAxis}
                  //   primaryYAxis={primaryYAxis}
                  //   legendSettings={legendSettings}
                  //   tooltip={tooltip}
                  //   crosshair={crosshair}
                  // >
                  //   <SeriesCollectionDirective>
                  //     <SeriesDirective
                  //       dataSource={chartData}
                  //       width={3}
                  //       type="Line"
                  //       xName="date"
                  //       yName="market_cap"
                  //       name="Market Cap"
                  //       fill="#1577FF"
                  //       marker={marker}
                  //     ></SeriesDirective>
                  //     {/*   <SeriesDirective [dataSource]='chartData'  type='Column' width=2 type='Line' xName='date' yName='market_cap' name='Market Cap' fill="#000" [marker]='marker'></SeriesDirective> */}
                  //   </SeriesCollectionDirective>
                  // </ChartComponent>
                  <IgrFinancialChart
                    width="100%"
                    height="400px"
                    chartType="Line"
                    thickness={3}
                    dataSource={chartData}
                    isToolbarVisible={false}
                    legend={legendSettings}
                    toolTipType={"Item"}
                  />
                )}
                {ChartType === "candle-chart" && (
                  <CandleChart chartData={chartData} Coin={Data.symbol} />
                )}
              </div>
            )}

            <div className="d-block">
              {ShowTradingView === true && ChartType === "candle-chart" && (
                <TradingViewTdChart
                  COIN={Data.symbol}
                  chartType={ChartType}
                  EXCHANGE={"OKX"}
                  PAIR={"USDT"}
                />
              )}
              {ShowTradingView === true && ChartType === "price" && (
                <TradingViewTdChart
                  COIN={Data.symbol}
                  chartType={ChartType}
                  EXCHANGE={"OKX"}
                  PAIR={"USDT"}
                />
              )}
              {ShowTradingView === true && ChartType === "market-cap" && (
                <TradingViewTdChart
                  COIN={Data.symbol}
                  chartType={ChartType}
                  EXCHANGE={"OKX"}
                  PAIR={"USDT"}
                />
              )}
            </div>

            <p className="mt-4">{Data.description}</p>
          </div>
          <div className="col-lg-4 col-md-12">
            <TradingViewBuyAndSell COIN={Data.symbol} />

            <div className="detail-sec">
              <h2>
                {Data.name} {t("Statistics")}
              </h2>
              {PriceData?.quote?.USD?.price > 0 && (
                <div className="d-list-d d-flex justify-content-between">
                  <p className="mb-0">
                    {Data.name} {t("Price")}
                  </p>
                  {PriceData?.quote?.USD?.price > 1.1 && (
                    <p className="mb-0 s-bld " style={{ whiteSpace: "nowrap" }}>
                      {" "}
                      $ {numberWithCommas(PriceData?.quote?.USD?.price)}
                    </p>
                  )}
                  {PriceData?.quote?.USD?.price < 1.1 && (
                    <p className="mb-0 s-bld " style={{ whiteSpace: "nowrap" }}>
                      {" "}
                      ${" "}
                      {numberWithCommas(
                        PriceData?.quote?.USD?.price.toFixed(8)
                      )}
                    </p>
                  )}
                </div>
              )}
              {PriceData?.quote?.USD?.volume_24h > 0 && (
                <div className="d-list-d d-flex justify-content-between">
                  <p className="mb-0">{t("Trading Volume")}</p>
                  <p className="mb-0 s-bld " style={{ whiteSpace: "nowrap" }}>
                    {" "}
                    $ {numberWithCommas(PriceData?.quote?.USD?.volume_24h)}
                  </p>
                </div>
              )}
              {PriceData?.max_supply > 0 && (
                <div className="d-list-d d-flex justify-content-between">
                  <p className="mb-0">{t("Max Supply")}</p>
                  <p className="mb-0 s-bld " style={{ whiteSpace: "nowrap" }}>
                    {" "}
                    {Data.symbol} {numberWithCommas(PriceData?.max_supply)}
                  </p>
                </div>
              )}
              {PriceData?.circulating_supply > 0 && (
                <div className="d-list-d d-flex justify-content-between">
                  <p className="mb-0">{t("Circulating Supply")}</p>
                  <p className="mb-0 s-bld " style={{ whiteSpace: "nowrap" }}>
                    {" "}
                    {Data.symbol}{" "}
                    {numberWithCommas(PriceData?.circulating_supply)}
                  </p>
                </div>
              )}
              {PriceData?.quote?.USD?.market_cap > 0 && (
                <div className="d-list-d d-flex justify-content-between">
                  <p className="mb-0">{t("Market Cap")}</p>
                  {PriceData?.quote?.USD?.market_cap > 1.1 && (
                    <p className="mb-0 s-bld " style={{ whiteSpace: "nowrap" }}>
                      {" "}
                      $ {numberWithCommas(PriceData?.quote?.USD?.market_cap)}
                    </p>
                  )}
                  {PriceData?.quote?.USD?.market_cap < 1.1 && (
                    <p className="mb-0 s-bld " style={{ whiteSpace: "nowrap" }}>
                      {" "}
                      ${" "}
                      {numberWithCommas(
                        PriceData?.quote?.USD?.market_cap.toFixed(8)
                      )}
                    </p>
                  )}
                </div>
              )}
              {PriceData?.cmc_rank && (
                <div className="d-list-d d-flex justify-content-between">
                  <p className="mb-0">{t("Market Rank")}</p>
                  <p className="mb-0 s-bld" style={{ whiteSpace: "nowrap" }}>
                    {" "}
                    # {numberWithCommas(PriceData?.cmc_rank)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Overview;
