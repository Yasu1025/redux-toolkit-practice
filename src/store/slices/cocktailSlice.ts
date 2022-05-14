import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cocktail } from "../../models/Cocktail";
import { RootState } from "../store";
import axios from "axios";

export interface IFState {
  cocktails: Cocktail[];
  cocktail: Cocktail[];
  loading: boolean;
  error: any;
}

const initialState: IFState = {
  cocktails: [],
  cocktail: [],
  loading: false,
  error: false,
};

export const fetchAsyncCocktails = createAsyncThunk(
  "cocktails/fetch",
  async () => {
    return axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=")
      .then((res) => res.data);
  }
);

const cocktailSlice = createSlice({
  name: "cocktail",
  initialState,
  reducers: {
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncCocktails.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(fetchAsyncCocktails.fulfilled, (state, { payload }) => {
      state.cocktails = payload.drinks;
      state.loading = false;
    });
    builder.addCase(fetchAsyncCocktails.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { setError } = cocktailSlice.actions;

export const selectCocktails = (state: RootState) => state.cocktail.cocktails;
export const selectCocktail = (state: RootState) => state.cocktail.cocktail;
export const selectLoading = (state: RootState) => state.cocktail.loading;
export const selectError = (state: RootState) => state.cocktail.error;

export default cocktailSlice.reducer;
