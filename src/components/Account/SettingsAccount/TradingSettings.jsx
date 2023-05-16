import { Divider } from "@mui/material";
import { Dropdown } from "react-bootstrap";
import { getLoggedIn, getTheme } from "../../../utils";
import { useTranslation } from "react-i18next";
import "./index.scss";
import { useEffect, useState } from "react";

const TradingSettings = () => {
  const { t } = useTranslation();
  const isColorReference = localStorage.getItem("colorReference") !== null;
  const [colorReference, setColorReference] = useState(
    isColorReference
      ? localStorage.getItem("colorReference").split(",")
      : ["Green Up", "Red Down"]
  );
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    const data = getLoggedIn();
    setIsVerified(data[6] === "verified");
  }, []);

  const handleColorReference = (color) => {
    setColorReference(color);
    localStorage.setItem("colorReference", color);
  };
  return (
    <>
      <div className="pb-2 light-border-bottom mb-3">
        <h4
          className={`${
            getTheme() === "dark" ? "sub-title-dark" : "sub-title"
          }`}
          style={{ paddingBottom: "15px", paddingTop: "15px", marginBottom: 0 }}
        >
          {t("account.settings.Trading Settings")}
        </h4>
        <Divider />
      </div>
      <a
        href={isVerified ? "/account/transaction-history" : "/wallet"}
        className="d-flex justify-content-between align-items-center mt-2 pointer setting-block"
      >
        <div
          className={`${
            getTheme() === "dark" ? "sub-point-dark" : "sub-point"
          }`}
        >
          {t("account.settings.Transaction History")}
        </div>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 26, opacity: 0.4 }}
        >
          chevron_right
        </span>
      </a>
      <a
        href={isVerified ? "" : "/wallet"}
        className="d-flex justify-content-between align-items-center mt-2 pointer setting-block"
      >
        <div
          className={`${
            getTheme() === "dark" ? "sub-point-dark" : "sub-point"
          }`}
        >
          {t("account.settings.Trading History")}
        </div>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 26, opacity: 0.4 }}
        >
          chevron_right
        </span>
      </a>
      <div className="d-flex justify-content-between align-items-center mt-2 setting-block">
        <div
          className={`${
            getTheme() === "dark" ? "sub-point-dark" : "sub-point"
          }`}
        >
          {t("account.settings.Color Reference")}
        </div>
        <Dropdown size="lg">
          <Dropdown.Toggle
            className={`${
              getTheme() === "light"
                ? "dropdown-account"
                : "dropdown-account-dark"
            } dropdown-account d-flex align-items-center`}
          >
            <p
              className="txt-green m-0 mr-2 d-flex flex-row align-items-center font-weight-bold"
              style={{ fontSize: 14 }}
            >
              {colorReference[0]}
              <span className="material-symbols-outlined">arrow_drop_up</span>
            </p>
            <p
              className="txt-red m-0 mr-2 d-flex flex-row align-items-center font-weight-bold"
              style={{ fontSize: 14 }}
            >
              {colorReference[1]}
              <span className="material-symbols-outlined">arrow_drop_down</span>
            </p>
            <span
              className="material-symbols-outlined acc-box-i align-self-center ml-auto"
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
              className={`${
                getTheme() === "dark"
                  ? "dropdown-menu-item-dark d-flex flex-row align-items-center"
                  : "dropdown-item d-flex flex-row align-items-center"
              }`}
              onClick={() => handleColorReference(["Green Up", "Red Down"])}
            >
              <p
                className="txt-green m-0 mr-2 font-weight-bold d-flex align-items-center"
                style={{ fontSize: 14 }}
              >
                {t("Green Up")}
                <span className="material-symbols-outlined">arrow_drop_up</span>
              </p>
              <p
                className="txt-red m-0 mr-2 font-weight-bold  d-flex align-items-center"
                style={{ fontSize: 14 }}
              >
                {t("Red Down")}
                <span className="material-symbols-outlined">
                  arrow_drop_down
                </span>
              </p>
            </Dropdown.Item>
            <Dropdown.Item
              className={`${
                getTheme() === "dark"
                  ? "dropdown-menu-item-dark d-flex flex-row align-items-center"
                  : "dropdown-item d-flex flex-row align-items-center"
              }`}
              onClick={() => handleColorReference(["Red Up", "Green Down"])}
            >
              <p
                className="txt-red m-0 mr-2 font-weight-bold  d-flex align-items-center"
                style={{ fontSize: 14 }}
              >
                {t("Red Up")}
                <span className="material-symbols-outlined">arrow_drop_up</span>
              </p>
              <p
                className="txt-green m-0 mr-2 font-weight-bold  d-flex align-items-center"
                style={{ fontSize: 14 }}
              >
                {t("Green Down")}
                <span className="material-symbols-outlined">
                  arrow_drop_down
                </span>
              </p>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  );
};

export default TradingSettings;
