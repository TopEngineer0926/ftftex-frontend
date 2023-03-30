import "./index.scss";
import { useState, useContext } from "react";
import { getTheme } from "utils";
import FooterBanner from "assets/images/footer-banner.png";
import FooterBannerDark from "assets/images/footer-banner-dark.png";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FTFTexContext } from "App";

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, []);

  return (
    <>
      <div className="container">
        {/*   <app-global-trending-metrics></app-global-trending-metrics> */}
        {/* <div className="row">
    <div className="col-lg-12">
      {/* <app-trading-view-buy-and-sell [COIN]="'BTC'"></app-trading-view-buy-and-sell> 
      <app-global-trending-metrics></app-global-trending-metrics>
    </div>
    <div className="col-lg-12">
      <app-coin></app-coin>
    </div>
    <div className="col-lg-6 col-md-12 mt-5">
      <app-trending-coins [ViewType]="'full'"></app-trending-coins>
    </div>
    <div className="col-lg-6 col-md-12 mt-5">
      <app-gainers-and-losers></app-gainers-and-losers>
    </div>
    <div className="col-lg-12">
      <app-news-carousal></app-news-carousal>
    </div>
    <div className="col-lg-12">
      <app-media></app-media>
    </div>
  </div> */}
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
