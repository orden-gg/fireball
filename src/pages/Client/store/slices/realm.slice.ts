import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RealmVM, SortingItem } from 'shared/models';

import { RealmView } from '../../constants';

export interface RealmState {
  realm: {
    data: RealmVM[];
    isLoading: boolean;
    isLoaded: boolean;
    isError: boolean;
  };
  isInitialRealmLoading: boolean;
  realmSorting: SortingItem;
  realmView: RealmView;
}

const initialState: RealmState = {
  realm: {
    data: [],
    isLoading: false,
    isLoaded: false,
    isError: false
  },
  isInitialRealmLoading: true,
  realmSorting: {
    type: 'size',
    dir: 'desc'
  },
  realmView: RealmView.List
};

export const realmSlice = createSlice({
  name: 'realm',
  initialState,
  reducers: {
    loadRealm: (state): void => {
      state.realm = {
        ...state.realm,
        isLoading: true,
        isLoaded: false,
        isError: false
      };
    },
    loadRealmSucceded: (state, action: PayloadAction<RealmVM[]>): void => {
      state.realm = {
        data: action.payload,
        isLoading: false,
        isLoaded: true,
        isError: false
      };
    },
    loadRealmFailed: (state): void => {
      state.realm = {
        ...state.realm,
        isLoading: false,
        isLoaded: true,
        isError: true
      };
    },
    setIsInitialRealmLoading: (state, action: PayloadAction<boolean>): void => {
      state.isInitialRealmLoading = action.payload;
    },
    setRealmSorting: (state, action: PayloadAction<SortingItem>): void => {
      state.realmSorting = action.payload;
    },
    setRealmView: (state, action: PayloadAction<RealmView>): void => {
      state.realmView = action.payload;
    }
  }
});

export const {
  loadRealm,
  loadRealmSucceded,
  loadRealmFailed,
  setIsInitialRealmLoading,
  setRealmSorting,
  setRealmView
} = realmSlice.actions;

export const realmReducer = realmSlice.reducer;
