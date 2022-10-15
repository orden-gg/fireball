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
import { Aavegotchi } from 'pages/BaazaarOld/components/BaazaarSidebar/components/ItemTypes/Aavegotchi';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { GotchiIcon } from 'components/Icons/Icons';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { RouteUtils } from 'utils';

import { GotchiListingsFilterTypes } from '../../constants';
import { GotchiListingVM, GotchiListingsFilters } from '../../models';
import {
    getGotchisListings,
    getGotchisListingsFilters,
    getGotchisListingsGraphQueryParams,
    getGotchisListingsSorting,
    getGotchisListingsLimitPerLoad,
    getGotchisListingsQueryParamsOrder,
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

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

    const dispatch = useAppDispatch();
    const gotchiListings: GotchiListingVM[] = useAppSelector(getGotchisListings);
    const gotchisListingsGraphQueryParams: GraphQueryParams = useAppSelector(getGotchisListingsGraphQueryParams);
    const gotchisListingsSorting: SortingItem = useAppSelector(getGotchisListingsSorting);
    const gotchisListingsFilters: GotchiListingsFilters = useAppSelector(getGotchisListingsFilters);
    const gotchisListingsLimitPerLoad: number = useAppSelector(getGotchisListingsLimitPerLoad);
    const gotchisListingsQueryParamsOrder: string[] = useAppSelector(getGotchisListingsQueryParamsOrder);

    useEffect(() => {
        dispatch(loadBaazaarGotchiListings());

        const { sort, dir } = queryParams as CustomParsedQuery;

        if (sort && dir) {
            const key: Undefinable<string> = gotchiListingsSortings
                .find((sorting: SortingListItem) => sorting.paramKey === sort)?.key;

            if (key) {
                onSortingChange(key, dir);
            }
        }

        return () => {
            dispatch(resetGotchiListingsData());
        };
    }, []);

    useEffect(() => {
        const paramKey: Undefinable<string> = gotchiListingsSortings
            .find(sorting => sorting.key === gotchisListingsSorting.type)?.paramKey;

        if (paramKey) {
            updateSortQueryParams(paramKey, gotchisListingsSorting.dir);
        }
    }, [gotchisListingsSorting]);

    const updateSortQueryParams = useCallback((prop: string, dir: string) => {
        const params: QueryParamSortingItem = { ...queryParams, sort: prop, dir };

        RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, gotchisListingsQueryParamsOrder);
    }, [queryParams, navigate, location.pathname]);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(updateGotchiListingsSorting({ type: sortBy, dir: sortDir }));
    };

    const onHandleReachedEnd = (): void => {
        dispatch(setGotchisListingsSkipLimit(gotchisListingsGraphQueryParams.skip + gotchisListingsLimitPerLoad));

        dispatch(loadBaazaarGotchiListings());
    };

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
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
