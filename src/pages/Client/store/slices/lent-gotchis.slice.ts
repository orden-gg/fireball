import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { GotchiLending, SortingItem } from 'shared/models';

export interface LentGotchisState {
  lentGotchis: {
    data: GotchiLending[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  lentGotchisSorting: SortingItem;
}

const initialState: LentGotchisState = {
  lentGotchis: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  lentGotchisSorting: {
    type: 'kinship',
    dir: 'desc'
  }
};

export const lentGotchisSlice = createSlice({
  name: 'lentGotchis',
  initialState,
  reducers: {
    loadLentGotchis: (state): void => {
      state.lentGotchis = {
        ...state.lentGotchis,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadLentGotchisSucceded: (state, action: PayloadAction<GotchiLending[]>): void => {
      state.lentGotchis = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadLentGotchisFailed: (state): void => {
      state.lentGotchis = {
        ...state.lentGotchis,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setLentGotchisSorting: (state, action: PayloadAction<SortingItem>): void => {
      state.lentGotchisSorting = action.payload;
    }
  }
});

export const { loadLentGotchis, loadLentGotchisSucceded, loadLentGotchisFailed, setLentGotchisSorting } =
  lentGotchisSlice.actions;

export const lentGotchisReducer = lentGotchisSlice.reducer;
