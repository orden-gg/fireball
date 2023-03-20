import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import GrainIcon from '@mui/icons-material/Grain';
import { Button, IconButton } from '@mui/material';

import classNames from 'classnames';
import qs from 'query-string';

import { useAppDispatch, useAppSelector } from 'core/store/hooks';
import {
  getGlossaryWearables,
  getInitialGlossaryWearables,
  getMaxWearablePrice,
  getWearablesIds,
  getWearablesSorting,
  loadWearableListings,
  setWearables,
  setWearablesSorting
} from 'pages/Glossary/store';

import { CardListing } from 'shared/components/CardListing/CardListing';
import { CustomParsedQuery, Sorting, SortingItem, SortingListItem, Wearable } from 'shared/models';

import { GlossaryWearablesFilters } from 'pages/Glossary/models';

import { ContentInner } from 'components/Content/ContentInner';
import { ContentWrapper } from 'components/Content/ContentWrapper';
import { Filters } from 'components/Filters/components/Filters/Filters';
import { WarehouseIcon } from 'components/Icons/Icons';
import { CardBalance, CardGroup, CardImage, CardName, CardSlot, CardStats } from 'components/ItemCard/components';
import { ItemCard } from 'components/ItemCard/containers';
import { ItemsLazy } from 'components/Lazy/ItemsLazy';
import { SortFilterPanel } from 'components/SortFilterPanel/SortFilterPanel';

import { FilterUtils } from 'utils';

import { glossaryWearablesFilters } from '../../data/glossary-filters.data';
import { styles } from './styles';

const sortings: SortingListItem[] = [
  {
    name: 'rarity',
    key: 'rarityId',
    paramKey: 'rarity',
    tooltip: 'rarity',
    icon: <GrainIcon fontSize='small' />
  },
  {
    name: 'price',
    key: 'listingPrice',
    paramKey: 'price',
    tooltip: 'price',
    icon: <AttachMoneyIcon fontSize='small' />
  },
  {
    name: 'quantity',
    key: 'totalQuantity',
    paramKey: 'quantity',
    tooltip: 'quantity',
    icon: <FormatListNumberedIcon fontSize='small' />
  }
];
const initialFilters: GlossaryWearablesFilters = {
  rarity: { ...glossaryWearablesFilters.rarity, divider: true },
  slot: { ...glossaryWearablesFilters.slot, divider: true },
  traitModifier: { ...glossaryWearablesFilters.traitModifier, divider: true },
  search: { ...glossaryWearablesFilters.search, divider: true },
  itemType: { ...glossaryWearablesFilters.itemType },
  benefit: { ...glossaryWearablesFilters.benefit, divider: true },
  listingPrice: { ...glossaryWearablesFilters.listingPrice }
};
const queryParamsOrder: string[] = [
  glossaryWearablesFilters.rarity.queryParamKey,
  glossaryWearablesFilters.slot.queryParamKey,
  glossaryWearablesFilters.traitModifier.queryParamKey,
  glossaryWearablesFilters.search.queryParamKey,
  glossaryWearablesFilters.itemType.queryParamKey,
  glossaryWearablesFilters.benefit.queryParamKey,
  glossaryWearablesFilters.listingPrice.queryParamKey,
  'sort',
  'dir'
];

export function GlossaryWearables() {
  const classes = styles();

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = qs.parse(location.search, { arrayFormat: 'comma' });

  const dispatch = useAppDispatch();
  const initialWearables: Wearable[] = useAppSelector(getInitialGlossaryWearables);
  const wearableIds: number[] = useAppSelector(getWearablesIds);
  const wearables: Wearable[] = useAppSelector(getGlossaryWearables);
  const wearablesSorting: SortingItem = useAppSelector(getWearablesSorting);
  const maxWearablePrice: number = useAppSelector(getMaxWearablePrice);

  const [currentFilters, setCurrentFilters] = useState<GlossaryWearablesFilters>({ ...initialFilters });

  useEffect(() => {
    dispatch(setWearables(initialWearables));
    dispatch(loadWearableListings(wearableIds));

    setCurrentFilters((currentFiltersCache: GlossaryWearablesFilters) =>
      FilterUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCache)
    );

    const { sort, dir } = queryParams as CustomParsedQuery;

    if (sort && dir) {
      const key: Undefinable<string> = sortings.find((sorting) => sorting.paramKey === sort)?.key;

      if (key) {
        onSortingChange(key, dir);
      }
    }

    return () => {
      onResetFilters();

      dispatch(setWearables([]));
      dispatch(setWearablesSorting({ type: 'rarityId', dir: 'asc' }));
    };
  }, []);

  useEffect(() => {
    setCurrentFilters((currentFiltersCache: GlossaryWearablesFilters) => {
      const currentFiltersCacheCopy: GlossaryWearablesFilters = { ...currentFiltersCache };

      currentFiltersCacheCopy.listingPrice = {
        ...currentFiltersCacheCopy.listingPrice,
        max: maxWearablePrice,
        value: [currentFiltersCacheCopy.listingPrice.min, maxWearablePrice]
      };

      let filtersToReturn: GlossaryWearablesFilters;

      if (Object.keys(queryParams).length > 0) {
        filtersToReturn = FilterUtils.getUpdateFiltersFromQueryParams(queryParams, currentFiltersCacheCopy);
      } else {
        filtersToReturn = currentFiltersCacheCopy;
      }

      return filtersToReturn;
    });
  }, [maxWearablePrice]);

  useEffect(() => {
    updateFilterQueryParams(currentFilters);
  }, [currentFilters]);

  useEffect(() => {
    const paramKey: Undefinable<string> = sortings.find((sorting) => sorting.key === wearablesSorting.type)?.paramKey;

    if (paramKey) {
      updateSortQueryParams(paramKey, wearablesSorting.dir);
    }
  }, [wearablesSorting]);

  useEffect(() => {
    const modifiedWearables = FilterUtils.getFilteredSortedItems({
      items: initialWearables,
      filters: currentFilters,
      sorting: wearablesSorting,
      getFilteredItems: FilterUtils.getFilteredItems
    });

    dispatch(setWearables(modifiedWearables));
  }, [currentFilters, initialWearables, wearablesSorting]);

  const onSortingChange = (sortBy: string, sortDir: string): void => {
    dispatch(setWearablesSorting({ dir: sortDir, type: sortBy }));
  };

  const sorting: Sorting = {
    sortingList: sortings,
    sortingDefaults: wearablesSorting,
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
    (filters: GlossaryWearablesFilters) => {
      const params = FilterUtils.getUpdatedQueryParams(queryParams, filters);

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
    FilterUtils.exportData(wearables, 'glossary_wearables');
  }, [wearables]);

  return (
    <ContentWrapper>
      <>
        <SortFilterPanel
          sorting={sorting}
          itemsLength={wearables.length}
          placeholder={<WarehouseIcon width={20} height={20} />}
        />
        <ContentInner dataLoading={false}>
          <ItemsLazy
            items={wearables}
            component={(wearable: Wearable) => (
              <ItemCard id={wearable.id} category={wearable.category} type={wearable.rarity}>
                <CardGroup name='header' className={classes.wearableHeader}>
                  <CardSlot id={wearable.id} className={classes.overridedSlot} />
                  <span className={classes.itemTypeValue}>{wearable.id}</span>
                  <CardBalance balance={`${wearable.totalQuantity}`} holders={[]} />
                </CardGroup>
                <CardGroup name='body'>
                  <CardImage id={wearable.id} />
                  <CardName children={wearable.name} />
                  <CardStats stats={Object.entries(wearable.traitModifiers).map(([_, traitValue]) => traitValue)} />
                  <div className={classes.benefits}>
                    <span className={classes.itemTypeValue}>{wearable.itemType}</span>
                    <span className={classes.benefitValue}>
                      {wearable.benefit.first}, {wearable.benefit.second}
                    </span>
                  </div>
                </CardGroup>
                <CardGroup name='footer'>
                  <CardListing currentListing={wearable.currentListing} lastSoldListing={wearable.lastSoldListing} />
                </CardGroup>
              </ItemCard>
            )}
          />
        </ContentInner>
      </>
      <>
        <IconButton
          className={classes.backButton}
          onClick={() => {
            navigate('/glossary');
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Filters
          className={classNames(classes.section, classes.filtersWrapper)}
          filters={currentFilters}
          onSetSelectedFilters={onSetSelectedFilters}
        />

        <div className={classes.buttonsWrapper}>
          <Button variant='contained' color='warning' size='small' onClick={onResetFilters}>
            Reset
          </Button>
          <Button variant='contained' color='secondary' size='small' onClick={onExportData}>
            Export data (.json)
          </Button>
        </div>
      </>
    </ContentWrapper>
  );
}
