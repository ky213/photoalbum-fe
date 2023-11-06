import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IRootState } from "..";
import { IUser } from "src/data/types/client";

type AuthState = {
  account: IUser | null;
};

const slice = createSlice({
  name: "auth",
  initialState: { account: null } as AuthState,
  reducers: {
    setAccount: (state, { payload: { account } }: PayloadAction<{ account: IUser }>) => {
      state.account = account;
    },
  },
});

export const { setAccount } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: IRootState) => state.auth.account;
