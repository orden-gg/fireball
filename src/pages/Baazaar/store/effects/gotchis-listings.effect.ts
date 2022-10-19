import { AppThunk } from 'core/store/store';
import { GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { GotchiListingDTO, GotchiListingVM, GotchiListingsFilters, GotchiListingFiltersType } from 'pages/Baazaar/models';
import { getBaazaarGotchiListingsQuery } from 'pages/Baazaar/queries';
import { GraphFiltersUtils } from 'utils';

import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import {
    loadGotchisListings,
    loadGotchisListingsSucceded,
    loadGotchisListingsFailed,
    setGotchisListingsFilters,
    setGotchisListingsSorting,
    setGotchisListingsSkipLimit,
    setGotchisListingsIsSortingUpdated,
    setGotchisListingsIsFiltersUpdated,
    setIsGotchisListingsInitialDataLoading,
    resetGotchisListings
} from '../slices';
import { GotchiListingsFilterTypes } from 'pages/Baazaar/constants';

export const loadBaazaarGotchisListings = (shouldResetListings: boolean = false): AppThunk => (dispatch, getState) => {
    dispatch(loadGotchisListings());

    const gotchisListingsGraphQueryParams: GraphQueryParams = getState().baazaar.gotchis.gotchisListingsGraphQueryParams;
    const currentGotchiListings: GotchiListingVM[] = getState().baazaar.gotchis.gotchisListings.data;
    const filters: GotchiListingsFilters = getState().baazaar.gotchis.gotchisListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: GotchiListingFiltersType]) => {
        if (filter.isFilterActive) {
            whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
        }
    });

    const query = getBaazaarGotchiListingsQuery(gotchisListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getBaazaarGotchis(query)
        .then((res: GotchiListingDTO[]) => {
            const modifiedListings: GotchiListingVM[] = mapGotchisDTOToVM(res);

            if (shouldResetListings) {
                dispatch(loadGotchisListingsSucceded(modifiedListings));
            } else {
                dispatch(loadGotchisListingsSucceded(currentGotchiListings.concat(modifiedListings)));
            }

        })
        .catch(() => {
            dispatch(loadGotchisListingsFailed());
        })
        .finally(() => {
            dispatch(setIsGotchisListingsInitialDataLoading(false));
        });
};

export const onLoadBaazaarGotchisListings = (): AppThunk => (dispatch, getState) => {
    const isFiltersUpdated: boolean = getState().baazaar.gotchis.gotchisListingsIsFiltersUpdated;
    const isSortingUpdated: boolean = getState().baazaar.gotchis.gotchisListingsIsSortingUpdated;

    if (isFiltersUpdated && isSortingUpdated) {
        dispatch(setGotchisListingsSkipLimit(0));
        dispatch(loadBaazaarGotchisListings(true));
    }
};

export const updateGotchiListingsFilterByKey =
    ({ key, value }: { key: GotchiListingsFilterTypes, value: GraphFiltersValueTypes }): AppThunk =>
        (dispatch, getState) => {
            const filters: GotchiListingsFilters = getState().baazaar.gotchis.gotchisListingsFilters;

            const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

            dispatch(setGotchisListingsFilters({ ...filters, [key]: updatedFilter }));
        };

export const resetGotchiListingsFilters = (): AppThunk =>
    (dispatch, getState) => {
        const filters: GotchiListingsFilters = getState().baazaar.gotchis.gotchisListingsFilters;

        const updatedFilters: GotchiListingsFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: GotchiListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setGotchisListingsFilters(updatedFilters));
    };

export const resetGotchiListingsData = (): AppThunk =>
    (dispatch, getState) => {
        const filters: GotchiListingsFilters = getState().baazaar.gotchis.gotchisListingsFilters;
        const defaultSorting: SortingItem = getState().baazaar.gotchis.gotchisListingsDefaultSorting;

        const updatedFilters: GotchiListingsFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: GotchiListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setGotchisListingsFilters(updatedFilters));
        dispatch(setGotchisListingsSorting(defaultSorting));
        dispatch(setGotchisListingsSkipLimit(0));
        dispatch(resetGotchisListings());
        dispatch(setGotchisListingsIsSortingUpdated(false));
        dispatch(setGotchisListingsIsFiltersUpdated(false));
        dispatch(setIsGotchisListingsInitialDataLoading(true));
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
            listings: [{
                id: Number(listing.id),
                priceInWei: listing.priceInWei
            }]
        }
    }));
};
