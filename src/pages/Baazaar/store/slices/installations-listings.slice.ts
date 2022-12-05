import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { InstallationListingFilters, InstallationListingVM } from '../../models';
import { installationListingFilters } from '../../static/filters';

export interface InstallationsListingsState {
    installationsListings: {
        data: InstallationListingVM[];
        isLoading: boolean;
        isLoaded: boolean;
        isError: boolean;
    };
    isInstallationsListingsInitialDataLoading: boolean;
    installationsListingsLimitPerLoad: number;
    installationsListingsGraphQueryParams: GraphQueryParams;
    installationsListingsDefaultSorting: SortingItem;
    installationsListingsSorting: SortingItem;
    installationsListingsPreviousSortingProp: string;
    installationsListingsIsSortingUpdated: boolean;
    installationsListingsFilters: InstallationListingFilters;
    installationsListingsIsFiltersUpdated: boolean;
    installationsListingsQueryParamsOrder: string[];
}

const initialState: InstallationsListingsState = {
    installationsListings: {
        data: [],
        isLoading: false,
        isLoaded: false,
        isError: false
    },
    isInstallationsListingsInitialDataLoading: true,
    installationsListingsLimitPerLoad: 50,
    installationsListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timeCreated',
        orderDirection: 'desc',
        where: {
            category: Erc1155Categories.Installation
        }
    },
    installationsListingsDefaultSorting: { type: 'timeCreated', dir: 'desc' },
    installationsListingsSorting: { type: 'timeCreated', dir: 'desc' },
    installationsListingsPreviousSortingProp: '',
    installationsListingsIsSortingUpdated: false,
    installationsListingsFilters: installationListingFilters,
    installationsListingsIsFiltersUpdated: false,
    installationsListingsQueryParamsOrder: [
        installationListingFilters.priceInWei.queryParamKey,
        'sort',
        'dir'
    ]
};

export const installationsListingsSlice = createSlice({
    name: 'installationsListings',
    initialState,
    reducers: {
        loadInstallationsListings: (state): void => {
            state.installationsListings = {
                ...state.installationsListings,
                isLoading: true,
                isLoaded: false,
                isError: false
            };
        },
        loadInstallationsListingsSucceded: (state, action: PayloadAction<InstallationListingVM[]>): void => {
            state.installationsListings = {
                data: action.payload,
                isLoading: false,
                isLoaded: true,
                isError: false
            };
        },
        loadInstallationsListingsFailed: (state): void => {
            state.installationsListings = {
                ...state.installationsListings,
                isLoading: false,
                isLoaded: true,
                isError: true
            };
        },
        setIsInstallationsListingsInitialDataLoading: (state, action: PayloadAction<boolean>): void => {
            state.isInstallationsListingsInitialDataLoading = action.payload;
        },
        resetInstallationsListings: (state): void => {
            state.installationsListings.data = [];
        },
        setInstallationsListingsSkipLimit: (state, action: PayloadAction<number>): void => {
            state.installationsListingsGraphQueryParams.skip = action.payload;
        },
        setInstallationsListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.installationsListingsSorting = action.payload;

            state.installationsListingsGraphQueryParams.orderBy = action.payload.type;
            state.installationsListingsGraphQueryParams.orderDirection = action.payload.dir;
        },
        setInstallationsListingsPreviousSortingProp: (state, action: PayloadAction<string>): void => {
            state.installationsListingsPreviousSortingProp = action.payload;
        },
        setInstallationsListingsIsSortingUpdated: (state, action: PayloadAction<boolean>): void => {
            state.installationsListingsIsSortingUpdated = action.payload;
        },
        setInstallationsListingsFilters: (state, action: PayloadAction<InstallationListingFilters>): void => {
            state.installationsListingsFilters = action.payload;
        },
        setInstallationsListingsIsFiltersUpdated: (state, action: PayloadAction<boolean>): void => {
            state.installationsListingsIsFiltersUpdated = action.payload;
        }
    }
});

export const {
    loadInstallationsListings,
    loadInstallationsListingsSucceded,
    loadInstallationsListingsFailed,
    setIsInstallationsListingsInitialDataLoading,
    resetInstallationsListings,
    setInstallationsListingsSkipLimit,
    setInstallationsListingsSorting,
    setInstallationsListingsPreviousSortingProp,
    setInstallationsListingsIsSortingUpdated,
    setInstallationsListingsFilters,
    setInstallationsListingsIsFiltersUpdated
} = installationsListingsSlice.actions;

export const installationsListingsReducer = installationsListingsSlice.reducer;
