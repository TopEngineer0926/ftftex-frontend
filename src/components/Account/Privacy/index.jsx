import "./index.scss";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Divider } from "@mui/material";


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
    <div className="container p-4">
      <div className="pb-2 light-border-bottom">
        <h4>{t("Privacy")}</h4>
        <Divider />
      </div>
      <h4 className="mt-4">{t("account.privacy.System Permissions")}</h4>
      <div className="row py-2 mt-4">
        <div className="col-10">
          <div className="d-flex align-items-center">
            <p className="mr-3">{t("Location")}</p>
            <p className="small-txt">
              Lorem ipsum dolor sit amet,eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="col-2">
          <div className="d-flex justify-content-end">
            <div
              className={`switch-container ${isGetLocation ? "on" : "off"}`}
              onClick={requestLocationPermission}
            >
              <div className="switch-button" />
            </div>
          </div>
        </div>
      </div>
      <div className="row py-2 mt-2">
        <div className="col-10">
          <div className="d-flex align-items-center">
            <p className="mr-3">{t("account.privacy.Camera")}</p>
            <p className="small-txt">
              Lorem ipsum dolor sit amet,eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className="col-2">
          <div className="d-flex justify-content-end">
            <div
              className={`switch-container ${isGetCamera ? "on" : "off"}`}
              onClick={requestCameraPermission}
            >
              <div className="switch-button" />
            </div>
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
