import "./index.scss";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LogoImage from "assets/images/logo.svg";
import FacebookIcon from "assets/images/social/facebook-01.svg";
import TwitterIcon from "assets/images/social/Twitter-03.svg";
import LinkedinIcon from "assets/images/social/Linkedin-04.svg";
import InstagramIcon from "assets/images/social/Instagram-02.svg";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img src={LogoImage} height="50" />
            <p className="mt-3">{t("footer TXT")}</p>
          </div>
          <div className="col-md-4 f-list offset-md-1">
            <h5 className="text-white font-weight-bold">{t("About us")}</h5>
            <NavLink className="" to="about/product-introduction">
              <p>{t("Product Introduction")}</p>
            </NavLink>
            <NavLink className="" to="about/service-terms">
              <p>{t("Service Terms")}</p>
            </NavLink>
            <NavLink className="" to="about/aml-policy">
              <p>{t("Anti-Money Laundering (AML) Policy")}</p>
            </NavLink>
            <NavLink className="" to="about/privacy-policy">
              <p>{t("Privacy Policy")}</p>
            </NavLink>
          </div>
          <div className="col-md-3 f-list">
            <div className="social d-flex">
              <a href="https://www.facebook.com/ftftex" target="_blank">
                <img src={FacebookIcon} height={40} />
              </a>
              <a
                href="https://twitter.com/ftftex"
                target="_blank"
                className="ml-4"
              >
                <img src={TwitterIcon} height={40} />
              </a>
              <a
                href="https://www.linkedin.com/company/ftftx/"
                target="_blank"
                className="ml-4"
              >
                <img src={LinkedinIcon} height={40} />
              </a>
              <a
                href="https://www.instagram.com/ftftex/"
                target="_blank"
                className="ml-4"
              >
                <img src={InstagramIcon} height={45} />
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="text-center mb-0">UAB FTFTex TRADING</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="btm-footer">
              <p className="text-center mb-0">
                Copyright © 2018-2023 ftftex.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
