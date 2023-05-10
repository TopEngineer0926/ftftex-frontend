import axios from "axios";

class ApiService {
  DialingCode = {
    name: "United Arab Emirates",
    dialCode: "+971",
    isoCode: "AE",
    flag: "https://cdn.kcak11.com/CountryFlags/countries/ae.svg",
  };

  AvailableCoins = [
    { id: 825, coin: "usdt" },
    { id: 1027, coin: "eth" },
    { id: 1, coin: "btc" },
    { id: 1839, coin: "bnb" },
    { id: 5426, coin: "sol" },
    { id: 2010, coin: "ada" },
    { id: 6636, coin: "dot" },
    { id: 74, coin: "doge" },
    { id: 5994, coin: "shib" },
    { id: 3890, coin: "matic" },
    { id: 7083, coin: "uni" },
    { id: 2, coin: "ltc" },
    { id: 1958, coin: "trx" },
    { id: 52, coin: "xrp" },
  ];

  LoginUser(data, type, dialcode) {
    let fmData = { userId: "", password: data.password };
    if (type === "email") {
      fmData.userId = data.email;
    }
    if (type === "mobile") {
      fmData.userId = dialcode + data.phone;
    }
    return axios.post(
        `${process.env.REACT_APP_BASE_URL}ftftx/usersAPI/login`,
        fmData
    );
  }

  RegisterUser(data, type, dialcode) {
    const DATA = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      phone: dialcode + data.phone,
      service: "register",
      avatar: "avatar",
      userName: `username${Date.now()}`,
    };
    return axios.post(
        `${process.env.REACT_APP_BASE_URL}ftftx/usersAPI/saveUserInitially`,
        DATA
    );
  }

  VerifyUser(data) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/usersAPI/varifyUser`,
      data
    );
  }

  getUser(userId) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/usersAPI/getUserDetails`,
      { userId }
    );
  }

  ForgotPassword(data, type, dialcode) {
    const fmData = {
      email: type === "email" ? data.email : "",
      phone: type === "mobile" ? dialcode + data.phone : "",
    };

    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/usersAPI/varifyEmail`,
      fmData
    );
  }

  changePassword(data, userId) {
    const fmData = {
      userId,
      password: data.password,
    };

    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/usersAPI/changePassword`,
      fmData
    );
  }

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

  GetNews(query) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}ftftx/newsApi/news`, {
      language: "en",
      country: "us",
      q: query,
    });
  }

  GainersAndLosers(sc, limit) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/cmcApi/getGainersAndLosers`,
      {
        sort_dir: sc,
        limit: limit,
        start: 1,
        sort: "percent_change_24h",
        time_period: "24h",
      }
    );
  }

  getSubAccFoundBalance(params) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/kyxAPI/getSubAccFoundBalance`,
      params
    );
  }

  getSubAccTradeBalance(params) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/kyxAPI/getSubAccTradeBalance`,
      params
    );
  }

  createWithdrawal(params) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/kyxAPI/createWithdrawal`,
      params
    );
  }

  fundsTransfer(params) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/kyxAPI/createTransfer`,
      params
    );
  }

  getCurrencies(params) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/kyxAPI/getCurrencies`,
      params
    );
  }

  createDepositAddressForSubAccount(params) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/kyxAPI/createDepositAddress`,
      params
    );
  }

  createSubAccount(params) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/kyxAPI/createSubAccount`,
      params
    );
  }

  getSubAccountList(params) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/kyxAPI/getSubAccInfo`,
      params
    );
  }

  getSubAccBalance(params) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/kyxAPI/getSubAccBalance`,
      params
    );
  }

  walletSubscription(data) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}verification/subscribe`,
      data
    );
  }

  verifyKyc(params) {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/usersAPI/verifyKyc`,
      params
    );
  }

  getUser(userId) {
    return axios.post(
        `${process.env.REACT_APP_BASE_URL}ftftx/usersAPI/getUserDetails`,
        { userId }
    );
  }

  deleteSubAccount(params) {
    return axios.post(
        `${process.env.REACT_APP_BASE_URL}ftftx/subAccAPI/cancelSubAccount`,
        params
    );
  }

  getAllCurrency() {
    return axios.post(
        `${process.env.REACT_APP_BASE_URL}ftftx/kyxAPI/getCurrencies`,
        {"ccy":""}
    );
  }

  uploadFile(data) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}ftftx/filesApi/file/upload`, data);
  }

  changeAvatar(params) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}ftftx/usersAPI/changeAvatar`, params);
  }

  editUserPhone(params) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}ftftx/usersAPI/updatePhone`, params);
  }

  editUserEmail(params) {
    return axios.post(`${process.env.REACT_APP_BASE_URL}ftftx/usersAPI/updateEmail`, params);
  }
}

export default new ApiService();
