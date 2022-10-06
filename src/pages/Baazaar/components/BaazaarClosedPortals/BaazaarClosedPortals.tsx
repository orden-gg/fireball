import { useCallback, useEffect } from 'react';
import { Button } from '@mui/material';

import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { CardERC721Listing, CardGroup, CardName, CardPortalImage, CardSlot } from 'components/ItemCard/components';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { H1SealedPortalIcon } from 'components/Icons/Icons';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { ClosedPortalListingFilterTypes } from '../../constants';
import { ClosedPortalListingFilters, ClosedPortalListingVM } from '../../models';
import {
    getClosedPortalsListings,
    getClosedPortalsListingsFilters,
    getClosedPortalsListingsGraphQueryParams,
    getClosedPortalsListingsLimitPerLoad,
    getClosedPortalsListingsSorting,
    loadBaazaarClosedPortalsListings,
    resetClosedPortalsListingsFilters,
    setClosedPortalsListingsSkipLimit,
    updateClosedPortalsListingsFilterByKey,
    updateClosedPortalsListingsSorting
} from '../../store';
import { closedPortalsListingsSortings } from '../../static';

import { styles } from './styles';

export function BaazaarClosedPortals() {
    const classes = styles();

    const dispatch = useAppDispatch();
    const closedPortalsListings: ClosedPortalListingVM[] = useAppSelector(getClosedPortalsListings);
    const closedPortalsListingsGraphQueryParams: GraphQueryParams = useAppSelector(getClosedPortalsListingsGraphQueryParams);
    const closedPortalsListingsSorting: SortingItem = useAppSelector(getClosedPortalsListingsSorting);
    const closedPortalsListingsFilters: ClosedPortalListingFilters = useAppSelector(getClosedPortalsListingsFilters);
    const closedPortalsListingsLimitPerLoad: number = useAppSelector(getClosedPortalsListingsLimitPerLoad);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(updateClosedPortalsListingsSorting({ type: sortBy, dir: sortDir }));
    };

    useEffect(() => {
        dispatch(loadBaazaarClosedPortalsListings());
    }, []);

    const onHandleReachedEnd = (): void => {
        dispatch(setClosedPortalsListingsSkipLimit(closedPortalsListingsGraphQueryParams.skip + closedPortalsListingsLimitPerLoad));

        dispatch(loadBaazaarClosedPortalsListings());
    };

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        // TODO fix `as` in the future
        dispatch(updateClosedPortalsListingsFilterByKey(
            { key, value } as { key: ClosedPortalListingFilterTypes, value: GraphFiltersValueTypes }
        ));
    };

    const onResetFilters = useCallback(() => {
        dispatch(resetClosedPortalsListingsFilters());
    }, []);

    return (
        <ContentWrapper>
            <>
                <SortFilterPanel
                    sorting={{
                        sortingList: closedPortalsListingsSortings,
                        sortingDefaults: closedPortalsListingsSorting,
                        onSortingChange: onSortingChange
                    }}
                    itemsLength={closedPortalsListings.length}
                    placeholder={
                        <H1SealedPortalIcon width={20} height={20} />
                    }
                />
                <ContentInner dataLoading={false}>
                    <ItemsLazy
                        items={closedPortalsListings}
                        component={(portal: ClosedPortalListingVM) =>
                            <div className={classes.listItem} key={portal.tokenId}>
                                <ItemCard type={`haunt${portal.hauntId}`} id={portal.id} category={portal.category}>
                                    <CardGroup name='body'>
                                        <CardSlot>{`Haunt ${portal.hauntId}`}</CardSlot>
                                        <CardPortalImage category={portal.category} hauntId={portal.hauntId} />
                                        <CardName>{`Portal ${portal.tokenId}`}</CardName>
                                    </CardGroup>
                                    <CardGroup name='footer'>
                                        <CardERC721Listing
                                            activeListing={portal.id}
                                            listings={portal.listings}
                                            historicalPrices={portal.historicalPrices}
                                        />
                                    </CardGroup>
                                </ItemCard>
                            </div>
                        }
                        onHandleReachedEnd={onHandleReachedEnd}
                    />
                </ContentInner>
            </>
            <>
                <Filters
                    className={classNames(classes.section, classes.filtersWrapper)}
                    filters={closedPortalsListingsFilters}
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
