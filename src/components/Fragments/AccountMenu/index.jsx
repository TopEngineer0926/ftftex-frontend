import { useTranslation } from "react-i18next";
import "./index.scss";
import Dropdown from "react-bootstrap/Dropdown";
import { NavLink } from "react-router-dom";
import { accountMenuItems } from "../../../data/accountMenuItems";
import { getTheme } from "../../../utils";

const AccountMenu = () => {
  const { t } = useTranslation();

  return (
    <Dropdown.Menu size="lg" className="drop-menu">
      <div className="assets-wrapper">
        <div className="assets-header">
          <span className="font-weight-bold">{t("Assets Overview")}</span>
          <span className="material-symbols-outlined">visibility_off</span>
        </div>
        <div className="overview">
          <span className="small-text">{t("Balance")}</span>
          <span>102.3 USDT</span>
          <span></span>
          <span className="small-text">{t("P&L")}</span>
          <span>+10.4 USDT</span>
          <span>9.83%</span>
        </div>
      </div>
      {accountMenuItems.map((item, index) => (
        <Dropdown.Item
          className={getTheme() === "dark" ? "bg-dark menu-item" : "menu-item"}
          key={index}
        >
          <NavLink to={item.route} className="item">
            <span className="material-symbols-outlined mr-4">{item.icon}</span>
            {t(item.title)}
          </NavLink>
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  );
};

export default AccountMenu;
