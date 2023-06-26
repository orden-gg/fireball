import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GuildChannelingActivity } from 'pages/Guilds/models';

export interface GuildDashboardState {
  guildChanneling: {
    data: GuildChannelingActivity[];
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
    }
  }
});

export const { loadGuildChanneling, loadGuildChannelingSucceded, loadGuildChannelingFailed } =
  guildDashboardSlice.actions;

export const guildDashboardReducer = guildDashboardSlice.reducer;
