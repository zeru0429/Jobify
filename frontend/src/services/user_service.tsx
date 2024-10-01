import { createApi } from "@reduxjs/toolkit/query";
import { axiosBaseQuery } from "../util/axios_base_query";
import { BASE_URL } from "../util/secrete";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URL}/user/` }),
  endpoints(build) {
    return {
      getAll: build.query({ query: () => ({ url: "/", method: "GET" }) }),
      getSingle: build.query({
        query: (id: number) => ({ url: `/${id}`, method: "GET" }),
      }),
      create: build.mutation({
        query: (body: any) => ({ url: "/", method: "POST", body }),
      }),
      update: build.mutation({
        query: ({ body, param }: { body: any; param: number }) => ({
          url: `/${param}`,
          method: "PATCH",
          body,
        }),
      }),
    };
  },
});
