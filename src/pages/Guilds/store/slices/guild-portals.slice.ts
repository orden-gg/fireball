import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SortingItem } from 'shared/models';

import { GuildPortal } from 'pages/Guilds/models';

export interface GuildPortalsState {
  guildPortals: {
    data: GuildPortal[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  guildPortalsSorting: SortingItem;
}

const initialState: GuildPortalsState = {
  guildPortals: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  guildPortalsSorting: {
    type: 'id',
    dir: 'asc'
  }
};

export const guildPortalsSlice = createSlice({
  name: 'guildPortals',
  initialState,
  reducers: {
    loadGuildPortals: (state): void => {
      state.guildPortals = {
        ...state.guildPortals,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadGuildPortalsSucceded: (state, action: PayloadAction<GuildPortal[]>): void => {
      state.guildPortals = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadGuildPortalsFailed: (state): void => {
      state.guildPortals = {
        ...state.guildPortals,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setGuildPortalsSorting: (state, action: PayloadAction<SortingItem>): void => {
      state.guildPortalsSorting = action.payload;
    }
  }
});

export const { loadGuildPortals, loadGuildPortalsSucceded, loadGuildPortalsFailed, setGuildPortalsSorting } =
  guildPortalsSlice.actions;

export const guildPortalsReducer = guildPortalsSlice.reducer;
