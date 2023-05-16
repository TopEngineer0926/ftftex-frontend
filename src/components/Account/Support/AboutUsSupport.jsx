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
    <div className="container p-4">
      <div className="pb-2 light-border-bottom mt-2 pointer">
        <h4>{t("account.terms.Anti Money Laundering (AML)")}</h4>
        <Divider />
      </div>
      <div
        className="mt-3"
        style={{
          color: `${getTheme() === "dark" ? "#F5F5F5FF" : "#585B5D"}`,
          overflow: "auto",
          height: "600px",
        }}
      >
        <p>{t("About text")}</p>

        <h3>{t("Fast Market Monitoring")}</h3>
        <p>
          {t(
            "The most complete currencies and exchange data. Collect the global high-quality currency information, directly connect the market data of hundreds of mainstream exchanges, and synchronize the market information 24 hours."
          )}
        </p>

        <h3>{t("Trading Views of Analyst")}</h3>
        <p>
          {t(
            "We have the most active trading community for traders and investors. Users can find trading views in the community and share their own trading strategies. Thousands of market participants freely discuss, share and learn together to make the transaction better and better. Analyze the digital asset market comprehensively by professional technology to take you through the bull market and bear market"
          )}
        </p>

        <h3>{t("Professional K - line Data")}</h3>
        <p>
          {t(
            "With independent R&D and all-round technical index assistance, we provide stable and real-time data and professional K-line chart, covering rich technical indexes and marking tools, and the trend forecast is clear at a glance."
          )}
        </p>

        <h3>{t("Abnormal Change Reminder of Price")}</h3>
        <p>
          {t(
            "We provide top-notch financial market tools for users, such as smart stock staring, personalized price reminders,and early warning of market changes, so that investors can trade faster."
          )}
        </p>
      </div>
      <button className="btn btn-primary px-5 d-block mt-5 back-btn">
        <NavLink to={"/account/support"}>{t("Back")}</NavLink>
      </button>
    </div>
    // <div className="wt-box mr-4 p-4">
    //     <div style={{color: '#ADB0B2'}}>
    //         {t("About text")}
    //     </div>
    //     <div className="d-flex align-items-end justify-content-between mt-lg-3">
    //     <div style={{color: '#0020CE'}}>© 2023 UAB FTFTex. All Rights Reserved</div>
    //         <div style={{color: '#0020CE'}}  className="d-flex align-items-end">
    //             <div>www.ftftex.com</div>
    //             <div className="col-md-3 f-list">
    //                 <div className="social d-flex">
    //                     <a href="https://www.facebook.com/ftftex" target="_blank">
    //                         <FacebookIcon heigth={40} className="icon-social"/>
    //                     </a>
    //                     <a
    //                         href="https://www.instagram.com/ftftex/"
    //                         target="_blank"
    //                         className="ml-4"
    //                     >
    //                         <InstagramIcon height={40} className="icon-social"/>
    //                     </a>
    //                     <a
    //                         href="https://www.linkedin.com/company/ftftx/"
    //                         target="_blank"
    //                         className="ml-4"
    //                     >
    //                         <LinkedinIcon height={40} className="icon-social"/>
    //                     </a>
    //                     <a
    //                         href="https://twitter.com/ftftex"
    //                         target="_blank"
    //                         className="ml-4"
    //                     >
    //                         <TwitterIcon height={40} className="icon-social"/>
    //                     </a>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
  );
};
