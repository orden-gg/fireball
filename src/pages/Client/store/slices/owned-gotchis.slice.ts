import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SortingItem } from 'shared/models';

import { OwnedGotchi } from '../../models';

export interface OwnedGotchisState {
  ownedGotchis: {
    data: OwnedGotchi[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  isInitialOwnedGotchisLoading: boolean;
  ownedGotchisSorting: SortingItem;
}

const initialState: OwnedGotchisState = {
  ownedGotchis: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  isInitialOwnedGotchisLoading: true,
  ownedGotchisSorting: {
    type: 'modifiedRarityScore',
    dir: 'desc'
  }
};

export const ownedGotchisSlice = createSlice({
  name: 'ownedGotchis',
  initialState,
  reducers: {
    loadOwnedGotchis: (state): void => {
      state.ownedGotchis = {
        ...state.ownedGotchis,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadOwnedGotchisSucceded: (state, action: PayloadAction<OwnedGotchi[]>): void => {
      state.ownedGotchis = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadOwnedGotchisFailed: (state): void => {
      state.ownedGotchis = {
        ...state.ownedGotchis,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setIsInitialOwnedGotchisLoading: (state, action: PayloadAction<boolean>): void => {
      state.isInitialOwnedGotchisLoading = action.payload;
    },
    setOwnedGotchisSorting: (state, action: PayloadAction<SortingItem>): void => {
      state.ownedGotchisSorting = action.payload;
    }
  }
});

export const {
  loadOwnedGotchis,
  loadOwnedGotchisSucceded,
  loadOwnedGotchisFailed,
  setIsInitialOwnedGotchisLoading,
  setOwnedGotchisSorting
} = ownedGotchisSlice.actions;

export const ownedGotchisReducer = ownedGotchisSlice.reducer;
