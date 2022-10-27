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
import { Filters } from 'components/Filters/components/Filters/Filters';
import { Gotchi } from 'components/Gotchi/Gotchi';
import { GotchiIcon } from 'components/Icons/Icons';
import { GraphFiltersUtils, RouteUtils } from 'utils';

import { ActivityGotchiListingFilterTypes } from '../../constants';
import { ActivityGotchiListingFilters, ActivityGotchiListingVM } from '../../models';

import * as fromBaazaarStore from '../../store';

import { styles } from './styles';

export function BaazaarActivityGotchis() {
    const classes = styles();

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = qs.parse(
        location.search,
        { arrayFormat: 'comma' }
    ) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

    const dispatch = useAppDispatch();
    const activityGotchisListings: ActivityGotchiListingVM[] = useAppSelector(fromBaazaarStore.getActivityGotchisListings);
    const isActivityGotchisListingsInitialDataLoading: boolean =
        useAppSelector(fromBaazaarStore.getIsActivityGotchisListingsInitialDataLoading);
    const isActivityGotchisListingsLoading: boolean = useAppSelector(fromBaazaarStore.getIsActivityGotchisListingsLoading);
    const activityGotchisListingsFilters: ActivityGotchiListingFilters =
        useAppSelector(fromBaazaarStore.getActivityGotchisListingsFilters);
    const activityGotchisListingsQueryParamsOrder: string[] = useAppSelector(fromBaazaarStore.getActivityGotchisListingsQueryParamsOrder);

    useEffect(() => {
        const updatedFilters: ActivityGotchiListingFilters =
            GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, { ...activityGotchisListingsFilters });
        dispatch(fromBaazaarStore.setActivityGotchisListingsFilters(updatedFilters));

        return () => {
            dispatch(fromBaazaarStore.resetActivityGotchisData());
        };
    }, []);

    useEffect(() => {
        const params: CustomParsedQuery<GraphFiltersQueryParamTypes> =
            GraphFiltersUtils.getFiltersQueryParams(queryParams, { ...activityGotchisListingsFilters });

        RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, activityGotchisListingsQueryParamsOrder);

        dispatch(fromBaazaarStore.onLoadBaazaarActivityGotchisListings());
    }, [activityGotchisListingsFilters]);

    useEffect(() => {
        dispatch(fromBaazaarStore.setActivityGotchisListingsIsFiltersUpdated(true));
    }, [activityGotchisListingsFilters]);

    const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
        dispatch(fromBaazaarStore.updateActivityGotchisListingsFilterByKey(
            { key, value } as { key: ActivityGotchiListingFilterTypes, value: GraphFiltersValueTypes }
        ));
    };

    const onResetFilters = useCallback(() => {
        dispatch(fromBaazaarStore.resetActivityGotchisListingsFilters());
    }, []);

    return (
        <ContentWrapper paddingZero>
            <>
                {
                    <div className={classes.results}>
                        <span>{activityGotchisListings.length}</span>
                        <span className={classes.placeholder}>
                            <GotchiIcon width={20} height={20} />
                        </span>
                    </div>
                }
                <ContentInner dataLoading={isActivityGotchisListingsInitialDataLoading}>
                    <ItemsLazy
                        items={activityGotchisListings}
                        component={(gotchiListing: ActivityGotchiListingVM) =>
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
                    />
                </ContentInner>
            </>
            <div className={classes.sidebar}>
                <Filters
                    className={classNames(classes.section, classes.filtersWrapper)}
                    filters={activityGotchisListingsFilters}
                    onSetSelectedFilters={onSetSelectedFilters}
                    isFiltersDisabled={isActivityGotchisListingsLoading}
                />

                <div className={classes.buttonsWrapper}>
                    <Button
                        variant='contained'
                        color='warning'
                        size='small'
                        onClick={onResetFilters}
                        disabled={isActivityGotchisListingsLoading}
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </ContentWrapper>
    );
}
