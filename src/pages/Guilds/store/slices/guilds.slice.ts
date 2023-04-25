import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Guild } from 'pages/Guilds/models';

export interface GuildsState {
  guilds: {
    data: Guild[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  currentGuild?: Guild;
  isInitialGuildsLoaded: boolean;
}

const initialState: GuildsState = {
  guilds: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  isInitialGuildsLoaded: true
};

export const guildsSlice = createSlice({
  name: 'borrowedGotchis',
  initialState,
  reducers: {
    loadGuilds: (state): void => {
      state.guilds = {
        ...state.guilds,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadGuildsSucceded: (state, action: PayloadAction<Guild[]>): void => {
      state.guilds = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadGuildsFailed: (state): void => {
      state.guilds = {
        ...state.guilds,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setIsInitialGuildsLoaded: (state, action: PayloadAction<boolean>): void => {
      state.isInitialGuildsLoaded = action.payload;
    },
    setGuild: (state, action: PayloadAction<Guild>): void => {
      state.currentGuild = action.payload;
    }
  }
});

export const { loadGuilds, loadGuildsSucceded, loadGuildsFailed, setIsInitialGuildsLoaded, setGuild } =
  guildsSlice.actions;

export const guildsReducer = guildsSlice.reducer;
