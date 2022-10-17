import { AppThunk } from 'core/store/store';
import { Erc1155Categories } from 'shared/constants';
import { Erc1155ListingsBatch, GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { EthersApi, TheGraphApi } from 'api';
import { GraphFiltersUtils, InstallationsUtils } from 'utils';

import { InstallationListingFilterTypes } from '../../constants';
import { InstallationListingDTO, InstallationListingFilters, InstallationListingFiltersType, InstallationListingVM } from '../../models';
import { getBaazaarWearablesListingsQuery } from '../../queries';
import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import {
    setInstallationsListings,
    setInstallationsListingsFilters,
    setInstallationsListingsSkipLimit,
    setInstallationsListingsSorting
} from '../slices';

export const loadBaazaarInstallationsListings = (): AppThunk => async (dispatch, getState) => {
    const installationsListingsGraphQueryParams: GraphQueryParams = getState().baazaar.installations.installationsListingsGraphQueryParams;
    const currentInstallationsListings: InstallationListingVM[] = getState().baazaar.installations.installationsListings;
    const filters: InstallationListingFilters = getState().baazaar.installations.installationsListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: InstallationListingFiltersType]) => {
        if (filter.isFilterActive) {
            whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
        }
    });

    const query = getBaazaarWearablesListingsQuery(installationsListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getInstallationsListings(query)
        .then((installationsListings: InstallationListingDTO[]) => {
            const installationsIds: number[] = installationsListings
                .map((listing: InstallationListingDTO) => Number(listing.erc1155TypeId));

            TheGraphApi.getErc1155ListingsBatchQuery(installationsIds, Erc1155Categories.Installation, true, 'timeLastPurchased', 'desc')
               .then((lastSoldListings: Erc1155ListingsBatch) => {
                    const modifiedListings: InstallationListingVM[] = mapInstallationsListingsDTOToVM(installationsListings, lastSoldListings);

                    dispatch(setInstallationsListings(currentInstallationsListings.concat(modifiedListings)));
                });
        });
};

export const updateInstallationsListingsSorting = (sortings: SortingItem): AppThunk => async (dispatch) => {
    dispatch(setInstallationsListingsSorting(sortings));
    dispatch(setInstallationsListingsSkipLimit(0));
    dispatch(setInstallationsListings([]));
    dispatch(loadBaazaarInstallationsListings());
};

export const updateInstallationsListingsFilterByKey =
    ({ key, value }: { key: InstallationListingFilterTypes, value: GraphFiltersValueTypes }): AppThunk =>
        async (dispatch, getState) => {
            const filters: InstallationListingFilters = getState().baazaar.installations.installationsListingsFilters;

            const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

            dispatch(setInstallationsListingsFilters({ ...filters, [key]: updatedFilter as InstallationListingFiltersType }));
            dispatch(setInstallationsListingsSkipLimit(0));
            dispatch(setInstallationsListings([]));
            dispatch(loadBaazaarInstallationsListings());
        };

export const resetInstallationsListingsFilters = (): AppThunk =>
    async (dispatch, getState) => {
        const filters: InstallationListingFilters = getState().baazaar.installations.installationsListingsFilters;

        const updatedFilters: InstallationListingFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: InstallationListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setInstallationsListingsFilters(updatedFilters));
        dispatch(setInstallationsListingsSkipLimit(0));
        dispatch(setInstallationsListings([]));
        dispatch(loadBaazaarInstallationsListings());
    };

export const resetInstallationsListingsData = (): AppThunk =>
    async (dispatch, getState) => {
        const filters: InstallationListingFilters = getState().baazaar.installations.installationsListingsFilters;
        const defaultSorting: SortingItem = getState().baazaar.installations.installationsListingsDefaultSorting;

        const updatedFilters: InstallationListingFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: InstallationListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setInstallationsListingsFilters(updatedFilters));
        dispatch(setInstallationsListingsSorting(defaultSorting));
        dispatch(setInstallationsListingsSkipLimit(0));
        dispatch(setInstallationsListings([]));
    };

const mapInstallationsListingsDTOToVM = (listings: InstallationListingDTO[], lastSoldListings: Erc1155ListingsBatch): InstallationListingVM[] => {
    return listings.map((listing: InstallationListingDTO) => {
        const lastSoldListing = lastSoldListings[`item${listing.erc1155TypeId}`];

        return ({
            ...listing,
            erc1155TypeId: Number(listing.erc1155TypeId),
            quantity: Number(listing.quantity),
            timeCreated: Number(listing.timeCreated),
            name: InstallationsUtils.getNameById(listing.erc1155TypeId),
            imageSrcUrl: InstallationsUtils.getImageById(listing.erc1155TypeId),
            rarity: InstallationsUtils.getRarityById(listing.erc1155TypeId),
            isDeprecated: InstallationsUtils.getDeprecatedById(listing.erc1155TypeId),
            currentListing: {
                id: Number(listing.id),
                price: EthersApi.fromWei(listing.priceInWei)
            },
            lastSoldListing: {
                id: lastSoldListing[0] ? Number(lastSoldListing[0].id) : null,
                price: lastSoldListing[0] ? Number(EthersApi.fromWei(lastSoldListing[0].priceInWei)) : 0,
                soldDate: lastSoldListing[0]?.timeLastPurchased ?
                    new Date(Number(lastSoldListing[0].timeLastPurchased) * 1000).toJSON() :
                    null
            }
        });
    });
};
