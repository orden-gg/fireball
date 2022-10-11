import { RootState } from 'core/store/store';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { WearableListingFilters, WearableListingVM } from '../../models';

export const getWearablesListings = (state: RootState): WearableListingVM[] =>
    state.baazaar.wearables.wearablesListings;

export const getWearablesListingsGraphQueryParams = (state: RootState): GraphQueryParams =>
    state.baazaar.wearables.wearablesListingsGraphQueryParams;

export const getWearablesListingsLimitPerLoad = (state: RootState): number =>
    state.baazaar.wearables.wearablesListingsLimitPerLoad;

export const getWearablesListingsSorting = (state: RootState): SortingItem =>
    state.baazaar.wearables.wearablesListingsSorting;

export const getWearablesListingsFilters = (state: RootState): WearableListingFilters =>
    state.baazaar.wearables.wearablesListingsFilters;
