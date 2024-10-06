import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../util/axios/axios_base_query";
import { BASE_URL } from "../util/secrete";
import { RegisterCompanyFormType } from "../_types/form_types";

// Create API service
export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URL}/api/company` }),
  tagTypes: ["company"],
  endpoints: (builder) => ({
    createCompany: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/",
        method: "POST",

        data: formData,
      }),
      invalidatesTags: ["company"],
    }),
    getAllCompany: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["company"],
    }),
    getSingleCompany: builder.query<any, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "company", id }],
    }),
    deleteCompany: builder.mutation<any, { params: string }>({
      query: ({ params }) => ({
        url: `/${params}`,
        method: "DELETE",
      }),
      invalidatesTags: ["company"],
    }),
    updateCompanyProfile: builder.mutation<
      any,
      { body: RegisterCompanyFormType; params: string }
    >({
      query: ({ body, params }) => ({
        url: `/${params}/profile`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["company"],
    }),
    changeCompanyLogo: builder.mutation<
      any,
      { formData: FormData; params: string }
    >({
      query: ({ formData, params }) => ({
        url: `/${params}/change-logo`,
        method: "PATCH",
        data: formData,
      }),
      invalidatesTags: ["company"],
    }),
  }),
});

// Hooks generated from the API service
export const {
  useCreateCompanyMutation,
  useGetAllCompanyQuery,
  useUpdateCompanyProfileMutation,
  useGetSingleCompanyQuery,
  useChangeCompanyLogoMutation,
  useDeleteCompanyMutation,
} = companyApi;
