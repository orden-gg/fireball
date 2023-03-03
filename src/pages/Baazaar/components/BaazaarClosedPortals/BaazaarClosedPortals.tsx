import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import classNames from 'classnames';
import qs from 'query-string';

import * as fromBaazaarStore from '../../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';

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
import { H1SealedPortalIcon } from 'components/Icons/Icons';
import { CardERC721Listing, CardGroup, CardName, CardPortalImage, CardSlot } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { GraphFiltersUtils, RouteUtils } from 'utils';

import { ClosedPortalListingFilterTypes } from '../../constants';
import { ClosedPortalListingFilters, ClosedPortalListingVM } from '../../models';
import { closedPortalsListingsSortings } from '../../static/sortings';
import { styles } from './styles';

export function BaazaarClosedPortals() {
  const classes = styles();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, {
    arrayFormat: 'comma'
  }) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

  const dispatch = useAppDispatch();
  const closedPortalsListings: ClosedPortalListingVM[] = useAppSelector(fromBaazaarStore.getClosedPortalsListings);
  const isClosedPortalsListingsInitialDataLoading: boolean = useAppSelector(
    fromBaazaarStore.getIsClosedPortalsListingsInitialDataLoading
  );
  const isClosedPortalsListingsLoading: boolean = useAppSelector(fromBaazaarStore.getIsClosedPortalsListingsLoading);
  const closedPortalsListingsGraphQueryParams: GraphQueryParams = useAppSelector(
    fromBaazaarStore.getClosedPortalsListingsGraphQueryParams
  );
  const closedPortalsListingsDefaultSorting: SortingItem = useAppSelector(
    fromBaazaarStore.getClosedPortalsListingsDefaultSorting
  );
  const closedPortalsListingsSorting: SortingItem = useAppSelector(fromBaazaarStore.getClosedPortalsListingsSorting);
  const closedPortalsListingsFilters: ClosedPortalListingFilters = useAppSelector(
    fromBaazaarStore.getClosedPortalsListingsFilters
  );
  const closedPortalsListingsLimitPerLoad: number = useAppSelector(
    fromBaazaarStore.getClosedPortalsListingsLimitPerLoad
  );
  const closedPortalsListingsQueryParamsOrder: string[] = useAppSelector(
    fromBaazaarStore.getClosedPortalsListingsQueryParamsOrder
  );

  useEffect(() => {
    const updatedFilters: ClosedPortalListingFilters = GraphFiltersUtils.getUpdatedFiltersFromQueryParams(queryParams, {
      ...closedPortalsListingsFilters
    });
    dispatch(fromBaazaarStore.setClosedPortalsListingsFilters(updatedFilters));

    const { sort, dir } = queryParams;

    if (sort && dir) {
      const key: Undefinable<string> = closedPortalsListingsSortings.find(
        (sorting: SortingListItem) => sorting.paramKey === sort
      )?.key;

      if (key) {
        onSortingChange(key, dir as string);
      }
    }

    if (!sort) {
      dispatch(fromBaazaarStore.setClosedPortalsListingsPreviousSortingProp(closedPortalsListingsDefaultSorting.type));
    }

    return () => {
      dispatch(fromBaazaarStore.resetClosedPortalsData());
    };
  }, []);

  useEffect(() => {
    let params: CustomParsedQuery<GraphFiltersQueryParamTypes> = GraphFiltersUtils.getFiltersQueryParams(queryParams, {
      ...closedPortalsListingsFilters
    });

    const paramKey: Undefinable<string> = closedPortalsListingsSortings.find(
      (sorting) => sorting.key === closedPortalsListingsSorting.type
    )?.paramKey;

    if (paramKey) {
      if (
        closedPortalsListingsSorting.dir === closedPortalsListingsDefaultSorting.dir &&
        closedPortalsListingsSorting.type === closedPortalsListingsDefaultSorting.type
      ) {
        delete params['sort'];
        delete params['dir'];

        params = { ...params };
      } else {
        params = { ...params, sort: paramKey, dir: closedPortalsListingsSorting.dir };
      }
    }

    RouteUtils.updateQueryParams(navigate, location.pathname, qs, params, closedPortalsListingsQueryParamsOrder);

    dispatch(fromBaazaarStore.onLoadBaazaarClosedPortalsListings());
  }, [closedPortalsListingsFilters, closedPortalsListingsSorting]);

  useEffect(() => {
    dispatch(fromBaazaarStore.setClosedPortalsListingsIsFiltersUpdated(true));
  }, [closedPortalsListingsFilters]);

  useEffect(() => {
    dispatch(fromBaazaarStore.setClosedPortalsListingsIsSortingUpdated(true));
  }, [closedPortalsListingsSorting]);

  const onSortingChange = (sortBy: string, sortDir: string): void => {
    dispatch(fromBaazaarStore.onSetClosedPortalsListingsSorting({ type: sortBy, dir: sortDir }));
  };

  const onHandleReachedEnd = (): void => {
    const skipLimit: number = closedPortalsListingsGraphQueryParams.skip + closedPortalsListingsLimitPerLoad;

    if (skipLimit <= closedPortalsListings.length) {
      dispatch(
        fromBaazaarStore.setClosedPortalsListingsSkipLimit(
          closedPortalsListingsGraphQueryParams.skip + closedPortalsListingsLimitPerLoad
        )
      );
      dispatch(fromBaazaarStore.loadBaazaarClosedPortalsListings());
    }
  };

  const onSetSelectedFilters = (key: string, value: GraphFiltersValueTypes) => {
    dispatch(
      fromBaazaarStore.updateClosedPortalsListingsFilterByKey({ key, value } as {
        key: ClosedPortalListingFilterTypes;
        value: GraphFiltersValueTypes;
      })
    );
  };

  const onResetFilters = useCallback(() => {
    dispatch(fromBaazaarStore.resetClosedPortalsListingsFilters());
  }, []);

  return (
    <ContentWrapper paddingZero>
      <>
        <SortFilterPanel
          sorting={{
            sortingList: closedPortalsListingsSortings,
            sortingDefaults: closedPortalsListingsSorting,
            onSortingChange: onSortingChange
          }}
          itemsLength={closedPortalsListings.length}
          placeholder={<H1SealedPortalIcon width={20} height={20} />}
          isPanelDisabled={isClosedPortalsListingsLoading}
        />
        <ContentInner dataLoading={isClosedPortalsListingsInitialDataLoading}>
          <ItemsLazy
            items={closedPortalsListings}
            component={(portalListing: ClosedPortalListingVM) => (
              <div className={classes.listItem} key={portalListing.tokenId}>
                <ItemCard
                  type={`haunt${portalListing.hauntId}`}
                  id={portalListing.id}
                  category={portalListing.category}
                >
                  <CardGroup name='body'>
                    <CardSlot>{`Haunt ${portalListing.hauntId}`}</CardSlot>
                    <CardPortalImage category={portalListing.category} hauntId={portalListing.hauntId} />
                    <CardName>{`Portal ${portalListing.tokenId}`}</CardName>
                  </CardGroup>
                  <CardGroup name='footer'>
                    <CardERC721Listing
                      currentListingId={portalListing.id}
                      currentPrice={portalListing.listingPrice}
                      historicalPrices={portalListing.historicalPrices}
                    />
                  </CardGroup>
                </ItemCard>
              </div>
            )}
            onHandleReachedEnd={onHandleReachedEnd}
          />
        </ContentInner>
      </>
      <div className={classes.sidebar}>
        <Filters
          className={classNames(classes.section, classes.filtersWrapper)}
          filters={closedPortalsListingsFilters}
          onSetSelectedFilters={onSetSelectedFilters}
          isFiltersDisabled={isClosedPortalsListingsLoading}
        />

        <div className={classes.buttonsWrapper}>
          <Button
            variant='contained'
            color='warning'
            size='small'
            onClick={onResetFilters}
            disabled={isClosedPortalsListingsLoading}
          >
            Reset
          </Button>
        </div>
      </div>
    </ContentWrapper>
  );
}
