import TradingViewTicker from "components/Common/TradingViewTicker";
import "./index.scss";
import { useTranslation } from "react-i18next";
import moment from "moment";
import titlecase from "titlecase";
import { useEffect, useState } from "react";
import ApiService from "services/apiService";
import NewsPlaceholderImg from "assets/images/news-place-holder.png";

const News = () => {
  const { t } = useTranslation();

  const [NewsData, setNewsData] = useState([]);
  const [SelectedNews, setSelectedNews] = useState({});
  const [NewsFilter, setNewsFilter] = useState("crypto");
  const [Country, setCountry] = useState("ae");

  const [NewsDataAll, setNewsDataAll] = useState([]);
  const [NoImageNews, setNoImageNews] = useState([]);

  useEffect(() => {
    ApiService.GetNews(NewsFilter)
      .then((res) => {
        const data = res.data;
        let tempNewsDataAll = JSON.parse(data.news).results;
        tempNewsDataAll = tempNewsDataAll.filter((x) => x.image_url);
        for (let x of tempNewsDataAll) {
          try {
            x.image_url = x.image_url.replace("http://", "https://");
          } catch (e) {}
        }
        setNewsDataAll(tempNewsDataAll);

        let tempNewsData = JSON.parse(data.news).results;
        tempNewsData = tempNewsData.filter((x) => x.image_url);
        for (let x of tempNewsData) {
          try {
            x.image_url = x.image_url.replace("http://", "https://");
          } catch (e) {}
        }
        setNewsData(tempNewsData);
        setSelectedNews(tempNewsData[0]);

        let tempNoImageNews = JSON.parse(data.news).results;
        tempNoImageNews = tempNoImageNews.filter((x) => x.image_url === null);
        setNoImageNews(tempNoImageNews);

        console.log(NoImageNews);
        console.log(NewsData);
      })
      .finally(() => {});
  }, []);

  const syncData = (filter) => {
    ApiService.GetNews(filter).then((res) => {
      let tempNewsData = JSON.parse(res.news).results;
      tempNewsData = tempNewsData.filter((x) => x.image_url);

      for (let x of tempNewsData) {
        try {
          x.image_url = x.image_url.replace("http://", "https://");
        } catch (e) {}
      }

      setNewsData(tempNewsData);
      setSelectedNews(tempNewsData[0]);
    });
  };

  const selectOneNews = (value) => {
    setSelectedNews(value);
  };

  const changeTab = (value) => {
    setNewsFilter(value);
    syncData(value);
  };

  const setDefaultPic = (event) => {
    event.target.src = NewsPlaceholderImg;
  };
  return (
    <div className="min-h-full mb-5">
      <TradingViewTicker />
      <div className="row d-none d-lg-block">
        <div className="col-md-10 offset-md-1">
          <h1 className="s-bld my-4">{t("News")}</h1>
        </div>
        <div className="col-lg-10 offset-lg-1 ">
          <div className="row wt-box">
            <div className="col-lg-8 px-0 ">
              <div className="n-title-top">
                <div className="d-flex justify-content-between">
                  <p className="s-bld mb-0">
                    {titlecase(SelectedNews?.source_id)}
                  </p>
                  {SelectedNews?.creator && (
                    <p className="s-bld mb-0">by {SelectedNews?.creator}</p>
                  )}
                  <p className="s-bld mb-0">
                    {new Date(SelectedNews?.pubDate).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    )}
                  </p>
                </div>
              </div>
              <img
                src={SelectedNews?.image_url}
                onError={(e) => setDefaultPic(e)}
                className="w-100 thumbnail"
              />
              <div className="n-title">
                <a
                  className="s-bld mb-0"
                  href={SelectedNews?.link}
                  target="_blank"
                >
                  {SelectedNews?.title}
                </a>
              </div>
            </div>
            <div className="col-lg-4 col-md-12  d-none d-lg-block">
              <div className="d-flex">
                <div
                  className={
                    NewsFilter === "crypto"
                      ? "btn btn-def flex-fill p-3 btn-def-activated"
                      : "btn btn-def flex-fill p-3 "
                  }
                  onClick={() => changeTab("crypto")}
                >
                  TOP
                </div>
                <div
                  className={
                    NewsFilter === "bitcoin"
                      ? "btn btn-def flex-fill p-3 btn-def-activated"
                      : "btn btn-def flex-fill p-3"
                  }
                  onClick={() => changeTab("bitcoin")}
                >
                  BITCOIN
                </div>
              </div>
              <div className="mv-h">
                {NewsData.map((dta, index) => (
                  <div
                    className="p-3 n-btn"
                    onClick={() => selectOneNews(dta)}
                    key={index}
                  >
                    <div className="row">
                      <div className="col-md-12">
                        <p className="s-bld mb-0">{dta.title}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-10 offset-lg-1">
          <div className="row mt-5">
            {NewsDataAll.map((dta, index) => {
              const date = moment(dta?.pubDate);
              return (
                <div className="col-lg-4 col-md-12 mt-3" key={index}>
                  <div className="wt-box h-100 ">
                    <a href={dta.link} target="_blank">
                      <img
                        src={dta?.image_url}
                        onError={(e) => setDefaultPic(e)}
                        className="w-100 thumbnail-cont"
                      />
                    </a>
                    <div className="p-4 d-flex flex-column justify-content-between">
                      <a
                        className="s-bld mb-0 cu-p mb-3"
                        href={dta?.link}
                        target="_blank"
                      >
                        {dta?.title}
                      </a>
                      <div className="d-flex justify-content-between mt-auto">
                        <p className=" mb-0" style={{ fontSize: 13 }}>
                          by {dta?.creator}
                        </p>
                        <p
                          className="mb-0 ml-4"
                          style={{ fontSize: 13, whiteSpace: "nowrap" }}
                        >
                          {date.fromNow()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="row d-block d-lg-none">
        <div className="col-lg-4  col-md-12 ">
          <div className="d-flex mb-3">
            <div
              className={
                NewsFilter === "crypto"
                  ? "btn-def-activated"
                  : "btn btn-def flex-fill p-3"
              }
              onClick={() => changeTab("crypto")}
            >
              TOP
            </div>
            <div
              className={
                NewsFilter === "bitcoin"
                  ? "btn btn-def flex-fill p-3 btn-def-activated"
                  : "btn btn-def flex-fill p-3"
              }
              onClick={() => changeTab("bitcoin")}
            >
              BITCOIN
            </div>
          </div>
          {NewsData.map((dta, index) => {
            const date = moment(dta?.pubDate);
            return (
              <div className="wt-box h-100 mb-3" key={index}>
                <a href={dta.link} target="_blank">
                  <img
                    src={dta?.image_url}
                    onError={(e) => setDefaultPic(e)}
                    className="w-100 thumbnail-cont"
                  />
                </a>
                <div className="p-4 d-flex flex-column justify-content-between">
                  <a
                    className="s-bld mb-0 cu-p mb-3"
                    href={dta?.link}
                    target="_blank"
                  >
                    {dta?.title}
                  </a>
                  <div className="d-flex justify-content-between mt-auto">
                    <p className=" mb-0" style={{ fontSize: 13 }}>
                      by {dta?.creator}
                    </p>
                    <p
                      className="mb-0 ml-4"
                      style={{ fontSize: 13, whiteSpace: "nowrap" }}
                    >
                      {date.fromNow()}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="row more-stories">
        <div className="col-lg-10 offset-lg-1 ">
          {NoImageNews?.length > 0 && (
            <div className="wt-box h-100 my-5 p-2">
              <h3 className="s-bld p-3">{t("More Stories")}</h3>
              <div className="row">
                {NoImageNews.map((dta, index) => (
                  <div className="col-lg-4" key={index}>
                    <a
                      className="p-3   w-100 d-block s-bld"
                      href={dta?.link}
                      target="_blank"
                    >
                      {dta.title}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
