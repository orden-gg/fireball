import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { TileListingFilters, TileListingVM } from '../../models';
import { tileListingFiltersData } from '../../static';

export interface TilesListingsState {
    tilesListings: TileListingVM[];
    tilesListingsLimitPerLoad: number;
    tilesListingsGraphQueryParams: GraphQueryParams;
    tilesListingsSorting: SortingItem;
    tilesListingsFilters: TileListingFilters;
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
    tilesListingsSorting: { type: 'timeCreated', dir: 'desc' },
    tilesListingsFilters: tileListingFiltersData,
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
        setTilesListingsFilters: (state, action: PayloadAction<TileListingFilters>): void => {
            state.tilesListingsFilters = action.payload;
        }
    }
});

export const {
    setTilesListings,
    setTilesListingsSkipLimit,
    setTilesListingsSorting,
    setTilesListingsFilters
} = tilesListingsSlice.actions;

export const tilesListingsReducer = tilesListingsSlice.reducer;
