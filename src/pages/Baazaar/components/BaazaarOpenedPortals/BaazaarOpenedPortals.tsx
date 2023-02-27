import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import classNames from 'classnames';
import qs from 'query-string';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import { CustomParsedQuery, GraphFiltersQueryParamTypes, SortingItem, SortingListItem } from 'shared/models';
import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { Gotchi } from 'components/Gotchi/Gotchi';
import { GotchiIcon } from 'components/Icons/Icons';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { FilterUtils } from 'utils';

import { OpenedPortalListingFilters, OpenedPortalListingVM } from '../../models';
import { openedPortalsListingsSortings } from '../../static/sortings';
import { openedPortalListingsFilters } from '../../static/filters';

import * as fromBaazaarStore from '../../store';

import { styles } from './styles';

export function BaazaarOpenedPortals() {
  const classes = styles();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, {
    arrayFormat: 'comma'
  }) as CustomParsedQuery<GraphFiltersQueryParamTypes>;

  const dispatch = useAppDispatch();
  const initialOpenedPortalsListings: OpenedPortalListingVM[] = useAppSelector(
    fromBaazaarStore.getInitialOpenedPortalsListings
  );
  const openedPortalsListings: OpenedPortalListingVM[] = useAppSelector(fromBaazaarStore.getOpenedPortalsListings);
  const isOpenedPortalsListingsLoading: boolean = useAppSelector(fromBaazaarStore.getIsOpenedPortalsListingsLoading);
  const openedPortalsListingsDefaultSorting: SortingItem = useAppSelector(
    fromBaazaarStore.getOpenedPortalsListingsDefaultSorting
  );
  const openedPortalsListingsSorting: SortingItem = useAppSelector(fromBaazaarStore.getOpenedPortalsListingsSorting);
  const openedPortalsListingsQueryParamsOrder: string[] = useAppSelector(
    fromBaazaarStore.getOpenedPortalsListingsQueryParamsOrder
  );

  const [currentFilters, setCurrentFilters] = useState<OpenedPortalListingFilters>({ ...openedPortalListingsFilters });

  useEffect(() => {
    dispatch(fromBaazaarStore.loadBaazaarOpenedPortalsListings());

    setCurrentFilters((currentFiltersCache: OpenedPortalListingFilters) =>
      FilterUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
    );

    const { sort, dir } = queryParams;

    if (sort && dir) {
      const key: Undefinable<string> = openedPortalsListingsSortings.find(
        (sorting: SortingListItem) => sorting.paramKey === sort
      )?.key;

      if (key) {
        onSortingChange(key, dir as string);
      }
    }

    if (!sort) {
      dispatch(fromBaazaarStore.setOpenedPortalsPreviousSortingProp(openedPortalsListingsDefaultSorting.type));
    }

    return () => {
      onResetFilters();

      dispatch(fromBaazaarStore.resetOpenedPortalsData());
    };
  }, []);

  useEffect(() => {
    const params: CustomParsedQuery<GraphFiltersQueryParamTypes> = FilterUtils.getUpdatedQueryParams(
      queryParams,
      currentFilters
    );

    FilterUtils.updateQueryParams(navigate, location.pathname, qs, params, openedPortalsListingsQueryParamsOrder);
  }, [currentFilters]);

  useEffect(() => {
    let params: CustomParsedQuery<GraphFiltersQueryParamTypes> = { ...queryParams };

    const paramKey: Undefinable<string> = openedPortalsListingsSortings.find(
      (sorting) => sorting.key === openedPortalsListingsSorting.type
    )?.paramKey;

    if (paramKey) {
      if (
        openedPortalsListingsSorting.dir === openedPortalsListingsDefaultSorting.dir &&
        openedPortalsListingsSorting.type === openedPortalsListingsDefaultSorting.type
      ) {
        delete params['sort'];
        delete params['dir'];

        params = { ...params };
      } else {
        params = { ...params, sort: paramKey, dir: openedPortalsListingsSorting.dir };
      }
    }
    if (paramKey) {
      FilterUtils.updateQueryParams(navigate, location.pathname, qs, params, openedPortalsListingsQueryParamsOrder);
    }
  }, [openedPortalsListingsSorting]);

  useEffect(() => {
    const modifiedListings = FilterUtils.getFilteredSortedItems({
      items: initialOpenedPortalsListings,
      filters: currentFilters,
      sorting: openedPortalsListingsSorting,
      getFilteredItems: FilterUtils.getFilteredItems
    });

    dispatch(fromBaazaarStore.setOpenedPortalsListings(modifiedListings));
  }, [currentFilters, initialOpenedPortalsListings, openedPortalsListingsSorting]);

  const onSortingChange = (sortBy: string, sortDir: string): void => {
    dispatch(fromBaazaarStore.onSetOpenedPortalsListingsSorting({ type: sortBy, dir: sortDir }));
  };

  const onSetSelectedFilters = (key: string, value: any) => {
    FilterUtils.setSelectedFilters(setCurrentFilters, key, value);
  };

  const onResetFilters = useCallback(() => {
    FilterUtils.resetFilters(currentFilters, setCurrentFilters);
  }, [currentFilters]);

  return (
    <ContentWrapper paddingZero>
      <>
        <SortFilterPanel
          sorting={{
            sortingList: openedPortalsListingsSortings,
            sortingDefaults: openedPortalsListingsSorting,
            onSortingChange: onSortingChange
          }}
          itemsLength={openedPortalsListings.length}
          placeholder={<GotchiIcon width={20} height={20} />}
        />
        <ContentInner dataLoading={isOpenedPortalsListingsLoading}>
          <ItemsLazy
            items={openedPortalsListings}
            component={(portalListing: OpenedPortalListingVM) => (
              <Gotchi
                key={portalListing.gotchi.id}
                gotchi={{
                  ...portalListing.gotchi,
                  listings: [{ id: portalListing.id, priceInWei: portalListing.priceInWei }],
                  historicalPrices: []
                }}
                shouldLoadGotchiInModal={false}
                renderSvgByStats={true}
                portal={true}
                render={[
                  {
                    className: 'gotchiHeader',
                    items: ['collateral', 'kinship', 'level']
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
            )}
          />
        </ContentInner>
      </>
      <div className={classes.sidebar}>
        <Filters
          className={classNames(classes.section, classes.filtersWrapper)}
          filters={currentFilters}
          onSetSelectedFilters={onSetSelectedFilters}
          isFiltersDisabled={isOpenedPortalsListingsLoading}
        />

        <div className={classes.buttonsWrapper}>
          <Button
            variant='contained'
            color='warning'
            size='small'
            onClick={onResetFilters}
            disabled={isOpenedPortalsListingsLoading}
          >
            Reset
          </Button>
        </div>
      </div>
    </ContentWrapper>
  );
}
