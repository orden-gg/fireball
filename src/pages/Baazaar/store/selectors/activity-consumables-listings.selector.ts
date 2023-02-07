import { RootState } from 'core/store/store';

import { ActivityConsumableListingFilters, ActivityConsumableListingVM } from '../../models';

export const getActivityConsumablesListings = (state: RootState): ActivityConsumableListingVM[] =>
  state.baazaar.activity.consumables.activityConsumablesListings.data;

export const getIsActivityConsumablesListingsInitialDataLoading = (state: RootState): boolean =>
  state.baazaar.activity.consumables.isActivityConsumablesListingsInitialDataLoading;

export const getIsActivityConsumablesListingsLoading = (state: RootState): boolean =>
  state.baazaar.activity.consumables.activityConsumablesListings.isLoading;

export const getActivityConsumablesListingsFilters = (state: RootState): ActivityConsumableListingFilters =>
  state.baazaar.activity.consumables.activityConsumablesListingsFilters;

export const getActivityConsumablesListingsQueryParamsOrder = (state: RootState): string[] =>
  state.baazaar.activity.consumables.activityConsumablesListingsQueryParamsOrder;
