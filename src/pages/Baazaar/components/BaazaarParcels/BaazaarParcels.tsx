import { useCallback, useEffect } from 'react';
import { Button } from '@mui/material';

import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { GraphFiltersValueTypes, GraphQueryParams, SortingItem } from 'shared/models';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { KekIcon } from 'components/Icons/Icons';
import { Parcel } from 'components/Items/Parcel/Parcel';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { ParcelListingFilterTypes } from '../../constants';
import { ParcelListingVM, ParcelListingFilters } from '../../models';
import {
    getParcelsListings,
    getParcelsListingsFilters,
    getParcelsListingsGraphQueryParams,
    getParcelsListingsSorting,
    getParcelsListingsLimitPerLoad,
    loadBaazaarParcelsListings,
    resetParcelsListingsFilters,
    setParcelsListingsSkipLimit,
    updateParcelsListingsFilterByKey,
    updateParcelsListingsSorting
} from '../../store';
import { parcelsListingsSortings } from '../../static';

import { styles } from './styles';

export function BaazaarParcels() {
    const classes = styles();

    const dispatch = useAppDispatch();
    const parcelsListings: ParcelListingVM[] = useAppSelector(getParcelsListings);
    const parcelsListingsGraphQueryParams: GraphQueryParams = useAppSelector(getParcelsListingsGraphQueryParams);
    const parcelsListingsSorting: SortingItem = useAppSelector(getParcelsListingsSorting);
    const parcelsListingsFilters: ParcelListingFilters = useAppSelector(getParcelsListingsFilters);
    const parcelsListingslistingsLimitPerLoad: number = useAppSelector(getParcelsListingsLimitPerLoad);

    useEffect(() => {
        dispatch(loadBaazaarParcelsListings());
    }, []);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(updateParcelsListingsSorting({ type: sortBy, dir: sortDir }));
    };

    const onHandleReachedEnd = (): void => {
        dispatch(setParcelsListingsSkipLimit(parcelsListingsGraphQueryParams.skip + parcelsListingslistingsLimitPerLoad));

        dispatch(loadBaazaarParcelsListings());
    };

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        // TODO fix `as` in the future
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
