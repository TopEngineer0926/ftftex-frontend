import { useEffect, useState } from "react";
import "./index.scss";
import { getLoggedIn } from "utils";
import { NavLink, useNavigate } from "react-router-dom";
import ApiService from "services/apiService";
import { useTranslation } from "react-i18next";
import WalletImg from "assets/images/wallet.svg";
import WalletAnimVid from "assets/videos/wallet_anim.mp4";
import SecurityImg from "assets/images/security.png";
import TrendingUpImg from "assets/images/trending-up.png";
import EaseOfUseImg from "assets/images/ease-of-use.png";
import SubscribeArtImg from "assets/images/subscribe-art.png";

const Wallet = () => {
  const { t } = useTranslation();
  const [subEmail, setSubEmail] = useState("");
  const [message, setMessage] = useState("");
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const [walletInfo, setWalletInfo] = useState();
  const [balance, setBalance] = useState();
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const navigate = useNavigate();

  useEffect(() => {
    const res = getLoggedIn();
    if (!res[0]) {
      navigate("/login");
    } else {
      setLogginIn(res);
    }
  }, []);

  useEffect(() => {
    // if (this.LogginIn[6] === 'verified') {
    const createSubAccountParams = {
      subAcct: LogginIn[5],
      label: "852422",
      userId: userId,
    };
    ApiService.createSubAccount(createSubAccountParams).then((res) => {});
    const params = {
      subAcct: LogginIn[5],
      page: 1,
      limit: 100,
    };
    ApiService.getSubAccountList(params).then((res) => {
      let tmpWalletInfo = JSON.parse(res.data["KYC Api resuult"]).data[0]
        .details[0];
      setWalletInfo(tmpWalletInfo);
    });

    const balanceParams = {
      subAcct: LogginIn[5],
    };
    ApiService.getSubAccBalance(balanceParams).then((res) => {
      console.log(
        JSON.parse(res.data["KYC Api resuult"]),
        "JSON.parse(res['KYC Api resuult'])"
      );
      setBalance(res.data);
    });
    // }
  }, [LogginIn]);

  const Subscribe = () => {
    setMessage("");
    ApiService.walletSubscription({ email: this.subEmail }).then(
      (res) => {
        setMessage("Thank you !");
      },
      () => {
        setMessage("You have already subscribed !");
      }
    );
  };

  const handleChangeSubEmail = (e) => {
    setSubEmail(e.target.value);
  };

  return (
    <>
      {LogginIn[6] !== "verified" && (
        <div className="bg-wt ">
          <div className="min-h-full">
            <section>
              <div className="container">
                <div className="row pg-main-sec">
                  <div className="col-lg-4 justify-content-center d-flex flex-column content-b">
                    <h1 className="d-block s-bld mt-5 banner-header">
                      {t("FTFTex WALLET")}
                    </h1>
                    <h3>{t("FTFTex WALLET TXT1")}</h3>
                    <p className="mt-2">{t("FTFTex WALLET TXT2")}</p>
                    <div>
                      <button className="btn btn-primary h-fit mb-auto w-fit  s-bld btn-lg px-2">
                        <NavLink to={"/account-m"}>
                          {t("Verify Your Account")}
                        </NavLink>
                      </button>
                      <button className="btn btn-primary h-fit mb-auto w-fit  s-bld btn-lg px-2 ml-2">
                        <NavLink to={"/wallet/purchase-crypto"}>
                          {t("Purchase crypto")}
                        </NavLink>
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-8 d-none d-lg-block">
                    <img src={WalletImg} className="b-main-img" />
                  </div>
                </div>
                <hr />
              </div>
            </section>
            <section>
              <div className="container">
                <div className="row pg-main-sec">
                  <div className="col-md-6">
                    <video width="100%" height="600" autoplay muted loop>
                      <source src={WalletAnimVid} type="video/mp4" />
                    </video>
                  </div>
                  <div className="col-md-5">
                    <div className="card-d-b">
                      <img
                        src={SecurityImg}
                        className="img-fit "
                        height={160}
                      />
                      <div className="ml-4 align-self-center">
                        <h2 className="s-bld ">{t("Security")}</h2>
                        <p className="mb-0">{t("Security TXT")}</p>
                      </div>
                    </div>
                    <div className="card-d-b">
                      <img
                        src={TrendingUpImg}
                        className="img-fit "
                        height={160}
                      />
                      <div className="ml-4 align-self-center">
                        <h2 className="s-bld ">{t("Asset Management")}</h2>
                        <p className="mb-0">{t("Asset Management TXT")}</p>
                      </div>
                    </div>
                    <div className="card-d-b">
                      <img
                        src={EaseOfUseImg}
                        className="img-fit "
                        height={160}
                      />
                      <div className="ml-4 align-self-center">
                        <h2 className="s-bld ">{t("Ease of use")}</h2>
                        <p className="mb-0">{t("Ease of use TXT")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="container mb-5">
                <div className="wt-box">
                  <div className="row">
                    <div className="col-lg-6 d-lg-block d-none">
                      <img
                        src={SubscribeArtImg}
                        className="w-100"
                        style={{ height: 480, objectFit: "cover" }}
                      />
                    </div>
                    <div className="col-lg-6">
                      <div className="p-4">
                        <h1 className="s-bld my-lg-5 my-4">
                          {t("Stay tuned !")}
                        </h1>
                        <h5>{t("Stay tuned TXT1")}</h5>
                        <h5 className="mt-3">{t("Stay tuned TXT2")}</h5>
                        <hr />
                        <div className="d-flex mt-5">
                          <input
                            className="form-control rounded-0"
                            placeholder="Email"
                            value={subEmail}
                            onChange={handleChangeSubEmail}
                          />
                          <button
                            className="btn btn-primary rounded-0"
                            disabled={!subEmail}
                            onClick={Subscribe}
                          >
                            {t("Subscribe")}
                          </button>
                        </div>
                        <p className="text-center my-4">{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {LogginIn[6] === "verified" && (
        <div className="bg-wt ">
          <div className="min-h-full">
            <section>
              <div className="container">
                <div className="row pg-main-sec">
                  <div className="col-lg-4 justify-content-center d-flex flex-column content-b">
                    <h1 className="d-block s-bld mt-5 banner-header">
                      {t("Overview")}
                      {/* <!--              <span className="hint">{t("(Coming soon)")}</span>--> */}
                    </h1>

                    {/* <!--                        <div className="total-wrapper mt-4">-->
                        <!--                            <span>Total assets in BTC</span>-->
                        <!--                        </div>-->
                        <!--                        <div className="mt-3 d-flex align-items-center">-->
                        <!--                            <h2>0.05466779</h2> <small className="gray"> = $ 1,151.14</small>-->
                        <!--                        </div>--> */}
                    <NavLink
                      className="d-flex justify-content-between buy-wrapper mt-4"
                      to={"/wallet/purchase-crypto"}
                    >
                      <span className="s-bld gray">Buy Crypto</span>
                      <div className="card-name">
                        <span>Visa/Mic/Sepa</span>
                      </div>
                    </NavLink>

                    {walletInfo && (
                      <>
                        <div className="sub-menu-btn mt-3">My Wallets</div>

                        <NavLink
                          className="sub-account mb-2 d-flex justify-content-between pointer"
                          to={"/wallet/main"}
                        >
                          <div className="d-flex ">
                            <img
                              className="align-self-center"
                              src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/294.png"
                              height={30}
                            />
                            <div className="d-flex  flex-column">
                              <h6 className="mb-0 ml-3 s-bld">
                                {" "}
                                {LogginIn[0]} {LogginIn[1]}({walletInfo.subAcct}
                                )
                              </h6>
                              <small className=" ml-3 s-bld gray">
                                Lev. {walletInfo.acctLv}
                              </small>
                            </div>
                          </div>
                          {/* <!--                                <div className="d-flex flex-column ">-->
<!--                                    <h6 className="mb-0 align-self-center ml-2 s-bld"> = 0.05466779</h6>-->
<!--                                    <small className="align-self-center ml-2 s-bld gray"> $ 1,151.14</small>-->
<!--                                </div>--> */}
                        </NavLink>
                      </>
                    )}

                    {/* <!--                        <div className="sub-account mb-2 d-flex justify-content-between">-->
                        <!--                            <div className="d-flex ">-->
                        <!--                                <img className="align-self-center"-->
                        <!--                                     src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/294.png"-->
                        <!--                                     height="30">-->
                        <!--                                <div className="d-flex  flex-column">-->
                        <!--                                    <h6 className="mb-0 align-self-center ml-2 s-bld"> OKX</h6>-->
                        <!--                                    <small className="align-self-center ml-2 s-bld gray"> 100%</small>-->
                        <!--                                </div>-->
                        <!--                            </div>-->
                        <!--                            <div className="d-flex flex-column ">-->
                        <!--                                <h6 className="mb-0 align-self-center ml-2 s-bld"> = 0.05466779</h6>-->
                        <!--                                <small className="align-self-center ml-2 s-bld gray"> $ 1,151.14</small>-->
                        <!--                            </div>-->
                        <!--                        </div>-->

                        <!--                        <div className="sub-account mb-2 d-flex justify-content-between">-->
                        <!--                            <div className="d-flex ">-->
                        <!--                                <img className="align-self-center"-->
                        <!--                                     src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/294.png"-->
                        <!--                                     height="30">-->
                        <!--                                <div className="d-flex  flex-column">-->
                        <!--                                    <h6 className="mb-0 align-self-center ml-2 s-bld"> OKX</h6>-->
                        <!--                                    <small className="align-self-center ml-2 s-bld gray"> 100%</small>-->
                        <!--                                </div>-->
                        <!--                            </div>-->
                        <!--                            <div className="d-flex flex-column ">-->
                        <!--                                <h6 className="mb-0 align-self-center ml-2 s-bld"> = 0.05466779</h6>-->
                        <!--                                <small className="align-self-center ml-2 s-bld gray"> $ 1,151.14</small>-->
                        <!--                            </div>-->
                        <!--                        </div>-->
                        <!--                        -->

                        <!--            <h3>{t("FTFTex WALLET TXT1")}</h3>-->
                        <!--            <p className="mt-2">{t("FTFTex WALLET TXT2")}</p>-->
                        <!--            <div>-->
                        <!--              <button className="btn btn-primary h-fit mb-auto w-fit  s-bld btn-lg px-4"-->
                        <!--                      [routerLink]="'/wallet/account'">{t("Demo")}</button>-->
                        <!--              <button className="btn btn-primary h-fit mb-auto w-fit  s-bld btn-lg px-4 ml-2"-->
                        <!--                      [routerLink]="'/wallet/purchase-crypto'">{t("Purchase crypto")}</button>-->
                        <!--            </div>--> */}
                  </div>
                  {/* <!--          <div className="col-lg-8 d-none d-lg-block">-->
                    <!--            <img src="assets/images/wallet.svg" className="b-main-img">-->
                    <!--          </div>--> */}
                </div>
                <hr />
              </div>
            </section>
            {/* <!--    <section>-->
        <!--      <div className="container">-->
        <!--        <div className="row pg-main-sec">-->
        <!--          <div className="col-md-6">-->
        <!--            <video width="100%" height="600" autoplay muted loop>-->
        <!--              <source src="assets/videos/wallet_anim.mp4" type="video/mp4">-->
        <!--            </video>-->
        <!--          </div>-->
        <!--          <div className="col-md-5">-->
        <!--            <div className="card-d-b">-->
        <!--              <img src="assets/images/security.png" className="img-fit " height="160">-->
        <!--              <div className="ml-4 align-self-center">-->
        <!--                <h2 className="s-bld ">{t("Security")}</h2>-->
        <!--                <p className="mb-0">{t("Security TXT")}</p>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            <div className="card-d-b">-->
        <!--              <img src="assets/images/trending-up.png" className="img-fit " height="160">-->
        <!--              <div className="ml-4 align-self-center">-->
        <!--                <h2 className="s-bld ">{t("Asset Management")}</h2>-->
        <!--                <p className="mb-0">{t("Asset Management TXT")}</p>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--            <div className="card-d-b">-->
        <!--              <img src="assets/images/ease-of-use.png" className="img-fit " height="160">-->
        <!--              <div className="ml-4 align-self-center">-->
        <!--                <h2 className="s-bld ">{t("Ease of use")}</h2>-->
        <!--                <p className="mb-0">{t("Ease of use TXT")}</p>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--    </section>-->
        <!--    <section>-->
        <!--      <div className="container mb-5">-->
        <!--        <div className="wt-box">-->
        <!--          <div className="row">-->
        <!--            <div className="col-lg-6 d-lg-block d-none">-->
        <!--              <img src="assets/images/subscribe-art.png" className="w-100" style="height: 480px;object-fit: cover">-->
        <!--            </div>-->
        <!--            <div className="col-lg-6">-->
        <!--              <div className="p-4">-->
        <!--                <h1 className="s-bld my-lg-5 my-4">{t("Stay tuned !")}</h1>-->
        <!--                <h5>{t("Stay tuned TXT1")}</h5>-->
        <!--                <h5 className="mt-3">{t("Stay tuned TXT2")}</h5>-->
        <!--                <hr>-->
        <!--                <div className="d-flex mt-5">-->
        <!--                  <input className="form-control rounded-0" placeholder="Email" [(ngModel)]="subEmail">-->
        <!--                  <button className="btn btn-primary rounded-0" [disabled]="!subEmail"-->
        <!--                          (click)="Subscribe()">{t("Subscribe")}</button>-->
        <!--                </div>-->
        <!--                <p className="text-center my-4">{{message}}</p>-->
        <!--              </div>-->
        <!--            </div>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--      </div>-->
        <!--    </section>--> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Wallet;
