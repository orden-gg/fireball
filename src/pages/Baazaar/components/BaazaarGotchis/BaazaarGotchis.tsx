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
import { Gotchi } from 'components/Gotchi/Gotchi';
import { GotchiIcon } from 'components/Icons/Icons';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { GraphFiltersUtils, RouteUtils } from 'utils';

import { GotchiListingsFilterTypes } from '../../constants';
import { GotchiListingVM, GotchiListingsFilters } from '../../models';
import { gotchisListingsSortings } from '../../static/sortings';

import * as fromBaazaarStore from '../../store';

import { styles } from './styles';

export function BaazaarGotchis() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(
        location.search,
        { arrayFormat: 'comma' }
    ) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

    const dispatch = useAppDispatch();
    const gotchiListings: GotchiListingVM[] = useAppSelector(fromBaazaarStore.getGotchisListings);
    const isGotchisListingsInitialDataLoading: boolean = useAppSelector(fromBaazaarStore.getIsGotchisListingsInitialDataLoading);
    const isGotchisListingsLoading: boolean = useAppSelector(fromBaazaarStore.getIsGotchisListingsLoading);
    const gotchisListingsGraphQueryParams: GraphQueryParams = useAppSelector(fromBaazaarStore.getGotchisListingsGraphQueryParams);
    const gotchisListingsFilters: GotchiListingsFilters = useAppSelector(fromBaazaarStore.getGotchisListingsFilters);
    const gotchisDefaultListingsSorting: SortingItem = useAppSelector(fromBaazaarStore.getGotchisDefaultListingsSorting);
    const gotchisListingsSorting: SortingItem = useAppSelector(fromBaazaarStore.getGotchisListingsSorting);
    const gotchisListingsLimitPerLoad: number = useAppSelector(fromBaazaarStore.getGotchisListingsLimitPerLoad);
    const gotchisListingsQueryParamsOrder: string[] = useAppSelector(fromBaazaarStore.getGotchisListingsQueryParamsOrder);

    useEffect(() => {
        const updatedFilters: GotchiListingsFilters =
            GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, { ...gotchisListingsFilters });
        dispatch(fromBaazaarStore.setGotchisListingsFilters(updatedFilters));

        const { sort, dir } = queryParams as CustomParsedQuery<GraphFiltersQueryParamTypes>;

        if (sort && dir) {
            const key: Undefinable<string> = gotchisListingsSortings
                .find((sorting: SortingListItem) => sorting.paramKey === sort)?.key;

            if (key) {
                onSortingChange(key, dir as string);
            }
        }

        return () => {
            dispatch(fromBaazaarStore.resetGotchiListingsData());
        };
    }, []);

    useEffect(() => {
        let params: CustomParsedQuery<GraphFiltersQueryParamTypes> =
            GraphFiltersUtils.getFiltersQueryParams(queryParams, { ...gotchisListingsFilters });

        const paramKey: Undefinable<string> = gotchisListingsSortings
            .find(sorting => sorting.key === gotchisListingsSorting.type)?.paramKey;

        if (paramKey) {
            if (
                gotchisListingsSorting.dir === gotchisDefaultListingsSorting.dir &&
                gotchisListingsSorting.type === gotchisDefaultListingsSorting.type
            ) {
                delete params['sort'];
                delete params['dir'];

                params = { ...params };
            } else {
                params = { ...params, sort: paramKey, dir: gotchisListingsSorting.dir };
            }
        }

        RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, gotchisListingsQueryParamsOrder);

        dispatch(fromBaazaarStore.onLoadBaazaarGotchisListings());
    }, [gotchisListingsFilters, gotchisListingsSorting]);

    useEffect(() => {
        dispatch(fromBaazaarStore.setGotchisListingsIsFiltersUpdated(true));
    }, [gotchisListingsFilters]);

    useEffect(() => {
        dispatch(fromBaazaarStore.setGotchisListingsIsSortingUpdated(true));
    }, [gotchisListingsSorting]);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(fromBaazaarStore.setGotchisListingsSorting({ type: sortBy, dir: sortDir }));
    };

    const onHandleReachedEnd = (): void => {
        const skipLimit: number = gotchisListingsGraphQueryParams.skip + gotchisListingsLimitPerLoad;

        if (skipLimit <= gotchiListings.length) {
            dispatch(fromBaazaarStore.setGotchisListingsSkipLimit(skipLimit));
            dispatch(fromBaazaarStore.loadBaazaarGotchisListings());
        }
    };

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        dispatch(fromBaazaarStore.updateGotchiListingsFilterByKey(
            { key, value } as { key: GotchiListingsFilterTypes, value: GraphFiltersValueTypes })
        );
    };

    const onResetFilters = useCallback(() => {
        dispatch(fromBaazaarStore.resetGotchiListingsFilters());
    }, []);

    return (
        <ContentWrapper paddingZero>
            <>
                <SortFilterPanel
                    sorting={{
                        sortingList: gotchisListingsSortings,
                        sortingDefaults: gotchisListingsSorting,
                        onSortingChange: onSortingChange
                    }}
                    itemsLength={gotchiListings.length}
                    placeholder={
                        <GotchiIcon width={20} height={20} />
                    }
                    isPanelDisabled={isGotchisListingsLoading}
                />
                <ContentInner dataLoading={isGotchisListingsInitialDataLoading} offset={257}>
                    <ItemsLazy
                        items={gotchiListings}
                        component={(gotchiListing: GotchiListingVM) =>
                            <Gotchi
                                gotchi={gotchiListing.gotchi}
                                renderSvgByStats={true}
                                render={[
                                    {
                                        className: 'gotchiHeader',
                                        items: [
                                            'collateral',
                                            'kinship',
                                            'level'
                                        ]
                                    },
                                    {
                                        className: 'imageContainer',
                                        items: [
                                            'svg',
                                            {
                                                className: 'rsContainer',
                                                items: ['rs', 'skillpoints']
                                            }
                                        ]
                                    },
                                    'name',
                                    'traits',
                                    {
                                        className: 'gotchiBadges',
                                        items: ['badges']
                                    },
                                    'wearablesLine',
                                    'listing'
                                ]}
                            />
                        }
                        onHandleReachedEnd={onHandleReachedEnd}
                    />
                </ContentInner>
            </>
            <div className={classes.sidebar}>
                <Filters
                    className={classNames(classes.section, classes.filtersWrapper)}
                    filters={gotchisListingsFilters}
                    onSetSelectedFilters={onSetSelectedFilters}
                    isFiltersDisabled={isGotchisListingsLoading}
                />

                <div className={classes.buttonsWrapper}>
                    <Button
                        variant='contained'
                        color='warning'
                        size='small'
                        onClick={onResetFilters}
                        disabled={isGotchisListingsLoading}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </ContentWrapper>
    );
}
