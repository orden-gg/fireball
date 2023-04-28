import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SortingItem } from 'shared/models';

import { GuildGotchiBorrowedExtended } from 'pages/Guilds/models';

export interface BorrowedGotchisState {
  borrowedGotchis: {
    data: GuildGotchiBorrowedExtended[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  isInitialBorrowedGotchisLoading: boolean;
  borrowedGotchisSorting: SortingItem;
}

const initialState: BorrowedGotchisState = {
  borrowedGotchis: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  isInitialBorrowedGotchisLoading: true,
  borrowedGotchisSorting: {
    type: 'kinship',
    dir: 'desc'
  }
};

export const borrowedGotchisSlice = createSlice({
  name: 'borrowedGotchis',
  initialState,
  reducers: {
    loadBorrowedGotchis: (state): void => {
      state.borrowedGotchis = {
        ...state.borrowedGotchis,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadBorrowedGotchisSucceded: (state, action: PayloadAction<GuildGotchiBorrowedExtended[]>): void => {
      state.borrowedGotchis = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadBorrowedGotchisFailed: (state): void => {
      state.borrowedGotchis = {
        ...state.borrowedGotchis,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setIsInitialBorrowedGotchisLoading: (state, action: PayloadAction<boolean>): void => {
      state.isInitialBorrowedGotchisLoading = action.payload;
    },
    setBorrowedGotchisSorting: (state, action: PayloadAction<SortingItem>): void => {
      state.borrowedGotchisSorting = action.payload;
    }
  }
});

export const {
  loadBorrowedGotchis,
  loadBorrowedGotchisSucceded,
  loadBorrowedGotchisFailed,
  setIsInitialBorrowedGotchisLoading,
  setBorrowedGotchisSorting
} = borrowedGotchisSlice.actions;

export const borrowedGotchisReducer = borrowedGotchisSlice.reducer;
