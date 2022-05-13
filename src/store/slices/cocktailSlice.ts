import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface IFState {
  cocktails: any[]; // TODO
  cocktail: any[]; // TODO
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
    return fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?s="
    ).then((res) => res.json());
  }
);

const cocktailSlice = createSlice({
  name: "cocktail",
  initialState,
  reducers: {},
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

export default cocktailSlice.reducer;
