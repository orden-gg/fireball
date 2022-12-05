import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc721Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { ClosedPortalListingVM, ClosedPortalListingFilters } from '../../models';
import { closedPortalListingsFilters } from '../../static/filters';

export interface ClosedPortalsListingsState {
    closedPortalsListings: {
        data: ClosedPortalListingVM[];
        isLoading: boolean;
        isLoaded: boolean;
        isError: boolean;
    };
    isClosedPortalsListingsInitialDataLoading: boolean;
    closedPortalsListingsLimitPerLoad: number;
    closedPortalsListingsGraphQueryParams: GraphQueryParams;
    closedPortalsListingsDefaultSorting: SortingItem;
    closedPortalsListingsSorting: SortingItem;
    closedPortalsListingsPreviousSortingProp: string;
    closedPortalsListingsIsSortingUpdated: boolean;
    closedPortalsListingsFilters: ClosedPortalListingFilters;
    closedPortalsListingsIsFiltersUpdated: boolean;
    closedPortalsListingsQueryParamsOrder: string[];
}

const initialState: ClosedPortalsListingsState = {
    closedPortalsListings: {
        data: [],
        isLoading: false,
        isLoaded: false,
        isError: false
    },
    isClosedPortalsListingsInitialDataLoading: true,
    closedPortalsListingsLimitPerLoad: 50,
    closedPortalsListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timeCreated',
        orderDirection: 'desc',
        where: {
            category: Erc721Categories.ClosedPortal
        }
    },
    closedPortalsListingsDefaultSorting: { type: 'timeCreated', dir: 'desc' },
    closedPortalsListingsSorting: { type: 'timeCreated', dir: 'desc' },
    closedPortalsListingsPreviousSortingProp: '',
    closedPortalsListingsIsSortingUpdated: false,
    closedPortalsListingsFilters: closedPortalListingsFilters,
    closedPortalsListingsIsFiltersUpdated: false,
    closedPortalsListingsQueryParamsOrder: [
        closedPortalListingsFilters.hauntId.queryParamKey,
        closedPortalListingsFilters.priceInWei.queryParamKey,
        'sort',
        'dir'
    ]
};

export const closedPortalsListingsSlice = createSlice({
    name: 'closedPortalsListings',
    initialState,
    reducers: {
        loadClosedPortalsListings: (state): void => {
            state.closedPortalsListings = {
                ...state.closedPortalsListings,
                isLoading: true,
                isLoaded: false,
                isError: false
            };
        },
        loadClosedPortalsListingsSucceded: (state, action: PayloadAction<ClosedPortalListingVM[]>): void => {
            state.closedPortalsListings = {
                data: action.payload,
                isLoading: false,
                isLoaded: true,
                isError: false
            };
        },
        loadClosedPortalsListingsFailed: (state): void => {
            state.closedPortalsListings = {
                ...state.closedPortalsListings,
                isLoading: false,
                isLoaded: true,
                isError: true
            };
        },
        setIsClosedPortalsListingsInitialDataLoading: (state, action: PayloadAction<boolean>): void => {
            state.isClosedPortalsListingsInitialDataLoading = action.payload;
        },
        resetClosedPortalsListings: (state): void => {
            state.closedPortalsListings.data = [];
        },
        setClosedPortalsListingsSkipLimit: (state, action: PayloadAction<number>): void => {
            state.closedPortalsListingsGraphQueryParams.skip = action.payload;
        },
        setClosedPortalsListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.closedPortalsListingsSorting = action.payload;

            state.closedPortalsListingsGraphQueryParams.orderBy = action.payload.type;
            state.closedPortalsListingsGraphQueryParams.orderDirection = action.payload.dir;
        },
        setClosedPortalsListingsPreviousSortingProp: (state, action: PayloadAction<string>): void => {
            state.closedPortalsListingsPreviousSortingProp = action.payload;
        },
        setClosedPortalsListingsIsSortingUpdated: (state, action: PayloadAction<boolean>): void => {
            state.closedPortalsListingsIsSortingUpdated = action.payload;
        },
        setClosedPortalsListingsFilters: (state, action: PayloadAction<ClosedPortalListingFilters>): void => {
            state.closedPortalsListingsFilters = action.payload;
        },
        setClosedPortalsListingsIsFiltersUpdated: (state, action: PayloadAction<boolean>): void => {
            state.closedPortalsListingsIsFiltersUpdated = action.payload;
        }
    }
});

export const {
    loadClosedPortalsListings,
    loadClosedPortalsListingsSucceded,
    loadClosedPortalsListingsFailed,
    setIsClosedPortalsListingsInitialDataLoading,
    resetClosedPortalsListings,
    setClosedPortalsListingsSkipLimit,
    setClosedPortalsListingsSorting,
    setClosedPortalsListingsPreviousSortingProp,
    setClosedPortalsListingsIsSortingUpdated,
    setClosedPortalsListingsFilters,
    setClosedPortalsListingsIsFiltersUpdated
} = closedPortalsListingsSlice.actions;

export const closedPortalsListingsReducer = closedPortalsListingsSlice.reducer;
