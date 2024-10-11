import { createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../util/secrete";
import { axiosBaseQuery } from "../util/axios/axios_base_query";
import { RegisterJobFormType } from "../_types/form_types";

export const AiApi = createApi({
  reducerPath: "AiApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URL}/api/ai` }),
  endpoints: (builder) => ({
    requestGemini: builder.mutation<any, RegisterJobFormType>({
      query: (body: RegisterJobFormType) => ({
        url: `/generate-job-description`,
        method: "POST",
        data: body,
      }),
    }),
  }),
});

// Export the requestGemini mutation
export const { useRequestGeminiMutation } = AiApi;
