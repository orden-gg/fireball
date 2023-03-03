import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SortingItem } from 'shared/models';

import { ClientPortal } from '../../models';

export interface PortalsState {
  portals: {
    data: ClientPortal[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  portalsSorting: SortingItem;
}

const initialState: PortalsState = {
  portals: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  portalsSorting: {
    type: 'haunt',
    dir: 'asc'
  }
};

export const portalsSlice = createSlice({
  name: 'portals',
  initialState,
  reducers: {
    loadPortals: (state): void => {
      state.portals = {
        ...state.portals,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadPortalsSucceded: (state, action: PayloadAction<ClientPortal[]>): void => {
      state.portals = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadPortalsFailed: (state): void => {
      state.portals = {
        ...state.portals,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setPortalsSorting: (state, action: PayloadAction<SortingItem>): void => {
      state.portalsSorting = action.payload;
    }
  }
});

export const { loadPortals, loadPortalsSucceded, loadPortalsFailed, setPortalsSorting } = portalsSlice.actions;

export const portalsReducer = portalsSlice.reducer;
