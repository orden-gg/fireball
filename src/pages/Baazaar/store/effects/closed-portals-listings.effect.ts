import { AppThunk } from 'core/store/store';
import { GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { ClosedPortaListingFiltersType, ClosedPortalListingDTO, ClosedPortalListingFilters, ClosedPortalListingVM } from '../../models';
import { getBaazaarClosedPortalsListingsQuery } from '../../queries';
import { GraphFiltersUtils } from 'utils';

import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import { ClosedPortalListingFilterTypes } from 'pages/Baazaar/constants';
import {
    setClosedPortalsListings,
    setClosedPortalsListingsSorting,
    setClosedPortalsListingsSkipLimit,
    setClosedPortalsListingsFilters,
    setClosedPortalsListingsIsSortingUpdated,
    setClosedPortalsListingsIsFiltersUpdated
} from '../slices';

export const loadBaazaarClosedPortalsListings = (): AppThunk => async (dispatch, getState) => {
    const closedPortalsListingsGraphQueryParams: GraphQueryParams = getState().baazaar.closedPortals.closedPortalsListingsGraphQueryParams;
    const closedPortalsListings: ClosedPortalListingVM[] = getState().baazaar.closedPortals.closedPortalsListings;
    const filters: ClosedPortalListingFilters = getState().baazaar.closedPortals.closedPortalsListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: ClosedPortaListingFiltersType]) => {
        if (filter.isFilterActive) {
            whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
        }
    });

    const query = getBaazaarClosedPortalsListingsQuery(closedPortalsListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getClosedPortalsListings(query)
        .then((res: ClosedPortalListingDTO[]) => {
            const modifiedListings: ClosedPortalListingVM[] = mapClosedPortalsDTOToVM(res);

            dispatch(setClosedPortalsListings(closedPortalsListings.concat(modifiedListings)));
        });
};

export const onLoadBaazaarClosedPortalsListings = (): AppThunk => async (dispatch, getState) => {
    const isFiltersUpdated: boolean = getState().baazaar.closedPortals.closedPortalsListingsIsFiltersUpdated;
    const isSortingUpdated: boolean = getState().baazaar.closedPortals.closedPortalsListingsIsSortingUpdated;

    if (isFiltersUpdated && isSortingUpdated) {
        dispatch(setClosedPortalsListingsSkipLimit(0));
        dispatch(setClosedPortalsListings([]));
        dispatch(loadBaazaarClosedPortalsListings());
    }
};

export const updateClosedPortalsListingsFilterByKey =
    ({ key, value }: { key: ClosedPortalListingFilterTypes, value: GraphFiltersValueTypes }): AppThunk =>
        async (dispatch, getState) => {
            const filters: ClosedPortalListingFilters = getState().baazaar.closedPortals.closedPortalsListingsFilters;

            const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

            dispatch(setClosedPortalsListingsFilters({ ...filters, [key]: updatedFilter }));
        };

export const resetClosedPortalsListingsFilters = (): AppThunk =>
    async (dispatch, getState) => {
        const filters: ClosedPortalListingFilters = getState().baazaar.closedPortals.closedPortalsListingsFilters;

        const updatedFilters: ClosedPortalListingFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: ClosedPortaListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setClosedPortalsListingsFilters(updatedFilters));
    };

export const resetClosedPortalsData = (): AppThunk =>
    async (dispatch, getState) => {
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
        dispatch(setClosedPortalsListings([]));
        dispatch(setClosedPortalsListingsIsSortingUpdated(false));
        dispatch(setClosedPortalsListingsIsFiltersUpdated(false));
    };

const mapClosedPortalsDTOToVM = (listings: ClosedPortalListingDTO[]): ClosedPortalListingVM[] => {
    return listings.map((listing: ClosedPortalListingDTO) => ({
        ...listing,
        historicalPrices: listing.portal.historicalPrices,
        listings: [{
            id: listing.id,
            priceInWei: listing.priceInWei
        }]
    }));
};
