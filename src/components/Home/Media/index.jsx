import "./index.scss";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Media = () => {
  const { t } = useTranslation();

  const MediaData = [
    {
      title: "sample media title",
      url: "https://www.youtube.com/embed/EEuPmA8w0Kc",
      thumbnail: "assets/images/community/1.jpg",
    },
    {
      title: "sample media title",
      url: "https://www.youtube.com/embed/gvKstUUdueM",
      thumbnail: "assets/images/community/3.jpg",
    },
    {
      title: "sample media title",
      url: "",
      thumbnail: "assets/images/community/2.jpg",
    },
    {
      title: "sample media title",
      url: "",
      thumbnail: "assets/images/community/1.jpg",
    },
    {
      title: "sample media title",
      url: "",
      thumbnail: "assets/images/community/6.jpg",
    },
    {
      title: "sample media title",
      url: "",
      thumbnail: "assets/images/community/5.jpg",
    },
    {
      title: "sample media title",
      url: "",
      thumbnail: "assets/images/community/7.jpg",
    },
    {
      title: "sample media title",
      url: "",
      thumbnail: "assets/images/community/4.jpg",
    },
  ];

  return (
    <>
      <h2 className="mr-auto s-bld mb-0 mt-5">{t("Media")}</h2>
      <div className="container d-none d-lg-block">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          navigation
          spaceBetween={70}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="wt-box p-4  w-auto">
              <div className="row media-container">
                <div className="col-lg-6">
                  <iframe
                    className="mx-auto d-block"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/EEuPmA8w0Kc"
                    title="YouTube video player"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="col-lg-6">
                  <iframe
                    className="mx-auto d-block"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/gvKstUUdueM"
                    title="YouTube video player"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="wt-box p-4  w-auto">
              <div className="row media-container">
                <div className="col-lg-6">
                  <iframe
                    className="mx-auto d-block"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/FPD63zP2j14"
                    title="YouTube video player"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="col-lg-6">
                  <iframe
                    className="mx-auto d-block"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/QphJEO9ZX6s"
                    title="YouTube video player"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="wt-box p-4  w-auto">
              <div className="row media-container">
                <div className="col-lg-6">
                  <iframe
                    className="mx-auto d-block"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/pSTNhBlfV_s"
                    title="YouTube video player"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="col-lg-6">
                  <iframe
                    className="mx-auto d-block"
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/BgCgauWVTs0"
                    title="YouTube video player"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="container d-block d-lg-none">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          navigation
          spaceBetween={70}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="wt-box p-4  w-auto">
              <div className="row media-container">
                <div className="col-lg-6">
                  <iframe
                    className="mx-auto d-block"
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/EEuPmA8w0Kc"
                    title="YouTube video player"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="wt-box p-4  w-auto">
              <div className="row media-container">
                <div className="col-lg-6">
                  <iframe
                    className="mx-auto d-block"
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/gvKstUUdueM"
                    title="YouTube video player"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="wt-box p-4  w-auto">
              <div className="row media-container">
                <div className="col-lg-6">
                  <iframe
                    className="mx-auto d-block"
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/FPD63zP2j14"
                    title="YouTube video player"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="wt-box p-4  w-auto">
              <div className="row media-container">
                <div className="col-lg-6">
                  <iframe
                    className="mx-auto d-block"
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/QphJEO9ZX6s"
                    title="YouTube video player"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="wt-box p-4  w-auto">
              <div className="row media-container">
                <div className="col-lg-6">
                  <iframe
                    className="mx-auto d-block"
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/pSTNhBlfV_s"
                    title="YouTube video player"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="wt-box p-4  w-auto">
              <div className="row media-container">
                <div className="col-lg-6">
                  <iframe
                    className="mx-auto d-block"
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/BgCgauWVTs0"
                    title="YouTube video player"
                    style={{ border: 0 }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default Media;
