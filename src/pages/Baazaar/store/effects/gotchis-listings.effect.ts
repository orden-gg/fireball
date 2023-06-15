import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import { TheGraphApi } from 'api';

import { AppThunk } from 'core/store/store';

import {
  FireballGotchi,
  GraphFiltersTypes,
  GraphFiltersValueTypes,
  GraphQueryParams,
  SortingItem,
  TheGraphBatchData
} from 'shared/models';

import {
  GotchiListingDTO,
  GotchiListingFiltersType,
  GotchiListingVM,
  GotchiListingsFilters
} from 'pages/Baazaar/models';
import { getBaazaarGotchiListingsQuery } from 'pages/Baazaar/queries';

import { GraphFiltersUtils } from 'utils';

import { ASCENDING_DIRECTION, GotchiListingsFilterTypes, PRICE_IN_WEI } from '../../constants';
// slices
import * as gotchisListingsSlices from '../slices/gotchis-listings.slice';

export const loadBaazaarGotchisListings =
  (shouldResetListings: boolean = false): AppThunk =>
  (dispatch, getState) => {
    dispatch(gotchisListingsSlices.loadGotchisListings());

    const gotchisListingsGraphQueryParams: GraphQueryParams =
      getState().baazaar.gotchis.gotchisListingsGraphQueryParams;
    const currentGotchiListings: GotchiListingVM[] = getState().baazaar.gotchis.gotchisListings.data;
    const filters: GotchiListingsFilters = getState().baazaar.gotchis.gotchisListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: GotchiListingFiltersType]) => {
      if (filter.isFilterActive) {
        whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
      }
    });

    const query = getBaazaarGotchiListingsQuery(gotchisListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getErc721Listings<GotchiListingDTO>(query)
      .then((res: GotchiListingDTO[]) => {
        const modifiedListings: GotchiListingVM[] = mapGotchisDTOToVM(res);

        const gotchiIds: number[] = modifiedListings.map((listing: GotchiListingVM) => Number(listing.gotchi.id));

        if (gotchiIds.length > 0) {
          TheGraphApi.getFireballGotchisByIds(gotchiIds)
            .then((fireballGotchis: TheGraphBatchData<FireballGotchi>) => {
              const extendedLendingGotchis: GotchiListingVM[] = modifiedListings.map((listing: GotchiListingVM) => {
                listing.gotchi = { ...listing.gotchi, ...fireballGotchis[`gotchi${listing.gotchi.id}`] };

                return listing;
              });

              if (shouldResetListings) {
                dispatch(gotchisListingsSlices.loadGotchisListingsSucceded(extendedLendingGotchis));
              } else {
                dispatch(
                  gotchisListingsSlices.loadGotchisListingsSucceded(
                    currentGotchiListings.concat(extendedLendingGotchis)
                  )
                );
              }
            })
            .catch(() => {
              if (shouldResetListings) {
                dispatch(gotchisListingsSlices.loadGotchisListingsSucceded(modifiedListings));
              } else {
                dispatch(
                  gotchisListingsSlices.loadGotchisListingsSucceded(currentGotchiListings.concat(modifiedListings))
                );
              }
            })
            .finally(() => dispatch(gotchisListingsSlices.setIsGotchisListingsInitialDataLoading(false)));
        } else {
          if (shouldResetListings) {
            dispatch(gotchisListingsSlices.loadGotchisListingsSucceded(modifiedListings));
          } else {
            dispatch(gotchisListingsSlices.loadGotchisListingsSucceded(currentGotchiListings.concat(modifiedListings)));
          }
        }
      })
      .catch(() => {
        dispatch(gotchisListingsSlices.loadGotchisListingsFailed());
        dispatch(gotchisListingsSlices.setIsGotchisListingsInitialDataLoading(false));
      });
  };

export const onLoadBaazaarGotchisListings = (): AppThunk => (dispatch, getState) => {
  const isFiltersUpdated: boolean = getState().baazaar.gotchis.gotchisListingsIsFiltersUpdated;
  const isSortingUpdated: boolean = getState().baazaar.gotchis.gotchisListingsIsSortingUpdated;

  if (isFiltersUpdated && isSortingUpdated) {
    dispatch(gotchisListingsSlices.setGotchisListingsSkipLimit(0));
    dispatch(loadBaazaarGotchisListings(true));
  }
};

export const onSetGotchisListingsSorting =
  (sort: SortingItem): AppThunk =>
  (dispatch, getState) => {
    let direction: string = sort.dir;
    const previousSortingProp: string = getState().baazaar.gotchis.gotchisListingsPreviousSortingProp;

    if (sort.type === PRICE_IN_WEI && previousSortingProp && previousSortingProp !== PRICE_IN_WEI) {
      direction = ASCENDING_DIRECTION;
    }

    dispatch(gotchisListingsSlices.setGotchisListingsSorting({ type: sort.type, dir: direction }));
    dispatch(gotchisListingsSlices.setGotchisListingsPreviousSortingProp(sort.type));
  };

export const updateGotchiListingsFilterByKey =
  ({ key, value }: { key: GotchiListingsFilterTypes; value: GraphFiltersValueTypes }): AppThunk =>
  (dispatch, getState) => {
    const filters: GotchiListingsFilters = getState().baazaar.gotchis.gotchisListingsFilters;

    const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

    dispatch(gotchisListingsSlices.setGotchisListingsFilters({ ...filters, [key]: updatedFilter }));
  };

export const resetGotchiListingsFilters = (): AppThunk => (dispatch, getState) => {
  const filters: GotchiListingsFilters = getState().baazaar.gotchis.gotchisListingsFilters;

  const updatedFilters: GotchiListingsFilters = Object.fromEntries(
    Object.entries(filters).map(([_, filter]: [_: string, filter: GotchiListingFiltersType]) => [
      [filter.key],
      GraphFiltersUtils.getResetedFilterByType(filter)
    ])
  );

  dispatch(gotchisListingsSlices.setGotchisListingsFilters(updatedFilters));
};

export const resetGotchiListingsData = (): AppThunk => (dispatch, getState) => {
  const filters: GotchiListingsFilters = getState().baazaar.gotchis.gotchisListingsFilters;
  const defaultSorting: SortingItem = getState().baazaar.gotchis.gotchisListingsDefaultSorting;

  const updatedFilters: GotchiListingsFilters = Object.fromEntries(
    Object.entries(filters).map(([_, filter]: [_: string, filter: GotchiListingFiltersType]) => [
      [filter.key],
      GraphFiltersUtils.getResetedFilterByType(filter)
    ])
  );

  dispatch(gotchisListingsSlices.setGotchisListingsFilters(updatedFilters));
  dispatch(gotchisListingsSlices.setGotchisListingsSorting(defaultSorting));
  dispatch(gotchisListingsSlices.setGotchisListingsSkipLimit(0));
  dispatch(gotchisListingsSlices.resetGotchisListings());
  dispatch(gotchisListingsSlices.setGotchisListingsIsSortingUpdated(false));
  dispatch(gotchisListingsSlices.setGotchisListingsIsFiltersUpdated(false));
  dispatch(gotchisListingsSlices.setIsGotchisListingsInitialDataLoading(true));
};

const mapGotchisDTOToVM = (listings: GotchiListingDTO[]): GotchiListingVM[] => {
  return listings.map((listing: GotchiListingDTO) => ({
    ...listing,
    hauntId: Number(listing.hauntId),
    id: Number(listing.id),
    timeCreated: Number(listing.timeCreated),
    tokenId: Number(listing.tokenId),
    gotchi: {
      ...listing.gotchi,
      baseRarityScore: Number(listing.gotchi.baseRarityScore),
      equippedSetID: Number(listing.gotchi.equippedSetID),
      experience: Number(listing.gotchi.experience),
      hauntId: Number(listing.gotchi.hauntId),
      id: Number(listing.gotchi.id),
      kinship: Number(listing.gotchi.kinship),
      level: Number(listing.gotchi.level),
      modifiedRarityScore: Number(listing.gotchi.modifiedRarityScore),
      possibleSets: Number(listing.gotchi.possibleSets),
      toNextLevel: Number(listing.gotchi.toNextLevel),
      usedSkillPoints: Number(listing.gotchi.usedSkillPoints),
      withSetsRarityScore: Number(listing.gotchi.withSetsRarityScore),
      listings: [
        {
          id: Number(listing.id),
          priceInWei: listing.priceInWei
        }
      ]
    }
  }));
};
