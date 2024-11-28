import axios, {
  InternalAxiosRequestConfig,
  AxiosHeaders,
  AxiosResponse,
} from "axios";
import { API_KEY, GEMINI_BASE_URL } from "../secrete";

const AiAxiosInstance = axios.create({
  baseURL: GEMINI_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Set the API key in the request headers
AiAxiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    if (API_KEY) {
      const headers = AxiosHeaders.from(config.headers); // Create an AxiosHeaders instance
      headers.set("key", API_KEY); // Set the API key header
      config.headers = headers; // Assign the modified headers back to config
    }
    return config; // Return the modified config
  },
  (error) => {
    return Promise.reject(error); // Handle the error
  }
);

AiAxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default AiAxiosInstance;
