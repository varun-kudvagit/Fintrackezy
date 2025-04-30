import axios from "axios";
import { baseUrl, getToken } from "./helpers";

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getToken();
    if (accessToken) {
      config.headers.Authorization = `ExpenseTracker-Ashish ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.error("Server Error: ", error);
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request Timeout");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
