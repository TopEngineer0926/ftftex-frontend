import { useTranslation } from "react-i18next";
import { ReactComponent as FacebookIcon } from "../../../assets/images/social/facebook-01.svg";
import { ReactComponent as TwitterIcon } from "../../../assets/images/social/Twitter-03.svg";
import { ReactComponent as LinkedinIcon } from "../../../assets/images/social/Linkedin-04.svg";
import { ReactComponent as InstagramIcon } from "../../../assets/images/social/Instagram-02.svg";
import "./index.scss";
import { Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import { getTheme } from "../../../utils";

export const AboutUsSupport = () => {
  const { t } = useTranslation();

  return (
    <div className="wt-box mr-4 p-4">
      <div style={{ color: "#ADB0B2" }}>{t("About text")}</div>
      <div className="d-flex align-items-end justify-content-between mt-lg-3">
        <div style={{ color: "#0020CE" }}>
          © 2023 UAB FTFTex. All Rights Reserved
        </div>
        <div style={{ color: "#0020CE" }} className="d-flex align-items-end">
          <div>www.ftftex.com</div>
          <div className="col-md-3 f-list">
            <div className="social d-flex">
              <a href="https://www.facebook.com/ftftex" target="_blank">
                <FacebookIcon heigth={40} className="icon-social" />
              </a>
              <a
                href="https://www.instagram.com/ftftex/"
                target="_blank"
                className="ml-4"
              >
                <InstagramIcon height={40} className="icon-social" />
              </a>
              <a
                href="https://www.linkedin.com/company/ftftx/"
                target="_blank"
                className="ml-4"
              >
                <LinkedinIcon height={40} className="icon-social" />
              </a>
              <a
                href="https://twitter.com/ftftex"
                target="_blank"
                className="ml-4"
              >
                <TwitterIcon height={40} className="icon-social" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
