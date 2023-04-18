import { useTranslation } from "react-i18next";
import "./index.scss";
import numeral from "numeral";
import ArrowImg from "assets/images/arrow.svg";
import CheckImg from "assets/images/check.svg";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getLoggedIn } from "utils";
import { useNavigate } from "react-router-dom";
import ApiService from "services/apiService";

const Transfer = ({ balances, tradings }) => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState({});
  const [amount, setAmount] = useState("");
  const [fromMain, setFromMain] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [LogginIn, setLogginIn] = useState({ 0: "" });

  const navigate = useNavigate();

  useEffect(() => {
    let data = getLoggedIn();

    if (!data[0]) {
      navigate("/login");
    } else {
      setLogginIn(data);
    }
  }, []);

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const selectCoin = (coin) => {
    setSelectedCoin(coin);
  };

  const transfer = () => {
    const params = {
      ccy: selectedCoin.ccy,
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
        setErrorMessage(result.msg);
      } else if (!res.data.msg) {
        setShowModal(true);
      }
      console.log(result);
    });
  };

  return (
    <>
      <div className="modal-header">
        <h3>{t(selectedCoin ? "Transfer" : "Select Coin")}</h3>
      </div>
      <div className="modal-body">
        {!selectedCoin && (
          <div className="coin-list d-flex flex-column mt-1">
            {balances.map((coin, index) => (
              <div
                className="coin-list-item"
                key={index}
                onClick={() => selectCoin(coin)}
              >
                <span>
                  {coin.ccy} <small>(Funding)</small>
                </span>
                <small>{numeral(coin.availBal).format("0.3-8")}</small>
              </div>
            ))}
          </div>
        )}
        {!selectedCoin && (
          <div className="coin-list d-flex flex-column mt-1">
            {tradings.map((coin, index) => (
              <div
                className="coin-list-item"
                key={index}
                onClick={() => selectCoin(coin)}
              >
                <span>
                  {coin.ccy} <small>(Trading)</small>
                </span>
                <small>{numeral(coin.availBal).format("0.3-8")}</small>
              </div>
            ))}
          </div>
        )}
        {selectedCoin && (
          <div className="transfer">
            <div className="transfer-currency">
              <span>{selectedCoin.ccy}</span>
              {/* <!--            <small className="gray">Bitcoin</small>--> */}
            </div>

            <div
              className={
                fromMain
                  ? "transfer-trading mt-2 d-flex topBottom"
                  : "transfer-trading mt-2 d-flex"
              }
            >
              <div className="from-to d-flex">
                <small className="gray">From</small>
                <div className="ma">FA</div>
                <span className="white">Funding Account</span>
              </div>
              <div className="d-flex justify-content-center pointer">
                <img
                  src={ArrowImg}
                  width="25"
                  alt=""
                  onClick={setFromMain(!fromMain)}
                />
              </div>
              <div className="from-to d-flex">
                <small className="gray">To</small>
                <div className="ma ta">TA</div>
                <span className="white">Trading Account</span>
              </div>
            </div>

            <div className="d-flex justify-content-between mt-1">
              <small className="gray">Amount</small>
              <span className="available">
                Available {numeral(selectedCoin.availBal).format("0.3-8")}
              </span>
            </div>
            <input
              type="number"
              className="transfer-input mt-3"
              value={amount}
              placeholder="0.0000000000"
              onChange={handleChangeAmount}
            />

            <p className="mt-4 text-center error-msg">{errorMessage} </p>

            <button
              className="btn btn-primary btn-lg mt-5 mb-3 mx-auto d-block font-weight-bold px-5"
              onClick={transfer}
            >
              {t("Confirm")}
            </button>
          </div>
        )}
      </div>

      <Modal
        show={showModal}
        onHide={setShowModal(false)}
        centered
        aria-labelledby="modal-basic-title"
      >
        <div className="modal-body">
          <img
            src={CheckImg}
            className="mx-auto d-block mb-3 mt-5"
            height={60}
          />
          <h2 className="mb-5 text-center s-bld">Success</h2>
          <button
            type="button"
            className="btn btn-primary btn-lg px-5 w-100"
            onClick={() => setShowModal(false)}
          >
            Ok
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Transfer;
