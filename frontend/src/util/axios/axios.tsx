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
  headers: {
    "Content-Type": "application/json",
  },
});

// Set the token in the request headers
instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getToken();
    if (token) {
      const headers = AxiosHeaders.from(config.headers); // Create an AxiosHeaders instance
      headers.set("Authorization", `Bearer ${token}`); // Set the Authorization header
      config.headers = headers; // Assign the modified headers back to config
    }
    return config; // Return the modified config
  },
  (error) => {
    return Promise.reject(error); // Handle the error
  }
);
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
