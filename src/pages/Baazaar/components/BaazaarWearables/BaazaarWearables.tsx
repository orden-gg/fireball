import { useCallback, useEffect } from 'react';
import { Button } from '@mui/material';

import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { CardListing } from 'shared/components/CardListing/CardListing';
import { CardBalance, CardGroup, CardImage, CardName, CardSlot, CardStats } from 'components/ItemCard/components';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { WarehouseIcon } from 'components/Icons/Icons';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { WearableListingFilterTypes } from '../../constants';
import { WearableListingFilters, WearableListingVM } from '../../models';
import {
    getWearablesListings,
    getWearablesListingsFilters,
    getWearablesListingsGraphQueryParams,
    getWearablesListingsLimitPerLoad,
    getWearablesListingsSorting,
    loadBaazaarWearablesListings,
    resetWearablesListingsData,
    resetWearablesListingsFilters,
    setWearablesListingsSkipLimit,
    updateWearablesListingsFilterByKey,
    updateWearablesListingsSorting
} from '../../store';
import { wearablesListingsSortings } from '../../static';

import { styles } from './styles';

export function BaazaarWearables() {
    const classes = styles();

    const dispatch = useAppDispatch();
    const wearablesListings: WearableListingVM[] = useAppSelector(getWearablesListings);
    const wearablesListingsGraphQueryParams: GraphQueryParams = useAppSelector(getWearablesListingsGraphQueryParams);
    const wearablesListingsSorting: SortingItem = useAppSelector(getWearablesListingsSorting);
    const wearablesListingsFilters: WearableListingFilters = useAppSelector(getWearablesListingsFilters);
    const wearablesListingsLimitPerLoad: number = useAppSelector(getWearablesListingsLimitPerLoad);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(updateWearablesListingsSorting({ type: sortBy, dir: sortDir }));
    };

    useEffect(() => {
        dispatch(loadBaazaarWearablesListings());

        return () => {
            dispatch(resetWearablesListingsData());
        };
    }, []);

    const onHandleReachedEnd = (): void => {
        dispatch(setWearablesListingsSkipLimit(wearablesListingsGraphQueryParams.skip + wearablesListingsLimitPerLoad));

        dispatch(loadBaazaarWearablesListings());
    };

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        // TODO fix `as` in the future
        dispatch(updateWearablesListingsFilterByKey({ key, value } as { key: WearableListingFilterTypes, value: GraphFiltersValueTypes }));
    };

    const onResetFilters = useCallback(() => {
        dispatch(resetWearablesListingsFilters());
    }, []);

    return (
        <ContentWrapper>
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
                />
                <ContentInner dataLoading={false}>
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
            <>
                <Filters
                    className={classNames(classes.section, classes.filtersWrapper)}
                    filters={wearablesListingsFilters}
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
