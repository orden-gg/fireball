import { BaazaarGraphApi } from '../../api/baazaar-graph.api';

import { AppThunk } from 'core/store/store';

import { GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams } from 'shared/models';

import { GraphFiltersUtils } from 'utils';

import { ActivityGotchiListingFilterTypes } from '../../constants';
import {
  ActivityGotchiListingDTO,
  ActivityGotchiListingFilters,
  ActivityGotchiListingFiltersType,
  ActivityGotchiListingVM
} from '../../models';
import { getBaazaarActivityGotchisListingsQuery } from '../../queries';
import {
  loadActivityGotchisListings,
  loadActivityGotchisListingsFailed,
  loadActivityGotchisListingsSucceded,
  resetActivityGotchisListings,
  setActivityGotchisListingsFilters,
  setActivityGotchisListingsIsFiltersUpdated,
  setIsActivityGotchisListingsInitialDataLoading
} from '../slices';

export const loadBaazaarActivityGotchisListings =
  (shouldResetListings: boolean = false): AppThunk =>
  (dispatch, getState) => {
    dispatch(loadActivityGotchisListings());

    const activityGotchisListingsGraphQueryParams: GraphQueryParams =
      getState().baazaar.activity.gotchis.activityGotchisListingsGraphQueryParams;
    const activityGotchisListings: ActivityGotchiListingVM[] =
      getState().baazaar.activity.gotchis.activityGotchisListings.data;
    const filters: ActivityGotchiListingFilters = getState().baazaar.activity.gotchis.activityGotchisListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: ActivityGotchiListingFiltersType]) => {
      if (filter.isFilterActive) {
        whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
      }
    });

    const query = getBaazaarActivityGotchisListingsQuery(activityGotchisListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getErc721Listings<ActivityGotchiListingDTO>(query)
      .then((res: ActivityGotchiListingDTO[]) => {
        const modifiedListings: ActivityGotchiListingVM[] = mapActivityGotchisDTOToVM(res);

        if (shouldResetListings) {
          dispatch(loadActivityGotchisListingsSucceded(modifiedListings));
        } else {
          dispatch(loadActivityGotchisListingsSucceded(activityGotchisListings.concat(modifiedListings)));
        }
      })
      .catch(() => {
        dispatch(loadActivityGotchisListingsFailed());
      })
      .finally(() => {
        dispatch(setIsActivityGotchisListingsInitialDataLoading(false));
      });
  };

export const onLoadBaazaarActivityGotchisListings = (): AppThunk => (dispatch, getState) => {
  const isFiltersUpdated: boolean = getState().baazaar.activity.gotchis.activityGotchisListingsIsFiltersUpdated;

  if (isFiltersUpdated) {
    dispatch(loadBaazaarActivityGotchisListings(true));
  }
};

export const updateActivityGotchisListingsFilterByKey =
  ({ key, value }: { key: ActivityGotchiListingFilterTypes; value: GraphFiltersValueTypes }): AppThunk =>
  (dispatch, getState) => {
    const filters: ActivityGotchiListingFilters = getState().baazaar.activity.gotchis.activityGotchisListingsFilters;

    const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

    dispatch(
      setActivityGotchisListingsFilters({ ...filters, [key]: updatedFilter as ActivityGotchiListingFiltersType })
    );
  };

export const resetActivityGotchisListingsFilters = (): AppThunk => (dispatch, getState) => {
  const filters: ActivityGotchiListingFilters = getState().baazaar.activity.gotchis.activityGotchisListingsFilters;

  const updatedFilters: ActivityGotchiListingFilters = Object.fromEntries(
    Object.entries(filters).map(([_, filter]: [_: string, filter: ActivityGotchiListingFiltersType]) => [
      [filter.key],
      GraphFiltersUtils.getResetedFilterByType(filter)
    ])
  );

  dispatch(setActivityGotchisListingsFilters(updatedFilters));
};

export const resetActivityGotchisData = (): AppThunk => (dispatch, getState) => {
  const filters: ActivityGotchiListingFilters = getState().baazaar.activity.gotchis.activityGotchisListingsFilters;

  const updatedFilters: ActivityGotchiListingFilters = Object.fromEntries(
    Object.entries(filters).map(([_, filter]: [_: string, filter: ActivityGotchiListingFiltersType]) => [
      [filter.key],
      GraphFiltersUtils.getResetedFilterByType(filter)
    ])
  );

  dispatch(setActivityGotchisListingsFilters(updatedFilters));
  dispatch(resetActivityGotchisListings());
  dispatch(setActivityGotchisListingsIsFiltersUpdated(false));
  dispatch(setIsActivityGotchisListingsInitialDataLoading(true));
};

const mapActivityGotchisDTOToVM = (listings: ActivityGotchiListingDTO[]): ActivityGotchiListingVM[] => {
  return listings.map((listing: ActivityGotchiListingDTO) => ({
    ...listing,
    hauntId: Number(listing.hauntId),
    id: Number(listing.id),
    timePurchased: Number(listing.timePurchased),
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
      equippedWearables: listing.equippedWearables,
      numericTraits: [
        Number(listing.nrgTrait),
        Number(listing.aggTrait),
        Number(listing.spkTrait),
        Number(listing.brnTrait),
        Number(listing.eysTrait),
        Number(listing.eycTrait)
      ],
      possibleSets: Number(listing.gotchi.possibleSets),
      toNextLevel: Number(listing.gotchi.toNextLevel),
      usedSkillPoints: Number(listing.gotchi.usedSkillPoints),
      withSetsRarityScore: Number(listing.gotchi.withSetsRarityScore),
      listings: [
        {
          id: Number(listing.id),
          priceInWei: listing.priceInWei
        }
      ],
      buyer: listing.buyer,
      seller: listing.seller,
      timePurchased: Number(listing.timePurchased)
    }
  }));
};
