import { NavLink, useNavigate, Outlet, useLocation } from "react-router-dom";
import "./index.scss";
import { useTranslation } from "react-i18next";
import { Modal } from "react-bootstrap";
import Logout from "../Logout";
import { useContext, useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { accountMenuItems } from "../../../data/accountMenuItems";
import { getLoggedIn } from "../../../utils";
import { FTFTexContext } from "../../../App";

const AccountSettings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ftftexValue = useContext(FTFTexContext);
  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userUID, setUserUID] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const isLoggedIn = getLoggedIn();
    if (!isLoggedIn || isLoggedIn.length !== 9) {
      navigate("/login");
    }
  });

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    setIsMobile(ftftexValue[0].isMobile);
  }, [ftftexValue[0].isMobile]);

  useEffect(() => {
    if (queryParams.get("logout") === "true") {
      setShowModal(true);
    }
  });

  const onLogout = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    queryParams.delete("logout");
    navigate("/account/settings");
  };

  const getUserInfo = () => {
    const data = getLoggedIn();
    setUserUID(data[8]);
    setIsVerified(data[6] === "verified");
  };

  return (
    <div className="min-h-full">
      <div className="container mt-4 mb-4 wrapper">
        <div className="row">
          <div
            className="col-lg-3 wt-box mr-4 p-4"
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
                  <p className="tab-text m-0 mr-1">UID: {userUID}</p>
                  <p className="tab-text txt-green m-0">
                    {isVerified ? "Verified" : "Not verified"}
                  </p>
                </div>
                <h4 className="s-bld">{t("My Account")}</h4>
              </div>
            </div>
            <div className="d-flex d-lg-block mb-4">
              {accountMenuItems.map((item, index) => (
                <>
                  {item.title !== "Logout" ? (
                    <NavLink
                      className={({ isActive }) =>
                        isMobile && isActive
                          ? "btn w-100 flex-column align-items-center sub-menu-btn-active-mobile p-2 ml-2"
                          : isActive
                          ? "btn w-100 sub-menu-btn-active"
                          : !isMobile
                          ? "btn sub-menu-btn w-100 radius-10"
                          : "btn w-100 flex-column align-items-center p-2 ml-2"
                      }
                      to={item.route}
                      key={index}
                    >
                      <span className="material-symbols-outlined">
                        {item.icon}
                      </span>
                      <span className={isMobile ? "" : "ml-4"}>
                        {t(item.title)}
                      </span>
                    </NavLink>
                  ) : (
                    <div
                      key={index}
                      className={
                        isMobile
                          ? "btn w-100 flex-column align-items-center p-2 ml-2"
                          : "btn sub-menu-btn w-100 radius-10"
                      }
                      onClick={onLogout}
                    >
                      <span className="material-symbols-outlined">
                        {item.icon}
                      </span>
                      <span className="ml-4">{t(item.title)}</span>
                    </div>
                  )}
                  {item.title !== "Logout" && <Divider />}
                </>
              ))}
            </div>
            <p className="tab-text m-0 mr-1">Version 1.0.0</p>
          </div>
          <div className="col-lg-8 wt-box" style={{ overflow: "visible" }}>
            <Outlet />
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Logout handleClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default AccountSettings;
