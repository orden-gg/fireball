import { AppThunk } from 'core/store/store';
import { GraphFiltersValueTypes, SortingItem } from 'shared/models';
import { BaazaarGotchiListingDTO, BaazaarGotchiListingVM, GotchiListingsFilters, GotchiListingsFilterType } from 'pages/Baazaar/models';
import { getBaazaarGotchiListingsQuery } from 'pages/Baazaar/queries';
import { GraphFiltersUtils } from 'utils';

import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import {
    GraphQueryParams,
    setBaazaarGotchiListings,
    setGotchiListingsFilters,
    setGotchiListingsFilterValueByKey,
    setGotchiListingsSorting,
    setSkipLimit
} from '../slices';
import { GotchiListingsFilterTypes } from 'pages/Baazaar/constants';

export const loadBaazaarGotchiListings = (): AppThunk => async (dispatch, getState) => {
    const gotchiListingsGraphQueryParams: GraphQueryParams = getState().baazaar.gotchiListingsGraphQueryParams;
    const currentGotchiListings: BaazaarGotchiListingVM[] = getState().baazaar.baazaarGotchiListings;
    const filters: GotchiListingsFilters = getState().baazaar.gotchiListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: GotchiListingsFilterType]) => {
        if (filter.isFilterActive) {
            filter.graphComparatorOptions.forEach(option => {
                let value = option.valueIndex !== undefined ? filter.value[option.valueIndex] : filter.value;
                value = filter.helperType ? GraphFiltersUtils.onHandleFilterHelper(filter.helperType, value) : value;

                whereParams += `\n ${option.key}: ${value}`;
            });
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
    dispatch(setSkipLimit(0));
    dispatch(setBaazaarGotchiListings([]));
    dispatch(loadBaazaarGotchiListings());
};

export const updateGotchiListingsFilterByKey =
    ({ key, value }: { key: GotchiListingsFilterTypes, value: GraphFiltersValueTypes }): AppThunk =>
        async (dispatch, getState) => {
            const filters: GotchiListingsFilters = getState().baazaar.gotchiListingsFilters;

            const updatedFilter = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

            dispatch(setGotchiListingsFilterValueByKey({ key, value: updatedFilter.value, isFilterActive: updatedFilter.isFilterActive }));
            dispatch(setSkipLimit(0));
            dispatch(setBaazaarGotchiListings([]));
            dispatch(loadBaazaarGotchiListings());
        };

export const resetGotchiListingsFilters = (): AppThunk =>
    async (dispatch, getState) => {
        const filters: GotchiListingsFilters = getState().baazaar.gotchiListingsFilters;

        const updatedFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: GotchiListingsFilterType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setGotchiListingsFilters(updatedFilters));
        dispatch(setSkipLimit(0));
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
            timesTraded: Number(listing.gotchi.timesTraded),
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
