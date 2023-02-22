import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc1155Categories } from 'shared/constants';
import { GraphQueryParams } from 'shared/models';

import { ActivityWearableListingVM, ActivityWearableListingFilters } from '../../models';
import { activityWearableListingFilters } from '../../static/filters';

export interface ActivityWearablesListingsState {
  activityWearablesListings: {
    data: ActivityWearableListingVM[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  isActivityWearablesListingsInitialDataLoading: boolean;
  activityWearablesListingsGraphQueryParams: GraphQueryParams;
  activityWearablesListingsFilters: ActivityWearableListingFilters;
  activityWearablesListingsIsFiltersUpdated: boolean;
  activityWearablesListingsQueryParamsOrder: string[];
}

const initialState: ActivityWearablesListingsState = {
  activityWearablesListings: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  isActivityWearablesListingsInitialDataLoading: true,
  activityWearablesListingsGraphQueryParams: {
    first: 50,
    skip: 0,
    orderBy: 'timePurchased',
    orderDirection: 'desc',
    where: {
      category: Erc1155Categories.Wearable
    }
  },
  activityWearablesListingsFilters: activityWearableListingFilters,
  activityWearablesListingsIsFiltersUpdated: false,
  activityWearablesListingsQueryParamsOrder: [activityWearableListingFilters.rarityLevel.queryParamKey]
};

export const activityWearablesListingsSlice = createSlice({
  name: 'activityWearablesListings',
  initialState,
  reducers: {
    loadActivityWearablesListings: (state): void => {
      state.activityWearablesListings = {
        ...state.activityWearablesListings,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadActivityWearablesListingsSucceded: (state, action: PayloadAction<ActivityWearableListingVM[]>): void => {
      state.activityWearablesListings = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadActivityWearablesListingsFailed: (state): void => {
      state.activityWearablesListings = {
        ...state.activityWearablesListings,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setIsActivityWearablesListingsInitialDataLoading: (state, action: PayloadAction<boolean>): void => {
      state.isActivityWearablesListingsInitialDataLoading = action.payload;
    },
    resetActivityWearablesListings: (state): void => {
      state.activityWearablesListings.data = [];
    },
    setActivityWearablesListingsFilters: (state, action: PayloadAction<ActivityWearableListingFilters>): void => {
      state.activityWearablesListingsFilters = action.payload;
    },
    setActivityWearablesListingsIsFiltersUpdated: (state, action: PayloadAction<boolean>): void => {
      state.activityWearablesListingsIsFiltersUpdated = action.payload;
    }
  }
});

export const {
  loadActivityWearablesListings,
  loadActivityWearablesListingsSucceded,
  loadActivityWearablesListingsFailed,
  setIsActivityWearablesListingsInitialDataLoading,
  resetActivityWearablesListings,
  setActivityWearablesListingsFilters,
  setActivityWearablesListingsIsFiltersUpdated
} = activityWearablesListingsSlice.actions;

export const activityWearablesListingsReducer = activityWearablesListingsSlice.reducer;
