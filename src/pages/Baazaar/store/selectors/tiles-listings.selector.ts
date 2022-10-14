import { RootState } from 'core/store/store';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { TileListingFilters, TileListingVM } from '../../models';

export const getTilesListings = (state: RootState): TileListingVM[] =>
    state.baazaar.tiles.tilesListings;

export const getTilesListingsGraphQueryParams = (state: RootState): GraphQueryParams =>
    state.baazaar.tiles.tilesListingsGraphQueryParams;

export const getTilesListingsLimitPerLoad = (state: RootState): number =>
    state.baazaar.tiles.tilesListingsLimitPerLoad;

export const getTilesListingsSorting = (state: RootState): SortingItem =>
    state.baazaar.tiles.tilesListingsSorting;

export const getTilesListingsFilters = (state: RootState): TileListingFilters =>
    state.baazaar.tiles.tilesListingsFilters;
