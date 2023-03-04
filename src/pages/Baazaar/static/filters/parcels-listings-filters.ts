import {
  FilterComponentType,
  FilterDomainType,
  GraphComparatorOptions,
  GraphFiltersDataType,
  GraphFiltersHelperType,
  IconName
} from 'shared/constants';

import { DISTRICTS } from 'data/citadel.data';

import { ParcelListingFilterTypes } from '../../constants';
import { ParcelListingFilters } from '../../models';

export const parcelListingFilters: ParcelListingFilters = {
  [ParcelListingFilterTypes.Size]: {
    key: `${[ParcelListingFilterTypes.Size]}`,
    queryParamKey: 'size',
    title: '',
    componentType: FilterComponentType.MultiButtonSelection,
    dataType: GraphFiltersDataType.MultiButtonSelection,
    filterDomainType: FilterDomainType.Equals,
    graphComparatorOptions: [GraphComparatorOptions.IN],
    items: [
      {
        title: 'Humble',
        value: '0',
        isSelected: false,
        queryParamValue: '0'
      },
      {
        title: 'Reasonable',
        value: '1',
        isSelected: false,
        queryParamValue: '1'
      },
      {
        title: 'Spacious (64x32)',
        value: '2',
        isSelected: false,
        queryParamValue: '2'
      },
      {
        title: 'Spacious (32x64)',
        value: '3',
        isSelected: false,
        queryParamValue: '3'
      }
    ],
    isFilterActive: false,
    divider: true
  },
  [ParcelListingFilterTypes.District]: {
    key: `${[ParcelListingFilterTypes.District]}`,
    queryParamKey: 'district',
    title: 'District',
    componentType: FilterComponentType.MultipleAutocomplete,
    dataType: GraphFiltersDataType.MultiAutocomplete,
    filterDomainType: FilterDomainType.Equals,
    graphComparatorOptions: [GraphComparatorOptions.IN],
    items: DISTRICTS.numbers.map((district: number) => ({
      title: `${district}`,
      value: `${district}`,
      isSelected: false,
      queryParamValue: `${district}`
    })),
    isFilterActive: false,
    divider: true
  },
  [ParcelListingFilterTypes.Price]: {
    key: `${[ParcelListingFilterTypes.Price]}`,
    queryParamKey: 'price',
    title: 'price (ghst)',
    componentType: FilterComponentType.RangeSlider,
    dataType: GraphFiltersDataType.RangeSlider,
    filterDomainType: FilterDomainType.Range,
    graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
    isFilterActive: false,
    min: 0,
    max: 100000,
    value: [0, 100000],
    isShowIcon: false,
    helperType: GraphFiltersHelperType.Price,
    divider: true
  },
  [ParcelListingFilterTypes.FudBoost]: {
    key: `${[ParcelListingFilterTypes.FudBoost]}`,
    queryParamKey: 'fudBoost',
    title: 'fud',
    componentType: FilterComponentType.RangeSlider,
    dataType: GraphFiltersDataType.RangeSlider,
    filterDomainType: FilterDomainType.Range,
    graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
    isFilterActive: false,
    min: 1,
    max: 28,
    value: [1, 28],
    isShowIcon: true,
    iconName: IconName.Fud,
    iconProps: { width: 20, height: 20 }
  },
  [ParcelListingFilterTypes.FomoBoost]: {
    key: `${[ParcelListingFilterTypes.FomoBoost]}`,
    queryParamKey: 'fomoBoost',
    title: 'fomo',
    componentType: FilterComponentType.RangeSlider,
    dataType: GraphFiltersDataType.RangeSlider,
    filterDomainType: FilterDomainType.Range,
    graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
    isFilterActive: false,
    min: 1,
    max: 28,
    value: [1, 28],
    isShowIcon: true,
    iconName: IconName.Fomo,
    iconProps: { width: 20, height: 20 }
  },
  [ParcelListingFilterTypes.AlphaBoost]: {
    key: `${[ParcelListingFilterTypes.AlphaBoost]}`,
    queryParamKey: 'alphaBoost',
    title: 'alpha',
    componentType: FilterComponentType.RangeSlider,
    dataType: GraphFiltersDataType.RangeSlider,
    filterDomainType: FilterDomainType.Range,
    graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
    isFilterActive: false,
    min: 1,
    max: 28,
    value: [1, 28],
    isShowIcon: true,
    iconName: IconName.Alpha,
    iconProps: { width: 20, height: 20 }
  },
  [ParcelListingFilterTypes.KekBoost]: {
    key: `${[ParcelListingFilterTypes.KekBoost]}`,
    queryParamKey: 'kekBoost',
    title: 'kek',
    componentType: FilterComponentType.RangeSlider,
    dataType: GraphFiltersDataType.RangeSlider,
    filterDomainType: FilterDomainType.Range,
    graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
    isFilterActive: false,
    min: 1,
    max: 28,
    value: [1, 28],
    isShowIcon: true,
    iconName: IconName.Kek,
    iconProps: { width: 20, height: 20 }
  }
};
