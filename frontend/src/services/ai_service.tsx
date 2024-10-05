import { createApi } from "@reduxjs/toolkit/query/react";
import { GEMINI_BASE_URL } from "../util/secrete";
import AiAxiosBaseQuery from "../util/axios/ai_axios_base_query";
import { AiApiRequestType } from "../_types/ai_request_type";

export const AiApi = createApi({
  reducerPath: "AiApi",
  baseQuery: AiAxiosBaseQuery({ baseUrl: GEMINI_BASE_URL }),
  endpoints: (builder) => ({
    requestGemini: builder.mutation<any, AiApiRequestType>({
      query: (body: AiApiRequestType) => ({
        url: `/`,
        method: "POST",
        data: body,
      }),
    }),
  }),
});

// Export the requestGemini mutation
export const { useRequestGeminiMutation } = AiApi;
