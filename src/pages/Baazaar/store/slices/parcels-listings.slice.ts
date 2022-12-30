import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc721Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { ParcelListingFilters, ParcelListingVM } from '../../models';
import { parcelListingFilters } from '../../static/filters';

export interface ParcelsListingsState {
    parcelsListings: {
        data: ParcelListingVM[];
        isLoading: boolean;
        isLoaded: boolean;
        isError: boolean;
    };
    isParcelsListingsInitialDataLoading: boolean;
    parcelsListingsLimitPerLoad: number;
    parcelsListingsGraphQueryParams: GraphQueryParams;
    parcelsListingsDefaultSorting: SortingItem;
    parcelsListingsSorting: SortingItem;
    parcelsListingsPreviousSortingProp: string;
    parcelsListingsIsSortingUpdated: boolean;
    parcelsListingsFilters: ParcelListingFilters;
    parcelsListingsIsFiltersUpdated: boolean;
    parcelsListingsQueryParamsOrder: string[];
}

const initialState: ParcelsListingsState = {
    parcelsListings: {
        data: [],
        isLoading: false,
        isLoaded: false,
        isError: false
    },
    isParcelsListingsInitialDataLoading: true,
    parcelsListingsLimitPerLoad: 50,
    parcelsListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timeCreated',
        orderDirection: 'desc',
        where: {
            category: Erc721Categories.Realm
        }
    },

    parcelsListingsDefaultSorting: { type: 'timeCreated', dir: 'desc' },
    parcelsListingsSorting: { type: 'timeCreated', dir: 'desc' },
    parcelsListingsPreviousSortingProp: '',
    parcelsListingsIsSortingUpdated: false,
    parcelsListingsFilters: parcelListingFilters,
    parcelsListingsIsFiltersUpdated: false,
    parcelsListingsQueryParamsOrder: [
        parcelListingFilters.size.queryParamKey,
        parcelListingFilters.district.queryParamKey,
        parcelListingFilters.priceInWei.queryParamKey,
        parcelListingFilters.fudBoost.queryParamKey,
        parcelListingFilters.fomoBoost.queryParamKey,
        parcelListingFilters.alphaBoost.queryParamKey,
        parcelListingFilters.kekBoost.queryParamKey,
        'sort',
        'dir'
    ]
};

export const parcelsListingsSlice = createSlice({
    name: 'parcelsListings',
    initialState,
    reducers: {
        loadParcelsListings: (state): void => {
            state.parcelsListings = {
                ...state.parcelsListings,
                isLoading: true,
                isLoaded: false,
                isError: false
            };
        },
        loadParcelsListingsSucceded: (state, action: PayloadAction<ParcelListingVM[]>): void => {
            state.parcelsListings = {
                data: action.payload,
                isLoading: false,
                isLoaded: true,
                isError: false
            };
        },
        loadParcelsListingsFailed: (state): void => {
            state.parcelsListings = {
                ...state.parcelsListings,
                isLoading: false,
                isLoaded: true,
                isError: true
            };
        },
        setIsParcelsListingsInitialDataLoading: (state, action: PayloadAction<boolean>): void => {
            state.isParcelsListingsInitialDataLoading = action.payload;
        },
        resetParcelsListings: (state): void => {
            state.parcelsListings.data = [];
        },
        setParcelsListingsSkipLimit: (state, action: PayloadAction<number>): void => {
            state.parcelsListingsGraphQueryParams.skip = action.payload;
        },
        setParcelsListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.parcelsListingsSorting = action.payload;

            state.parcelsListingsGraphQueryParams.orderBy = action.payload.type;
            state.parcelsListingsGraphQueryParams.orderDirection = action.payload.dir;
        },
        setParcelsListingsPreviousSortingProp: (state, action: PayloadAction<string>): void => {
            state.parcelsListingsPreviousSortingProp = action.payload;
        },
        setParcelsListingsIsSortingUpdated: (state, action: PayloadAction<boolean>): void => {
            state.parcelsListingsIsSortingUpdated = action.payload;
        },
        setParcelsListingsFilters: (state, action: PayloadAction<ParcelListingFilters>): void => {
            state.parcelsListingsFilters = action.payload;
        },
        setParcelsListingsIsFiltersUpdated: (state, action: PayloadAction<boolean>): void => {
            state.parcelsListingsIsFiltersUpdated = action.payload;
        }
    }
});

export const {
    loadParcelsListings,
    loadParcelsListingsSucceded,
    loadParcelsListingsFailed,
    setIsParcelsListingsInitialDataLoading,
    resetParcelsListings,
    setParcelsListingsSkipLimit,
    setParcelsListingsSorting,
    setParcelsListingsPreviousSortingProp,
    setParcelsListingsIsSortingUpdated,
    setParcelsListingsFilters,
    setParcelsListingsIsFiltersUpdated
} = parcelsListingsSlice.actions;

export const parcelsListingsReducer = parcelsListingsSlice.reducer;
