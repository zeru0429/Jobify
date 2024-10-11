import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../util/axios/axios_base_query";
import { BASE_URL } from "../util/secrete";

// Create API service
export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: axiosBaseQuery({
    baseUrl: `${BASE_URL}/api/dashboard`,
  }),
  tagTypes: ["dashboard"],
  endpoints: (builder) => ({
    getCompanyType: builder.query({
      query: () => ({
        url: `/company-type`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
    getCompanyJob: builder.query({
      query: () => ({
        url: `/company-job`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
    getJobType: builder.query({
      query: () => ({
        url: `/job-type`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
    getMonthlyApplicant: builder.query({
      query: () => ({
        url: `/monthly-applicants`,
        method: "GET",
      }),
      providesTags: ["dashboard"],
    }),
  }),
});

// Hooks generated from the API service
export const {
  useGetCompanyTypeQuery,
  useGetCompanyJobQuery,
  useGetJobTypeQuery,
  useGetMonthlyApplicantQuery,
  useLazyGetCompanyTypeQuery,
  useLazyGetCompanyJobQuery,
  useLazyGetJobTypeQuery,
  useLazyGetMonthlyApplicantQuery,
} = dashboardApi;
