import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { TilesListingsState } from '../slices';

const tilesListingsStateSelector = createSelector(
  (state: RootState) => state.baazaar.tiles,
  (tilesListingsState: TilesListingsState) => tilesListingsState
);

export const getTilesListings = createSelector(
  tilesListingsStateSelector,
  (state: TilesListingsState) => state.tilesListings.data
);

export const getIsTilesListingsInitialDataLoading = createSelector(
  tilesListingsStateSelector,
  (state: TilesListingsState) => state.isTilesListingsInitialDataLoading
);

export const getIsTilesListingsLoading = createSelector(
  tilesListingsStateSelector,
  (state: TilesListingsState) => state.tilesListings.isLoading
);

export const getTilesListingsGraphQueryParams = createSelector(
  tilesListingsStateSelector,
  (state: TilesListingsState) => state.tilesListingsGraphQueryParams
);

export const getTilesListingsLimitPerLoad = createSelector(
  tilesListingsStateSelector,
  (state: TilesListingsState) => state.tilesListingsLimitPerLoad
);

export const getTilesListingsDefaultSorting = createSelector(
  tilesListingsStateSelector,
  (state: TilesListingsState) => state.tilesListingsDefaultSorting
);

export const getTilesListingsSorting = createSelector(
  tilesListingsStateSelector,
  (state: TilesListingsState) => state.tilesListingsSorting
);

export const getTilesListingsFilters = createSelector(
  tilesListingsStateSelector,
  (state: TilesListingsState) => state.tilesListingsFilters
);

export const getTilesListingsQueryParamsOrder = createSelector(
  tilesListingsStateSelector,
  (state: TilesListingsState) => state.tilesListingsQueryParamsOrder
);
