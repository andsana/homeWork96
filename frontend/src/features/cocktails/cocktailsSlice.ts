import { createSlice } from '@reduxjs/toolkit';
import {
  deleteCocktail,
  fetchCocktails,
  fetchOneCocktail,
  toggleCocktailPublishStatus,
} from './cocktailsThunks';
import { Cocktail } from '../../types';
import { RootState } from '../../app/store';

interface CocktailsState {
  items: Cocktail[];
  item: Cocktail | null;
  fetchLoading: boolean;
  fetchOneCocktailLoading: boolean;
  deleteCocktailLoading: false | string;
  toggleCocktailPublishStatusLoading: false | string;
}

const initialState: CocktailsState = {
  items: [],
  item: null,
  fetchLoading: false,
  fetchOneCocktailLoading: false,
  deleteCocktailLoading: false,
  toggleCocktailPublishStatusLoading: false,
};

export const cocktailsSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktails.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchCocktails.fulfilled, (state, { payload: cocktails }) => {
        state.fetchLoading = false;
        state.items = cocktails;
      })
      .addCase(fetchCocktails.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(fetchOneCocktail.pending, (state) => {
        state.fetchOneCocktailLoading = true;
      })
      .addCase(fetchOneCocktail.fulfilled, (state, { payload: cocktail }) => {
        state.fetchOneCocktailLoading = false;
        state.item = cocktail;
      })
      .addCase(fetchOneCocktail.rejected, (state) => {
        state.fetchOneCocktailLoading = false;
      })

      .addCase(deleteCocktail.pending, (state, { meta }) => {
        state.deleteCocktailLoading = meta.arg;
      })
      .addCase(deleteCocktail.fulfilled, (state) => {
        state.deleteCocktailLoading = false;
      })
      .addCase(deleteCocktail.rejected, (state) => {
        state.deleteCocktailLoading = false;
      })

      .addCase(toggleCocktailPublishStatus.pending, (state, { meta }) => {
        state.toggleCocktailPublishStatusLoading = meta.arg;
      })
      .addCase(toggleCocktailPublishStatus.fulfilled, (state) => {
        state.toggleCocktailPublishStatusLoading = false;
      })
      .addCase(toggleCocktailPublishStatus.rejected, (state) => {
        state.toggleCocktailPublishStatusLoading = false;
      });
  },
});

export const cocktailsReducer = cocktailsSlice.reducer;
export const selectCocktails = (state: RootState) => state.cocktails.items;
export const selectCocktail = (state: RootState) => state.cocktails.item;
export const selectCocktailsLoading = (state: RootState) =>
  state.cocktails.fetchLoading;
export const selectCocktailById = (state: RootState, cocktailId: string) =>
  state.cocktails.items.find((cocktail) => cocktail._id === cocktailId);
export const selectDeleteLoading = (state: RootState) =>
  state.cocktails?.deleteCocktailLoading;

export const selectToggleCocktailPublishStatusLoading = (state: RootState) =>
  state.cocktails.toggleCocktailPublishStatusLoading;
