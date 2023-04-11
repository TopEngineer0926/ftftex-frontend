import axios from "axios";

class TradingDataService {
  baseURL = "https://api.binance.com/";
  WSbaseURL = "wss://stream.binance.com:9443/";

  baseURLOkx = "https://www.okx.com/";

  Pairs = [
    "BTCUSDT",
    "ETHUSDT",
    "BNBUSDT",
    "SOLUSDT",
    "ADAUSDT",
    "DOTUSDT",
    "DOGEUSDT",
    "SHIBUSDT",
    "MATICUSDT",
    "UNIUSDT",
    "LTCUSDT",
    "TRXUSDT",
    "XRPUSDT",
  ];

  socket;

  getBidsandAsks(symbol, limit) {
    return axios.get(
      this.baseURL + "api/v3/depth?symbol=" + symbol + "&limit=" + limit
    );
  }

  getBidsandAsksOkx(symbol, limit) {
    return axios.get(
      this.baseURLOkx + "api/v5/market/books?instId=" + symbol + "&sz=" + limit
    );
  }

  getTradingPairs() {
    return axios.get(
      this.baseURL + "api/v3/exchangeInfo?symbols=" + JSON.stringify(this.Pairs)
    );
  }

  getPriceTicker() {
    return axios.get(this.baseURL + "api/v3/ticker/24hr");
  }

  getMarketTrades(symbol) {
    return axios.get(this.baseURL + "api/v3/trades?symbol=" + symbol);
  }

  getMarketTradesOkx(symbol) {
    return axios.get(this.baseURLOkx + "api/v5/market/trades?instId=" + symbol);
  }

  getLivePrices(symbol) {
    this.socket = new WebSocket(
      this.WSbaseURL +
        "stream?streams=!ticker@arr/" +
        symbol +
        "@depth@1000ms/" +
        symbol +
        "@trade/" +
        symbol +
        "@bookTicker"
    );

    this.socket.onopen = () => {
      console.log("WebSocket connected!");
    };
  }
}

export default new TradingDataService();
