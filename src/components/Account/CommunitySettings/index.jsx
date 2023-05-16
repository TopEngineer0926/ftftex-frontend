import "./index.scss";
import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useRef, useState } from "react";
import ApiService from "../../../services/apiService";
import { Spinner } from "react-bootstrap";
import { useSnackbar } from "notistack";
import { getTheme } from "../../../utils";
import { FTFTexContext } from "App";

const CommunitySettings = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [userData, setUserData] = useState({});
  const [userAvatar, setUserAvatar] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef(null);
  const [communityData, setCommunityData] = useState({
    nickname: "",
    bio: "",
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await ApiService.getUser(localStorage.getItem("userId"));
    const userData = response.data.userDetails[0];
    setUserData(userData);
    setUserAvatar(userData.avatar);
    setCommunityData({ nickname: userData.userName, bio: "" });
    setIsLoading(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file.name) {
      const name = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        email: userData.email,
        service: "register",
        password: userData.password,
        avatar: `https://staging-assets.ftftx.com/${file.name}`,
        fileType: file.type,
      };
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", localStorage.getItem("userId"));
      formData.append("name", JSON.stringify(name));
      const response = await ApiService.uploadFile(formData);
      // const data = {
      //   userId: localStorage.getItem("userId"),
      //   avatar: `https://staging-assets.ftftx.com/${file.name}`,
      // };
      // const response1 = await ApiService.changeAvatar(data);
      // if (response1.status === 200) {
      //   if (response.data.url) {
      //     setFtftexValue({
      //       ...ftftexValue,
      //       avatar: response.data.url,
      //     });
      //     enqueueSnackbar(
      //       t("account.community.You successfully updated your avatar"),
      //       {
      //         variant: "success",
      //       }
      //     );
      //   }
      // }
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner animation="border" variant="primary" className="loading" />
      ) : (
        <div className="container mt-4 mb-4 p-4">
          <div className="light-border-bottom">
            <h4
              className={`${
                getTheme() === "dark" ? "sub-title-dark" : "sub-title"
              }`}
            >
              {t("Community Settings")}
            </h4>
            <Divider />
          </div>
          <div className="row d-flex align-items-center setting-block">
            <div className="col-3">
              <div
                className={`${
                  getTheme() === "dark" ? "sub-point-dark" : "sub-point"
                }`}
              >
                {t("account.community.Profile Picture")}
              </div>
            </div>
            <div className="col-5">
              {/* {userAvatar.length > 0 ? (
                <img
                  src={userAvatar}
                  alt="avatar"
                  className="avatar"
                  width={50}
                  height={50}
                />
              ) : ( */}
              <span
                className="material-symbols-outlined align-self-center"
                style={{ fontSize: 35 }}
              >
                account_circle
              </span>
              {/* )} */}
            </div>
            <div className="col-4 d-flex justify-content-end">
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                hidden
              />
              <button
                className="btn mr-3 save-btn"
                onClick={() => inputRef.current?.click()}
              >
                {t("Edit")}
              </button>
            </div>
          </div>
          <div className="row d-flex align-items-center setting-block">
            <div className="col-3">
              <div
                className={`${
                  getTheme() === "dark" ? "sub-point-dark" : "sub-point"
                }`}
              >
                {t("account.community.Nickname")}
              </div>
            </div>
            <div className="col-5">
              <div className="d-flex flex-column">
                <input
                  className="form-control w-100"
                  style={{ height: "38px" }}
                  value={communityData.nickname}
                  onChange={(e) =>
                    setCommunityData({
                      ...communityData,
                      nickname: e.target.value,
                    })
                  }
                />
                {communityData.nickname.length > 25 && (
                  <span className="align-self-end helper-text">
                    {t("account.community.Maximum 25 letters")}
                  </span>
                )}
              </div>
            </div>
            {/*<div className="col-4">*/}
            {/*    <div className="d-flex justify-content-end">*/}
            {/*        <a className="btn btn-outlined mr-3">{t("account.community.Save")}</a>*/}
            {/*    </div>*/}
            {/*</div>*/}
          </div>
          <div className="row d-flex align-items-center setting-block">
            <div className="col-3">
              <div
                className={`${
                  getTheme() === "dark" ? "sub-point-dark" : "sub-point"
                }`}
              >
                {t("account.community.Bio")}
              </div>
            </div>
            <div className="col-5">
              <div className="d-flex flex-column">
                <textarea
                  className="form-control w-100 input-height"
                  style={{ height: "38px" }}
                  onChange={(e) =>
                    setCommunityData({
                      ...communityData,
                      bio: e.target.value,
                    })
                  }
                >
                  {communityData.bio}
                </textarea>
                {communityData.bio.length > 100 && (
                  <span className="align-self-end helper-text">
                    {t("account.community.Maximum 100 characters")}
                  </span>
                )}
              </div>
            </div>
            {/*<div className="col-4">*/}
            {/*    <div className="d-flex justify-content-end">*/}
            {/*        <a className="btn btn-outlined mr-3">{t("account.community.Save")}</a>*/}
            {/*    </div>*/}
            {/*</div>*/}
          </div>
          <div className="pb-2 light-border-bottom mt-2">
            <h4
              className={`${
                getTheme() === "dark" ? "sub-title-dark" : "sub-title"
              }`}
              style={{
                paddingBottom: "15px",
                paddingTop: "15px",
                marginBottom: 0,
              }}
            >
              {t("account.community.Notifications")}
            </h4>
            <Divider />
          </div>
          <div className="d-flex justify-content-between align-items-center mt-3 setting-block">
            <div className="d-flex">
              <div
                className={`${
                  getTheme() === "dark" ? "sub-point-dark" : "sub-point"
                }`}
              >
                {t("account.community.Posts & Comments")}
              </div>
              <span style={{ opacity: 0.5 }}>
                &nbsp; {t("account.community.(Likes and Comments)")}
              </span>
            </div>
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input form-control-lg"
                id="customSwitch1"
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitch1"
              ></label>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center setting-block">
            <p
              className={`${
                getTheme() === "dark" ? "sub-point-dark" : "sub-point"
              }`}
            >
              {t("account.community.New Followers")}
            </p>
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch2"
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitch2"
              ></label>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommunitySettings;
