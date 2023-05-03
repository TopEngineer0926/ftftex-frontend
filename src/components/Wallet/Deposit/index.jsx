import { useEffect, useState } from "react";
import ApiService from "services/apiService";
import { Dropdown } from "react-bootstrap";
import { getLoggedIn } from "utils";
import { QRCode } from "react-qrcode-logo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";

const Deposit = () => {
  const [currencies, setCurrencies] = useState([]);
  const [chains, setChains] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [createdDeposit, setCreatedDeposit] = useState();
  const [selectedChain, setSelectedChain] = useState({
    ccy: "",
    chain: "",
  });
  const [address, setAddress] = useState("");
  const [depositErr, setDepositErr] = useState("");

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

  const selectCurrency = (ccy) => {
    setSelectedCurrency(ccy);
    setChains(currencies[ccy]);
  };

  const selectNetwork = (network) => {
    setSelectedChain(network);
    setCreatedDeposit({});
    setDepositErr("");
    setAddress("");

    const res = getLoggedIn();
    const params = {
      ccy: network.ccy,
      subAcct: res[5],
      chain: network.chain,
    };

    ApiService.createDepositAddressForSubAccount(params).then((res) => {
      console.log(res, "res");
      setCreatedDeposit(JSON.parse(res.data["KYC Api resuult"]).data[0]);
      setDepositErr(JSON.parse(res.data["KYC Api resuult"]).msg);
    });
  };

  useEffect(() => {
    console.log("createdDeposit?.addr", createdDeposit?.addr);
    if (createdDeposit?.addr) setAddress(createdDeposit.addr);
  }, [createdDeposit?.addr]);

  useEffect(() => {
    setSelectedChain({
      chain: "",
      ccy: selectedCurrency,
    });
  }, [selectedCurrency]);

  const copy = (add) => {
    navigator.clipboard.writeText(add);
    toast.success("Copied to clipboard!");
  };

  return (
    <>
      <div class="modal-header justify-content-center mt-3">
        <img
          className="align-self-center"
          src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/294.png"
          height={30}
        />
        <span style={{ marginLeft: 10, alignSelf: "center", fontSize: 25 }}>
          OKX Wallet Deposit
        </span>
      </div>
      <div class="modal-body" style={{ minHeight: 350 }}>
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
          {address ? (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                {address.substring(0, 9)} ...{" "}
                {address.substring(address.length - 9, address.length - 1)}
                <span
                  class="material-symbols-outlined"
                  onClick={() => copy(address)}
                  style={{ cursor: "pointer" }}
                >
                  &nbsp;content_copy
                </span>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        {!address && depositErr && (
          <span style={{ color: "red" }}>{depositErr}</span>
        )}
        {address && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span></span>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ marginRight: 10 }}>
                Scan the code to <br /> copy the address
              </span>
              <QRCode
                value={address}
                size={150}
                logoImage="/favicon.svg"
                logoWidth={35}
                logoHeight={35}
              />
            </div>
          </div>
        )}
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};

export default Deposit;
