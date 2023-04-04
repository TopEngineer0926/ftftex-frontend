import { useEffect, useState } from "react";
import ApiService from "services/apiService";
import moment from "moment";

import User1Image from "assets/images/community/user-1.png";
import User2Image from "assets/images/community/user-2.png";
import User3Image from "assets/images/community/user-3.png";
import Post1Image from "assets/images/community/post-1.png";
import Post2Image from "assets/images/community/post-2.png";
import Post3Image from "assets/images/community/post-3.png";

const Feed = () => {
  const [CreatePostText, setCreatePostText] = useState("");
  const [TempPost, setTempPost] = useState({
    content: "",
  });
  const [TheImage, setTheImage] = useState(null);

  const [posts, setPosts] = useState([
    {
      profile_img:
        "https://s3.coinmarketcap.com/static/img/portraits/628367a8ab0e763d5f77e525.png",
      display_name: "Everscale",
      user_name: "@Everscale",
      date: "2022-09-29T12:12:34Z",
      content: {
        text: "Most users can’t look under the hood of the blockchain, and even for developers it can take a lot of time to browse through all the data 🤯",
        image:
          "https://s3.coinmarketcap.com/static-gravity/thumbnail/large/2a23b013e67f4b6b97a59b8b68e78e83.png",
      },
    },
    {
      profile_img:
        "https://s3.coinmarketcap.com/static/img/portraits/6271e49a7d1c136ae3841de1.png",
      display_name: "Corte",
      user_name: "@Corte",
      date: "2022-09-28T12:12:34Z",
      content: {
        text:
          "LIVE on by Bybit at 2PM UTC, to celebrate @ByBit has set up a Trade-And-Earn competition. \n" +
          "Make a Spot trade of at least 20,000 $CO and get an equal share of the prize pool Enjoy 0 trading fees! \n",
        image:
          "https://s3.coinmarketcap.com/static-gravity/thumbnail/large/58faf7dc4936487b825ab4026ee4d79a.jpeg",
      },
    },
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
    },
    {
      profile_img: User2Image,
      display_name: "pSTAKEfinance",
      user_name: "@pSTAKEfinance",
      date: "2022-09-15T12:12:34Z",
      content: {
        text:
          "We've reached 20,000+ BNB staked on pSTAKE 🎉\n" +
          "\n" +
          "🔓 Unlock liquidity of BNB here:   Web link\n" +
          "\n" +
          "🗣 Spread the word:   Web link",
        image: Post2Image,
      },
    },
    {
      profile_img: User3Image,
      display_name: "FlareToken",
      user_name: "@FlareToken",
      date: "2022-09-15T12:12:34Z",
      content: {
        text:
          "Refer Our #NFTs To Friends For 5% Commission. Refer NFTs Now. 👉   Web link\n" +
          "\n" +
          "In Addition To NFT Purchase Commission, You Will Earn Commission Any Time Your Referrals:\n" +
          "\n" +
          "💸 Claim From The Faucet\n" +
          "🤝Become PipeFlare Supporters\n" +
          "🔐Stake Their 1FLR\n" +
          "🎉And MORE",
        image: Post3Image,
      },
    },
  ]);

  useEffect(() => {
    // ApiService.GetCommunityFEED().then((res) => {
    //   setPosts(res.data);
    // });
  }, []);

  const handleSelection = (event) => {
    console.log(event.char);
    setCreatePostText((CreatePostText) => (CreatePostText += event.char));
  };

  const uploadImage = () => {};

  const post = () => {
    let _TempPost = {
      content: CreatePostText,
    };
    setTempPost(_TempPost);
  };

  const OnFileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => setTheImage(reader.result);

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      {/* <div class="d-flex post-cont" *ngIf="LogginIn[0]">
        <img   [src]="" class="user-img d-none d-lg-block">
        <div class="post ml-3 flex-fill create-post" >
            <div class="profile">
            <img   [src]="" class="user-img d-block d-lg-none mr-2">
            <div class="d-flex align-self-center flex-wrap">
                <p class="display-name mb-0">{{LogginIn[0]}} {{LogginIn[1]}}</p>
            </div>
            </div>
        <textarea class="form-control w-100 mt-2" [(ngModel)]="CreatePostText"></textarea>
            <div class="d-block w-100" *ngIf="TheImage">
            <div class="image-preview" >
            <div class="remove-btn" (click)="TheImage = ''"> <span class=" material-symbols-outlined">close</span></div>
            <img id="blah" class="w-100 my-4"  [src]="TheImage" alt="your image" />

            </div>
            </div>

            <div class="d-flex mt-3">
            <span class="ml-1 material-symbols-outlined cu-p align-self-center" (click)="toggled = !toggled" [(emojiPickerIf)]="toggled" [emojiPickerDirection]="'right'" (emojiPickerSelect)="handleSelection($event)">mood</span>


            <label class="filebutton align-self-center ml-3 cu-p mb-0" style="line-height: 15px">
            <span class=" material-symbols-outlined">image</span>
            <input  accept="image/*" type="file" class="form-control fileUpload w-100 mt-2" (change)="OnFileUpload($event)">
            </label>

            <div class="btn btn-primary ml-auto px-4" (click)="post()">Post</div>
            </div>
        </div>

        </div> */}
      {posts.map((dta, index) => {
        const date = moment(dta.date);
        return (
          <div className="d-flex post-cont" key={index}>
            <img src={dta.profile_img} className="user-img d-none d-lg-block" />
            <div className="post ml-3">
              <div className="profile">
                <img
                  src={dta.profile_img}
                  className="user-img d-block d-lg-none mr-2"
                />
                <div className="d-flex align-self-center flex-wrap">
                  <p className="display-name mb-0">{dta.display_name}</p>
                  <p className="user-name mb-0">{dta.user_name}</p>
                  <p className="posted-time mb-0">{date.fromNow()}</p>
                </div>
              </div>
              <p className="post-content mt-4">{dta.content.text}</p>
              <img src={dta.content.image} className="post-img" />
              {/* <div class="post-comments">
        <div class="d-flex post-comment-type">
          <span class="material-symbols-outlined">mode_comment</span>
          <span> 10</span>
        </div>
        <div class="d-flex post-comment-type">
          <span class="material-symbols-outlined">sync</span>
          <span> 86</span>
        </div>
        <div class="d-flex post-comment-type">
          <span class="material-symbols-outlined">favorite</span>
          <span> 112</span>
        </div>
      </div> */}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Feed;
