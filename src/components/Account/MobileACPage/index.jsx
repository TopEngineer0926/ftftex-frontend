import { useTranslation } from "react-i18next";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import ApiService from "services/apiService";
import { getLoggedIn } from "utils";
import { FTFTexContext } from "App";
import "./index.scss";

const MobileACPage = () => {
  const { t } = useTranslation();
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const [AvailableCoins, setAvailableCoins] = useState(
    ApiService.AvailableCoins
  );
  const [Assets, setAssets] = useState({
    ordered: [],
    coins: {
      usdt: 0,
      eth: 0,
      bnb: 0,
      btc: 0,
      sol: 0,
      ada: 0,
      dot: 0,
      doge: 0,
      shib: 0,
      matic: 0,
      uni: 0,
      ltc: 0,
      trx: 0,
      xrp: 0,
    },
  });
  const [TotalUSD, setTotalUSD] = useState(0);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);

  const navigate = useNavigate();

  useEffect(() => {
    setAssets(ftftexValue.Assets);
  }, [ftftexValue.Assets]);

  useEffect(() => {
    const res = getLoggedIn();

    if (!res[0]) {
      navigate("/login");
    } else {
      setLogginIn(res);
    }

    let tmpTotalUSD = 0;

    AvailableCoins.map(async (dta, index) => {
      if (Assets.coins[dta.coin] > 0) {
        const res2 = await ApiService.getSingleCoinPrices(dta.id, "");
        const Data = JSON.parse(res2.data.response).data[dta.id];
        tmpTotalUSD += Data.quote.USD.price * Assets.coins[dta.coin];
      }
    });

    setTotalUSD(tmpTotalUSD);
  }, []);

  return (
    <div className="vh-100">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <h4 className="s-bld mb-0 mt-3">{t("Account")}</h4>
            <hr />
            <NavLink className="wt-box mt-3 ac-padding" to={"/account"}>
              <div className="acc-box mb-lg-0">
                <span
                  className="material-symbols-outlined acc-box-i align-self-center mr-3"
                  style={{ fontSize: 35 }}
                >
                  account_circle
                </span>
                <div>
                  <h5 className="s-bld mb-0">{t("Profile")}</h5>
                  {LogginIn[0]} {LogginIn[1]}
                </div>
                <span
                  className="material-symbols-outlined acc-box-i align-self-center ml-auto"
                  style={{ fontSize: 35, opacity: 0.6 }}
                >
                  arrow_forward_ios
                </span>
              </div>
            </NavLink>
            {/* <!--        <div className="wt-box mt-3 ac-padding" [routerLink]="'/spot-wallet'">-->
<!--          <div className="acc-box  mb-lg-0">-->
<!--            <span className="material-symbols-outlined acc-box-i align-self-center mr-3" style="font-size: 35px">wallet</span>-->
<!--            <div>-->
<!--              <h5 className="s-bld mb-0">{t("Wallet")}</h5>-->
<!--&lt;!&ndash;              Balance : <span className="s-bld">$ {{TotalUSD | number:'0.3-8'}}</span>&ndash;&gt;-->
<!--              Balance : <span className="s-bld">$ {{ 0 | number:'0.3-8'}}</span>-->
<!--            </div>-->
<!--            <span className="material-symbols-outlined acc-box-i align-self-center  ml-auto" style="font-size: 35px; opacity: 0.6">arrow_forward_ios</span>-->
<!--          </div>-->
<!--        </div>--> */}
            <br />
            <NavLink
              className="wt-box mt-3 ac-padding"
              to={"/account/settings"}
            >
              <div className="acc-box  mb-lg-0">
                <span
                  className="material-symbols-outlined acc-box-i align-self-center mr-3"
                  style={{ fontSize: 35 }}
                >
                  settings
                </span>
                <div className="align-self-center">
                  <h5 className="s-bld mb-0">{t("Settings")}</h5>
                </div>
                <span
                  className="material-symbols-outlined acc-box-i align-self-center  ml-auto"
                  style={{ fontSize: 35, opacity: 0.6 }}
                >
                  arrow_forward_ios
                </span>
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileACPage;
