import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../util/axios/axios_base_query";
import { BASE_URL } from "../util/secrete";
import { RegisterJobFormType } from "../_types/form_types";

// Create API service
export const jobApi = createApi({
  reducerPath: "jobApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URL}/api/job` }),
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
    deleteJob: builder.mutation<any, { params: string }>({
      query: ({ params }) => ({
        url: `/${params}`,
        method: "DELETE",
      }),
      invalidatesTags: ["job"],
    }),
    updateJob: builder.mutation<
      any,
      { body: RegisterJobFormType; params: string }
    >({
      query: ({ body, params }) => ({
        url: `/${params}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["job"],
    }),
  }),
});

// Hooks generated from the API service
export const {
  useCreateJobMutation,
  useUpdateJobMutation,
  useGetAllJobQuery,
  useLazyGetAllJobQuery,
  useGetSingleJobQuery,
  useDeleteJobMutation,
} = jobApi;
