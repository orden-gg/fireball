import { RootState } from 'core/store/store';

import { RealmVM, SortingItem } from 'shared/models';

import { RealmView } from '../../constants';

export const getRealm = (state: RootState): RealmVM[] => state.client.realm.realm.data;

export const getRealmCount = (state: RootState): number => state.client.realm.realm.data.length;

export const getIsInitialRealmLoading = (state: RootState): boolean => state.client.realm.isInitialRealmLoading;

export const getIsRealmLoaded = (state: RootState): boolean => state.client.realm.realm.isLoaded;

export const getRealmSorting = (state: RootState): SortingItem => state.client.realm.realmSorting;

export const getRealmView = (state: RootState): RealmView => state.client.realm.realmView;
