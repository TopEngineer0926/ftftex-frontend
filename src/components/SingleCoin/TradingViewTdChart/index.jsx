import { useEffect } from "react";
import { getTheme } from "utils";

let TradingView = window.TradingView;

const TradingViewTdChart = ({ COIN, PAIR, EXCHANGE, chartType }) => {
  let HideBar = false;
  let Height = 610;
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
    if (window.innerWidth < 990) {
      HideBar = true;
      Height = 400;
    }

    const SYMBOL = EXCHANGE + ":" + COIN?.toUpperCase() + PAIR?.toUpperCase();

    console.log(SYMBOL, "SYMBOL");
    if (coins.includes(COIN)) {
      if (chartType === "candle-chart") {
        new TradingView.widget({
          container_id: "technical-analysis",
          width: "100%",
          height: Height,
          symbol: SYMBOL,
          interval: "1",
          timezone: "Etc/UTC",
          theme: getTheme(),
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_side_toolbar: HideBar,
        });
      }

      if (chartType === "price") {
        new TradingView.widget({
          container_id: "technical-analysis",
          width: "100%",
          height: 610,
          symbol: SYMBOL,
          interval: "D",
          timezone: "Etc/UTC",
          theme: getTheme(),
          style: "3",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_side_toolbar: HideBar,
        });
      }

      if (chartType === "market-cap") {
        new TradingView.widget({
          container_id: "technical-analysis",
          width: "100%",
          height: 610,
          symbol: COIN,
          interval: "D",
          timezone: "Etc/UTC",
          theme: getTheme(),
          style: "3",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          hide_side_toolbar: HideBar,
        });
      }
    }
  }, []);
  return <div class="d-block" id="technical-analysis"></div>;
};

export default TradingViewTdChart;
