import { createSlice } from "@reduxjs/toolkit";

import { api } from "src/data/api";
import type { IRootState } from "..";
import { IClient } from "src/data/types/client";

type AuthState = {
  account: IClient | null;
};

const slice = createSlice({
  name: "auth",
  initialState: { account: null } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.account = payload;
    });
  },
});

export default slice.reducer;

export const selectCurrentUser = (state: IRootState) => state.auth.account;
