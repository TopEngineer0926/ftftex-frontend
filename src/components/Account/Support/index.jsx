import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";

const Support = () => {
  const { t } = useTranslation();
  const FAQLink = "https://faq.ftftx.com/";

  return (
    <div className="container p-4">
      <div className="pb-2 light-border-bottom mt-2">
        <h4>{t("Support")}</h4>
        <Divider />
      </div>
      <a
        href={FAQLink}
        className="d-flex justify-content-between align-items-center py-2 mt-2"
      >
        <p>{t("account.support.Help Center")}</p>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 16, opacity: 0.4 }}
        >
          arrow_forward_ios
        </span>
      </a>
      <a className="d-flex justify-content-between align-items-center py-2">
        <p>{t("account.support.Contact Us")}</p>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 16, opacity: 0.4 }}
        >
          arrow_forward_ios
        </span>
      </a>
      <a
        href="/about/product-introduction"
        className="d-flex justify-content-between align-items-center py-2"
      >
        <p>{t("account.support.About Us")}</p>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 16, opacity: 0.4 }}
        >
          arrow_forward_ios
        </span>
      </a>
    </div>
  );
};

export default Support;
