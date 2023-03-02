import { AppThunk } from 'core/store/store';

import { GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams } from 'shared/models';

import { GraphFiltersUtils, ItemUtils } from 'utils';

import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import { EthersApi } from 'api';

import { ActivityConsumableListingFilterTypes } from '../../constants';
import {
  ActivityConsumableListingDTO,
  ActivityConsumableListingFilters,
  ActivityConsumableListingFiltersType,
  ActivityConsumableListingVM
} from '../../models';
import { getBaazaarErc1155PurchasesQuery } from '../../queries';
import {
  loadActivityConsumablesListings,
  loadActivityConsumablesListingsFailed,
  loadActivityConsumablesListingsSucceded,
  resetActivityConsumablesListings,
  setActivityConsumablesListingsFilters,
  setActivityConsumablesListingsIsFiltersUpdated,
  setIsActivityConsumablesListingsInitialDataLoading
} from '../slices';

export const loadBaazaarActivityConsumablesListings = (): AppThunk => (dispatch, getState) => {
  dispatch(loadActivityConsumablesListings());

  const activityConsumablesListingsGraphQueryParams: GraphQueryParams =
    getState().baazaar.activity.consumables.activityConsumablesListingsGraphQueryParams;
  const filters: ActivityConsumableListingFilters =
    getState().baazaar.activity.consumables.activityConsumablesListingsFilters;

  let whereParams: string = '';
  Object.entries(filters).forEach(([_, filter]: [_: string, filter: ActivityConsumableListingFiltersType]) => {
    if (filter.isFilterActive) {
      whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
    }
  });

  const query = getBaazaarErc1155PurchasesQuery(activityConsumablesListingsGraphQueryParams, whereParams);

  BaazaarGraphApi.getErc1155Purchases<ActivityConsumableListingDTO>(query)
    .then((consumablesListings: ActivityConsumableListingDTO[]) => {
      const modifiedListings: ActivityConsumableListingVM[] = mapActivityConsumablesDTOToVM(consumablesListings);

      dispatch(loadActivityConsumablesListingsSucceded(modifiedListings));
    })
    .catch(() => {
      dispatch(loadActivityConsumablesListingsFailed());
    })
    .finally(() => {
      dispatch(setIsActivityConsumablesListingsInitialDataLoading(false));
    });
};

export const onLoadBaazaarActivityConsumablesListings = (): AppThunk => (dispatch, getState) => {
  const isFiltersUpdated: boolean = getState().baazaar.activity.consumables.activityConsumablesListingsIsFiltersUpdated;

  if (isFiltersUpdated) {
    dispatch(loadBaazaarActivityConsumablesListings());
  }
};

export const updateActivityConsumablesListingsFilterByKey =
  ({ key, value }: { key: ActivityConsumableListingFilterTypes; value: GraphFiltersValueTypes }): AppThunk =>
  (dispatch, getState) => {
    const filters: ActivityConsumableListingFilters =
      getState().baazaar.activity.consumables.activityConsumablesListingsFilters;

    const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

    dispatch(
      setActivityConsumablesListingsFilters({
        ...filters,
        [key]: updatedFilter as ActivityConsumableListingFiltersType
      })
    );
  };

export const resetActivityConsumablesListingsFilters = (): AppThunk => (dispatch, getState) => {
  const filters: ActivityConsumableListingFilters =
    getState().baazaar.activity.consumables.activityConsumablesListingsFilters;

  const updatedFilters: ActivityConsumableListingFilters = Object.fromEntries(
    Object.entries(filters).map(([_, filter]: [_: string, filter: ActivityConsumableListingFiltersType]) => [
      [filter.key],
      GraphFiltersUtils.getResetedFilterByType(filter)
    ])
  );

  dispatch(setActivityConsumablesListingsFilters(updatedFilters));
};

export const resetActivityConsumablesData = (): AppThunk => (dispatch, getState) => {
  const filters: ActivityConsumableListingFilters =
    getState().baazaar.activity.consumables.activityConsumablesListingsFilters;

  const updatedFilters: ActivityConsumableListingFilters = Object.fromEntries(
    Object.entries(filters).map(([_, filter]: [_: string, filter: ActivityConsumableListingFiltersType]) => [
      [filter.key],
      GraphFiltersUtils.getResetedFilterByType(filter)
    ])
  );

  dispatch(setActivityConsumablesListingsFilters(updatedFilters));
  dispatch(resetActivityConsumablesListings());
  dispatch(setActivityConsumablesListingsIsFiltersUpdated(false));
  dispatch(setIsActivityConsumablesListingsInitialDataLoading(true));
};

const mapActivityConsumablesDTOToVM = (listings: ActivityConsumableListingDTO[]): ActivityConsumableListingVM[] => {
  return listings.map((listing: ActivityConsumableListingDTO) => {
    return {
      ...listing,
      id: Number(listing.listingID),
      erc1155TypeId: Number(listing.erc1155TypeId),
      quantity: Number(listing.quantity),
      timeLastPurchased: Number(listing.timeLastPurchased),
      name: ItemUtils.getNameById(listing.erc1155TypeId),
      rarity: ItemUtils.getItemRarityName(listing.rarityLevel),
      currentListing: {
        id: Number(listing.listingID),
        price: EthersApi.fromWei(listing.priceInWei)
      },
      lastSoldListing: {
        id: Number(listing.listingID),
        price: EthersApi.fromWei(listing.priceInWei),
        soldDate: new Date(Number(listing.timeLastPurchased) * 1000).toJSON()
      }
    };
  });
};
