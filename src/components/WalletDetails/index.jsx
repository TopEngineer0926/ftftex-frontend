import { useEffect, useState, useContext } from "react";
import "./index.scss";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FTFTexContext } from "App";
import { getLoggedIn } from "../../utils";

const WalletDetails = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const param = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);
  const [LogginIn, setLogginIn] = useState({ 0: "" });

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  useEffect(() => {
    setType(param.type);
  }, [param]);

  useEffect(() => {
    const data = getLoggedIn();
    if (!data[0]) {
      navigate("/login");
    } else {
      setLogginIn(data);
    }
  }, []);

  return (
    <div className="container mt-4 mb-4" style={{ margin: "auto" }}>
      <div className="row">
        <div
          className={
            isMobile ? "col-lg-3 wt-box p-4" : "col-lg-3 wt-box mr-4 p-4"
          }
          style={{
            position: "sticky",
            top: 0,
            margin: isMobile && "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 15,
            }}
          >
            {type === "okx" && (
              <img
                className="align-self-center"
                src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/294.png"
                height={50}
              />
            )}
            {type === "huobi" && (
              <img
                className="align-self-center"
                src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/102.png"
                height={50}
              />
            )}
            {type === "xt" && (
              <img
                className="align-self-center"
                src="https://s2.coinmarketcap.com/static/img/exchanges/64x64/525.png"
                height={50}
              />
            )}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ color: "gray" }}>WID: {LogginIn[5]}</span>
              {type === "okx" && <span>OKX Wallet</span>}
              {type === "huobi" && <span>Huobi Wallet</span>}
              {type === "xt" && <span>XT.com Wallet</span>}
            </div>
            <span className="quick-trade">Quick Trade</span>
          </div>
          <div
            className="d-flex d-lg-block"
            style={{ minHeight: isMobile ? 150 : 600, marginTop: 20 }}
          >
            {type === "okx" && (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "btn sub-menu-btn w-100 radius-10 btn-primary"
                    : "btn sub-menu-btn w-100 radius-10"
                }
                to={`/wallet/details/funding-account/${type}`}
              >
                Funding Account
              </NavLink>
            )}
            <hr style={{ margin: "unset" }} />
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "btn sub-menu-btn light-border-bottom w-100 radius-10 btn-primary"
                  : "btn sub-menu-btn light-border-bottom w-100 radius-10"
              }
              to={`/wallet/details/trading-account/${type}`}
            >
              Trading Account
            </NavLink>
            <hr style={{ margin: "unset" }} />
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "btn sub-menu-btn light-border-bottom w-100 radius-10 btn-primary"
                  : "btn sub-menu-btn light-border-bottom w-100 radius-10"
              }
              to={`/wallet/details/trade-history/${type}`}
            >
              Trade History
            </NavLink>
            <hr style={{ margin: "unset" }} />
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "btn sub-menu-btn light-border-bottom w-100 radius-10 btn-primary"
                  : "btn sub-menu-btn light-border-bottom w-100 radius-10"
              }
              to={`/wallet/details/transaction-history/${type}`}
            >
              Transaction History
            </NavLink>
          </div>
          <span
            className="mt-5 pointer buy-wrapper"
            style={{ position: "absolute", bottom: 20 }}
          >
            <NavLink to={`/wallet/${type}`}>
              <div className="card-name">Back</div>
            </NavLink>
          </span>
        </div>
        <div className="col-lg-8" style={{ overflow: "visible" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default WalletDetails;
