import { useEffect, useState } from "react";
import "./index.scss";
import ApiService from "services/apiService";
import { Modal } from "react-bootstrap";
import SelectNetwork from "./SelectNetwork";

const Deposit = () => {
  const [tab, setTab] = useState("crypto");
  const [currencies, setCurrencies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [chains, setChains] = useState([]);

  useEffect(() => {
    const params = {
      ccy: "BTC,ETH,USDT,MATIC,SOL,SHIB,LTC,AVAX,DAI,UNI,WBTC,LINK,ETC,APT,XLM,HOO,XHB,LDO,FIL,ALGO,VET",
    };
    ApiService.getCurrencies(params).then((res) => {
      let tmpCurrencies = groupBy(
        JSON.parse(res["KYC Api resuult"]).data,
        "ccy"
      );
      setCurrencies(tmpCurrencies);
    });
  }, []);

  const changeTab = (val) => {
    setTab(val);
  };

  const groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).unshift(x);
      return rv;
    }, {});
  };

  const selectCurrency = (ccy) => {
    setChains(ccy.value);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (chains.length != 0) {
      setShowModal(true);
    }
  }, [chains]);

  return (
    <>
      <div class="modal-header">
        <div class="d-flex mt-4">
          <div
            class={
              tab === "crypto"
                ? "sub-menu-btn btn mr-2 px-4 sub-menu-btn-activate"
                : "sub-menu-btn btn mr-2 px-4"
            }
            onClick={() => changeTab("crypto")}
          >
            Crypto
          </div>
        </div>
      </div>
      <div class="modal-body">
        {/* <!--    <div class="sub-menu-btn mt-3">-->
<!--        History-->
<!--    </div>-->
<!--    <div class="mt-1 d-flex">-->
<!--        <div class="mr-2 currency-history-item">-->
<!--            BTC-->
<!--        </div>-->
<!--        <div class="mr-2 currency-history-item">-->
<!--            AGLD-->
<!--        </div>-->
<!--        <div class="mr-2 currency-history-item">-->
<!--            ADA-->
<!--        </div>-->
<!--        <div class="mr-2 currency-history-item">-->
<!--            ADB-->
<!--        </div>-->
<!--        <div class="mr-2 currency-history-item">-->
<!--            USDT-->
<!--        </div>-->
<!--    </div>-->
<!--    <div class="sub-menu-btn mt-3">-->
<!--        Hot-->
<!--    </div>-->
<!--    <div class="mt-1 d-flex">-->
<!--        <div class="mr-2 currency-history-item">-->
<!--            USDT-->
<!--        </div>-->
<!--        <div class="mr-2 currency-history-item">-->
<!--            BTC-->
<!--        </div>-->
<!--        <div class="mr-2 currency-history-item">-->
<!--            TRX-->
<!--        </div>-->
<!--        <div class="mr-2 currency-history-item">-->
<!--            SWEAT-->
<!--        </div>-->
<!--        <div class="mr-2 currency-history-item">-->
<!--            ENQ-->
<!--        </div>-->
<!--        <div class="mr-2 currency-history-item">-->
<!--            ETH-->
<!--        </div>-->
<!--    </div>--> */}
        {currencies && (
          <div class="currency-list d-flex flex-column mt-3">
            {currencies.map((ccy, index) => (
              <div
                class="currency-list-item"
                onClick={() => selectCurrency(ccy)}
              >
                <img src={ccy.value?.[0]?.logoLink} alt="" />
                <span>{ccy.key}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        scrollable
        modalDialogClass="network-modal-sm"
      >
        <SelectNetwork chains={chains} />
      </Modal>
    </>
  );
};

export default Deposit;
