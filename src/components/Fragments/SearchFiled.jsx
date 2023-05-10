import { Dropdown } from "react-bootstrap";

export const SearchFiled = ({ searchValue, handleSearch }) => (
  <Dropdown.Item>
    <div
      style={{ position: "sticky", top: "-0.5rem" }}
      className="search-wrapper"
    >
      <input
        value={searchValue}
        placeholder="Search"
        onChange={handleSearch}
        className="search-input"
      />
      <span className="material-symbols-outlined search-icon">search</span>
    </div>
  </Dropdown.Item>
);
