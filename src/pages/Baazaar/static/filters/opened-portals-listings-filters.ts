import { EthersApi } from 'api';

import { FiltersHelper } from 'utils';

import { FilterComponentType, IconName } from 'shared/constants';
import { CollateralData, InputFilter } from 'shared/models';

import { collaterals } from 'data/collaterals.data';
import { defaultMultiSelectionFilter, defaultRangeSliderFilter } from 'data/default-filters.data';

import { OpenedPortalListingFilterTypes } from '../../constants';
import { OpenedPortalListingFilters, OpenedPortalListingVM } from '../../models';

export const openedPortalListingsFilters: OpenedPortalListingFilters = {
  [OpenedPortalListingFilterTypes.BRS]: {
    key: `${[OpenedPortalListingFilterTypes.BRS]}`,
    title: '',
    queryParamKey: 'brs',
    placeholder: 'min BRS',
    componentType: FilterComponentType.Input,
    isFilterActive: false,
    value: '',
    divider: true,
    getIsFilterValidFn: FiltersHelper.inputGetIsFilterValidFn,
    resetFilterFn: FiltersHelper.inputResetFilterFn,
    updateFromQueryFn: FiltersHelper.inputUpdateFromQueryFn,
    updateFromFilterFn: FiltersHelper.inputUpdateFromFilterFn,
    getQueryParamsFn: FiltersHelper.inputGetQueryParamsFn,
    getActiveFiltersCountFn: FiltersHelper.inputGetActiveFiltersCount,
    predicateFn: (filter: InputFilter<OpenedPortalListingVM>, compareItem: OpenedPortalListingVM): boolean => {
      return Number(filter.value) <= compareItem[OpenedPortalListingFilterTypes.BRS];
    }
  },
  [OpenedPortalListingFilterTypes.TokenId]: {
    key: `${[OpenedPortalListingFilterTypes.TokenId]}`,
    title: '',
    queryParamKey: 'id',
    placeholder: 'search by id',
    componentType: FilterComponentType.Input,
    isFilterActive: false,
    value: '',
    divider: true,
    getIsFilterValidFn: FiltersHelper.inputGetIsFilterValidFn,
    predicateFn: FiltersHelper.inputPredicateFn,
    resetFilterFn: FiltersHelper.inputResetFilterFn,
    updateFromQueryFn: FiltersHelper.inputUpdateFromQueryFn,
    updateFromFilterFn: FiltersHelper.inputUpdateFromFilterFn,
    getQueryParamsFn: FiltersHelper.inputGetQueryParamsFn,
    getActiveFiltersCountFn: FiltersHelper.inputGetActiveFiltersCount
  },
  [OpenedPortalListingFilterTypes.HauntId]: {
    key: `${[OpenedPortalListingFilterTypes.HauntId]}`,
    queryParamKey: 'haunt',
    title: '',
    componentType: FilterComponentType.MultiButtonSelection,
    items: [
      {
        title: 'Haunt 1',
        value: '1',
        isSelected: false,
        queryParamValue: '1'
      },
      {
        title: 'Haunt 2',
        value: '2',
        isSelected: false,
        queryParamValue: '2'
      }
    ],
    ...defaultMultiSelectionFilter,
    divider: true
  },
  [OpenedPortalListingFilterTypes.Collateral]: {
    key: `${[OpenedPortalListingFilterTypes.Collateral]}`,
    queryParamKey: 'collateral',
    items: collaterals.map((collateral: CollateralData) => ({
      title: collateral.name,
      value: collateral.address,
      isSelected: false,
      queryParamValue: collateral.name.toLowerCase()
    })),
    componentType: FilterComponentType.MultiButtonSelection,
    ...defaultMultiSelectionFilter,
    divider: true
  },
  [OpenedPortalListingFilterTypes.Price]: {
    key: `${[OpenedPortalListingFilterTypes.Price]}`,
    queryParamKey: 'price',
    title: 'price (ghst)',
    componentType: FilterComponentType.RangeSlider,
    min: 0,
    max: 1000000,
    value: [0, 1000000],
    ...defaultRangeSliderFilter,
    valueMapperFn: (value: number[]): number[] => {
      return value.map((val: number) => EthersApi.toWei(val));
    },
    divider: true
  },
  [OpenedPortalListingFilterTypes.NrgTrait]: {
    key: `${[OpenedPortalListingFilterTypes.NrgTrait]}`,
    title: 'nrg',
    queryParamKey: 'nrg',
    componentType: FilterComponentType.RangeSlider,
    min: -20,
    max: 120,
    value: [-20, 120],
    isShowIcon: true,
    iconName: IconName.Energy,
    iconProps: { width: 20, height: 20 },
    ...defaultRangeSliderFilter
  },
  [OpenedPortalListingFilterTypes.AggTrait]: {
    key: 'aggTrait',
    title: 'agg',
    queryParamKey: 'agg',
    componentType: FilterComponentType.RangeSlider,
    min: -20,
    max: 120,
    value: [-20, 120],
    isShowIcon: true,
    iconName: IconName.Aggression,
    iconProps: { width: 20, height: 20 },
    ...defaultRangeSliderFilter
  },
  [OpenedPortalListingFilterTypes.SpkTrait]: {
    key: 'spkTrait',
    title: 'spk',
    queryParamKey: 'spk',
    componentType: FilterComponentType.RangeSlider,
    min: -20,
    max: 120,
    value: [-20, 120],
    isShowIcon: true,
    iconName: IconName.Spookiness,
    iconProps: { width: 20, height: 20 },
    ...defaultRangeSliderFilter
  },
  [OpenedPortalListingFilterTypes.BrnTrait]: {
    key: 'brnTrait',
    title: 'brn',
    queryParamKey: 'brn',
    componentType: FilterComponentType.RangeSlider,
    min: -20,
    max: 120,
    value: [-20, 120],
    isShowIcon: true,
    iconName: IconName.Brain,
    iconProps: { width: 20, height: 20 },
    ...defaultRangeSliderFilter
  },
  [OpenedPortalListingFilterTypes.EysTrait]: {
    key: 'eysTrait',
    title: 'eys',
    queryParamKey: 'eys',
    componentType: FilterComponentType.RangeSlider,
    min: 0,
    max: 100,
    value: [0, 100],
    isShowIcon: true,
    iconName: IconName.EyeShape,
    iconProps: { width: 20, height: 20 },
    ...defaultRangeSliderFilter
  },
  [OpenedPortalListingFilterTypes.EycTrait]: {
    key: 'eycTrait',
    title: 'eyc',
    queryParamKey: 'eyc',
    componentType: FilterComponentType.RangeSlider,
    min: 0,
    max: 100,
    value: [0, 100],
    isShowIcon: true,
    iconName: IconName.EyeColor,
    iconProps: { width: 20, height: 20 },
    ...defaultRangeSliderFilter
  }
};
