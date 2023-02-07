import { RootState } from 'core/store/store';

import { ActivityParcelListingFilters, ActivityParcelListingVM } from '../../models';

export const getActivityParcelsListings = (state: RootState): ActivityParcelListingVM[] =>
  state.baazaar.activity.parcels.activityParcelsListings.data;

export const getIsActivityParcelsListingsInitialDataLoading = (state: RootState): boolean =>
  state.baazaar.activity.parcels.isActivityParcelsListingsInitialDataLoading;

export const getIsActivityParcelsListingsLoading = (state: RootState): boolean =>
  state.baazaar.activity.parcels.activityParcelsListings.isLoading;

export const getActivityParcelsListingsFilters = (state: RootState): ActivityParcelListingFilters =>
  state.baazaar.activity.parcels.activityParcelsListingsFilters;

export const getActivityParcelsListingsQueryParamsOrder = (state: RootState): string[] =>
  state.baazaar.activity.parcels.activityParcelsListingsQueryParamsOrder;
