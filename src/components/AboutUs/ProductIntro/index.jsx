import "./index.scss";
import { useTranslation } from "react-i18next";

const ProductIntro = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("About us")}</h1>
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
    </>
  );
};

export default ProductIntro;
