import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SortingItem } from 'shared/models';

import { GuildGotchi } from 'pages/Guilds/models';

export interface GuildGotchisState {
  guildGotchis: {
    data: GuildGotchi[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  guildGotchisSorting: SortingItem;
}

const initialState: GuildGotchisState = {
  guildGotchis: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  guildGotchisSorting: {
    type: 'modifiedRarityScore',
    dir: 'desc'
  }
};

export const guildGotchisSlice = createSlice({
  name: 'guildGotchis',
  initialState,
  reducers: {
    loadGuildGotchis: (state): void => {
      state.guildGotchis = {
        ...state.guildGotchis,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadGuildGotchisSucceded: (state, action: PayloadAction<GuildGotchi[]>): void => {
      state.guildGotchis = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadGuildGotchisFailed: (state): void => {
      state.guildGotchis = {
        ...state.guildGotchis,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setGuildGotchisSorting: (state, action: PayloadAction<SortingItem>): void => {
      state.guildGotchisSorting = action.payload;
    }
  }
});

export const { loadGuildGotchis, loadGuildGotchisSucceded, loadGuildGotchisFailed, setGuildGotchisSorting } =
  guildGotchisSlice.actions;

export const guildGotchisReducer = guildGotchisSlice.reducer;
