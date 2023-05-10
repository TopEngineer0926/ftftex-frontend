import "./index.scss";
import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import useUserSystem from "../../../hooks/useUserSystem";

const Environment = () => {
  const { t, i18n } = useTranslation();
  const { getDeviceType, getUserIP, getResolution } = useUserSystem();
  const os = navigator.platform;
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  const [ipAddress, setIpAddress] = useState("");
  const [resolution, setResolution] = useState("");
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    setDeviceType(getDeviceType());
    setResolution(getResolution());
    setUserIP();
  }, []);

  const setUserIP = async () => {
    setIpAddress(await getUserIP());
  };

  return (
    <div className="container p-4">
      <div className="pb-2 light-border-bottom">
        <h4>{t("Environment")}</h4>
        <Divider />
      </div>
      <div className="d-flex py-2 mt-3">
        <div style={{ width: "50%" }}>
          <div className="row">
            <div className="col-5 pr-0">
              <p>{t("account.environment.Version")}</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">1.0.0</p>
            </div>
          </div>
          {/*<div className="row mt-3">*/}
          {/*    <div className="col-5 pr-0">*/}
          {/*        <p>{t("account.environment.Channel")}</p>*/}
          {/*    </div>*/}
          {/*    <div className="col-7">*/}
          {/*        <p className="sub-txt">{}</p>*/}
          {/*    </div>*/}
          {/*</div>*/}
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>{t("account.environment.Language")}</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">
                {i18n.language === "en" ? "English" : "Chinese"}
              </p>
            </div>
          </div>
          {/*<div className="row mt-3">*/}
          {/*    <div className="col-5 pr-0">*/}
          {/*        <p>{t("account.environment.Manufacturer")}</p>*/}
          {/*    </div>*/}
          {/*    <div className="col-7">*/}
          {/*        <p className="sub-txt">{}</p>*/}
          {/*    </div>*/}
          {/*</div>*/}
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>{t("account.environment.System")}</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">{os}</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>{t("account.environment.Model")}</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">{deviceType}</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>{t("account.environment.Resolution")}</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">{resolution}</p>
            </div>
          </div>
        </div>
        <div style={{ width: "50%" }}>
          <div className="row">
            <div className="col-5 pr-0">
              <p>{t("account.environment.Network")}</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">{connection.effectiveType}</p>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>{t("account.environment.IP")}</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">{ipAddress}</p>
            </div>
          </div>
          {/*<div className="row mt-3">*/}
          {/*    <div className="col-5 pr-0">*/}
          {/*        <p>{t("account.environment.Carrier")}</p>*/}
          {/*    </div>*/}
          {/*    <div className="col-7">*/}
          {/*        <p className="sub-txt">{}</p>*/}
          {/*    </div>*/}
          {/*</div>*/}
          <div className="row mt-3">
            <div className="col-5 pr-0">
              <p>{t("account.environment.Time Zone")}</p>
            </div>
            <div className="col-7">
              <p className="sub-txt">{timeZone}</p>
            </div>
          </div>
          {/*<div className="row mt-3">*/}
          {/*    <div className="col-5 pr-0">*/}
          {/*        <p>{t("account.environment.Login Devices")}</p>*/}
          {/*    </div>*/}
          {/*    <div className="col-7">*/}
          {/*        <p className="sub-txt">{}</p>*/}
          {/*    </div>*/}
          {/*</div>*/}
          {/*<div className="row mt-3">*/}
          {/*    <div className="col-5 pr-0">*/}
          {/*        <p>{t("account.environment.Request Time")}</p>*/}
          {/*    </div>*/}
          {/*    <div className="col-7">*/}
          {/*        <p className="sub-txt">{}</p>*/}
          {/*    </div>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default Environment;
