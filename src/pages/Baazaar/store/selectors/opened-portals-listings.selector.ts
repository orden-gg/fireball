import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'core/store/store';

import { OpenedPortalsListingsState } from '../slices';

const openedPortalsListingsStateSelector = createSelector(
  (state: RootState) => state.baazaar.openedPortals,
  (openedPortalsListingsState: OpenedPortalsListingsState) => openedPortalsListingsState
);

export const getInitialOpenedPortalsListings = createSelector(
  openedPortalsListingsStateSelector,
  (state: OpenedPortalsListingsState) => state.initialListings
);

export const getOpenedPortalsListings = createSelector(
  openedPortalsListingsStateSelector,
  (state: OpenedPortalsListingsState) => state.openedPortalsListings.data
);

export const getIsOpenedPortalsListingsLoading = createSelector(
  openedPortalsListingsStateSelector,
  (state: OpenedPortalsListingsState) => state.openedPortalsListings.isLoading
);

export const getOpenedPortalsListingsDefaultSorting = createSelector(
  openedPortalsListingsStateSelector,
  (state: OpenedPortalsListingsState) => state.openedPortalsListingsDefaultSorting
);

export const getOpenedPortalsListingsSorting = createSelector(
  openedPortalsListingsStateSelector,
  (state: OpenedPortalsListingsState) => state.openedPortalsListingsSorting
);

export const getOpenedPortalsListingsQueryParamsOrder = createSelector(
  openedPortalsListingsStateSelector,
  (state: OpenedPortalsListingsState) => state.openedPortalsListingsQueryParamsOrder
);
