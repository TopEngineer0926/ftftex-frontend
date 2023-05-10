import "./index.scss";
import {useContext, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {ColorModeContext, FTFTexContext} from "App";
import {useTranslation} from "react-i18next";
import {changeLanguage, getLoggedIn, getTheme} from "utils";
import ApiService from "services/apiService";
import LogoImage from "assets/images/logo.svg";
import AccountMenu from "../AccountMenu";
import {Dropdown} from "react-bootstrap";
import {Currency, Language, Notification, Share, Theme} from "./HeaderElements";

const Header = () => {
    const colorMode = useContext(ColorModeContext);
    const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);
    const [isMobile, setIsMobile] = useState(false);
    const {t, i18n} = useTranslation();
    const [GlobalData, setGlobalData] = useState({});
    const [LoggedIn, setLoggedIn] = useState({0: ""});

    console.log(ftftexValue);


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
        setLoggedIn(ftftexValue.Loggedin);
    }, [ftftexValue.Loggedin]);

    const numberWithCommas = (number) => {
        return number ? number.toLocaleString() : "";
    };

    return (<>
        {!isMobile && (<div className="top-bar">
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
                    <p className="mb-0" style={{marginRight: '60px'}}>
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
        </div>)}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container d-flex">
                <NavLink className="navbar-brand ml-2" to="/">
                    <img src={LogoImage} height="40"/>
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
                        {LoggedIn[0] && (<li className="nav-item">
                            <NavLink className="nav-link" to="/wallet">
                                {t("Wallet")}
                            </NavLink>
                        </li>)}
                        {/* <li className="nav-item">
       <a className="nav-link" to="https://faq.ftftx.com">{t("FAQ")}</a>
     </li> */}
                    </ul>
                </div>
                {!isMobile &&
                    <div className="user-header-settings col-xl">
                        <Notification/>
                        <Language/>
                        <Share/>
                        <Currency/>
                        <Theme />
                        {LoggedIn[0] && (<ul className="navbar-nav d-lg-flex flex-row d-none">
                            <Dropdown>
                                <Dropdown.Toggle variant="none" className="nav-item user-menu">
                  <span className="material-symbols-outlined align-self-center"
                        style={{fontSize: 35}}>account_circle</span>
                                </Dropdown.Toggle>
                                <AccountMenu/>
                            </Dropdown>
                        </ul>)}
                    </div>
                }

                {!LoggedIn[0] && (<ul
                    className="navbar-nav ml-auto d-lg-block d-none"
                    style={{height: 38}}
                >
                    <li className="nav-item ">
                        <NavLink className="nav-link" to="/login">
                            {t("Login")}
                        </NavLink>
                    </li>
                </ul>)}
                {isMobile && (<ul
                    className="navbar-nav ml-auto d-flex flex-row"
                    style={{height: 38}}
                >
                    <li className="nav-item ">
                        <a className="nav-link" onClick={() => changeLang("ch")}>
                            中文
                        </a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link">|</a>
                    </li>
                    <li className="nav-item ">
                        <a className="nav-link" onClick={() => changeLang("en")}>
                            ENG
                        </a>
                    </li>
                    <li className="nav-item ">
                        <NavLink className="nav-link" to="/about/product-introduction">
                  <span
                      className="material-symbols-outlined"
                      style={{opacity: 0.5}}
                  >
                    info
                  </span>
                        </NavLink>
                    </li>
                    <li className="nav-item" onClick={colorMode.toggleColorMode}>
                        <NavLink className="nav-link">
                  <span
                      className="material-symbols-outlined align-self-center"
                      style={{fontSize: 25}}
                  >
                    {getTheme() === "light" ? "dark_mode" : "light_mode"}
                  </span>
                        </NavLink>
                    </li>
                </ul>)}
            </div>
        </nav>
        {isMobile && (<div className="m-menu d-flex justify-content-between">
            <NavLink
                className={({isActive}) => (isActive ? "mb-0 selected" : "mb-0")}
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
                className={({isActive}) => (isActive ? "mb-0 selected" : "mb-0")}
                to="/news"
            >
                <span className="material-symbols-outlined">newspaper</span>
                {t("News")}
            </NavLink>
            {LoggedIn[0] && (<NavLink
                className={({isActive}) => isActive ? "mb-0 selected" : "mb-0"}
                to="/wallet"
            >
                <span className="material-symbols-outlined">wallet</span>
                {t("Wallet")}
            </NavLink>)}
            <NavLink
                className={({isActive}) => (isActive ? "mb-0 selected" : "mb-0")}
                to="/community"
            >
                <span className="material-symbols-outlined">people</span>
                {t("Community")}
            </NavLink>
            <NavLink
                className={({isActive}) => (isActive ? "mb-0 selected" : "mb-0")}
                to="/account/settings"
            >
                <span className="material-symbols-outlined">account_circle</span>
                {t("Account")}
            </NavLink>
        </div>)}
    </>);
};

export default Header;
