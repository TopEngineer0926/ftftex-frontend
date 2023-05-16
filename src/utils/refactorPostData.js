import moment from "moment/moment";
import EmptyAvatar from "../assets/images/empty-avatar.png";

export const refactorData = (data) => {
  const arr = [];
  for (let i = 0; i < data.length; i++) {
    const post = data[i];
    arr.push({
      id: post.id,
      userId: post.userId,
      profile_img: EmptyAvatar,
      display_name: post.createdBy,
      user_name: "@" + post.createdBy.replace(" ", "_"),
      date: moment(post.createdOn).format("YYYY-MM-DDThh:mm:ssZ"),
      content: {
        text: post.message,
        image: post.img,
      },
    });
  }
  arr.reverse();
  return arr;
};
