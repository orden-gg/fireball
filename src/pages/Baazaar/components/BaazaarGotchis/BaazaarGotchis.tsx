import { useCallback, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { GraphFiltersValueTypes, SortingItem } from 'shared/models';
import { BaazaarGotchiListingVM } from 'pages/Baazaar/models';
import {
    getBaazaarGotchiListings,
    getGotchiListingsFilters,
    getGotchiListingsGraphQueryParams,
    getGotchiListingsSorting,
    getListingsLimitPerLoad,
    GraphQueryParams,
    loadBaazaarGotchiListings,
    resetGotchiListingsFilters,
    setSkipLimit,
    updateGotchiListingsFilterByKey,
    updateGotchiListingsSorting
} from 'pages/Baazaar/store';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { GotchiIcon } from 'components/Icons/Icons';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { Aavegotchi } from 'pages/BaazaarOld/components/BaazaarSidebar/components/ItemTypes/Aavegotchi';
import { sortings } from 'pages/Baazaar/static';

import { styles } from './styles';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { Button } from '@mui/material';
import classNames from 'classnames';
import { GotchiListingsFilterTypes } from 'pages/Baazaar/constants';

export function BaazaarGotchis() {
    const classes = styles();

    const dispatch = useAppDispatch();
    const baazaarGotchiListings: BaazaarGotchiListingVM[] = useAppSelector(getBaazaarGotchiListings);
    const gotchiListingsGraphQueryParams: GraphQueryParams = useAppSelector(getGotchiListingsGraphQueryParams);
    const gotchiListingsSorting: SortingItem = useAppSelector(getGotchiListingsSorting);
    const gotchiListingsFilters: any = useAppSelector(getGotchiListingsFilters);
    const listingsLimitPerLoad: number = useAppSelector(getListingsLimitPerLoad);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(updateGotchiListingsSorting({ type: sortBy, dir: sortDir }));
    };

    useEffect(() => {
        dispatch(loadBaazaarGotchiListings());
    }, []);

    const onHandleEndReached = (): void => {
        dispatch(setSkipLimit(gotchiListingsGraphQueryParams.skip + listingsLimitPerLoad));

        dispatch(loadBaazaarGotchiListings());
    };

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        // TODO fix `as` in the future
        dispatch(updateGotchiListingsFilterByKey({ key, value } as { key: GotchiListingsFilterTypes, value: GraphFiltersValueTypes }));
    };

    const onResetFilters = useCallback(() => {
        dispatch(resetGotchiListingsFilters());
    }, []);

    return (
        <ContentWrapper>
            <>
                <SortFilterPanel
                    sorting={{
                        sortingList: sortings,
                        sortingDefaults: gotchiListingsSorting,
                        onSortingChange: onSortingChange
                    }}
                    itemsLength={baazaarGotchiListings.length}
                    placeholder={
                        <GotchiIcon width={20} height={20} />
                    }
                />
                <ContentInner dataLoading={false}>
                    <ItemsLazy
                        items={baazaarGotchiListings}
                        component={(gotchiListing: BaazaarGotchiListingVM) => <Aavegotchi item={gotchiListing} />}
                        onHandleEndReached={onHandleEndReached}
                    />
                </ContentInner>
            </>
            <>
                <Filters
                    className={classNames(classes.section, classes.filtersWrapper)}
                    filters={gotchiListingsFilters}
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
