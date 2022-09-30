import { RootState } from 'core/store/store';
import { SortingItem } from 'shared/models';

import { BaazaarGotchiListingVM } from '../../models';
import { GraphQueryParams } from '../slices';

export const getBaazaarGotchiListings = (state: RootState): BaazaarGotchiListingVM[] => state.baazaar.baazaarGotchiListings;
export const getGotchiListingsGraphQueryParams = (state: RootState): GraphQueryParams => state.baazaar.gotchiListingsGraphQueryParams;
export const getListingsLimitPerLoad = (state: RootState): number => state.baazaar.listingsLimitPerLoad;
export const getGotchiListingsSorting = (state: RootState): SortingItem => state.baazaar.gotchiListingsSorting;
export const getGotchiListingsFilters = (state: RootState): any => state.baazaar.gotchiListingsFilters;
