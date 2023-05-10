import { Divider, Table } from "@mui/material";
import { useTranslation } from "react-i18next";
import "./index.scss";
import { Dropdown } from "react-bootstrap";
import { CustomToggle } from "./CustomToggle";
import {
  ExchangeMenu,
  NameMenu,
  SearchMenu,
  StatusMenu,
  TypeMenu,
} from "./DropDownMenus";
import { useEffect, useState } from "react";
import ApiService from "../../services/apiService";
import { NavLink } from "react-router-dom";

const TransactionHistory = ({ data }) => {
  const { t } = useTranslation();
  const [coinsData, setCoinsData] = useState([]);
  const columnNames = [
    t("Exchange"),
    t("Date"),
    t("Type"),
    t("Name"),
    t("Amount"),
    t("Source"),
    t("Destination"),
    t("Status"),
  ];

  useEffect(() => {
    getCoins();
  }, []);

  const getCoins = async () => {
    const response = await ApiService.getCoinData(
      1,
      8,
      "all",
      "market_cap",
      "desc"
    );
    const data = JSON.parse(response.data.response["Result: "])?.data;
    setCoinsData(data);
  };
  return (
    <div className="container p-4">
      <div className="pb-2 light-border-bottom mt-2">
        <h4>{t("account.settings.Transaction History")}</h4>
        <Divider />
      </div>
      <Table responsive className="mt-3">
        <thead className="thread-history">
          <tr>
            {columnNames.map((name, index) => (
              <th key={index} className="th-history">
                <Dropdown autoClose="outside">
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-custom-components"
                  >
                    {name}
                  </Dropdown.Toggle>
                  {name === "Exchange" && <ExchangeMenu />}
                  {name === "Type" && <TypeMenu />}
                  {name === "Status" && <StatusMenu />}
                  {(name === "Source" || name === "Destination") && (
                    <SearchMenu type={name} />
                  )}
                  {name === "Name" && <NameMenu coinsData={coinsData} />}
                </Dropdown>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/*{data.map((item, index) => (*/}
          {/*    <tr key={index} className="th-history-body">*/}
          {/*        <td className="td-exchange">*/}
          {/*            <img src={`https://s2.coinmarketcap.com/static/img/exchanges/64x64/${item.id}.png`}*/}
          {/*                 alt={"icon"}*/}
          {/*                 height={30}*/}
          {/*            />*/}
          {/*            {item.exchange}*/}
          {/*        </td>*/}
          {/*        <td>{item.date}</td>*/}
          {/*        <td>{item.type}</td>*/}
          {/*        <td className="td-name">*/}
          {/*            <img*/}
          {/*                className="align-self-center"*/}
          {/*                loading="lazy"*/}
          {/*                src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${item.idName}.png`}*/}
          {/*                height={30}*/}
          {/*            />*/}
          {/*            {item.name}*/}
          {/*        </td>*/}
          {/*        <td>{item.amount}</td>*/}
          {/*        <td>{item.source}</td>*/}
          {/*        <td>{item.destination}</td>*/}
          {/*        <td className={item.status === 'Complete' ? 'item-complete-status' : 'item-status'}>*/}
          {/*            {item.status}*/}
          {/*        </td>*/}
          {/*    </tr>*/}
          {/*))}*/}
        </tbody>
      </Table>
      <button className="btn btn-primary px-5 d-block mt-5 back-btn">
        <NavLink to={"/account/settings"}>{t("Back")}</NavLink>
      </button>
    </div>
  );
};

export default TransactionHistory;
