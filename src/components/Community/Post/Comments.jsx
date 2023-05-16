import { Button, Card, Form, Spinner } from "react-bootstrap";
import { useState } from "react";
import ApiService from "../../../services/apiService";
import moment from "moment/moment";
import EmptyAvatar from "../../../assets/images/empty-avatar.png";
import { getLoggedIn } from "../../../utils";
import { Comment } from "./Comment";

export const Comments = ({ id, userId, likes, getDetails, comments }) => {
  const [comment, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const data = {
      postId: id,
      userId: localStorage.getItem("userId"),
      likes: likes,
      comment: comment,
    };
    const response = await ApiService.commentPost(data);
    if (response.status === 200) {
      setComment("");
      getDetails();
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-3">
      <div>
        <p>Leave a comment:</p>
        <Form.Control
          as="textarea"
          rows={3}
          value={comment}
          onChange={handleCommentChange}
        />
        <Button variant="primary" className="mt-2" onClick={handleSubmit}>
          {isLoading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            "Submit"
          )}
        </Button>
      </div>
      {comments.map((comment, index) => {
        const date = moment(comment.createdOn);
        return <Comment comment={comment} date={date} key={index} />;
      })}
    </div>
  );
};
