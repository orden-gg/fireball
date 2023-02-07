import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Erc721Categories } from 'shared/constants';
import { GraphQueryParams } from 'shared/models';

import { ActivityParcelListingVM, ActivityParcelListingFilters } from '../../models';
import { activityParcelListingFilters } from '../../static/filters';

export interface ActivityParcelsListingsState {
  activityParcelsListings: {
    data: ActivityParcelListingVM[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  isActivityParcelsListingsInitialDataLoading: boolean;
  activityParcelsListingsGraphQueryParams: GraphQueryParams;
  activityParcelsListingsFilters: ActivityParcelListingFilters;
  activityParcelsListingsIsFiltersUpdated: boolean;
  activityParcelsListingsQueryParamsOrder: string[];
}

const initialState: ActivityParcelsListingsState = {
  activityParcelsListings: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  isActivityParcelsListingsInitialDataLoading: true,
  activityParcelsListingsGraphQueryParams: {
    first: 50,
    skip: 0,
    orderBy: 'timePurchased',
    orderDirection: 'desc',
    where: {
      categories: [Erc721Categories.Realm]
    }
  },
  activityParcelsListingsFilters: activityParcelListingFilters,
  activityParcelsListingsIsFiltersUpdated: false,
  activityParcelsListingsQueryParamsOrder: [
    activityParcelListingFilters.size.queryParamKey,
    activityParcelListingFilters.district.queryParamKey,
    activityParcelListingFilters.fudBoost.queryParamKey,
    activityParcelListingFilters.fomoBoost.queryParamKey,
    activityParcelListingFilters.alphaBoost.queryParamKey,
    activityParcelListingFilters.kekBoost.queryParamKey
  ]
};

export const activityParcelsListingsSlice = createSlice({
  name: 'activityParcelsListings',
  initialState,
  reducers: {
    loadActivityParcelsListings: (state): void => {
      state.activityParcelsListings = {
        ...state.activityParcelsListings,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadActivityParcelsListingsSucceded: (state, action: PayloadAction<ActivityParcelListingVM[]>): void => {
      state.activityParcelsListings = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadActivityParcelsListingsFailed: (state): void => {
      state.activityParcelsListings = {
        ...state.activityParcelsListings,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setIsActivityParcelsListingsInitialDataLoading: (state, action: PayloadAction<boolean>): void => {
      state.isActivityParcelsListingsInitialDataLoading = action.payload;
    },
    resetActivityParcelsListings: (state): void => {
      state.activityParcelsListings.data = [];
    },
    setActivityParcelsListingsFilters: (state, action: PayloadAction<ActivityParcelListingFilters>): void => {
      state.activityParcelsListingsFilters = action.payload;
    },
    setActivityParcelsListingsIsFiltersUpdated: (state, action: PayloadAction<boolean>): void => {
      state.activityParcelsListingsIsFiltersUpdated = action.payload;
    }
  }
});

export const {
  loadActivityParcelsListings,
  loadActivityParcelsListingsSucceded,
  loadActivityParcelsListingsFailed,
  setIsActivityParcelsListingsInitialDataLoading,
  resetActivityParcelsListings,
  setActivityParcelsListingsFilters,
  setActivityParcelsListingsIsFiltersUpdated
} = activityParcelsListingsSlice.actions;

export const activityParcelsListingsReducer = activityParcelsListingsSlice.reducer;
