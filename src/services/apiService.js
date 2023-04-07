import axios from "axios";

class ApiService {
  ChangeAssets(value) {
    localStorage.setItem("asts", JSON.stringify(value));
  }

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

  GlobalMetricsHistory() {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/cmcApi/getQuotesHistorical`,
      {}
    );
  }

  getCoinData(page, limit, tag, sort, sort_dir) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/cmcApi/getLeatestList`,
      {
        limit: limit,
        tag: tag,
        start: (page - 1) * limit + 1,
        sort: sort,
        sort_dir: sort_dir,
      }
    );
  }

  GetPairs(id, slug, category) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/cmcApi/getMarketPairs`,
      {
        id: id,
        slug: slug,
        category: category,
      }
    );
  }

  OCHLData(id, slug, period, interval, count) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/cmcApi/getOhlcvHistorical`,
      {
        id: id,
        slug: slug,
        count: count,
        time_period: period,
        interval: interval,
      }
    );

    /*    const headers = new HttpHeaders({'X-CMC_PRO_API_KEY' : '700b6298-ced4-48d6-a306-e97571064b2a'});
    return   this.http.get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/ohlcv/historical?id=' + id + '&count=' + 200  + '&interval=' + interval, {headers})*/
  }

  getSingleCoinData(id, slug) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/cmcApi/getMetaData`,
      {
        id: id,
        slug: slug,
      }
    );
  }

  getSingleCoinPrices(id, slug) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/cmcApi/getOutletLeatest`,
      { id: id, slug: slug }
    );
  }

  GetExchangesList(category, page, limit) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/cmcApi/getExchangeLeatest`,
      {
        category: category,
        start: (page - 1) * limit + 1,
        limit: limit,
        sort: "exchange_score",
        sort_dir: "desc",
      }
    );
  }

  GetSingleExchange(id, slug) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/cmcApi/getExchange`,
      {
        id: id,
      }
    );
  }

  GetExchangePairs(id, slug, category, limit) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/cmcApi/getExchangeMarketPrice`,
      {
        id: id,
        limit: limit,
        slug: slug,
        category: category,
        start: 1,
      }
    );
  }

  getOrderHistory(params) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/kyxAPI/getOrderHistory`,
      params
    );
  }

  getTradeAvailableBalance(params) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/kyxAPI/getTradeAvailableBalance`,
      params
    );
  }

  createTradeOrder(params) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/kyxAPI/createTradeOrder`,
      params
    );
  }
}

export default new ApiService();
