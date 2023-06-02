import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SortingItem } from 'shared/models';

import { Warehouse } from 'pages/Client/models';

export interface GuildWearablesState {
  guildWearables: {
    data: Warehouse[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  guildWearablesSorting: SortingItem;
}

const initialState: GuildWearablesState = {
  guildWearables: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  guildWearablesSorting: {
    type: 'rarityId',
    dir: 'desc'
  }
};

export const guildWearablesSlice = createSlice({
  name: 'guildWearables',
  initialState,
  reducers: {
    loadGuildWearables: (state): void => {
      state.guildWearables = {
        ...state.guildWearables,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadGuildWearablesSucceded: (state, action: PayloadAction<Warehouse[]>): void => {
      state.guildWearables = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadGuildWearablesFailed: (state): void => {
      state.guildWearables = {
        ...state.guildWearables,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setGuildWearablesSorting: (state, action: PayloadAction<SortingItem>): void => {
      state.guildWearablesSorting = action.payload;
    },
    setGuildWearables: (state, action: PayloadAction<Warehouse[]>): void => {
      state.guildWearables.data = action.payload;
    }
  }
});

export const {
  loadGuildWearables,
  loadGuildWearablesSucceded,
  loadGuildWearablesFailed,
  setGuildWearablesSorting,
  setGuildWearables
} = guildWearablesSlice.actions;

export const guildWearablesReducer = guildWearablesSlice.reducer;
