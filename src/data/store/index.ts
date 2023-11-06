import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";

import { api } from "../api";
import auth from "./reducers/auth";

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  auth,
});

export const setupStore = (preloadedState?: PreloadedState<IRootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
    preloadedState,
  });
};

export type IRootState = ReturnType<typeof rootReducer>;
export type IAppStore = ReturnType<typeof setupStore>;
export type AppDispatch = IAppStore["dispatch"];
