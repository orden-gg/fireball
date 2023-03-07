import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FakeGotchi } from 'shared/models';

export interface MintedGotchisState {
  mintedGotchis: {
    data: FakeGotchi[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
}

const initialState: MintedGotchisState = {
  mintedGotchis: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  }
};

export const mintedGotchisSlice = createSlice({
  name: 'mintedGotchis',
  initialState,
  reducers: {
    loadMintedGotchis: (state): void => {
      state.mintedGotchis = {
        ...state.mintedGotchis,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadMintedGotchisSucceded: (state, action: PayloadAction<FakeGotchi[]>): void => {
      state.mintedGotchis = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadMintedGotchisFailed: (state): void => {
      state.mintedGotchis = {
        ...state.mintedGotchis,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    }
  }
});

export const { loadMintedGotchis, loadMintedGotchisSucceded, loadMintedGotchisFailed } = mintedGotchisSlice.actions;

export const mintedGotchisReducer = mintedGotchisSlice.reducer;
