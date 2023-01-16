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
import { parcelsListingsSortings } from '../../static/sortings';

import * as fromBaazaarStore from '../../store';

import { styles } from './styles';

export function BaazaarParcels() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' }) as CustomParsedQuery<
        GraphFiltersQueryParamTypes
    >;

    const dispatch = useAppDispatch();
    const parcelsListings: ParcelListingVM[] = useAppSelector(fromBaazaarStore.getParcelsListings);
    const isParcelsListingsInitialDataLoading: boolean = useAppSelector(
        fromBaazaarStore.getIsParcelsListingsInitialDataLoading
    );
    const isParcelsListingsLoading: boolean = useAppSelector(fromBaazaarStore.getIsParcelsListingsLoading);
    const parcelsListingsGraphQueryParams: GraphQueryParams = useAppSelector(
        fromBaazaarStore.getParcelsListingsGraphQueryParams
    );
    const parcelsListingsDefaultSorting: SortingItem = useAppSelector(
        fromBaazaarStore.getParcelsListingsDefaultSorting
    );
    const parcelsListingsSorting: SortingItem = useAppSelector(fromBaazaarStore.getParcelsListingsSorting);
    const parcelsListingsFilters: ParcelListingFilters = useAppSelector(fromBaazaarStore.getParcelsListingsFilters);
    const parcelsListingslistingsLimitPerLoad: number = useAppSelector(fromBaazaarStore.getParcelsListingsLimitPerLoad);
    const parcelsListingsQueryParamsOrder: string[] = useAppSelector(
        fromBaazaarStore.getParcelsListingsQueryParamsOrder
    );

    useEffect(() => {
        const updatedFilters: ParcelListingFilters = GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, {
            ...parcelsListingsFilters
        });
        dispatch(fromBaazaarStore.setParcelsListingsFilters(updatedFilters));

        const { sort, dir } = queryParams;

        if (sort && dir) {
            const key: Undefinable<string> = parcelsListingsSortings.find(
                (sorting: SortingListItem) => sorting.paramKey === sort
            )?.key;

            if (key) {
                onSortingChange(key, dir as string);
            }
        }

        if (!sort) {
            dispatch(fromBaazaarStore.setParcelsListingsPreviousSortingProp(parcelsListingsDefaultSorting.type));
        }

        return () => {
            dispatch(fromBaazaarStore.resetParcelsListingsData());
        };
    }, []);

    useEffect(() => {
        let params: CustomParsedQuery<GraphFiltersQueryParamTypes> = GraphFiltersUtils.getFiltersQueryParams(
            queryParams,
            { ...parcelsListingsFilters }
        );

        const paramKey: Undefinable<string> = parcelsListingsSortings.find(
            sorting => sorting.key === parcelsListingsSorting.type
        )?.paramKey;

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

        dispatch(fromBaazaarStore.onLoadBaazaarParcelsListings());
    }, [parcelsListingsFilters, parcelsListingsSorting]);

    useEffect(() => {
        dispatch(fromBaazaarStore.setParcelsListingsIsFiltersUpdated(true));
    }, [parcelsListingsFilters]);

    useEffect(() => {
        dispatch(fromBaazaarStore.setParcelsListingsIsSortingUpdated(true));
    }, [parcelsListingsSorting]);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(fromBaazaarStore.onSetParcelsListingsSorting({ type: sortBy, dir: sortDir }));
    };

    const onHandleReachedEnd = (): void => {
        const skipLimit: number = parcelsListingsGraphQueryParams.skip + parcelsListingslistingsLimitPerLoad;

        if (skipLimit <= parcelsListings.length) {
            dispatch(fromBaazaarStore.setParcelsListingsSkipLimit(skipLimit));
            dispatch(fromBaazaarStore.loadBaazaarParcelsListings());
        }
    };

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        dispatch(
            fromBaazaarStore.updateParcelsListingsFilterByKey({ key, value } as {
                key: ParcelListingFilterTypes;
                value: GraphFiltersValueTypes;
            })
        );
    };

    const onResetFilters = useCallback(() => {
        dispatch(fromBaazaarStore.resetParcelsListingsFilters());
    }, []);

    return (
        <ContentWrapper paddingZero>
            <>
                <SortFilterPanel
                    sorting={{
                        sortingList: parcelsListingsSortings,
                        sortingDefaults: parcelsListingsSorting,
                        onSortingChange: onSortingChange
                    }}
                    itemsLength={parcelsListings.length}
                    placeholder={<KekIcon width={20} height={20} alt='realm' />}
                    isPanelDisabled={isParcelsListingsLoading}
                />
                <ContentInner dataLoading={isParcelsListingsInitialDataLoading}>
                    <ItemsLazy
                        items={parcelsListings}
                        component={(parcelListing: ParcelListingVM) => <Parcel parcel={parcelListing} />}
                        onHandleReachedEnd={onHandleReachedEnd}
                    />
                </ContentInner>
            </>
            <div className={classes.sidebar}>
                <Filters
                    className={classNames(classes.section, classes.filtersWrapper)}
                    filters={parcelsListingsFilters}
                    onSetSelectedFilters={onSetSelectedFilters}
                    isFiltersDisabled={isParcelsListingsLoading}
                />

                <div className={classes.buttonsWrapper}>
                    <Button
                        variant='contained'
                        color='warning'
                        size='small'
                        onClick={onResetFilters}
                        disabled={isParcelsListingsLoading}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </ContentWrapper>
    );
}
