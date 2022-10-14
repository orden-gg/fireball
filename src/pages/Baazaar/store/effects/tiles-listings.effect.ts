import { AppThunk } from 'core/store/store';
import { Erc1155Categories, RarityTypes } from 'shared/constants';
import { Erc1155ListingsBatch, GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { EthersApi, TheGraphApi } from 'api';
import { GraphFiltersUtils, TilesUtils } from 'utils';

import { TileListingFilterTypes } from '../../constants';
import { TileListingDTO, TileListingFilters, TileListingFiltersType, TileListingVM } from '../../models';
import { getBaazaarWearablesListingsQuery } from '../../queries';
import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import {
    setTilesListings,
    setTilesListingsFilters,
    setTilesListingsSkipLimit,
    setTilesListingsSorting
} from '../slices';

export const loadBaazaarTilesListings = (): AppThunk => async (dispatch, getState) => {
    const tilesListingsGraphQueryParams: GraphQueryParams = getState().baazaar.tiles.tilesListingsGraphQueryParams;
    const currentTilesListings: TileListingVM[] = getState().baazaar.tiles.tilesListings;
    const filters: TileListingFilters = getState().baazaar.tiles.tilesListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: TileListingFiltersType]) => {
        if (filter.isFilterActive) {
            whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
        }
    });

    const query = getBaazaarWearablesListingsQuery(tilesListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getTilesListings(query)
        .then((tilesListings: TileListingDTO[]) => {
            const tilesIds: number[] = tilesListings
                .map((listing: TileListingDTO) => Number(listing.erc1155TypeId));

            TheGraphApi.getErc1155ListingsBatchQuery(tilesIds, Erc1155Categories.Tile, true, 'timeLastPurchased', 'desc')
               .then((lastSoldListings: Erc1155ListingsBatch) => {
                    const modifiedListings: TileListingVM[] = mapTilesListingsDTOToVM(tilesListings, lastSoldListings);

                    dispatch(setTilesListings(currentTilesListings.concat(modifiedListings)));
                });
        });
};

export const updateTilesListingsSorting = (sortings: SortingItem): AppThunk => async (dispatch) => {
    dispatch(setTilesListingsSorting(sortings));
    dispatch(setTilesListingsSkipLimit(0));
    dispatch(setTilesListings([]));
    dispatch(loadBaazaarTilesListings());
};

export const updateTilesListingsFilterByKey =
    ({ key, value }: { key: TileListingFilterTypes, value: GraphFiltersValueTypes }): AppThunk =>
        async (dispatch, getState) => {
            const filters: TileListingFilters = getState().baazaar.tiles.tilesListingsFilters;

            const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

            dispatch(setTilesListingsFilters({ ...filters, [key]: updatedFilter as TileListingFiltersType }));
            dispatch(setTilesListingsSkipLimit(0));
            dispatch(setTilesListings([]));
            dispatch(loadBaazaarTilesListings());
        };

export const resetTilesListingsFilters = (): AppThunk =>
    async (dispatch, getState) => {
        const filters: TileListingFilters = getState().baazaar.tiles.tilesListingsFilters;

        const updatedFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: TileListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setTilesListingsFilters(updatedFilters));
        dispatch(setTilesListingsSkipLimit(0));
        dispatch(setTilesListings([]));
        dispatch(loadBaazaarTilesListings());
    };


export const resetTilesListingsData = (): AppThunk =>
    async (dispatch, getState) => {
        const filters: TileListingFilters = getState().baazaar.tiles.tilesListingsFilters;

        const updatedFilters: TileListingFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: TileListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setTilesListingsFilters(updatedFilters));
        dispatch(setTilesListingsSkipLimit(0));
        dispatch(setTilesListings([]));
    };

const mapTilesListingsDTOToVM = (listings: TileListingDTO[], lastSoldListings: Erc1155ListingsBatch): TileListingVM[] => {
    return listings.map((listing: TileListingDTO) => {
        const lastSoldListing = lastSoldListings[`item${listing.erc1155TypeId}`];

        return ({
            ...listing,
            erc1155TypeId: Number(listing.erc1155TypeId),
            quantity: Number(listing.quantity),
            timeCreated: Number(listing.timeCreated),
            name: TilesUtils.getNameById(listing.erc1155TypeId),
            imageSrcUrl: TilesUtils.getImageById(listing.erc1155TypeId),
            rarity: RarityTypes.Golden,
            isDeprecated: TilesUtils.getDeprecatedById(listing.erc1155TypeId),
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
