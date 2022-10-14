import { AppThunk } from 'core/store/store';
import { GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { GotchiListingDTO, GotchiListingVM, GotchiListingsFilters, GotchiListingFiltersType } from 'pages/Baazaar/models';
import { getBaazaarGotchiListingsQuery } from 'pages/Baazaar/queries';
import { GraphFiltersUtils } from 'utils';

import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import {
    setGotchisListings,
    setGotchisListingsFilters,
    setGotchisListingsSorting,
    setGotchisListingsSkipLimit
} from '../slices';
import { GotchiListingsFilterTypes } from 'pages/Baazaar/constants';

export const loadBaazaarGotchiListings = (): AppThunk => async (dispatch, getState) => {
    const gotchisListingsGraphQueryParams: GraphQueryParams = getState().baazaar.gotchis.gotchisListingsGraphQueryParams;
    const currentGotchiListings: GotchiListingVM[] = getState().baazaar.gotchis.gotchisListings;
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

            dispatch(setGotchisListings(currentGotchiListings.concat(modifiedListings)));
        });
};

export const updateGotchiListingsSorting = (sortings: SortingItem): AppThunk => async (dispatch) => {
    dispatch(setGotchisListingsSorting(sortings));
    dispatch(setGotchisListingsSkipLimit(0));
    dispatch(setGotchisListings([]));
    dispatch(loadBaazaarGotchiListings());
};

export const updateGotchiListingsFilterByKey =
    ({ key, value }: { key: GotchiListingsFilterTypes, value: GraphFiltersValueTypes }): AppThunk =>
        async (dispatch, getState) => {
            const filters: GotchiListingsFilters = getState().baazaar.gotchis.gotchisListingsFilters;

            const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

            dispatch(setGotchisListingsFilters({ ...filters, [key]: updatedFilter }));
            dispatch(setGotchisListingsSkipLimit(0));
            dispatch(setGotchisListings([]));
            dispatch(loadBaazaarGotchiListings());
        };

export const resetGotchiListingsFilters = (): AppThunk =>
    async (dispatch, getState) => {
        const filters: GotchiListingsFilters = getState().baazaar.gotchis.gotchisListingsFilters;

        const updatedFilters: GotchiListingsFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: GotchiListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setGotchisListingsFilters(updatedFilters));
        dispatch(setGotchisListingsSkipLimit(0));
        dispatch(setGotchisListings([]));
        dispatch(loadBaazaarGotchiListings());
    };

export const resetGotchiListingsData = (): AppThunk =>
    async (dispatch, getState) => {
        const filters: GotchiListingsFilters = getState().baazaar.gotchis.gotchisListingsFilters;

        const updatedFilters: GotchiListingsFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: GotchiListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setGotchisListingsFilters(updatedFilters));
        dispatch(setGotchisListingsSkipLimit(0));
        dispatch(setGotchisListings([]));
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
