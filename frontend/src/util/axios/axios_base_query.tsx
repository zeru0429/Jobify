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
      // Check if data is FormData, and avoid setting Content-Type manually
      const isFormData = data instanceof FormData;
      const result = await axiosInstance({
        url: baseUrl ? `${baseUrl}${url}` : url,
        method,
        data,
        params,
        headers: {
          ...headers,
          ...(isFormData ? {} : { "Content-Type": "application/json" }), // Only set for non-FormData requests
        },
      });
      return { data: result.data };
    } catch (axiosError: any) {
      console.log(axiosError);
      const err: any = axiosError as {
        response?: { status?: number; data?: any };
      };
      console.log(`${err} ====== `);
      if (err.status === 401) {
        localStorage.removeItem("token");
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
