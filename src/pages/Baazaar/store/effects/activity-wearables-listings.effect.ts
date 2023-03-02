import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import { EthersApi } from 'api';

import { AppThunk } from 'core/store/store';

import { GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams } from 'shared/models';

import { GraphFiltersUtils, ItemUtils } from 'utils';

import { ActivityWearableListingFilterTypes } from '../../constants';
import {
  ActivityWearableListingDTO,
  ActivityWearableListingFilters,
  ActivityWearableListingFiltersType,
  ActivityWearableListingVM
} from '../../models';
import { getBaazaarErc1155PurchasesQuery } from '../../queries';
import {
  loadActivityWearablesListings,
  loadActivityWearablesListingsFailed,
  loadActivityWearablesListingsSucceded,
  resetActivityWearablesListings,
  setActivityWearablesListingsFilters,
  setActivityWearablesListingsIsFiltersUpdated,
  setIsActivityWearablesListingsInitialDataLoading
} from '../slices';

export const loadBaazaarActivityWearablesListings = (): AppThunk => (dispatch, getState) => {
  dispatch(loadActivityWearablesListings());

  const activityWearablesListingsGraphQueryParams: GraphQueryParams =
    getState().baazaar.activity.wearables.activityWearablesListingsGraphQueryParams;
  const filters: ActivityWearableListingFilters =
    getState().baazaar.activity.wearables.activityWearablesListingsFilters;

  let whereParams: string = '';
  Object.entries(filters).forEach(([_, filter]: [_: string, filter: ActivityWearableListingFiltersType]) => {
    if (filter.isFilterActive) {
      whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
    }
  });

  const query = getBaazaarErc1155PurchasesQuery(activityWearablesListingsGraphQueryParams, whereParams);

  BaazaarGraphApi.getErc1155Purchases<ActivityWearableListingDTO>(query)
    .then((wearablesListings: ActivityWearableListingDTO[]) => {
      const modifiedListings: ActivityWearableListingVM[] = mapActivityWearablesDTOToVM(wearablesListings);

      dispatch(loadActivityWearablesListingsSucceded(modifiedListings));
    })
    .catch(() => {
      dispatch(loadActivityWearablesListingsFailed());
    })
    .finally(() => {
      dispatch(setIsActivityWearablesListingsInitialDataLoading(false));
    });
};

export const onLoadBaazaarActivityWearablesListings = (): AppThunk => (dispatch, getState) => {
  const isFiltersUpdated: boolean = getState().baazaar.activity.wearables.activityWearablesListingsIsFiltersUpdated;

  if (isFiltersUpdated) {
    dispatch(loadBaazaarActivityWearablesListings());
  }
};

export const updateActivityWearablesListingsFilterByKey =
  ({ key, value }: { key: ActivityWearableListingFilterTypes; value: GraphFiltersValueTypes }): AppThunk =>
  (dispatch, getState) => {
    const filters: ActivityWearableListingFilters =
      getState().baazaar.activity.wearables.activityWearablesListingsFilters;

    const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

    dispatch(
      setActivityWearablesListingsFilters({ ...filters, [key]: updatedFilter as ActivityWearableListingFiltersType })
    );
  };

export const resetActivityWearablesListingsFilters = (): AppThunk => (dispatch, getState) => {
  const filters: ActivityWearableListingFilters =
    getState().baazaar.activity.wearables.activityWearablesListingsFilters;

  const updatedFilters: ActivityWearableListingFilters = Object.fromEntries(
    Object.entries(filters).map(([_, filter]: [_: string, filter: ActivityWearableListingFiltersType]) => [
      [filter.key],
      GraphFiltersUtils.getResetedFilterByType(filter)
    ])
  );

  dispatch(setActivityWearablesListingsFilters(updatedFilters));
};

export const resetActivityWearablesData = (): AppThunk => (dispatch, getState) => {
  const filters: ActivityWearableListingFilters =
    getState().baazaar.activity.wearables.activityWearablesListingsFilters;

  const updatedFilters: ActivityWearableListingFilters = Object.fromEntries(
    Object.entries(filters).map(([_, filter]: [_: string, filter: ActivityWearableListingFiltersType]) => [
      [filter.key],
      GraphFiltersUtils.getResetedFilterByType(filter)
    ])
  );

  dispatch(setActivityWearablesListingsFilters(updatedFilters));
  dispatch(resetActivityWearablesListings());
  dispatch(setActivityWearablesListingsIsFiltersUpdated(false));
  dispatch(setIsActivityWearablesListingsInitialDataLoading(true));
};

const mapActivityWearablesDTOToVM = (listings: ActivityWearableListingDTO[]): ActivityWearableListingVM[] => {
  return listings.map((listing: ActivityWearableListingDTO) => {
    return {
      ...listing,
      id: Number(listing.listingID),
      erc1155TypeId: Number(listing.erc1155TypeId),
      quantity: Number(listing.quantity),
      timeLastPurchased: Number(listing.timeLastPurchased),
      name: ItemUtils.getNameById(listing.erc1155TypeId),
      rarity: ItemUtils.getRarityNameById(listing.erc1155TypeId),
      traitModifiers: ItemUtils.getTraitModifiersById(listing.erc1155TypeId),
      currentListing: {
        id: Number(listing.listingID),
        price: EthersApi.fromWei(listing.priceInWei)
      },
      lastSoldListing: {
        id: Number(listing.listingID),
        price: EthersApi.fromWei(listing.priceInWei),
        soldDate: new Date(Number(listing.timeLastPurchased) * 1000).toJSON()
      },
      benefit: {
        ...ItemUtils.getWearableBenefitsById(listing.erc1155TypeId)
      },
      itemType: ItemUtils.getWearableTypeById(listing.erc1155TypeId)
    };
  });
};
