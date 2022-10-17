import { RootState } from 'core/store/store';
import { GraphQueryParams, SortingItem } from 'shared/models';

import { InstallationListingFilters, InstallationListingVM } from '../../models';

export const getInstallationsListings = (state: RootState): InstallationListingVM[] =>
    state.baazaar.installations.installationsListings;

export const getInstallationsListingsGraphQueryParams = (state: RootState): GraphQueryParams =>
    state.baazaar.installations.installationsListingsGraphQueryParams;

export const getInstallationsListingsLimitPerLoad = (state: RootState): number =>
    state.baazaar.installations.installationsListingsLimitPerLoad;

export const getInstallationsListingsDefaultSorting = (state: RootState): SortingItem =>
    state.baazaar.installations.installationsListingsDefaultSorting;

export const getInstallationsListingsSorting = (state: RootState): SortingItem =>
    state.baazaar.installations.installationsListingsSorting;

export const getInstallationsListingsFilters = (state: RootState): InstallationListingFilters =>
    state.baazaar.installations.installationsListingsFilters;

export const getInstallationsListingsQueryParamsOrder = (state: RootState): string[] =>
    state.baazaar.installations.installationsListingsQueryParamsOrder;
