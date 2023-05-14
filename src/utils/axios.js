import axios from "axios";
import { API_TOKEN } from "./constants";

const axiosInstance = axios.create({
    baseURL: "https://decronus-sandbox.pipedrive.com/api/v1/",
    timeout: 0,
    headers: {
        Accept: "application/json",
    },
    params: {
        api_token: API_TOKEN,
    },
});

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axiosInstance.defaults.headers.post["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,PATCH,OPTIONS";
axiosInstance.defaults.headers.post["Access-Control-Allow-Credentials"] = true;

export default axiosInstance;
