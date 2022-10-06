import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc721Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { ClosedPortalListingVM, ClosedPortalListingFilters } from '../../models';
import { closedPortalListingsFiltersData } from '../../static';

export interface ClosedPortlasListingsState {
    closedPortalsListings: ClosedPortalListingVM[];
    closedPortalsListingsLimitPerLoad: number;
    closedPortalsListingsGraphQueryParams: GraphQueryParams;
    closedPortalsListingsSorting: SortingItem;
    closedPortalsListingsFilters: ClosedPortalListingFilters;
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
    closedPortalsListingsSorting: { type: 'timeCreated', dir: 'desc' },
    closedPortalsListingsFilters: closedPortalListingsFiltersData
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
        setClosedPortalsListingsFilters: (state, action: PayloadAction<ClosedPortalListingFilters>): void => {
            state.closedPortalsListingsFilters = action.payload;
        }
    }
});

export const {
    setClosedPortalsListings,
    setClosedPortalsListingsSkipLimit,
    setClosedPortalsListingsSorting,
    setClosedPortalsListingsFilters
} = closedPortalsListingsSlice.actions;

export const closedPortalsListingsReducer = closedPortalsListingsSlice.reducer;
