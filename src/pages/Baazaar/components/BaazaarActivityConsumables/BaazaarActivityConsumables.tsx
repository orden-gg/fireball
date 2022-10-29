import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import classNames from 'classnames';
import qs from 'query-string';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import {
    CustomParsedQuery,
    GraphFiltersQueryParamTypes,
    GraphFiltersValueTypes
} from 'shared/models';
import { CardBalance, CardGroup, CardImage, CardName, CardSalesHistory } from 'components/ItemCard/components';
import { CardListing } from 'shared/components/CardListing/CardListing';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { ConsumableIcon } from 'components/Icons/Icons';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { GraphFiltersUtils, RouteUtils } from 'utils';

import { ActivityConsumableListingFilterTypes } from '../../constants';
import { ActivityConsumableListingFilters, ActivityConsumableListingVM } from '../../models';

import * as fromBaazaarStore from '../../store';

import { styles } from './styles';

export function BaazaarActivityConsumables() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(
        location.search,
        { arrayFormat: 'comma' }
    ) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

    const dispatch = useAppDispatch();
    const activityConsumablesListings: ActivityConsumableListingVM[] = useAppSelector(fromBaazaarStore.getActivityConsumablesListings);
    const isActivityConsumablesListingsInitialDataLoading: boolean =
        useAppSelector(fromBaazaarStore.getIsActivityConsumablesListingsInitialDataLoading);
    const isActivityConsumablesListingsLoading: boolean = useAppSelector(fromBaazaarStore.getIsActivityConsumablesListingsLoading);
    const activityConsumablesListingsFilters: ActivityConsumableListingFilters =
        useAppSelector(fromBaazaarStore.getActivityConsumablesListingsFilters);
    const activityConsumablesListingsQueryParamsOrder: string[] = useAppSelector(fromBaazaarStore.getActivityConsumablesListingsQueryParamsOrder);

    useEffect(() => {
        const updatedFilters: ActivityConsumableListingFilters =
            GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, { ...activityConsumablesListingsFilters });
        dispatch(fromBaazaarStore.setActivityConsumablesListingsFilters(updatedFilters));

        return () => {
            dispatch(fromBaazaarStore.resetActivityConsumablesData());
        };
    }, []);

    useEffect(() => {
        const params: CustomParsedQuery<GraphFiltersQueryParamTypes> =
            GraphFiltersUtils.getFiltersQueryParams(queryParams, { ...activityConsumablesListingsFilters });

        RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, activityConsumablesListingsQueryParamsOrder);

        dispatch(fromBaazaarStore.onLoadBaazaarActivityConsumablesListings());
    }, [activityConsumablesListingsFilters]);

    useEffect(() => {
        dispatch(fromBaazaarStore.setActivityConsumablesListingsIsFiltersUpdated(true));
    }, [activityConsumablesListingsFilters]);

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        dispatch(fromBaazaarStore.updateActivityConsumablesListingsFilterByKey(
            { key, value } as { key: ActivityConsumableListingFilterTypes, value: GraphFiltersValueTypes }
        ));
    };

    const onResetFilters = useCallback(() => {
        dispatch(fromBaazaarStore.resetActivityConsumablesListingsFilters());
    }, []);

    return (
        <ContentWrapper paddingZero>
            <>
                {
                    <div className={classes.results}>
                        <span>{activityConsumablesListings.length}</span>
                        <span className={classes.placeholder}>
                            <ConsumableIcon width={20} height={20} />
                        </span>
                    </div>
                }
                <ContentInner dataLoading={isActivityConsumablesListingsInitialDataLoading}>
                    <ItemsLazy
                        items={activityConsumablesListings}
                        component={(consumableListing: ActivityConsumableListingVM) =>
                            <ItemCard type={consumableListing.rarity} id={consumableListing.id} category={consumableListing.category}>
                                <CardGroup name='header'>
                                    <CardBalance balance={`${consumableListing.quantity}`} holders={[]} />
                                </CardGroup>
                                <CardGroup name='body'>
                                    <CardImage id={consumableListing.erc1155TypeId} />
                                    <CardName children={consumableListing.name} />
                                    <CardSalesHistory
                                        className={classes.history}
                                        listing={{
                                            seller: consumableListing.seller,
                                            buyer: consumableListing.buyer,
                                            timePurchased: consumableListing.timeLastPurchased
                                        }}
                                    />
                                </CardGroup>
                                <CardGroup name='footer'>
                                    <CardListing
                                        currentListing={consumableListing.currentListing}
                                        lastSoldListing={consumableListing.lastSoldListing}
                                    />
                                </CardGroup>
                            </ItemCard>
                        }
                    />
                </ContentInner>
            </>
            <div className={classes.sidebar}>
                <Filters
                    className={classNames(classes.section, classes.filtersWrapper)}
                    filters={activityConsumablesListingsFilters}
                    onSetSelectedFilters={onSetSelectedFilters}
                    isFiltersDisabled={isActivityConsumablesListingsLoading}
                />

                <div className={classes.buttonsWrapper}>
                    <Button
                        variant='contained'
                        color='warning'
                        size='small'
                        onClick={onResetFilters}
                        disabled={isActivityConsumablesListingsLoading}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </ContentWrapper>
    );
}
