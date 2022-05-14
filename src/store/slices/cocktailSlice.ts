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

export const fetchAsyncSingleCocktail = createAsyncThunk(
  "cocktails/fetch/single",
  async ({ id }: { id: string }) => {
    return axios
      .get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((res) => res.data);
  }
);

export const fetchAsyncSearchCocktails = createAsyncThunk(
  "cocktails/fetch/search",
  async ({ searchStr }: { searchStr: string }) => {
    return axios
      .get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchStr}`
      )
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
    // All Cocktails
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
    // Single Cocktail
    builder.addCase(fetchAsyncSingleCocktail.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAsyncSingleCocktail.fulfilled,
      (state, { payload }) => {
        state.cocktail = payload.drinks;
        state.loading = false;
      }
    );
    builder.addCase(fetchAsyncSingleCocktail.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    // Search Cocktails
    builder.addCase(fetchAsyncSearchCocktails.pending, (state, _) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAsyncSearchCocktails.fulfilled,
      (state, { payload }) => {
        state.cocktails = payload.drinks;
        state.loading = false;
      }
    );
    builder.addCase(
      fetchAsyncSearchCocktails.rejected,
      (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      }
    );
  },
});

export const { setError } = cocktailSlice.actions;

export const selectCocktails = (state: RootState) => state.cocktail.cocktails;
export const selectCocktail = (state: RootState) => state.cocktail.cocktail;
export const selectLoading = (state: RootState) => state.cocktail.loading;
export const selectError = (state: RootState) => state.cocktail.error;

export default cocktailSlice.reducer;
