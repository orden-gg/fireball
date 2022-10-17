import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc721Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { ClosedPortalListingVM, ClosedPortalListingFilters } from '../../models';
import { closedPortalListingsFiltersData } from '../../static/filters';

export interface ClosedPortlasListingsState {
    closedPortalsListings: ClosedPortalListingVM[];
    closedPortalsListingsLimitPerLoad: number;
    closedPortalsListingsGraphQueryParams: GraphQueryParams;
    closedPortalsListingsDefaultSorting: SortingItem;
    closedPortalsListingsSorting: SortingItem;
    closedPortalsListingsIsSortingUpdated: boolean;
    closedPortalsListingsFilters: ClosedPortalListingFilters;
    closedPortalsListingsIsFiltersUpdated: boolean;
    closedPortalsListingsQueryParamsOrder: string[];
}

const initialState: ClosedPortlasListingsState = {
    closedPortalsListings: [],
    closedPortalsListingsLimitPerLoad: 50,
    closedPortalsListingsGraphQueryParams: {
        first: 50,
        skip: 0,
        orderBy: 'timeCreated',
        orderDirection: 'asc',
        where: {
            category: Erc721Categories.ClosedPortal
        }
    },
    closedPortalsListingsDefaultSorting: { type: 'timeCreated', dir: 'desc' },
    closedPortalsListingsSorting: { type: 'timeCreated', dir: 'desc' },
    closedPortalsListingsIsSortingUpdated: false,
    closedPortalsListingsFilters: closedPortalListingsFiltersData,
    closedPortalsListingsIsFiltersUpdated: false,
    closedPortalsListingsQueryParamsOrder: [
        closedPortalListingsFiltersData.hauntId.queryParamKey,
        closedPortalListingsFiltersData.priceInWei.queryParamKey,
        'sort',
        'dir'
    ]
};

export const closedPortalsListingsSlice = createSlice({
    name: 'closedPortalsListings',
    initialState,
    reducers: {
        setClosedPortalsListings: (state, action: PayloadAction<ClosedPortalListingVM[]>): void => {
            state.closedPortalsListings = action.payload;
        },
        setClosedPortalsListingsSkipLimit: (state, action: PayloadAction<number>): void => {
            state.closedPortalsListingsGraphQueryParams.skip = action.payload;
        },
        setClosedPortalsListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
            state.closedPortalsListingsSorting = action.payload;

            state.closedPortalsListingsGraphQueryParams.orderBy = action.payload.type;
            state.closedPortalsListingsGraphQueryParams.orderDirection = action.payload.dir;
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
    setClosedPortalsListings,
    setClosedPortalsListingsSkipLimit,
    setClosedPortalsListingsSorting,
    setClosedPortalsListingsIsSortingUpdated,
    setClosedPortalsListingsFilters,
    setClosedPortalsListingsIsFiltersUpdated
} = closedPortalsListingsSlice.actions;

export const closedPortalsListingsReducer = closedPortalsListingsSlice.reducer;
