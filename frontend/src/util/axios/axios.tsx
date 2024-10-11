import axios, {
  InternalAxiosRequestConfig,
  AxiosHeaders,
  AxiosResponse,
} from "axios";
import { getToken } from "../getToken";
import { BASE_URL } from "../secrete";

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getToken();

    if (token) {
      const headers = AxiosHeaders.from(config.headers);
      headers.set("Authorization", `Bearer ${token}`);
      config.headers = headers;
    }

    // Do NOT set the Content-Type if the data is FormData
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"]; // Let Axios set it to multipart/form-data automatically
    }

    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => Promise.reject(error)
);

export default instance;
