import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GotchiLending, SortingItem } from 'shared/models';

export interface LentGotchisState {
  lentGotchis: {
    data: GotchiLending[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  isInitialLentGotchisLoading: boolean;
  lentGotchisSorting: SortingItem;
}

const initialState: LentGotchisState = {
  lentGotchis: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  isInitialLentGotchisLoading: true,
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
    setIsInitialLentGotchisLoading: (state, action: PayloadAction<boolean>): void => {
      state.isInitialLentGotchisLoading = action.payload;
    },
    setLentGotchisSorting: (state, action: PayloadAction<SortingItem>): void => {
      state.lentGotchisSorting = action.payload;
    }
  }
});

export const {
  loadLentGotchis,
  loadLentGotchisSucceded,
  loadLentGotchisFailed,
  setIsInitialLentGotchisLoading,
  setLentGotchisSorting
} = lentGotchisSlice.actions;

export const lentGotchisReducer = lentGotchisSlice.reducer;
