import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import numeral from "numeral";
import { useContext, useEffect, useState } from "react";
import { FTFTexContext } from "App";
import ApiService from "services/apiService";
import "./index.scss";

const WalletAsset = () => {
  const { t } = useTranslation();
  const [Assets, setAssets] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);
  const [TotalUSD, setTotalUSD] = useState(0);
  const [BTCTotal, setBTCTotal] = useState(0);
  const [AvailableCoins, setAvailableCoins] = useState(
    ApiService.AvailableCoins
  );

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  useEffect(() => {
    ApiService.getSingleCoinPrices(1, "").then((res) => {
      let tmpBTCTotal = JSON.parse(res.data.response).data[1].quote.USD.price;
      setBTCTotal(tmpBTCTotal);
    });
  }, []);

  useEffect(async () => {
    let tmpAssets = [];
    let tmpTotalUSD = 0;
    for (let dta of AvailableCoins) {
      if (ftftexValue.Assets.coins[dta.coin] > 0) {
        const res = await ApiService.getSingleCoinPrices(dta.id, "");

        const Data = JSON.parse(res.data.response).data[dta.id];
        tmpAssets.push({
          Coin: dta.coin,
          Total: ftftexValue.Assets.coins[dta.coin],
          Available: ftftexValue.Assets.coins[dta.coin],
          InOrder: 0.0,
          ValueBTC: 0.0,
          priceUSD: Data.quote.USD.price,
          totalUSD: Data.quote.USD.price * ftftexValue.Assets.coins[dta.coin],
        });

        tmpTotalUSD +=
          Data.quote.USD.price * ftftexValue.Assets.coins[dta.coin];
      }
    }
    setAssets(tmpAssets);
    setTotalUSD(tmpTotalUSD);
  }, [ftftexValue.Assets]);

  return (
    <div className="vh-100">
      <div className="container">
        <div className="col-lg-10 offset-lg-1 px-0">
          <div className="mt-4 wt-box p-3">
            <div className="d-lg-flex flex-wrap d-block">
              <h2 className="s-bld align-self-center mb-0">
                {t("Spot Asset")}
              </h2>
              <div className="mt-2 ml-md-auto d-flex">
                {/* <!--  <div className="btn btn-primary" [routerLink]="'/spot-wallet/buy'">{t("Buy Crypto")}</div>--> */}
                <NavLink
                  className="btn btn-primary"
                  to={"/spot-wallet/deposit"}
                >
                  {t("Deposit")}
                </NavLink>
                <div className="btn btn-primary ml-2">{t("Withdraw")}</div>
              </div>
            </div>
            <hr />

            <div className="d-flex mt-4 w-100">
              <div className="d-flex justify-content-between w-100">
                <div>
                  <p className="align-self-center mb-0 font-weight-bold">
                    Estimated Balance
                  </p>
                  {/* <!--            <h4 className="s-bld align-self-center mb-0">{{TotalUSD/ BTCTotal | number: '0.3-8'}} BTC </h4>--> */}
                  <h4 className="s-bld align-self-center mb-0">
                    {numeral(0).format("0,0.3-8")} BTC{" "}
                  </h4>
                  {/* <!--            <h5 className="s-bld align-self-center mb-0 mt-2"><span className="green-text font-weight-bold d-block">$ {{TotalUSD | number: '0.4-8'}}</span></h5>--> */}
                  <h5 className="s-bld align-self-center mb-0 mt-2">
                    <span className="green-text font-weight-bold d-block">
                      $ {numeral(0).format("0,0.4-8")}
                    </span>
                  </h5>
                </div>
                <div className="ml-auto">
                  <p className="align-self-center mb-0 font-weight-bold">
                    Today's PNL
                  </p>
                  <h4 className="s-bld align-self-center mb-0">
                    <span className="green-text font-weight-bold">$ 0.00</span>
                  </h4>
                </div>
              </div>
            </div>

            <table className="table mt-5">
              <thead>
                <tr className="fixed-header">
                  <th>Coin</th>
                  <th className="text-left">Amount</th>
                  <th className="text-left">USD Value</th>

                  {!isMobile && (
                    <>
                      <th className="text-left">In Order</th>
                      <th className="text-right"></th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {Assets.map((dta, index) => (
                  <tr key={index}>
                    <td className="font-weight-bold">This section is empty</td>
                  </tr>
                ))}
                {/* <!--            <tr>-->
  <!--              <td className="font-weight-bold">-->
  <!--                <div className="d-flex">-->
  <!--                  <img className="align-self-center" loading="lazy" [src]="'assets/images/coin-icons/'+dta.Coin+'.png'" height="30">-->
  <!--                  <div className="align-self-center ml-2">-->
  <!--                    <p className="mb-0 s-bld">{{dta.Coin.toUpperCase()}}</p>-->
  <!--                  </div>-->
  <!--                </div>-->
  <!--              </td>-->
  <!--              <td className="s-bld text-left">{{dta.Total | number: '0.3-8'}}</td>-->
  <!--              <td className="text-left">$ {{dta.totalUSD | number: '0.3-8'}}</td>-->
  <!--              <ng-container *ngIf="!isMobile">-->
  <!--              <td className="text-left">{{dta.InOrder | number: '0.3-8'}} </td>-->
  <!--              <td className="s-bld text-right">-->
  <!--                <div className="d-flex">-->
  <!--                  <a className="btn btn-outline-primary ml-2">Deposit</a>-->
  <!--                  <a className="btn btn-outline-primary ml-2">Withdraw</a>-->
  <!--                  <a className="btn btn-outline-primary ml-2">Trade</a>-->
  <!--                </div>-->
  <!--              </td>-->
  <!--              </ng-container>-->
  <!--            </tr>--> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletAsset;
