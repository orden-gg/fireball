import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { TilesState } from '../slices';

const tilesStateSelector = createSelector(
  (state: RootState) => state.client.tiles,
  (tilesState: TilesState) => tilesState
);

export const getTiles = createSelector(tilesStateSelector, (state: TilesState) => state.tiles.data);

export const getTilesCount = createSelector(tilesStateSelector, (state: TilesState) => state.tiles.data.length);

export const getIsInitialTilesLoading = createSelector(
  tilesStateSelector,
  (state: TilesState) => state.isInitialTilesLoading
);
