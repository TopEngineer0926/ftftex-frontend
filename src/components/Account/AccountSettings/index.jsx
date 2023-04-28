import { NavLink, useNavigate, Outlet } from "react-router-dom";
import "./index.scss";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import Logout from "../Logout";
import { useState } from "react";

const AccountSettings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const links = [
    { title: "Account Settings", fragment: "/account-settings" },
    { title: "Two", fragment: "two" },
  ];

  const onLogout = () => {
    setShowModal(true);
    navigate("/account-settings");
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-full">
      <div className="container mt-4">
        <div className="row">
          <div
            className="col-lg-3 wt-box ml-4 mr-4 p-4"
            style={{ position: "sticky", top: 0 }}
          >
            <div className="d-flex align-items-center mb-2">
              <div className="mr-2">
                <span
                  className="material-symbols-outlined align-self-center"
                  style={{ fontSize: 35 }}
                >
                  account_circle
                </span>
              </div>
              <div className="d-flex flex-column">
                <div className="d-flex">
                  <p className="tab-text m-0 mr-1">UID: 123 456 678</p>
                  <p className="tab-text txt-green m-0">Verified</p>
                </div>
                <h4 className="s-bld">{t("My Account")}</h4>
              </div>
            </div>
            <div className="d-flex d-lg-block mb-4">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "btn sub-menu-btn w-100 radius-10 btn-primary"
                    : "btn sub-menu-btn w-100 radius-10"
                }
                to={"/account-settings/settings"}
              >
                <span className="material-symbols-outlined">rss_feed</span>
                <span className="ml-4">{t("Account Settings")}</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "btn sub-menu-btn light-border-bottom w-100 radius-10 btn-primary"
                    : "btn sub-menu-btn light-border-bottom w-100 radius-10"
                }
                to={"/account-settings/community-settings"}
              >
                <span className="material-symbols-outlined">rss_feed</span>
                <span className="ml-4">{t("Community Settings")}</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "btn sub-menu-btn light-border-bottom w-100 radius-10 btn-primary"
                    : "btn sub-menu-btn light-border-bottom w-100 radius-10"
                }
                to={"/account-settings/security"}
              >
                <span className="material-symbols-outlined">rss_feed</span>
                <span className="ml-4">{t("Security")}</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "btn sub-menu-btn light-border-bottom w-100 radius-10 btn-primary"
                    : "btn sub-menu-btn light-border-bottom w-100 radius-10"
                }
                to={"/account-settings/privacy"}
              >
                <span className="material-symbols-outlined">rss_feed</span>
                <span className="ml-4">{t("Privacy")}</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "btn sub-menu-btn light-border-bottom w-100 radius-10 btn-primary"
                    : "btn sub-menu-btn light-border-bottom w-100 radius-10"
                }
                to={"/account-settings/environment"}
              >
                <span className="material-symbols-outlined">rss_feed</span>
                <span className="ml-4">{t("Environment")}</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "btn sub-menu-btn light-border-bottom w-100 radius-10 btn-primary"
                    : "btn sub-menu-btn light-border-bottom w-100 radius-10"
                }
                to={"/account-settings/support"}
              >
                <span className="material-symbols-outlined">rss_feed</span>
                <span className="ml-4">{t("Support")}</span>
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "btn sub-menu-btn light-border-bottom w-100 radius-10 btn-primary"
                    : "btn sub-menu-btn light-border-bottom w-100 radius-10"
                }
                to={"/account-settings/terms-policies"}
              >
                <span className="material-symbols-outlined">rss_feed</span>
                <span className="ml-4">{t("Terms & Policies")}</span>
              </NavLink>
              <div
                className="btn sub-menu-btn w-100 radius-10"
                onClick={onLogout}
              >
                <span className="material-symbols-outlined">rss_feed</span>
                <span className="ml-4">{t("Logout")}</span>
              </div>
            </div>
            <p className="tab-text m-0 mr-1">Version 1.0.0</p>
          </div>
          <div className="col-lg-8 wt-box" style={{ overflow: "visible" }}>
            <Outlet />
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Logout />
      </Modal>
    </div>
  );
};

export default AccountSettings;
