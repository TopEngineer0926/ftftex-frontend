import { Dropdown } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { exchangePlatforms } from "../../data/exchangePlatforms";
import { SearchFiled } from "../Fragments/SearchFiled";

export const TypeMenu = () => {
  const { t } = useTranslation();
  const [checkedValue, setCheckedValue] = useState("Deposit");
  const fields = ["Deposit", "Withdraw", "All"];

  return (
    <Dropdown.Menu>
      {fields.map((field, index) => (
        <Dropdown.Item
          key={index}
          eventKey={index + 1}
          onClick={() => setCheckedValue(field)}
        >
          <Form.Check inline type={"checkbox"}>
            <Form.Check.Input
              type={"checkbox"}
              checked={checkedValue === field}
            />
            <Form.Check.Label className="checkbox-history">
              {t(field)}
            </Form.Check.Label>
          </Form.Check>
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  );
};

export const StatusMenu = () => {
  const [checkedValue, setCheckedValue] = useState("Completed");
  const fields = ["Completed", "Pending", "All"];
  return (
    <Dropdown.Menu>
      {fields.map((field, index) => (
        <Dropdown.Item
          key={index}
          eventKey={index + 1}
          onClick={() => setCheckedValue(field)}
        >
          <Form.Check inline type={"checkbox"}>
            <Form.Check.Input
              type={"checkbox"}
              checked={checkedValue === field}
            />
            <Form.Check.Label className="checkbox-history">
              {field}
            </Form.Check.Label>
          </Form.Check>
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  );
};

export const SearchMenu = ({ type }) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSourceSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const handleDestinationSearch = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <Dropdown.Menu>
      <SearchFiled
        handleSearch={
          type === "Source" ? handleSourceSearch : handleDestinationSearch
        }
        searchValue={searchValue}
      />
    </Dropdown.Menu>
  );
};

export const ExchangeMenu = () => {
  const [searchValue, setSearchValue] = useState("");
  const [resultList, setResultList] = useState(exchangePlatforms);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    const list = exchangePlatforms.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setResultList(list);
  };

  return (
    <Dropdown.Menu className="search-dropdown-menu-exchange">
      <SearchFiled handleSearch={handleSearch} searchValue={searchValue} />
      {resultList.map((item, index) => (
        <Dropdown.Item key={index} className="search-dropdown-exchange-item">
          <div>
            <img src={item.image} alt={"icon"} height={30} />
            <span className="exchange-item">{item.name}</span>
          </div>
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  );
};

export const NameMenu = ({ coinsData }) => {
  const [searchValue, setSearchValue] = useState("");
  const [allCoins, setAllCoins] = useState(coinsData);

  useEffect(() => {
    setAllCoins(coinsData);
  }, [coinsData]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    const list = coinsData.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.symbol.toLowerCase().includes(value.toLowerCase())
    );
    setAllCoins(list);
  };

  return (
    <Dropdown.Menu className="coins-dropdown">
      <SearchFiled handleSearch={handleSearch} searchValue={searchValue} />
      {allCoins.map((item, index) => (
        <Dropdown.Item key={index} className="coin-item">
          <div className="d-flex cu-p">
            <img
              className="align-self-center"
              loading="lazy"
              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`}
              height={30}
            />
            <div className="align-self-center ml-2">
              <p className="mb-0 s-bld c-symb"> {item.symbol}</p>
              <p className="mb-0 c-name "> {item.name}</p>
            </div>
          </div>
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  );
};
