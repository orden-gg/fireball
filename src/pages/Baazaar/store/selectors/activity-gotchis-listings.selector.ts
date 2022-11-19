import { RootState } from 'core/store/store';

import { ActivityGotchiListingFilters, ActivityGotchiListingVM } from '../../models';

export const getActivityGotchisListings = (state: RootState): ActivityGotchiListingVM[] =>
    state.baazaar.activity.gotchis.activityGotchisListings.data;

export const getIsActivityGotchisListingsInitialDataLoading = (state: RootState): boolean =>
    state.baazaar.activity.gotchis.isActivityGotchisListingsInitialDataLoading;

export const getIsActivityGotchisListingsLoading = (state: RootState): boolean =>
    state.baazaar.activity.gotchis.activityGotchisListings.isLoading;

export const getActivityGotchisListingsFilters = (state: RootState): ActivityGotchiListingFilters =>
    state.baazaar.activity.gotchis.activityGotchisListingsFilters;

export const getActivityGotchisListingsQueryParamsOrder = (state: RootState): string[] =>
    state.baazaar.activity.gotchis.activityGotchisListingsQueryParamsOrder;
