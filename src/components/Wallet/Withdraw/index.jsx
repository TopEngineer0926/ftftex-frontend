import { useTranslation } from "react-i18next";
import "./index.scss";
import { useEffect, useState } from "react";
import { getLoggedIn } from "utils";
import { useNavigate } from "react-router-dom";
import ApiService from "services/apiService";
import { ToastContainer, toast } from "react-toastify";
import { Dropdown, Modal } from "react-bootstrap";

const Withdraw = ({ type, balances, onClose }) => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [OTP, setOTP] = useState("");
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const [showModal, setShowModal] = useState(false);
  const WALLET_LIST = ["Funding Wallet", "Trading Wallet"];
  const [selectedWallet, setSelectedWallet] = useState("Funding Wallet");
  const [withdrawnWallet, setWithdrawnWallet] = useState("Trading Wallet");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [createdDeposit, setCreatedDeposit] = useState();
  const [selectedChain, setSelectedChain] = useState({
    ccy: "",
    chain: "",
  });
  const [chains, setChains] = useState([]);
  const [showEmailVerifyPopModal, setShowEmailVerifyPopModal] = useState(false);
  const [withdrawSuccessModal, setWithdrawSuccessModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const params = {
      ccy: "BTC,ETH,USDT,MATIC,SOL,SHIB,LTC,AVAX,DAI,UNI,WBTC,LINK,ETC,APT,XLM,HOO,XHB,LDO,FIL,ALGO,VET",
    };
    ApiService.getCurrencies(params).then((res) => {
      let tmpCurrencies = groupBy(
        JSON.parse(res.data["KYC Api resuult"]).data,
        "ccy"
      );
      setCurrencies(tmpCurrencies);
    });
  }, []);

  const groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).unshift(x);
      return rv;
    }, {});
  };

  useEffect(() => {
    setSelectedChain({
      chain: "",
      ccy: selectedCurrency,
    });
  }, [selectedCurrency]);

  useEffect(() => {
    const data = getLoggedIn();
    if (!data[0]) {
      navigate("/login");
    } else {
      setLogginIn(data);
    }
  }, []);

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const sendOTPToEmail = () => {
    const data = {
      email: LogginIn[4],
      phone: "",
    };

    ApiService.VerifyEmail(data)
      .then((res) => {
        setShowEmailVerifyPopModal(true);
      })
      .catch((err) => {
        setShowEmailVerifyPopModal(true);
        toast.error(
          "Can't send the OTP to your email. Please try again later."
        );
      });
  };

  const withdrawMoney = () => {
    const data = {
      userId: LogginIn[8],
      pinCode: OTP,
    };

    ApiService.VerifyUser(data).then((res) => {
      const params = {
        amt: amount,
        fee: "0.0005",
        dest: 4,
        ccy: selectedCurrency,
        chain: "USDT-TRC20",
        toAddr: address,
        subAcct: LogginIn[5],
      };

      ApiService.createWithdrawal(params).then((res) => {
        const result = JSON.parse(res.data["KYC Api resuult"]);
        console.log(result, "result");
        if (!result.data.length && result.msg) {
          toast.error(result.msg);
        } else if (!res.data.msg) {
          dismissAll();
          setWithdrawSuccessModal(true);
        }
      });
    });
  };

  const ResendOTPToEmail = () => {
    const data = {
      email: LogginIn[4],
      phone: "",
    };

    ApiService.VerifyEmail(data)
      .then((res) => {})
      .catch((err) => {
        toast.error(
          "Can't send the OTP to your email. Please try again later."
        );
      });
  };

  const selectCurrency = (ccy) => {
    setSelectedCurrency(ccy);
    setChains(currencies[ccy]);
  };

  const selectNetwork = (network) => {
    setSelectedChain(network);
    setCreatedDeposit({});
    setAddress("");

    const res = getLoggedIn();
    const params = {
      ccy: network.ccy,
      subAcct: res[5],
      chain: network.chain,
    };

    ApiService.createDepositAddressForSubAccount(params).then((res) => {
      console.log(res, "res");
      setCreatedDeposit(JSON.parse(res.data["KYC Api resuult"]).data?.[0]);
    });
  };

  const handleCloseEmailVerifyPopModal = () => {
    setShowEmailVerifyPopModal(false);
  };

  const handleChangeOTP = (e) => {
    setOTP(e.target.value);
  };

  const dismissAll = () => {
    onClose();
    setShowEmailVerifyPopModal(false);
  };

  const handleChangeWallet = (wallet, target) => {
    if (target === "select") {
      setSelectedWallet(wallet);
      let tmpWalletList = WALLET_LIST;
      let k = tmpWalletList.indexOf(wallet);
      if (k > -1) {
        tmpWalletList.splice(k, 1);
        setWithdrawnWallet(tmpWalletList[0]);
      }
    }
  };

  return (
    <>
      <div class="modal-header justify-content-center mt-3">
        {type === "okx" && (
          <img
            className="align-self-center"
            src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/294.png"
            height={30}
          />
        )}
        {type === "huobi" && (
          <img
            className="align-self-center"
            src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/102.png"
            height={30}
          />
        )}
        {type === "xt" && (
          <img
            className="align-self-center"
            src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/525.png"
            height={30}
          />
        )}
        <span style={{ marginLeft: 10, alignSelf: "center", fontSize: 25 }}>
          {type === "okx" ? "OKX" : type === "huobi" ? "Huobi" : "XT.com"}{" "}
          Wallet Withdrawal
        </span>
      </div>
      <div class="modal-body">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <span>Cryptocurrency</span>
          <Dropdown>
            <Dropdown.Toggle
              className="form-control ddrop d-flex"
              id="dropdownBasic1"
            >
              {selectedCurrency === "" ? (
                <span className="align-self-center">-- Select --</span>
              ) : (
                <>
                  <img
                    src={currencies[selectedCurrency]?.[0]?.logoLink}
                    alt=""
                    className="align-self-center"
                  />
                  <span className="align-self-center">{selectedCurrency}</span>
                </>
              )}
              <span
                className="material-symbols-outlined align-self-center mb-0 ml-auto mr-2"
                style={{ fontSize: 24 }}
              >
                arrow_drop_down
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu
              aria-labelledby="dropdownBasic1"
              className="drop-down-cc"
              style={{ maxHeight: 250, overflowY: "auto" }}
            >
              {currencies && (
                <div class="currency-list d-flex flex-column mt-3">
                  {Object.keys(currencies).map((ccy, index) => (
                    <Dropdown.Item
                      class="currency-list-item"
                      onClick={() => selectCurrency(ccy)}
                    >
                      <img src={currencies[ccy]?.[0]?.logoLink} alt="" />
                      <span>{ccy}</span>
                    </Dropdown.Item>
                  ))}
                </div>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <span>Network</span>
          <Dropdown>
            <Dropdown.Toggle
              className="form-control ddrop d-flex"
              id="dropdownBasic1"
            >
              {selectedChain.chain === "" ? (
                <span className="align-self-center">-- Select --</span>
              ) : (
                <span className="align-self-center">{selectedChain.chain}</span>
              )}
              <span
                className="material-symbols-outlined align-self-center mb-0 ml-auto mr-2"
                style={{ fontSize: 24 }}
              >
                arrow_drop_down
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu
              aria-labelledby="dropdownBasic1"
              style={{ maxHeight: 200, overflowY: "auto" }}
            >
              {chains.map((chain, index) => (
                <Dropdown.Item
                  className="network-list-item"
                  onClick={() => selectNetwork(chain)}
                  key={index}
                >
                  <span>{chain.chain}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <span>Address</span>
          <input
            type="text"
            value={address}
            onChange={handleChangeAddress}
            placeholder="Paste Address."
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <span>Amount</span>
          <input
            type="number"
            value={amount}
            onChange={handleChangeAmount}
            placeholder="Enter Amount"
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <span>Send From</span>
          <Dropdown>
            <Dropdown.Toggle
              className="form-control ddrop d-flex"
              id="dropdownBasic1"
            >
              <span className="align-self-center">{selectedWallet}</span>
              <span
                className="material-symbols-outlined align-self-center mb-0 ml-auto mr-2"
                style={{ fontSize: 24 }}
              >
                arrow_drop_down
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu
              aria-labelledby="dropdownBasic1"
              style={{ maxHeight: 200, overflowY: "auto" }}
            >
              {WALLET_LIST.map((wallet, index) => (
                <Dropdown.Item
                  className="network-list-item"
                  onClick={() => handleChangeWallet(wallet, "select")}
                  key={index}
                >
                  <span>{wallet}</span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <button
          class="btn btn-primary mt-1 mb-1 ml-auto d-block "
          onClick={sendOTPToEmail}
        >
          {t("Transfer")}
        </button>
      </div>
      <ToastContainer position="top-right" />
      <Modal
        show={showEmailVerifyPopModal}
        onHide={handleCloseEmailVerifyPopModal}
        centered
        backdrop="static"
        aria-labelledby="modal-basic-title"
      >
        <div className="modal-body">
          <span
            className="material-symbols-outlined d-block mx-auto text-center"
            style={{ fontSize: 90 }}
          >
            mail
          </span>
          <p className="text-center mt-2">
            Verification code has been sent to <br /> <b>{LogginIn[4]}</b>
          </p>
          <input
            className="form-control mx-auto w-75 mt-4"
            value={OTP}
            placeholder="OTP"
            onChange={handleChangeOTP}
          />
          <div className="d-flex justify-content-center mt-5">
            <button
              type="button"
              className="btn btn-outline-primary px-5  d-block"
              onClick={handleCloseEmailVerifyPopModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-outline-primary px-5  d-block"
              onClick={ResendOTPToEmail}
            >
              Resend
            </button>
            <button
              type="button"
              className="btn btn-primary px-5 ml-3  d-block"
              onClick={withdrawMoney}
              disabled={OTP.length === 0}
            >
              Withdraw
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        show={withdrawSuccessModal}
        onHide={() => setWithdrawSuccessModal(false)}
        centered
        backdrop="static"
        aria-labelledby="modal-basic-title"
      >
        <div class="modal-header justify-content-center mt-5">
          <span style={{ fontSize: 25, fontWeight: "bold" }}>
            Withdrawal Successful!
          </span>
        </div>
        <div class="modal-body">
          <p style={{ textAlign: "center" }}>
            You have successfully withdrawn{" "}
            <span style={{ color: "blue" }}>
              0.3{" "}
              <img
                src={currencies[selectedCurrency]?.[0]?.logoLink}
                alt=""
                className="align-self-center"
                width={25}
                height={25}
              />
              &nbsp;{selectedCurrency} ($ 1000)
            </span>
          </p>
          <p style={{ textAlign: "center" }}>
            from your <span style={{ color: "blue" }}>{selectedWallet}</span> to
            your{" "}
            <span style={{ color: "blue" }}>
              {address.substring(0, 4)} ...{" "}
              {address.substring(address.length - 5, address.length - 1)}
            </span>
            .
          </p>
          <br />
          <p style={{ textAlign: "center" }}>
            Total Balance {withdrawnWallet} = 0.3 + 1.0 ={" "}
            <span style={{ color: "blue" }}>1.3 BTC</span>{" "}
          </p>
          <button
            class="btn btn-primary mt-5 mb-3 mx-auto d-block font-weight-bold px-5"
            onClick={() => setWithdrawSuccessModal(false)}
          >
            {t("Continue")}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Withdraw;
