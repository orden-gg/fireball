import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GuildChannelingActivity, GuildClaimsActivity } from 'pages/Guilds/models';

export interface GuildDashboardState {
  guildChanneling: {
    data: GuildChannelingActivity[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  guildClaims: {
    data: GuildClaimsActivity[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
}

const initialState: GuildDashboardState = {
  guildChanneling: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  guildClaims: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  }
};

export const guildDashboardSlice = createSlice({
  name: 'guildDashboard',
  initialState,
  reducers: {
    loadGuildChanneling: (state): void => {
      state.guildChanneling = {
        ...state.guildChanneling,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadGuildChannelingSucceded: (state, action: PayloadAction<GuildChannelingActivity[]>): void => {
      state.guildChanneling = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadGuildChannelingFailed: (state): void => {
      state.guildChanneling = {
        ...state.guildChanneling,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    loadGuildClaims: (state): void => {
      state.guildClaims = {
        ...state.guildClaims,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadGuildClaimsSucceded: (state, action: PayloadAction<GuildClaimsActivity[]>): void => {
      state.guildClaims = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadGuildClaimsFailed: (state): void => {
      state.guildClaims = {
        ...state.guildClaims,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    }
  }
});

export const {
  loadGuildChanneling,
  loadGuildChannelingSucceded,
  loadGuildChannelingFailed,
  loadGuildClaims,
  loadGuildClaimsSucceded,
  loadGuildClaimsFailed
} = guildDashboardSlice.actions;

export const guildDashboardReducer = guildDashboardSlice.reducer;
