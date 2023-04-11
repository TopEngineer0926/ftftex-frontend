import { FTFTexContext } from "App";
import { useContext, useEffect, useState } from "react";
import ApiService from "services/apiService";
import { useTranslation } from "react-i18next";
import NewsPlaceHolderImg from "assets/images/news-place-holder.png";
import "./index.scss";
import { Swiper, SwiperSlide } from "swiper/react";

// import Swiper core and required modules
import { Autoplay, Navigation, Pagination } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const NewsCarousal = () => {
  const { t } = useTranslation();
  const [NewsDataAll, setNewsDataAll] = useState([]);
  const NewsFilter = "bitcoin";
  const [isMobile, setIsMobile] = useState(false);
  const [pageIndex, setPageIndex] = useState(3);
  const [ftftexValue, setFtftexValue] = useContext(FTFTexContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const tempItems = Array(pageIndex)
      .fill(0)
      .map((x, i) => i + 1);
    setItems(tempItems);
  }, [pageIndex]);

  useEffect(() => {
    setIsMobile(ftftexValue.isMobile);
  }, [ftftexValue.isMobile]);

  useEffect(() => {
    ApiService.GetNews(NewsFilter).then((res) => {
      let tmpNewsDataAll = JSON.parse(res.data.news).results;
      tmpNewsDataAll = tmpNewsDataAll.filter((x) => x.image_url);
      let pg = tmpNewsDataAll.length / 6;
      pg = Math.ceil(pg);
      setPageIndex(pg);
      for (let x of tmpNewsDataAll) {
        try {
          x.image_url = x.image_url.replace("http://", "https://");
        } catch (e) {}
      }
      setNewsDataAll(tmpNewsDataAll);
      /*  this.NewsDataAll = this.NewsDataAll.slice(15);*/
    });
  }, []);

  const setDefaultPic = (event) => {
    event.target.src = NewsPlaceHolderImg;
  };

  return (
    <>
      <h2 className="mr-auto s-bld mb-0 mt-5">{t("News")}</h2>
      {!isMobile && (
        <div className="container   news-caro">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            spaceBetween={70}
            className="mySwiper"
          >
            {items.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="row more-stories">
                  <div className="col-lg-12 ">
                    {NewsDataAll?.length > 0 && (
                      <div className="wt-box h-100 p-2">
                        <div className="row">
                          {NewsDataAll?.slice(i * 6, i * 6 + 6).map(
                            (dta, index) => (
                              <div className="col-lg-4" key={index}>
                                <a
                                  className="p-3   w-100 d-flex s-bld "
                                  href={dta?.link}
                                  target="_blank"
                                >
                                  <img
                                    src={dta?.image_url}
                                    className="news-img"
                                    onError={(e) => setDefaultPic(e)}
                                  />
                                  <p className="ml-3 align-self-center text-left">
                                    {dta.title}
                                  </p>
                                </a>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {isMobile && (
        <div className="container  mt-5">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            navigation
            autoplay={{ delay: 8000, disableOnInteraction: true }}
            spaceBetween={30}
            pagination={{ clickable: true }}
            className="mySwiper"
          >
            {NewsDataAll.map((dta, index) => (
              <SwiperSlide key={index}>
                {NewsDataAll?.length > 0 && (
                  <div className="wt-box h-100 p-2 w-100">
                    <div className="row">
                      <div className="col-lg-4">
                        <a
                          className="p-3   w-100 d-flex s-bld "
                          href={dta?.link}
                          target="_blank"
                        >
                          <img
                            src={dta?.image_url}
                            className="news-img"
                            onError={(e) => setDefaultPic(e)}
                          />
                          <p className="ml-3 align-self-center text-left">
                            {dta.title}
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </>
  );
};

export default NewsCarousal;
