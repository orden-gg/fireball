import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';

import qs from 'query-string';

// store
import * as fromClientStore from '../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';

import { CustomParsedQuery, GotchiLending, SortingItem, SortingListItem } from 'shared/models';

import { ContentInner } from 'components/Content/ContentInner';
import { Gotchi } from 'components/Gotchi/Gotchi';
import { GotchiIcon } from 'components/Icons/Icons';
import { GotchisLazy } from 'components/Lazy/GotchisLazy';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { FilterUtils } from 'utils';

import { filtersData } from 'data/filters.data';

const sortings: SortingListItem[] = [
  {
    name: 'mrs',
    key: 'modifiedRarityScore',
    paramKey: 'mrs',
    tooltip: 'rarity score',
    icon: <EmojiEventsOutlinedIcon fontSize='small' />
  },
  {
    name: 'brs',
    key: 'baseRarityScore',
    paramKey: 'brs',
    tooltip: 'base rarity score',
    icon: <FormatListNumberedIcon fontSize='small' />
  },
  {
    name: 'kin',
    key: 'kinship',
    paramKey: 'kin',
    tooltip: 'kinship',
    icon: <FavoriteBorderIcon fontSize='small' />
  }
];

const initialFilters: CustomAny = {
  hauntId: { ...filtersData.hauntId, divider: true },
  collateral: { ...filtersData.collateral, divider: true },
  lastChanneled: { ...filtersData.lastChanneled, divider: true },
  search: { ...filtersData.search }
};
const queryParamsOrder: string[] = ['haunt', 'collateral', 'lastChanneled', 'search', 'sort', 'dir'];

export function ClientBorrowed() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

  const dispatch = useAppDispatch();

  const borrowedGotchis: GotchiLending[] = useAppSelector(fromClientStore.getBorrowedGotchis);
  const isInitialBorrowedGotchisLoading: boolean = useAppSelector(fromClientStore.getIsInitialBorrowedGotchisLoading);
  const borrowedGotchisSorting: SortingItem = useAppSelector(fromClientStore.getBorrowedGotchisSorting);

  const [currentFilters, setCurrentFilters] = useState<CustomAny>({ ...initialFilters });
  const [modifiedGotchis, setModifiedGotchis] = useState<CustomAny[]>([]);
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
    const paramKey: CustomAny = sortings.find((sorting) => sorting.key === borrowedGotchisSorting.type)?.paramKey;

    updateSortQueryParams(paramKey, borrowedGotchisSorting.dir);
  }, [borrowedGotchisSorting]);

  useEffect(() => {
    const modifiedGotchis = FilterUtils.getFilteredSortedItems({
      items: borrowedGotchis,
      filters: currentFilters,
      sorting: borrowedGotchisSorting,
      getFilteredItems: FilterUtils.getFilteredItems
    });

    setModifiedGotchis(modifiedGotchis);
  }, [currentFilters, borrowedGotchis, borrowedGotchisSorting]);

  const onSortingChange = (type: string, dir: string): void => {
    dispatch(fromClientStore.setBorrowedGotchisSorting({ type, dir }));
  };

  const sorting: CustomAny = {
    sortingList: sortings,
    sortingDefaults: borrowedGotchisSorting,
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
    FilterUtils.exportData(modifiedGotchis, 'client_gotchis');
  }, [modifiedGotchis]);

  return (
    <>
      <SortFilterPanel
        sorting={sorting}
        itemsLength={modifiedGotchis.length}
        placeholder={<GotchiIcon width={20} height={20} />}
        isShowFilters={true}
        filters={currentFilters}
        setSelectedFilters={onSetSelectedFilters}
        resetFilters={onResetFilters}
        exportData={onExportData}
        filtersCount={activeFiltersCount}
      />

      <ContentInner dataLoading={isInitialBorrowedGotchisLoading}>
        <GotchisLazy
          items={modifiedGotchis}
          renderItem={(id) => (
            <Gotchi
              gotchi={modifiedGotchis[id]}
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
                      items: ['rs']
                    }
                  ]
                },
                'name',
                'lending',
                'channeling',
                'wearablesLine',
                'listing'
              ]}
              isHighlightLending={true}
            />
          )}
        />
      </ContentInner>
    </>
  );
}
