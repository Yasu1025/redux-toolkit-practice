import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cocktailSlice from "./slices/cocktailSlice";

export const store = configureStore({
  reducer: {
    cocktail: cocktailSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
