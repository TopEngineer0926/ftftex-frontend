import "./index.scss";
import TradingViewTdChart from "components/SingleCoin/TradingViewTdChart";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ApiService from "services/apiService";

const WalletAccount = () => {
  const [showModal, setShowModal] = useState(false);

  const [Pairs, setPairs] = useState([]);
  const [walletTab, setWalletTab] = useState("assets");
  const [SelectedExchange, setSelectedExchange] = useState({
    id: 270,
    slug: "binance",
    name: "BINANCE",
  });
  const [SelectedPair, setSelectedPair] = useState({
    coin: "BTC",
    pair: "USDT",
  });
  const [SelectedPairFull, setSelectedPairFull] = useState({});
  const [Total, setTotal] = useState(0);
  const [Available1, setAvailable1] = useState(0);
  const Available2 = 0;
  const [showOrder, setShowOrder] = useState(false);
  const Coins = [
    {
      symbol: "BTC",
      img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1.png",
      holding: 0.0,
    },
    {
      symbol: "USDT",
      img: "https://s2.coinmarketcap.com/static/img/coins/64x64/825.png",
      holding: 100,
    },
    {
      symbol: "ETH",
      img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png",
      holding: 0.0,
    },
    {
      symbol: "BNB",
      img: "https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png",
      holding: 0.0,
    },
    {
      symbol: "XRP",
      img: "https://s2.coinmarketcap.com/static/img/coins/64x64/52.png",
      holding: 0.0,
    },
    {
      symbol: "ADA",
      img: "https://s2.coinmarketcap.com/static/img/coins/64x64/2010.png",
      holding: 0.0,
    },
  ];

  const [BUY, setBUY] = useState({
    price: 0,
    Amount: 0,
  });

  const ALLOWEDMARKETPAIRS = [
    "BTC/USDT",
    "BTC/USD",
    "XRP/USDT",
    "ETH/USDT",
    "ETH/USD",
    "BTC/USD",
    "BNB/USDT",
    "ADA/USDT",
    "SOL/USDT",
    "BTC/ETH",
  ];
  const [showChart, setShowChart] = useState(true);

  const numberWithCommas = (number) => {
    return number.toLocaleString();
  };

  useEffect(() => {
    loadMarket();
    loadTotal();
  }, []);

  const loadTotal = () => {
    let tmpTotal = 0;
    for (let dta of Coins) {
      tmpTotal += dta.holding;
    }
    setTotal(tmpTotal);
  };

  const loadMarket = (selectedExchange) => {
    ApiService.GetExchangePairs(
      selectedExchange.id,
      selectedExchange.slug,
      "spot",
      10
    ).then((res) => {
      let tmpPairs = JSON.parse(res.data.response["Result: "]).data
        .market_pairs;
      setPairs(tmpPairs);
      setSelectedPairFull(tmpPairs[0]);
      setSelectedPair({
        coin: tmpPairs[0].market_pair_base.currency_symbol,
        pair: tmpPairs[0].market_pair_quote.currency_symbol,
      });
      setBUY({
        ...BUY,
        price: tmpPairs[0].quote.USD.price,
      });
      countAvaialable();
    });
  };

  const SwitchWalletTab = (value) => {
    setWalletTab(value);
  };

  const open = (content) => {
    setShowModal(true);
  };

  const switchExchanges = (value) => {
    setSelectedExchange(value);
    setSelectedPair({ coin: "BTC", pair: "USDT" });
    loadMarket(value);
    setShowChart(false);
    setTimeout(() => {
      setShowChart(true);
    }, 10);
  };

  const changePairs = (dta) => {
    console.log(dta);
    setSelectedPairFull(dta);
    setSelectedPair({
      coin: dta.market_pair_base.currency_symbol,
      pair: dta.market_pair_quote.currency_symbol,
    });
    setBUY({
      ...BUY,
      price: dta.quote.USD.price,
    });
    setShowChart(false);
    setTimeout(() => {
      setShowChart(true);
    }, 10);

    console.log(dta);
    countAvaialable();
  };

  const countAvaialable = () => {
    const data = Coins.find((x) => x.symbol === SelectedPair.pair);
    setAvailable1(data.holding);
  };

  const BuyCoin = () => {
    setShowOrder(true);
    setTimeout(() => {
      setShowOrder(false);
      this.BUY.Amount = 0;
    }, 4000);
  };

  const handleChangeBUY = (e, name) => {
    setBUY({
      ...BUY,
      [name]: e.target.value,
    });
  };

  return (
    <>
      <div className="min-h-full">
        <div className="row">
          <div className="col-lg-2 pr-0">
            <div className="wt-box rounded-0 p-3">
              <h4 className="s-bld">Exchanges</h4>
              <hr />
              <div
                className={
                  SelectedExchange.id === 270
                    ? "p-2 d-flex a-button a-button-selected"
                    : "p-2 d-flex a-button"
                }
                onClick={() =>
                  switchExchanges({ id: 270, slug: "binance", name: "BINANCE" })
                }
              >
                <img
                  src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png"
                  className="align-self-center"
                  height={30}
                />
                <p className="mb-0 ml-3 align-self-center s-bld">Binance</p>
              </div>
              <div
                className={
                  SelectedExchange.id === 89
                    ? "p-2 d-flex a-button a-button-selected"
                    : "p-2 d-flex a-button"
                }
                onClick={() =>
                  switchExchanges({
                    id: 89,
                    slug: "coinbase-exchange",
                    name: "COINBASE",
                  })
                }
              >
                <img
                  src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/89.png"
                  height={30}
                />
                <p className="mb-0 ml-3 align-self-center s-bld">Coinbase</p>
              </div>
              {/* <!-- <div className="p-2 d-flex a-button" [ngClass]="{'a-button-selected' : SelectedExchange.id === 89}" onClick="switchExchanges({id: 24 , slug: 'coinbase-exchange' , name: 'KRAKEN'})">
          <img src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/24.png" height="30">
          <p className="mb-0 ml-3 align-self-center s-bld">Kraken</p>
        </div>--> */}
            </div>
            <div className="wt-box rounded-0 px-3 mt-2 pairs-sec">
              <h4 className="s-bld pt-3">Spot</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Pair</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {Pairs.map((dta, i) => (
                    <div key={i}>
                      {ALLOWEDMARKETPAIRS.includes(dta.market_pair) && (
                        <tr onClick={() => changePairs(dta)} className="cu-p">
                          <td className="font-weight-bold">
                            <div className="d-flex">
                              <img
                                className="align-self-center"
                                loading="lazy"
                                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${dta?.market_pair_base?.currency_id}.png`}
                                height={20}
                              />
                              <div className="align-self-center ml-2">
                                <p className="mb-0 s-bld">
                                  {" "}
                                  {dta?.market_pair}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="s-bld">
                            $ {numberWithCommas(dta?.quote?.USD?.price)}{" "}
                          </td>
                        </tr>
                      )}
                    </div>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-10 mb-5">
            <div className="row">
              <div className="col-lg-9 px-0">
                <div className="wt-box rounded-0">
                  {showChart === true && (
                    <TradingViewTdChart
                      COIN={SelectedPair.coin}
                      PAIR={SelectedPair.pair}
                      EXCHANGE={SelectedExchange.name}
                      chartType={"candle-chart"}
                    />
                  )}
                  <div className="row">
                    <div className="col-lg-5 offset-md-1">
                      <div className="m-3">
                        <p className="mt-4">
                          Available{" "}
                          <b>
                            {Available1} {SelectedPair.pair}
                          </b>
                        </p>
                        <input
                          className="form-control"
                          placeholder="Price"
                          value={BUY.price}
                          onChange={(e) => handleChangeBUY(e, "price")}
                          type="number"
                        />
                        <input
                          className="form-control mt-3"
                          placeholder="Amount"
                          value={BUY.Amount}
                          onChange={(e) => handleChangeBUY(e, "Amount")}
                          type="number"
                        />
                        <div className="form-control mt-3">
                          {BUY.price * BUY.Amount} {SelectedPair.pair}
                        </div>
                        <button
                          className="btn btn-primary mt-4 w-100 buy-btn s-bld"
                          onClick={BuyCoin}
                          disabled={
                            Available1 < BUY.price * BUY.Amount || !BUY.Amount
                          }
                        >
                          BUY {SelectedPair.coin}
                        </button>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="m-3">
                        <p className="mt-4">
                          Available <b>0 {SelectedPair.coin}</b>
                        </p>
                        <input
                          className="form-control"
                          placeholder="Price"
                          type="number"
                        />
                        <input
                          className="form-control mt-3"
                          placeholder="Amount"
                          type="number"
                        />
                        <div className="form-control mt-3"> </div>
                        <div className="btn btn-primary mt-4 w-100 sell-btn s-bld">
                          SELL {SelectedPair.pair}
                        </div>
                      </div>
                    </div>
                  </div>

                  {showOrder === true && (
                    <div className="row">
                      <div className="col-md-10 offset-md-1">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">Order</th>
                              <th scope="col">Price</th>
                              <th scope="col">Qty</th>
                              <th scope="col">Total</th>
                              <th scope="col" className="text-right">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="cu-p">
                              <td className="font-weight-bold">
                                <div className="d-flex">
                                  <img
                                    className="align-self-center"
                                    loading="lazy"
                                    src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${SelectedPairFull?.market_pair_base?.currency_id}.png`}
                                    height={20}
                                  />
                                  <div className="align-self-center ml-2">
                                    <p className="mb-0 s-bld">
                                      {" "}
                                      {
                                        SelectedPairFull?.market_pair_base
                                          .currency_symbol
                                      }
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="s-bld">
                                $ {numberWithCommas(BUY.price)}{" "}
                              </td>
                              <td className="s-bld">
                                {numberWithCommas(BUY.Amount)}{" "}
                              </td>
                              <td className="s-bld">
                                {numberWithCommas(BUY.price * BUY.Amount)}{" "}
                                {
                                  SelectedPairFull?.market_pair_base
                                    .currency_symbol
                                }{" "}
                              </td>
                              <td className="s-bld text-right">Completed </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* <!-- <div className="col-lg-2 px-0">
          <div className="wt-box rounded-0 p-3">
            <h4 className="s-bld">Orders</h4>
            <hr>
          </div>
        </div>--> */}
              <div className="col-lg-3 px-0">
                <div className="wt-box  rounded-0 p-3">
                  <div className="d-flex my-4 justify-content-center">
                    <h2 className="s-bld align-self-center mr-3">My Wallet </h2>
                    <span
                      className="material-symbols-outlined align-self-center cu-p"
                      style="font-size: 25px"
                    >
                      refresh
                    </span>
                  </div>

                  <div className="address-ar ">
                    <p className="mb-0 mx-4">0x000...0000 </p>
                    <span className="material-symbols-outlined">
                      content_copy
                    </span>
                  </div>
                  <hr />
                  <p className="mb-0 text-center">Estimated Balance </p>
                  <h3 className="s-bld text-center">
                    $ {numeral(Total).format("0.0-3")}
                  </h3>

                  <div className="d-flex w-100 justify-content-center mt-4">
                    <div className="mx-4">
                      <div className="btn btn-primary action-btn">
                        <span className="material-symbols-outlined">south</span>
                      </div>
                      <p className="text-center">Deposit</p>
                    </div>
                    <div className="mx-4">
                      <div className="btn btn-primary action-btn">
                        <span className="material-symbols-outlined">
                          north_east
                        </span>
                      </div>
                      <p className="text-center">Send</p>
                    </div>
                    <div className="mx-4">
                      <div className="btn btn-primary action-btn">
                        <span className="material-symbols-outlined">loop</span>
                      </div>
                      <p className="text-center">Swap</p>
                    </div>
                  </div>

                  <div className="d-flex w-100 mt-4">
                    <div
                      className={
                        walletTab === "assets"
                          ? "btn tab-btn flex-fill tab-btn-selected"
                          : "btn tab-btn flex-fill"
                      }
                      onClick={() => SwitchWalletTab("assets")}
                    >
                      Assets
                    </div>
                    <div
                      className={
                        walletTab === "activity"
                          ? "btn tab-btn tab-btn-selected flex-fill tab-btn-selected"
                          : "btn tab-btn tab-btn-selected flex-fill"
                      }
                      onClick={() => SwitchWalletTab("activity")}
                    >
                      Activity
                    </div>
                  </div>

                  {walletTab === "assets" && (
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">Coin</th>
                          <th scope="col" style="width: 100px"></th>
                          {/* <!-- <th scope="col" style="width: 100px"></th>--> */}
                        </tr>
                      </thead>
                      <tbody>
                        {Coins.map((dta, index) => (
                          <tr key={index}>
                            <td className="font-weight-bold">
                              <div className="d-flex">
                                <img
                                  className="align-self-center"
                                  loading="lazy"
                                  src={dta.img}
                                  height={35}
                                />
                                <div className="align-self-center ml-2">
                                  <p className="mb-0 s-bld">{dta.symbol}</p>
                                </div>
                              </div>
                            </td>
                            <td className="s-bld">
                              {dta.holding} = ${dta.holding}{" "}
                            </td>
                            {/* <td className="s-bld">
                          <button className="btn btn-primary w-100 buy-btn" onClick={open}>BUY</button>
                        </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  {walletTab === "activity" && (
                    <p className="my-5 text-center">No activities</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={showModal}
        onHide={setShowModal(false)}
        centered
        size="lg"
        ariaLabelledBy="modal-basic-title"
      >
        <div className="modal-body p-0 overflow-hidden">
          <div className="">
            <div className="row">
              <div className="col-lg-6 d-lg-block d-none bg-pattern overflow-hidden"></div>
              <div className="col-lg-6 ">
                <div className="p-4">
                  <h1 className="s-bld my-lg-5 my-4">Subscribe !</h1>
                  <h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </h5>
                  <h5 className="mt-3">
                    Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                  </h5>
                  <hr />
                  <div className="d-flex my-5">
                    <input
                      className="form-control rounded-0"
                      placeholder="Email"
                    />
                    <button className="btn btn-primary rounded-0">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default WalletAccount;
