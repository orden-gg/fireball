import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import classNames from 'classnames';
import qs from 'query-string';

import * as fromBaazaarStore from '../../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';

import { CardImage } from 'shared/components/CardImage/CardImage';
import { CardListing } from 'shared/components/CardListing/CardListing';
import { CustomParsedQuery, GraphFiltersQueryParamTypes, GraphFiltersValueTypes } from 'shared/models';

import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { PurpleGrassIcon } from 'components/Icons/Icons';
import { CardBalance, CardCraftLink, CardGroup, CardName, CardSalesHistory } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';

import { GraphFiltersUtils, RouteUtils } from 'utils';

import { ActivityTileListingFilterTypes } from '../../constants';
import { ActivityTileListingFilters, ActivityTileListingVM } from '../../models';
import { styles } from './styles';

export function BaazaarActivityTiles() {
  const classes = styles();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, {
    arrayFormat: 'comma'
  }) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

  const dispatch = useAppDispatch();
  const activityTilesListings: ActivityTileListingVM[] = useAppSelector(fromBaazaarStore.getActivityTilesListings);
  const isActivityTilesListingsInitialDataLoading: boolean = useAppSelector(
    fromBaazaarStore.getIsActivityTilesListingsInitialDataLoading
  );
  const isActivityTilesListingsLoading: boolean = useAppSelector(fromBaazaarStore.getIsActivityTilesListingsLoading);
  const activityTilesListingsFilters: ActivityTileListingFilters = useAppSelector(
    fromBaazaarStore.getActivityTilesListingsFilters
  );
  const activityTilesListingsQueryParamsOrder: string[] = useAppSelector(
    fromBaazaarStore.getActivityTilesListingsQueryParamsOrder
  );

  useEffect(() => {
    const updatedFilters: ActivityTileListingFilters = GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, {
      ...activityTilesListingsFilters
    });
    dispatch(fromBaazaarStore.setActivityTilesListingsFilters(updatedFilters));

    return () => {
      dispatch(fromBaazaarStore.resetActivityTilesData());
    };
  }, []);

  useEffect(() => {
    const params: CustomParsedQuery<GraphFiltersQueryParamTypes> = GraphFiltersUtils.getFiltersQueryParams(
      queryParams,
      { ...activityTilesListingsFilters }
    );

    RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, activityTilesListingsQueryParamsOrder);

    dispatch(fromBaazaarStore.onLoadBaazaarActivityTilesListings());
  }, [activityTilesListingsFilters]);

  useEffect(() => {
    dispatch(fromBaazaarStore.setActivityTilesListingsIsFiltersUpdated(true));
  }, [activityTilesListingsFilters]);

  const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
    dispatch(
      fromBaazaarStore.updateActivityTilesListingsFilterByKey({ key, value } as {
        key: ActivityTileListingFilterTypes;
        value: GraphFiltersValueTypes;
      })
    );
  };

  const onResetFilters = useCallback(() => {
    dispatch(fromBaazaarStore.resetActivityTilesListingsFilters());
  }, []);

  return (
    <ContentWrapper paddingZero>
      <>
        {
          <div className={classes.results}>
            <span>{activityTilesListings.length}</span>
            <span className={classes.placeholder}>
              <PurpleGrassIcon width={20} height={20} />
            </span>
          </div>
        }
        <ContentInner dataLoading={isActivityTilesListingsInitialDataLoading}>
          <ItemsLazy
            items={activityTilesListings}
            component={(tileListing: ActivityTileListingVM) => (
              <ItemCard id={tileListing.id} category={tileListing.category} type={tileListing.rarity}>
                <CardGroup name='header'>
                  {!tileListing.isDeprecated ? <CardCraftLink name={tileListing.name} /> : <></>}
                  <CardBalance balance={tileListing.quantity} />
                </CardGroup>
                <CardGroup name='body'>
                  <CardImage src={tileListing.imageSrcUrl} alt={tileListing.name} />
                  <CardName>{tileListing.name}</CardName>
                  <CardSalesHistory
                    className={classes.history}
                    listing={{
                      seller: tileListing.seller,
                      buyer: tileListing.buyer,
                      timePurchased: tileListing.timeLastPurchased
                    }}
                  />
                </CardGroup>
                <CardGroup name='footer'>
                  <CardListing
                    currentListing={tileListing.currentListing}
                    lastSoldListing={tileListing.lastSoldListing}
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
          filters={activityTilesListingsFilters}
          onSetSelectedFilters={onSetSelectedFilters}
          isFiltersDisabled={isActivityTilesListingsLoading}
        />

        <div className={classes.buttonsWrapper}>
          <Button
            variant='contained'
            color='warning'
            size='small'
            onClick={onResetFilters}
            disabled={isActivityTilesListingsLoading}
          >
            Reset
          </Button>
        </div>
      </div>
    </ContentWrapper>
  );
}
