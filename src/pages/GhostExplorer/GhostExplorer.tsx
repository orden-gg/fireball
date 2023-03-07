import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import ScienceIcon from '@mui/icons-material/Science';

import qs from 'query-string';

import { TheGraphApi } from 'api';

// store
import * as fromDataReloadStore from 'core/store/data-reload';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';

import { DataReloadType } from 'shared/constants';
import { CustomParsedQuery, SortingItem, SortingListItem } from 'shared/models';

import { ContentInner } from 'components/Content/ContentInner';
import { Gotchi } from 'components/Gotchi/Gotchi';
import { GotchiIcon } from 'components/Icons/Icons';
import { GotchisLazy } from 'components/Lazy/GotchisLazy';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { FilterUtils } from 'utils';

import { filtersData } from 'data/filters.data';

import { styles } from './styles';

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
const queryParamsOrder: string[] = ['hauntId', 'collateral', 'search', 'sort', 'dir'];

export function GhostExplorer() {
  const classes = styles();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

  const dispatch = useAppDispatch();

  const lastManuallyTriggeredTimestamp: number = useAppSelector(fromDataReloadStore.getLastManuallyTriggeredTimestamp);

  const [isGotchisLoading, setIsGotchisLoading] = useState<boolean>(false);
  const [gotchis, setGotchis] = useState<any[]>([]);
  const [modifiedGotchis, setModifiedGotchis] = useState<any[]>([]);
  const [gotchisSorting, setGotchisSorting] = useState<SortingItem>({ type: 'modifiedRarityScore', dir: 'desc' });
  const [currentFilters, setCurrentFilters] = useState<any>({ ...initialFilters });
  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);
  const [canBeUpdated, setCanBeUpdated] = useState<boolean>(false);

  useEffect(() => {
    setCurrentFilters((currentFiltersCache: any) =>
      FilterUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
    );

    const { sort, dir } = queryParams as CustomParsedQuery;

    if (sort && dir) {
      const key: any = sortings.find((sorting) => sorting.paramKey === sort)?.key;

      onSortingChange(key, dir);
    }

    dispatch(fromDataReloadStore.onSetReloadType(DataReloadType.Explorer));

    return () => {
      onResetFilters();
      dispatch(fromDataReloadStore.onSetReloadType(null));
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    onGetGotchies(isMounted, true);

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (lastManuallyTriggeredTimestamp !== 0 && canBeUpdated) {
      let isMounted = true;

      onGetGotchies(isMounted);

      return () => {
        isMounted = false;
      };
    }
  }, [lastManuallyTriggeredTimestamp]);

  useEffect(() => {
    FilterUtils.onFiltersUpdate(
      currentFilters,
      FilterUtils.getActiveFiltersCount,
      setActiveFiltersCount,
      updateFilterQueryParams
    );
  }, [currentFilters]);

  useEffect(() => {
    const paramKey: any = sortings.find((sorting) => sorting.key === gotchisSorting.type)?.paramKey;

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

  const onGetGotchies = (isMounted: boolean, shouldUpdateIsLoading: boolean = false): void => {
    dispatch(fromDataReloadStore.setIsReloadDisabled(true));
    setIsGotchisLoading(shouldUpdateIsLoading);

    TheGraphApi.getAllGotchies()
      .then((response: any[]) => {
        if (isMounted) {
          setGotchis(response);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        setIsGotchisLoading(false);
        dispatch(fromDataReloadStore.setIsReloadDisabled(false));
        dispatch(fromDataReloadStore.setLastUpdatedTimestamp(Date.now()));
        setCanBeUpdated(true);
      });
  };

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
      const params = FilterUtils.getUpdatedQueryParams(queryParams, filters);

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
    FilterUtils.exportData(modifiedGotchis, 'explorer');
  }, [modifiedGotchis]);

  return (
    <div className={classes.container}>
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

      <ContentInner dataLoading={isGotchisLoading}>
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
                      items: ['rs', 'skillpoints']
                    }
                  ]
                },
                'name',
                'traits',
                'wearablesLine',
                'listing'
              ]}
            />
          )}
        />
      </ContentInner>
    </div>
  );
}
