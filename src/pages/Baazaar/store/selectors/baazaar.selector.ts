import { RootState } from 'core/store/store';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { BaazaarGotchiListingVM, GotchiListingsFilters } from '../../models';

export const getBaazaarGotchiListings = (state: RootState): BaazaarGotchiListingVM[] =>
    state.baazaar.baazaar.baazaarGotchiListings;

export const getGotchiListingsGraphQueryParams = (state: RootState): GraphQueryParams =>
    state.baazaar.baazaar.gotchiListingsGraphQueryParams;

export const getGotchiListingsLimitPerLoad = (state: RootState): number =>
    state.baazaar.baazaar.listingsLimitPerLoad;

export const getGotchiListingsSorting = (state: RootState): SortingItem =>
    state.baazaar.baazaar.gotchiListingsSorting;

export const getGotchiListingsFilters = (state: RootState): GotchiListingsFilters =>
    state.baazaar.baazaar.gotchiListingsFilters;
