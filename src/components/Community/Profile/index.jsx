import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLoggedIn } from "utils";
import EmptyAvatar from "assets/images/empty-avatar.png";

const Profile = () => {
  const [LoggedIn, setLoggedIn] = useState({ 0: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const data = getLoggedIn();
    if (!data) {
      navigate("/login");
    } else {
      setLoggedIn({ 0: getLoggedIn() });
    }
  }, []);

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
      <div className="d-flex post-cont">
        <p className="my-4 text-center w-100">Nothing Here</p>
      </div>
    </>
  );
};

export default Profile;
