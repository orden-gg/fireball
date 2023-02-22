import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc721Categories } from 'shared/constants';
import { GraphQueryParams } from 'shared/models';

import { ActivityPortalListingVM, ActivityPortalListingFilters } from '../../models';
import { activityPortalListingsFilters } from '../../static/filters';

export interface ActivityPortalsListingsState {
  activityPortalsListings: {
    data: ActivityPortalListingVM[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  isActivityPortalsListingsInitialDataLoading: boolean;
  activityPortalsListingsGraphQueryParams: GraphQueryParams;
  activityPortalsListingsFilters: ActivityPortalListingFilters;
  activityPortalsListingsIsFiltersUpdated: boolean;
  activityPortalsListingsQueryParamsOrder: string[];
}

const initialState: ActivityPortalsListingsState = {
  activityPortalsListings: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  isActivityPortalsListingsInitialDataLoading: true,
  activityPortalsListingsGraphQueryParams: {
    first: 50,
    skip: 0,
    orderBy: 'timePurchased',
    orderDirection: 'desc',
    where: {
      categories: [Erc721Categories.ClosedPortal, Erc721Categories.OpenedPortal]
    }
  },
  activityPortalsListingsFilters: activityPortalListingsFilters,
  activityPortalsListingsIsFiltersUpdated: false,
  activityPortalsListingsQueryParamsOrder: [activityPortalListingsFilters.hauntId.queryParamKey]
};

export const activityPortalsListingsSlice = createSlice({
  name: 'activityPortalsListings',
  initialState,
  reducers: {
    loadActivityPortalsListings: (state): void => {
      state.activityPortalsListings = {
        ...state.activityPortalsListings,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadActivityPortalsListingsSucceded: (state, action: PayloadAction<ActivityPortalListingVM[]>): void => {
      state.activityPortalsListings = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadActivityPortalsListingsFailed: (state): void => {
      state.activityPortalsListings = {
        ...state.activityPortalsListings,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setIsActivityPortalsListingsInitialDataLoading: (state, action: PayloadAction<boolean>): void => {
      state.isActivityPortalsListingsInitialDataLoading = action.payload;
    },
    resetActivityPortalsListings: (state): void => {
      state.activityPortalsListings.data = [];
    },
    setActivityPortalsListingsFilters: (state, action: PayloadAction<ActivityPortalListingFilters>): void => {
      state.activityPortalsListingsFilters = action.payload;
    },
    setActivityPortalsListingsIsFiltersUpdated: (state, action: PayloadAction<boolean>): void => {
      state.activityPortalsListingsIsFiltersUpdated = action.payload;
    }
  }
});

export const {
  loadActivityPortalsListings,
  loadActivityPortalsListingsSucceded,
  loadActivityPortalsListingsFailed,
  setIsActivityPortalsListingsInitialDataLoading,
  resetActivityPortalsListings,
  setActivityPortalsListingsFilters,
  setActivityPortalsListingsIsFiltersUpdated
} = activityPortalsListingsSlice.actions;

export const activityPortalsListingsReducer = activityPortalsListingsSlice.reducer;
