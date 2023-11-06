import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginRequest, IUser } from "src/data/types/client";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["Client", "Photos"],
  endpoints: (builder) => ({
    login: builder.mutation<IUser, ILoginRequest>({
      query: (body) => ({ url: `/login`, method: "POST", body }),
    }),
  }),
});

export const { useLoginMutation } = api;
