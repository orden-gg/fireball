import { AppThunk } from 'core/store/store';
import { Erc1155Categories } from 'shared/constants';
import { Erc1155ListingsBatch, GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { EthersApi, TheGraphApi } from 'api';
import { GraphFiltersUtils, ItemUtils } from 'utils';

import { WearableListingFilterTypes } from '../../constants';
import { WearableListingDTO, WearableListingFilters, WearableListingFiltersType, WearableListingVM } from '../../models';
import { getBaazaarErc1155ListingsQuery } from '../../queries';
import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import {
    loadWearablesListings,
    loadWearablesListingsSucceded,
    loadWearablesListingsFailed,
    setWearablesListingsFilters,
    setWearablesListingsIsFiltersUpdated,
    setWearablesListingsIsSortingUpdated,
    setWearablesListingsSkipLimit,
    setWearablesListingsSorting,
    setIsWearablesListingsInitialDataLoading,
    resetWearablesListings
} from '../slices';

export const loadBaazaarWearablesListings = (shouldResetListings: boolean = false): AppThunk => (dispatch, getState) => {
    dispatch(loadWearablesListings());

    const wearablesListingsGraphQueryParams: GraphQueryParams = getState().baazaar.wearables.wearablesListingsGraphQueryParams;
    const currentWearablesListings: WearableListingVM[] = getState().baazaar.wearables.wearablesListings.data;
    const filters: WearableListingFilters = getState().baazaar.wearables.wearablesListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: WearableListingFiltersType]) => {
        if (filter.isFilterActive) {
            whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
        }
    });

    const query = getBaazaarErc1155ListingsQuery(wearablesListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getErc1155Listings<WearableListingDTO>(query)
        .then((wearablesListings: WearableListingDTO[]) => {
            const wearablesIds: number[] = wearablesListings.map((listing: WearableListingDTO) => Number(listing.erc1155TypeId));

            TheGraphApi.getErc1155ListingsBatchQuery(wearablesIds, Erc1155Categories.Wearable, true, 'timeLastPurchased', 'desc')
               .then((lastSoldListings: Erc1155ListingsBatch) => {
                    const modifiedListings: WearableListingVM[] = mapWearablesListingsDTOToVM(wearablesListings, lastSoldListings);

                    if (shouldResetListings) {
                        dispatch(loadWearablesListingsSucceded(modifiedListings));
                    } else {
                        dispatch(loadWearablesListingsSucceded(currentWearablesListings.concat(modifiedListings)));
                    }
                })
                .finally(() => {
                    dispatch(setIsWearablesListingsInitialDataLoading(false));
                });
        })
        .catch(() => {
            dispatch(loadWearablesListingsFailed());
        });
};

export const onLoadBaazaarWearablesListings = (): AppThunk => (dispatch, getState) => {
    const isFiltersUpdated: boolean = getState().baazaar.wearables.wearablesListingsIsFiltersUpdated;
    const isSortingUpdated: boolean = getState().baazaar.wearables.wearablesListingsIsSortingUpdated;

    if (isFiltersUpdated && isSortingUpdated) {
        dispatch(setWearablesListingsSkipLimit(0));
        dispatch(loadBaazaarWearablesListings(true));
    }
};

export const updateWearablesListingsFilterByKey =
    ({ key, value }: { key: WearableListingFilterTypes, value: GraphFiltersValueTypes }): AppThunk =>
        (dispatch, getState) => {
            const filters: WearableListingFilters = getState().baazaar.wearables.wearablesListingsFilters;

            const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

            dispatch(setWearablesListingsFilters({ ...filters, [key]: updatedFilter }));
        };

export const resetWearablesListingsFilters = (): AppThunk =>
    (dispatch, getState) => {
        const filters: WearableListingFilters = getState().baazaar.wearables.wearablesListingsFilters;

        const updatedFilters: WearableListingFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: WearableListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setWearablesListingsFilters(updatedFilters));
    };

export const resetWearablesListingsData = (): AppThunk =>
    (dispatch, getState) => {
        const filters: WearableListingFilters = getState().baazaar.wearables.wearablesListingsFilters;
        const defaultSorting: SortingItem = getState().baazaar.wearables.wearablesListingsDefaultSorting;

        const updatedFilters: WearableListingFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: WearableListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setWearablesListingsFilters(updatedFilters));
        dispatch(setWearablesListingsSorting(defaultSorting));
        dispatch(setWearablesListingsSkipLimit(0));
        dispatch(resetWearablesListings());
        dispatch(setWearablesListingsIsSortingUpdated(false));
        dispatch(setWearablesListingsIsFiltersUpdated(false));
        dispatch(setIsWearablesListingsInitialDataLoading(true));
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
