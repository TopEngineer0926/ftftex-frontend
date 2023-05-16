import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { AboutUsSupport } from "./AboutUsSupport";
import { getTheme } from "../../../utils";

const Support = () => {
  const { t } = useTranslation();
  const [isAboutUsOpen, setIsAboutUsOpen] = useState(false);
  const FAQLink = "https://faq.ftftx.com/";

  return (
    <div className="container mt-4 mb-4 p-4">
      <div className="pb-2 light-border-bottom mt-2">
        <h4
          className={`${
            getTheme() === "dark" ? "sub-title-dark" : "sub-title"
          }`}
        >
          {t("Support")}
        </h4>
        <Divider />
      </div>
      <a
        href={FAQLink}
        className="d-flex justify-content-between align-items-center mt-2 setting-block"
      >
        <div
          className={`${
            getTheme() === "dark" ? "sub-point-dark" : "sub-point"
          }`}
        >
          {t("account.support.Help Center")}
        </div>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 26, opacity: 0.4 }}
        >
          chevron_right
        </span>
      </a>
      <a
        href={"support/contact-us"}
        className="d-flex justify-content-between align-items-center mt-2 setting-block"
      >
        <div
          className={`${
            getTheme() === "dark" ? "sub-point-dark" : "sub-point"
          }`}
        >
          {t("account.support.Contact Us")}
        </div>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 26, opacity: 0.4 }}
        >
          chevron_right
        </span>
      </a>
      <a
        href={"support/about-us"}
        className="d-flex justify-content-between align-items-center mt-2 setting-block"
      >
        <div
          className={`${
            getTheme() === "dark" ? "sub-point-dark" : "sub-point"
          }`}
        >
          {t("account.support.About Us")}
        </div>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 26, opacity: 0.4 }}
        >
          chevron_right
        </span>
      </a>
      {isAboutUsOpen && <AboutUsSupport />}
    </div>
  );
};

export default Support;
