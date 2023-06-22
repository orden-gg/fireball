import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import qs from 'query-string';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { CustomParsedQuery, SortingItem } from 'shared/models';

import { gotchisQueryParams } from 'pages/Guilds/constants';
import { gotchiSorting, initialFilters } from 'pages/Guilds/data';
import { GuildGotchi } from 'pages/Guilds/models';

import { ContentInner } from 'components/Content/ContentInner';
import { Gotchi } from 'components/Gotchi/Gotchi';
import { GotchiIcon } from 'components/Icons/Icons';
import { GotchisLazy } from 'components/Lazy/GotchisLazy';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { FilterUtils } from 'utils';

import { guildContentStyles } from './styles';

export function GuildGotchis() {
  const classes = guildContentStyles();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

  const dispatch = useAppDispatch();

  const guildMembers: string[] = useAppSelector(fromGuildsStore.getCurrentGuildMembers);
  const guildGotchis: GuildGotchi[] = useAppSelector(fromGuildsStore.getGuildGotchis);
  const isGuildGotchisLoading: boolean = useAppSelector(fromGuildsStore.getIsGuildGotchisLoading);
  const guildGotchisDefaultSorting: SortingItem = useAppSelector(fromGuildsStore.getGuildGotchisSorting);

  const [currentFilters, setCurrentFilters] = useState<CustomAny>({ ...initialFilters });
  const [modifiedGotchis, setModifiedGotchis] = useState<CustomAny[]>([]);
  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);

  useEffect(() => {
    setCurrentFilters((currentFiltersCache: CustomAny) =>
      FilterUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
    );

    const { sort, dir } = queryParams as CustomParsedQuery;

    if (sort && dir) {
      const key: CustomAny = gotchiSorting.find((sorting) => sorting.paramKey === sort)?.key;

      onSortingChange(key, dir);
    }

    return () => {
      onResetFilters();
    };
  }, []);

  useEffect(() => {
    dispatch(fromGuildsStore.onLoadGuildGotchis(guildMembers));
  }, [guildMembers]);

  useEffect(() => {
    FilterUtils.onFiltersUpdate(
      currentFilters,
      FilterUtils.getActiveFiltersCount,
      setActiveFiltersCount,
      updateFilterQueryParams
    );
  }, [currentFilters]);

  useEffect(() => {
    const paramKey: CustomAny = gotchiSorting.find(
      (sorting) => sorting.key === guildGotchisDefaultSorting.type
    )?.paramKey;

    updateSortQueryParams(paramKey, guildGotchisDefaultSorting.dir);
  }, [guildGotchisDefaultSorting]);

  useEffect(() => {
    const modifiedGotchis = FilterUtils.getFilteredSortedItems({
      items: guildGotchis,
      filters: currentFilters,
      sorting: guildGotchisDefaultSorting,
      getFilteredItems: FilterUtils.getFilteredItems
    });

    setModifiedGotchis(modifiedGotchis);
  }, [currentFilters, guildGotchis, guildGotchisDefaultSorting]);

  const onSortingChange = (type: string, dir: string): void => {
    dispatch(fromGuildsStore.setGuildGotchisSorting({ type, dir }));
  };

  const sorting: CustomAny = {
    sortingList: gotchiSorting,
    sortingDefaults: guildGotchisDefaultSorting,
    onSortingChange: onSortingChange
  };

  const updateSortQueryParams = useCallback(
    (prop: string, dir: string) => {
      const params = { ...queryParams, sort: prop, dir };

      FilterUtils.updateQueryParams(navigate, location.pathname, qs, params, gotchisQueryParams);
    },
    [queryParams, navigate, location.pathname]
  );

  const updateFilterQueryParams = useCallback(
    (filters: CustomAny) => {
      const params: string[] = FilterUtils.getUpdatedQueryParams(queryParams, filters);

      FilterUtils.updateQueryParams(navigate, location.pathname, qs, params, gotchisQueryParams);
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
    FilterUtils.exportData(modifiedGotchis, 'guild_gotchis');
  }, [modifiedGotchis]);

  return (
    <div className={classes.guildGotchis}>
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
      <ContentInner dataLoading={isGuildGotchisLoading}>
        <GotchisLazy
          items={modifiedGotchis}
          renderItem={(id) => (
            <Gotchi
              gotchi={modifiedGotchis[id]}
              className='narrowed'
              render={[
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
                'name'
              ]}
            />
          )}
        />
      </ContentInner>
    </div>
  );
}
