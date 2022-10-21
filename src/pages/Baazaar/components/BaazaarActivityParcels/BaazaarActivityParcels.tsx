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
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { KekIcon } from 'components/Icons/Icons';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { Parcel } from 'components/Items/Parcel/Parcel';
import { GraphFiltersUtils, RouteUtils } from 'utils';

import { ActivityParcelListingFilterTypes } from '../../constants';
import { ActivityParcelListingFilters, ActivityParcelListingVM } from '../../models';

import * as fromBaazaarStore from '../../store';

import { styles } from './styles';

export function BaazaarActivityParcels() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(
        location.search,
        { arrayFormat: 'comma' }
    ) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

    const dispatch = useAppDispatch();
    const activityParcelsListings: ActivityParcelListingVM[] = useAppSelector(fromBaazaarStore.getActivityParcelsListings);
    const isActivityParcelsListingsInitialDataLoading: boolean =
        useAppSelector(fromBaazaarStore.getIsActivityParcelsListingsInitialDataLoading);
    const isActivityParcelsListingsLoading: boolean = useAppSelector(fromBaazaarStore.getIsActivityParcelsListingsLoading);
    const activityParcelsListingsFilters: ActivityParcelListingFilters =
        useAppSelector(fromBaazaarStore.getActivityParcelsListingsFilters);
    const activityParcelsListingsQueryParamsOrder: string[] = useAppSelector(fromBaazaarStore.getActivityParcelsListingsQueryParamsOrder);

    useEffect(() => {
        const updatedFilters: ActivityParcelListingFilters =
            GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, { ...activityParcelsListingsFilters });
        dispatch(fromBaazaarStore.setActivityParcelsListingsFilters(updatedFilters));

        return () => {
            dispatch(fromBaazaarStore.resetActivityParcelsData());
        };
    }, []);

    useEffect(() => {
        const params: CustomParsedQuery<GraphFiltersQueryParamTypes> =
            GraphFiltersUtils.getFiltersQueryParams(queryParams, { ...activityParcelsListingsFilters });

        RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, activityParcelsListingsQueryParamsOrder);

        dispatch(fromBaazaarStore.onLoadBaazaarActivityParcelsListings());
    }, [activityParcelsListingsFilters]);

    useEffect(() => {
        dispatch(fromBaazaarStore.setActivityParcelsListingsIsFiltersUpdated(true));
    }, [activityParcelsListingsFilters]);

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        dispatch(fromBaazaarStore.updateActivityParcelsListingsFilterByKey(
            { key, value } as { key: ActivityParcelListingFilterTypes, value: GraphFiltersValueTypes }
        ));
    };

    const onResetFilters = useCallback(() => {
        dispatch(fromBaazaarStore.resetActivityParcelsListingsFilters());
    }, []);

    return (
        <ContentWrapper paddingZero>
            <>
                {
                    <div className={classes.results}>
                        <span>{activityParcelsListings.length}</span>
                        <span className={classes.placeholder}>
                            <KekIcon width={20} height={20} />
                        </span>
                    </div>
                }
                <ContentInner dataLoading={isActivityParcelsListingsInitialDataLoading} offset={257}>
                    <ItemsLazy
                        items={activityParcelsListings}
                        component={(parcelListing: ActivityParcelListingVM) => <Parcel parcel={parcelListing} />}
                    />
                </ContentInner>
            </>
            <div className={classes.sidebar}>
                <Filters
                    className={classNames(classes.section, classes.filtersWrapper)}
                    filters={activityParcelsListingsFilters}
                    onSetSelectedFilters={onSetSelectedFilters}
                    isFiltersDisabled={isActivityParcelsListingsLoading}
                />

                <div className={classes.buttonsWrapper}>
                    <Button
                        variant='contained'
                        color='warning'
                        size='small'
                        onClick={onResetFilters}
                        disabled={isActivityParcelsListingsLoading}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </ContentWrapper>
    );
}
