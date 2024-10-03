import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../util/axios_base_query";
import { BASE_URL } from "../util/secrete";
import { ApplicationFormType } from "../_types/form_types";

// Create API service
export const applicantApi = createApi({
  reducerPath: "applicantApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URL}/applicant/` }),
  tagTypes: ["applicant"],
  endpoints: (builder) => ({
    createApplicant: builder.mutation<any, ApplicationFormType>({
      query: (body: ApplicationFormType) => ({
        url: "/",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["applicant"],
    }),
    getAllApplicant: builder.query({
      query: () => ({
        url: "/",
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
    deleteApplicant: builder.mutation<any, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["applicant"],
    }),
  }),
});

// Hooks generated from the API service
export const {
  useCreateApplicantMutation,
  useGetAllApplicantQuery,
  useGetSingleApplicantQuery,
  useDeleteApplicantMutation,
} = applicantApi;
