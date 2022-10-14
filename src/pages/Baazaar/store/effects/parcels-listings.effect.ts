import { AppThunk } from 'core/store/store';
import { GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { GraphFiltersUtils } from 'utils';

import { ParcelListingFilterTypes } from '../../constants';
import { ParcelListingDTO, ParcelListingFilters, ParcelListingFiltersType, ParcelListingVM } from '../../models';
import { getBaazaarParcelsListingsQuery } from '../../queries';
import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import {
    setParcelsListings,
    setParcelsListingsFilters,
    setParcelsListingsSkipLimit,
    setParcelsListingsSorting
} from '../slices';

export const loadBaazaarParcelsListings = (): AppThunk => async (dispatch, getState) => {
    const parcelsListingsGraphQueryParams: GraphQueryParams = getState().baazaar.parcels.parcelsListingsGraphQueryParams;
    const currentParcelsListings: ParcelListingVM[] = getState().baazaar.parcels.parcelsListings;
    const filters: ParcelListingFilters = getState().baazaar.parcels.parcelsListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: ParcelListingFiltersType]) => {
        if (filter.isFilterActive) {
            whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
        }
    });

    const query = getBaazaarParcelsListingsQuery(parcelsListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getParcelsListings(query)
        .then((parcelsListings: ParcelListingDTO[]) => {
            const modifiedListings: ParcelListingVM[] = mapParcelsListingsDTOToVM(parcelsListings);

            dispatch(setParcelsListings(currentParcelsListings.concat(modifiedListings)));
        });
};

export const updateParcelsListingsSorting = (sortings: SortingItem): AppThunk => async (dispatch) => {
    dispatch(setParcelsListingsSorting(sortings));
    dispatch(setParcelsListingsSkipLimit(0));
    dispatch(setParcelsListings([]));
    dispatch(loadBaazaarParcelsListings());
};

export const updateParcelsListingsFilterByKey =
    ({ key, value }: { key: ParcelListingFilterTypes, value: GraphFiltersValueTypes }): AppThunk =>
        async (dispatch, getState) => {
            const filters: ParcelListingFilters = getState().baazaar.parcels.parcelsListingsFilters;

            const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

            dispatch(setParcelsListingsFilters({ ...filters, [key]: updatedFilter }));
            dispatch(setParcelsListingsSkipLimit(0));
            dispatch(setParcelsListings([]));
            dispatch(loadBaazaarParcelsListings());
        };

export const resetParcelsListingsFilters = (): AppThunk =>
    async (dispatch, getState) => {
        const filters: ParcelListingFilters = getState().baazaar.parcels.parcelsListingsFilters;

        const updatedFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: ParcelListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setParcelsListingsFilters(updatedFilters));
        dispatch(setParcelsListingsSkipLimit(0));
        dispatch(setParcelsListings([]));
        dispatch(loadBaazaarParcelsListings());
    };

export const resetParcelsListingsData = (): AppThunk =>
    async (dispatch, getState) => {
        const filters: ParcelListingFilters = getState().baazaar.parcels.parcelsListingsFilters;

        const updatedFilters: ParcelListingFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: ParcelListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setParcelsListingsFilters(updatedFilters));
        dispatch(setParcelsListingsSkipLimit(0));
        dispatch(setParcelsListings([]));
    };

const mapParcelsListingsDTOToVM = (listings: ParcelListingDTO[]): ParcelListingVM[] => {
    return listings.map((listing: ParcelListingDTO) => ({
            ...listing.parcel,
            id: listing.id,
            coordinateX: Number(listing.parcel.coordinateX),
            coordinateY: Number(listing.parcel.coordinateY),
            fudBoost: Number(listing.parcel.fudBoost),
            fomoBoost: Number(listing.parcel.fomoBoost),
            alphaBoost: Number(listing.parcel.alphaBoost),
            kekBoost: Number(listing.parcel.kekBoost),
            listings: [{
                id: listing.id,
                priceInWei: listing.priceInWei
            }],
            historicalPrices: listing.parcel.historicalPrices ? listing.parcel.historicalPrices : []
        })
    );
};
