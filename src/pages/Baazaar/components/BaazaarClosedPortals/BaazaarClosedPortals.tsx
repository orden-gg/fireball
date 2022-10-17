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
import { CardERC721Listing, CardGroup, CardName, CardPortalImage, CardSlot } from 'components/ItemCard/components';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { H1SealedPortalIcon } from 'components/Icons/Icons';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { GraphFiltersUtils, RouteUtils } from 'utils';

import { ClosedPortalListingFilterTypes } from '../../constants';
import { ClosedPortalListingFilters, ClosedPortalListingVM } from '../../models';
import {
    getClosedPortalsListings,
    getClosedPortalsListingsFilters,
    getClosedPortalsListingsGraphQueryParams,
    getClosedPortalsListingsLimitPerLoad,
    getClosedPortalsListingsDefaultSorting,
    getClosedPortalsListingsSorting,
    getClosedPortalsListingsQueryParamsOrder,
    onLoadBaazaarClosedPortalsListings,
    loadBaazaarClosedPortalsListings,
    resetClosedPortalsData,
    resetClosedPortalsListingsFilters,
    setClosedPortalsListingsSkipLimit,
    setClosedPortalsListingsSorting,
    setClosedPortalsListingsIsSortingUpdated,
    setClosedPortalsListingsFilters,
    setClosedPortalsListingsIsFiltersUpdated,
    updateClosedPortalsListingsFilterByKey
} from '../../store';
import { closedPortalsListingsSortings } from '../../static/sortings';

import { styles } from './styles';

export function BaazaarClosedPortals() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(
        location.search,
        { arrayFormat: 'comma' }
    ) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

    const dispatch = useAppDispatch();
    const closedPortalsListings: ClosedPortalListingVM[] = useAppSelector(getClosedPortalsListings);
    const closedPortalsListingsGraphQueryParams: GraphQueryParams = useAppSelector(getClosedPortalsListingsGraphQueryParams);
    const closedPortalsListingsDefaultSorting: SortingItem = useAppSelector(getClosedPortalsListingsDefaultSorting);
    const closedPortalsListingsSorting: SortingItem = useAppSelector(getClosedPortalsListingsSorting);
    const closedPortalsListingsFilters: ClosedPortalListingFilters = useAppSelector(getClosedPortalsListingsFilters);
    const closedPortalsListingsLimitPerLoad: number = useAppSelector(getClosedPortalsListingsLimitPerLoad);
    const closedPortalsListingsQueryParamsOrder: string[] = useAppSelector(getClosedPortalsListingsQueryParamsOrder);

    useEffect(() => {
        const updatedFilters: ClosedPortalListingFilters =
            GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, { ...closedPortalsListingsFilters });
        dispatch(setClosedPortalsListingsFilters(updatedFilters));

        const { sort, dir } = queryParams;

        if (sort && dir) {
            const key: Undefinable<string> = closedPortalsListingsSortings
                .find((sorting: SortingListItem) => sorting.paramKey === sort)?.key;

            if (key) {
                onSortingChange(key, dir as string);
            }
        }

        return () => {
            dispatch(resetClosedPortalsData());
        };
    }, []);

    useEffect(() => {
        let params: CustomParsedQuery<GraphFiltersQueryParamTypes> =
            GraphFiltersUtils.getFiltersQueryParams(queryParams, { ...closedPortalsListingsFilters });

        const paramKey: Undefinable<string> = closedPortalsListingsSortings
            .find(sorting => sorting.key === closedPortalsListingsSorting.type)?.paramKey;



            if (paramKey) {
                if (
                    closedPortalsListingsSorting.dir === closedPortalsListingsDefaultSorting.dir &&
                    closedPortalsListingsSorting.type === closedPortalsListingsDefaultSorting.type
                ) {
                    delete params['sort'];
                    delete params['dir'];

                    params = { ...params };
                } else {
                    params = { ...params, sort: paramKey, dir: closedPortalsListingsSorting.dir };
                }
            }

        RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, closedPortalsListingsQueryParamsOrder);

        dispatch(onLoadBaazaarClosedPortalsListings());
    }, [closedPortalsListingsFilters, closedPortalsListingsSorting]);

    useEffect(() => {
        dispatch(setClosedPortalsListingsIsFiltersUpdated(true));
    }, [closedPortalsListingsFilters]);

    useEffect(() => {
        dispatch(setClosedPortalsListingsIsSortingUpdated(true));
    }, [closedPortalsListingsSorting]);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(setClosedPortalsListingsSorting({ type: sortBy, dir: sortDir }));
    };

    const onHandleReachedEnd = (): void => {
        const skipLimit: number = closedPortalsListingsGraphQueryParams.skip + closedPortalsListingsLimitPerLoad;

        if (skipLimit <= closedPortalsListings.length) {
            dispatch(setClosedPortalsListingsSkipLimit(closedPortalsListingsGraphQueryParams.skip + closedPortalsListingsLimitPerLoad));
            dispatch(loadBaazaarClosedPortalsListings());
        }
    };

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
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
                        component={(portalListing: ClosedPortalListingVM) =>
                            <div className={classes.listItem} key={portalListing.tokenId}>
                                <ItemCard type={`haunt${portalListing.hauntId}`} id={portalListing.id} category={portalListing.category}>
                                    <CardGroup name='body'>
                                        <CardSlot>{`Haunt ${portalListing.hauntId}`}</CardSlot>
                                        <CardPortalImage category={portalListing.category} hauntId={portalListing.hauntId} />
                                        <CardName>{`Portal ${portalListing.tokenId}`}</CardName>
                                    </CardGroup>
                                    <CardGroup name='footer'>
                                        <CardERC721Listing
                                            activeListing={portalListing.id}
                                            listings={portalListing.listings}
                                            historicalPrices={portalListing.historicalPrices}
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
