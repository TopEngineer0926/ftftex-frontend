import { Card } from "react-bootstrap";
import EmptyAvatar from "../../../assets/images/empty-avatar.png";
import ApiService from "../../../services/apiService";
import { useEffect, useState } from "react";

export const Comment = ({ comment, date }) => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    getUser(comment.userId);
  }, []);

  const getUser = async () => {
    const response = await ApiService.getUser(comment.userId);
    if (response.status === 200) {
      const data = response.data.userDetails[0];
      setUserName(data ? data.firstName + " " + data.lastName : "unknown user");
    }
  };

  return (
    <Card className="mt-3">
      <Card.Body>
        <Card.Title>
          <div className="d-flex post-cont-comment flex-column">
            <div className="post ml-3">
              <div className="profile align-items-center">
                <img
                  src={EmptyAvatar}
                  className="user-img mr-2"
                  alt="user_img"
                />
                <p className="display-name">{userName}</p>
                <p className="user-name">{"@" + userName.replace(" ", "")}</p>
                <p className="posted-time">{date.fromNow()}</p>
              </div>
            </div>
          </div>
        </Card.Title>
        <Card.Text className="ml-4">{comment.comment}</Card.Text>
      </Card.Body>
    </Card>
  );
};
