import { useState } from "react";
import moment from "moment";
import { NavLink } from "react-router-dom";
import User1Image from "assets/images/community/user-1.png";
import Post1Image from "assets/images/community/post-1.png";

const Post = () => {
  const [posts, setPosts] = useState([
    {
      profile_img: User1Image,
      display_name: "Ankr Team",
      user_name: "@AnkrTeam",
      date: "2022-09-15T12:12:34Z",
      content: {
        text:
          "Our App Chains help you to scale the future of Web3 🔨\n" +
          "\n" +
          "Devs can focus on creating dApps that defy expectations, our App Chains have:\n" +
          "\n" +
          "👷 Streamlined Building\n" +
          "⚖️ Enhanced Scalability\n" +
          "🧰 Customizable Features\n" +
          "\n" +
          "Get started now ⬇️",
        image: Post1Image,
      },
      comments: [],
    },
  ]);
  return (
    <>
      {posts.map((dta, index) => {
        const date = moment(dta.date);
        return (
          <div className="d-flex post-cont" key={index}>
            <img src={dta.profile_img} className="user-img" />
            <div className="post ml-3">
              <div className="profile">
                <p className="display-name">{dta.display_name}</p>
                <p className="user-name">{dta.user_name}</p>
                <p className="posted-time">{date.fromNow()}</p>
              </div>
              <p className="post-content">{dta.content.text}</p>
              <NavLink to="/community/post/123">
                <img src={dta.content.image} className="post-img" />
              </NavLink>
              <div className="post-comments">
                <div className="d-flex post-comment-type">
                  <span className="material-symbols-outlined">
                    mode_comment
                  </span>
                  <span> 10</span>
                </div>
                <div className="d-flex post-comment-type">
                  <span className="material-symbols-outlined">sync</span>
                  <span> 86</span>
                </div>
                <div className="d-flex post-comment-type">
                  <span className="material-symbols-outlined">favorite</span>
                  <span> 112</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Post;
