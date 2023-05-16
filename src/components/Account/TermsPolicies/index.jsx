import { useTranslation } from "react-i18next";
import { Divider } from "@mui/material";
import { getTheme } from "../../../utils";

const TermsPolicies = () => {
  const { t } = useTranslation();
  return (
    <div className="container mt-4 mb-4 p-4">
      <div className="pb-2 light-border-bottom mt-2 pointer">
        <h4
          className={`${
            getTheme() === "dark" ? "sub-title-dark" : "sub-title"
          }`}
        >
          {t("Terms & Policies")}
        </h4>
        <Divider />
      </div>
      <a
        href="terms-policies/aml-policy"
        className="d-flex justify-content-between align-items-center mt-2 setting-block"
      >
        <div
          className={`${
            getTheme() === "dark" ? "sub-point-dark" : "sub-point"
          }`}
        >
          {t("account.terms.Anti Money Laundering (AML)")}
        </div>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 26, opacity: 0.4 }}
        >
          chevron_right
        </span>
      </a>
      <a
        href="terms-policies/privacy-policy"
        className="d-flex justify-content-between align-items-center mt-2 setting-block"
      >
        <div
          className={`${
            getTheme() === "dark" ? "sub-point-dark" : "sub-point"
          }`}
        >
          {t("account.terms.Privacy Policy")}
        </div>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 26, opacity: 0.4 }}
        >
          chevron_right
        </span>
      </a>
      <a
        href="terms-policies/terms-service"
        className="d-flex justify-content-between align-items-center mt-2 setting-block"
      >
        <div
          className={`${
            getTheme() === "dark" ? "sub-point-dark" : "sub-point"
          }`}
        >
          {t("account.terms.Terms of Service")}
        </div>
        <span
          className="material-symbols-outlined acc-box-i align-self-center ml-auto"
          style={{ fontSize: 26, opacity: 0.4 }}
        >
          chevron_right
        </span>
      </a>
    </div>
  );
};

export default TermsPolicies;
