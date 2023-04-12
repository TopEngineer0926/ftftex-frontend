import { useTranslation } from "react-i18next";
import "./index.scss";
import numeral from "numeral";
import { useEffect, useRef, useState } from "react";
import { getLoggedIn } from "utils";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import ApiService from "services/apiService";
import CheckImg from "assets/images/check.svg";

const Withdraw = ({ balances }) => {
  const { t } = useTranslation();
  const [selectedCoin, setSelectedCoin] = useState({});
  const [amount, setAmount] = useState("");
  const [address, setAddress] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [LogginIn, setLoggedIn] = useState({ 0: "" });
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const data = getLoggedIn();
    if (!data[0]) {
      navigate("/login");
    } else {
      setLoggedIn(data);
    }
  }, []);

  const handleChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const selectCoin = (coin) => {
    setSelectedCoin(coin);
  };

  const transfer = () => {
    const params = {
      amt: amount,
      fee: "0.0005",
      dest: 4,
      ccy: selectedCoin.ccy,
      chain: "USDT-TRC20",
      toAddr: address,
      subAcct: LogginIn[5],
    };
    ApiService.createWithdrawal(params).then((res) => {
      const result = JSON.parse(res.data["KYC Api resuult"]);
      console.log(result, "result");
      if (!result.data.length && result.msg) {
        setErrorMessage(result.msg);
      } else if (!res.data.msg) {
        setShowModal(true);
      }
    });
  };

  return (
    <>
      <div class="modal-header">
        <h3>{t(selectedCoin ? "Withdrawal" : "Select Coin")}</h3>
      </div>
      <div class="modal-body">
        {!selectedCoin && (
          <div class="coin-list d-flex flex-column mt-1">
            {balances.map((coin, index) => (
              <div
                class="coin-list-item"
                key={index}
                onClick={() => selectCoin(coin)}
              >
                <span>{coin.ccy}</span>
                <small>{numeral(coin.availBal).format("0.3-8")}</small>
              </div>
            ))}
          </div>
        )}
        {selectedCoin && (
          <div class="transfer">
            <div class="transfer-currency">
              <span>{selectedCoin.ccy}</span>
              {/* <!--            <small class="gray">Bitcoin</small>--> */}
            </div>

            <div class="d-flex justify-content-between mt-1">
              <small class="gray">Address</small>
            </div>
            <input
              type="text"
              class="transfer-input mt-3"
              value={address}
              onChange={handleChangeAddress}
              placeholder="bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq"
            />

            <div class="d-flex justify-content-between mt-1">
              <small class="gray">Amount</small>
              <span class="available">
                Available {numeral(selectedCoin.availBal).format("0.3-8")}
              </span>
            </div>
            <input
              type="number"
              class="transfer-input mt-3"
              value={amount}
              onChange={handleChangeAmount}
              placeholder="0.0000000000"
            />

            <p class="mt-4 text-center error-msg">{errorMessage} </p>

            <button
              class="btn btn-primary btn-lg mt-5 mb-3 mx-auto d-block font-weight-bold px-5"
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
        ariaLabelledBy="modal-basic-title"
      >
        <div class="modal-body">
          <img src={CheckImg} class="mx-auto d-block mb-3 mt-5" height={60} />
          <h2 class="mb-5 text-center s-bld">Success</h2>
          <button
            type="button"
            class="btn btn-primary btn-lg px-5 w-100"
            onClick={() => setShowModal(false)}
          >
            Ok
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Withdraw;
