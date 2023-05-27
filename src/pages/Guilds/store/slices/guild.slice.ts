import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GeneralGuildStats } from 'pages/Guilds/models';

const initialGuildStats: GeneralGuildStats = {
  gotchisCount: 0,
  itemsCount: 0,
  portalsCount: 0,
  realmCount: 0,
  installationsCount: 0,
  tilesCount: 0,
  votingPower: 0
};

export interface GuildState {
  guildStats: {
    data: GeneralGuildStats;
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  guildPlayersStats: GeneralGuildStats[];
}

const initialState: GuildState = {
  guildStats: {
    data: {
      ...initialGuildStats
    },
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  guildPlayersStats: []
};

export const guildSlice = createSlice({
  name: 'guild',
  initialState,
  reducers: {
    loadGuildInfo: (state): void => {
      state.guildStats = {
        ...state.guildStats,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadGuildInfoSucceded: (state, action: PayloadAction<GeneralGuildStats>): void => {
      state.guildStats = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadGuildInfoFailed: (state): void => {
      state.guildStats = {
        ...state.guildStats,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setGuildPlayersStats: (state, action: PayloadAction<GeneralGuildStats[]>): void => {
      state.guildPlayersStats = action.payload;
    },
    resetGuildInfo: (state): void => {
      state.guildStats = {
        data: {
          ...initialGuildStats
        },
        isLoading: false,
        isLoaded: false,
        isError: false
      };
      state.guildPlayersStats = [];
    }
  }
});

export const { loadGuildInfo, loadGuildInfoSucceded, loadGuildInfoFailed, setGuildPlayersStats, resetGuildInfo } =
  guildSlice.actions;

export const guildReducer = guildSlice.reducer;
