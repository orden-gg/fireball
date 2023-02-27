import { AppThunk } from 'core/store/store';
import { Erc1155Categories } from 'shared/constants';
import {
  Erc1155ListingsBatch,
  GraphFiltersTypes,
  GraphFiltersValueTypes,
  GraphQueryParams,
  SortingItem
} from 'shared/models';
import { EthersApi, TheGraphApi } from 'api';
import { GraphFiltersUtils, InstallationsUtils } from 'utils';

import { ASCENDING_DIRECTION, InstallationListingFilterTypes, PRICE_IN_WEI } from '../../constants';
import {
  InstallationListingDTO,
  InstallationListingFilters,
  InstallationListingFiltersType,
  InstallationListingVM
} from '../../models';
import { getBaazaarErc1155ListingsQuery } from '../../queries';
import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import {
  loadInstallationsListings,
  loadInstallationsListingsSucceded,
  loadInstallationsListingsFailed,
  setInstallationsListingsFilters,
  setInstallationsListingsIsFiltersUpdated,
  setInstallationsListingsIsSortingUpdated,
  setInstallationsListingsSkipLimit,
  setInstallationsListingsSorting,
  setInstallationsListingsPreviousSortingProp,
  setIsInstallationsListingsInitialDataLoading,
  resetInstallationsListings
} from '../slices';

export const loadBaazaarInstallationsListings =
  (shouldResetListings: boolean = false): AppThunk =>
  (dispatch, getState) => {
    dispatch(loadInstallationsListings());

    const installationsListingsGraphQueryParams: GraphQueryParams =
      getState().baazaar.installations.installationsListingsGraphQueryParams;
    const currentInstallationsListings: InstallationListingVM[] =
      getState().baazaar.installations.installationsListings.data;
    const filters: InstallationListingFilters = getState().baazaar.installations.installationsListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: InstallationListingFiltersType]) => {
      if (filter.isFilterActive) {
        whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
      }
    });

    const query = getBaazaarErc1155ListingsQuery(installationsListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getErc1155Listings<InstallationListingDTO>(query)
      .then((installationsListings: InstallationListingDTO[]) => {
        const installationsIds: number[] = installationsListings.map((listing: InstallationListingDTO) =>
          Number(listing.erc1155TypeId)
        );

        if (installationsIds.length > 0) {
          TheGraphApi.getErc1155ListingsBatchQuery(
            installationsIds,
            Erc1155Categories.Installation,
            true,
            'timeLastPurchased',
            'desc'
          )
            .then((lastSoldListings: Erc1155ListingsBatch) => {
              const modifiedListings: InstallationListingVM[] = mapInstallationsListingsDTOToVM(
                installationsListings,
                lastSoldListings
              );

              if (shouldResetListings) {
                dispatch(loadInstallationsListingsSucceded(modifiedListings));
              } else {
                dispatch(loadInstallationsListingsSucceded(currentInstallationsListings.concat(modifiedListings)));
              }
            })
            .finally(() => {
              dispatch(setIsInstallationsListingsInitialDataLoading(false));
            });
        } else {
          if (shouldResetListings) {
            dispatch(loadInstallationsListingsSucceded([]));
          }

          dispatch(setIsInstallationsListingsInitialDataLoading(false));
        }
      })
      .catch(() => {
        dispatch(loadInstallationsListingsFailed());
      });
  };

export const onLoadBaazaarInstallationsListings = (): AppThunk => (dispatch, getState) => {
  const isFiltersUpdated: boolean = getState().baazaar.installations.installationsListingsIsFiltersUpdated;
  const isSortingUpdated: boolean = getState().baazaar.installations.installationsListingsIsSortingUpdated;

  if (isFiltersUpdated && isSortingUpdated) {
    dispatch(setInstallationsListingsSkipLimit(0));
    dispatch(loadBaazaarInstallationsListings(true));
  }
};

export const onSetInstallationsListingsSorting =
  (sort: SortingItem): AppThunk =>
  (dispatch, getState) => {
    let direction: string = sort.dir;
    const previousSortingProp: string = getState().baazaar.installations.installationsListingsPreviousSortingProp;

    if (sort.type === PRICE_IN_WEI && previousSortingProp && previousSortingProp !== PRICE_IN_WEI) {
      direction = ASCENDING_DIRECTION;
    }

    dispatch(setInstallationsListingsSorting({ type: sort.type, dir: direction }));
    dispatch(setInstallationsListingsPreviousSortingProp(sort.type));
  };

export const updateInstallationsListingsFilterByKey =
  ({ key, value }: { key: InstallationListingFilterTypes; value: GraphFiltersValueTypes }): AppThunk =>
  (dispatch, getState) => {
    const filters: InstallationListingFilters = getState().baazaar.installations.installationsListingsFilters;

    const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

    dispatch(setInstallationsListingsFilters({ ...filters, [key]: updatedFilter as InstallationListingFiltersType }));
  };

export const resetInstallationsListingsFilters = (): AppThunk => (dispatch, getState) => {
  const filters: InstallationListingFilters = getState().baazaar.installations.installationsListingsFilters;

  const updatedFilters: InstallationListingFilters = Object.fromEntries(
    Object.entries(filters).map(([_, filter]: [_: string, filter: InstallationListingFiltersType]) => [
      [filter.key],
      GraphFiltersUtils.getResetedFilterByType(filter)
    ])
  );

  dispatch(setInstallationsListingsFilters(updatedFilters));
};

export const resetInstallationsListingsData = (): AppThunk => (dispatch, getState) => {
  const filters: InstallationListingFilters = getState().baazaar.installations.installationsListingsFilters;
  const defaultSorting: SortingItem = getState().baazaar.installations.installationsListingsDefaultSorting;

  const updatedFilters: InstallationListingFilters = Object.fromEntries(
    Object.entries(filters).map(([_, filter]: [_: string, filter: InstallationListingFiltersType]) => [
      [filter.key],
      GraphFiltersUtils.getResetedFilterByType(filter)
    ])
  );

  dispatch(setInstallationsListingsFilters(updatedFilters));
  dispatch(setInstallationsListingsSorting(defaultSorting));
  dispatch(setInstallationsListingsSkipLimit(0));
  dispatch(resetInstallationsListings());
  dispatch(setInstallationsListingsIsSortingUpdated(false));
  dispatch(setInstallationsListingsIsFiltersUpdated(false));
  dispatch(setIsInstallationsListingsInitialDataLoading(true));
};

const mapInstallationsListingsDTOToVM = (
  listings: InstallationListingDTO[],
  lastSoldListings: Erc1155ListingsBatch
): InstallationListingVM[] => {
  return listings.map((listing: InstallationListingDTO) => {
    const lastSoldListing = lastSoldListings[`item${listing.erc1155TypeId}`];

    return {
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
        soldDate: lastSoldListing[0]?.timeLastPurchased
          ? new Date(Number(lastSoldListing[0].timeLastPurchased) * 1000).toJSON()
          : null
      }
    };
  });
};
