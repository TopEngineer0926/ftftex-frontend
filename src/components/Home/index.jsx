import "./index.scss";
import { useState, useContext } from "react";
import { getTheme } from "utils";
import FooterBanner from "assets/images/footer-banner.png";
import FooterBannerDark from "assets/images/footer-banner-dark.png";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FTFTexContext } from "App";
import GlobalTrendingMetrics from "components/GlobalTrendingMetrics";
import Media from "./Media";
import NewsCarousal from "./NewsCarousal";
import TrendingCoins from "components/TrendingCoins";
import TradingViewBuyAndSell from "components/Common/TradingViewBuyAndSell";
import MainCarousal from "./MainCarousal";
import Coin from "components/Coin";
import GainersAndLosers from "components/GainersAndLosers";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);
  const { t } = useTranslation();

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  return (
    <>
      <MainCarousal />
      <div className="container">
        {/* <GlobalTrendingMetrics /> */}
        <div className="row">
          <div className="col-lg-12">
            {/* <TradingViewBuyAndSell COIN={"BTC"} /> */}
            <GlobalTrendingMetrics />
          </div>
          <div className="col-lg-12">
            <Coin />
          </div>
          <div className="col-lg-6 col-md-12 mt-5">
            <TrendingCoins ViewType={"full"} />
          </div>
          <div className="col-lg-6 col-md-12 mt-5">
            <GainersAndLosers />
          </div>
          <div className="col-lg-12">
            <NewsCarousal />
          </div>
          <div className="col-lg-12">
            <Media />
          </div>
        </div>
      </div>
      {!isMobile && (
        <div className="row">
          <div className="col-lg-12 mt-5 stay-up-section">
            <div className="container">
              <div className="row">
                <div className="col-lg-8 mt-5">
                  <div className="x-align">
                    <h1 className="s-bld mb-4">
                      {t("Stay up to date with Crypto !")}
                    </h1>
                    <h3>{t("Stay up to date with Crypto ! TXT1")}</h3>
                  </div>
                </div>
              </div>
            </div>
            {getTheme() === "light" ? (
              <img src={FooterBanner} />
            ) : (
              <img src={FooterBannerDark} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
