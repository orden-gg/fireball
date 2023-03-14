import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import classNames from 'classnames';
import qs from 'query-string';

import * as fromBaazaarStore from '../../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';

import { CardImage } from 'shared/components/CardImage/CardImage';
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
import { PurpleGrassIcon } from 'components/Icons/Icons';
import { CardBalance, CardCraftLink, CardGroup, CardName } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { GraphFiltersUtils, RouteUtils } from 'utils';

import { TileListingFilterTypes } from '../../constants';
import { TileListingFilters, TileListingVM } from '../../models';
import { tilesListingsSortings } from '../../static/sortings';
import { styles } from './styles';

export function BaazaarTiles() {
  const classes = styles();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, {
    arrayFormat: 'comma'
  }) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

  const dispatch = useAppDispatch();
  const tilesListings: TileListingVM[] = useAppSelector(fromBaazaarStore.getTilesListings);
  const isTilesListingsInitialDataLoading: boolean = useAppSelector(
    fromBaazaarStore.getIsTilesListingsInitialDataLoading
  );
  const isTilesListingsLoading: boolean = useAppSelector(fromBaazaarStore.getIsTilesListingsLoading);
  const tilesListingsGraphQueryParams: GraphQueryParams = useAppSelector(
    fromBaazaarStore.getTilesListingsGraphQueryParams
  );
  const tilesListingsDefaultSorting: SortingItem = useAppSelector(fromBaazaarStore.getTilesListingsDefaultSorting);
  const tilesListingsSorting: SortingItem = useAppSelector(fromBaazaarStore.getTilesListingsSorting);
  const tilesListingsFilters: TileListingFilters = useAppSelector(fromBaazaarStore.getTilesListingsFilters);
  const tilesListingsLimitPerLoad: number = useAppSelector(fromBaazaarStore.getTilesListingsLimitPerLoad);
  const tilesListingsQueryParamsOrder: string[] = useAppSelector(fromBaazaarStore.getTilesListingsQueryParamsOrder);

  useEffect(() => {
    const updatedFilters: TileListingFilters = GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, {
      ...tilesListingsFilters
    });
    dispatch(fromBaazaarStore.setTilesListingsFilters(updatedFilters));

    const { sort, dir } = queryParams;

    if (sort && dir) {
      const key: Undefinable<string> = tilesListingsSortings.find(
        (sorting: SortingListItem) => sorting.paramKey === sort
      )?.key;

      if (key) {
        onSortingChange(key, dir as string);
      }
    }

    if (!sort) {
      dispatch(fromBaazaarStore.setTilesListingsPreviousSortingProp(tilesListingsDefaultSorting.type));
    }

    return () => {
      dispatch(fromBaazaarStore.resetTilesListingsData());
    };
  }, []);

  useEffect(() => {
    let params: CustomParsedQuery<GraphFiltersQueryParamTypes> = GraphFiltersUtils.getFiltersQueryParams(queryParams, {
      ...tilesListingsFilters
    });

    const paramKey: Undefinable<string> = tilesListingsSortings.find(
      (sorting) => sorting.key === tilesListingsSorting.type
    )?.paramKey;

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

    dispatch(fromBaazaarStore.onLoadBaazaarTilesListings());
  }, [tilesListingsFilters, tilesListingsSorting]);

  useEffect(() => {
    dispatch(fromBaazaarStore.setTilesListingsIsFiltersUpdated(true));
  }, [tilesListingsFilters]);

  useEffect(() => {
    dispatch(fromBaazaarStore.setTilesListingsIsSortingUpdated(true));
  }, [tilesListingsSorting]);

  const onSortingChange = (sortBy: string, sortDir: string): void => {
    dispatch(fromBaazaarStore.onSetTilesListingsSorting({ type: sortBy, dir: sortDir }));
  };

  const onHandleReachedEnd = (): void => {
    const skipLimit: number = tilesListingsGraphQueryParams.skip + tilesListingsLimitPerLoad;

    if (skipLimit <= tilesListings.length) {
      dispatch(fromBaazaarStore.setTilesListingsSkipLimit(skipLimit));
      dispatch(fromBaazaarStore.loadBaazaarTilesListings());
    }
  };

  const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
    dispatch(
      fromBaazaarStore.updateTilesListingsFilterByKey({ key, value } as {
        key: TileListingFilterTypes;
        value: GraphFiltersValueTypes;
      })
    );
  };

  const onResetFilters = useCallback(() => {
    dispatch(fromBaazaarStore.resetTilesListingsFilters());
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
          placeholder={<PurpleGrassIcon width={20} height={20} />}
          isPanelDisabled={isTilesListingsLoading}
        />
        <ContentInner dataLoading={isTilesListingsInitialDataLoading}>
          <ItemsLazy
            items={tilesListings}
            component={(tileListing: TileListingVM) => (
              <ItemCard id={tileListing.id} category={tileListing.category} type={tileListing.rarity}>
                <CardGroup name='header'>
                  {!tileListing.isDeprecated ? <CardCraftLink name={tileListing.name} /> : <></>}
                  <CardBalance balance={tileListing.quantity} />
                </CardGroup>
                <CardGroup name='body'>
                  <CardImage src={tileListing.imageSrcUrl} alt={tileListing.name} />
                  <CardName>{tileListing.name}</CardName>
                </CardGroup>
                <CardGroup name='footer'>
                  <CardListing
                    currentListing={tileListing.currentListing}
                    lastSoldListing={tileListing.lastSoldListing}
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
          filters={tilesListingsFilters}
          onSetSelectedFilters={onSetSelectedFilters}
          isFiltersDisabled={isTilesListingsLoading}
        />

        <div className={classes.buttonsWrapper}>
          <Button
            variant='contained'
            color='warning'
            size='small'
            onClick={onResetFilters}
            disabled={isTilesListingsLoading}
          >
            Reset
          </Button>
        </div>
      </div>
    </ContentWrapper>
  );
}
