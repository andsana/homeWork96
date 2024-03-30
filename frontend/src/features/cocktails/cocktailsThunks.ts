import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  Cocktail,
  CocktailMutation,
  GlobalError,
  IngredientMutation,
} from '../../types';
import { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import axios from 'axios';

export const fetchCocktails = createAsyncThunk<
  Cocktail[],
  void,
  { state: RootState; rejectValue: GlobalError }
>('cocktails/fetchAll', async (_, { getState, rejectWithValue }) => {
  const token = getState().users.user?.token;

  try {
    const response = await axiosApi.get('/cocktails', {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const fetchOneCocktail = createAsyncThunk<Cocktail, string>(
  'cocktails/fetchOneCocktail',
  async (cocktailId) => {
    const response = await axiosApi.get<Cocktail | null>(
      `/cocktails/${cocktailId}`,
    );
    const cocktail = response.data;

    if (cocktail === null) {
      throw new Error('Not found');
    }
    return cocktail;
  },
);

export const createCocktail = createAsyncThunk<null, CocktailMutation>(
  'cocktails/create',
  async (cocktailMutation) => {
    const formData = new FormData();

    const keys = Object.keys(cocktailMutation) as (keyof CocktailMutation)[];
    keys.forEach((key) => {
      const value = cocktailMutation[key];

      if (value !== null) {
        if (key === 'ingredients' && Array.isArray(value)) {
          value.forEach((ingredient: IngredientMutation, index) => {
            formData.append(`${key}[${index}][title]`, ingredient.title);
            formData.append(
              `${key}[${index}][quantity]`,
              ingredient.quantity.toString(),
            );
          });
        } else if (value instanceof File || typeof value === 'string') {
          formData.append(key, value);
        }
      }
    });
    console.log('formData:', formData);

    return axiosApi.post('/cocktails', formData);
  },
);

export const deleteCocktail = createAsyncThunk<
  void,
  string,
  { state: RootState; rejectValue: GlobalError }
>('cocktails/delete', async (cocktailId, thunkAPI) => {
  const token = thunkAPI.getState().users.user?.token;

  if (!token) {
    return thunkAPI.rejectWithValue({ error: 'User is not authenticated' });
  }

  try {
    await axiosApi.delete(`/cocktails/${cocktailId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    thunkAPI.dispatch(fetchCocktails());
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const toggleCocktailPublishStatus = createAsyncThunk<
  void,
  string,
  { state: RootState; rejectValue: GlobalError }
>('cocktails/togglePublishStatus', async (cocktailId, thunkAPI) => {
  const token = thunkAPI.getState().users.user?.token;

  if (!token) {
    return thunkAPI.rejectWithValue({ error: 'User is not authenticated' });
  }

  try {
    await axiosApi.patch(
      `/cocktails/${cocktailId}/togglePublished`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    thunkAPI.dispatch(fetchCocktails());
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
    throw e;
  }
});
