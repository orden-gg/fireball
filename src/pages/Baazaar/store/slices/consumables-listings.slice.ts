import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { ConsumableListingFilters, ConsumableListingVM } from '../../models';
import { consumableListingFilters } from '../../static/filters';

export interface ConsumablesListingsState {
    consumablesListings: {
        data: ConsumableListingVM[];
        isLoading: boolean;
        isLoaded: boolean;
        isError: boolean;
    };
    isConsumablesListingsInitialDataLoading: boolean;
    consumablesListingsLimitPerLoad: number;
    consumablesListingsGraphQueryParams: GraphQueryParams;
    consumablesListingsDefaultSorting: SortingItem;
    consumablesListingsSorting: SortingItem;
    consumablesListingsPreviousSortingProp: string;
    consumablesListingsIsSortingUpdated: boolean;
    consumablesListingsFilters: ConsumableListingFilters;
    consumablesListingsIsFiltersUpdated: boolean;
    consumablesListingsQueryParamsOrder: string[];
}

const initialState: ConsumablesListingsState = {
    consumablesListings: {
        data: [],
        isLoading: false,
        isLoaded: false,
        isError: false
    },
    isConsumablesListingsInitialDataLoading: true,
    consumablesListingsLimitPerLoad: 50,
    consumablesListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timeCreated',
        orderDirection: 'desc',
        where: {
            category: Erc1155Categories.Consumable
        }
    },
    consumablesListingsDefaultSorting: { type: 'timeCreated', dir: 'desc' },
    consumablesListingsSorting: { type: 'timeCreated', dir: 'desc' },
    consumablesListingsPreviousSortingProp: '',
    consumablesListingsIsSortingUpdated: false,
    consumablesListingsFilters: consumableListingFilters,
    consumablesListingsIsFiltersUpdated: false,
    consumablesListingsQueryParamsOrder: [
        consumableListingFilters.rarityLevel.queryParamKey,
        consumableListingFilters.priceInWei.queryParamKey,
        'sort',
        'dir'
    ]
};

export const consumablesListingsSlice = createSlice({
    name: 'consumablesListings',
    initialState,
    reducers: {
        loadConsumablesListings: (state): void => {
            state.consumablesListings = {
                ...state.consumablesListings,
                isLoading: true,
                isLoaded: false,
                isError: false
            };
        },
        loadConsumablesListingsSucceded: (state, action: PayloadAction<ConsumableListingVM[]>): void => {
            state.consumablesListings = {
                data: action.payload,
                isLoading: false,
                isLoaded: true,
                isError: false
            };
        },
        loadConsumablesListingsFailed: (state): void => {
            state.consumablesListings = {
                ...state.consumablesListings,
                isLoading: false,
                isLoaded: true,
                isError: true
            };
        },
        setIsConsumablesListingsInitialDataLoading: (state, action: PayloadAction<boolean>): void => {
            state.isConsumablesListingsInitialDataLoading = action.payload;
        },
        resetConsumablesListings: (state): void => {
            state.consumablesListings.data = [];
        },
        setConsumablesListingsSkipLimit: (state, action: PayloadAction<number>): void => {
            state.consumablesListingsGraphQueryParams.skip = action.payload;
        },
        setConsumablesListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.consumablesListingsSorting = action.payload;

            state.consumablesListingsGraphQueryParams.orderBy = action.payload.type;
            state.consumablesListingsGraphQueryParams.orderDirection = action.payload.dir;
        },
        setConsumablesListingsPreviousSortingProp: (state, action: PayloadAction<string>): void => {
            state.consumablesListingsPreviousSortingProp = action.payload;
        },
        setConsumablesListingsIsSortingUpdated: (state, action: PayloadAction<boolean>): void => {
            state.consumablesListingsIsSortingUpdated = action.payload;
        },
        setConsumablesListingsFilters: (state, action: PayloadAction<ConsumableListingFilters>): void => {
            state.consumablesListingsFilters = action.payload;
        },
        setConsumablesListingsIsFiltersUpdated: (state, action: PayloadAction<boolean>): void => {
            state.consumablesListingsIsFiltersUpdated = action.payload;
        }
    }
});

export const {
    loadConsumablesListings,
    loadConsumablesListingsSucceded,
    loadConsumablesListingsFailed,
    setIsConsumablesListingsInitialDataLoading,
    resetConsumablesListings,
    setConsumablesListingsSkipLimit,
    setConsumablesListingsSorting,
    setConsumablesListingsPreviousSortingProp,
    setConsumablesListingsIsSortingUpdated,
    setConsumablesListingsFilters,
    setConsumablesListingsIsFiltersUpdated
} = consumablesListingsSlice.actions;

export const consumablesListingsReducer = consumablesListingsSlice.reducer;
