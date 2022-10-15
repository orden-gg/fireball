import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc721Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { ParcelListingFilters, ParcelListingVM } from '../../models';
import { parcelListingFiltersData } from '../../static';

export interface ParcelsListingsState {
    parcelsListings: ParcelListingVM[];
    parcelsListingsLimitPerLoad: number;
    parcelsListingsGraphQueryParams: GraphQueryParams;
    parcelsListingsSorting: SortingItem;
    parcelsListingsFilters: ParcelListingFilters;
    parcelsListingsQueryParamsOrder: string[];
}

const initialState: ParcelsListingsState = {
    parcelsListings: [],
    parcelsListingsLimitPerLoad: 50,
    parcelsListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timeCreated',
        orderDirection: 'asc',
        where: {
            category: Erc721Categories.Realm
        }
    },
    parcelsListingsSorting: { type: 'timeCreated', dir: 'desc' },
    parcelsListingsFilters: parcelListingFiltersData,
    parcelsListingsQueryParamsOrder: ['sort', 'dir']
};

export const parcelsListingsSlice = createSlice({
    name: 'parcelsListings',
    initialState,
    reducers: {
        setParcelsListings: (state, action: PayloadAction<ParcelListingVM[]>): void => {
            state.parcelsListings = action.payload;
        },
        setParcelsListingsSkipLimit: (state, action: PayloadAction<number>): void => {
            state.parcelsListingsGraphQueryParams.skip = action.payload;
        },
        setParcelsListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.parcelsListingsSorting = action.payload;

            state.parcelsListingsGraphQueryParams.orderBy = action.payload.type;
            state.parcelsListingsGraphQueryParams.orderDirection = action.payload.dir;
        },
        setParcelsListingsFilters: (state, action: PayloadAction<ParcelListingFilters>): void => {
            state.parcelsListingsFilters = action.payload;
        }
    }
});

export const {
    setParcelsListings,
    setParcelsListingsSkipLimit,
    setParcelsListingsSorting,
    setParcelsListingsFilters
} = parcelsListingsSlice.actions;

export const parcelsListingsReducer = parcelsListingsSlice.reducer;
