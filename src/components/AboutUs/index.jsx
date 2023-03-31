import "./index.scss";
import { NavLink, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-full ">
      <div className="container">
        <div className="wt-box my-5" style={{ padding: 30 }}>
          <div className="d-flex flex-wrap mt-4 mt-md-0">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "sub-menu-btn btn mr-md-4 px-4 sub-menu-btn-activate"
                  : "sub-menu-btn btn mr-md-4 px-4 "
              }
              to="/about/product-introduction"
            >
              {t("About us")}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "sub-menu-btn btn mr-md-4 px-4 sub-menu-btn-activate"
                  : "sub-menu-btn btn mr-md-4 px-4 "
              }
              to="/about/service-terms"
            >
              {t("Terms")}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "sub-menu-btn btn mr-md-4 px-4 sub-menu-btn-activate"
                  : "sub-menu-btn btn mr-md-4 px-4 "
              }
              to="/about/aml-policy"
            >
              {t("AML Policy")}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "sub-menu-btn btn mr-md-4 px-4 sub-menu-btn-activate"
                  : "sub-menu-btn btn mr-md-4 px-4 "
              }
              to="/about/privacy-policy"
            >
              {t("Privacy Policy")}
            </NavLink>
          </div>
          <hr />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
