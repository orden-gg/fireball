import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import classNames from 'classnames';
import { DateTime } from 'luxon';
import qs from 'query-string';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import {
    CustomParsedQuery,
    GraphFiltersQueryParamTypes,
    GraphFiltersValueTypes
} from 'shared/models';
import { CardERC721Listing, CardGroup, CardName, CardPortalImage, CardSlot } from 'components/ItemCard/components';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { EthAddress } from 'components/EthAddress/EthAddress';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { H1SealedPortalIcon } from 'components/Icons/Icons';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { GraphFiltersUtils, RouteUtils } from 'utils';

import { ActivityPortalListingFilterTypes } from '../../constants';
import { ActivityPortalListingFilters, ActivityPortalListingVM } from '../../models';

import * as fromBaazaarStore from '../../store';

import { styles } from './styles';

export function BaazaarActivityPortals() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(
        location.search,
        { arrayFormat: 'comma' }
    ) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

    const dispatch = useAppDispatch();
    const activityPortalsListings: ActivityPortalListingVM[] = useAppSelector(fromBaazaarStore.getActivityPortalsListings);
    const isActivityPortalsListingsInitialDataLoading: boolean =
        useAppSelector(fromBaazaarStore.getIsActivityPortalsListingsInitialDataLoading);
    const isActivityPortalsListingsLoading: boolean = useAppSelector(fromBaazaarStore.getIsActivityPortalsListingsLoading);
    const activityPortalsListingsFilters: ActivityPortalListingFilters =
        useAppSelector(fromBaazaarStore.getActivityPortalsListingsFilters);
    const activityPortalsListingsQueryParamsOrder: string[] = useAppSelector(fromBaazaarStore.getActivityPortalsListingsQueryParamsOrder);

    useEffect(() => {
        const updatedFilters: ActivityPortalListingFilters =
            GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, { ...activityPortalsListingsFilters });
        dispatch(fromBaazaarStore.setActivityPortalsListingsFilters(updatedFilters));

        return () => {
            dispatch(fromBaazaarStore.resetActivityPortalsData());
        };
    }, []);

    useEffect(() => {
        const params: CustomParsedQuery<GraphFiltersQueryParamTypes> =
            GraphFiltersUtils.getFiltersQueryParams(queryParams, { ...activityPortalsListingsFilters });

        RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, activityPortalsListingsQueryParamsOrder);

        dispatch(fromBaazaarStore.onLoadBaazaarActivityPortalsListings());
    }, [activityPortalsListingsFilters]);

    useEffect(() => {
        dispatch(fromBaazaarStore.setActivityPortalsListingsIsFiltersUpdated(true));
    }, [activityPortalsListingsFilters]);

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        dispatch(fromBaazaarStore.updateActivityPortalsListingsFilterByKey(
            { key, value } as { key: ActivityPortalListingFilterTypes, value: GraphFiltersValueTypes }
        ));
    };

    const onResetFilters = useCallback(() => {
        dispatch(fromBaazaarStore.resetActivityPortalsListingsFilters());
    }, []);

    return (
        <ContentWrapper paddingZero>
            <>
                {
                    <div className={classes.results}>
                        <span>{activityPortalsListings.length}</span>
                        <span className={classes.placeholder}>
                            <H1SealedPortalIcon width={20} height={20} />
                        </span>
                    </div>
                }
                <ContentInner dataLoading={isActivityPortalsListingsInitialDataLoading}>
                    <ItemsLazy
                        items={activityPortalsListings}
                        component={(portalListing: ActivityPortalListingVM) =>
                            <div className={classes.listItem} key={portalListing.tokenId}>
                                <ItemCard type={`haunt${portalListing.hauntId}`} id={portalListing.id} category={portalListing.category}>
                                    <CardGroup name='body'>
                                        <CardSlot>{`Haunt ${portalListing.hauntId}`}</CardSlot>
                                        <CardPortalImage category={portalListing.category} hauntId={portalListing.hauntId} />
                                        <CardName>{`Portal ${portalListing.tokenId}`}</CardName>
                                        <EthAddress
                                            address={portalListing.seller}
                                            isShowIcon
                                            isCopyButton
                                            isPolygonButton
                                            isClientLink
                                        />
                                        <EthAddress
                                            address={portalListing.buyer}
                                            isShowIcon
                                            isCopyButton
                                            isPolygonButton
                                            isClientLink
                                        />
                                        <div className={classes.purchasedDate}>
                                            {DateTime.fromSeconds(parseInt(portalListing.timePurchased)).toRelative()}
                                        </div>
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
                    />
                </ContentInner>
            </>
            <div className={classes.sidebar}>
                <Filters
                    className={classNames(classes.section, classes.filtersWrapper)}
                    filters={activityPortalsListingsFilters}
                    onSetSelectedFilters={onSetSelectedFilters}
                    isFiltersDisabled={isActivityPortalsListingsLoading}
                />

                <div className={classes.buttonsWrapper}>
                    <Button
                        variant='contained'
                        color='warning'
                        size='small'
                        onClick={onResetFilters}
                        disabled={isActivityPortalsListingsLoading}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </ContentWrapper>
    );
}
