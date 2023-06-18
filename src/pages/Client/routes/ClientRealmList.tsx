import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import HeightIcon from '@mui/icons-material/Height';
import HouseIcon from '@mui/icons-material/House';
import TimerIcon from '@mui/icons-material/Timer';

import qs from 'query-string';

import * as fromClientStore from '../store';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';

import { CustomParsedQuery, RealmVM, SortingItem, SortingListItem } from 'shared/models';

import { ContentInner } from 'components/Content/ContentInner';
import { AlphaIcon, FomoIcon, FudIcon, KekIcon } from 'components/Icons/Icons';
import { Parcel } from 'components/Items/Parcel/Parcel';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { FilterUtils } from 'utils';

import { filtersData } from 'data/filters.data';

import { RealmView } from '../constants';

const sortings: SortingListItem[] = [
  {
    name: 'size',
    key: 'size',
    paramKey: 'size',
    tooltip: 'size',
    icon: <HeightIcon fontSize='small' />
  },
  {
    name: 'district',
    key: 'district',
    paramKey: 'district',
    tooltip: 'district',
    icon: <HouseIcon fontSize='small' />
  },
  {
    name: 'nextChannel',
    key: 'nextChannel',
    paramKey: 'nextChannel',
    tooltip: 'next channel',
    icon: <TimerIcon fontSize='small' />
  },
  {
    name: 'nextClaim',
    key: 'nextClaim',
    paramKey: 'nextClaim',
    tooltip: 'next claim',
    icon: <TimerIcon fontSize='small' />
  },
  {
    name: 'altarLevel',
    key: 'altarLevel',
    paramKey: 'altar',
    tooltip: 'altar level',
    icon: <AutoGraphIcon fontSize='small' />
  },
  {
    name: 'fudBoost',
    key: 'fudBoost',
    paramKey: 'fud',
    tooltip: 'fud boost',
    icon: <FudIcon height={18} width={18} />
  },
  {
    name: 'fomoBoost',
    key: 'fomoBoost',
    paramKey: 'fomo',
    tooltip: 'fomo boost',
    icon: <FomoIcon height={18} width={18} />
  },
  {
    name: 'alphaBoost',
    key: 'alphaBoost',
    paramKey: 'alpha',
    tooltip: 'alpha boost',
    icon: <AlphaIcon height={18} width={18} />
  },
  {
    name: 'kekBoost',
    key: 'kekBoost',
    paramKey: 'kek',
    tooltip: 'kek boost',
    icon: <KekIcon height={18} width={18} />
  }
];
const initialFilters: CustomAny = {
  size: { ...filtersData.size, divider: true },
  altarLevel: { ...filtersData.altarLevel, divider: true },
  nextChannel: { ...filtersData.nextChannel },
  nextClaim: { ...filtersData.nextClaim },
  isUpgradeReady: { ...filtersData.isUpgradeReady, divider: true, class: 'no-padding-top' },
  district: { ...filtersData.district },
  parcelHash: { ...filtersData.parcelHash }
};
const queryParamsOrder: string[] = [
  initialFilters.size.queryParamKey,
  initialFilters.altarLevel.queryParamKey,
  initialFilters.nextChannel.queryParamKey,
  initialFilters.nextClaim.queryParamKey,
  initialFilters.isUpgradeReady.queryParamKey,
  initialFilters.district.queryParamKey,
  initialFilters.parcelHash.queryParamKey,
  'sort',
  'dir'
];

export function ClientRealmList() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

  const dispatch = useAppDispatch();

  const realm: RealmVM[] = useAppSelector(fromClientStore.getRealm);
  const isInitialRealmLoading: boolean = useAppSelector(fromClientStore.getIsInitialRealmLoading);
  const realmSorting: SortingItem = useAppSelector(fromClientStore.getRealmSorting);

  const [currentFilters, setCurrentFilters] = useState<CustomAny>({ ...initialFilters });
  const [modifiedRealm, setModifiedRealm] = useState<RealmVM[]>([]);
  const [activeFiltersCount, setActiveFiltersCount] = useState<number>(0);

  useEffect(() => {
    dispatch(fromClientStore.setRealmView(RealmView.List));
  }, []);

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
    const paramKey: CustomAny = sortings.find((sorting) => sorting.key === realmSorting.type)?.paramKey;

    updateSortQueryParams(paramKey, realmSorting.dir);
  }, [realmSorting]);

  useEffect(() => {
    const modifiedRealm = FilterUtils.getFilteredSortedItems({
      items: realm,
      filters: currentFilters,
      sorting: realmSorting,
      getFilteredItems: FilterUtils.getFilteredItems
    });

    setModifiedRealm(modifiedRealm);
  }, [currentFilters, realm, realmSorting]);

  const onSortingChange = (type: string, dir: string): void => {
    dispatch(fromClientStore.setRealmSorting({ type, dir }));
  };

  const sorting: CustomAny = {
    sortingList: sortings,
    sortingDefaults: realmSorting,
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
      const params: CustomAny = FilterUtils.getUpdatedQueryParams(queryParams, filters);

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
    FilterUtils.exportData(modifiedRealm, 'client_realm');
  }, [modifiedRealm]);
  console.log(modifiedRealm);

  return (
    <>
      <SortFilterPanel
        sorting={sorting}
        itemsLength={modifiedRealm.length}
        placeholder={<KekIcon width={20} height={20} />}
        filters={initialFilters}
        isShowFilters={true}
        setSelectedFilters={onSetSelectedFilters}
        resetFilters={onResetFilters}
        exportData={onExportData}
        filtersCount={activeFiltersCount}
      />

      <ContentInner dataLoading={isInitialRealmLoading}>
        <ItemsLazy items={modifiedRealm} component={(props) => <Parcel parcel={props} />} />
      </ContentInner>
    </>
  );
}
