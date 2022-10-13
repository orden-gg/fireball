import { RootState } from 'core/store/store';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { ParcelListingFilters, ParcelListingVM } from '../../models';

export const getParcelsListings = (state: RootState): ParcelListingVM[] =>
    state.baazaar.parcels.parcelsListings;

export const getParcelsListingsGraphQueryParams = (state: RootState): GraphQueryParams =>
    state.baazaar.parcels.parcelsListingsGraphQueryParams;

export const getParcelsListingsLimitPerLoad = (state: RootState): number =>
    state.baazaar.parcels.parcelsListingsLimitPerLoad;

export const getParcelsListingsSorting = (state: RootState): SortingItem =>
    state.baazaar.parcels.parcelsListingsSorting;

export const getParcelsListingsFilters = (state: RootState): ParcelListingFilters =>
    state.baazaar.parcels.parcelsListingsFilters;
