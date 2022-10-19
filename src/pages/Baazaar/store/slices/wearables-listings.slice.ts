import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { WearableListingFilters, WearableListingVM } from '../../models';
import { wearableListingFiltersData } from '../../static/filters';

export interface WearablesListingsState {
    wearablesListings: {
        data: WearableListingVM[];
        isLoading: boolean;
        isLoaded: boolean;
        isError: boolean;
    };
    isWearablesListingsInitialDataLoading: boolean;
    wearablesListingsLimitPerLoad: number;
    wearablesListingsGraphQueryParams: GraphQueryParams;
    wearablesListingsDefaultSorting: SortingItem;
    wearablesListingsSorting: SortingItem;
    wearablesListingsIsSortingUpdated: boolean;
    wearablesListingsFilters: WearableListingFilters;
    wearablesListingsIsFiltersUpdated: boolean;
    wearablesListingsQueryParamsOrder: string[];
}

const initialState: WearablesListingsState = {
    wearablesListings: {
        data: [],
        isLoading: false,
        isLoaded: false,
        isError: false
    },
    isWearablesListingsInitialDataLoading: true,
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
    wearablesListingsIsSortingUpdated: false,
    wearablesListingsFilters: wearableListingFiltersData,
    wearablesListingsIsFiltersUpdated: false,
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
        loadWearablesListings: (state): void => {
            state.wearablesListings = {
                ...state.wearablesListings,
                isLoading: true,
                isLoaded: false,
                isError: false
            };
        },
        loadWearablesListingsSucceded: (state, action: PayloadAction<WearableListingVM[]>): void => {
            state.wearablesListings = {
                data: action.payload,
                isLoading: false,
                isLoaded: true,
                isError: false
            };
        },
        loadWearablesListingsFailed: (state): void => {
            state.wearablesListings = {
                ...state.wearablesListings,
                isLoading: false,
                isLoaded: true,
                isError: true
            };
        },
        setIsWearablesListingsInitialDataLoading: (state, action: PayloadAction<boolean>): void => {
            state.isWearablesListingsInitialDataLoading = action.payload;
        },
        resetWearablesListings: (state): void => {
            state.wearablesListings.data = [];
        },
        setWearablesListingsSkipLimit: (state, action: PayloadAction<number>): void => {
            state.wearablesListingsGraphQueryParams.skip = action.payload;
        },
        setWearablesListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.wearablesListingsSorting = action.payload;

            state.wearablesListingsGraphQueryParams.orderBy = action.payload.type;
            state.wearablesListingsGraphQueryParams.orderDirection = action.payload.dir;
        },
        setWearablesListingsIsSortingUpdated: (state, action: PayloadAction<boolean>): void => {
            state.wearablesListingsIsSortingUpdated = action.payload;
        },
        setWearablesListingsFilters: (state, action: PayloadAction<WearableListingFilters>): void => {
            state.wearablesListingsFilters = action.payload;
        },
        setWearablesListingsIsFiltersUpdated: (state, action: PayloadAction<boolean>): void => {
            state.wearablesListingsIsFiltersUpdated = action.payload;
        }
    }
});

export const {
    loadWearablesListings,
    loadWearablesListingsSucceded,
    loadWearablesListingsFailed,
    setIsWearablesListingsInitialDataLoading,
    resetWearablesListings,
    setWearablesListingsSkipLimit,
    setWearablesListingsSorting,
    setWearablesListingsIsSortingUpdated,
    setWearablesListingsFilters,
    setWearablesListingsIsFiltersUpdated
} = wearablesListingsSlice.actions;

export const wearablesListingsReducer = wearablesListingsSlice.reducer;
