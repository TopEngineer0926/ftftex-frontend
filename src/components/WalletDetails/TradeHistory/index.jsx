import { useTranslation } from "react-i18next";
import "./index.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getLoggedIn } from "utils";
import ApiService from "services/apiService";
import DatePicker from "react-datepicker";
import { FTFTexContext } from "App";

const TradeHistory = () => {
  const { t } = useTranslation();
  const [LogginIn, setLogginIn] = useState({ 0: "" });
  const [tab, setTab] = useState("deposit");
  const [deposits, setDeposits] = useState([]);
  const [trading, setTrading] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);
  const [filterDate, setFilterDate] = useState([
    {
      value: "1 Day",
      isSelected: false,
    },
    {
      value: "1 Week",
      isSelected: false,
    },
    {
      value: "1 Month",
      isSelected: false,
    },
    {
      value: "3 Months",
      isSelected: false,
    },
  ]);

  const [searchDate, setSearchDate] = useState({
    from: "",
    to: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

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

  const handleChangeSelect = (index) => {
    let tmpFilterDate = [...filterDate];

    tmpFilterDate = tmpFilterDate.map((d, k) => {
      if (k === index) {
        return {
          value: d.value,
          isSelected: !d.isSelected,
        };
      }
      return {
        value: d.value,
        isSelected: false,
      };
    });

    setFilterDate(tmpFilterDate);
  };

  const handleClickReset = () => {};

  const handleClickSearch = () => {};

  return (
    <div className="wt-box p-3" style={{ height: "100%" }}>
      <div style={{ margin: 15 }}>
        <div style={{ display: "grid", gap: 15 }}>
          <div>
            <h4 style={{ fontWeight: "bold" }}>Trade History</h4>
            <span>Estimated balance</span>
          </div>
          <h5>0.018433 = 0.00021 BTC</h5>
        </div>
        <div
          className="row"
          style={{
            gap: 20,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="filter-date-button-layout">
            {filterDate.map((d, index) => (
              <button
                class={
                  d.isSelected
                    ? "btn d-block filter-date filter-date-selected"
                    : "btn d-block filter-date"
                }
                onClick={() => handleChangeSelect(index)}
              >
                {d.value}
              </button>
            ))}
          </div>
          <div
            style={{
              gap: 10,
              display: isMobile ? "grid" : "flex",
              overflow: "auto",
            }}
          >
            <div className="col-xs-12 date-picker-panel">
              From{" "}
              <DatePicker
                selected={searchDate.from}
                onChange={(date) =>
                  setSearchDate({ ...searchDate, from: date })
                }
                className="form-control rounded-0 date-picker-width"
                placeholderText="yyyy-mm-dd"
                dateFormat={"yyyy-mm-dd"}
              />
            </div>
            <div className="col-xs-12 date-picker-panel">
              To{" "}
              <DatePicker
                selected={searchDate.to}
                onChange={(date) => setSearchDate({ ...searchDate, to: date })}
                className="form-control rounded-0 date-picker-width"
                placeholderText="yyyy-mm-dd"
                dateFormat={"yyyy-mm-dd"}
              />
            </div>
            <div className="col-xs-12 date-picker-panel">
              <button
                class="btn d-block filter-date-selected"
                onClick={handleClickSearch}
              >
                Search
              </button>
              <button class="btn d-block" onClick={handleClickReset}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default TradeHistory;
