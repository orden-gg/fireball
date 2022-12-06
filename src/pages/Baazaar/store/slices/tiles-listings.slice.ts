import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { TileListingFilters, TileListingVM } from '../../models';
import { tileListingFilters } from '../../static/filters';

export interface TilesListingsState {
    tilesListings: {
        data: TileListingVM[];
        isLoading: boolean;
        isLoaded: boolean;
        isError: boolean;
    };
    isTilesListingsInitialDataLoading: boolean;
    tilesListingsLimitPerLoad: number;
    tilesListingsGraphQueryParams: GraphQueryParams;
    tilesListingsDefaultSorting: SortingItem;
    tilesListingsSorting: SortingItem;
    tilesListingsPreviousSortingProp: string;
    tilesListingsIsSortingUpdated: boolean;
    tilesListingsFilters: TileListingFilters;
    tilesListingsIsFiltersUpdated: boolean;
    tilesListingsQueryParamsOrder: string[];
}

const initialState: TilesListingsState = {
    tilesListings: {
        data: [],
        isLoading: false,
        isLoaded: false,
        isError: false
    },
    isTilesListingsInitialDataLoading: true,
    tilesListingsLimitPerLoad: 50,
    tilesListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timeCreated',
        orderDirection: 'desc',
        where: {
            category: Erc1155Categories.Tile
        }
    },
    tilesListingsDefaultSorting: { type: 'timeCreated', dir: 'desc' },
    tilesListingsSorting: { type: 'timeCreated', dir: 'desc' },
    tilesListingsPreviousSortingProp: '',
    tilesListingsIsSortingUpdated: false,
    tilesListingsFilters: tileListingFilters,
    tilesListingsIsFiltersUpdated: false,
    tilesListingsQueryParamsOrder: [
        tileListingFilters.erc1155TypeId.queryParamKey,
        tileListingFilters.priceInWei.queryParamKey,
        'sort',
        'dir'
    ]
};

export const tilesListingsSlice = createSlice({
    name: 'tilesListings',
    initialState,
    reducers: {
        loadTilesListings: (state): void => {
            state.tilesListings = {
                ...state.tilesListings,
                isLoading: true,
                isLoaded: false,
                isError: false
            };
        },
        loadTilesListingsSucceded: (state, action: PayloadAction<TileListingVM[]>): void => {
            state.tilesListings = {
                data: action.payload,
                isLoading: false,
                isLoaded: true,
                isError: false
            };
        },
        loadTilesListingsFailed: (state): void => {
            state.tilesListings = {
                ...state.tilesListings,
                isLoading: false,
                isLoaded: true,
                isError: true
            };
        },
        setIsTilesListingsInitialDataLoading: (state, action: PayloadAction<boolean>): void => {
            state.isTilesListingsInitialDataLoading = action.payload;
        },
        resetTilesListings: (state): void => {
            state.tilesListings.data = [];
        },
        setTilesListingsSkipLimit: (state, action: PayloadAction<number>): void => {
            state.tilesListingsGraphQueryParams.skip = action.payload;
        },
        setTilesListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.tilesListingsSorting = action.payload;

            state.tilesListingsGraphQueryParams.orderBy = action.payload.type;
            state.tilesListingsGraphQueryParams.orderDirection = action.payload.dir;
        },
        setTilesListingsPreviousSortingProp: (state, action: PayloadAction<string>): void => {
            state.tilesListingsPreviousSortingProp = action.payload;
        },
        setTilesListingsIsSortingUpdated: (state, action: PayloadAction<boolean>): void => {
            state.tilesListingsIsSortingUpdated = action.payload;
        },
        setTilesListingsFilters: (state, action: PayloadAction<TileListingFilters>): void => {
            state.tilesListingsFilters = action.payload;
        },
        setTilesListingsIsFiltersUpdated: (state, action: PayloadAction<boolean>): void => {
            state.tilesListingsIsFiltersUpdated = action.payload;
        }
    }
});

export const {
    loadTilesListings,
    loadTilesListingsSucceded,
    loadTilesListingsFailed,
    setIsTilesListingsInitialDataLoading,
    resetTilesListings,
    setTilesListingsSkipLimit,
    setTilesListingsSorting,
    setTilesListingsPreviousSortingProp,
    setTilesListingsIsSortingUpdated,
    setTilesListingsFilters,
    setTilesListingsIsFiltersUpdated
} = tilesListingsSlice.actions;

export const tilesListingsReducer = tilesListingsSlice.reducer;
