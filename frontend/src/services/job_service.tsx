import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../util/axios/axios_base_query";
import { BASE_URL } from "../util/secrete";
import { RegisterJobFormType } from "../_types/form_types";

// Create API service
export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URL}/job/` }),
  tagTypes: ["job"],
  endpoints: (builder) => ({
    createJob: builder.mutation<any, RegisterJobFormType>({
      query: (body: RegisterJobFormType) => ({
        url: "/",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["job"],
    }),
    getAllJob: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["job"],
    }),
    getSingleJob: builder.query<any, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "job", id }],
    }),
    deleteJob: builder.mutation<any, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["job"],
    }),
  }),
});

// Hooks generated from the API service
export const {
  useCreateJobMutation,
  useGetAllJobQuery,
  useGetSingleJobQuery,
  useDeleteJobMutation,
} = jobApi;
