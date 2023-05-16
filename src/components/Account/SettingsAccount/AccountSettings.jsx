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
    localStorage.getItem("currency") || "USDT"
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
        <h4
          className={`${
            getTheme() === "dark" ? "sub-title-dark" : "sub-title"
          }`}
        >
          {t("Account Settings")}
        </h4>
        <Divider />
      </div>
      <div className="d-flex justify-content-between align-items-center setting-block mt-2">
        <div
          className={`${
            getTheme() === "dark" ? "sub-point-dark" : "sub-point"
          } align-content-center`}
        >
          {t("Language")}
        </div>
        <Dropdown size="lg">
          <Dropdown.Toggle
            className={`${
              getTheme() === "light"
                ? "dropdown-account"
                : "dropdown-account-dark"
            } d-flex align-items-center`}
          >
            <p className="m-0 mr-2">
              {i18n.language === "en"
                ? "English"
                : "Simplified Chinese (中文) "}
            </p>
            <span
              className="material-symbols-outlined acc-box-i align-self-center ml-auto pointer"
              style={{ fontSize: 26, opacity: 0.4 }}
            >
              expand_more
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu
            className={`${
              getTheme() === "dark" ? "dropdown-menu-dark" : "dropdown-menu"
            }`}
          >
            <Dropdown.Item
              onClick={() => changeLang("en")}
              className={`${
                getTheme() === "dark"
                  ? "dropdown-menu-item-dark"
                  : "dropdown-item"
              }`}
            >
              English
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => changeLang("ch")}
              className={`${
                getTheme() === "dark"
                  ? "dropdown-menu-item-dark"
                  : "dropdown-item"
              }`}
            >
              Simplified Chinese (中文)
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="d-flex justify-content-between align-items-center setting-block mt-2">
        <div
          className={`${
            getTheme() === "dark" ? "sub-point-dark" : "sub-point"
          }`}
        >
          {t("Currency")}
        </div>
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
          <Dropdown.Menu
            className={`${
              getTheme() === "dark"
                ? "dropdown-menu-dark"
                : "dropdown-currency-menu"
            }`}
          >
            {currencies &&
              currencies.map((item, index) => (
                <Dropdown.Item
                  className={`${
                    getTheme() === "dark"
                      ? "dropdown-menu-item-dark"
                      : "dropdown-item"
                  }`}
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
      <div className="d-flex justify-content-between align-items-center mt-2 setting-block">
        <div
          className={`${
            getTheme() === "dark" ? "sub-point-dark" : "sub-point"
          }`}
        >
          {t("account.settings.Mode")}
        </div>
        <div className="d-flex align-items-center">
          <span className="coming-soon">
            {t("account.settings.Coming Soon")}
          </span>
          <span className="material-symbols-outlined mr-4">sunny</span>
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input form-control-lg"
              id="customSwitch1"
              checked={false}
              // onClick={colorMode.toggleColorMode}
            />
            <label
              className="custom-control-label"
              htmlFor="customSwitch1"
            ></label>
          </div>
          {/*</div>*/}
          <span className="material-symbols-outlined ml-3">dark_mode</span>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
