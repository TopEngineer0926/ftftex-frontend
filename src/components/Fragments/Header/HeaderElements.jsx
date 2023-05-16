import { Button, Dropdown } from "react-bootstrap";
import { DropDownHeader } from "./DropDownHeader";
import { SearchFiled } from "../SearchFiled";
import { languageData } from "../../../data/languageData";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { changeLanguage, getTheme } from "../../../utils";
import "./index.scss";
import { QRCode } from "react-qrcode-logo";
import { ColorModeContext } from "../../../App";

export const Language = () => {
  const { i18n } = useTranslation();
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState(languageData);

  const changeLang = (val) => {
    changeLanguage(val);
    i18n.changeLanguage(val);
  };

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    const findData = languageData.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setData(findData);
  };
  return (
    <Dropdown autoClose="outside">
      <Dropdown.Toggle as={DropDownHeader} id="dropdown-custom-components">
        <span className="material-symbols-outlined">language</span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={`${getTheme() === "dark" ? "dropdown-dark" : ""}`}
      >
        <SearchFiled handleSearch={handleSearch} searchValue={searchValue} />
        {data.map((item, index) => (
          <Dropdown.Item
            className="search-dropdown-exchange-item"
            key={index}
            onClick={() => changeLang(item.code)}
          >
            {item.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const Currency = () => {
  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([
    { name: "USD", code: "USD", icon: "./images/flags/us.svg" },
  ]);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    // const findData = languageData.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
    // setData(findData);
  };
  return (
    <Dropdown autoClose="outside">
      <Dropdown.Toggle as={DropDownHeader} id="dropdown-custom-components">
        <span className="material-symbols-outlined">attach_money</span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={`${
          getTheme() === "dark"
            ? "currency-dropdown dropdown-dark"
            : "currency-dropdown"
        }`}
      >
        <SearchFiled handleSearch={handleSearch} searchValue={searchValue} />
        {data.map((item, index) => (
          <Dropdown.Item
            className="search-dropdown-exchange-item"
            key={index}
            // onClick={() => changeLang(item.code)}
          >
            <div className="currency-wrapper">
              <div>{item.name}</div>
              <img src={item.icon} alt="currency_icon" />
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const Share = () => {
  return (
    <Dropdown autoClose="outside">
      <Dropdown.Toggle as={DropDownHeader} id="dropdown-custom-components">
        <span className="material-symbols-outlined">share</span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={`${getTheme() === "dark" ? "dropdown-dark" : ""}`}
      >
        <Dropdown.Item>
          <div className="share-wrapper">
            <QRCodeWithLogo value="https://example.com" />
            <Button variant="primary" href="#" className="share-btn mt-2">
              Share
            </Button>
          </div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const Notification = () => {
  const [data, setData] = useState([
    {
      time: "30s",
      title: "New login attempt",
      description:
        "The system has detected a new login attempt from a new device. Please verify your identity.",
    },
  ]);
  return (
    <Dropdown autoClose="outside">
      <Dropdown.Toggle as={DropDownHeader} id="dropdown-custom-components">
        <span className="material-symbols-outlined">notifications</span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={`${
          getTheme() === "dark"
            ? "notification-dropdown dropdown-dark"
            : "notification-dropdown"
        }`}
      >
        {data.map((item, index) => (
          <Dropdown.Item
            className="search-dropdown-exchange-item"
            key={index}
            // onClick={() => changeLang(item.code)}
          >
            <div className="notification-wrapper">
              <div className="notification-time">{item.time}</div>
              <div>
                <div className="notification-title">{item.title}</div>
                <div className="notification-message">{item.description}</div>
              </div>
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const QRCodeWithLogo = ({ value }) => {
  const qrCodeSize = 256;
  return (
    <QRCode
      value={value}
      size={qrCodeSize}
      logoImage="/favicon.svg"
      logoWidth={35}
      logoHeight={35}
    />
  );
};

export const Theme = () => {
  const colorMode = useContext(ColorModeContext);

  return (
    <div
      className="nav-item dropdown cu-p"
      onClick={colorMode.toggleColorMode}
      style={{ display: "flex" }}
    >
      <span
        className="material-symbols-outlined align-self-center"
        style={{ fontSize: 25 }}
      >
        {getTheme() === "light" ? "dark_mode" : "light_mode"}
      </span>
    </div>
  );
};
