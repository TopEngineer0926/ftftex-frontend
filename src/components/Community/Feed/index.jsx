import { useEffect, useRef, useState } from "react";
import ApiService from "services/apiService";
import moment from "moment";

import User1Image from "assets/images/community/user-1.png";
import User2Image from "assets/images/community/user-2.png";
import User3Image from "assets/images/community/user-3.png";
import Post1Image from "assets/images/community/post-1.png";
import Post2Image from "assets/images/community/post-2.png";
import Post3Image from "assets/images/community/post-3.png";
import { getLoggedIn, getTheme } from "../../../utils";
import { Button, Modal, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Post from "../Post";
import { refactorData } from "../../../utils/refactorPostData";

const Feed = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [createPostText, setCreatePostText] = useState("");
  const [postImg, setPostImg] = useState(null);
  const [postSubject, setPostSubject] = useState("");
  const [LogginIn, setLogginIn] = useState([]);
  const [isCreatePost, setIsCreatePost] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserData();
    const res = getLoggedIn();
    if (res[0]) {
      setLogginIn(res);
    }
  }, []);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getUserData = async () => {
    const response = await ApiService.getUser(localStorage.getItem("userId"));
    const userData = response.data.userDetails[0];
    setUserPassword(userData.password);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file.name) {
      const name = {
        firstName: LogginIn[0],
        lastName: LogginIn[1],
        phone: LogginIn[3],
        email: LogginIn[4],
        service: "register",
        password: userPassword,
        avatar: `https://staging-assets.ftftx.com/${file.name}`,
        fileType: file.type,
      };
      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", localStorage.getItem("userId"));
      formData.append("name", JSON.stringify(name));
      const response = await ApiService.uploadFile(formData);
      setPostImg(response.data.url);
    }
  };

  const handleSavePost = async () => {
    const data = {
      userId: localStorage.getItem("userId"),
      subject: postSubject,
      message: createPostText,
      userName: LogginIn[0] + " " + LogginIn[1],
      img: "https://staging-assets.ftftx.com/" + postImg,
    };

    const res = await ApiService.savePost(data);
    if (res.status === 200) {
      setCreatePostText("");
      setPostImg("");
      setPostSubject("");
      setIsCreatePost(false);
      getAllPosts();
    }
  };

  const getAllPosts = async () => {
    setIsLoading(true);
    const response = await ApiService.getAllPostsByUser({ userId: "" });
    if (response.status === 200) {
      setPosts(refactorData(response.data.postsList));
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button className="mt-3" onClick={() => setIsCreatePost(true)}>
        Create Post
      </Button>
      <Modal show={isCreatePost} onHide={() => setIsCreatePost(false)} centered>
        <div className="container p-4">
          <div className="d-flex flex-column align-items-center justify-content-center">
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Type your post here
            </div>
            <div className="row d-flex align-items-center setting-block">
              <div className="col-3">
                <div
                  className={`${
                    getTheme() === "dark" ? "sub-point-dark" : "sub-point"
                  }`}
                >
                  {t("Subject")}
                </div>
              </div>
              <div className="d-flex flex-column col-5">
                <input
                  className="form-control w-100"
                  style={{ height: "38px" }}
                  value={postSubject}
                  onChange={(e) => setPostSubject(e.target.value)}
                />
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
                  className="d-flex btn save-btn"
                  onClick={() => inputRef.current?.click()}
                >
                  {t("Add image")}
                </button>
              </div>
            </div>
            <textarea
              className="form-control w-100 mt-2"
              onChange={(e) => setCreatePostText(e.target.value)}
            >
              {createPostText}
            </textarea>
            <div className="d-flex mb-2 mt-4">
              <a className="btn save-btn mr-2" onClick={handleSavePost}>
                {t("Save")}
              </a>
            </div>
          </div>
        </div>
      </Modal>
      {isLoading ? (
        <Spinner
          animation="border"
          variant="primary"
          className="d-flex align-items-center m-auto"
        />
      ) : (
        <Post posts={posts} />
      )}
    </>
  );
};
export default Feed;
