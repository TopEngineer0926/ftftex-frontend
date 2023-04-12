import { useTranslation } from "react-i18next";
import "./index.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLoggedIn } from "utils";
import ApiService from "services/apiService";
import { Modal } from "react-bootstrap";
import Deposit from "components/Wallet/Deposit";
import Transfer from "components/Wallet/Transfer";
import Withdraw from "components/Wallet/Withdraw";

const WalletMain = () => {
  const { t } = useTranslation();
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const [tab, setTab] = useState("deposit");
  const [deposits, setDeposits] = useState([]);
  const [trading, setTrading] = useState([]);
  const [showDipositModal, setShowDipositModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const data = getLoggedIn();
    if (!data[0]) {
      navigate("/login");
    } else {
      setLogginIn(data);
    }

    const params = {
      subAcct: LogginIn[5],
    };
    getSubAccTradeBalance();
    getSubAccFoundBalance();

    // client.getSubAccountBalances(this.LogginIn[5]).then((res) => {
    //   console.log(res, 'res');
    // })
    // client.getSubAccountFundingBalances(this.LogginIn[5]).then((res) => {
    //   console.log(res, 'res');
    // })
  }, []);

  const getSubAccTradeBalance = () => {
    const params = {
      subAcct: LogginIn[5],
    };
    ApiService.getSubAccTradeBalance(params).then((res) => {
      let tmpTrading = JSON.parse(res.data["KYC Api resuult"])?.data[0].details;
      setTrading(tmpTrading);
    });
  };

  const getSubAccFoundBalance = () => {
    const params = {
      subAcct: LogginIn[5],
    };
    ApiService.getSubAccFoundBalance(params).then((res) => {
      let tmpDeposits = JSON.parse(res.data["KYC Api resuult"])?.data;
      setDeposits(tmpDeposits);
    });
  };

  const changeTag = (value) => {
    if (tab === value && tab === "deposit") {
      openDepositModal();
    }
    if (value === "trading") {
      getSubAccTradeBalance();
    } else if (value === "deposit") {
      getSubAccFoundBalance();
    }
    setTab(value);
  };

  const openDepositModal = () => {
    setShowDipositModal(true);
  };

  const openTransferModal = () => {
    setShowTransferModal(true);
  };

  const openWithdrawalModal = () => {
    setShowWithdrawalModal(true);
  };

  return (
    <div className="bg-wt ">
      <div className="min-h-full">
        <section>
          <div className="container">
            <div className="row pg-main-sec">
              <div className="col-lg-4 justify-content-center d-flex flex-column content-b">
                <span className="mt-5 pointer">
                  <NavLink to={"/wallet"}>{"< Back"}</NavLink>
                </span>

                <h1 className="d-block s-bld  banner-header">
                  {t("OKX Main Wallet")}
                </h1>
                <div className="d-flex mt-4">
                  <div
                    className="sub-menu-btn btn mr-2 px-4"
                    onClick={() => changeTag("deposit")}
                  >
                    {t("Deposit")}
                  </div>
                  <div
                    className="sub-menu-btn btn mr-2 px-4"
                    onClick={() => changeTag("trading")}
                  >
                    {t("Trading Account")}
                  </div>
                  <div
                    className="sub-menu-btn btn mr-2 px-4"
                    onClick={() => {
                      changeTag("transfer");
                      openTransferModal();
                    }}
                  >
                    {t("Transfer")}
                  </div>
                  <div
                    className="sub-menu-btn btn mr-2 px-4"
                    onClick={() => {
                      changeTag("withdrawal");
                      openWithdrawalModal();
                    }}
                  >
                    {t("Withdrawal")}
                  </div>
                </div>

                {tab === "deposit" && (
                  <div className="coin-lit">
                    <h6 className="d-block s-bld mt-2">
                      {t("Funding Account")}
                    </h6>
                    {deposits.map((coin, index) => (
                      <div className="mt-5" key={index}>
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 align-self-center s-bld">
                            {" "}
                            {coin.ccy}
                          </h6>
                        </div>
                        <div className="d-flex w-100 justify-content-between">
                          <div className="d-flex mt-2">
                            <div className="d-flex flex-column gap-3">
                              <small className="align-self-center s-bld gray w-100">
                                {" "}
                                Total
                              </small>
                              <h6 className="mb-0 align-self-center s-bld w-100">
                                {" "}
                                {coin.bal} {coin.ccy}
                              </h6>
                            </div>
                          </div>
                          <div className="d-flex mt-2">
                            <div className="d-flex flex-column gap-3">
                              <small className="align-self-center s-bld gray w-100">
                                {" "}
                                Available
                              </small>
                              <h6 className="mb-0 align-self-center s-bld w-100">
                                {" "}
                                {coin.availBal} {coin.ccy}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {tab === "trading" && (
                  <div className="coin-lit">
                    <h6 className="d-block s-bld mt-2">
                      {t("Trading Account")}
                    </h6>
                    {trading.map((coin, index) => (
                      <div className="mt-5" key={index}>
                        <div className="d-flex align-items-center">
                          <h6 className="mb-0 align-self-center s-bld">
                            {" "}
                            {coin.ccy}
                          </h6>
                        </div>
                        <div className="d-flex w-100 justify-content-between">
                          <div className="d-flex mt-2">
                            <div className="d-flex flex-column gap-3">
                              <small className="align-self-center s-bld gray w-100">
                                {" "}
                                Total
                              </small>
                              <h6 className="mb-0 align-self-center s-bld w-100">
                                {" "}
                                {coin.bal} {coin.ccy}
                              </h6>
                            </div>
                          </div>
                          <div className="d-flex mt-2">
                            <div className="d-flex flex-column gap-3">
                              <small className="align-self-center s-bld gray w-100">
                                {" "}
                                Available
                              </small>
                              <h6 className="mb-0 align-self-center s-bld w-100">
                                {" "}
                                {coin.availBal} {coin.ccy}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <hr />
          </div>
        </section>
      </div>
      <Modal
        show={showDipositModal}
        onHide={setShowDipositModal(false)}
        centered
        scrollable
      >
        <Deposit />
      </Modal>
      <Modal
        show={showTransferModal}
        onHide={setShowTransferModal(false)}
        centered
        scrollable
      >
        <Transfer balances={deposits} tradings={trading} />
      </Modal>
      <Modal
        show={showWithdrawalModal}
        onHide={setShowWithdrawalModal(false)}
        centered
        scrollable
      >
        <Withdraw balances={deposits} />
      </Modal>
    </div>
  );
};

export default WalletMain;
