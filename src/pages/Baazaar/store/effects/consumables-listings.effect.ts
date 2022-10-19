import { AppThunk } from 'core/store/store';
import { Erc1155Categories } from 'shared/constants';
import { Erc1155ListingsBatch, GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { EthersApi, TheGraphApi } from 'api';
import { GraphFiltersUtils, ItemUtils } from 'utils';

import { ConsumableListingFilterTypes } from '../../constants';
import { ConsumableListingDTO, ConsumableListingFilters, ConsumableListingFiltersType, ConsumableListingVM } from '../../models';
import { getBaazaarErc1155ListingsQuery } from '../../queries';
import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import {
    loadConsumablesListings,
    loadConsumablesListingsSucceded,
    loadConsumablesListingsFailed,
    setConsumablesListingsFilters,
    setConsumablesListingsIsFiltersUpdated,
    setConsumablesListingsIsSortingUpdated,
    setConsumablesListingsSkipLimit,
    setConsumablesListingsSorting,
    setIsConsumablesListingsInitialDataLoading,
    resetConsumablesListings
} from '../slices';

export const loadBaazaarConsumablesListings = (shouldResetListings: boolean = false): AppThunk => (dispatch, getState) => {
    dispatch(loadConsumablesListings());

    const consumablesListingsGraphQueryParams: GraphQueryParams = getState().baazaar.consumables.consumablesListingsGraphQueryParams;
    const currentConsumablesListings: ConsumableListingVM[] = getState().baazaar.consumables.consumablesListings.data;
    const filters: ConsumableListingFilters = getState().baazaar.consumables.consumablesListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: ConsumableListingFiltersType]) => {
        if (filter.isFilterActive) {
            whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
        }
    });

    const query = getBaazaarErc1155ListingsQuery(consumablesListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getErc1155Listings<ConsumableListingDTO>(query)
        .then((consumablesListings: ConsumableListingDTO[]) => {
            const consumablesIds: number[] = consumablesListings.map((listing: ConsumableListingDTO) => Number(listing.erc1155TypeId));

            if (consumablesIds.length > 0) {
                TheGraphApi.getErc1155ListingsBatchQuery(consumablesIds, Erc1155Categories.Consumable, true, 'timeLastPurchased', 'desc')
                   .then((lastSoldListings: Erc1155ListingsBatch) => {
                        const modifiedListings: ConsumableListingVM[] = mapConsumablesListingsDTOToVM(consumablesListings, lastSoldListings);

                        if (shouldResetListings) {
                            dispatch(loadConsumablesListingsSucceded(modifiedListings));
                        } else {
                            dispatch(loadConsumablesListingsSucceded(currentConsumablesListings.concat(modifiedListings)));
                        }
                    })
                    .finally(() => {
                        dispatch(setIsConsumablesListingsInitialDataLoading(false));
                    });
            } else {
                if (shouldResetListings) {
                    dispatch(loadConsumablesListingsSucceded([]));
                }

                dispatch(setIsConsumablesListingsInitialDataLoading(false));
            }
        })
        .catch(() => {
            dispatch(loadConsumablesListingsFailed());
        });
};

export const onLoadBaazaarConsumablesListings = (): AppThunk => (dispatch, getState) => {
    const isFiltersUpdated: boolean = getState().baazaar.consumables.consumablesListingsIsFiltersUpdated;
    const isSortingUpdated: boolean = getState().baazaar.consumables.consumablesListingsIsSortingUpdated;

    if (isFiltersUpdated && isSortingUpdated) {
        dispatch(setConsumablesListingsSkipLimit(0));
        dispatch(loadBaazaarConsumablesListings(true));
    }
};

export const updateConsumablesListingsFilterByKey =
    ({ key, value }: { key: ConsumableListingFilterTypes, value: GraphFiltersValueTypes }): AppThunk =>
        (dispatch, getState) => {
            const filters: ConsumableListingFilters = getState().baazaar.consumables.consumablesListingsFilters;

            const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

            dispatch(setConsumablesListingsFilters({ ...filters, [key]: updatedFilter }));
        };

export const resetConsumablesListingsFilters = (): AppThunk =>
    (dispatch, getState) => {
        const filters: ConsumableListingFilters = getState().baazaar.consumables.consumablesListingsFilters;

        const updatedFilters: ConsumableListingFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: ConsumableListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setConsumablesListingsFilters(updatedFilters));
    };

export const resetConsumablesListingsData = (): AppThunk =>
    (dispatch, getState) => {
        const filters: ConsumableListingFilters = getState().baazaar.consumables.consumablesListingsFilters;
        const defaultSorting: SortingItem = getState().baazaar.consumables.consumablesListingsDefaultSorting;

        const updatedFilters: ConsumableListingFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: ConsumableListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setConsumablesListingsFilters(updatedFilters));
        dispatch(setConsumablesListingsSorting(defaultSorting));
        dispatch(setConsumablesListingsSkipLimit(0));
        dispatch(resetConsumablesListings());
        dispatch(setConsumablesListingsIsSortingUpdated(false));
        dispatch(setConsumablesListingsIsFiltersUpdated(false));
        dispatch(setIsConsumablesListingsInitialDataLoading(true));
    };

const mapConsumablesListingsDTOToVM = (listings: ConsumableListingDTO[], lastSoldListings: Erc1155ListingsBatch): ConsumableListingVM[] => {
    return listings.map((listing: ConsumableListingDTO) => {
        const lastSoldListing = lastSoldListings[`item${listing.erc1155TypeId}`];

        return ({
            ...listing,
            erc1155TypeId: Number(listing.erc1155TypeId),
            quantity: Number(listing.quantity),
            timeCreated: Number(listing.timeCreated),
            name: ItemUtils.getNameById(listing.erc1155TypeId),
            rarity: ItemUtils.getItemRarityName(listing.rarityLevel),
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
            }
        });
    });
};
