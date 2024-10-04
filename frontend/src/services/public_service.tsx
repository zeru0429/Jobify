import { createApi } from "@reduxjs/toolkit/query/react"; // Ensure you're importing from the correct path
import { axiosBaseQuery } from "../util/axios_base_query";
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
  }),
});

// Export the login mutation
export const { useLoginMutation } = publicApi;
