import axios from "axios";

class ApiService {
  getGlobalData() {
    return axios.post(
      `${process.env.REACT_APP_BASE_URL}ftftx/cmcApi/getQuotesLeatest`,
      {}
    );
  }
}

export default new ApiService();
