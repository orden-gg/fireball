import { AppThunk } from 'core/store/store';
import { GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { EthersApi } from 'api';
import { GraphFiltersUtils } from 'utils';

import { ClosedPortalListingFilterTypes } from '../../constants';
import { ClosedPortaListingFiltersType, ClosedPortalListingDTO, ClosedPortalListingFilters, ClosedPortalListingVM } from '../../models';
import { getBaazaarClosedPortalsListingsQuery } from '../../queries';
import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import {
    loadClosedPortalsListings,
    loadClosedPortalsListingsSucceded,
    loadClosedPortalsListingsFailed,
    setClosedPortalsListingsSorting,
    setClosedPortalsListingsSkipLimit,
    setClosedPortalsListingsFilters,
    setClosedPortalsListingsIsSortingUpdated,
    setClosedPortalsListingsIsFiltersUpdated,
    setIsClosedPortalsListingsInitialDataLoading,
    resetClosedPortalsListings
} from '../slices';

export const loadBaazaarClosedPortalsListings = (shouldResetListings: boolean = false): AppThunk => (dispatch, getState) => {
    dispatch(loadClosedPortalsListings());

    const closedPortalsListingsGraphQueryParams: GraphQueryParams = getState().baazaar.closedPortals.closedPortalsListingsGraphQueryParams;
    const closedPortalsListings: ClosedPortalListingVM[] = getState().baazaar.closedPortals.closedPortalsListings.data;
    const filters: ClosedPortalListingFilters = getState().baazaar.closedPortals.closedPortalsListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: ClosedPortaListingFiltersType]) => {
        if (filter.isFilterActive) {
            whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
        }
    });

    const query = getBaazaarClosedPortalsListingsQuery(closedPortalsListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getErc721Listings<ClosedPortalListingDTO>(query)
        .then((res: ClosedPortalListingDTO[]) => {
            const modifiedListings: ClosedPortalListingVM[] = mapClosedPortalsDTOToVM(res);

            if (shouldResetListings) {
                dispatch(loadClosedPortalsListingsSucceded(modifiedListings));
            } else {
                dispatch(loadClosedPortalsListingsSucceded(closedPortalsListings.concat(modifiedListings)));
            }

        })
        .catch(() => {
            dispatch(loadClosedPortalsListingsFailed());
        })
        .finally(() => {
            dispatch(setIsClosedPortalsListingsInitialDataLoading(false));
        });
};

export const onLoadBaazaarClosedPortalsListings = (): AppThunk => (dispatch, getState) => {
    const isFiltersUpdated: boolean = getState().baazaar.closedPortals.closedPortalsListingsIsFiltersUpdated;
    const isSortingUpdated: boolean = getState().baazaar.closedPortals.closedPortalsListingsIsSortingUpdated;

    if (isFiltersUpdated && isSortingUpdated) {
        dispatch(setClosedPortalsListingsSkipLimit(0));
        dispatch(loadBaazaarClosedPortalsListings(true));
    }
};

export const updateClosedPortalsListingsFilterByKey =
    ({ key, value }: { key: ClosedPortalListingFilterTypes, value: GraphFiltersValueTypes }): AppThunk =>
        (dispatch, getState) => {
            const filters: ClosedPortalListingFilters = getState().baazaar.closedPortals.closedPortalsListingsFilters;

            const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

            dispatch(setClosedPortalsListingsFilters({ ...filters, [key]: updatedFilter }));
        };

export const resetClosedPortalsListingsFilters = (): AppThunk =>
    (dispatch, getState) => {
        const filters: ClosedPortalListingFilters = getState().baazaar.closedPortals.closedPortalsListingsFilters;

        const updatedFilters: ClosedPortalListingFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: ClosedPortaListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setClosedPortalsListingsFilters(updatedFilters));
    };

export const resetClosedPortalsData = (): AppThunk =>
    (dispatch, getState) => {
        const filters: ClosedPortalListingFilters = getState().baazaar.closedPortals.closedPortalsListingsFilters;
        const defaultSorting: SortingItem = getState().baazaar.closedPortals.closedPortalsListingsDefaultSorting;

        const updatedFilters: ClosedPortalListingFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: ClosedPortaListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setClosedPortalsListingsFilters(updatedFilters));
        dispatch(setClosedPortalsListingsSorting(defaultSorting));
        dispatch(setClosedPortalsListingsSkipLimit(0));
        dispatch(resetClosedPortalsListings());
        dispatch(setClosedPortalsListingsIsSortingUpdated(false));
        dispatch(setClosedPortalsListingsIsFiltersUpdated(false));
        dispatch(setIsClosedPortalsListingsInitialDataLoading(true));
    };

const mapClosedPortalsDTOToVM = (listings: ClosedPortalListingDTO[]): ClosedPortalListingVM[] => {
    return listings.map((listing: ClosedPortalListingDTO) => ({
        ...listing,
        historicalPrices: listing.portal.historicalPrices,
        listingPrice: EthersApi.fromWei(listing.priceInWei)
    }));
};
