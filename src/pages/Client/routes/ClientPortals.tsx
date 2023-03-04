import { useCallback, useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import Grid3x3Icon from '@mui/icons-material/Grid3x3';

import * as qs from 'query-string';

import { CustomParsedQuery } from 'shared/models';

import { ClientContext } from 'contexts/ClientContext';

import { ContentInner } from 'components/Content/ContentInner';
import { CardERC721Listing, CardGroup, CardName, CardPortalImage, CardSlot } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { filtersData } from 'data/filters.data';

import { H1SealedPortalIcon } from '../../../components/Icons/Icons';
import { SortingItem, SortingListItem } from '../../../shared/models/sorting.model';
import { FilterUtils } from '../../../utils/filters.utils';
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

const initialFilters: any = {
  hauntId: { ...filtersData.hauntId, divider: true }
};

const queryParamsOrder: string[] = ['haunt', 'sort', 'dir'];

export function ClientPortals() {
  const classes = routersStyles();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

  const { portals, loadingPortals } = useContext<any>(ClientContext);
  const [currentFilters, setCurrentFilters] = useState<any>({ ...initialFilters });
  const [modifiedPortals, setModifiedPortals] = useState<any[]>([]);
  const [portalsSorting, setPortalsSorting] = useState<SortingItem>({ type: 'haunt', dir: 'asc' });
  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);

  useEffect(() => {
    setCurrentFilters((currentFiltersCache: any) =>
      FilterUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
    );

    const { sort, dir } = queryParams as CustomParsedQuery;

    if (sort && dir) {
      const key: any = sortings.find((sorting) => sorting.paramKey === sort)?.key;

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
    const paramKey: any = sortings.find((sorting) => sorting.key === portalsSorting.type)?.paramKey;

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

  const onSortingChange = useCallback(
    (type: string, dir: string) => {
      setPortalsSorting({ type, dir });
    },
    [setPortalsSorting]
  );

  const sorting: any = {
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
    (filters: any) => {
      const params: string[] = FilterUtils.getUpdatedQueryParams(queryParams, filters);

      FilterUtils.updateQueryParams(navigate, location.pathname, qs, params, queryParamsOrder);
    },
    [queryParams, navigate, location.pathname]
  );

  const onSetSelectedFilters = (key: string, selectedValue: any) => {
    FilterUtils.setSelectedFilters(setCurrentFilters, key, selectedValue);
  };

  const onResetFilters = useCallback(() => {
    FilterUtils.resetFilters(currentFilters, setCurrentFilters);
  }, [currentFilters]);

  const onExportData = useCallback(() => {
    FilterUtils.exportData(modifiedPortals, 'client_portals');
  }, [modifiedPortals]);

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

      <ContentInner dataLoading={loadingPortals}>
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
