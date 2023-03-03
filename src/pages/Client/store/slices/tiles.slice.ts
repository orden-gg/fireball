import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { InstallationAndTile } from '../../models';

export interface TilesState {
  tiles: {
    data: InstallationAndTile[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
}

const initialState: TilesState = {
  tiles: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  }
};

export const tilesSlice = createSlice({
  name: 'tiles',
  initialState,
  reducers: {
    loadTiles: (state): void => {
      state.tiles = {
        ...state.tiles,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadTilesSucceded: (state, action: PayloadAction<InstallationAndTile[]>): void => {
      state.tiles = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadTilesFailed: (state): void => {
      state.tiles = {
        ...state.tiles,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    }
  }
});

export const { loadTiles, loadTilesSucceded, loadTilesFailed } = tilesSlice.actions;

export const tilesReducer = tilesSlice.reducer;
