import "./index.scss";
import { useTranslation } from "react-i18next";
import { NavLink, Outlet } from "react-router-dom";
import TradingViewTicker from "components/Common/TradingViewTicker";
import TrendingCoins from "components/TrendingCoins";

const Community = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-full">
      <TradingViewTicker />
      <div className="container mt-2">
        <div className="row">
          <div className="col-lg-2 " style={{ position: "sticky", top: 0 }}>
            <h3 className="s-bld mt-3">{t("Community")}</h3>
            <div className="d-flex d-lg-block mb-4">
              <NavLink className="btn sub-menu-btn w-100" to="/community/feed">
                <span className="material-symbols-outlined">rss_feed</span>
                <span className="ml-2">{t("Feed")}</span>
              </NavLink>
              <NavLink
                className="btn sub-menu-btn w-100"
                to="/community/notifications"
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="ml-2">{t("Notifications")}</span>
              </NavLink>
              <NavLink
                className="btn sub-menu-btn w-100"
                to="/community/profile"
              >
                <span className="material-symbols-outlined">person</span>
                <span className="ml-2">{t("Profile")}</span>
              </NavLink>
            </div>
          </div>
          <div
            className="col-lg-7 wt-box rounded-0 mb-5"
            style={{ overflow: "visible" }}
          >
            <Outlet />
          </div>
          <div className="col-md-3">
            <TrendingCoins ViewType={"widget"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
