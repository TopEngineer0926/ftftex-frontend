import { Divider } from "@mui/material";
import { Dropdown } from "react-bootstrap";
import { changeLanguage, getTheme } from "../../../utils";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../../../App";
import "./index.scss";
import ApiService from "../../../services/apiService";

const AccountSettings = () => {
  const [currentCurrency, setCurrentCurrency] = useState(
    localStorage.getItem("currency") || "USD"
  );
  const [currencies, setCurrencies] = useState([]);
  const { t, i18n } = useTranslation();
  const colorMode = useContext(ColorModeContext);
  const changeLang = (val) => {
    i18n.changeLanguage(val);
    changeLanguage(val);
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  const getCurrencies = async () => {
    const response = await ApiService.getAllCurrency();
    const data = JSON.parse(response.data["KYC Api resuult"]);
    const arr = [];
    data.data.map((item) => {
      if (arr.indexOf(item.ccy) === -1) {
        arr.push(item.ccy);
      }
    });
    setCurrencies(arr);
  };

  return (
    <>
      <div className="pb-2 light-border-bottom">
        <h4>{t("Account Settings")}</h4>
        <Divider />
      </div>
      <div className="d-flex justify-content-between align-items-center py-2 mt-2">
        <p>{t("Language")}</p>
        <Dropdown size="lg">
          <Dropdown.Toggle
            className={`${
              getTheme() === "light"
                ? "dropdown-account"
                : "dropdown-account-dark"
            } d-flex align-items-center`}
          >
            <p className="m-0 mr-2">
              {i18n.language === "en" ? "English" : "Chinese"}
            </p>
            <span
              className="material-symbols-outlined acc-box-i align-self-center ml-auto pointer"
              style={{ fontSize: 26, opacity: 0.4 }}
            >
              expand_more
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => changeLang("en")}
              className={"dropdown-item"}
            >
              English
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => changeLang("ch")}
              className={"dropdown-item"}
            >
              Chinese
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <p>{t("Currency")}</p>
        <Dropdown size="lg">
          <Dropdown.Toggle
            className={`${
              getTheme() === "light"
                ? "dropdown-account"
                : "dropdown-account-dark"
            } d-flex align-items-center`}
          >
            <p className="m-0 mr-2">{currentCurrency}</p>
            <span
              className="material-symbols-outlined acc-box-i align-self-center ml-auto"
              style={{ fontSize: 26, opacity: 0.4 }}
            >
              {" "}
              expand_more{" "}
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-currency-menu">
            {currencies &&
              currencies.map((item, index) => (
                <Dropdown.Item
                  className={"dropdown-item"}
                  key={index}
                  onClick={() => {
                    setCurrentCurrency(item);
                    localStorage.setItem("currency", item);
                  }}
                >
                  {item}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <p>{t("account.settings.Mode")}</p>
        <div className="d-flex align-items-center">
          <span className="material-symbols-outlined mr-4">sunny</span>
          <div
            className={`switch-container-mode ${
              getTheme() !== "light" ? "on" : "off"
            }`}
            onClick={colorMode.toggleColorMode}
          >
            <div className="switch-button-mode" />
          </div>
          <span className="material-symbols-outlined ml-3">dark_mode</span>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
