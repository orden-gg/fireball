import { RootState } from 'core/store/store';

import { ActivityTileListingFilters, ActivityTileListingVM } from '../../models';

export const getActivityTilesListings = (state: RootState): ActivityTileListingVM[] =>
    state.baazaar.activity.tiles.activityTilesListings.data;

export const getIsActivityTilesListingsInitialDataLoading = (state: RootState): boolean =>
    state.baazaar.activity.tiles.isActivityTilesListingsInitialDataLoading;

export const getIsActivityTilesListingsLoading = (state: RootState): boolean =>
    state.baazaar.activity.tiles.activityTilesListings.isLoading;

export const getActivityTilesListingsFilters = (state: RootState): ActivityTileListingFilters =>
    state.baazaar.activity.tiles.activityTilesListingsFilters;

export const getActivityTilesListingsQueryParamsOrder = (state: RootState): string[] =>
    state.baazaar.activity.tiles.activityTilesListingsQueryParamsOrder;
