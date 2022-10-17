import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { WearableListingFilters, WearableListingVM } from '../../models';
import { wearableListingFiltersData } from '../../static/filters';

export interface WearablesListingsState {
    wearablesListings: WearableListingVM[];
    wearablesListingsLimitPerLoad: number;
    wearablesListingsGraphQueryParams: GraphQueryParams;
    wearablesListingsDefaultSorting: SortingItem;
    wearablesListingsSorting: SortingItem;
    wearablesListingsFilters: WearableListingFilters;
    wearablesListingsQueryParamsOrder: string[];
}

const initialState: WearablesListingsState = {
    wearablesListings: [],
    wearablesListingsLimitPerLoad: 50,
    wearablesListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timeCreated',
        orderDirection: 'asc',
        where: {
            category: Erc1155Categories.Wearable
        }
    },
    wearablesListingsDefaultSorting: { type: 'timeCreated', dir: 'desc' },
    wearablesListingsSorting: { type: 'timeCreated', dir: 'desc' },
    wearablesListingsFilters: wearableListingFiltersData,
    wearablesListingsQueryParamsOrder: [
        wearableListingFiltersData.rarityLevel.queryParamKey,
        wearableListingFiltersData.priceInWei.queryParamKey,
        wearableListingFiltersData.nrgTraitModifier.queryParamKey,
        wearableListingFiltersData.aggTraitModifier.queryParamKey,
        wearableListingFiltersData.spkTraitModifier.queryParamKey,
        wearableListingFiltersData.brnTraitModifier.queryParamKey,
        'sort',
        'dir'
    ]
};

export const wearablesListingsSlice = createSlice({
    name: 'wearablesListings',
    initialState,
    reducers: {
        setWearablesListings: (state, action: PayloadAction<WearableListingVM[]>): void => {
            state.wearablesListings = action.payload;
        },
        setWearablesListingsSkipLimit: (state, action: PayloadAction<number>): void => {
            state.wearablesListingsGraphQueryParams.skip = action.payload;
        },
        setWearablesListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.wearablesListingsSorting = action.payload;

            state.wearablesListingsGraphQueryParams.orderBy = action.payload.type;
            state.wearablesListingsGraphQueryParams.orderDirection = action.payload.dir;
        },
        setWearablesListingsFilters: (state, action: PayloadAction<WearableListingFilters>): void => {
            state.wearablesListingsFilters = action.payload;
        }
    }
});

export const {
    setWearablesListings,
    setWearablesListingsSkipLimit,
    setWearablesListingsSorting,
    setWearablesListingsFilters
} = wearablesListingsSlice.actions;

export const wearablesListingsReducer = wearablesListingsSlice.reducer;
