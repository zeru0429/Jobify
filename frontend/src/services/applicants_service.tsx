import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../util/axios/axios_base_query";
import { BASE_URL } from "../util/secrete";

// Create API service
export const applicantApi = createApi({
  reducerPath: "applicantApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URL}/api/applicant/` }),
  tagTypes: ["applicant"],
  endpoints: (builder) => ({
    getAllApplicant: builder.query<any, { params: string }>({
      query: ({ params }) => ({
        url: `/job/${params}`,
        method: "GET",
      }),
      providesTags: ["applicant"],
    }),
    getSingleApplicant: builder.query<any, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "applicant", id }],
    }),
    deleteApplicant: builder.mutation<any, { params: string }>({
      query: ({ params }) => ({
        url: `/${params}`,
        method: "DELETE",
      }),
      invalidatesTags: ["applicant"],
    }),
    updateApplicantStatus: builder.mutation<
      any,
      { body: { status: string }; params: string }
    >({
      query: ({ body, params }) => ({
        url: `/${params}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["applicant"],
    }),
  }),
});

// Hooks generated from the API service
export const {
  useGetAllApplicantQuery,
  useLazyGetAllApplicantQuery,
  useGetSingleApplicantQuery,
  useLazyGetSingleApplicantQuery,
  useDeleteApplicantMutation,
  useUpdateApplicantStatusMutation,
} = applicantApi;
