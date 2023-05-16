import ApiService from "../../../services/apiService";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Comments } from "../Post/Comments";
import EmptyAvatar from "../../../assets/images/empty-avatar.png";
import { Spinner } from "react-bootstrap";
import MockPicture from "../../../assets/images/community/1.jpg";

export const PostDetails = () => {
  const { id } = useParams();
  const ids = id.split("&");
  const postId = ids[0];
  const userId = ids[1];
  const currentId = localStorage.getItem("userId");
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [postDetails, setPostDetails] = useState([]);
  const [postComments, setPostComments] = useState([]);
  const [postLikes, setPostLikes] = useState([]);
  const [postHeader, setPostHeader] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const isMyLike = postLikes.find((dta) => dta.userId.toString() === currentId);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    setIsLoading(true);
    const data = {
      postId: postId,
      userId: userId,
    };
    const response = await ApiService.getPostDetails(data);
    if (response.status === 200) {
      setIsLoading(false);
      setPostDetails(response.data.postDetails[0]);
      setPostComments(response.data.postComments.reverse());
      setPostLikes(response.data.postLikes);
      setPostHeader(response.data.postHeader[0]);
    }
  };

  const handleLikePost = async () => {
    if (!isMyLike) {
      const data = {
        postId: postId,
        userId: userId,
        likes: "1",
        comment: "",
      };
      const response = await ApiService.likePost(data);
      if (response.status === 200) {
        getDetails();
      }
    }
  };

  return (
    <>
      {" "}
      {isLoading ? (
        <Spinner animation="border" variant="primary" className="loading" />
      ) : (
        <div className="d-flex post-cont flex-column">
          <div className="post ml-3">
            <div className="profile align-items-center">
              <img src={EmptyAvatar} className="user-img mr-2" />
              <p className="display-name">{postHeader.createdBy}</p>
              <p className="user-name">{"@" + postHeader.createdBy}</p>
              {/*<p className="posted-time">{date.fromNow()}</p>*/}
            </div>
            <p className="post-content">{postHeader.message}</p>
            <div>
              {postHeader.img === null ||
              postHeader.img === "{}" ||
              postHeader.img === "https://staging-assets.ftftx.com/null" ? (
                <img src={MockPicture} className="post-img" alt="post_image" />
              ) : (
                <img
                  src={postHeader.img}
                  className="post-img"
                  alt="post_image"
                />
              )}
            </div>
            <div className="post-comments">
              <div
                className="d-flex post-comment-type pointer"
                onClick={() => setIsCommentsOpen(!isCommentsOpen)}
              >
                <span className="material-symbols-outlined">mode_comment</span>
                <span>{postComments.length}</span>
              </div>
              <div
                className="d-flex post-comment-type pointer"
                onClick={handleLikePost}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ color: isMyLike ? "red" : "" }}
                >
                  favorite
                </span>
                <span>{postLikes.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {isCommentsOpen && (
        <Comments
          id={postId}
          userId={userId}
          likes={postLikes.length}
          getDetails={getDetails}
          comments={postComments}
        />
      )}
    </>
  );
};
