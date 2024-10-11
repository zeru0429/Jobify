import AiAxiosInstance from "./ai_axios";

const AiAxiosBaseQuery =
  ({ baseUrl }: { baseUrl?: string } = {}) =>
  async ({
    url,
    method,
    data,
    params,
    headers,
  }: {
    url: string;
    method: string;
    data?: any;
    params?: any;
    headers?: any;
  }) => {
    try {
      const result = await AiAxiosInstance({
        url: baseUrl ? `${baseUrl}${url}` : url,
        method,
        data,
        params,
        headers,
      });
      return { data: result.data };
    } catch (axiosError: any) {
      const err: any = axiosError as {
        response?: { status?: number; data?: any };
      };
      console.log(`${err} ====== `);
      if (err.status === 401) {
        localStorage.removeItem("token");
        //navigate to login page using window
        window.location.href = "/login";
      }
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
export default AiAxiosBaseQuery;
