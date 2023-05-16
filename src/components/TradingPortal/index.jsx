import TradingViewTdChart from "components/SingleCoin/TradingViewTdChart";
import numeral from "numeral";
import { useTranslation } from "react-i18next";
import { NavLink, useParams } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";
import { Modal } from "react-bootstrap";
import CoinSelect from "./CoinSelect";
import TradingDataService from "services/tradingDataService";
import ApiService from "services/apiService";
import { FTFTexContext } from "App";
import { getLoggedIn } from "utils";
import "./index.scss";

const TradingPortal = () => {
  const { t } = useTranslation();
  const bottomRef = useRef(null);
  const [Symbol, setSymbol] = useState("");
  const [SymbolOkx, setSymbolOkx] = useState("");
  const [SymbolSeperated, setSymbolSeperated] = useState("");
  const [AllPairs, setAllPairs] = useState([]);
  const [AllPairsPrice, setAllPairsPrice] = useState({});
  const [LatestTrade, setLatestTrade] = useState([]);
  const s_tableFilter = "";
  const [bidsAndAsks, setBidsAndAsks] = useState({
    bids: [],
    asks: [],
    lastUpdateId: 0,
  });
  const [BestBidsAndAsk, setBestBidsAndAsk] = useState({ A: 0, B: 0 });
  const [BestBidsAndAskUpdate, setBestBidsAndAskUpdate] = useState({
    A: 0,
    B: 0,
  });
  const [bidsTotal, setBidsTotal] = useState(0);
  const [askstotal, setAskstotal] = useState(0);
  const [upOrDown, setUpOrDown] = useState(0);
  const [BUY, setBUY] = useState({
    price: 0,
    Amount: 0,
  });

  const [SELL, setSELL] = useState({
    price: 0,
    Amount: 0,
  });
  const [history, setHistory] = useState([]);
  const [Pair, setPair] = useState({ Coin: "", Base: "" });
  const [currenttab, setCurrenttab] = useState("chart");
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const [buyBalance, setBuyBalance] = useState();
  const [sellBalance, setSellBalance] = useState();
  const [OrderBuy, setOrderBuy] = useState({
    lastPrice: 0,
    Amount: 0,
    Coin: "",
    type: "buy",
  });
  const [OrderSell, setOrderSell] = useState({
    lastPrice: 0,
    Amount: 0,
    Coin: "",
    type: "sell",
  });
  const [OrderType, setOrderType] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [succesMessage, setSuccesMessage] = useState("");
  const [errorMessageSell, setErrorMessageSell] = useState("");
  const [succesMessageSell, setSuccesMessageSell] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [Assets, setAssets] = useState({
    ordered: [],
    coins: {
      usdt: 0,
      eth: 0,
      bnb: 0,
      btc: 0,
      sol: 0,
      ada: 0,
      dot: 0,
      doge: 0,
      shib: 0,
      matic: 0,
      uni: 0,
      ltc: 0,
      trx: 0,
      xrp: 0,
    },
  });
  const [isMobile, setIsMobile] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);

  const param = useParams();

  const numberWithCommas = (number) => {
    return number.toLocaleString();
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    const isFromHistory = window.location.href.split("?")[1];
    if (isFromHistory) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const data = getLoggedIn();
    if (!data[0]) {
      navigate("/login");
    } else {
      setLogginIn(data);
    }
  }, []);

  const handleChangeSellAmount = (e) => {
    setErrorMessageSell("");
    setSuccesMessageSell("");
    setSELLAmount(e.target.value);
  };

  const setSELLAmount = (value) => {
    setSELL({
      ...SELL,
      Amount: value,
    });
  };

  const handleChangeBuyAmount = (e) => {
    setErrorMessage("");
    setSuccesMessage("");
    setBUYAmount(e.target.value);
  };

  const setBUYAmount = (value) => {
    setBUY({
      ...BUY,
      Amount: value,
    });
  };

  useEffect(() => {
    TradingDataService.getTradingPairs().then((res) => {
      setAllPairs(res.data.symbols);
    });
    TradingDataService.getPriceTicker().then((res) => {
      let tempAllPairsPrice = { ...AllPairsPrice };
      for (let dta of res.data) {
        tempAllPairsPrice[dta.symbol] = dta;
      }
      console.log("========", tempAllPairsPrice);
      setAllPairsPrice(tempAllPairsPrice);
    });

    let tmpPair = { ...Pair };
    if (param["symbol"]) {
      let tmpSymbolSeperated = param["symbol"].replace("_", "-");
      setSymbolSeperated(tmpSymbolSeperated);

      let tmpSymbol = param["symbol"].replace("_", "");
      setSymbol(tmpSymbol);

      let tmpSymbolOkx = param["symbol"].replace("_", "-");
      setSymbolOkx(tmpSymbolOkx);

      tmpPair = {
        Coin: param["symbol"].split("_")[0],
        Base: param["symbol"].split("_")[1],
      };
      setPair(tmpPair);

      TradingDataService.getMarketTradesOkx(tmpSymbolOkx)
        .then((res) => {
          console.log(res, "res getMarketTradesOkx");
        })
        .catch((err) => console.log(err, "errr "));
      TradingDataService.getMarketTrades(tmpSymbol).then((res) => {
        let tmpLatestTrade = res.data;
        setLatestTrade(tmpLatestTrade);
        getStaticBidsandAsks(tmpSymbolOkx, tmpSymbol);

        TradingDataService.getLivePrices(tmpSymbol.toLowerCase());
        TradingDataService.socket.onmessage((event) => {
          const { data } = event;
          const sData = JSON.parse(data);
          if (sData.stream === "!ticker@arr") {
            for (let dta of sData.data) {
              if (AllPairsPrice[dta.s]) {
                if (AllPairsPrice[dta.s].symbol === tmpSymbol) {
                  if (
                    Number(dta.c) === Number(AllPairsPrice[dta.s].lastPrice)
                  ) {
                    setUpOrDown(0);
                  } else {
                    if (
                      Number(dta.c) > Number(AllPairsPrice[dta.s].lastPrice)
                    ) {
                      setUpOrDown(1);
                    } else {
                      setUpOrDown(-1);
                    }
                  }
                }

                setAllPairsPrice({
                  ...AllPairsPrice,
                  [dta.s]: {
                    ...AllPairsPrice[dta.s],
                    lastPrice: dta.c,
                    priceChangePercent: Number(dta.P),
                  },
                });
              }
            }
          }
          if (sData.stream === tmpSymbol.toLowerCase() + "@bookTicker") {
            if (BestBidsAndAskUpdate.B < Number(sData.data.B)) {
              setBestBidsAndAsk({
                ...BestBidsAndAsk,
                B: sData.data.B,
              });
            }
            if (BestBidsAndAskUpdate.A < Number(sData.data.A)) {
              setBestBidsAndAsk({
                ...BestBidsAndAsk,
                A: sData.data.A,
              });
            }
          }

          if (sData.stream === tmpSymbol.toLowerCase() + "@depth@1000ms") {
            let tmpBidsAndAsks = bidsAndAsks;
            if (sData.data.u > tmpBidsAndAsks.lastUpdateId + 1) {
              if (sData.data.a.length > 0) {
                if (BestBidsAndAsk.B) {
                  setBestBidsAndAskUpdate({
                    ...BestBidsAndAskUpdate,
                    B: Number(BestBidsAndAsk.B),
                  });
                }
                if (BestBidsAndAsk.A) {
                  setBestBidsAndAskUpdate({
                    ...BestBidsAndAskUpdate,
                    A: Number(BestBidsAndAsk.A),
                  });
                }
                for (let i = 0; i < sData.data.a.length; i++) {
                  if (Number(sData.data.a[i][1]) > 0) {
                    tmpBidsAndAsks.asks.push(sData.data.a[i]);
                    tmpBidsAndAsks.asks.splice(0, 1);
                  } else {
                  }
                }
              }
              if (sData.data.b.length > 0) {
                for (let i = 0; i < sData.data.b.length; i++) {
                  if (Number(sData.data.b[i][1]) > 0) {
                    tmpBidsAndAsks.bids.push(sData.data.b[i]);
                    tmpBidsAndAsks.bids.splice(0, 1);
                  } else {
                  }
                }
              }
            }
            setBidsAndAsks(tmpBidsAndAsks);
          }
          if (sData.stream === tmpSymbol.toLowerCase() + "@trade") {
            tmpLatestTrade.splice(0, 1);
            tmpLatestTrade.push({
              price: sData.data.p,
              qty: sData.data.q,
              time: sData.data.T,
            });
            setLatestTrade(tmpLatestTrade);
          }
        });
      });
    }
  }, [param]);

  useEffect(() => {
    if (LogginIn[5] && Pair.Coin) {
      getTradeAvailableBalance(Pair);
      getTradeHistory();
    }
  }, [LogginIn, Pair]);

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  useEffect(() => {
    setAssets(ftftexValue.Assets);
  }, [ftftexValue.Assets]);

  const navigate = (baseAsset, quoteAsset) => {
    window.location.href = "trade/" + baseAsset + "_" + quoteAsset;
  };

  const getTradeAvailableBalance = (ccy) => {
    const params = {
      ccy: `${ccy.Coin},${ccy.Base}`,
      subAcct: LogginIn[5],
    };
    console.log(Pair, "");
    ApiService.getTradeAvailableBalance(params).then((res) => {
      let d = res.data;
      const result = JSON.parse(d["Account avaibale balance"]).data[0];
      console.log(result, "result");
      if (result.details?.length) {
        console.log(result, "result");
        result.details.forEach((bal) => {
          console.log(bal.ccy === Pair.Base, "bal.ccy === Pair.Base");
          if (bal.ccy === Pair.Coin) {
            setSellBalance(bal.availBal);
          }
          if (bal.ccy === Pair.Base) {
            setBuyBalance(bal.availBal);
          }
        });
      }
      console.log(result, "res getTradeAvailableBalance");
    });
  };

  const getTradeHistory = () => {
    const params = {
      instType: "SPOT",
      subAcct: LogginIn[5],
    };
    ApiService.getOrderHistory(params).then((res) => {
      let d = res.data;
      if (JSON.parse(d["Order history last 7 dayes"])?.data) {
        let tmphistory = JSON.parse(d["Order history last 7 dayes"]).data;
        setHistory(tmphistory);
      }
    });
  };

  const getStaticBidsandAsks = (SymbolOkx, Symbol) => {
    TradingDataService.getBidsandAsksOkx(SymbolOkx, 16)
      .then((res) => {
        console.log(res.data, "res");
      })
      .catch((err) => console.log(err, "err"));

    TradingDataService.getBidsandAsks(Symbol, 16).then((res) => {
      setBidsAndAsks(res.data);
      let tmpBidsTotal = 0;
      let tmpAskstotal = 0;
      for (let dta of res.data.bids) {
        tmpBidsTotal += Number(dta[1]);
      }
      for (let dta of res.data.asks) {
        tmpAskstotal += Number(dta[1]);
      }

      setBidsTotal(tmpBidsTotal);
      setAskstotal(tmpAskstotal);
    });
  };

  const doBuy = (lastPrice, Amount, Coin) => {
    setOrderBuy({
      lastPrice: lastPrice,
      Amount: Amount,
      Coin: Coin,
      type: "buy",
    });
    setOrderType("buy");
    setShowConfirmationModal(true);
  };

  const doSell = (lastPrice, Amount, Coin) => {
    setOrderSell({
      lastPrice: lastPrice,
      Amount: Amount,
      Coin: Coin,
      type: "sell",
    });
    setOrderType("sell");
    setShowConfirmationModal(true);
  };

  const toFixed = (x) => {
    if (Math.abs(x) < 1.0) {
      let e = parseInt(x.toString().split("e-")[1]);
      if (e) {
        x *= Math.pow(10, e - 1);
        x = "0." + new Array(e).join("0") + x.toString().substring(2);
      }
    } else {
      let e = parseInt(x.toString().split("+")[1]);
      if (e > 20) {
        e -= 20;
        x /= Math.pow(10, e);
        x += new Array(e + 1).join("0");
      }
    }
    return x;
  };

  const performOrder = () => {
    console.log(OrderType, "OrderType");
    setShowConfirmationModal(false);
    if (OrderType === "buy") {
      let tmpAssets = { ...Assets };
      tmpAssets = {
        ...tmpAssets,
        coins: {
          ...tmpAssets.coins,
          [OrderBuy.Coin.toLowerCase()]:
            tmpAssets.coins[OrderBuy.Coin.toLowerCase()] +
            OrderBuy.Amount / OrderBuy.lastPrice,
          usdt: tmpAssets.coins.usdt - OrderBuy.Amount,
        },
      };
      ApiService.ChangeAssets(tmpAssets);
      setFtftexValue({
        ...ftftexValue,
        Assets: tmpAssets,
      });

      // const modalRef = this.modalService.open(OrderStatusPopComponent , {centered: true});
      const params = {
        instId: SymbolSeperated,
        tdMode: "cash",
        clOrdId: `b${(Math.random() * 100).toFixed()}`,
        side: "buy",
        ordType: "market",
        // "px":lastPrice,
        sz: toFixed(BUY.Amount),
        subAcct: LogginIn[5],
      };
      ApiService.createTradeOrder(params).then((res) => {
        let d = res.data;
        const result = JSON.parse(d["KYC Api resuult"]);
        if (
          result.data.length &&
          result.data[0].sMsg &&
          !result.data[0].ordId
        ) {
          setErrorMessage(result.data[0].sMsg);
          getTradeHistory();
        } else {
          getTradeAvailableBalance(Pair);
          setSuccesMessage(result.data[0].sMsg);
        }
        console.log(result, "result");
      });
      resetFields();
    }

    if (OrderType === "sell") {
      console.log(SELL.Amount, "SELL.Amount");
      let tmpAssets = { ...Assets };
      tmpAssets = {
        ...tmpAssets,
        coins: {
          ...tmpAssets.coins,
          [OrderSell.Coin.toLowerCase()]:
            tmpAssets.coins[OrderSell.Coin.toLowerCase()] - OrderSell.Amount,
          usdt: tmpAssets.coins.usdt + OrderSell.Amount * OrderSell.lastPrice,
        },
      };
      ApiService.ChangeAssets(tmpAssets);
      setFtftexValue({
        ...ftftexValue,
        Assets: tmpAssets,
      });

      // const modalRef = this.modalService.open(OrderStatusPopComponent , {centered: true});
      const params = {
        instId: SymbolSeperated,
        tdMode: "cash",
        clOrdId: `b${(Math.random() * 100).toFixed()}`,
        side: "sell",
        ordType: "market",
        sz: toFixed(SELL.Amount),
        subAcct: LogginIn[5],
      };
      ApiService.createTradeOrder(params).then((res) => {
        let d = res.data;
        const result = JSON.parse(d["KYC Api resuult"]);
        if (
          result.data.length &&
          result.data[0].sMsg &&
          !result.data[0].ordId
        ) {
          setErrorMessageSell(result.data[0].sMsg);
          getTradeHistory();
        } else {
          setSuccesMessageSell(result.data[0].sMsg);
          getTradeAvailableBalance(Pair);
        }
        console.log(result, "result");
      });
      resetFields();
    }
  };

  const resetFields = () => {
    setBUY({
      price: 0,
      Amount: 0,
    });

    setSELL({
      price: 0,
      Amount: 0,
    });

    setOrderBuy({
      lastPrice: 0,
      Amount: 0,
      Coin: "",
      type: "buy",
    });

    setOrderSell({
      lastPrice: 0,
      Amount: 0,
      Coin: "",
      type: "sell",
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const SwitchSymbol = () => {
    setShowModal(true);
    resetFields();
  };

  return (
    <>
      {isMobile === false && (
        <div className="container-fluid mb-5 d-none d-lg-block port-page">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex mt-3 mb-3">
                <h3 className="mb-0 align-self-center s-bld mt-0">
                  {SymbolSeperated}
                </h3>
                <div className="mx-4 align-self-center">
                  <h5
                    className={
                      upOrDown === 1
                        ? " mb-0 font-weight-bold green-text"
                        : upOrDown === -1
                        ? " mb-0 font-weight-bold red-text"
                        : "mb-0 font-weight-bold"
                    }
                  >
                    {AllPairsPrice[Symbol]?.lastPrice}
                  </h5>
                </div>
                <div className="mx-4 align-self-center ticker-detail">
                  <p className="mb-0 ti-head">24h Change</p>
                  <p className=" mb-0 ti-cont">
                    {AllPairsPrice[Symbol]?.priceChangePercent}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col pr-0">
              <div className="card ">
                <div className="card-ask-and-bit">
                  <table className="table">
                    <thead>
                      <tr className="fixed-header">
                        <th scope="col">Price</th>
                        <th scope="col" className="text-right">
                          Qty
                        </th>
                        <th scope="col" className="text-right">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bidsAndAsks?.asks.map((dta, i) => (
                        <tr
                          key={i}
                          className="bidder-r"
                          style={{
                            backgroundSize:
                              (dta[1] / BestBidsAndAskUpdate.B) * 100 +
                              "%" +
                              " 100%",
                          }}
                        >
                          <td className="red-text">
                            {numeral(dta[0]).format("0,0.0-8")}
                          </td>
                          <td className="text-right">
                            {numeral(dta[1]).format("0,0.0-8")}
                          </td>
                          <td className="text-right">
                            {numeral(dta[0] * dta[1]).format("0,0.0-8")}
                          </td>
                        </tr>
                      ))}
                      {/* <ng-container *ngFor="let dta of bidsAndAsks?.asks | orderBy: 0: true; let i = index">

            </ng-container> */}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="card d-flex justify-content-between">
                <h5
                  className={
                    upOrDown === 1
                      ? "mb-0 s-bld mt-2 mb-2 w-auto green-text"
                      : upOrDown === -1
                      ? "mb-0 s-bld mt-2 mb-2 w-auto red-text"
                      : "mb-0 s-bld mt-2 mb-2 w-auto"
                  }
                >
                  {numeral(AllPairsPrice[Symbol]?.lastPrice).format("0,0.0-8")}
                  {upOrDown === 1 && (
                    <span className="m-r-arr material-symbols-outlined">
                      north
                    </span>
                  )}
                  {upOrDown === -1 && (
                    <span className="m-r-arr material-symbols-outlined">
                      south
                    </span>
                  )}
                </h5>
              </div>
              <div className="card">
                <div className="card-ask-and-bit">
                  <table className="table">
                    <thead>
                      <tr className="fixed-header">
                        <th scope="col">Price</th>
                        <th className="text-right" scope="col">
                          Qty
                        </th>
                        <th className="text-right" scope="col">
                          Total{" "}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bidsAndAsks?.bids.map((dta, i) => (
                        <tr
                          key={i}
                          className="bidder-g"
                          style={{
                            backgroundSize:
                              (dta[1] / BestBidsAndAskUpdate.B) * 100 +
                              "%" +
                              " 100%",
                          }}
                        >
                          <td className="green-text">
                            {numeral(dta[0]).format("0.0-8")}
                          </td>
                          <td className="text-right">
                            {numeral(dta[1]).format("0.0-8")}
                          </td>
                          <td className="text-right">
                            {numeral(dta[0] * dta[1]).format("0.0-8")}
                          </td>
                        </tr>
                      ))}
                      {/* <ng-container *ngFor="let dta of bidsAndAsks?.bids | orderBy: 0: true; let i = index">

            </ng-container> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-lg-7 px-0">
              <div className="card p-0">
                <TradingViewTdChart
                  COIN={Pair.Coin}
                  chartType={"candle-chart"}
                  EXCHANGE={"OKX"}
                  PAIR={Pair.Base}
                />
                <div className="row">
                  <div className="col-lg-12">
                    <h5 className="s-bld px-3 pt-3">SPOT</h5>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-lg-6">
                    <div className="px-3">
                      <p className="mt-2" style={{ fontSize: 14 }}>
                        Avl. {buyBalance || 0} <b>{Pair.Base}</b>
                      </p>
                      <input
                        className="form-control"
                        placeholder="Market Price"
                        disabled
                        type="number"
                      />
                      <input
                        className="form-control mt-3"
                        placeholder={`Amount ${Pair.Base}`}
                        value={BUY.Amount}
                        onChange={handleChangeBuyAmount}
                        type="number"
                      />
                      <div className="d-flex p-select-cont">
                        <div
                          className="p-select"
                          onClick={() =>
                            setBUYAmount(
                              Assets.coins[Pair.Base.toLowerCase()] * 0.25
                            )
                          }
                        >
                          25%
                        </div>
                        <div
                          className="p-select"
                          onClick={() =>
                            setBUYAmount(
                              Assets.coins[Pair.Base.toLowerCase()] * 0.5
                            )
                          }
                        >
                          50%
                        </div>
                        <div
                          className="p-select"
                          onClick={() =>
                            setBUYAmount(
                              Assets.coins[Pair.Base.toLowerCase()] * 0.75
                            )
                          }
                        >
                          75%
                        </div>
                        <div
                          className="p-select"
                          onClick={() =>
                            setBUYAmount(Assets.coins[Pair.Base.toLowerCase()])
                          }
                        >
                          100%
                        </div>
                      </div>
                      <div className="form-control mt-3">
                        {numeral(
                          BUY.Amount / AllPairsPrice[Symbol]?.lastPrice
                        ).format("0,0.4-8")}{" "}
                        {Pair.Coin}
                      </div>
                      <p className="mt-4 text-center error-msg">
                        {errorMessage}
                      </p>
                      <p className="mt-4 text-center green-text">
                        {succesMessage}
                      </p>
                      {LogginIn[1] && (
                        <button
                          className="btn btn-primary mt-4 w-100 buy-btn s-bld"
                          onClick={() =>
                            doBuy(
                              AllPairsPrice[Symbol]?.lastPrice,
                              BUY.Amount,
                              Pair.Coin
                            )
                          }
                        >
                          BUY {Pair.Coin}
                        </button>
                      )}
                      {!LogginIn[1] && (
                        <NavLink
                          className="btn btn-primary mt-4 w-100 buy-btn s-bld"
                          to={"/login"}
                        >
                          {t("LOGIN")}
                        </NavLink>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="px-3">
                      <p className="mt-2" style={{ fontSize: 14 }}>
                        Avl.{" "}
                        <b>
                          {sellBalance || 0} {Pair.Coin}
                        </b>
                      </p>
                      <input
                        className="form-control"
                        placeholder="Market Price"
                        disabled
                        type="number"
                      />
                      <input
                        className="form-control mt-3"
                        value={SELL.Amount}
                        onChange={handleChangeSellAmount}
                        placeholder={`Amount ${Pair.Coin}`}
                        type="number"
                      />
                      <div className="d-flex p-select-cont">
                        <div
                          className="p-select"
                          onClick={() =>
                            setSELLAmount(
                              Assets.coins[Pair.Coin.toLowerCase()] * 0.25
                            )
                          }
                        >
                          25%
                        </div>
                        <div
                          className="p-select"
                          onClick={() =>
                            setSELLAmount(
                              Assets.coins[Pair.Coin.toLowerCase()] * 0.5
                            )
                          }
                        >
                          50%
                        </div>
                        <div
                          className="p-select"
                          onClick={() =>
                            setSELLAmount(
                              Assets.coins[Pair.Coin.toLowerCase()] * 0.75
                            )
                          }
                        >
                          75%
                        </div>
                        <div
                          className="p-select"
                          onClick={() =>
                            setSELLAmount(Assets.coins[Pair.Coin.toLowerCase()])
                          }
                        >
                          100%
                        </div>
                      </div>
                      <div className="form-control mt-3">
                        {numeral(
                          SELL.Amount * AllPairsPrice[Symbol]?.lastPrice
                        ).format("0,0.4-8")}{" "}
                        {Pair.Base}{" "}
                      </div>
                      <p className="mt-4 text-center error-msg">
                        {errorMessageSell}
                      </p>
                      <p className="mt-4 text-center green-text">
                        {succesMessageSell}
                      </p>
                      {LogginIn[1] && (
                        <button
                          className="btn btn-primary mt-4 w-100 sell-btn s-bld"
                          onClick={() =>
                            doSell(
                              AllPairsPrice[Symbol]?.lastPrice,
                              SELL.Amount,
                              Pair.Coin
                            )
                          }
                        >
                          SELL {Pair.Base}
                        </button>
                      )}
                      {!LogginIn[1] && (
                        <NavLink
                          className="btn btn-primary mt-4 w-100 sell-btn s-bld"
                          to={"/login"}
                        >
                          {t("LOGIN")}
                        </NavLink>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col pl-0 d-lg-block d-none">
              <div className="card">
                <div className="card-pair">
                  <table className="table">
                    <thead>
                      <tr className="fixed-header">
                        <th scope="col">Pairs</th>
                        <th scope="col">Price</th>
                        <th scope="col">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {AllPairs.map(
                        (dta, i) =>
                          dta.quoteAsset.includes(s_tableFilter) &&
                          AllPairsPrice[dta.symbol]?.lastPrice > 0 && (
                            <tr
                              key={i}
                              onClick={() =>
                                navigate(dta.baseAsset, dta.quoteAsset)
                              }
                            >
                              <td className="fw-bold">
                                {dta.baseAsset}/{dta.quoteAsset}
                              </td>
                              <td className="">
                                {numeral(
                                  AllPairsPrice[dta.symbol]?.lastPrice
                                ).format("0,0.0-16")}
                              </td>
                              <td className="">
                                {numeral(
                                  AllPairsPrice[dta.symbol]?.priceChangePercent
                                ).format("0,0.00")}
                                %
                              </td>
                            </tr>
                          )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="card">
                <p className="mb-0 card-title">Market Trade</p>
                <div className="card-pair">
                  <table className="table">
                    <thead>
                      <tr className="fixed-header">
                        <th scope="col">Price</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LatestTrade.map((dta, index) => (
                        <tr key={index}>
                          <td
                            className={
                              dta.price < AllPairsPrice[Symbol]?.lastPrice
                                ? " green-text red-text"
                                : "green-text"
                            }
                          >
                            {numeral(dta.price).format("0,0.0-8")}
                          </td>
                          <td className="">{dta.qty}</td>
                          <td className="">
                            {moment(dta.time).format("hh:mm:ss")}
                          </td>
                        </tr>
                      ))}
                      {/* <ng-container *ngFor="let dta of LatestTrade | orderBy: 'time' : true">

            </ng-container> */}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isMobile && (
        <div className="card" ref={bottomRef}>
          <p className="mb-0 card-title">Trade History</p>
          <div className="card-pair">
            <table className="table">
              <thead>
                <tr className="fixed-header">
                  <th scope="col">Symbol</th>
                  <th scope="col">Time</th>
                  <th scope="col">Order Type</th>
                  <th scope="col">Side</th>
                  <th scope="col">Price</th>
                  <th scope="col">Avg Price</th>
                  <th scope="col">Amount</th>
                  <th scope="col">State</th>
                </tr>
              </thead>
              <tbody>
                {history.map((order, index) => (
                  <tr className="bidder-r" key={index}>
                    <td>{order.instId}</td>
                    <td>{moment(order.uTime).format("dd/MM/yyyy HH:MM")}</td>
                    <td>{order.ordType}</td>
                    <td
                      style={{
                        color: order.side === "sell" ? "#f23645" : "#089981",
                      }}
                    >
                      {order.side}
                    </td>
                    <td>{order.sz}</td>
                    <td>{order.avgPx}</td>
                    <td>{order.sz}</td>
                    <td>{order.state}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {isMobile === true && (
        <div className="container-fluid mb-5 port-page">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex mt-3 mb-1">
                <h5
                  className="mb-0 align-self-center s-bld"
                  onClick={SwitchSymbol}
                >
                  {SymbolSeperated}{" "}
                  <span className="m-r-arr material-symbols-outlined">
                    arrow_drop_down
                  </span>
                </h5>
                <div className="ml-auto align-self-center">
                  <h5
                    className={
                      upOrDown === 1
                        ? " mb-0 font-weight-bold green-text"
                        : upOrDown === -1
                        ? " mb-0 font-weight-bold red-text"
                        : " mb-0 font-weight-bold"
                    }
                  >
                    {AllPairsPrice[Symbol]?.lastPrice}
                    {upOrDown === 1 && (
                      <span className="m-r-arr material-symbols-outlined">
                        north
                      </span>
                    )}
                    {upOrDown === -1 && (
                      <span className="m-r-arr material-symbols-outlined">
                        south
                      </span>
                    )}
                  </h5>
                </div>
              </div>
              <div className="d-flex w-100 ticker-detail justify-content-between">
                <p className=" mb-0 ti-cont s-bld">• OKX</p>
                <p className=" mb-0 ti-cont s-bld">
                  {numeral(AllPairsPrice[Symbol]?.priceChangePercent).format(
                    "0.3-3"
                  )}
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="d-flex mt-2 switch-btns mb-3">
                <button
                  className={
                    currenttab === "chart"
                      ? "btn btn-sm mr-2 btn-s"
                      : "btn btn-sm mr-2"
                  }
                  onClick={() => setCurrenttab("chart")}
                >
                  {t("Chart")}
                </button>
                <button
                  className={
                    currenttab === "orders"
                      ? "btn btn-sm mr-2 btn-s"
                      : "btn btn-sm mr-2"
                  }
                  onClick={() => setCurrenttab("orders")}
                >
                  {t("Order book")}
                </button>
                <button
                  className={
                    currenttab === "trades"
                      ? "btn btn-sm mr-2 btn-s"
                      : "btn btn-sm mr-2"
                  }
                  onClick={() => setCurrenttab("trades")}
                >
                  {t("All Trades")}
                </button>
                <button
                  className={
                    currenttab === "my_orders"
                      ? "btn btn-sm mr-2 btn-s"
                      : "btn btn-sm mr-2"
                  }
                  onClick={() => setCurrenttab("my_orders")}
                >
                  {t("My Orders")}
                </button>
              </div>
            </div>
          </div>
          <div className="row">
            {currenttab === "orders" && (
              <div className="col px-1">
                <div className="card ">
                  <div className="card-ask-and-bit">
                    <div className="row px-2">
                      <div className="col px-0">
                        <table className="table">
                          <thead>
                            <tr className="fixed-header">
                              <th scope="col">Bids</th>
                              <th scope="col" className="text-right">
                                Qty
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {bidsAndAsks?.asks.map((dta, i) => (
                              <tr
                                key={i}
                                className="bidder-r"
                                style={{
                                  backgroundSize:
                                    (dta[1] / BestBidsAndAskUpdate.B) * 100 +
                                    "%" +
                                    " 100%",
                                }}
                              >
                                <td className="red-text">
                                  {numeral(dta[0]).format("0,0.0-8")}
                                </td>
                                <td className="text-right">
                                  {numeral(dta[1]).format("0,0.0-8")}
                                </td>
                              </tr>
                            ))}
                            {/* <ng-container *ngFor="let dta of bidsAndAsks?.asks | orderBy: 0: true; let i = index">

                      </ng-container> */}
                          </tbody>
                        </table>
                      </div>
                      <div className="col px-0">
                        <table className="table">
                          <thead>
                            <tr className="fixed-header">
                              <th scope="col">Asks</th>
                              <th className="text-right" scope="col">
                                Qty
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {bidsAndAsks?.bids.map((dta, i) => (
                              <tr
                                key={i}
                                className="bidder-g"
                                style={{
                                  backgroundSize:
                                    (dta[1] / BestBidsAndAskUpdate.B) * 100 +
                                    "%" +
                                    " 100%",
                                }}
                              >
                                <td className="green-text">
                                  {numeral(dta[0]).format("0,0.0-8")}
                                </td>
                                <td className="text-right">
                                  {numeral(dta[1]).format("0,0.0-8")}
                                </td>
                              </tr>
                            ))}
                            {/* <ng-container *ngFor="let dta of bidsAndAsks?.bids | orderBy: 0: true; let i = index">

                      </ng-container> */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="col-lg-7 px-0">
              <div className="card p-0">
                {currenttab === "chart" && (
                  <TradingViewTdChart
                    COIN={Pair.Coin}
                    chartType={"candle-chart"}
                    EXCHANGE={"OKX"}
                    PAIR={Pair.Base}
                  />
                )}
                {(currenttab === "chart" || currenttab === "orders") && (
                  <div className="row mb-4 mx-1">
                    <div className="col-12 px-1">
                      <h5 className="s-bld pt-3">SPOT</h5>
                    </div>
                    <div className="col px-1">
                      <div className="mx-0">
                        <p className="mt-2" style={{ fontSize: 14 }}>
                          Avl.{" "}
                          <b>
                            {buyBalance || 0} {Pair.Base}
                          </b>
                        </p>
                        <input
                          className="form-control"
                          placeholder="Market Price"
                          disabled
                          type="number"
                        />
                        <input
                          className="form-control mt-3"
                          placeholder={`Amount ${Pair.Base}`}
                          value={BUY.Amount}
                          type="number"
                          onChange={handleChangeBuyAmount}
                        />
                        <div className="d-flex p-select-cont">
                          <div
                            className="p-select"
                            onClick={() =>
                              setBUYAmount(
                                Assets.coins[Pair.Base.toLowerCase()] * 0.25
                              )
                            }
                          >
                            25%
                          </div>
                          <div
                            className="p-select"
                            onClick={() =>
                              setBUYAmount(
                                Assets.coins[Pair.Base.toLowerCase()] * 0.5
                              )
                            }
                          >
                            50%
                          </div>
                          <div
                            className="p-select"
                            onClick={() =>
                              setBUYAmount(
                                Assets.coins[Pair.Base.toLowerCase()] * 0.75
                              )
                            }
                          >
                            75%
                          </div>
                          <div
                            className="p-select"
                            onClick={() =>
                              setBUYAmount(
                                Assets.coins[Pair.Base.toLowerCase()]
                              )
                            }
                          >
                            100%
                          </div>
                        </div>
                        <div className="form-control mt-3">
                          {numeral(
                            BUY.Amount / AllPairsPrice[Symbol]?.lastPrice
                          ).format("0,0.4-8")}{" "}
                          {Pair.Coin}
                        </div>
                        {LogginIn[1] && (
                          <button
                            className="btn btn-primary mt-4 w-100 buy-btn s-bld"
                            onClick={() =>
                              doBuy(
                                AllPairsPrice[Symbol]?.lastPrice,
                                BUY.Amount,
                                Pair.Coin
                              )
                            }
                          >
                            BUY {Pair.Coin}
                          </button>
                        )}
                        {!LogginIn[1] && (
                          <NavLink
                            className="btn btn-primary mt-4 w-100 buy-btn s-bld"
                            to={"/login"}
                          >
                            {t("LOGIN")}
                          </NavLink>
                        )}
                      </div>
                    </div>
                    <div className="col px-1">
                      <div className="mx-0">
                        <p className="mt-2" style={{ fontSize: 14 }}>
                          Avl.{" "}
                          <b>
                            {sellBalance || 0} {Pair.Coin}
                          </b>
                        </p>
                        <input
                          className="form-control"
                          placeholder="Market Price"
                          disabled
                          type="number"
                        />
                        <input
                          className="form-control mt-3"
                          value={SELL.Amount}
                          placeholder={`Amount ${Pair.Coin}`}
                          type="number"
                          onChange={handleChangeSellAmount}
                        />
                        <div className="d-flex p-select-cont">
                          <div
                            className="p-select"
                            onClick={() =>
                              setSELLAmount(
                                Assets.coins[Pair.Coin.toLowerCase()] * 0.25
                              )
                            }
                          >
                            25%
                          </div>
                          <div
                            className="p-select"
                            onClick={() =>
                              setSELLAmount(
                                Assets.coins[Pair.Coin.toLowerCase()] * 0.5
                              )
                            }
                          >
                            50%
                          </div>
                          <div
                            className="p-select"
                            onClick={() =>
                              setSELLAmount(
                                Assets.coins[Pair.Coin.toLowerCase()] * 0.75
                              )
                            }
                          >
                            75%
                          </div>
                          <div
                            className="p-select"
                            onClick={() =>
                              setSELLAmount(
                                Assets.coins[Pair.Coin.toLowerCase()]
                              )
                            }
                          >
                            100%
                          </div>
                        </div>
                        <div className="form-control mt-3">
                          {numeral(
                            SELL.Amount * AllPairsPrice[Symbol]?.lastPrice
                          ).format("0,0.4-8")}{" "}
                          {Pair.Base}{" "}
                        </div>
                        <p className="mt-4 text-center error-msg">
                          {errorMessageSell}
                        </p>
                        {LogginIn[1] && (
                          <button
                            className="btn btn-primary mt-4 w-100 sell-btn s-bld"
                            onClick={() =>
                              doSell(
                                AllPairsPrice[Symbol]?.lastPrice,
                                SELL.Amount,
                                Pair.Coin
                              )
                            }
                          >
                            SELL {Pair.Base}
                          </button>
                        )}
                        {!LogginIn[1] && (
                          <NavLink
                            className="btn btn-primary mt-4 w-100 sell-btn s-bld"
                            to={"/login"}
                          >
                            {t("LOGIN")}
                          </NavLink>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {currenttab === "trades" && (
              <div className="col px-0">
                <div
                  className="card"
                  style={{ maxHeight: "68vh", overflow: "hidden" }}
                >
                  <div className="card-pair">
                    <table className="table">
                      <thead>
                        <tr className="fixed-header">
                          <th scope="col">Price</th>
                          <th scope="col">Amount</th>
                          <th scope="col" className="text-right">
                            Time
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {LatestTrade.map((dta, index) => (
                          <tr key={index}>
                            <td
                              className={
                                dta.price < AllPairsPrice[Symbol]?.lastPrice
                                  ? " green-text red-text"
                                  : "green-text"
                              }
                            >
                              {numeral(dta.price).format("0,0.0-8")}
                            </td>
                            <td className="">{dta.qty}</td>
                            <td className="text-right">
                              {moment(dta.time).format("hh:mm:ss")}
                            </td>
                          </tr>
                        ))}
                        {/* <ng-container *ngFor="let dta of LatestTrade | orderBy: 'time' : true">

                  </ng-container> */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {currenttab === "my_orders" && (
              <div className="col px-0">
                <div className="vw-100 overflow-auto">
                  <table className="table">
                    <thead>
                      <tr className="fixed-header">
                        <th scope="col">Symbol</th>
                        <th scope="col">Time</th>
                        <th scope="col">Order Type</th>
                        <th scope="col">Side</th>
                        <th scope="col">Price</th>
                        <th scope="col">Avg Price</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.map((order, index) => (
                        <tr className="bidder-r" key={index}>
                          <td>{order.instId}</td>
                          <td>
                            {moment(order.uTime).format("dd/MM/yyyy HH:MM")}
                          </td>
                          <td>{order.ordType}</td>
                          <td
                            style={{
                              color:
                                order.side === "sell" ? "#f23645" : "#089981",
                            }}
                          >
                            {order.side}
                          </td>
                          <td>{order.sz}</td>
                          <td>{order.avgPx}</td>
                          <td>{order.sz}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <Modal
        show={showConfirmationModal}
        onHide={handleCloseConfirmationModal}
        centered
      >
        <div className="modal-body">
          <span
            className="m-r-arr material-symbols-outlined mx-auto d-block mt-5  text-center"
            style={{ fontSize: 70, color: "#0563e5" }}
          >
            info
          </span>
          <h4 className="mt-4 mb-5 s-bld text-center">
            Are you sure you want to proceed this transaction ?
          </h4>
          <hr />
          <button
            className="btn btn-primary px-4 mx-auto d-block btn-bg"
            onClick={performOrder}
          >
            Confirm
          </button>
        </div>
      </Modal>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <CoinSelect
          AllPairs={AllPairs}
          AllPairsPrice={AllPairsPrice}
          onClose={handleCloseModal}
        />
      </Modal>
      {/* <ng-template #confirmation let-modal>

</ng-template> */}
    </>
  );
};

export default TradingPortal;
