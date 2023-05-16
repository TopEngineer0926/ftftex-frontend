import "./index.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import { getTheme } from "../../../utils";

const Privacy = () => {
  const { t } = useTranslation();
  const [isGetLocation, setIsGetLocation] = useState(false);
  const [isGetCamera, setIsGetCamera] = useState(false);
  const [isSystemPermission, setIsSystemPermission] = useState(false);
  const [isFileSystemPermission, setIsFileSystemPermission] = useState(false);

  useEffect(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then((permissionStatus) => {
        setIsGetLocation(permissionStatus.state === "granted");
      });
    navigator.permissions.query({ name: "camera" }).then((permissionStatus) => {
      setIsGetCamera(permissionStatus.state === "granted");
    });
  });

  const requestLocationPermission = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsGetLocation(true);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setIsGetCamera(true);

      // Attach the camera stream to the video element
      // videoRef.current.srcObject = stream;
    } catch (error) {
      console.error("Failed to start camera:", error);
    }
  };

  const requestSystemPermission = async () => {};

  const requestFileSystemPermission = async () => {};

  return (
    <div className="container mt-4 mb-4 p-4">
      <div className="pb-2 light-border-bottom">
        <h4
          className={`${
            getTheme() === "dark" ? "sub-title-dark" : "sub-title"
          }`}
        >
          {t("Privacy")}
        </h4>
        <Divider />
      </div>
      <h4
        className={`mt-3 ${
          getTheme() === "dark" ? "sub-title-dark" : "sub-title"
        }`}
      >
        {t("account.privacy.System Permissions")}
      </h4>
      <div className="row mt-3">
        <div className="col-10">
          <div className="d-flex align-items-center setting-block mt-2">
            <div
              className={`mr-3 ${
                getTheme() === "dark" ? "sub-point-dark" : "sub-point"
              }`}
            >
              {t("Location")}
            </div>
            <div className="small-txt">
              Lorem ipsum dolor sit amet,eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
          </div>
        </div>
        <div className="col-2 d-flex justify-content-end align-items-center">
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input form-control-lg"
              id="customSwitch1"
              checked={isGetLocation}
              onClick={requestLocationPermission}
            />
            <label
              className="custom-control-label"
              htmlFor="customSwitch1"
            ></label>
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-10">
          <div className="d-flex align-items-center setting-block mt-2">
            <div
              className={`mr-3 ${
                getTheme() === "dark" ? "sub-point-dark" : "sub-point"
              }`}
            >
              {t("account.privacy.Camera")}
            </div>
            <div className="small-txt">
              Lorem ipsum dolor sit amet,eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
          </div>
        </div>
        <div className="col-2 col-2 d-flex justify-content-end align-items-center">
          <div className="custom-control custom-switch">
            <input
              type="checkbox"
              className="custom-control-input form-control-lg"
              id="customSwitch1"
              checked={isGetCamera}
              onClick={requestCameraPermission}
            />
            <label
              className="custom-control-label"
              htmlFor="customSwitch1"
            ></label>
          </div>
        </div>
      </div>
      {/*<div className="row py-2 mt-2">*/}
      {/*    <div className="col-10">*/}
      {/*        <div className="d-flex align-items-center">*/}
      {/*            <p className="mr-3">{t("account.privacy.File Information and Access")}</p>*/}
      {/*            <p className="small-txt">*/}
      {/*                Lorem ipsum dolor sit amet,eiusmod tempor incididunt ut labore et*/}
      {/*                dolore magna aliqua.*/}
      {/*            </p>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*    <div className="col-2">*/}
      {/*        <div className="d-flex justify-content-end">*/}
      {/*            <div className={`switch-container ${isFileSystemPermission ? 'on' : 'off'}`}*/}
      {/*                 onClick={requestFileSystemPermission}>*/}
      {/*                <div className="switch-button"/>*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</div>*/}
      {/*<div className="row py-2 mt-2">*/}
      {/*    <div className="col-10">*/}
      {/*        <div className="d-flex align-items-center">*/}
      {/*            <p className="mr-3">{t("account.privacy.Phone Information")}</p>*/}
      {/*            <p className="small-txt">*/}
      {/*                Lorem ipsum dolor sit amet,eiusmod tempor incididunt ut labore et*/}
      {/*                dolore magna aliqua.*/}
      {/*            </p>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*    <div className="col-2">*/}
      {/*        <div className="d-flex justify-content-end">*/}
      {/*            <div className={`switch-container off`}>*/}
      {/*                <div className="switch-button"/>*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</div>*/}
      {/*<div className="row py-2 mt-2 mb-4">*/}
      {/*    <div className="col-10">*/}
      {/*        <div className="d-flex align-items-center">*/}
      {/*            <p className="mr-3">{t("account.privacy.System Settings")}</p>*/}
      {/*            <p className="small-txt">*/}
      {/*                Lorem ipsum dolor sit amet,eiusmod tempor incididunt ut labore et*/}
      {/*                dolore magna aliqua.*/}
      {/*            </p>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*    <div className="col-2">*/}
      {/*        <div className="d-flex justify-content-end">*/}
      {/*            <div className={`switch-container ${isSystemPermission ? 'on' : 'off'}`}*/}
      {/*                 onClick={requestSystemPermission}>*/}
      {/*                <div className="switch-button"/>*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</div>*/}

      {/*<div className="row py-2 mt-4">*/}
      {/*    <div className="col-3">*/}
      {/*        <p>{t("account.privacy.Clear Cache")}</p>*/}
      {/*    </div>*/}
      {/*    <div className="col-5">*/}
      {/*        <p style={{fontWeight: 700}}>3.8 Mb</p>*/}
      {/*    </div>*/}
      {/*    <div className="col-4">*/}
      {/*        <div className="d-flex justify-content-end">*/}
      {/*            <a className="btn btn-outlined">{t("account.privacy.Clear")}</a>*/}
      {/*        </div>*/}
      {/*    </div>*/}
      {/*</div>*/}
    </div>
  );
};

export default Privacy;
