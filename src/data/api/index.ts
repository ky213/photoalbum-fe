import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IUser, IClient, ILoginRequest, IRegisterRequest } from "src/data/types/client";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["Client", "Photos"],
  endpoints: (builder) => ({
    login: builder.mutation<IUser, ILoginRequest>({
      query: (body) => ({ url: `/login`, method: "POST", body }),
    }),
    register: builder.mutation<IClient, IRegisterRequest>({
      query: (body) => ({ url: `/register`, method: "POST", body }),
    }),
    getPhotos: builder.query({
      query: () => `/users/me`,
      //TODO: fix "any" typing
      transformResponse: (response: any) => response.photos,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetPhotosQuery } = api;
