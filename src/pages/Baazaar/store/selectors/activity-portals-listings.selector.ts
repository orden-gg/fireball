import { RootState } from 'core/store/store';
import { GraphQueryParams } from 'shared/models';

import { ActivityPortalListingFilters, ActivityPortalListingVM } from '../../models';

export const getActivityPortalsListings = (state: RootState): ActivityPortalListingVM[] =>
    state.baazaar.activity.portals.activityPortalsListings.data;

export const getIsActivityPortalsListingsInitialDataLoading = (state: RootState): boolean =>
    state.baazaar.activity.portals.isActivityPortalsListingsInitialDataLoading;

export const getIsActivityPortalsListingsLoading = (state: RootState): boolean =>
    state.baazaar.activity.portals.activityPortalsListings.isLoading;

export const getActivityPortalsListingsGraphQueryParams = (state: RootState): GraphQueryParams =>
    state.baazaar.activity.portals.activityPortalsListingsGraphQueryParams;

export const getActivityPortalsListingsFilters = (state: RootState): ActivityPortalListingFilters =>
    state.baazaar.activity.portals.activityPortalsListingsFilters;

export const getActivityPortalsListingsQueryParamsOrder = (state: RootState): string[] =>
    state.baazaar.activity.portals.activityPortalsListingsQueryParamsOrder;
