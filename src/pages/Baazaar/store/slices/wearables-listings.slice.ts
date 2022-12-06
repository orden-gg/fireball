import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { WearableListingFilters, WearableListingVM } from '../../models';
import { wearableListingFilters } from '../../static/filters';

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
    wearablesListingsPreviousSortingProp: string;
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
        orderDirection: 'desc',
        where: {
            category: Erc1155Categories.Wearable
        }
    },
    wearablesListingsDefaultSorting: { type: 'timeCreated', dir: 'desc' },
    wearablesListingsSorting: { type: 'timeCreated', dir: 'desc' },
    wearablesListingsPreviousSortingProp: '',
    wearablesListingsIsSortingUpdated: false,
    wearablesListingsFilters: wearableListingFilters,
    wearablesListingsIsFiltersUpdated: false,
    wearablesListingsQueryParamsOrder: [
        wearableListingFilters.rarityLevel.queryParamKey,
        wearableListingFilters.priceInWei.queryParamKey,
        wearableListingFilters.nrgTraitModifier.queryParamKey,
        wearableListingFilters.aggTraitModifier.queryParamKey,
        wearableListingFilters.spkTraitModifier.queryParamKey,
        wearableListingFilters.brnTraitModifier.queryParamKey,
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
        setWearablesListingsPreviousSortingProp: (state, action: PayloadAction<string>): void => {
            state.wearablesListingsPreviousSortingProp = action.payload;
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
    setWearablesListingsPreviousSortingProp,
    setWearablesListingsIsSortingUpdated,
    setWearablesListingsFilters,
    setWearablesListingsIsFiltersUpdated
} = wearablesListingsSlice.actions;

export const wearablesListingsReducer = wearablesListingsSlice.reducer;
