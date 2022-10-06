import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc721Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { BaazaarGotchiListingVM, GotchiListingsFilters } from '../../models';
import { gotchiListingsFiltersData } from '../../static';

export interface BaazaarState {
    baazaarGotchiListings: BaazaarGotchiListingVM[];
    listingsLimitPerLoad: number;
    gotchiListingsGraphQueryParams: GraphQueryParams;
    gotchiListingsSorting: SortingItem;
    gotchiListingsFilters: GotchiListingsFilters;
}

const initialState: BaazaarState = {
    baazaarGotchiListings: [],
    listingsLimitPerLoad: 50,
    gotchiListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timeCreated',
        orderDirection: 'asc',
        where: {
            category: Erc721Categories.Aavegotchi
        }
    },
    gotchiListingsSorting: { type: 'timeCreated', dir: 'desc' },
    gotchiListingsFilters: gotchiListingsFiltersData
};

export const baazaarSlice = createSlice({
    name: 'baazaar',
    initialState,
    reducers: {
        setBaazaarGotchiListings: (state, action: PayloadAction<BaazaarGotchiListingVM[]>): void => {
            state.baazaarGotchiListings = action.payload;
        },
        setGotchiListingsSkipLimit: (state, action: PayloadAction<number>): void => {
            state.gotchiListingsGraphQueryParams.skip = action.payload;
        },
        setGotchiListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.gotchiListingsSorting = action.payload;

            state.gotchiListingsGraphQueryParams.orderBy = action.payload.type;
            state.gotchiListingsGraphQueryParams.orderDirection = action.payload.dir;
        },
        setGotchiListingsFilters: (state, action: PayloadAction<GotchiListingsFilters>): void => {
            state.gotchiListingsFilters = action.payload;
        }
    }
});

export const {
    setBaazaarGotchiListings,
    setGotchiListingsSkipLimit,
    setGotchiListingsSorting,
    setGotchiListingsFilters
} = baazaarSlice.actions;

export const baazaar = baazaarSlice.reducer;
