import { AppThunk } from 'core/store/store';
import { GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { BaazaarGotchiListingDTO, BaazaarGotchiListingVM, GotchiListingsFilters, GotchiListingFiltersType } from 'pages/Baazaar/models';
import { getBaazaarGotchiListingsQuery } from 'pages/Baazaar/queries';
import { GraphFiltersUtils } from 'utils';

import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import {
    setBaazaarGotchiListings,
    setGotchiListingsFilters,
    setGotchiListingsSorting,
    setGotchiListingsSkipLimit
} from '../slices';
import { GotchiListingsFilterTypes } from 'pages/Baazaar/constants';

export const loadBaazaarGotchiListings = (): AppThunk => async (dispatch, getState) => {
    const gotchiListingsGraphQueryParams: GraphQueryParams = getState().baazaar.baazaar.gotchiListingsGraphQueryParams;
    const currentGotchiListings: BaazaarGotchiListingVM[] = getState().baazaar.baazaar.baazaarGotchiListings;
    const filters: GotchiListingsFilters = getState().baazaar.baazaar.gotchiListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: GotchiListingFiltersType]) => {
        if (filter.isFilterActive) {
            whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
        }
    });

    const query = getBaazaarGotchiListingsQuery(gotchiListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getBaazaarGotchis(query)
        .then((res: BaazaarGotchiListingDTO[]) => {
            const modifiedListings: BaazaarGotchiListingVM[] = mapGotchisDTOToVM(res);

            dispatch(setBaazaarGotchiListings(currentGotchiListings.concat(modifiedListings)));
        });
};

export const updateGotchiListingsSorting = (sortings: SortingItem): AppThunk => async (dispatch) => {
    dispatch(setGotchiListingsSorting(sortings));
    dispatch(setGotchiListingsSkipLimit(0));
    dispatch(setBaazaarGotchiListings([]));
    dispatch(loadBaazaarGotchiListings());
};

export const updateGotchiListingsFilterByKey =
    ({ key, value }: { key: GotchiListingsFilterTypes, value: GraphFiltersValueTypes }): AppThunk =>
        async (dispatch, getState) => {
            const filters: GotchiListingsFilters = getState().baazaar.baazaar.gotchiListingsFilters;

            const updatedFilter = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

            dispatch(setGotchiListingsFilters({ ...filters, [key]: updatedFilter }));
            dispatch(setGotchiListingsSkipLimit(0));
            dispatch(setBaazaarGotchiListings([]));
            dispatch(loadBaazaarGotchiListings());
        };

export const resetGotchiListingsFilters = (): AppThunk =>
    async (dispatch, getState) => {
        const filters: GotchiListingsFilters = getState().baazaar.baazaar.gotchiListingsFilters;

        const updatedFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: GotchiListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setGotchiListingsFilters(updatedFilters));
        dispatch(setGotchiListingsSkipLimit(0));
        dispatch(setBaazaarGotchiListings([]));
        dispatch(loadBaazaarGotchiListings());
    };

const mapGotchisDTOToVM = (listings: BaazaarGotchiListingDTO[]): BaazaarGotchiListingVM[] => {
    return listings.map((listing: BaazaarGotchiListingDTO) => ({
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
