import axios from "axios";

class ApiService {
  getGlobalData() {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/cmcApi/getQuotesLeatest`,
      {}
    );
  }
  GetCommunityFEED() {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/topicApi/topicList`,
      { end: 5 }
    );
  }

  GetTrendingCoins(limit) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/cmcApi/getTradingLeatest`,
      { limit: limit, start: 1 }
    );
  }

  GetNews(query) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}ftftx/newsApi/news`, {
      language: "en",
      country: "us",
      q: query,
    });
  }
}

export default new ApiService();
