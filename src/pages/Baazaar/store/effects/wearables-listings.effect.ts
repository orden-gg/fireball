import { AppThunk } from 'core/store/store';
import { Erc1155Categories } from 'shared/constants';
import { Erc1155ListingsBatch, GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { EthersApi, TheGraphApi } from 'api';
import { GraphFiltersUtils, ItemUtils } from 'utils';

import { WearableListingFilterTypes } from '../../constants';
import { WearableListingDTO, WearableListingFilters, WearableListingFiltersType, WearableListingVM } from '../../models';
import { getBaazaarWearablesListingsQuery } from '../../queries';
import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import {
    setWearablesListings,
    setWearablesListingsFilters,
    setWearablesListingsSkipLimit,
    setWearablesListingsSorting
} from '../slices';

export const loadBaazaarWearablesListings = (): AppThunk => async (dispatch, getState) => {
    const wearablesListingsGraphQueryParams: GraphQueryParams = getState().baazaar.wearables.wearablesListingsGraphQueryParams;
    const currentWearablesListings: WearableListingVM[] = getState().baazaar.wearables.wearablesListings;
    const filters: WearableListingFilters = getState().baazaar.wearables.wearablesListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: WearableListingFiltersType]) => {
        if (filter.isFilterActive) {
            whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
        }
    });

    const query = getBaazaarWearablesListingsQuery(wearablesListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getWearablesListings(query)
        .then((wearablesListings: WearableListingDTO[]) => {
            const wearablesIds: number[] = wearablesListings.map(a => Number(a.erc1155TypeId));

            TheGraphApi.getErc1155ListingsBatchQuery(wearablesIds, Erc1155Categories.Wearable, true, 'timeLastPurchased', 'desc')
               .then((lastSoldListings: Erc1155ListingsBatch) => {
                    const modifiedListings: WearableListingVM[] = mapWearablesListingsDTOToVM(wearablesListings, lastSoldListings);

                    dispatch(setWearablesListings(currentWearablesListings.concat(modifiedListings)));
                });
        });
};

export const updateWearablesListingsSorting = (sortings: SortingItem): AppThunk => async (dispatch) => {
    dispatch(setWearablesListingsSorting(sortings));
    dispatch(setWearablesListingsSkipLimit(0));
    dispatch(setWearablesListings([]));
    dispatch(loadBaazaarWearablesListings());
};

export const updateWearablesListingsFilterByKey =
    ({ key, value }: { key: WearableListingFilterTypes, value: GraphFiltersValueTypes }): AppThunk =>
        async (dispatch, getState) => {
            const filters: WearableListingFilters = getState().baazaar.wearables.wearablesListingsFilters;

            const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

            dispatch(setWearablesListingsFilters({ ...filters, [key]: updatedFilter }));
            dispatch(setWearablesListingsSkipLimit(0));
            dispatch(setWearablesListings([]));
            dispatch(loadBaazaarWearablesListings());
        };

export const resetWearablesListingsFilters = (): AppThunk =>
    async (dispatch, getState) => {
        const filters: WearableListingFilters = getState().baazaar.wearables.wearablesListingsFilters;

        const updatedFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: WearableListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setWearablesListingsFilters(updatedFilters));
        dispatch(setWearablesListingsSkipLimit(0));
        dispatch(setWearablesListings([]));
        dispatch(loadBaazaarWearablesListings());
    };

const mapWearablesListingsDTOToVM = (listings: WearableListingDTO[], lastSoldListings: Erc1155ListingsBatch): WearableListingVM[] => {
    return listings.map((listing: WearableListingDTO) => {
        const lastSoldListing = lastSoldListings[`item${listing.erc1155TypeId}`];

        return ({
            ...listing,
            erc1155TypeId: Number(listing.erc1155TypeId),
            quantity: Number(listing.quantity),
            timeCreated: Number(listing.timeCreated),
            name: ItemUtils.getNameById(listing.erc1155TypeId),
            rarity: ItemUtils.getItemRarityName(listing.rarityLevel),
            traitModifiers: ItemUtils.getTraitModifiersById(listing.erc1155TypeId),
            currentListing: {
                id: Number(listing.id),
                price: EthersApi.fromWei(listing.priceInWei)
            },
            lastSoldListing: {
                id: lastSoldListing[0] ? Number(lastSoldListing[0].id) : null,
                price: lastSoldListing[0] ? Number(EthersApi.fromWei(lastSoldListing[0].priceInWei)) : 0,
                soldDate: lastSoldListing[0]?.timeLastPurchased ?
                    new Date(Number(lastSoldListing[0].timeLastPurchased) * 1000).toJSON() :
                    null
            },
            benefit: {
                ...ItemUtils.getWearableBenefitsById(listing.erc1155TypeId)
            },
            itemType: ItemUtils.getWearableTypeById(listing.erc1155TypeId)
        });
    });
};
