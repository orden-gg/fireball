import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import classNames from 'classnames';
import qs from 'query-string';

import * as fromBaazaarStore from '../../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';

import { CardListing } from 'shared/components/CardListing/CardListing';
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
import { Filters } from 'components/Filters/components/Filters/Filters';
import { ConsumableIcon } from 'components/Icons/Icons';
import { CardBalance, CardGroup, CardImage, CardName } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { GraphFiltersUtils, RouteUtils } from 'utils';

import { ConsumableListingFilterTypes } from '../../constants';
import { ConsumableListingFilters, ConsumableListingVM } from '../../models';
import { consumablesListingsSortings } from '../../static/sortings';
import { styles } from './styles';

export function BaazaarConsumables() {
  const classes = styles();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, {
    arrayFormat: 'comma'
  }) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

  const dispatch = useAppDispatch();
  const consumablesListings: ConsumableListingVM[] = useAppSelector(fromBaazaarStore.getConsumablesListings);
  const isConsumablesListingsInitialDataLoading: boolean = useAppSelector(
    fromBaazaarStore.getIsConsumablesListingsInitialDataLoading
  );
  const isConsumablesListingsLoading: boolean = useAppSelector(fromBaazaarStore.getIsConsumablesListingsLoading);
  const consumablesListingsGraphQueryParams: GraphQueryParams = useAppSelector(
    fromBaazaarStore.getConsumablesListingsGraphQueryParams
  );
  const consumablesListingsDefaultSorting: SortingItem = useAppSelector(
    fromBaazaarStore.getConsumablesListingsDefaultSorting
  );
  const consumablesListingsSorting: SortingItem = useAppSelector(fromBaazaarStore.getConsumablesListingsSorting);
  const consumablesListingsFilters: ConsumableListingFilters = useAppSelector(
    fromBaazaarStore.getConsumablesListingsFilters
  );
  const consuamblesListingsLimitPerLoad: number = useAppSelector(fromBaazaarStore.getConsumablesListingsLimitPerLoad);
  const consumablesListingsQueryParamsOrder: string[] = useAppSelector(
    fromBaazaarStore.getConsumablesListingsQueryParamsOrder
  );

  useEffect(() => {
    const updatedFilters: ConsumableListingFilters = GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, {
      ...consumablesListingsFilters
    });
    dispatch(fromBaazaarStore.setConsumablesListingsFilters(updatedFilters));

    const { sort, dir } = queryParams;

    if (sort && dir) {
      const key: Undefinable<string> = consumablesListingsSortings.find(
        (sorting: SortingListItem) => sorting.paramKey === sort
      )?.key;

      if (key) {
        onSortingChange(key, dir as string);
      }
    }

    if (!sort) {
      dispatch(fromBaazaarStore.setConsumablesListingsPreviousSortingProp(consumablesListingsDefaultSorting.type));
    }

    return () => {
      dispatch(fromBaazaarStore.resetConsumablesListingsData());
    };
  }, []);

  useEffect(() => {
    let params: CustomParsedQuery<GraphFiltersQueryParamTypes> = GraphFiltersUtils.getFiltersQueryParams(queryParams, {
      ...consumablesListingsFilters
    });

    const paramKey: Undefinable<string> = consumablesListingsSortings.find(
      (sorting) => sorting.key === consumablesListingsSorting.type
    )?.paramKey;

    if (paramKey) {
      if (
        consumablesListingsSorting.dir === consumablesListingsDefaultSorting.dir &&
        consumablesListingsSorting.type === consumablesListingsDefaultSorting.type
      ) {
        delete params['sort'];
        delete params['dir'];

        params = { ...params };
      } else {
        params = { ...params, sort: paramKey, dir: consumablesListingsSorting.dir };
      }
    }

    RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, consumablesListingsQueryParamsOrder);

    dispatch(fromBaazaarStore.onLoadBaazaarConsumablesListings());
  }, [consumablesListingsFilters, consumablesListingsSorting]);

  useEffect(() => {
    dispatch(fromBaazaarStore.setConsumablesListingsIsFiltersUpdated(true));
  }, [consumablesListingsFilters]);

  useEffect(() => {
    dispatch(fromBaazaarStore.setConsumablesListingsIsSortingUpdated(true));
  }, [consumablesListingsSorting]);

  const onSortingChange = (sortBy: string, sortDir: string): void => {
    dispatch(fromBaazaarStore.onSetConsumablesListingsSorting({ type: sortBy, dir: sortDir }));
  };

  const onHandleReachedEnd = (): void => {
    const skipLimit: number = consumablesListingsGraphQueryParams.skip + consuamblesListingsLimitPerLoad;

    if (skipLimit <= consumablesListings.length) {
      dispatch(fromBaazaarStore.setConsumablesListingsSkipLimit(skipLimit));
      dispatch(fromBaazaarStore.loadBaazaarConsumablesListings());
    }
  };

  const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
    dispatch(
      fromBaazaarStore.updateConsumablesListingsFilterByKey({ key, value } as {
        key: ConsumableListingFilterTypes;
        value: GraphFiltersValueTypes;
      })
    );
  };

  const onResetFilters = useCallback(() => {
    dispatch(fromBaazaarStore.resetConsumablesListingsFilters());
  }, []);

  return (
    <ContentWrapper paddingZero>
      <>
        <SortFilterPanel
          sorting={{
            sortingList: consumablesListingsSortings,
            sortingDefaults: consumablesListingsSorting,
            onSortingChange: onSortingChange
          }}
          itemsLength={consumablesListings.length}
          placeholder={<ConsumableIcon width={20} height={20} />}
          isPanelDisabled={isConsumablesListingsLoading}
        />
        <ContentInner dataLoading={isConsumablesListingsInitialDataLoading}>
          <ItemsLazy
            items={consumablesListings}
            component={(consumableListing: ConsumableListingVM) => (
              <ItemCard type={consumableListing.rarity} id={consumableListing.id} category={consumableListing.category}>
                <CardGroup name='header'>
                  <CardBalance balance={`${consumableListing.quantity}`} holders={[]} />
                </CardGroup>
                <CardGroup name='body'>
                  <CardImage id={consumableListing.erc1155TypeId} />
                  <CardName children={consumableListing.name} />
                </CardGroup>
                <CardGroup name='footer'>
                  <CardListing
                    currentListing={consumableListing.currentListing}
                    lastSoldListing={consumableListing.lastSoldListing}
                  />
                </CardGroup>
              </ItemCard>
            )}
            onHandleReachedEnd={onHandleReachedEnd}
          />
        </ContentInner>
      </>
      <div className={classes.sidebar}>
        <Filters
          className={classNames(classes.section, classes.filtersWrapper)}
          filters={consumablesListingsFilters}
          onSetSelectedFilters={onSetSelectedFilters}
          isFiltersDisabled={isConsumablesListingsLoading}
        />

        <div className={classes.buttonsWrapper}>
          <Button
            variant='contained'
            color='warning'
            size='small'
            onClick={onResetFilters}
            disabled={isConsumablesListingsLoading}
          >
            Reset
          </Button>
        </div>
      </div>
    </ContentWrapper>
  );
}
