import { RootState } from 'core/store/store';
import { SortingItem } from 'shared/models';

import { OpenedPortalListingVM } from '../../models';

export const getInitialOpenedPortalsListings = (state: RootState): OpenedPortalListingVM[] =>
    state.baazaar.openedPortals.initialListings;

export const getOpenedPortalsListings = (state: RootState): OpenedPortalListingVM[] =>
    state.baazaar.openedPortals.openedPortalsListings.data;

export const getIsOpenedPortalsListingsLoading = (state: RootState): boolean =>
    state.baazaar.openedPortals.openedPortalsListings.isLoading;

export const getOpenedPortalsListingsDefaultSorting = (state: RootState): SortingItem =>
    state.baazaar.openedPortals.openedPortalsListingsDefaultSorting;

export const getOpenedPortalsListingsSorting = (state: RootState): SortingItem =>
    state.baazaar.openedPortals.openedPortalsListingsSorting;

export const getOpenedPortalsListingsQueryParamsOrder = (state: RootState): string[] =>
    state.baazaar.openedPortals.openedPortalsListingsQueryParamsOrder;
