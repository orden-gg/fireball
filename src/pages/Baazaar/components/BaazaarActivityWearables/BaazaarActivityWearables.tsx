import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import classNames from 'classnames';
import qs from 'query-string';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { CustomParsedQuery, GraphFiltersQueryParamTypes, GraphFiltersValueTypes } from 'shared/models';
import {
  CardBalance,
  CardGroup,
  CardImage,
  CardName,
  CardSalesHistory,
  CardSlot,
  CardStats
} from 'components/ItemCard/components';
import { CardListing } from 'shared/components/CardListing/CardListing';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { WarehouseIcon } from 'components/Icons/Icons';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { GraphFiltersUtils, RouteUtils } from 'utils';

import { ActivityWearableListingFilterTypes } from '../../constants';
import { ActivityWearableListingFilters, ActivityWearableListingVM } from '../../models';

import * as fromBaazaarStore from '../../store';

import { styles } from './styles';

export function BaazaarActivityWearables() {
  const classes = styles();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, {
    arrayFormat: 'comma'
  }) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

  const dispatch = useAppDispatch();
  const activityWearablesListings: ActivityWearableListingVM[] = useAppSelector(
    fromBaazaarStore.getActivityWearablesListings
  );
  const isActivityWearablesListingsInitialDataLoading: boolean = useAppSelector(
    fromBaazaarStore.getIsActivityWearablesListingsInitialDataLoading
  );
  const isActivityWearablesListingsLoading: boolean = useAppSelector(
    fromBaazaarStore.getIsActivityWearablesListingsLoading
  );
  const activityWearablesListingsFilters: ActivityWearableListingFilters = useAppSelector(
    fromBaazaarStore.getActivityWearablesListingsFilters
  );
  const activityWearablesListingsQueryParamsOrder: string[] = useAppSelector(
    fromBaazaarStore.getActivityWearablesListingsQueryParamsOrder
  );

  useEffect(() => {
    const updatedFilters: ActivityWearableListingFilters = GraphFiltersUtils.getUpdatedFiltersFromQueryParams(
      queryParams,
      { ...activityWearablesListingsFilters }
    );
    dispatch(fromBaazaarStore.setActivityWearablesListingsFilters(updatedFilters));

    return () => {
      dispatch(fromBaazaarStore.resetActivityWearablesData());
    };
  }, []);

  useEffect(() => {
    const params: CustomParsedQuery<GraphFiltersQueryParamTypes> = GraphFiltersUtils.getFiltersQueryParams(
      queryParams,
      { ...activityWearablesListingsFilters }
    );

    RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, activityWearablesListingsQueryParamsOrder);

    dispatch(fromBaazaarStore.onLoadBaazaarActivityWearablesListings());
  }, [activityWearablesListingsFilters]);

  useEffect(() => {
    dispatch(fromBaazaarStore.setActivityWearablesListingsIsFiltersUpdated(true));
  }, [activityWearablesListingsFilters]);

  const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
    dispatch(
      fromBaazaarStore.updateActivityWearablesListingsFilterByKey({ key, value } as {
        key: ActivityWearableListingFilterTypes;
        value: GraphFiltersValueTypes;
      })
    );
  };

  const onResetFilters = useCallback(() => {
    dispatch(fromBaazaarStore.resetActivityWearablesListingsFilters());
  }, []);

  return (
    <ContentWrapper paddingZero>
      <>
        {
          <div className={classes.results}>
            <span>{activityWearablesListings.length}</span>
            <span className={classes.placeholder}>
              <WarehouseIcon width={20} height={20} />
            </span>
          </div>
        }
        <ContentInner dataLoading={isActivityWearablesListingsInitialDataLoading}>
          <ItemsLazy
            items={activityWearablesListings}
            component={(wearableListing: ActivityWearableListingVM) => (
              <ItemCard id={wearableListing.id} category={wearableListing.category} type={wearableListing.rarity}>
                <CardGroup name='header' className={classes.wearableHeader}>
                  <CardSlot id={wearableListing.erc1155TypeId} className={classes.overridedSlot} />
                  <CardBalance balance={`${wearableListing.quantity}`} holders={[]} />
                </CardGroup>
                <CardGroup name='body'>
                  <CardImage id={wearableListing.erc1155TypeId} />
                  <CardName children={wearableListing.name} />
                  <CardStats stats={wearableListing.traitModifiers} />
                  <div className={classes.benefits}>
                    <span className={classes.itemTypeValue}>{wearableListing.itemType}</span>
                    <span className={classes.benefitValue}>
                      {wearableListing.benefit.first}, {wearableListing.benefit.second}
                    </span>
                  </div>
                  <CardSalesHistory
                    className={classes.history}
                    listing={{
                      seller: wearableListing.seller,
                      buyer: wearableListing.buyer,
                      timePurchased: wearableListing.timeLastPurchased
                    }}
                  />
                </CardGroup>
                <CardGroup name='footer'>
                  <CardListing
                    currentListing={wearableListing.currentListing}
                    lastSoldListing={wearableListing.lastSoldListing}
                  />
                </CardGroup>
              </ItemCard>
            )}
          />
        </ContentInner>
      </>
      <div className={classes.sidebar}>
        <Filters
          className={classNames(classes.section, classes.filtersWrapper)}
          filters={activityWearablesListingsFilters}
          onSetSelectedFilters={onSetSelectedFilters}
          isFiltersDisabled={isActivityWearablesListingsLoading}
        />

        <div className={classes.buttonsWrapper}>
          <Button
            variant='contained'
            color='warning'
            size='small'
            onClick={onResetFilters}
            disabled={isActivityWearablesListingsLoading}
          >
            Reset
          </Button>
        </div>
      </div>
    </ContentWrapper>
  );
}
