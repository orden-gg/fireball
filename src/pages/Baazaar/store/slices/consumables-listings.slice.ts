import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { ConsumableListingFilters, ConsumableListingVM } from '../../models';
import { consumableListingFiltersData } from '../../static/filters';

export interface ConsumablesListingsState {
    consumablesListings: ConsumableListingVM[];
    consumablesListingsLimitPerLoad: number;
    consumablesListingsGraphQueryParams: GraphQueryParams;
    consumablesListingsSorting: SortingItem;
    consumablesListingsFilters: ConsumableListingFilters;
    consumablesListingsQueryParamsOrder: string[];
}

const initialState: ConsumablesListingsState = {
    consumablesListings: [],
    consumablesListingsLimitPerLoad: 50,
    consumablesListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timeCreated',
        orderDirection: 'asc',
        where: {
            category: Erc1155Categories.Consumable
        }
    },
    consumablesListingsSorting: { type: 'timeCreated', dir: 'desc' },
    consumablesListingsFilters: consumableListingFiltersData,
    consumablesListingsQueryParamsOrder: [
        consumableListingFiltersData.rarityLevel.queryParamKey,
        consumableListingFiltersData.priceInWei.queryParamKey,
        'sort',
        'dir'
    ]
};

export const consumablesListingsSlice = createSlice({
    name: 'consumablesListings',
    initialState,
    reducers: {
        setConsumablesListings: (state, action: PayloadAction<ConsumableListingVM[]>): void => {
            state.consumablesListings = action.payload;
        },
        setConsumablesListingsSkipLimit: (state, action: PayloadAction<number>): void => {
            state.consumablesListingsGraphQueryParams.skip = action.payload;
        },
        setConsumablesListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.consumablesListingsSorting = action.payload;

            state.consumablesListingsGraphQueryParams.orderBy = action.payload.type;
            state.consumablesListingsGraphQueryParams.orderDirection = action.payload.dir;
        },
        setConsumablesListingsFilters: (state, action: PayloadAction<ConsumableListingFilters>): void => {
            state.consumablesListingsFilters = action.payload;
        }
    }
});

export const {
    setConsumablesListings,
    setConsumablesListingsSkipLimit,
    setConsumablesListingsSorting,
    setConsumablesListingsFilters
} = consumablesListingsSlice.actions;

export const consumablesListingsReducer = consumablesListingsSlice.reducer;
