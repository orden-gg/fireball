import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Grid3x3Icon from '@mui/icons-material/Grid3x3';

import * as qs from 'query-string';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import * as fromGuildsStore from 'pages/Guilds/store';

import { Erc721Categories } from 'shared/constants';
import { CustomParsedQuery, SortingItem, SortingListItem } from 'shared/models';

import { GeneralGuildStats, GuildPortal } from 'pages/Guilds/models';

import { ContentInner } from 'components/Content/ContentInner';
import { H1SealedPortalIcon } from 'components/Icons/Icons';
import { CardGroup, CardName, CardPortalImage, CardSlot } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { FilterUtils } from 'utils';

import { filtersData } from 'data/filters.data';

import { guildPortalsStyles } from './styles';

const sortings: SortingListItem[] = [
  {
    name: 'id',
    key: 'id',
    paramKey: 'id',
    tooltip: 'id',
    icon: <Grid3x3Icon fontSize='small' />
  }
];
const initialFilters: CustomAny = {
  hauntId: { ...filtersData.hauntId, divider: true }
};
const queryParamsOrder: string[] = ['haunt', 'sort', 'dir'];

export function GuildPortals() {
  const classes = guildPortalsStyles();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

  const dispatch = useAppDispatch();

  const guildMembers: string[] = useAppSelector(fromGuildsStore.getCurrentGuildMembers);
  const guildStats: GeneralGuildStats = useAppSelector(fromGuildsStore.getGuildStats);
  const guildPortals: GuildPortal[] = useAppSelector(fromGuildsStore.getGuildPortals);
  const guildPortalsSorting: SortingItem = useAppSelector(fromGuildsStore.getGuildPortalsSorting);
  const isGuildPortalsLoading: boolean = useAppSelector(fromGuildsStore.getIsGuildPortalsLoading);

  const [currentFilters, setCurrentFilters] = useState<CustomAny>({ ...initialFilters });
  const [modifiedPortals, setModifiedPortals] = useState<CustomAny[]>([]);
  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);

  useEffect(() => {
    // TODO: brainstorm this condition
    if (guildStats.portalsCount !== 0) {
      dispatch(fromGuildsStore.onLoadGuildPortals(guildMembers, guildStats.portalsCount));
    }
  }, [guildMembers, guildStats.portalsCount]);

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
    const paramKey: CustomAny = sortings.find((sorting) => sorting.key === guildPortalsSorting.type)?.paramKey;

    updateSortQueryParams(paramKey, guildPortalsSorting.dir);
  }, [guildPortalsSorting]);

  useEffect(() => {
    const modifiedPortals = FilterUtils.getFilteredSortedItems({
      items: guildPortals,
      filters: currentFilters,
      sorting: guildPortalsSorting,
      getFilteredItems: FilterUtils.getFilteredItems
    });

    setModifiedPortals(modifiedPortals);
  }, [currentFilters, guildPortals, guildPortalsSorting]);

  const onSortingChange = (type: string, dir: string): void => {
    dispatch(fromGuildsStore.setGuildPortalsSorting({ type, dir }));
  };

  const sorting: CustomAny = {
    sortingList: sortings,
    sortingDefaults: guildPortalsSorting,
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
    FilterUtils.exportData(modifiedPortals, 'guild_portals');
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
      <ContentInner dataLoading={isGuildPortalsLoading}>
        <div className={classes.guildPortals}>
          {modifiedPortals.map((portal: GuildPortal, index: number) => (
            <div key={index}>
              <ItemCard type={`haunt${portal.hauntId}`} id={portal.id}>
                <CardGroup name='body'>
                  <CardSlot>{`Haunt ${portal.hauntId}`}</CardSlot>
                  <CardPortalImage
                    category={portal.openedAt ? Erc721Categories.OpenedPortal : Erc721Categories.ClosedPortal}
                    hauntId={portal.hauntId}
                  />
                  <CardName>{`Portal ${portal.id}`}</CardName>
                </CardGroup>
              </ItemCard>
            </div>
          ))}
        </div>
      </ContentInner>
    </>
  );
}
