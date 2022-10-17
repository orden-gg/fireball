import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc721Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { GotchiListingVM, GotchiListingsFilters } from '../../models';
import { gotchiListingsFiltersData } from '../../static/filters';

export interface GotchisListingsState {
    gotchisListings: GotchiListingVM[];
    gotchisListingsLimitPerLoad: number;
    gotchisListingsGraphQueryParams: GraphQueryParams;
    gotchisListingsDefaultSorting: SortingItem;
    gotchisListingsSorting: SortingItem;
    gotchisListingsIsSortingUpdated: boolean;
    gotchisListingsFilters: GotchiListingsFilters;
    gotchisListingsIsFiltersUpdated: boolean;
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
    gotchisListingsDefaultSorting: { type: 'timeCreated', dir: 'desc' },
    gotchisListingsSorting: { type: 'timeCreated', dir: 'desc' },
    gotchisListingsIsSortingUpdated: false,
    gotchisListingsFilters: gotchiListingsFiltersData,
    gotchisListingsIsFiltersUpdated: false,
    gotchisListingsQueryParamsOrder: [
        gotchiListingsFiltersData.baseRarityScore.queryParamKey,
        gotchiListingsFiltersData.kinship.queryParamKey,
        gotchiListingsFiltersData.experience.queryParamKey,
        gotchiListingsFiltersData.collateral.queryParamKey,
        gotchiListingsFiltersData.priceInWei.queryParamKey,
        gotchiListingsFiltersData.nrgTrait.queryParamKey,
        gotchiListingsFiltersData.aggTrait.queryParamKey,
        gotchiListingsFiltersData.spkTrait.queryParamKey,
        gotchiListingsFiltersData.brnTrait.queryParamKey,
        gotchiListingsFiltersData.eysTrait.queryParamKey,
        gotchiListingsFiltersData.eycTrait.queryParamKey,
        'sort',
        'dir'
    ]
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
        setGotchisListingsIsSortingUpdated: (state, action: PayloadAction<boolean>): void => {
            state.gotchisListingsIsSortingUpdated = action.payload;
        },
        setGotchisListingsFilters: (state, action: PayloadAction<GotchiListingsFilters>): void => {
            state.gotchisListingsFilters = action.payload;
        },
        setGotchisListingsIsFiltersUpdated: (state, action: PayloadAction<boolean>): void => {
            state.gotchisListingsIsFiltersUpdated = action.payload;
        }
    }
});

export const {
    setGotchisListings,
    setGotchisListingsSkipLimit,
    setGotchisListingsSorting,
    setGotchisListingsIsSortingUpdated,
    setGotchisListingsFilters,
    setGotchisListingsIsFiltersUpdated
} = gotchisListingsSlice.actions;

export const gotchisListingsReducer = gotchisListingsSlice.reducer;
