import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../util/axios_base_query";
import { BASE_URL } from "../util/secrete";
import { RegisterUserFormType } from "../_types/form_types";

// Create API service
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: axiosBaseQuery({ baseUrl: `${BASE_URL}/api/user` }),
  tagTypes: ["User"], // Tag for refetching when data is updated
  endpoints: (builder) => ({
    createUser: builder.mutation<any, RegisterUserFormType>({
      query: (body: RegisterUserFormType) => ({
        url: "/",
        method: "POST",
        data: body,
      }),
      invalidatesTags: ["User"],
    }),
    updateUserProfile: builder.mutation<
      any,
      { body: RegisterUserFormType; params: string }
    >({
      query: ({ body, params }) => ({
        url: `/${params}/profile`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["User"],
    }),
    resetUserPassword: builder.mutation<
      any,
      { body: RegisterUserFormType; params: string }
    >({
      query: ({ body, params }) => ({
        url: `/${params}/password`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["User"],
    }),

    getAllUsers: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getSingleUser: builder.query<any, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),
    deleteUser: builder.mutation<any, string>({
      query: (id: string) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Hooks generated from the API service
export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useResetUserPasswordMutation,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
} = userApi;
