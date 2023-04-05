import { useEffect, useRef, useState } from "react";
import "./index.scss";
import ApiService from "services/apiService";
import { getTheme } from "utils";
const GlobalTrendingMetrics = () => {
  const btcDominance = useRef(null);
  const marketcap = useRef(null);
  const txVolume = useRef(null);
  const [isAppended, setIsAppended] = useState(false);
  const [GlobalData, setGlobalData] = useState([]);
  const [GlobalDataFiltered, setGlobalDataFiltered] = useState([]);

  const catTooltipSettings = {
    visible: true,
    format: "$ ${volume}",
    trackLineSettings: {
      visible: true,
    },
  };

  const catTooltipSettingsMC = {
    visible: true,
    format: "$ ${marketCap}",
    trackLineSettings: {
      visible: true,
    },
  };

  const catTooltipSettingsBTC = {
    visible: true,
    format: "${btc}",
    trackLineSettings: {
      visible: true,
    },
  };

  const axisSettings = {
    lineSettings: {
      visible: true,
    },
  };

  const border = { color: "#0c1b30", width: 2 };

  useEffect(() => {
    syncData();

    if (!isAppended) {
      let scriptDominance = document.createElement("script");
      scriptDominance.type = "text/javascript";
      scriptDominance.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      scriptDominance.text = `{
        "symbol": "CRYPTOCAP:BTC.D",
        "width": "100%",
        "height": 220,
        "locale": "en",
        "dateRange": "12M",
        "colorTheme":"${getTheme()}",
        "trendLineColor": "rgba(41, 98, 255, 1)",
        "underLineColor": "rgba(41, 98, 255, 0.3)",
        "underLineBottomColor": "rgba(41, 98, 255, 0)",
        "isTransparent": false,
        "autosize": false,
        "largeChartUrl": ""
      }`;
      btcDominance.current.appendChild(scriptDominance);

      let scriptMarketCap = document.createElement("script");
      scriptMarketCap.type = "text/javascript";
      scriptMarketCap.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      scriptMarketCap.text = `{
        "symbol": "CRYPTOCAP:USDT",
        "width": "100%",
        "height": 220,
        "locale": "en",
        "dateRange": "12M",
        "colorTheme":"${getTheme()}",
        "trendLineColor": "rgba(41, 98, 255, 1)",
        "underLineColor": "rgba(41, 98, 255, 0.3)",
        "underLineBottomColor": "rgba(41, 98, 255, 0)",
        "isTransparent": false,
        "autosize": false,
        "largeChartUrl": ""
      }`;

      marketcap.current.appendChild(scriptMarketCap);

      let scriptTxVolume = document.createElement("script");
      scriptTxVolume.type = "text/javascript";
      scriptTxVolume.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
      scriptTxVolume.text = `{
      "symbol": "INTOTHEBLOCK:BTC_TXVOLUME",
      "width": "100%",
      "height": 220,
      "locale": "en",
      "dateRange": "12M",
      "colorTheme":"${getTheme()}",
      "trendLineColor": "rgba(41, 98, 255, 1)",
      "underLineColor": "rgba(41, 98, 255, 0.3)",
      "underLineBottomColor": "rgba(41, 98, 255, 0)",
      "isTransparent": false,
      "autosize": false,
      "largeChartUrl": ""
    }`;
      txVolume.current.appendChild(scriptTxVolume);

      setIsAppended(true);
    }
  }, []);

  const syncData = () => {
    ApiService.GlobalMetricsHistory().then((res) => {
      let tempGlobalData = JSON.parse(res.data.response["Result: "])?.data;
      setGlobalData(tempGlobalData);

      let tempGlobalDataFiltered = [];
      for (let dta of tempGlobalData.quotes) {
        tempGlobalDataFiltered.push({
          volume: dta.quote.USD.total_volume_24h,
          marketCap: dta.quote.USD.total_market_cap,
          btc: dta.btc_dominance,
          x: dta.timestamp,
        });
      }
      setGlobalDataFiltered(tempGlobalDataFiltered);
    });
  };
  return (
    <div className="row mt-5 matrix-pg">
      <div className="col-lg-4">
        <div className="wt-box mb-4">
          <div className="tradingview-widget-container">
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright" ref={txVolume}>
              <a
                href="https://www.tradingview.com/symbols/BTC_TXVOLUME/?exchange=INTOTHEBLOCK"
                rel="noopener"
                target="_blank"
              >
                <span className="blue-text">BTC_TXVOLUME rates</span>
              </a>
              by TradingView
            </div>
          </div>
          {/* <p className="s-bld mb-0 px-3 pt-3">{{"Total Volume" | translate}}</p>
      <h3 className="px-3 ">$ {{GlobalDataFiltered[GlobalDataFiltered?.length - 1]?.volume | number: '0.0-1'}}</h3>
      <div className="spark" align="center">
        <ejs-sparkline id="area" height="80px" [border]="border"  valueType="Category" fill="#ffffff" type="Area"
                       [axisSettings]="axisSettings"  [dataSource]="GlobalDataFiltered" [tooltipSettings]="catTooltipSettings"
                       xName="x" yName="volume" ></ejs-sparkline>
      </div> */}
        </div>
      </div>
      <div className="col-lg-4">
        <div className="wt-box mb-4">
          <div className="tradingview-widget-container">
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright" ref={marketcap}>
              <a
                href="https://www.tradingview.com/symbols/USDT/?exchange=CRYPTOCAP"
                rel="noopener"
                target="_blank"
              >
                <span className="blue-text">USDT rates</span>
              </a>
              by TradingView
            </div>
          </div>
          {/* <p className="s-bld mb-0 px-3 pt-3">{{"Total Marketcap" | translate}}</p>
      <h3 className="px-3 ">$ {{GlobalDataFiltered[GlobalDataFiltered?.length - 1]?.marketCap | number: '0.0-1'}}</h3>
      <div className="spark" align="center">
        <ejs-sparkline id="area2" height="80px" [border]="border" valueType="Category" fill="#ffffff" type="Area"
                       [axisSettings]="axisSettings"  [dataSource]="GlobalDataFiltered" [tooltipSettings]="catTooltipSettingsMC"
                       xName="x" yName="marketCap" ></ejs-sparkline>
      </div> */}
        </div>
      </div>
      <div className="col-lg-4">
        <div className="wt-box mb-4">
          <div className="tradingview-widget-container">
            <div className="tradingview-widget-container__widget"></div>
            <div className="tradingview-widget-copyright" ref={btcDominance}>
              <a
                href="https://www.tradingview.com/symbols/BTC.D/?exchange=CRYPTOCAP"
                rel="noopener"
                target="_blank"
              >
                <span className="blue-text">BTC.D rates</span>
              </a>
              by TradingView
            </div>
          </div>
          {/* <p className="s-bld mb-0 px-3 pt-3">{{"BTC Dominance" | translate}}</p>
      <h3 className="px-3 ">{{GlobalDataFiltered[GlobalDataFiltered?.length - 1]?.btc | number: '0.0-1'}} %</h3>
      <div className="spark" align="center">
        <ejs-sparkline id="area3" height="80px" [border]="border" valueType="Category" fill="#ffffff" type="Area"
                       [axisSettings]="axisSettings"  [dataSource]="GlobalDataFiltered" [tooltipSettings]="catTooltipSettingsBTC"
                       xName="x" yName="btc" ></ejs-sparkline>
      </div> */}
        </div>
      </div>
    </div>
  );
};

export default GlobalTrendingMetrics;
