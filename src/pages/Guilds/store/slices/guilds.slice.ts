import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Guild } from 'pages/Guilds/models';

export interface GuildsState {
  guilds: {
    data: Guild[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  currentGuild: {
    data: Guild | null;
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
}

const initialState: GuildsState = {
  guilds: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  currentGuild: {
    data: null,
    isLoading: false,
    isLoaded: false,
    isError: false
  }
};

export const guildsSlice = createSlice({
  name: 'guilds',
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
    loadCurrentGuildById: (state): void => {
      state.currentGuild = {
        ...state.currentGuild,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadCurrentGuildByIdSucceded: (state, action: PayloadAction<Guild>): void => {
      state.currentGuild = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadCurrentGuildByIdFailed: (state): void => {
      state.currentGuild = {
        ...state.currentGuild,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setCurrentGuild: (state, action: PayloadAction<Guild>): void => {
      state.currentGuild = {
        ...state.currentGuild,
        data: action.payload,
        isLoaded: true
      };
    }
  }
});

export const {
  loadGuilds,
  loadGuildsSucceded,
  loadGuildsFailed,
  loadCurrentGuildById,
  loadCurrentGuildByIdSucceded,
  loadCurrentGuildByIdFailed,
  setCurrentGuild
} = guildsSlice.actions;

export const guildsReducer = guildsSlice.reducer;
