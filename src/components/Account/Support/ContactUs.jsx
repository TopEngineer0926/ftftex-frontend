import { getTheme } from "../../../utils";
import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ContactDropdown } from "./ContactDropdown";
import { Dropdown, Modal } from "react-bootstrap";
import { categoryTopics } from "../../../data/categoryTopics";
import { useContext, useEffect, useState } from "react";
import { FTFTexContext } from "../../../App";
import { SuccessfulModal } from "./SuccessfulModal";

export const ContactUs = () => {
  const { t } = useTranslation();
  const ftftexValue = useContext(FTFTexContext);
  const [isMobile, setIsMobile] = useState(false);
  const [category, setCategory] = useState("Category");
  const [message, setMessage] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const email = "support@ftftex.com";

  useEffect(() => {
    setIsMobile(ftftexValue[0].isMobile);
  }, [ftftexValue[0].isMobile]);

  const handleSend = () => {
    category === "Category" ? setIsRequired(true) : setIsRequired(false);
    if (category !== "Category") {
      setIsSent(true);
    }
  };

  const handleCloseModal = () => {
    setIsSent(false);
    setCategory("Category");
    setMessage("");
  };

  return (
    <div className="container mt-4 mb-4 p-4">
      <div className="pb-2 light-border-bottom mt-2">
        <h4
          className={`${
            getTheme() === "dark" ? "sub-title-dark" : "sub-title"
          }`}
        >
          {t("account.support.Contact Us")}
        </h4>
        <Divider />
      </div>
      <div className="d-flex flex-column align-items-center">
        <h3>{t("account.support.Get in touch with us!")}</h3>
        <div className="text-center">
          {t("account.support.Our team")}
          <a
            href={`mailto:${email}?subject=${
              encodeURIComponent("FTFTEX contact") || ""
            }`}
            className="email"
          >
            {email}
          </a>
          {/*{t("account.support.Leave message")}*/}
        </div>
      </div>
      {/*    <div className="mt-3">{t("account.support.Your Message")}</div>*/}
      {/*    <div className="d-flex row align-items-center">*/}
      {/*        <Dropdown className="category-dropdown mr-3">*/}
      {/*            <Dropdown.Toggle as={ContactDropdown} id="dropdown-custom-components">*/}
      {/*                <div*/}
      {/*                    style={{color: `${category !== 'Category' && getTheme() === 'light' ? "#000" : category !== 'Category' && getTheme() === 'dark' ? '#C5C8C9' : ''}`}}>*/}
      {/*                    {category}</div>*/}
      {/*                <span*/}
      {/*                    className="material-symbols-outlined align-self-center"*/}
      {/*                    style={{fontSize: 26}}>*/}
      {/*    arrow_drop_down*/}
      {/*</span>*/}
      {/*            </Dropdown.Toggle>*/}
      {/*            <Dropdown.Menu*/}
      {/*                className={getTheme() === 'dark' ? "category-dropdown-menu-dark" : "category-dropdown-menu"}>*/}
      {/*                {categoryTopics.map((topic) => (*/}
      {/*                    <Dropdown.Item*/}
      {/*                        key={topic.id}*/}
      {/*                        eventKey={topic.id}*/}
      {/*                        className="category-dropdown-item"*/}
      {/*                        onClick={() => setCategory(topic.name)}*/}
      {/*                    >*/}
      {/*                        {topic.name}*/}
      {/*                    </Dropdown.Item>*/}
      {/*                ))}*/}
      {/*            </Dropdown.Menu>*/}
      {/*        </Dropdown>*/}
      {/*        {isRequired && <div className={'red-text'}>{t("Required")}</div>}*/}
      {/*    </div>*/}
      {/*    <div className="form-group mt-4 message-area">*/}
      {/*        <textarea className={getTheme() === 'dark' ? 'message-area-dark' : "message-area"} rows="10"*/}
      {/*                  onChange={e => setMessage(e.target.value)}>{message}</textarea>*/}
      {/*        <div*/}
      {/*            className="textarea-message">{message.length === 0 ? t('account.support.Maximum 1,500 characters')*/}
      {/*            : `${message.length}/1500`}*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*    {message.length === 0 ?*/}
      {/*        <a className="btn sent-btn-disable mt-3">{t("Send")}</a> :*/}
      {/*        <a className="btn save-btn sent-btn mt-3" onClick={handleSend}>{t("Send")}</a>*/}
      {/*    }*/}
      {/*</div>*/}
      <button className="btn btn-primary px-5 d-block mt-5 back-btn">
        <NavLink to={"/account/support"}>{t("Back")}</NavLink>
      </button>
      {/*<Modal show={isSent} onHide={handleCloseModal} centered>*/}
      {/*    <SuccessfulModal handleClose={handleCloseModal}/>*/}
      {/*</Modal>*/}
    </div>
  );
};
