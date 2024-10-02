import axiosInstance from "./axios";

export const axiosBaseQuery =
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
      const result = await axiosInstance({
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

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
