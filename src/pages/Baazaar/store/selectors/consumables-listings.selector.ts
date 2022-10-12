import { RootState } from 'core/store/store';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { ConsumableListingFilters, ConsumableListingVM } from '../../models';

export const getConsumablesListings = (state: RootState): ConsumableListingVM[] =>
    state.baazaar.consumables.consumablesListings;

export const getConsumablesListingsGraphQueryParams = (state: RootState): GraphQueryParams =>
    state.baazaar.consumables.consumablesListingsGraphQueryParams;

export const getConsumablesListingsLimitPerLoad = (state: RootState): number =>
    state.baazaar.consumables.consumablesListingsLimitPerLoad;

export const getConsumablesListingsSorting = (state: RootState): SortingItem =>
    state.baazaar.consumables.consumablesListingsSorting;

export const getConsumablesListingsFilters = (state: RootState): ConsumableListingFilters =>
    state.baazaar.consumables.consumablesListingsFilters;
