import { useEffect, useRef, useState } from "react";
import { getTheme } from "utils";

const TradingViewTicker = () => {
  const tradingview = useRef(null);
  const [isAppended, setIsAppended] = useState(false);

  useEffect(() => {
    if (!isAppended) {
      let script = document.createElement("script");
      script.type = `text/javascript`;
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.text =
        `
            {
        "symbols": [
            {
            "description": "BTC",
            "proName": "BITSTAMP:BTCUSD"
            },
            {
            "description": "ETH",
            "proName": "BITSTAMP:ETHUSD"
            },
            {
            "description": "LTC",
            "proName": "BITSTAMP:LTCUSD"
            },
            {
            "description": "SOL",
            "proName": "BITSTAMP:SOLUSD"
            },
            {
            "description": "ADA",
            "proName": "BITSTAMP:ADAUSD"
            },
            {
            "description": "XRP",
            "proName": "BITSTAMP:XRPUSD"
            },
            {
            "description": "DOGE",
            "proName": "BINANCE:DOGEUSD"
            },
            {
            "description": "SHIB",
            "proName": "BITSTAMP:SHIBUSD"
            },
            {
            "description": "AVAX",
            "proName": "BITSTAMP:AVAXUSD"
            },
            {
            "description": "DOT",
            "proName": "BINANCE:DOTUSD"
            },
            {
            "description": "ATOM",
            "proName": "BINANCE:ATOMUSD"
            },
            {
            "description": "MATIC",
            "proName": "BITSTAMP:MATICUSD"
            },
            {
            "description": "BNB",
            "proName": "BINANCE:BNBUSD"
            },
            {
            "description": "TRX",
            "proName": "BINANCE:TRXUSD"
            },
            {
            "description": "UNI",
            "proName": "BINANCE:UNIUSD"
            },
            {
            "description": "ETC",
            "proName": "BINANCE:ETCUSD"
            }
        ],
        "showSymbolLogo": true,
        "colorTheme":"` +
        getTheme() +
        `",
        "isTransparent": false,
        "displayMode": "adaptive",
        "locale": "en"
        }`;

      tradingview.current.appendChild(script);
      setIsAppended(true);
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-container__widget"></div>
      <div ref={tradingview}></div>
    </div>
  );
};

export default TradingViewTicker;
