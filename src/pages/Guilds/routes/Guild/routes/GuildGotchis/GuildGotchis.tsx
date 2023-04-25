import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import qs from 'query-string';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { CustomParsedQuery } from 'shared/models';

import { GotchiTypeNames } from 'pages/Guilds/constants';

import { Gotchi } from 'components/Gotchi/Gotchi';
import { GotchiIcon } from 'components/Icons/Icons';
import { GotchisLazy } from 'components/Lazy/GotchisLazy';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { FilterUtils } from 'utils';

import { initialFilters, queryParamsOrder, sortings } from '../../constants';
import { useGotchis } from './hooks/useGotchis';
import { guildContentStyles } from './styles';

export function GuildGotchis({ type }: { type: GotchiTypeNames }) {
  const classes = guildContentStyles();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

  const { gotchis, gotchisCount, isGotchisLoaded, defaultSorting }: CustomAny = useGotchis(type);

  const dispatch = useAppDispatch();
  const currentGuild: CustomAny = useAppSelector(fromGuildsStore.getCurrentGuild);

  const [currentFilters, setCurrentFilters] = useState<CustomAny>({ ...initialFilters });
  const [modifiedGotchis, setModifiedGotchis] = useState<CustomAny[]>([]);
  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);

  useEffect(() => {
    if (currentGuild.members?.length > 0) {
      dispatch(fromGuildsStore.onLoadOwnedGotchis(currentGuild.members));
    }
  }, [currentGuild]);

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
    const paramKey: CustomAny = sortings.find((sorting) => sorting.key === defaultSorting.type)?.paramKey;

    updateSortQueryParams(paramKey, defaultSorting.dir);
  }, [defaultSorting]);

  useEffect(() => {
    const modifiedGotchis = FilterUtils.getFilteredSortedItems({
      items: gotchis,
      filters: currentFilters,
      sorting: defaultSorting,
      getFilteredItems: FilterUtils.getFilteredItems
    });

    setModifiedGotchis(modifiedGotchis);
  }, [currentFilters, gotchis, defaultSorting]);

  const onSortingChange = (type: string, dir: string): void => {
    dispatch(fromGuildsStore.setOwnedGotchisSorting({ type, dir }));
  };

  const sorting: CustomAny = {
    sortingList: sortings,
    sortingDefaults: defaultSorting,
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
    <div className={classes.guildGotchis}>
      <div className={classes.sortingPanelWrap}>
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
      </div>
      {isGotchisLoaded ? (
        gotchisCount > 0 ? (
          <GotchisLazy
            items={modifiedGotchis}
            renderItem={(id) => <Gotchi gotchi={modifiedGotchis[id]} className='narrowed' render={['svg', 'name']} />}
          />
        ) : (
          <div className={classes.noData}>No Gotchis :(</div>
        )
      ) : (
        <CircularProgress className={classes.loading} />
      )}
    </div>
  );
}
