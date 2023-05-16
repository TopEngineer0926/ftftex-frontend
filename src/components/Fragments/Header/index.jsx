import "./index.scss";
import {useContext, useEffect, useState} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ColorModeContext, FTFTexContext } from "App";
import { useTranslation } from "react-i18next";
import { changeLanguage, getLoggedIn, getTheme } from "utils";
import ApiService from "services/apiService";
import LogoImage from "assets/images/logo.svg";
import AccountMenu from "../AccountMenu";
import { Dropdown } from "react-bootstrap";
import Avatar from "@mui/material/Avatar";
import {
  Currency,
  Language,
  Notification,
  Share,
  Theme,
} from "./HeaderElements";

const Header = () => {
  const colorMode = useContext(ColorModeContext);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);
  const [isMobile, setIsMobile] = useState(false);
  const { t, i18n } = useTranslation();
  const [GlobalData, setGlobalData] = useState({});
  const [LoggedIn, setLoggedIn] = useState({ 0: "" });
  const [userData, setUserData] = useState({});
  const [avatar, setAvatar] = useState("");

  const navigate = useNavigate();

  const changeLang = (val) => {
    i18n.changeLanguage(val);
    changeLanguage(val);
  };

  useEffect(() => {
    ApiService.getGlobalData().then((res) => {
      const data = JSON.parse(res.data.response["Result: "])?.data;
      setGlobalData(data);
    });

    if (getTheme() === "light") {
      document.body.classList.remove("dark-theme");
    } else {
      document.body.classList.add("dark-theme");
    }
  }, []);

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  useEffect(() => {
    const res = getLoggedIn();
    if (!res[0]) {
      navigate("/login");
    } else {
      setLoggedIn(res);
    }
  }, []);

  useEffect(() => {
    const res = ftftexValue.Loggedin;
    if (res[0]) {
      setLoggedIn(res);
    }
  }, [ftftexValue.Loggedin]);

  const numberWithCommas = (number) => {
    return number ? number.toLocaleString() : "";
  };

  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 24,
        height: 24,
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (ftftexValue.avatar) setAvatar(ftftexValue.avatar);
  }, [ftftexValue.avatar]);

  const getData = async () => {
    const response = await ApiService.getUser(localStorage.getItem("userId"));
    const userData = response.data.userDetails[0];
    setUserData(userData);
    setAvatar(userData.avatar);
  };
  return (
    <>
      {!isMobile && (
        <div className="top-bar">
          <div className="container-lg info-wrapper">
            <div className="d-flex justify-content-between h-ticker">
              <p className="mb-0">
                {t("Cryptos")}:{" "}
                {numberWithCommas(GlobalData?.total_cryptocurrencies)}
              </p>
              <p className="mb-0">
                {t("Exchanges")}:{" "}
                {numberWithCommas(GlobalData?.total_exchanges)}
              </p>
              <p className="mb-0">
                {t("Pairs")}:{" "}
                {numberWithCommas(GlobalData?.active_market_pairs)}
              </p>
              <p className="mb-0">
                {t("Market Cap")}: ${" "}
                {numberWithCommas(GlobalData?.quote?.USD?.total_market_cap)}
              </p>
              <p className="mb-0">
                {t("24h Vol")}: ${" "}
                {numberWithCommas(GlobalData?.quote?.USD?.total_volume_24h)}
              </p>
              <p className="mb-0" style={{ marginRight: "60px" }}>
                {t("Dominance")}:
                <span>
                  {" "}
                  BTC: {numberWithCommas(GlobalData?.btc_dominance)} %{" "}
                </span>
                <span className="ml-3">
                  ETH: {numberWithCommas(GlobalData?.eth_dominance)} %
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container d-flex">
          <NavLink className="navbar-brand ml-2" to="/">
            <img src={LogoImage} height="40" />
          </NavLink>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto ml-5">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  {t("Home")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/coins">
                  {t("Currencies")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/exchanges">
                  {t("Exchange")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/news">
                  {t("News")}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/community/feed">
                  {t("Community")}
                </NavLink>
              </li>
              {LoggedIn[0] && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/wallet">
                    {t("Wallet")}
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          {LoggedIn[0] && (
            <div
              className={
                isMobile
                  ? "mt-2 user-header-settings col-2"
                  : "user-header-settings col-1"
              }
            >
              {/*<Notification />*/}
              <Language />
              {/*<Share/>*/}
              {/*<Currency/>*/}
              {/*<Theme />*/}
              {!isMobile && LoggedIn[0] && (
                <ul className="navbar-nav d-lg-flex flex-row d-none mb-1">
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="none"
                      className="nav-item user-menu"
                    >
                      {Object.keys(userData).length > 0 ? (
                        <Avatar
                          {...stringAvatar(
                            userData?.firstName + " " + userData?.lastName
                          )}
                          src={avatar}
                        />
                      ) : (
                        <span
                          className="material-symbols-outlined align-self-center"
                          style={{ fontSize: 35 }}
                        >
                          account_circle
                        </span>
                      )}
                    </Dropdown.Toggle>
                    <AccountMenu />
                  </Dropdown>
                </ul>
              )}
            </div>
          )}
          {!LoggedIn[0] && (
            <div className="not-login-header-settings">
              <Language className="mr-2" />
              {/*<Theme />*/}
            </div>
          )}

          {!LoggedIn[0] && (
            <ul
              className="navbar-nav ml-auto d-lg-block d-none"
              style={{ height: 38 }}
            >
              <li className="nav-item ">
                <NavLink className="nav-link" to="/login">
                  {t("Login")}
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
      {isMobile && (
        <div className="m-menu d-flex justify-content-between">
          <NavLink
            className={({ isActive }) =>
              isActive ? "avatar-panel mb-0 selected" : "avatar-panel mb-0"
            }
            exact
            to=""
          >
            <span className="material-symbols-outlined">home</span>
            {t("Home")}
          </NavLink>
          {/* <NavLink className={({ isActive }) =>
                isActive ? "mb-0 selected" : "mb-0"
              } to="/exchanges"><span className="material-symbols-outlined">monitoring</span>{{"Exchanges")}</NavLink> */}
          <NavLink
            className={({ isActive }) =>
              isActive ? "avatar-panel mb-0 selected" : "avatar-panel mb-0"
            }
            to="/news"
          >
            <span className="material-symbols-outlined">newspaper</span>
            {t("News")}
          </NavLink>
          {LoggedIn[0] && (
            <NavLink
              className={({ isActive }) =>
                isActive ? "avatar-panel mb-0 selected" : "avatar-panel mb-0"
              }
              to="/wallet"
            >
              <span className="material-symbols-outlined">wallet</span>
              {t("Wallet")}
            </NavLink>
          )}
          <NavLink
            className={({ isActive }) =>
              isActive ? "avatar-panel mb-0 selected" : "avatar-panel mb-0"
            }
            to="/community"
          >
            <span className="material-symbols-outlined">people</span>
            {t("Community")}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "avatar-panel mb-0 selected" : "avatar-panel mb-0"
            }
            to="/account/settings"
          >
            {Object.keys(userData).length > 0 ? (
              <Avatar
                {...stringAvatar(
                  userData?.firstName + " " + userData?.lastName
                )}
                style={{ width: 24, height: 24 }}
                src={avatar}
              />
            ) : (
              <span className="material-symbols-outlined">account_circle</span>
            )}
            {t("Account")}
          </NavLink>
        </div>
      )}
    </>
  );
};

export default Header;
