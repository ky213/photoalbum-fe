import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { api } from "src/data/api";
import type { IRootState } from "..";
import { IPhoto } from "src/data/types/photo";

type IPhotosState = {
  photos: IPhoto[];
};

const slice = createSlice({
  name: "photos",
  initialState: { photos: [] } as IPhotosState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.getPhotos.matchFulfilled, (state, { payload }) => {
      state.photos = payload.photos;
    });
  },
});

export default slice.reducer;

export const selectCurrentUser = (state: IRootState) => state.photos.photos;
