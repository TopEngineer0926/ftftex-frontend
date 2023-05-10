import { Divider } from "@mui/material";
import { Dropdown } from "react-bootstrap";
import { getTheme } from "../../../utils";
import { useTranslation } from "react-i18next";
import "./index.scss";
import { useState } from "react";

const TradingSettings = () => {
  const { t } = useTranslation();
  const [colorReference, setColorReference] = useState([
    "Green Up",
    "Red Down",
  ]);

  return (
    <>
      <div className="pb-2 light-border-bottom mt-2">
        <h4>{t("account.settings.Trading Settings")}</h4>
        <Divider />
      </div>
      <a
        href="/account/transaction-history"
        className="d-flex justify-content-between align-items-center py-2 mt-2 pointer"
      >
        <p>{t("account.settings.Transaction History")}</p>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 16, opacity: 0.4 }}
        >
          arrow_forward_ios
        </span>
      </a>
      <div className="d-flex justify-content-between align-items-center py-2 pointer">
        <p>{t("account.settings.Trading History")}</p>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 16, opacity: 0.4 }}
        >
          arrow_forward_ios
        </span>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <p>{t("account.settings.Color Reference")}</p>
        <Dropdown size="lg">
          <Dropdown.Toggle
            className={`${
              getTheme() === "light"
                ? "dropdown-account"
                : "dropdown-account-dark"
            } dropdown-account d-flex align-items-center`}
          >
            <p className="tab-text txt-green m-0 mr-2 d-flex flex-row align-items-center">
              {colorReference[0]}
              <span className="material-symbols-outlined">arrow_drop_up</span>
            </p>
            <p className="tab-text txt-red m-0 mr-2 d-flex flex-row align-items-center">
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
          <Dropdown.Menu>
            <Dropdown.Item
              className={"dropdown-item"}
              onClick={() => setColorReference(["Green Up", "Red Down"])}
            >
              <p className="tab-text txt-green m-0 mr-2 d-flex flex-row align-items-center">
                Green Up
                <span className="material-symbols-outlined">arrow_drop_up</span>
              </p>
              <p className="tab-text txt-red m-0 mr-2 d-flex flex-row align-items-center">
                Red Down
                <span className="material-symbols-outlined">
                  arrow_drop_down
                </span>
              </p>
            </Dropdown.Item>
            <Dropdown.Item
              className={"dropdown-item"}
              onClick={() => setColorReference(["Red Up", "Green Down"])}
            >
              <p className="tab-text txt-red m-0 mr-2 d-flex flex-row align-items-center">
                Red Up
                <span className="material-symbols-outlined">arrow_drop_up</span>
              </p>
              <p className="tab-text txt-green m-0 mr-2 d-flex flex-row align-items-center">
                Green Down
                <span className="material-symbols-outlined">
                  arrow_drop_down
                </span>
              </p>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="d-flex justify-content-between align-items-center py-2">
        <p>{t("account.settings.Volume Unit (Trading)")}</p>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 26, opacity: 0.4 }}
        >
          expand_more
        </span>
      </div>
    </>
  );
};

export default TradingSettings;
