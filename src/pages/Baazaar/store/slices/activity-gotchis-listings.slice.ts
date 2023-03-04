import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Erc721Categories } from 'shared/constants';
import { GraphQueryParams } from 'shared/models';

import { ActivityGotchiListingFilters, ActivityGotchiListingVM } from '../../models';
import { activityGotchiListingsFilters } from '../../static/filters';

export interface ActivityGotchisListingsState {
  activityGotchisListings: {
    data: ActivityGotchiListingVM[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  isActivityGotchisListingsInitialDataLoading: boolean;
  activityGotchisListingsGraphQueryParams: GraphQueryParams;
  activityGotchisListingsFilters: ActivityGotchiListingFilters;
  activityGotchisListingsIsFiltersUpdated: boolean;
  activityGotchisListingsQueryParamsOrder: string[];
}

const initialState: ActivityGotchisListingsState = {
  activityGotchisListings: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  isActivityGotchisListingsInitialDataLoading: true,
  activityGotchisListingsGraphQueryParams: {
    first: 50,
    skip: 0,
    orderBy: 'timePurchased',
    orderDirection: 'desc',
    where: {
      categories: [Erc721Categories.Aavegotchi]
    }
  },
  activityGotchisListingsFilters: activityGotchiListingsFilters,
  activityGotchisListingsIsFiltersUpdated: false,
  activityGotchisListingsQueryParamsOrder: [
    activityGotchiListingsFilters.baseRarityScore.queryParamKey,
    activityGotchiListingsFilters.kinship.queryParamKey,
    activityGotchiListingsFilters.experience.queryParamKey,
    activityGotchiListingsFilters.collateral.queryParamKey,
    activityGotchiListingsFilters.nrgTrait.queryParamKey,
    activityGotchiListingsFilters.aggTrait.queryParamKey,
    activityGotchiListingsFilters.spkTrait.queryParamKey,
    activityGotchiListingsFilters.brnTrait.queryParamKey,
    activityGotchiListingsFilters.eysTrait.queryParamKey,
    activityGotchiListingsFilters.eycTrait.queryParamKey
  ]
};

export const activityGotchisListingsSlice = createSlice({
  name: 'activityGotchisListings',
  initialState,
  reducers: {
    loadActivityGotchisListings: (state): void => {
      state.activityGotchisListings = {
        ...state.activityGotchisListings,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadActivityGotchisListingsSucceded: (state, action: PayloadAction<ActivityGotchiListingVM[]>): void => {
      state.activityGotchisListings = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadActivityGotchisListingsFailed: (state): void => {
      state.activityGotchisListings = {
        ...state.activityGotchisListings,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setIsActivityGotchisListingsInitialDataLoading: (state, action: PayloadAction<boolean>): void => {
      state.isActivityGotchisListingsInitialDataLoading = action.payload;
    },
    resetActivityGotchisListings: (state): void => {
      state.activityGotchisListings.data = [];
    },
    setActivityGotchisListingsFilters: (state, action: PayloadAction<ActivityGotchiListingFilters>): void => {
      state.activityGotchisListingsFilters = action.payload;
    },
    setActivityGotchisListingsIsFiltersUpdated: (state, action: PayloadAction<boolean>): void => {
      state.activityGotchisListingsIsFiltersUpdated = action.payload;
    }
  }
});

export const {
  loadActivityGotchisListings,
  loadActivityGotchisListingsSucceded,
  loadActivityGotchisListingsFailed,
  setIsActivityGotchisListingsInitialDataLoading,
  resetActivityGotchisListings,
  setActivityGotchisListingsFilters,
  setActivityGotchisListingsIsFiltersUpdated
} = activityGotchisListingsSlice.actions;

export const activityGotchisListingsReducer = activityGotchisListingsSlice.reducer;
