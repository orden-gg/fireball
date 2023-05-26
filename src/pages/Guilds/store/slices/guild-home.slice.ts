import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GeneralGuildStats } from 'pages/Guilds/models';

export interface GuildHomeState {
  guildHome: {
    data: GeneralGuildStats[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
}

const initialState: GuildHomeState = {
  guildHome: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  }
};

export const guildHomeSlice = createSlice({
  name: 'guildHome',
  initialState,
  reducers: {
    loadHomeInfo: (state): void => {
      state.guildHome = {
        ...state.guildHome,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadHomeInfoSucceded: (state, action: PayloadAction<GeneralGuildStats[]>): void => {
      state.guildHome = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadHomeInfoFailed: (state): void => {
      state.guildHome = {
        ...state.guildHome,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    }
  }
});

export const { loadHomeInfo, loadHomeInfoSucceded, loadHomeInfoFailed } = guildHomeSlice.actions;

export const guildHomeReducer = guildHomeSlice.reducer;
