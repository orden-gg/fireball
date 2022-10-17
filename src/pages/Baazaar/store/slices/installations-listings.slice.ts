import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { InstallationListingFilters, InstallationListingVM } from '../../models';
import { installationListingFiltersData } from '../../static/filters';

export interface InstallationsListingsState {
    installationsListings: InstallationListingVM[];
    installationsListingsLimitPerLoad: number;
    installationsListingsGraphQueryParams: GraphQueryParams;
    installationsListingsDefaultSorting: SortingItem;
    installationsListingsSorting: SortingItem;
    installationsListingsFilters: InstallationListingFilters;
    installationsListingsQueryParamsOrder: string[];
}

const initialState: InstallationsListingsState = {
    installationsListings: [],
    installationsListingsLimitPerLoad: 50,
    installationsListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timeCreated',
        orderDirection: 'asc',
        where: {
            category: Erc1155Categories.Installation
        }
    },
    installationsListingsDefaultSorting: { type: 'timeCreated', dir: 'desc' },
    installationsListingsSorting: { type: 'timeCreated', dir: 'desc' },
    installationsListingsFilters: installationListingFiltersData,
    installationsListingsQueryParamsOrder: [
        installationListingFiltersData.priceInWei.queryParamKey,
        'sort',
        'dir'
    ]
};

export const installationsListingsSlice = createSlice({
    name: 'installationsListings',
    initialState,
    reducers: {
        setInstallationsListings: (state, action: PayloadAction<InstallationListingVM[]>): void => {
            state.installationsListings = action.payload;
        },
        setInstallationsListingsSkipLimit: (state, action: PayloadAction<number>): void => {
            state.installationsListingsGraphQueryParams.skip = action.payload;
        },
        setInstallationsListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.installationsListingsSorting = action.payload;

            state.installationsListingsGraphQueryParams.orderBy = action.payload.type;
            state.installationsListingsGraphQueryParams.orderDirection = action.payload.dir;
        },
        setInstallationsListingsFilters: (state, action: PayloadAction<InstallationListingFilters>): void => {
            state.installationsListingsFilters = action.payload;
        }
    }
});

export const {
    setInstallationsListings,
    setInstallationsListingsSkipLimit,
    setInstallationsListingsSorting,
    setInstallationsListingsFilters
} = installationsListingsSlice.actions;

export const installationsListingsReducer = installationsListingsSlice.reducer;
