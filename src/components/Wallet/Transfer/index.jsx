import { useTranslation } from "react-i18next";
import "./index.scss";
import { Dropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getLoggedIn } from "utils";
import { useNavigate } from "react-router-dom";
import ApiService from "services/apiService";
import TransferFrom from "assets/images/transfer-from.png";
import TransferTo from "assets/images/transfer-to.png";
import { ToastContainer, toast } from "react-toastify";

const Transfer = ({ type, balances, tradings, onClose }) => {
  const { t } = useTranslation();
  const [transferSuccess, setTransferSuccess] = useState(false);
  const [amount, setAmount] = useState("");
  const [fromMain, setFromMain] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const WALLET_LIST = ["Funding Wallet", "Trading Wallet"];
  const [selectedFrom, setSelectedFrom] = useState("Funding Wallet");
  const [selectedTo, setSelectedTo] = useState("Trading Wallet");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [currencies, setCurrencies] = useState([]);

  const navigate = useNavigate();

  const selectCurrency = (ccy) => {
    setSelectedCurrency(ccy);
  };

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
    let data = getLoggedIn();

    if (!data[0]) {
      navigate("/login");
    } else {
      setLogginIn(data);
    }
  }, []);

  const handleChangeAmount = (e) => {
    setErrorMessage("");
    setAmount(e.target.value);
  };

  const selectWallet = (wallet, target) => {
    if (target === "from") {
      setSelectedFrom(wallet);
      let tmpWalletList = WALLET_LIST;
      let k = tmpWalletList.indexOf(wallet);
      if (k > -1) {
        tmpWalletList.splice(k, 1);
        setSelectedTo(tmpWalletList[0]);
      }
    } else {
      setSelectedTo(wallet);
      let tmpWalletList = WALLET_LIST;
      let k = tmpWalletList.indexOf(wallet);
      if (k > -1) {
        tmpWalletList.splice(k, 1);
        setSelectedFrom(tmpWalletList[0]);
      }
    }
  };

  const transfer = () => {
    if (amount.length === 0) {
      setErrorMessage("Please input the money to transfer");
      return;
    }

    const params = {
      ccy: selectedCurrency,
      amt: amount,
      from: fromMain ? "18" : "6",
      to: fromMain ? "6" : "18",
      type: "0",
      clientId: "ftftex20230223testtransfer",
      subAcct: LogginIn[5],
    };
    ApiService.fundsTransfer(params).then((res) => {
      const result = JSON.parse(res.data["KYC Api resuult"]);
      console.log(result, "result");
      if (!result.data.length && result.msg) {
        toast.error(result.msg);
      } else if (!res.data.msg) {
        setTransferSuccess(true);
      }
      console.log(result);
    });
  };

  const myContinue = () => {
    onClose();
  };

  return (
    <>
      {!transferSuccess ? (
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
              Wallet Transfer
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
              <span>
                <img
                  src={TransferFrom}
                  style={{ marginRight: 60, marginLeft: 20 }}
                />
                <span>From</span>
              </span>
              <Dropdown>
                <Dropdown.Toggle
                  className="form-control ddrop d-flex"
                  id="dropdownBasic1"
                >
                  <span className="align-self-center">{selectedFrom}</span>
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
                      onClick={() => selectWallet(wallet, "from")}
                      key={index}
                    >
                      <span>{wallet}</span>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {balances && (
              <p style={{ textAlign: "right" }}>
                Available {balances} {selectedCurrency}
              </p>
            )}
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
              <span>
                <img
                  src={TransferFrom}
                  style={{
                    visibility: "hidden",
                    marginRight: 60,
                    marginLeft: 20,
                  }}
                />
                <span>Cryptocurrency</span>
              </span>
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
                      <span className="align-self-center">
                        {selectedCurrency}
                      </span>
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
              <span>
                <img
                  src={TransferFrom}
                  style={{
                    visibility: "hidden",
                    marginRight: 60,
                    marginLeft: 20,
                  }}
                />
                <span>Amount (USDT)</span>
              </span>
              <input
                type="number"
                value={amount}
                onChange={handleChangeAmount}
                placeholder="Enter Amount"
              />
            </div>
            {errorMessage && (
              <p style={{ color: "red", textAlign: "right", padding: "unset" }}>
                {errorMessage}
              </p>
            )}
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
              <span>
                <img
                  src={TransferTo}
                  style={{ marginRight: 60, marginLeft: 20 }}
                />
                <span>To</span>
              </span>
              <Dropdown>
                <Dropdown.Toggle
                  className="form-control ddrop d-flex"
                  id="dropdownBasic1"
                >
                  <span className="align-self-center">{selectedTo}</span>
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
                      onClick={() => selectWallet(wallet, "to")}
                      key={index}
                    >
                      <span>{wallet}</span>
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            {tradings && (
              <p style={{ textAlign: "right" }}>
                Available {tradings} {selectedCurrency}
              </p>
            )}
            <button
              class="btn btn-primary mt-1 mb-1 ml-auto d-block "
              onClick={transfer}
            >
              {t("Transfer")}
            </button>
          </div>
          <ToastContainer position="top-right" />
        </>
      ) : (
        <>
          <div class="modal-header justify-content-center mt-5">
            <span style={{ fontSize: 25, fontWeight: "bold" }}>
              Transfer Successful!
            </span>
          </div>
          <div class="modal-body">
            <p style={{ textAlign: "center" }}>
              You have successfully transfered{" "}
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
              from your <span style={{ color: "blue" }}>{selectedFrom}</span> to
              your <span style={{ color: "blue" }}>{selectedTo}</span>.
            </p>
            <br />
            <p style={{ textAlign: "center" }}>
              Total Balance {selectedTo} = 0.3 + 1.0 ={" "}
              <span style={{ color: "blue" }}>1.3 BTC</span>{" "}
            </p>
            <button
              class="btn btn-primary mt-5 mb-3 mx-auto d-block font-weight-bold px-5"
              onClick={myContinue}
            >
              {t("Continue")}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Transfer;
