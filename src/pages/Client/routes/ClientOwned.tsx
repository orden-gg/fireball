import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ScienceIcon from '@mui/icons-material/Science';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import qs from 'query-string';

import { CustomParsedQuery, SortingListItem } from 'shared/models';
import { ContentInner } from 'components/Content/ContentInner';
import { GotchisLazy } from 'components/Lazy/GotchisLazy';
import { Gotchi } from 'components/Gotchi/Gotchi';
import { GotchiIcon } from 'components/Icons/Icons';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';
import { ClientContext } from 'contexts/ClientContext';
import { filtersData } from 'data/filters.data';
import { FilterUtils } from 'utils';

const sortings: SortingListItem[] = [
  {
    name: 'id',
    key: 'id',
    paramKey: 'id',
    tooltip: 'gotchi id',
    icon: <Grid3x3Icon fontSize='small' />
  },
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
  },
  {
    name: 'experience',
    key: 'experience',
    paramKey: 'exp',
    tooltip: 'experience',
    icon: <ScienceIcon fontSize='small' />
  },
  {
    name: 'age',
    key: 'createdAt',
    paramKey: 'age',
    tooltip: 'age',
    icon: <CalendarMonthIcon fontSize='small' />
  }
];

const initialFilters: any = {
  hauntId: { ...filtersData.hauntId, divider: true },
  collateral: { ...filtersData.collateral, divider: true },
  search: { ...filtersData.search }
};
const queryParamsOrder: string[] = ['haunt', 'collateral', 'search', 'sort', 'dir'];

export function ClientOwned() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

  const { gotchis, gotchisSorting, setGotchisSorting, loadingGotchis } = useContext<any>(ClientContext);
  const [currentFilters, setCurrentFilters] = useState<any>({ ...initialFilters });
  const [modifiedGotchis, setModifiedGotchis] = useState<any[]>([]);
  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);

  useEffect(() => {
    setCurrentFilters((currentFiltersCache: any) =>
      FilterUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
    );

    const { sort, dir } = queryParams as CustomParsedQuery;

    if (sort && dir) {
      const key: any = sortings.find(sorting => sorting.paramKey === sort)?.key;

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
    const paramKey: any = sortings.find(sorting => sorting.key === gotchisSorting.type)?.paramKey;

    updateSortQueryParams(paramKey, gotchisSorting.dir);
  }, [gotchisSorting]);

  useEffect(() => {
    const modifiedGotchis = FilterUtils.getFilteredSortedItems({
      items: gotchis,
      filters: currentFilters,
      sorting: gotchisSorting,
      getFilteredItems: FilterUtils.getFilteredItems
    });

    setModifiedGotchis(modifiedGotchis);
  }, [currentFilters, gotchis, gotchisSorting]);

  const onSortingChange = useCallback(
    (type: string, dir: string) => {
      setGotchisSorting({ type, dir });
    },
    [setGotchisSorting]
  );

  const sorting: any = {
    sortingList: sortings,
    sortingDefaults: gotchisSorting,
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

      <ContentInner dataLoading={loadingGotchis}>
        <GotchisLazy
          items={modifiedGotchis}
          renderItem={id => (
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
                      items: ['rs', 'skillpoints']
                    }
                  ]
                },
                'name',
                'traits',
                {
                  className: 'gotchiBadges',
                  items: ['channeling', 'badges']
                },
                'wearablesLine',
                'listing',
                'rewards'
              ]}
              isHighlightLending={true}
            />
          )}
        />
      </ContentInner>
    </>
  );
}
