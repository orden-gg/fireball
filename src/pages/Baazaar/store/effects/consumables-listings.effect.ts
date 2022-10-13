import { AppThunk } from 'core/store/store';
import { Erc1155Categories } from 'shared/constants';
import { Erc1155ListingsBatch, GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { EthersApi, TheGraphApi } from 'api';
import { GraphFiltersUtils, ItemUtils } from 'utils';

import { ConsumableListingFilterTypes } from '../../constants';
import { ConsumableListingDTO, ConsumableListingFilters, ConsumableListingFiltersType, ConsumableListingVM } from '../../models';
import { getBaazaarWearablesListingsQuery } from '../../queries';
import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import {
    setConsumablesListings,
    setConsumablesListingsFilters,
    setConsumablesListingsSkipLimit,
    setConsumablesListingsSorting
} from '../slices';

export const loadBaazaarConsumablesListings = (): AppThunk => async (dispatch, getState) => {
    const consumablesListingsGraphQueryParams: GraphQueryParams = getState().baazaar.consumables.consumablesListingsGraphQueryParams;
    const currentConsumablesListings: ConsumableListingVM[] = getState().baazaar.consumables.consumablesListings;
    const filters: ConsumableListingFilters = getState().baazaar.consumables.consumablesListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: ConsumableListingFiltersType]) => {
        if (filter.isFilterActive) {
            whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
        }
    });

    const query = getBaazaarWearablesListingsQuery(consumablesListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getConsumablesListings(query)
        .then((consumablesListings: ConsumableListingDTO[]) => {
            const consumablesIds: number[] = consumablesListings.map(a => Number(a.erc1155TypeId));

            TheGraphApi.getErc1155ListingsBatchQuery(consumablesIds, Erc1155Categories.Consumable, true, 'timeLastPurchased', 'desc')
               .then((lastSoldListings: Erc1155ListingsBatch) => {
                    const modifiedListings: ConsumableListingVM[] = mapConsumablesListingsDTOToVM(consumablesListings, lastSoldListings);

                    dispatch(setConsumablesListings(currentConsumablesListings.concat(modifiedListings)));
                });
        });
};

export const updateConsumablesListingsSorting = (sortings: SortingItem): AppThunk => async (dispatch) => {
    dispatch(setConsumablesListingsSorting(sortings));
    dispatch(setConsumablesListingsSkipLimit(0));
    dispatch(setConsumablesListings([]));
    dispatch(loadBaazaarConsumablesListings());
};

export const updateConsumablesListingsFilterByKey =
    ({ key, value }: { key: ConsumableListingFilterTypes, value: GraphFiltersValueTypes }): AppThunk =>
        async (dispatch, getState) => {
            const filters: ConsumableListingFilters = getState().baazaar.consumables.consumablesListingsFilters;

            const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

            dispatch(setConsumablesListingsFilters({ ...filters, [key]: updatedFilter }));
            dispatch(setConsumablesListingsSkipLimit(0));
            dispatch(setConsumablesListings([]));
            dispatch(loadBaazaarConsumablesListings());
        };

export const resetConsumablesListingsFilters = (): AppThunk =>
    async (dispatch, getState) => {
        const filters: ConsumableListingFilters = getState().baazaar.consumables.consumablesListingsFilters;

        const updatedFilters: ConsumableListingFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: ConsumableListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setConsumablesListingsFilters(updatedFilters));
        dispatch(setConsumablesListingsSkipLimit(0));
        dispatch(setConsumablesListings([]));
        dispatch(loadBaazaarConsumablesListings());
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
