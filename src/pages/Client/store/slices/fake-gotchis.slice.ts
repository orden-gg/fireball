import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FakeItemsVM } from 'pages/Client/models';

export interface ClientFakeGotchisState {
  fakeGotchis: {
    data: FakeItemsVM | null;
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  isInitialFakeGotchisLoading: boolean;
}

const initialState: ClientFakeGotchisState = {
  fakeGotchis: {
    data: null,
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  isInitialFakeGotchisLoading: true
};

export const fakeGotchisSlice = createSlice({
  name: 'fakeGotchis',
  initialState,
  reducers: {
    loadFakeGotchis: (state): void => {
      state.fakeGotchis = {
        ...state.fakeGotchis,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadFakeGotchisSucceded: (state, action: PayloadAction<FakeItemsVM>): void => {
      state.fakeGotchis = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadFakeGotchisFailed: (state): void => {
      state.fakeGotchis = {
        ...state.fakeGotchis,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setIsInitialFakeGotchisLoading: (state, action: PayloadAction<boolean>): void => {
      state.isInitialFakeGotchisLoading = action.payload;
    },
    resetFakeGotchis: (state): void => {
      state.fakeGotchis = {
        data: null,
        isLoading: false,
        isLoaded: false,
        isError: false
      };
    }
  }
});

export const {
  loadFakeGotchis,
  loadFakeGotchisSucceded,
  loadFakeGotchisFailed,
  setIsInitialFakeGotchisLoading,
  resetFakeGotchis
} = fakeGotchisSlice.actions;

export const fakeGotchisReducer = fakeGotchisSlice.reducer;
