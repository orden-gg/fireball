import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import Grid3x3Icon from '@mui/icons-material/Grid3x3';

import * as qs from 'query-string';

// store
import * as fromClientStore from '../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';

import { CustomParsedQuery } from 'shared/models';
import { SortingItem, SortingListItem } from 'shared/models';

import { ContentInner } from 'components/Content/ContentInner';
import { H1SealedPortalIcon } from 'components/Icons/Icons';
import { CardERC721Listing, CardGroup, CardName, CardPortalImage, CardSlot } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { FilterUtils } from 'utils';

import { filtersData } from 'data/filters.data';

import { ClientPortal } from '../models';
import { routersStyles } from '../styles';

const sortings: SortingListItem[] = [
  {
    name: 'id',
    key: 'id',
    paramKey: 'id',
    tooltip: 'haunt id',
    icon: <Grid3x3Icon fontSize='small' />
  }
];

const initialFilters: CustomAny = {
  hauntId: { ...filtersData.hauntId, divider: true }
};

const queryParamsOrder: string[] = ['haunt', 'sort', 'dir'];

export function ClientPortals() {
  const classes = routersStyles();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

  const dispatch = useAppDispatch();

  const portals: ClientPortal[] = useAppSelector(fromClientStore.getPortals);
  const isInitialPortalsLoading: boolean = useAppSelector(fromClientStore.getIsInitialPortalsLoading);
  const portalsSorting: SortingItem = useAppSelector(fromClientStore.getPortalsSorting);

  const [currentFilters, setCurrentFilters] = useState<CustomAny>({ ...initialFilters });
  const [modifiedPortals, setModifiedPortals] = useState<CustomAny[]>([]);
  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);

  useEffect(() => {
    setCurrentFilters((currentFiltersCache: CustomAny) =>
      FilterUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
    );

    const { sort, dir } = queryParams as CustomParsedQuery;

    if (sort && dir) {
      const key: CustomAny = sortings.find((sorting) => sorting.paramKey === sort)?.key;

      onSortingChange(key, dir);
    }

    return () => {
      onResetFilters();
    };
  }, []);

  useEffect(() => {
    FilterUtils.onFiltersUpdate(
      currentFilters,
      FilterUtils.getActiveFiltersCount,
      setActiveFiltersCount,
      updateFilterQueryParams
    );
  }, [currentFilters]);

  useEffect(() => {
    const paramKey: CustomAny = sortings.find((sorting) => sorting.key === portalsSorting.type)?.paramKey;

    updateSortQueryParams(paramKey, portalsSorting.dir);
  }, [portalsSorting]);

  useEffect(() => {
    const modifiedPortals = FilterUtils.getFilteredSortedItems({
      items: portals,
      filters: currentFilters,
      sorting: portalsSorting,
      getFilteredItems: FilterUtils.getFilteredItems
    });

    setModifiedPortals(modifiedPortals);
  }, [currentFilters, portals, portalsSorting]);

  const onSortingChange = (type: string, dir: string): void => {
    dispatch(fromClientStore.setPortalsSorting({ type, dir }));
  };

  const sorting: CustomAny = {
    sortingList: sortings,
    sortingDefaults: portalsSorting,
    onSortingChange: onSortingChange
  };

  const updateSortQueryParams = useCallback(
    (prop: string, dir: string) => {
      const params = { ...queryParams, sort: prop, dir };

      FilterUtils.updateQueryParams(navigate, location.pathname, qs, params, queryParamsOrder);
    },
    [queryParams, navigate, location.pathname]
  );

  const updateFilterQueryParams = useCallback(
    (filters: CustomAny) => {
      const params: string[] = FilterUtils.getUpdatedQueryParams(queryParams, filters);

      FilterUtils.updateQueryParams(navigate, location.pathname, qs, params, queryParamsOrder);
    },
    [queryParams, navigate, location.pathname]
  );

  const onSetSelectedFilters = (key: string, selectedValue: CustomAny) => {
    FilterUtils.setSelectedFilters(setCurrentFilters, key, selectedValue);
  };

  const onResetFilters = useCallback(() => {
    FilterUtils.resetFilters(currentFilters, setCurrentFilters);
  }, [currentFilters]);

  const onExportData = useCallback(() => {
    FilterUtils.exportData(modifiedPortals, 'client_portals');
  }, [modifiedPortals]);
  console.log('modifiedPortals Client Portal', modifiedPortals);

  return (
    <>
      <SortFilterPanel
        sorting={sorting}
        itemsLength={modifiedPortals.length}
        placeholder={<H1SealedPortalIcon width={20} height={20} />}
        isShowFilters={true}
        filters={currentFilters}
        setSelectedFilters={onSetSelectedFilters}
        resetFilters={onResetFilters}
        exportData={onExportData}
        filtersCount={activeFiltersCount}
      />

      <ContentInner dataLoading={isInitialPortalsLoading}>
        <div>
          <div className={classes.list}>
            {modifiedPortals.map((portal: ClientPortal, index: number) => (
              <div className={classes.listItem} key={index}>
                <ItemCard type={`haunt${portal.hauntId}`} id={portal.id} category={portal.category}>
                  <CardGroup name='body'>
                    <CardSlot>{`Haunt ${portal.hauntId}`}</CardSlot>
                    <CardPortalImage category={portal.category} hauntId={portal.hauntId} />
                    <CardName>{`Portal ${portal.id}`}</CardName>
                  </CardGroup>
                  <CardGroup name='footer'>
                    <CardERC721Listing
                      currentListingId={portal.listingId}
                      currentPrice={portal.listingPrice}
                      historicalPrices={portal.historicalPrices}
                    />
                  </CardGroup>
                </ItemCard>
              </div>
            ))}
          </div>
        </div>
      </ContentInner>
    </>
  );
}
