import "./index.scss";
import { NavLink, useNavigate } from "react-router-dom";
const SelectExchangePop = ({ data, onClose }) => {
  const navigate = useNavigate();

  const myNavigate = () => {
    if (data.coin !== "USDT") {
      onClose();
      navigate(`/trade/${data?.coin}_USDT`);
    } else {
      onClose();
      navigate(`/trade/BTC_USDT`);
    }
  };

  return (
    <>
      <div className="modal-body">
        <h5 className="s-bld text-center">Aggregate Trading Options </h5>
        <hr />
      </div>
      <NavLink
        className="select-box"
        onClick={myNavigate}
        to={"/trade/" + data?.coin + "_USDT"}
      >
        <img
          className="align-self-center"
          src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/294.png"
          height={30}
        />
        <h6 className="mb-0 align-self-center ml-2 s-bld"> OKX</h6>
      </NavLink>
      <div className="select-box disabled">
        <img
          className="align-self-center"
          src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/270.png"
          height={30}
        />
        <h6 className="mb-0 align-self-center ml-2 s-bld">Binance</h6>
        <p className="mb-0 align-self-center ml-auto" style={{ fontSize: 12 }}>
          Coming soon
        </p>
      </div>
      <div className="select-box disabled">
        <img
          className="align-self-center"
          src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/102.png"
          height={30}
        />
        <h6 className="mb-0 align-self-center ml-2 s-bld"> Huobi Global</h6>
        <p className="mb-0 align-self-center ml-auto" style={{ fontSize: 12 }}>
          Coming soon
        </p>
      </div>
      <div className="select-box disabled">
        <img
          className="align-self-center"
          src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/525.png"
          height={30}
        />
        <h6 className="mb-0 align-self-center ml-2 s-bld"> XT</h6>
        <p className="mb-0 align-self-center ml-auto" style={{ fontSize: 12 }}>
          Coming soon
        </p>
      </div>
      <div className="select-box disabled">
        <img
          className="align-self-center"
          src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/37.png"
          height={30}
        />
        <h6 className="mb-0 align-self-center ml-2 s-bld"> Bitfinex</h6>
        <p className="mb-0 align-self-center ml-auto" style={{ fontSize: 12 }}>
          Coming soon
        </p>
      </div>
      <div className="select-box disabled">
        <img
          className="align-self-center"
          src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/171.png"
          height={30}
        />
        <h6 className="mb-0 align-self-center ml-2 s-bld"> Luno</h6>
        <p className="mb-0 align-self-center ml-auto" style={{ fontSize: 12 }}>
          Coming soon
        </p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-outline-primary d-block mx-auto"
          onClick={() => onClose()}
        >
          <NavLink to={"/coin/" + data?.url}>View coin info</NavLink>
        </button>
      </div>
    </>
  );
};

export default SelectExchangePop;
