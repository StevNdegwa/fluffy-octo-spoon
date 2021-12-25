import axios, { AxiosRequestConfig } from "axios";
import config from "../../config.json";

axios.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    if (request.baseURL?.includes("api.airtable.com")) {
      request.headers!["Authorization"] = `Bearer ${config.AT_APIKEY}`
    }
    return request;
  }
)

axios.defaults.baseURL = "https://api.airtable.com/v0/app8ZbcPx7dkpOnP0/";

export default axios;