import { AppThunk } from 'core/store/store';
import { GraphFiltersTypes, GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { GraphFiltersUtils } from 'utils';

import { ASCENDING_DIRECTION, ParcelListingFilterTypes, PRICE_IN_WEI } from '../../constants';
import { ParcelListingDTO, ParcelListingFilters, ParcelListingFiltersType, ParcelListingVM } from '../../models';
import { getBaazaarParcelsListingsQuery } from '../../queries';
import { BaazaarGraphApi } from '../../api/baazaar-graph.api';
import {
    loadParcelsListings,
    loadParcelsListingsSucceded,
    loadParcelsListingsFailed,
    setParcelsListingsFilters,
    setParcelsListingsIsFiltersUpdated,
    setParcelsListingsIsSortingUpdated,
    setParcelsListingsSkipLimit,
    setParcelsListingsSorting,
    setParcelsListingsPreviousSortingProp,
    setIsParcelsListingsInitialDataLoading,
    resetParcelsListings
} from '../slices';

export const loadBaazaarParcelsListings = (shouldResetListings: boolean = false): AppThunk => (dispatch, getState) => {
    dispatch(loadParcelsListings());

    const parcelsListingsGraphQueryParams: GraphQueryParams = getState().baazaar.parcels.parcelsListingsGraphQueryParams;
    const currentParcelsListings: ParcelListingVM[] = getState().baazaar.parcels.parcelsListings.data;
    const filters: ParcelListingFilters = getState().baazaar.parcels.parcelsListingsFilters;

    let whereParams: string = '';
    Object.entries(filters).forEach(([_, filter]: [_: string, filter: ParcelListingFiltersType]) => {
        if (filter.isFilterActive) {
            whereParams += GraphFiltersUtils.getGraphWhereParam(filter);
        }
    });

    const query = getBaazaarParcelsListingsQuery(parcelsListingsGraphQueryParams, whereParams);

    BaazaarGraphApi.getErc721Listings<ParcelListingDTO>(query)
        .then((parcelsListings: ParcelListingDTO[]) => {
            const modifiedListings: ParcelListingVM[] = mapParcelsListingsDTOToVM(parcelsListings);

            if (shouldResetListings) {
                dispatch(loadParcelsListingsSucceded(modifiedListings));
            } else {
                dispatch(loadParcelsListingsSucceded(currentParcelsListings.concat(modifiedListings)));
            }
        })
        .catch(() => {
            dispatch(loadParcelsListingsFailed());
        })
        .finally(() => {
            dispatch(setIsParcelsListingsInitialDataLoading(false));
        });
};

export const onLoadBaazaarParcelsListings = (): AppThunk => (dispatch, getState) => {
    const isFiltersUpdated: boolean = getState().baazaar.parcels.parcelsListingsIsFiltersUpdated;
    const isSortingUpdated: boolean = getState().baazaar.parcels.parcelsListingsIsSortingUpdated;

    if (isFiltersUpdated && isSortingUpdated) {
        dispatch(setParcelsListingsSkipLimit(0));
        dispatch(loadBaazaarParcelsListings(true));
    }
};

export const onSetParcelsListingsSorting = (sort: SortingItem): AppThunk =>
    (dispatch, getState) => {
        let direction: string = sort.dir;
        const previousSortingProp: string = getState().baazaar.parcels.parcelsListingsPreviousSortingProp;

        if (sort.type === PRICE_IN_WEI && previousSortingProp && previousSortingProp !== PRICE_IN_WEI) {
            direction = ASCENDING_DIRECTION;
        }

        dispatch(setParcelsListingsSorting({ type: sort.type, dir: direction }));
        dispatch(setParcelsListingsPreviousSortingProp(sort.type));
    };

export const updateParcelsListingsFilterByKey =
    ({ key, value }: { key: ParcelListingFilterTypes, value: GraphFiltersValueTypes }): AppThunk =>
        (dispatch, getState) => {
            const filters: ParcelListingFilters = getState().baazaar.parcels.parcelsListingsFilters;

            const updatedFilter: GraphFiltersTypes = GraphFiltersUtils.onGetUpdatedSelectedGraphFilter(filters[key], value);

            dispatch(setParcelsListingsFilters({ ...filters, [key]: updatedFilter }));
        };

export const resetParcelsListingsFilters = (): AppThunk =>
    (dispatch, getState) => {
        const filters: ParcelListingFilters = getState().baazaar.parcels.parcelsListingsFilters;

        const updatedFilters: ParcelListingFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: ParcelListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setParcelsListingsFilters(updatedFilters));
    };

export const resetParcelsListingsData = (): AppThunk =>
    (dispatch, getState) => {
        const filters: ParcelListingFilters = getState().baazaar.parcels.parcelsListingsFilters;
        const defaultSorting: SortingItem = getState().baazaar.parcels.parcelsListingsDefaultSorting;

        const updatedFilters: ParcelListingFilters = Object.fromEntries(
            Object.entries(filters).map(([_, filter]: [_: string, filter: ParcelListingFiltersType]) =>
                [[filter.key], GraphFiltersUtils.getResetedFilterByType(filter)]
            )
        );

        dispatch(setParcelsListingsFilters(updatedFilters));
        dispatch(setParcelsListingsSorting(defaultSorting));
        dispatch(setParcelsListingsSkipLimit(0));
        dispatch(resetParcelsListings());
        dispatch(setParcelsListingsIsSortingUpdated(false));
        dispatch(setParcelsListingsIsFiltersUpdated(false));
        dispatch(setIsParcelsListingsInitialDataLoading(true));
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
            timesTraded: Number(listing.parcel.timesTraded),
            listings: [{
                id: listing.id,
                priceInWei: listing.priceInWei
            }],
            historicalPrices: listing.parcel.historicalPrices ? listing.parcel.historicalPrices : []
        })
    );
};
