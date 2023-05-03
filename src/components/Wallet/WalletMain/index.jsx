import { useTranslation } from "react-i18next";
import "./index.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLoggedIn } from "utils";
import ApiService from "services/apiService";
import ReactApexChart from "react-apexcharts";

const WalletMain = () => {
  const { t } = useTranslation();
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const [tab, setTab] = useState("deposit");
  const [deposits, setDeposits] = useState([]);
  const [trading, setTrading] = useState([]);

  const navigate = useNavigate();

  const seriesData = [
    {
      name: "Sales",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
    },
  ];

  const options = {
    chart: {
      type: "area",
      height: 300,
      background: "#f4f4f4",
    },
    colors: ["#001fff"],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    stroke: {
      curve: "smooth",
    },
    yaxis: {
      title: {
        text: "Amount (USD)",
      },
    },
    title: {
      text: "Wallet History",
    },
  };

  useEffect(() => {
    const data = getLoggedIn();
    if (!data[0]) {
      navigate("/login");
    } else {
      setLogginIn(data);
    }
  }, []);

  useEffect(() => {
    if (LogginIn[5]) {
      getSubAccTradeBalance();
      getSubAccFoundBalance();
    }
  }, [LogginIn]);

  const getSubAccTradeBalance = () => {
    const params = {
      subAcct: LogginIn[5],
    };
    ApiService.getSubAccTradeBalance(params).then((res) => {
      let tmpTrading = JSON.parse(res.data["KYC Api resuult"])?.data[0].details;
      setTrading(tmpTrading);
    });
  };

  const getSubAccFoundBalance = () => {
    const params = {
      subAcct: LogginIn[5],
    };
    ApiService.getSubAccFoundBalance(params).then((res) => {
      let tmpDeposits = JSON.parse(res.data["KYC Api resuult"])?.data;
      setDeposits(tmpDeposits);
    });
  };

  return (
    <div style={{ display: "grid", gap: 30 }} className="col-lg-10">
      <div className="wt-box p-3" style={{ gap: 10, display: "grid" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 15,
          }}
        >
          <span
            class="material-symbols-outlined"
            style={{ visibility: "hidden" }}
          >
            arrow_left
          </span>
          <img className="align-self-center" src="/favicon.svg" height={50} />
          <span style={{ fontSize: 20 }}>Aggregated Wallet</span>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <span
              class="material-symbols-outlined"
              style={{ position: "absolute", right: 30 }}
            >
              <NavLink to={"/wallet/okx"}>arrow_right</NavLink>
            </span>
          </div>
        </div>
        <div className="px-5">
          <span style={{ fontWeight: "bold" }}>Overview</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: "50%" }}>
              <span style={{ color: "gray" }}>Balance</span>
              <span style={{ marginLeft: 20 }}>3,200 USDT</span>
            </div>
            <div style={{ width: "50%" }}>
              <span style={{ color: "gray" }}>P & L</span>
              <span style={{ marginLeft: 20 }}>50 USDT</span>{" "}
              <span style={{ color: "lightgreen", marginLeft: 10 }}>1.7%</span>
            </div>
          </div>
          <span style={{ color: "gray", fontSize: 14 }}>
            Information is updated every minute. Last update 14:43 GMT+4
          </span>
        </div>
      </div>
      <div className="wt-box p-3">
        <ReactApexChart
          options={options}
          series={seriesData}
          type="area"
          height={300}
        />
      </div>
      <div className="wallet-button-layout">
        <div className="wallet-button-group">
          <div className="button-item">
            <button
              class="btn d-block purchase-button"
              onClick={() => navigate("/wallet/purchase-crypto")}
            >
              <span class="material-symbols-outlined">shopping_cart</span>
            </button>
            <span>{t("Purchase Crypto")}</span>
          </div>
        </div>
      </div>
      <div className="wt-box p-3" style={{ minHeight: 200 }}>
        Wallet Composition
      </div>
    </div>
  );
};

export default WalletMain;
