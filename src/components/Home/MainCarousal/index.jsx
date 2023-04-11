import "./index.scss";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Modal } from "react-bootstrap";
// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import HeaderBannerImg from "assets/images/header-banner.svg";
import { NavLink } from "react-router-dom";
import SelectExchangePop from "components/Coin/SelectExchangePop";
import { useContext, useEffect, useState } from "react";
import { FTFTexContext } from "App";
import { getLoggedIn } from "utils";

import Slide_F1Img from "assets/images/slides/f1.png";
import Slide_F2Img from "assets/images/slides/f2.png";
import Slide_F3Img from "assets/images/slides/f3.png";
import Slide_F4Img from "assets/images/slides/f4.png";

import Slide_V1Img from "assets/images/slides/v1.png";
import Slide_V2Img from "assets/images/slides/v2.png";
import Slide_V3Img from "assets/images/slides/v3.png";

const MainCarousal = () => {
  const { t } = useTranslation();
  const [LoggedIn, setLoggedIn] = useState({ 0: "" });

  const popData = {
    url: "1/bitcoin",
    coin: "BTC",
  };

  const Slides = [
    { type: "image", image: Slide_F2Img, link: "" },
    {
      type: "video",
      image: Slide_V1Img,
      link: "https://www.youtube.com/watch?v=EJzB_Fa27ko",
    },
    {
      type: "video",
      image: Slide_V2Img,
      link: "https://www.youtube.com/watch?v=FExp9YuTzbY",
    },
    { type: "image", image: Slide_F4Img, link: "" },
    {
      type: "video",
      image: Slide_V3Img,
      link: "https://www.youtube.com/watch?v=KHm0uUPqmVE",
    },
    // {type: 'image' , image: Slide_F1Img , link: ''},
    { type: "image", image: Slide_F3Img, link: "" },
  ];

  const SlidesMB = [
    { type: "image", image: Slide_F2Img, link: "" },
    {
      type: "video",
      image: Slide_V2Img,
      link: "https://www.youtube.com/watch?v=FExp9YuTzbY",
    },
    { type: "image", image: Slide_F4Img, link: "" },
    // {type: 'image' , image: Slide_F1Img , link: ''},
    { type: "image", image: Slide_F3Img, link: "" },
  ];

  const [isMobile, setIsMobile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  useEffect(() => {
    setLoggedIn(getLoggedIn());
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {!isMobile && (
        <div className="row">
          <div className="col-md-12">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              pagination={false}
              className="mySwiper"
              autoplay={{ delay: 4000, disableOnInteraction: false }}
            >
              <SwiperSlide>
                <div className="main-slider">
                  <img className="lg-carousal" src={HeaderBannerImg} />
                  <div className="container">
                    <div className="swp-text">
                      <div className="row">
                        <div className="col-md-10">
                          <h1>
                            {t("BT1")} <br />
                            {t("BT11")}
                          </h1>
                          <h5>{t("BT2")}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      )}
      {/* <!--Desktop--> */}
      {!isMobile && (
        <div className="container ov-margin">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={4}
            spaceBetween={30}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="mySwiper"
          >
            {Slides.map((dta, index) => (
              <SwiperSlide key={index}>
                <a className="card-box w-100" href={dta.link} target="_blank">
                  <img className="sm-card" src={dta.image} />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* <!--Small Devices--> */}
      <div
        className="container d-block d-md-none mb-caro"
        style={{ marginTop: 65 }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          className="mySwiper"
        >
          {SlidesMB.map((dta, index) => (
            <SwiperSlide key={index}>
              <a className="card-box w-100" href={dta.link} target="_blank">
                <img className="sm-card" src={dta.image} />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {isMobile && (
        <>
          <div className="row mt-2 mx-1">
            <div className="col px-1">
              <NavLink className="m-btn" to={"/wallet/purchase-crypto"}>
                <span className="material-symbols-outlined icon">toll</span>
                <p className="mb-0">Buy Crypto</p>
              </NavLink>
            </div>
            <div className="col px-1" onClick={() => setShowModal(true)}>
              <div className="m-btn">
                <span className="material-symbols-outlined icon">
                  compare_arrows
                </span>
                <p className="mb-0">Agg. Trade</p>
              </div>
            </div>
            <NavLink className="col px-1" to={"/news"}>
              <div className="m-btn">
                <span className="material-symbols-outlined icon">
                  newspaper
                </span>
                <p className="mb-0">{t("News")}</p>
              </div>
            </NavLink>
          </div>
          <div className="row mt-2 mx-1">
            <div className="col px-1">
              <NavLink className="m-btn" to={"/trade/BTC_USDT"}>
                <span className="material-symbols-outlined icon">
                  local_fire_department
                </span>
                <p className="mb-0">BTC/USDT</p>
              </NavLink>
            </div>
            <div className="col px-1">
              <NavLink className="m-btn" to={"/exchanges"}>
                <span className="material-symbols-outlined icon">
                  monitoring
                </span>
                <p className="mb-0">Exchanges / Pairs</p>
              </NavLink>
            </div>
            {LoggedIn[1] && (
              <div className="col px-1">
                <NavLink className="m-btn" to={"/wallet"}>
                  <span className="material-symbols-outlined icon">wallet</span>
                  <p className="mb-0">{t("My Wallet")}</p>
                </NavLink>
              </div>
            )}
            {!LoggedIn[1] && (
              <div className="col px-1">
                <NavLink className="m-btn" to={"/community"}>
                  <span className="material-symbols-outlined icon">people</span>
                  <p className="mb-0">{t("Community")}</p>
                </NavLink>
              </div>
            )}
          </div>
        </>
      )}

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <SelectExchangePop data={popData} onClose={handleCloseModal} />
      </Modal>
    </>
  );
};

export default MainCarousal;
