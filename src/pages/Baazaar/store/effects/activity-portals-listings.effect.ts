import { AppThunk } from 'core/store/store';
import { GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams } from 'shared/models';
import { EthersApi } from 'api';
import { GraphFiltersUtils } from 'utils';

import { ActivityPortalListingFilterTypes } from '../../constants';
import {
  ActivityPortalListingDTO,
  ActivityPortalListingFilters,
  ActivityPortalListingVM,
  ActivityPortalListingFiltersType
} from '../../models';
import { getBaazaarActivityPortalsListingsQuery } from '../../queries';
import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import {
  loadActivityPortalsListings,
  loadActivityPortalsListingsSucceded,
  loadActivityPortalsListingsFailed,
  setActivityPortalsListingsFilters,
  setActivityPortalsListingsIsFiltersUpdated,
  setIsActivityPortalsListingsInitialDataLoading,
  resetActivityPortalsListings
} from '../slices';

export const loadBaazaarActivityPortalsListings =
  (shouldResetListings: boolean = false): AppThunk =>
  (dispatch, getState) => {
    dispatch(loadActivityPortalsListings());

    const activityPortalsListingsGraphQueryParams: GraphQueryParams =
      getState().baazaar.activity.portals.activityPortalsListingsGraphQueryParams;
    const activityPortalsListings: ActivityPortalListingVM[] =
      getState().baazaar.activity.portals.activityPortalsListings.data;
    const filters: ActivityPortalListingFilters = getState().baazaar.activity.portals.activityPortalsListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: ActivityPortalListingFiltersType]) => {
      if (filter.isFilterActive) {
        whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
      }
    });

    const query = getBaazaarActivityPortalsListingsQuery(activityPortalsListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getErc721Listings<ActivityPortalListingDTO>(query)
      .then((res: ActivityPortalListingDTO[]) => {
        const modifiedListings: ActivityPortalListingVM[] = mapActivityPortalsDTOToVM(res);

        if (shouldResetListings) {
          dispatch(loadActivityPortalsListingsSucceded(modifiedListings));
        } else {
          dispatch(loadActivityPortalsListingsSucceded(activityPortalsListings.concat(modifiedListings)));
        }
      })
      .catch(() => {
        dispatch(loadActivityPortalsListingsFailed());
      })
      .finally(() => {
        dispatch(setIsActivityPortalsListingsInitialDataLoading(false));
      });
  };

export const onLoadBaazaarActivityPortalsListings = (): AppThunk => (dispatch, getState) => {
  const isFiltersUpdated: boolean = getState().baazaar.activity.portals.activityPortalsListingsIsFiltersUpdated;

  if (isFiltersUpdated) {
    dispatch(loadBaazaarActivityPortalsListings(true));
  }
};

export const updateActivityPortalsListingsFilterByKey =
  ({ key, value }: { key: ActivityPortalListingFilterTypes; value: GraphFiltersValueTypes }): AppThunk =>
  (dispatch, getState) => {
    const filters: ActivityPortalListingFilters = getState().baazaar.activity.portals.activityPortalsListingsFilters;

    const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

    dispatch(
      setActivityPortalsListingsFilters({ ...filters, [key]: updatedFilter as ActivityPortalListingFiltersType })
    );
  };

export const resetActivityPortalsListingsFilters = (): AppThunk => (dispatch, getState) => {
  const filters: ActivityPortalListingFilters = getState().baazaar.activity.portals.activityPortalsListingsFilters;

  const updatedFilters: ActivityPortalListingFilters = Object.fromEntries(
    Object.entries(filters).map(([_, filter]: [_: string, filter: ActivityPortalListingFiltersType]) => [
      [filter.key],
      GraphFiltersUtils.getResetedFilterByType(filter)
    ])
  );

  dispatch(setActivityPortalsListingsFilters(updatedFilters));
};

export const resetActivityPortalsData = (): AppThunk => (dispatch, getState) => {
  const filters: ActivityPortalListingFilters = getState().baazaar.activity.portals.activityPortalsListingsFilters;

  const updatedFilters: ActivityPortalListingFilters = Object.fromEntries(
    Object.entries(filters).map(([_, filter]: [_: string, filter: ActivityPortalListingFiltersType]) => [
      [filter.key],
      GraphFiltersUtils.getResetedFilterByType(filter)
    ])
  );

  dispatch(setActivityPortalsListingsFilters(updatedFilters));
  dispatch(resetActivityPortalsListings());
  dispatch(setActivityPortalsListingsIsFiltersUpdated(false));
  dispatch(setIsActivityPortalsListingsInitialDataLoading(true));
};

const mapActivityPortalsDTOToVM = (listings: ActivityPortalListingDTO[]): ActivityPortalListingVM[] => {
  return listings.map((listing: ActivityPortalListingDTO) => ({
    ...listing,
    historicalPrices: listing.portal.historicalPrices,
    listingPrice: EthersApi.fromWei(listing.priceInWei),
    timePurchased: Number(listing.timePurchased)
  }));
};
