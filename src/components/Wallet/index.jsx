import { useEffect, useState, useContext } from "react";
import "./index.scss";
import { getLoggedIn, getTheme } from "utils";
import { NavLink, useNavigate, Outlet } from "react-router-dom";
import ApiService from "services/apiService";
import { useTranslation } from "react-i18next";
import WalletImg from "assets/images/wallet.svg";
import WalletAnimVid from "assets/videos/wallet_anim.mp4";
import WalletAnimBlackVid from "assets/videos/wallet_anim_black.mp4";
import SecurityImg from "assets/images/security.png";
import TrendingUpImg from "assets/images/trending-up.png";
import EaseOfUseImg from "assets/images/ease-of-use.png";
import SubscribeArtImg from "assets/images/subscribe-art.png";
import { FTFTexContext } from "App";

const Wallet = () => {
  const loggedIn = JSON.parse(localStorage.getItem("usr"));
  const { t } = useTranslation();
  const [subEmail, setSubEmail] = useState("");
  const [message, setMessage] = useState("");
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const [walletInfo, setWalletInfo] = useState();
  const [houbiWalletInfo, setHoubiWalletInfo] = useState();
  const [xtWalletInfo, setXtWalletInfo] = useState();
  const [balance, setBalance] = useState();
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  useEffect(() => {
    const res = getLoggedIn();
    if (!res[0]) {
      navigate("/login");
    } else {
      setLogginIn(res);
    }
  }, []);

  useEffect(() => {
    if (loggedIn[6] === "verified") {
      // okx start
      const createSubAccountParams = {
        subAcct: loggedIn[5],
        label: "852422",
        userId: userId,
      };
      ApiService.createSubAccount(createSubAccountParams).then((res) => {
        const params = {
          subAcct: loggedIn[5],
          page: 1,
          limit: 100,
        };
        ApiService.getSubAccountList(params).then((res) => {
          if (JSON.parse(res.data["KYC Api resuult"]).data?.[0]) {
            let tmpWalletInfo = JSON.parse(res.data["KYC Api resuult"]).data[0]
              .details[0];
            setWalletInfo(tmpWalletInfo);
          }
        });
      });

      // okx end

      // xt start
      const paramsXT = {
        accountName: loggedIn[5],
        userId: userId,
      };
      const getSubAccountXtParams = {
        subAcct: loggedIn[5],
      };
      ApiService.getSubAccountXt(getSubAccountXtParams).then(
        (res) => {
          if (res.Error && res.Error === "Brokcer not found!") {
            ApiService.createSubAccountXt(paramsXT).then((res) => {
              setXtWalletInfo(res.data);
            });
          } else {
            setXtWalletInfo(res.data);
          }
        },
        (error) => {
          ApiService.createSubAccountXt(paramsXT).then((res) => {
            setXtWalletInfo(res.data);
          });
        }
      );
      // xt end

      // houbi start

      // TODO need endpoint to get subAccount

      const createSubAccountHoubi = {
        userList: [
          {
            userName: loggedIn[5],
            note: "huobi",
          },
        ],
        userId: userId,
      };
      ApiService.createSubAccountHuobi(createSubAccountHoubi).then((res) => {});
      const getSubUserParams = {
        userId: userId,
      };
      ApiService.getSubAccountHuobi(getSubUserParams).then((res) => {
        setHoubiWalletInfo(JSON.parse(res.data["API Result"]).data);
      });
      // houbi end
    }
  }, []);

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
      {LogginIn[6] === "verified" && (
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
                        <NavLink to={"/account/verification"}>
                          {t("Verify Your Account")}
                        </NavLink>
                      </button>
                      <button className="btn btn-primary h-fit mb-auto w-fit  s-bld btn-lg px-2 ml-2">
                        <NavLink to={"/buy-crypto"}>
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
                    <video width="100%" height="600" autoPlay muted loop>
                      <source
                        src={
                          getTheme() === "dark"
                            ? WalletAnimBlackVid
                            : WalletAnimVid
                        }
                        type="video/mp4"
                      />
                    </video>
                  </div>
                  <div className="col-md-5">
                    <div
                      className={
                        getTheme() === "dark"
                          ? "card-d-b card-d-b-black"
                          : "card-d-b"
                      }
                    >
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
                    <div
                      className={
                        getTheme() === "dark"
                          ? "card-d-b card-d-b-black"
                          : "card-d-b"
                      }
                    >
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
                    <div
                      className={
                        getTheme() === "dark"
                          ? "card-d-b card-d-b-black"
                          : "card-d-b"
                      }
                    >
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
      {LogginIn[6] !== "verified" && (
        <div className="container mt-4 mb-4" style={{ margin: "auto" }}>
          <div className="row">
            <div
              className={
                isMobile ? "col-lg-3 wt-box p-4" : "col-lg-3 wt-box mr-4 p-4"
              }
              style={{
                position: "sticky",
                top: 0,
                margin: isMobile && "1rem",
              }}
            >
              <div className="d-flex align-items-center mb-2">
                <div className="d-flex flex-column">
                  <h4 className="s-bld">{t("My Wallet")}</h4>
                </div>
              </div>
              <div
                className={isMobile ? "d-lg-block" : "d-flex d-lg-block"}
                style={{ minHeight: isMobile ? 150 : 600 }}
              >
                <div className="btn w-100 radius-10">
                  <div style={{ width: 30, height: 30 }}></div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <span className="ml-5">Name</span>
                    {/*<span>Assets</span>*/}
                  </div>
                </div>
                {!!walletInfo && (
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "btn sub-menu-btn w-100 radius-10 btn-primary"
                        : "btn sub-menu-btn w-100 radius-10"
                    }
                    to={"/wallet/okx"}
                  >
                    <img
                      className="align-self-center"
                      src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/294.png"
                      height={30}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <span className="ml-4">OKX</span>
                      {/*<span style={{ color: "green" }}>●</span>*/}
                    </div>
                  </NavLink>
                )}

                <hr style={{ margin: "unset" }} />
                {!!houbiWalletInfo && (
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "btn sub-menu-btn light-border-bottom w-100 radius-10 btn-primary"
                        : "btn sub-menu-btn light-border-bottom w-100 radius-10"
                    }
                    to={"/wallet/huobi"}
                  >
                    <img
                      className="align-self-center"
                      src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/102.png"
                      height={30}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <span className="ml-4">Huobi</span>
                      {/*<span style={{ color: "green" }}>●</span>*/}
                    </div>
                  </NavLink>
                )}

                <hr style={{ margin: "unset" }} />
                {!!xtWalletInfo && (
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? "btn sub-menu-btn light-border-bottom w-100 radius-10 btn-primary"
                        : "btn sub-menu-btn light-border-bottom w-100 radius-10"
                    }
                    to={"/wallet/xt"}
                  >
                    <img
                      className="align-self-center"
                      src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/525.png"
                      height={30}
                    />
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <span className="ml-4">XT.com</span>
                      {/*<span style={{ color: "grey" }}>●</span>*/}
                    </div>
                  </NavLink>
                )}
              </div>
              <p
                className="tab-text m-0 mr-1"
                style={{ position: "absolute", bottom: 20 }}
              >
                Version 1.0.0
              </p>
            </div>
            <div className="col-lg-8" style={{ overflow: "visible" }}>
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Wallet;
