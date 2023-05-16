import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedIn } from "utils";
import EmptyAvatar from "assets/images/empty-avatar.png";
import ApiService from "../../../services/apiService";
import Post from "../Post";
import { refactorData } from "../../../utils/refactorPostData";
import { Spinner } from "react-bootstrap";

const Profile = () => {
  const [LoggedIn, setLoggedIn] = useState({ 0: "" });
  const [userPosts, setUserPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllPosts();
    const data = getLoggedIn();
    if (!data[0]) {
      navigate("/login");
    } else {
      setLoggedIn(data);
    }
  }, []);

  const getAllPosts = async () => {
    setIsLoading(true);
    const data = {
      userId: localStorage.getItem("userId"),
    };
    const response = await ApiService.getAllPostsByUser(data);
    if (response.status === 200) {
      setIsLoading(false);
      setUserPosts(refactorData(response.data.postsList));
    }
  };

  return (
    <>
      {LoggedIn[0] && (
        <div className="d-flex post-cont">
          <img src={EmptyAvatar} className="user-img user-img-xl" />
          <div className="post ml-3">
            <div className="profile flex-column justify-content-center">
              <h3 className="display-name mb-0">
                {LoggedIn[0]} {LoggedIn[1]}
              </h3>
              <p className="user-name ml-0">
                @{LoggedIn[0].toLowerCase()}_{LoggedIn[1].toLowerCase()}
              </p>
            </div>
          </div>
        </div>
      )}
      {isLoading ? (
        <Spinner
          animation="border"
          variant="primary"
          className="d-flex align-items-center m-auto mt-2"
        />
      ) : (
        <div className="d-flex post-cont flex-column">
          {userPosts.length === 0 ? (
            <p className="my-4 text-center w-100">No posts yet</p>
          ) : (
            <Post posts={userPosts} />
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
