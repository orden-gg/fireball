import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { GuildRealm } from 'pages/Guilds/models';

export interface GuildRealmState {
  guildRealm: {
    data: GuildRealm[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
}

const initialState: GuildRealmState = {
  guildRealm: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  }
};

export const guildRealmSlice = createSlice({
  name: 'guildRealm',
  initialState,
  reducers: {
    loadGuildRealm: (state): void => {
      state.guildRealm = {
        ...state.guildRealm,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadGuildRealmSucceded: (state, action: PayloadAction<GuildRealm[]>): void => {
      state.guildRealm = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadGuildRealmFailed: (state): void => {
      state.guildRealm = {
        ...state.guildRealm,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    }
  }
});

export const { loadGuildRealm, loadGuildRealmSucceded, loadGuildRealmFailed } = guildRealmSlice.actions;

export const guildRealmReducer = guildRealmSlice.reducer;
