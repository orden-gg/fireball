import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SortingItem } from 'shared/models';

import { OwnedGotchi } from '../../models';

export interface OwnedGotchisState {
  ownedGotchis: {
    data: OwnedGotchi[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  ownedGotchisSorting: SortingItem;
}

const initialState: OwnedGotchisState = {
  ownedGotchis: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
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
    setOwnedGotchisSorting: (state, action: PayloadAction<SortingItem>): void => {
      state.ownedGotchisSorting = action.payload;
    }
  }
});

export const { loadOwnedGotchis, loadOwnedGotchisSucceded, loadOwnedGotchisFailed, setOwnedGotchisSorting } =
  ownedGotchisSlice.actions;

export const ownedGotchisReducer = ownedGotchisSlice.reducer;
