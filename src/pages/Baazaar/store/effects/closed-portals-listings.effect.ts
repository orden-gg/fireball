import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import { EthersApi } from 'api';

import { AppThunk } from 'core/store/store';

import { GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';

import { GraphFiltersUtils } from 'utils';

import { ASCENDING_DIRECTION, ClosedPortalListingFilterTypes, PRICE_IN_WEI } from '../../constants';
import {
  ClosedPortaListingFiltersType,
  ClosedPortalListingDTO,
  ClosedPortalListingFilters,
  ClosedPortalListingVM
} from '../../models';
import { getBaazaarClosedPortalsListingsQuery } from '../../queries';
// slices
import * as closedPortalsListingsSlices from '../slices/closed-portals-listings.slice';

export const loadBaazaarClosedPortalsListings =
  (shouldResetListings: boolean = false): AppThunk =>
  (dispatch, getState) => {
    dispatch(closedPortalsListingsSlices.loadClosedPortalsListings());

    const closedPortalsListingsGraphQueryParams: GraphQueryParams =
      getState().baazaar.closedPortals.closedPortalsListingsGraphQueryParams;
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
          dispatch(closedPortalsListingsSlices.loadClosedPortalsListingsSucceded(modifiedListings));
        } else {
          dispatch(
            closedPortalsListingsSlices.loadClosedPortalsListingsSucceded(
              closedPortalsListings.concat(modifiedListings)
            )
          );
        }
      })
      .catch(() => {
        dispatch(closedPortalsListingsSlices.loadClosedPortalsListingsFailed());
      })
      .finally(() => {
        dispatch(closedPortalsListingsSlices.setIsClosedPortalsListingsInitialDataLoading(false));
      });
  };

export const onLoadBaazaarClosedPortalsListings = (): AppThunk => (dispatch, getState) => {
  const isFiltersUpdated: boolean = getState().baazaar.closedPortals.closedPortalsListingsIsFiltersUpdated;
  const isSortingUpdated: boolean = getState().baazaar.closedPortals.closedPortalsListingsIsSortingUpdated;

  if (isFiltersUpdated && isSortingUpdated) {
    dispatch(closedPortalsListingsSlices.setClosedPortalsListingsSkipLimit(0));
    dispatch(loadBaazaarClosedPortalsListings(true));
  }
};

export const onSetClosedPortalsListingsSorting =
  (sort: SortingItem): AppThunk =>
  (dispatch, getState) => {
    let direction: string = sort.dir;
    const previousSortingProp: string = getState().baazaar.closedPortals.closedPortalsListingsPreviousSortingProp;

    if (sort.type === PRICE_IN_WEI && previousSortingProp && previousSortingProp !== PRICE_IN_WEI) {
      direction = ASCENDING_DIRECTION;
    }

    dispatch(closedPortalsListingsSlices.setClosedPortalsListingsSorting({ type: sort.type, dir: direction }));
    dispatch(closedPortalsListingsSlices.setClosedPortalsListingsPreviousSortingProp(sort.type));
  };

export const updateClosedPortalsListingsFilterByKey =
  ({ key, value }: { key: ClosedPortalListingFilterTypes; value: GraphFiltersValueTypes }): AppThunk =>
  (dispatch, getState) => {
    const filters: ClosedPortalListingFilters = getState().baazaar.closedPortals.closedPortalsListingsFilters;

    const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

    dispatch(closedPortalsListingsSlices.setClosedPortalsListingsFilters({ ...filters, [key]: updatedFilter }));
  };

export const resetClosedPortalsListingsFilters = (): AppThunk => (dispatch, getState) => {
  const filters: ClosedPortalListingFilters = getState().baazaar.closedPortals.closedPortalsListingsFilters;

  const updatedFilters: ClosedPortalListingFilters = Object.fromEntries(
    Object.entries(filters).map(([_, filter]: [_: string, filter: ClosedPortaListingFiltersType]) => [
      [filter.key],
      GraphFiltersUtils.getResetedFilterByType(filter)
    ])
  );

  dispatch(closedPortalsListingsSlices.setClosedPortalsListingsFilters(updatedFilters));
};

export const resetClosedPortalsData = (): AppThunk => (dispatch, getState) => {
  const filters: ClosedPortalListingFilters = getState().baazaar.closedPortals.closedPortalsListingsFilters;
  const defaultSorting: SortingItem = getState().baazaar.closedPortals.closedPortalsListingsDefaultSorting;

  const updatedFilters: ClosedPortalListingFilters = Object.fromEntries(
    Object.entries(filters).map(([_, filter]: [_: string, filter: ClosedPortaListingFiltersType]) => [
      [filter.key],
      GraphFiltersUtils.getResetedFilterByType(filter)
    ])
  );

  dispatch(closedPortalsListingsSlices.setClosedPortalsListingsFilters(updatedFilters));
  dispatch(closedPortalsListingsSlices.setClosedPortalsListingsSorting(defaultSorting));
  dispatch(closedPortalsListingsSlices.setClosedPortalsListingsSkipLimit(0));
  dispatch(closedPortalsListingsSlices.resetClosedPortalsListings());
  dispatch(closedPortalsListingsSlices.setClosedPortalsListingsIsSortingUpdated(false));
  dispatch(closedPortalsListingsSlices.setClosedPortalsListingsIsFiltersUpdated(false));
  dispatch(closedPortalsListingsSlices.setIsClosedPortalsListingsInitialDataLoading(true));
};

const mapClosedPortalsDTOToVM = (listings: ClosedPortalListingDTO[]): ClosedPortalListingVM[] => {
  return listings.map((listing: ClosedPortalListingDTO) => ({
    ...listing,
    historicalPrices: listing.portal.historicalPrices,
    listingPrice: EthersApi.fromWei(listing.priceInWei)
  }));
};
