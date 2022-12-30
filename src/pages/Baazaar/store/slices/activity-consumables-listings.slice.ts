import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155Categories } from 'shared/constants';
import { GraphQueryParams } from 'shared/models';

import { ActivityConsumableListingVM, ActivityConsumableListingFilters } from '../../models';
import { activityConsumableListingFilters } from '../../static/filters';

export interface ActivityConsumablesListingsState {
    activityConsumablesListings: {
        data: ActivityConsumableListingVM[];
        isLoading: boolean;
        isLoaded: boolean;
        isError: boolean;
    };
    isActivityConsumablesListingsInitialDataLoading: boolean;
    activityConsumablesListingsGraphQueryParams: GraphQueryParams;
    activityConsumablesListingsFilters: ActivityConsumableListingFilters;
    activityConsumablesListingsIsFiltersUpdated: boolean;
    activityConsumablesListingsQueryParamsOrder: string[];
}

const initialState: ActivityConsumablesListingsState = {
    activityConsumablesListings: {
        data: [],
        isLoading: false,
        isLoaded: false,
        isError: false
    },
    isActivityConsumablesListingsInitialDataLoading: true,
    activityConsumablesListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timePurchased',
        orderDirection: 'desc',
        where: {
            category: Erc1155Categories.Consumable
        }
    },
    activityConsumablesListingsFilters: activityConsumableListingFilters,
    activityConsumablesListingsIsFiltersUpdated: false,
    activityConsumablesListingsQueryParamsOrder: [
        activityConsumableListingFilters.rarityLevel.queryParamKey
    ]
};

export const activityConsumablesListingsSlice = createSlice({
    name: 'activityConsumablesListings',
    initialState,
    reducers: {
        loadActivityConsumablesListings: (state): void => {
            state.activityConsumablesListings = {
                ...state.activityConsumablesListings,
                isLoading: true,
                isLoaded: false,
                isError: false
            };
        },
        loadActivityConsumablesListingsSucceded: (state, action: PayloadAction<ActivityConsumableListingVM[]>): void => {
            state.activityConsumablesListings = {
                data: action.payload,
                isLoading: false,
                isLoaded: true,
                isError: false
            };
        },
        loadActivityConsumablesListingsFailed: (state): void => {
            state.activityConsumablesListings = {
                ...state.activityConsumablesListings,
                isLoading: false,
                isLoaded: true,
                isError: true
            };
        },
        setIsActivityConsumablesListingsInitialDataLoading: (state, action: PayloadAction<boolean>): void => {
            state.isActivityConsumablesListingsInitialDataLoading = action.payload;
        },
        resetActivityConsumablesListings: (state): void => {
            state.activityConsumablesListings.data = [];
        },
        setActivityConsumablesListingsFilters: (state, action: PayloadAction<ActivityConsumableListingFilters>): void => {
            state.activityConsumablesListingsFilters = action.payload;
        },
        setActivityConsumablesListingsIsFiltersUpdated: (state, action: PayloadAction<boolean>): void => {
            state.activityConsumablesListingsIsFiltersUpdated = action.payload;
        }
    }
});

export const {
    loadActivityConsumablesListings,
    loadActivityConsumablesListingsSucceded,
    loadActivityConsumablesListingsFailed,
    setIsActivityConsumablesListingsInitialDataLoading,
    resetActivityConsumablesListings,
    setActivityConsumablesListingsFilters,
    setActivityConsumablesListingsIsFiltersUpdated
} = activityConsumablesListingsSlice.actions;

export const activityConsumablesListingsReducer = activityConsumablesListingsSlice.reducer;
