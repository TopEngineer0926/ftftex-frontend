import moment from "moment";
import MockPicture from "../../../assets/images/community/1.jpg";

const Post = ({ posts }) => {
  return (
    <>
      {posts.map((dta, index) => {
        const date = moment(dta.date);
        console.log(dta.content.image === "{}");
        return (
          <a
            href={`post/${dta.id}&${dta.userId}`}
            className="d-flex post-cont pointer"
            key={index}
          >
            <img src={dta.profile_img} className="user-img" />
            <div className="post ml-3">
              <div className="profile">
                <p className="display-name">{dta.display_name}</p>
                <p className="user-name">{dta.user_name}</p>
                <p className="posted-time">{date.fromNow()}</p>
              </div>
              <p className="post-content">{dta.content.text}</p>
              <div>
                {dta.content.image === null ||
                dta.content.image === "{}" ||
                dta.content.image ===
                  "https://staging-assets.ftftx.com/null" ? (
                  <img
                    src={MockPicture}
                    className="post-img"
                    alt="post_image"
                  />
                ) : (
                  <img
                    src={dta.content.image}
                    className="post-img"
                    alt="post_image"
                  />
                )}
              </div>
              {/*          <div className="post-comments pointer">*/}
              {/*              <div className="d-flex post-comment-type">*/}
              {/*<span className="material-symbols-outlined">*/}
              {/*  mode_comment*/}
              {/*</span>*/}
              {/*                  <span>0</span>*/}
              {/*              </div>*/}
              {/*              <div className="d-flex post-comment-type">*/}
              {/*                <span className="material-symbols-outlined">sync</span>*/}
              {/*                <span> 86</span>*/}
              {/*              </div>*/}
              {/*              <div className="d-flex post-comment-type pointer">*/}
              {/*                  <span className="material-symbols-outlined"*/}
              {/*                  >*/}
              {/*                      favorite*/}
              {/*                  </span>*/}
              {/*                  <span>0</span>*/}
              {/*              </div>*/}
              {/*          </div>*/}
            </div>
          </a>
        );
      })}
    </>
  );
};

export default Post;
