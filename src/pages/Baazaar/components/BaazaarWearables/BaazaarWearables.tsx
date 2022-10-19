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
import { CardListing } from 'shared/components/CardListing/CardListing';
import { CardBalance, CardGroup, CardImage, CardName, CardSlot, CardStats } from 'components/ItemCard/components';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { WarehouseIcon } from 'components/Icons/Icons';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { GraphFiltersUtils, RouteUtils } from 'utils';

import { WearableListingFilterTypes } from '../../constants';
import { WearableListingFilters, WearableListingVM } from '../../models';
import { wearablesListingsSortings } from '../../static/sortings';

import * as fromBaazaarStore from '../../store';

import { styles } from './styles';

export function BaazaarWearables() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(
        location.search,
        { arrayFormat: 'comma' }
    ) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

    const dispatch = useAppDispatch();
    const wearablesListings: WearableListingVM[] = useAppSelector(fromBaazaarStore.getWearablesListings);
    const isWearablesListingsInitialDataLoading: boolean = useAppSelector(fromBaazaarStore.getIsWearablesListingsInitialDataLoading);
    const isWearablesListingsLoading: boolean = useAppSelector(fromBaazaarStore.getIsWearablesListingsLoading);
    const wearablesListingsGraphQueryParams: GraphQueryParams = useAppSelector(fromBaazaarStore.getWearablesListingsGraphQueryParams);
    const wearablesListingsDefaultSorting: SortingItem = useAppSelector(fromBaazaarStore.getWearablesListingsDefaultSorting);
    const wearablesListingsSorting: SortingItem = useAppSelector(fromBaazaarStore.getWearablesListingsSorting);
    const wearablesListingsFilters: WearableListingFilters = useAppSelector(fromBaazaarStore.getWearablesListingsFilters);
    const wearablesListingsLimitPerLoad: number = useAppSelector(fromBaazaarStore.getWearablesListingsLimitPerLoad);
    const WearablesListingsQueryParamsOrder: string[] = useAppSelector(fromBaazaarStore.getWearablesListingsQueryParamsOrder);

    useEffect(() => {
        const updatedFilters: WearableListingFilters =
            GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, { ...wearablesListingsFilters });
        dispatch(fromBaazaarStore.setWearablesListingsFilters(updatedFilters));

        const { sort, dir } = queryParams;

        if (sort && dir) {
            const key: Undefinable<string> = wearablesListingsSortings
                .find((sorting: SortingListItem) => sorting.paramKey === sort)?.key;

            if (key) {
                onSortingChange(key, dir as string);
            }
        }

        return () => {
            dispatch(fromBaazaarStore.resetWearablesListingsData());
        };
    }, []);

    useEffect(() => {
        let params: CustomParsedQuery<GraphFiltersQueryParamTypes> =
            GraphFiltersUtils.getFiltersQueryParams(queryParams, { ...wearablesListingsFilters });

        const paramKey: Undefinable<string> = wearablesListingsSortings
            .find(sorting => sorting.key === wearablesListingsSorting.type)?.paramKey;

        if (paramKey) {
            if (
                wearablesListingsSorting.dir === wearablesListingsDefaultSorting.dir &&
                wearablesListingsSorting.type === wearablesListingsDefaultSorting.type
            ) {
                delete params['sort'];
                delete params['dir'];

                params = { ...params };
            } else {
                params = { ...params, sort: paramKey, dir: wearablesListingsSorting.dir };
            }
        }

        RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, WearablesListingsQueryParamsOrder);

        dispatch(fromBaazaarStore.onLoadBaazaarWearablesListings());
    }, [wearablesListingsFilters, wearablesListingsSorting]);

    useEffect(() => {
        dispatch(fromBaazaarStore.setWearablesListingsIsFiltersUpdated(true));
    }, [wearablesListingsFilters]);

    useEffect(() => {
        dispatch(fromBaazaarStore.setWearablesListingsIsSortingUpdated(true));
    }, [wearablesListingsSorting]);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(fromBaazaarStore.setWearablesListingsSorting({ type: sortBy, dir: sortDir }));
    };

    const onHandleReachedEnd = (): void => {
        const skipLimit: number = wearablesListingsGraphQueryParams.skip + wearablesListingsLimitPerLoad;

        if (skipLimit <= wearablesListings.length) {
            dispatch(fromBaazaarStore.setWearablesListingsSkipLimit(skipLimit));
            dispatch(fromBaazaarStore.loadBaazaarWearablesListings());
        }
    };

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        dispatch(fromBaazaarStore.updateWearablesListingsFilterByKey(
            { key, value } as { key: WearableListingFilterTypes, value: GraphFiltersValueTypes }
        ));
    };

    const onResetFilters = useCallback(() => {
        dispatch(fromBaazaarStore.resetWearablesListingsFilters());
    }, []);

    return (
        <ContentWrapper paddingZero>
            <>
                <SortFilterPanel
                    sorting={{
                        sortingList: wearablesListingsSortings,
                        sortingDefaults: wearablesListingsSorting,
                        onSortingChange: onSortingChange
                    }}
                    itemsLength={wearablesListings.length}
                    placeholder={
                        <WarehouseIcon width={20} height={20} />
                    }
                    isPanelDisabled={isWearablesListingsLoading}
                />
                <ContentInner dataLoading={isWearablesListingsInitialDataLoading} offset={257}>
                    <ItemsLazy
                        items={wearablesListings}
                        component={(wearableListing: WearableListingVM) =>
                            <ItemCard
                                id={wearableListing.id}
                                category={wearableListing.category}
                                type={wearableListing.rarity}
                            >
                                <CardGroup name='header' className={classes.wearableHeader}>
                                    <CardSlot id={wearableListing.erc1155TypeId} className={classes.overridedSlot}/>
                                    <CardBalance balance={`${wearableListing.quantity}`} holders={[]} />
                                </CardGroup>
                                <CardGroup name='body'>
                                    <CardImage id={wearableListing.erc1155TypeId} />
                                    <CardName children={wearableListing.name} />
                                    <CardStats stats={wearableListing.traitModifiers} />
                                    <div className={classes.benefits}>
                                        <span className={classes.itemTypeValue}>{wearableListing.itemType}</span>
                                        <span className={classes.benefitValue}>{wearableListing.benefit.first}, {wearableListing.benefit.second}</span>
                                    </div>
                                </CardGroup>
                                <CardGroup name='footer'>
                                    <CardListing
                                        currentListing={wearableListing.currentListing}
                                        lastSoldListing={wearableListing.lastSoldListing}
                                    />
                                </CardGroup>
                            </ItemCard>
                        }
                        onHandleReachedEnd={onHandleReachedEnd}
                    />
                </ContentInner>
            </>
            <div className={classes.sidebar}>
                <Filters
                    className={classNames(classes.section, classes.filtersWrapper)}
                    filters={wearablesListingsFilters}
                    onSetSelectedFilters={onSetSelectedFilters}
                    isFiltersDisabled={isWearablesListingsLoading}
                />

                <div className={classes.buttonsWrapper}>
                    <Button
                        variant='contained'
                        color='warning'
                        size='small'
                        onClick={onResetFilters}
                        disabled={isWearablesListingsLoading}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </ContentWrapper>
    );
}
