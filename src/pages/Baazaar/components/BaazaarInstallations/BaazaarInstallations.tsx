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
import { AnvilIcon } from 'components/Icons/Icons';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { GraphFiltersUtils, RouteUtils } from 'utils';

import { InstallationListingFilterTypes } from '../../constants';
import { InstallationListingFilters, InstallationListingVM } from '../../models';
import {
    getInstallationsListings,
    getInstallationsListingsFilters,
    getInstallationsListingsGraphQueryParams,
    getInstallationsListingsLimitPerLoad,
    getInstallationsListingsDefaultSorting,
    getInstallationsListingsSorting,
    getInstallationsListingsQueryParamsOrder,
    onLoadBaazaarInstallationsListings,
    loadBaazaarInstallationsListings,
    resetInstallationsListingsData,
    resetInstallationsListingsFilters,
    setInstallationsListingsSkipLimit,
    setInstallationsListingsSorting,
    setInstallationsListingsIsSortingUpdated,
    setInstallationsListingsFilters,
    setInstallationsListingsIsFiltersUpdated,
    updateInstallationsListingsFilterByKey
} from '../../store';
import { installationsListingsSortings } from '../../static/sortings';

import { styles } from './styles';

export function BaazaarInstallations() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(
        location.search,
        { arrayFormat: 'comma' }
    ) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

    const dispatch = useAppDispatch();
    const installationsListings: InstallationListingVM[] = useAppSelector(getInstallationsListings);
    const installationsListingsGraphQueryParams: GraphQueryParams = useAppSelector(getInstallationsListingsGraphQueryParams);
    const installationsListingsDefaultSorting: SortingItem = useAppSelector(getInstallationsListingsDefaultSorting);
    const installationsListingsSorting: SortingItem = useAppSelector(getInstallationsListingsSorting);
    const installationsListingsFilters: InstallationListingFilters = useAppSelector(getInstallationsListingsFilters);
    const installationsListingsLimitPerLoad: number = useAppSelector(getInstallationsListingsLimitPerLoad);
    const installationsListingsQueryParamsOrder: string[] = useAppSelector(getInstallationsListingsQueryParamsOrder);

    useEffect(() => {
        dispatch(loadBaazaarInstallationsListings());

        const updatedFilters: InstallationListingFilters =
            GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, { ...installationsListingsFilters });
        dispatch(setInstallationsListingsFilters(updatedFilters));

        const { sort, dir } = queryParams;

        if (sort && dir) {
            const key: Undefinable<string> = installationsListingsSortings
                .find((sorting: SortingListItem) => sorting.paramKey === sort)?.key;

            if (key) {
                onSortingChange(key, dir as string);
            }
        }

        return () => {
            dispatch(resetInstallationsListingsData());
        };
    }, []);

    useEffect(() => {
        let params: CustomParsedQuery<GraphFiltersQueryParamTypes> =
            GraphFiltersUtils.getFiltersQueryParams(queryParams, { ...installationsListingsFilters });

        const paramKey: Undefinable<string> = installationsListingsSortings
            .find(sorting => sorting.key === installationsListingsSorting.type)?.paramKey;

        if (paramKey) {
            if (
                installationsListingsSorting.dir === installationsListingsDefaultSorting.dir &&
                installationsListingsSorting.type === installationsListingsDefaultSorting.type
            ) {
                delete params['sort'];
                delete params['dir'];

                params = { ...params };
            } else {
                params = { ...params, sort: paramKey, dir: installationsListingsSorting.dir };
            }
        }

        RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, installationsListingsQueryParamsOrder);

        dispatch(onLoadBaazaarInstallationsListings());
    }, [installationsListingsFilters, installationsListingsSorting]);

    useEffect(() => {
        dispatch(setInstallationsListingsIsFiltersUpdated(true));
    }, [installationsListingsFilters]);

    useEffect(() => {
        dispatch(setInstallationsListingsIsSortingUpdated(true));
    }, [installationsListingsSorting]);

    const onSortingChange = (sortBy: string, sortDir: string): void => {
        dispatch(setInstallationsListingsSorting({ type: sortBy, dir: sortDir }));
    };

    const onHandleReachedEnd = (): void => {
        const skipLimit: number = installationsListingsGraphQueryParams.skip + installationsListingsLimitPerLoad;

        if (skipLimit <= installationsListings.length) {
            dispatch(setInstallationsListingsSkipLimit(skipLimit));
            dispatch(loadBaazaarInstallationsListings());
        }
    };

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        dispatch(updateInstallationsListingsFilterByKey(
            { key, value } as { key: InstallationListingFilterTypes, value: GraphFiltersValueTypes })
        );
    };

    const onResetFilters = useCallback(() => {
        dispatch(resetInstallationsListingsFilters());
    }, []);

    return (
        <ContentWrapper paddingZero>
            <>
                <SortFilterPanel
                    sorting={{
                        sortingList: installationsListingsSortings,
                        sortingDefaults: installationsListingsSorting,
                        onSortingChange: onSortingChange
                    }}
                    itemsLength={installationsListings.length}
                    placeholder={
                        <AnvilIcon width={20} height={20} />
                    }
                />
                <ContentInner dataLoading={false} offset={257}>
                    <ItemsLazy
                        items={installationsListings}
                        component={(installationListing: InstallationListingVM) =>
                            <ItemCard id={installationListing.id} category={installationListing.category} type={installationListing.rarity || 'drop'}>
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
                    filters={installationsListingsFilters}
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
