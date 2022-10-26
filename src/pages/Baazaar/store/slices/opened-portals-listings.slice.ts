import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SortingItem } from 'shared/models';

import { OpenedPortalListingVM } from '../../models';
import { openedPortalListingsFilters } from '../../static/filters';

export interface OpenedPortalsListingsState {
    initialListings: OpenedPortalListingVM[];
    openedPortalsListings: {
        data: OpenedPortalListingVM[];
        isLoading: boolean;
        isLoaded: boolean;
        isError: boolean;
    };
    openedPortalsListingsDefaultSorting: SortingItem;
    openedPortalsListingsSorting: SortingItem;
    openedPortalsListingsQueryParamsOrder: string[];
}

const initialState: OpenedPortalsListingsState = {
    initialListings: [],
    openedPortalsListings: {
        data: [],
        isLoading: false,
        isLoaded: false,
        isError: false
    },
    openedPortalsListingsDefaultSorting: { type: 'timeCreated', dir: 'desc' },
    openedPortalsListingsSorting: { type: 'timeCreated', dir: 'desc' },
    openedPortalsListingsQueryParamsOrder: [
        openedPortalListingsFilters.hauntId.queryParamKey,
        openedPortalListingsFilters.collateral.queryParamKey,
        openedPortalListingsFilters.priceInWei.queryParamKey,
        openedPortalListingsFilters.nrgTrait.queryParamKey,
        openedPortalListingsFilters.aggTrait.queryParamKey,
        openedPortalListingsFilters.spkTrait.queryParamKey,
        openedPortalListingsFilters.brnTrait.queryParamKey,
        openedPortalListingsFilters.eysTrait.queryParamKey,
        openedPortalListingsFilters.eycTrait.queryParamKey,
        'sort',
        'dir'
    ]
};

export const openedPortalsListingsSlice = createSlice({
    name: 'openedPortalsListings',
    initialState,
    reducers: {
        loadOpenedPortalsListings: (state): void => {
            state.openedPortalsListings = {
                ...state.openedPortalsListings,
                isLoading: true,
                isLoaded: false,
                isError: false
            };
        },
        loadOpenedPortalsListingsSucceded: (state, action: PayloadAction<OpenedPortalListingVM[]>): void => {
            state.openedPortalsListings = {
                data: action.payload,
                isLoading: false,
                isLoaded: true,
                isError: false
            };

            state.initialListings = action.payload;
        },
        loadOpenedPortalsListingsFailed: (state): void => {
            state.openedPortalsListings = {
                ...state.openedPortalsListings,
                isLoading: false,
                isLoaded: true,
                isError: true
            };
        },
        setOpenedPortalsListings: (state, action: PayloadAction<OpenedPortalListingVM[]>): void => {
            state.openedPortalsListings.data = action.payload;
        },
        resetOpenedPortalsListings: (state): void => {
            state.openedPortalsListings.data = [];
            state.initialListings = [];
        },
        setOpenedPortalsListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.openedPortalsListingsSorting = action.payload;
        }
    }
});

export const {
    loadOpenedPortalsListings,
    loadOpenedPortalsListingsSucceded,
    loadOpenedPortalsListingsFailed,
    setOpenedPortalsListings,
    resetOpenedPortalsListings,
    setOpenedPortalsListingsSorting
} = openedPortalsListingsSlice.actions;

export const openedPortalsListingsReducer = openedPortalsListingsSlice.reducer;
