import { RootState } from 'core/store/store';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { ClosedPortalListingFilters, ClosedPortalListingVM } from '../../models';

export const getClosedPortalsListings = (state: RootState): ClosedPortalListingVM[] =>
  state.baazaar.closedPortals.closedPortalsListings.data;

export const getIsClosedPortalsListingsInitialDataLoading = (state: RootState): boolean =>
  state.baazaar.closedPortals.isClosedPortalsListingsInitialDataLoading;

export const getIsClosedPortalsListingsLoading = (state: RootState): boolean =>
  state.baazaar.closedPortals.closedPortalsListings.isLoading;

export const getClosedPortalsListingsGraphQueryParams = (state: RootState): GraphQueryParams =>
  state.baazaar.closedPortals.closedPortalsListingsGraphQueryParams;

export const getClosedPortalsListingsLimitPerLoad = (state: RootState): number =>
  state.baazaar.closedPortals.closedPortalsListingsLimitPerLoad;

export const getClosedPortalsListingsDefaultSorting = (state: RootState): SortingItem =>
  state.baazaar.closedPortals.closedPortalsListingsDefaultSorting;

export const getClosedPortalsListingsSorting = (state: RootState): SortingItem =>
  state.baazaar.closedPortals.closedPortalsListingsSorting;

export const getClosedPortalsListingsFilters = (state: RootState): ClosedPortalListingFilters =>
  state.baazaar.closedPortals.closedPortalsListingsFilters;

export const getClosedPortalsListingsQueryParamsOrder = (state: RootState): string[] =>
  state.baazaar.closedPortals.closedPortalsListingsQueryParamsOrder;
