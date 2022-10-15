import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import classNames from 'classnames';
import qs from 'query-string';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import {
    CustomParsedQuery,
    GraphFiltersValueTypes,
    GraphQueryParams,
    QueryParamSortingItem,
    SortingItem,
    SortingListItem
} from 'shared/models';
import { CardListing } from 'shared/components/CardListing/CardListing';
import { CardBalance, CardGroup, CardImage, CardName } from 'components/ItemCard/components';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { ConsumableIcon } from 'components/Icons/Icons';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { RouteUtils } from 'utils';

import { ConsumableListingFilterTypes } from '../../constants';
import { ConsumableListingFilters, ConsumableListingVM } from '../../models';
import {
    getConsumablesListings,
    getConsumablesListingsFilters,
    getConsumablesListingsGraphQueryParams,
    getConsumablesListingsLimitPerLoad,
    getConsumablesListingsSorting,
    getConsumablesListingsQueryParamsOrder,
    loadBaazaarConsumablesListings,
    resetConsumablesListingsData,
    resetConsumablesListingsFilters,
    setConsumablesListingsSkipLimit,
    updateConsumablesListingsFilterByKey,
    updateConsumablesListingsSorting
} from '../../store';
import { consumablesListingsSortings } from '../../static/sortings';

import { styles } from './styles';

export function BaazaarConsumables() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

    const dispatch = useAppDispatch();
    const consumablesListings: ConsumableListingVM[] = useAppSelector(getConsumablesListings);
    const consumablesListingsGraphQueryParams: GraphQueryParams = useAppSelector(getConsumablesListingsGraphQueryParams);
    const consumablesListingsSorting: SortingItem = useAppSelector(getConsumablesListingsSorting);
    const consumablesListingsFilters: ConsumableListingFilters = useAppSelector(getConsumablesListingsFilters);
    const consuamblesListingsLimitPerLoad: number = useAppSelector(getConsumablesListingsLimitPerLoad);
    const consumablesListingsQueryParamsOrder: string[] = useAppSelector(getConsumablesListingsQueryParamsOrder);

    useEffect(() => {
        dispatch(loadBaazaarConsumablesListings());

        const { sort, dir } = queryParams as CustomParsedQuery;

        if (sort && dir) {
            const key: Undefinable<string> = consumablesListingsSortings
                .find((sorting: SortingListItem) => sorting.paramKey === sort)?.key;

            if (key) {
                onSortingChange(key, dir);
            }
        }

        return () => {
            dispatch(resetConsumablesListingsData());
        };
    }, []);

    useEffect(() => {
        const paramKey: Undefinable<string> = consumablesListingsSortings
            .find(sorting => sorting.key === consumablesListingsSorting.type)?.paramKey;

        if (paramKey) {
            updateSortQueryParams(paramKey, consumablesListingsSorting.dir);
        }
    }, [consumablesListingsSorting]);

    const updateSortQueryParams = useCallback((prop: string, dir: string) => {
        const params: QueryParamSortingItem = { ...queryParams, sort: prop, dir };

        RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, consumablesListingsQueryParamsOrder);
    }, [queryParams, navigate, location.pathname]);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(updateConsumablesListingsSorting({ type: sortBy, dir: sortDir }));
    };

    const onHandleReachedEnd = (): void => {
        dispatch(setConsumablesListingsSkipLimit(consumablesListingsGraphQueryParams.skip + consuamblesListingsLimitPerLoad));

        dispatch(loadBaazaarConsumablesListings());
    };

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        dispatch(updateConsumablesListingsFilterByKey(
            { key, value } as { key: ConsumableListingFilterTypes, value: GraphFiltersValueTypes })
        );
    };

    const onResetFilters = useCallback(() => {
        dispatch(resetConsumablesListingsFilters());
    }, []);

    return (
        <ContentWrapper>
            <>
                <SortFilterPanel
                    sorting={{
                        sortingList: consumablesListingsSortings,
                        sortingDefaults: consumablesListingsSorting,
                        onSortingChange: onSortingChange
                    }}
                    itemsLength={consumablesListings.length}
                    placeholder={
                        <ConsumableIcon width={20} height={20} />
                    }
                />
                <ContentInner dataLoading={false}>
                <ItemsLazy
                        items={consumablesListings}
                        component={(consumableListing: ConsumableListingVM) =>
                            <ItemCard type={consumableListing.rarity} id={consumableListing.id} category={consumableListing.category}>
                                <CardGroup name='header'>
                                    <CardBalance balance={`${consumableListing.quantity}`} holders={[]} />
                                </CardGroup>
                                <CardGroup name='body'>
                                    <CardImage id={consumableListing.erc1155TypeId} />
                                    <CardName children={consumableListing.name} />
                                </CardGroup>
                                <CardGroup name='footer'>
                                    <CardListing
                                        currentListing={consumableListing.currentListing}
                                        lastSoldListing={consumableListing.lastSoldListing}
                                    />
                                </CardGroup>
                            </ItemCard>
                        }
                        onHandleReachedEnd={onHandleReachedEnd}
                    />
                </ContentInner>
            </>
            <>
                <Filters
                    className={classNames(classes.section, classes.filtersWrapper)}
                    filters={consumablesListingsFilters}
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
