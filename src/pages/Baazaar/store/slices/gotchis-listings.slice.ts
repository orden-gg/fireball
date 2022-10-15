import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc721Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { GotchiListingVM, GotchiListingsFilters } from '../../models';
import { gotchiListingsFiltersData } from '../../static';

export interface GotchisListingsState {
    gotchisListings: GotchiListingVM[];
    gotchisListingsLimitPerLoad: number;
    gotchisListingsGraphQueryParams: GraphQueryParams;
    gotchisListingsSorting: SortingItem;
    gotchisListingsFilters: GotchiListingsFilters;
    gotchisListingsQueryParamsOrder: string[];
}

const initialState: GotchisListingsState = {
    gotchisListings: [],
    gotchisListingsLimitPerLoad: 50,
    gotchisListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timeCreated',
        orderDirection: 'asc',
        where: {
            category: Erc721Categories.Aavegotchi
        }
    },
    gotchisListingsSorting: { type: 'timeCreated', dir: 'desc' },
    gotchisListingsFilters: gotchiListingsFiltersData,
    gotchisListingsQueryParamsOrder: ['sort', 'dir']
};

export const gotchisListingsSlice = createSlice({
    name: 'gotchisListings',
    initialState,
    reducers: {
        setGotchisListings: (state, action: PayloadAction<GotchiListingVM[]>): void => {
            state.gotchisListings = action.payload;
        },
        setGotchisListingsSkipLimit: (state, action: PayloadAction<number>): void => {
            state.gotchisListingsGraphQueryParams.skip = action.payload;
        },
        setGotchisListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.gotchisListingsSorting = action.payload;

            state.gotchisListingsGraphQueryParams.orderBy = action.payload.type;
            state.gotchisListingsGraphQueryParams.orderDirection = action.payload.dir;
        },
        setGotchisListingsFilters: (state, action: PayloadAction<GotchiListingsFilters>): void => {
            state.gotchisListingsFilters = action.payload;
        }
    }
});

export const {
    setGotchisListings,
    setGotchisListingsSkipLimit,
    setGotchisListingsSorting,
    setGotchisListingsFilters
} = gotchisListingsSlice.actions;

export const gotchisListingsReducer = gotchisListingsSlice.reducer;
