import { useCallback, useEffect } from 'react';
import { Button } from '@mui/material';

import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { Aavegotchi } from 'pages/BaazaarOld/components/BaazaarSidebar/components/ItemTypes/Aavegotchi';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { GotchiIcon } from 'components/Icons/Icons';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';


import { GotchiListingsFilterTypes } from '../../constants';
import { GotchiListingVM, GotchiListingsFilters } from '../../models';
import {
    getGotchisListings,
    getGotchisListingsFilters,
    getGotchisListingsGraphQueryParams,
    getGotchisListingsSorting,
    getGotchisListingsLimitPerLoad,
    loadBaazaarGotchiListings,
    resetGotchiListingsData,
    resetGotchiListingsFilters,
    setGotchisListingsSkipLimit,
    updateGotchiListingsFilterByKey,
    updateGotchiListingsSorting
} from '../../store';
import { gotchiListingsSortings } from '../../static';

import { styles } from './styles';

export function BaazaarGotchis() {
    const classes = styles();

    const dispatch = useAppDispatch();
    const gotchiListings: GotchiListingVM[] = useAppSelector(getGotchisListings);
    const gotchisListingsGraphQueryParams: GraphQueryParams = useAppSelector(getGotchisListingsGraphQueryParams);
    const gotchisListingsSorting: SortingItem = useAppSelector(getGotchisListingsSorting);
    const gotchisListingsFilters: GotchiListingsFilters = useAppSelector(getGotchisListingsFilters);
    const listingsLimitPerLoad: number = useAppSelector(getGotchisListingsLimitPerLoad);

    useEffect(() => {
        dispatch(loadBaazaarGotchiListings());

        return () => {
            dispatch(resetGotchiListingsData());
        };
    }, []);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(updateGotchiListingsSorting({ type: sortBy, dir: sortDir }));
    };

    const onHandleReachedEnd = (): void => {
        dispatch(setGotchisListingsSkipLimit(gotchisListingsGraphQueryParams.skip + listingsLimitPerLoad));

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
                        sortingList: gotchiListingsSortings,
                        sortingDefaults: gotchisListingsSorting,
                        onSortingChange: onSortingChange
                    }}
                    itemsLength={gotchiListings.length}
                    placeholder={
                        <GotchiIcon width={20} height={20} />
                    }
                />
                <ContentInner dataLoading={false}>
                    <ItemsLazy
                        items={gotchiListings}
                        component={(gotchiListing: GotchiListingVM) => <Aavegotchi item={gotchiListing} />}
                        onHandleReachedEnd={onHandleReachedEnd}
                    />
                </ContentInner>
            </>
            <>
                <Filters
                    className={classNames(classes.section, classes.filtersWrapper)}
                    filters={gotchisListingsFilters}
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
