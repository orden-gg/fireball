import { RootState } from 'core/store/store';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { TileListingFilters, TileListingVM } from '../../models';

export const getTilesListings = (state: RootState): TileListingVM[] =>
    state.baazaar.tiles.tilesListings.data;

export const getIsTilesListingsInitialDataLoading = (state: RootState): boolean =>
    state.baazaar.tiles.isTilesListingsInitialDataLoading;

export const getIsTilesListingsLoading = (state: RootState): boolean =>
    state.baazaar.tiles.tilesListings.isLoading;

export const getTilesListingsGraphQueryParams = (state: RootState): GraphQueryParams =>
    state.baazaar.tiles.tilesListingsGraphQueryParams;

export const getTilesListingsLimitPerLoad = (state: RootState): number =>
    state.baazaar.tiles.tilesListingsLimitPerLoad;

export const getTilesListingsDefaultSorting = (state: RootState): SortingItem =>
    state.baazaar.tiles.tilesListingsDefaultSorting;

export const getTilesListingsSorting = (state: RootState): SortingItem =>
    state.baazaar.tiles.tilesListingsSorting;

export const getTilesListingsFilters = (state: RootState): TileListingFilters =>
    state.baazaar.tiles.tilesListingsFilters;

export const getTilesListingsQueryParamsOrder = (state: RootState): string[] =>
    state.baazaar.tiles.tilesListingsQueryParamsOrder;
