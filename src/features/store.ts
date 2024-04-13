import { configureStore } from "@reduxjs/toolkit";
import searchSlice from "./searchSlice";
import { cinemasApi } from "./api/cinemasSlice";

export const store = configureStore({
  reducer: {
    [cinemasApi.reducerPath]: cinemasApi.reducer,
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cinemasApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
