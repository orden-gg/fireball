import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { RealmState } from '../slices';

const realmStateSelector = createSelector(
  (state: RootState) => state.client.realm,
  (realmState: RealmState) => realmState
);

export const getRealm = createSelector(realmStateSelector, (state: RealmState) => state.realm.data);

export const getRealmCount = createSelector(realmStateSelector, (state: RealmState) => state.realm.data.length);

export const getIsInitialRealmLoading = createSelector(
  realmStateSelector,
  (state: RealmState) => state.isInitialRealmLoading
);

export const getIsRealmLoaded = createSelector(realmStateSelector, (state: RealmState) => state.realm.isLoaded);

export const getRealmSorting = createSelector(realmStateSelector, (state: RealmState) => state.realmSorting);

export const getRealmView = createSelector(realmStateSelector, (state: RealmState) => state.realmView);
