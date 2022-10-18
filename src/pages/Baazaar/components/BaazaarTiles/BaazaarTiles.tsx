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
import { CardImage } from 'shared/components/CardImage/CardImage';
import { CardListing } from 'shared/components/CardListing/CardListing';
import { CardBalance, CardCraftLink, CardGroup, CardName } from 'components/ItemCard/components';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { PurpleGrassIcon } from 'components/Icons/Icons';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { GraphFiltersUtils, RouteUtils } from 'utils';

import { TileListingFilterTypes } from '../../constants';
import { TileListingFilters, TileListingVM } from '../../models';
import {
    getTilesListings,
    getTilesListingsFilters,
    getTilesListingsGraphQueryParams,
    getTilesListingsLimitPerLoad,
    getTilesListingsDefaultSorting,
    getTilesListingsSorting,
    getTilesListingsQueryParamsOrder,
    onLoadBaazaarTilesListings,
    loadBaazaarTilesListings,
    resetTilesListingsData,
    resetTilesListingsFilters,
    setTilesListingsSkipLimit,
    setTilesListingsSorting,
    setTilesListingsIsSortingUpdated,
    setTilesListingsFilters,
    setTilesListingsIsFiltersUpdated,
    updateTilesListingsFilterByKey
} from '../../store';
import { tilesListingsSortings } from '../../static/sortings';

import { styles } from './styles';

export function BaazaarTiles() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(
        location.search,
        { arrayFormat: 'comma' }
    ) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

    const dispatch = useAppDispatch();
    const tilesListings: TileListingVM[] = useAppSelector(getTilesListings);
    const tilesListingsGraphQueryParams: GraphQueryParams = useAppSelector(getTilesListingsGraphQueryParams);
    const tilesListingsDefaultSorting: SortingItem = useAppSelector(getTilesListingsDefaultSorting);
    const tilesListingsSorting: SortingItem = useAppSelector(getTilesListingsSorting);
    const tilesListingsFilters: TileListingFilters = useAppSelector(getTilesListingsFilters);
    const tilesListingsLimitPerLoad: number = useAppSelector(getTilesListingsLimitPerLoad);
    const tilesListingsQueryParamsOrder: string[] = useAppSelector(getTilesListingsQueryParamsOrder);

    useEffect(() => {
        const updatedFilters: TileListingFilters =
            GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, { ...tilesListingsFilters });
        dispatch(setTilesListingsFilters(updatedFilters));

        const { sort, dir } = queryParams;

        if (sort && dir) {
            const key: Undefinable<string> = tilesListingsSortings
                .find((sorting: SortingListItem) => sorting.paramKey === sort)?.key;

            if (key) {
                onSortingChange(key, dir as string);
            }
        }

        return () => {
            dispatch(resetTilesListingsData());
        };
    }, []);

    useEffect(() => {
        let params: CustomParsedQuery<GraphFiltersQueryParamTypes> =
            GraphFiltersUtils.getFiltersQueryParams(queryParams, { ...tilesListingsFilters });

        const paramKey: Undefinable<string> = tilesListingsSortings
            .find(sorting => sorting.key === tilesListingsSorting.type)?.paramKey;

        if (paramKey) {
            if (
                tilesListingsSorting.dir === tilesListingsDefaultSorting.dir &&
                tilesListingsSorting.type === tilesListingsDefaultSorting.type
            ) {
                delete params['sort'];
                delete params['dir'];

                params = { ...params };
            } else {
                params = { ...params, sort: paramKey, dir: tilesListingsSorting.dir };
            }
        }

        RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, tilesListingsQueryParamsOrder);

        dispatch(onLoadBaazaarTilesListings());
    }, [tilesListingsFilters, tilesListingsSorting]);

    useEffect(() => {
        dispatch(setTilesListingsIsFiltersUpdated(true));
    }, [tilesListingsFilters]);

    useEffect(() => {
        dispatch(setTilesListingsIsSortingUpdated(true));
    }, [tilesListingsSorting]);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(setTilesListingsSorting({ type: sortBy, dir: sortDir }));
    };

    const onHandleReachedEnd = (): void => {
        const skipLimit: number = tilesListingsGraphQueryParams.skip + tilesListingsLimitPerLoad;

        if (skipLimit <= tilesListings.length) {
            dispatch(setTilesListingsSkipLimit(skipLimit));
            dispatch(loadBaazaarTilesListings());
        }
    };

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        dispatch(updateTilesListingsFilterByKey({ key, value } as { key: TileListingFilterTypes, value: GraphFiltersValueTypes }));
    };

    const onResetFilters = useCallback(() => {
        dispatch(resetTilesListingsFilters());
    }, []);

    return (
        <ContentWrapper paddingZero>
            <>
                <SortFilterPanel
                    sorting={{
                        sortingList: tilesListingsSortings,
                        sortingDefaults: tilesListingsSorting,
                        onSortingChange: onSortingChange
                    }}
                    itemsLength={tilesListings.length}
                    placeholder={
                        <PurpleGrassIcon width={20} height={20} />
                    }
                />
                <ContentInner dataLoading={false} offset={257}>
                    <ItemsLazy
                        items={tilesListings}
                        component={(installationListing: TileListingVM) =>
                            <ItemCard id={installationListing.id} category={installationListing.category} type={'drop'}>
                                <CardGroup name='header'>
                                    {!installationListing.isDeprecated ? <CardCraftLink name={installationListing.name} /> : <></>}
                                    <CardBalance balance={installationListing.quantity} />
                                </CardGroup>
                                <CardGroup name='body'>
                                    <CardImage src={installationListing.imageSrcUrl} alt={installationListing.name} />
                                    <CardName>{installationListing.name}</CardName>
                                </CardGroup>
                                <CardGroup name='footer'>
                                    <CardListing
                                        currentListing={installationListing.currentListing}
                                        lastSoldListing={installationListing.lastSoldListing}
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
                    filters={tilesListingsFilters}
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
            </div>
        </ContentWrapper>
    );
}
