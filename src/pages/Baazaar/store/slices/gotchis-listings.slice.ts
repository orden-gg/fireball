import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { Erc721Categories } from 'shared/constants';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { GotchiListingVM, GotchiListingsFilters } from '../../models';
import { gotchiListingsFilters } from '../../static/filters';

export interface GotchisListingsState {
  gotchisListings: {
    data: GotchiListingVM[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  isGotchisListingsInitialDataLoading: boolean;
  gotchisListingsLimitPerLoad: number;
  gotchisListingsGraphQueryParams: GraphQueryParams;
  gotchisListingsDefaultSorting: SortingItem;
  gotchisListingsSorting: SortingItem;
  gotchisListingsPreviousSortingProp: string;
  gotchisListingsIsSortingUpdated: boolean;
  gotchisListingsFilters: GotchiListingsFilters;
  gotchisListingsIsFiltersUpdated: boolean;
  gotchisListingsQueryParamsOrder: string[];
}

const initialState: GotchisListingsState = {
  gotchisListings: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  isGotchisListingsInitialDataLoading: true,
  gotchisListingsLimitPerLoad: 50,
  gotchisListingsGraphQueryParams: {
    first: 50,
    skip: 0,
    orderBy: 'timeCreated',
    orderDirection: 'desc',
    where: {
      category: Erc721Categories.Aavegotchi
    }
  },
  gotchisListingsDefaultSorting: { type: 'timeCreated', dir: 'desc' },
  gotchisListingsSorting: { type: 'timeCreated', dir: 'desc' },
  gotchisListingsPreviousSortingProp: '',
  gotchisListingsIsSortingUpdated: false,
  gotchisListingsFilters: gotchiListingsFilters,
  gotchisListingsIsFiltersUpdated: false,
  gotchisListingsQueryParamsOrder: [
    gotchiListingsFilters.baseRarityScore.queryParamKey,
    gotchiListingsFilters.kinship.queryParamKey,
    gotchiListingsFilters.experience.queryParamKey,
    gotchiListingsFilters.collateral.queryParamKey,
    gotchiListingsFilters.priceInWei.queryParamKey,
    gotchiListingsFilters.nrgTrait.queryParamKey,
    gotchiListingsFilters.aggTrait.queryParamKey,
    gotchiListingsFilters.spkTrait.queryParamKey,
    gotchiListingsFilters.brnTrait.queryParamKey,
    gotchiListingsFilters.eysTrait.queryParamKey,
    gotchiListingsFilters.eycTrait.queryParamKey,
    'sort',
    'dir'
  ]
};

export const gotchisListingsSlice = createSlice({
  name: 'gotchisListings',
  initialState,
  reducers: {
    loadGotchisListings: (state): void => {
      state.gotchisListings = {
        ...state.gotchisListings,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadGotchisListingsSucceded: (state, action: PayloadAction<GotchiListingVM[]>): void => {
      state.gotchisListings = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadGotchisListingsFailed: (state): void => {
      state.gotchisListings = {
        ...state.gotchisListings,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setIsGotchisListingsInitialDataLoading: (state, action: PayloadAction<boolean>): void => {
      state.isGotchisListingsInitialDataLoading = action.payload;
    },
    resetGotchisListings: (state): void => {
      state.gotchisListings.data = [];
    },
    setGotchisListingsSkipLimit: (state, action: PayloadAction<number>): void => {
      state.gotchisListingsGraphQueryParams.skip = action.payload;
    },
    setGotchisListingsSorting: (state, action: PayloadAction<SortingItem>): void => {
      state.gotchisListingsSorting = action.payload;

      state.gotchisListingsGraphQueryParams.orderBy = action.payload.type;
      state.gotchisListingsGraphQueryParams.orderDirection = action.payload.dir;
    },
    setGotchisListingsPreviousSortingProp: (state, action: PayloadAction<string>): void => {
      state.gotchisListingsPreviousSortingProp = action.payload;
    },
    setGotchisListingsIsSortingUpdated: (state, action: PayloadAction<boolean>): void => {
      state.gotchisListingsIsSortingUpdated = action.payload;
    },
    setGotchisListingsFilters: (state, action: PayloadAction<GotchiListingsFilters>): void => {
      state.gotchisListingsFilters = action.payload;
    },
    setGotchisListingsIsFiltersUpdated: (state, action: PayloadAction<boolean>): void => {
      state.gotchisListingsIsFiltersUpdated = action.payload;
    }
  }
});

export const {
  loadGotchisListings,
  loadGotchisListingsSucceded,
  loadGotchisListingsFailed,
  setIsGotchisListingsInitialDataLoading,
  resetGotchisListings,
  setGotchisListingsSkipLimit,
  setGotchisListingsSorting,
  setGotchisListingsPreviousSortingProp,
  setGotchisListingsIsSortingUpdated,
  setGotchisListingsFilters,
  setGotchisListingsIsFiltersUpdated
} = gotchisListingsSlice.actions;

export const gotchisListingsReducer = gotchisListingsSlice.reducer;
