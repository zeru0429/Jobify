import { createApi } from "@reduxjs/toolkit/query/react"; // Ensure you're importing from the correct path
import { axiosBaseQuery } from "../util/axios/axios_base_query";
import { BASE_URL } from "../util/secrete";
import { LoginFormType } from "../_types/form_types";

export const publicApi = createApi({
  reducerPath: "publicApi",
  baseQuery: axiosBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<any, LoginFormType>({
      query: (body: LoginFormType) => ({
        url: `/login`,
        method: "POST",
        data: body,
      }),
    }),
    getIndexPage: builder.query<any, { take: number; skip: number }>({
      query: ({ take, skip }) => ({
        url: `/api/jobs/public?take=${take}&skip=${skip}`,
        method: "GET",
      }),
    }),
    applyJob: builder.mutation({
      query: (formData) => ({
        url: "/api/applicant/apply-job",
        method: "POST",
        data: formData,
      }),
    }),
  }),
});

// Export the login mutation
export const {
  useLoginMutation,
  useLazyGetIndexPageQuery,
  useApplyJobMutation,
} = publicApi;
