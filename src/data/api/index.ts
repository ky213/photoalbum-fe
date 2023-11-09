import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, IClient, ILoginRequest, IRegisterRequest } from "src/data/types/client";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api", credentials: "include" }),
  tagTypes: ["Client", "Photos"],
  endpoints: (builder) => ({
    login: builder.mutation<IClient, ILoginRequest>({
      query: (body) => ({ url: `/login`, method: "POST", body }),
    }),
    logout: builder.mutation({
      query: (body) => ({ url: `/logout`, method: "POST" }),
    }),
    register: builder.mutation<IClient, IRegisterRequest>({
      query: (body) => ({ url: `/register`, method: "POST", body }),
    }),
    getPhotos: builder.query({
      query: () => `/users/me`,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetPhotosQuery, useLogoutMutation } = api;
