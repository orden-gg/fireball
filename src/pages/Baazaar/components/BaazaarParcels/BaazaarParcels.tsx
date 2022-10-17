import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import classNames from 'classnames';
import qs from 'query-string';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import {
    CustomParsedQuery,
    GraphFiltersQueryParamTypes,
    GraphFiltersValueTypes,
    GraphQueryParams,
    SortingItem,
    SortingListItem
} from 'shared/models';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { KekIcon } from 'components/Icons/Icons';
import { Parcel } from 'components/Items/Parcel/Parcel';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { GraphFiltersUtils, RouteUtils } from 'utils';

import { ParcelListingFilterTypes } from '../../constants';
import { ParcelListingVM, ParcelListingFilters } from '../../models';
import {
    getParcelsListings,
    getParcelsListingsFilters,
    getParcelsListingsGraphQueryParams,
    getParcelsListingsDefaultSorting,
    getParcelsListingsSorting,
    getParcelsListingsLimitPerLoad,
    getParcelsListingsQueryParamsOrder,
    loadBaazaarParcelsListings,
    resetParcelsListingsData,
    resetParcelsListingsFilters,
    setParcelsListingsSkipLimit,
    updateParcelsListingsFilterByKey,
    updateParcelsListingsSorting,
    setParcelsListingsFilters
} from '../../store';
import { parcelsListingsSortings } from '../../static/sortings';

import { styles } from './styles';

export function BaazaarParcels() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(
        location.search,
        { arrayFormat: 'comma' }
    ) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

    const dispatch = useAppDispatch();
    const parcelsListings: ParcelListingVM[] = useAppSelector(getParcelsListings);
    const parcelsListingsGraphQueryParams: GraphQueryParams = useAppSelector(getParcelsListingsGraphQueryParams);
    const parcelsListingsDefaultSorting: SortingItem = useAppSelector(getParcelsListingsDefaultSorting);
    const parcelsListingsSorting: SortingItem = useAppSelector(getParcelsListingsSorting);
    const parcelsListingsFilters: ParcelListingFilters = useAppSelector(getParcelsListingsFilters);
    const parcelsListingslistingsLimitPerLoad: number = useAppSelector(getParcelsListingsLimitPerLoad);
    const parcelsListingsQueryParamsOrder: string[] = useAppSelector(getParcelsListingsQueryParamsOrder);

    useEffect(() => {
        dispatch(loadBaazaarParcelsListings());

        const updatedFilters: ParcelListingFilters =
            GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, { ...parcelsListingsFilters });
        dispatch(setParcelsListingsFilters(updatedFilters));

        const { sort, dir } = queryParams;

        if (sort && dir) {
            const key: Undefinable<string> = parcelsListingsSortings
                .find((sorting: SortingListItem) => sorting.paramKey === sort)?.key;

            if (key) {
                onSortingChange(key, dir as string);
            }
        }

        return () => {
            dispatch(resetParcelsListingsData());
        };
    }, []);

    useEffect(() => {
        let params: CustomParsedQuery<GraphFiltersQueryParamTypes> =
            GraphFiltersUtils.getFiltersQueryParams(queryParams, { ...parcelsListingsFilters });

        const paramKey: Undefinable<string> = parcelsListingsSortings
            .find(sorting => sorting.key === parcelsListingsSorting.type)?.paramKey;

        if (paramKey) {
            if (
                parcelsListingsSorting.dir === parcelsListingsDefaultSorting.dir &&
                parcelsListingsSorting.type === parcelsListingsDefaultSorting.type
            ) {
                delete params['sort'];
                delete params['dir'];

                params = { ...params };
            } else {
                params = { ...params, sort: paramKey, dir: parcelsListingsSorting.dir };
            }
        }

        RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, parcelsListingsQueryParamsOrder);
    }, [parcelsListingsFilters, parcelsListingsSorting]);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(updateParcelsListingsSorting({ type: sortBy, dir: sortDir }));
    };

    const onHandleReachedEnd = (): void => {
        dispatch(setParcelsListingsSkipLimit(parcelsListingsGraphQueryParams.skip + parcelsListingslistingsLimitPerLoad));

        dispatch(loadBaazaarParcelsListings());
    };

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        dispatch(updateParcelsListingsFilterByKey({ key, value } as { key: ParcelListingFilterTypes, value: GraphFiltersValueTypes }));
    };

    const onResetFilters = useCallback(() => {
        dispatch(resetParcelsListingsFilters());
    }, []);

    return (
        <ContentWrapper>
            <>
                <SortFilterPanel
                    sorting={{
                        sortingList: parcelsListingsSortings,
                        sortingDefaults: parcelsListingsSorting,
                        onSortingChange: onSortingChange
                    }}
                    itemsLength={parcelsListings.length}
                    placeholder={
                        <KekIcon width={20} height={20} alt='realm' />
                    }
                />
                <ContentInner dataLoading={false}>
                    <ItemsLazy
                        items={parcelsListings}
                        component={(parcelListing: ParcelListingVM) => <Parcel parcel={parcelListing} />}
                        onHandleReachedEnd={onHandleReachedEnd}
                    />
                </ContentInner>
            </>
            <>
                <Filters
                    className={classNames(classes.section, classes.filtersWrapper)}
                    filters={parcelsListingsFilters}
                    onSetSelectedFilters={onSetSelectedFilters}
                />

                <div className={classes.buttonsWrapper}>
                    <Button
                        variant='contained'
                        color='warning'
                        size='small'
                        onClick={onResetFilters}
                    >
                        Reset
                    </Button>
                </div>
            </>
        </ContentWrapper>
    );
}
