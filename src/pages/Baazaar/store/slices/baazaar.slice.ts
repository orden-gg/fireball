import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { gotchiListingsFiltersData } from 'pages/Baazaar/static';
import { Erc721Categories } from 'shared/constants';
import { GraphFiltersValueTypes, SortingItem } from 'shared/models';

import { BaazaarGotchiListingVM, GotchiListingsFilters } from '../../models';

export interface GraphQueryParams {
    first: number;
    skip: number;
    orderBy: string;
    orderDirection: string;
    where: {
        category: string;
    }
}

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
        setSkipLimit: (state, action: PayloadAction<number>): void => {
            state.gotchiListingsGraphQueryParams.skip = action.payload;
        },
        setGotchiListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.gotchiListingsSorting = action.payload;

            state.gotchiListingsGraphQueryParams.orderBy = action.payload.type;
            state.gotchiListingsGraphQueryParams.orderDirection = action.payload.dir;
        },
        setGotchiListingsFilterValueByKey: (
            state,
            action: PayloadAction<{ key: string, value: GraphFiltersValueTypes, isFilterActive: boolean }>
        ): void => {
            state.gotchiListingsFilters[action.payload.key] = {
                ...state.gotchiListingsFilters[action.payload.key],
                ...action.payload
            };
        },
        setGotchiListingsFilters: (state, action: PayloadAction<GotchiListingsFilters>): void => {
            state.gotchiListingsFilters = action.payload;
        }
    }
});

export const {
    setBaazaarGotchiListings,
    setSkipLimit,
    setGotchiListingsSorting,
    setGotchiListingsFilterValueByKey,
    setGotchiListingsFilters
} = baazaarSlice.actions;

export const baazaarReducer = baazaarSlice.reducer;
