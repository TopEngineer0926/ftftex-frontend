const { useRef, useEffect, useState } = require("react");
const { getTheme } = require("utils");

const TradingViewBuyAndSell = ({ COIN }) => {
  const tradingview = useRef();
  const [isAppended, setIsAppended] = useState(false);
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
    if (!isAppended) {
      if (coins.includes(COIN)) {
        const SYMBOL = "BINANCE:" + COIN.toUpperCase() + "USD";
        const Settings = {
          interval: "1m",
          width: "100%",
          isTransparent: false,
          height: "450",
          symbol: SYMBOL,
          showIntervalTabs: true,
          locale: "en",
          colorTheme: getTheme(),
        };
        let script = document.createElement("script");
        script.type = `text/javascript`;
        script.src =
          "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
        script.text = JSON.stringify(Settings);

        tradingview.current.appendChild(script);
        setIsAppended(true);
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div ref={tradingview}></div>
    </div>
  );
};

export default TradingViewBuyAndSell;
