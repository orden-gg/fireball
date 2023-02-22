import { RootState } from 'core/store/store';

import { ActivityWearableListingFilters, ActivityWearableListingVM } from '../../models';

export const getActivityWearablesListings = (state: RootState): ActivityWearableListingVM[] =>
  state.baazaar.activity.wearables.activityWearablesListings.data;

export const getIsActivityWearablesListingsInitialDataLoading = (state: RootState): boolean =>
  state.baazaar.activity.wearables.isActivityWearablesListingsInitialDataLoading;

export const getIsActivityWearablesListingsLoading = (state: RootState): boolean =>
  state.baazaar.activity.wearables.activityWearablesListings.isLoading;

export const getActivityWearablesListingsFilters = (state: RootState): ActivityWearableListingFilters =>
  state.baazaar.activity.wearables.activityWearablesListingsFilters;

export const getActivityWearablesListingsQueryParamsOrder = (state: RootState): string[] =>
  state.baazaar.activity.wearables.activityWearablesListingsQueryParamsOrder;
