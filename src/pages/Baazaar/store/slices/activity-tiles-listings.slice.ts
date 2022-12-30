import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155Categories } from 'shared/constants';
import { GraphQueryParams } from 'shared/models';

import { ActivityTileListingVM, ActivityTileListingFilters } from '../../models';
import { activityTileListingFilter } from '../../static/filters';

export interface ActivityTilesListingsState {
    activityTilesListings: {
        data: ActivityTileListingVM[];
        isLoading: boolean;
        isLoaded: boolean;
        isError: boolean;
    };
    isActivityTilesListingsInitialDataLoading: boolean;
    activityTilesListingsGraphQueryParams: GraphQueryParams;
    activityTilesListingsFilters: ActivityTileListingFilters;
    activityTilesListingsIsFiltersUpdated: boolean;
    activityTilesListingsQueryParamsOrder: string[];
}

const initialState: ActivityTilesListingsState = {
    activityTilesListings: {
        data: [],
        isLoading: false,
        isLoaded: false,
        isError: false
    },
    isActivityTilesListingsInitialDataLoading: true,
    activityTilesListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timePurchased',
        orderDirection: 'desc',
        where: {
            category: Erc1155Categories.Tile
        }
    },
    activityTilesListingsFilters: activityTileListingFilter,
    activityTilesListingsIsFiltersUpdated: false,
    activityTilesListingsQueryParamsOrder: [
        activityTileListingFilter.erc1155TypeId.queryParamKey
    ]
};

export const activityTilesListingsSlice = createSlice({
    name: 'activityTilesListings',
    initialState,
    reducers: {
        loadActivityTilesListings: (state): void => {
            state.activityTilesListings = {
                ...state.activityTilesListings,
                isLoading: true,
                isLoaded: false,
                isError: false
            };
        },
        loadActivityTilesListingsSucceded: (state, action: PayloadAction<ActivityTileListingVM[]>): void => {
            state.activityTilesListings = {
                data: action.payload,
                isLoading: false,
                isLoaded: true,
                isError: false
            };
        },
        loadActivityTilesListingsFailed: (state): void => {
            state.activityTilesListings = {
                ...state.activityTilesListings,
                isLoading: false,
                isLoaded: true,
                isError: true
            };
        },
        setIsActivityTilesListingsInitialDataLoading: (state, action: PayloadAction<boolean>): void => {
            state.isActivityTilesListingsInitialDataLoading = action.payload;
        },
        resetActivityTilesListings: (state): void => {
            state.activityTilesListings.data = [];
        },
        setActivityTilesListingsFilters: (state, action: PayloadAction<ActivityTileListingFilters>): void => {
            state.activityTilesListingsFilters = action.payload;
        },
        setActivityTilesListingsIsFiltersUpdated: (state, action: PayloadAction<boolean>): void => {
            state.activityTilesListingsIsFiltersUpdated = action.payload;
        }
    }
});

export const {
    loadActivityTilesListings,
    loadActivityTilesListingsSucceded,
    loadActivityTilesListingsFailed,
    setIsActivityTilesListingsInitialDataLoading,
    resetActivityTilesListings,
    setActivityTilesListingsFilters,
    setActivityTilesListingsIsFiltersUpdated
} = activityTilesListingsSlice.actions;

export const activityTilesListingsReducer = activityTilesListingsSlice.reducer;
