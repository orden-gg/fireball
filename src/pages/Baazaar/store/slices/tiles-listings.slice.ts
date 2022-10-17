import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { TileListingFilters, TileListingVM } from '../../models';
import { tileListingFiltersData } from '../../static/filters';

export interface TilesListingsState {
    tilesListings: TileListingVM[];
    tilesListingsLimitPerLoad: number;
    tilesListingsGraphQueryParams: GraphQueryParams;
    tilesListingsDefaultSorting: SortingItem;
    tilesListingsSorting: SortingItem;
    tilesListingsIsSortingUpdated: boolean;
    tilesListingsFilters: TileListingFilters;
    tilesListingsIsFiltersUpdated: boolean;
    tilesListingsQueryParamsOrder: string[];
}

const initialState: TilesListingsState = {
    tilesListings: [],
    tilesListingsLimitPerLoad: 50,
    tilesListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timeCreated',
        orderDirection: 'asc',
        where: {
            category: Erc1155Categories.Tile
        }
    },
    tilesListingsDefaultSorting: { type: 'timeCreated', dir: 'desc' },
    tilesListingsSorting: { type: 'timeCreated', dir: 'desc' },
    tilesListingsIsSortingUpdated: false,
    tilesListingsFilters: tileListingFiltersData,
    tilesListingsIsFiltersUpdated: false,
    tilesListingsQueryParamsOrder: [
        tileListingFiltersData.erc1155TypeId.queryParamKey,
        tileListingFiltersData.priceInWei.queryParamKey,
        'sort',
        'dir'
    ]
};

export const tilesListingsSlice = createSlice({
    name: 'tilesListings',
    initialState,
    reducers: {
        setTilesListings: (state, action: PayloadAction<TileListingVM[]>): void => {
            state.tilesListings = action.payload;
        },
        setTilesListingsSkipLimit: (state, action: PayloadAction<number>): void => {
            state.tilesListingsGraphQueryParams.skip = action.payload;
        },
        setTilesListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.tilesListingsSorting = action.payload;

            state.tilesListingsGraphQueryParams.orderBy = action.payload.type;
            state.tilesListingsGraphQueryParams.orderDirection = action.payload.dir;
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
    setTilesListings,
    setTilesListingsSkipLimit,
    setTilesListingsSorting,
    setTilesListingsIsSortingUpdated,
    setTilesListingsFilters,
    setTilesListingsIsFiltersUpdated
} = tilesListingsSlice.actions;

export const tilesListingsReducer = tilesListingsSlice.reducer;
