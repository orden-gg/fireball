import {
  FilterComponentType,
  FilterDomainType,
  GraphComparatorOptions,
  GraphFiltersDataType,
  IconName
} from 'shared/constants';

import { DISTRICTS } from 'data/citadel.data';

import { ActivityParcelListingFilterTypes } from '../../constants';
import { ActivityParcelListingFilters } from '../../models';

export const activityParcelListingFilters: ActivityParcelListingFilters = {
  [ActivityParcelListingFilterTypes.Size]: {
    key: `${[ActivityParcelListingFilterTypes.Size]}`,
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
  [ActivityParcelListingFilterTypes.District]: {
    key: `${[ActivityParcelListingFilterTypes.District]}`,
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
  [ActivityParcelListingFilterTypes.FudBoost]: {
    key: `${[ActivityParcelListingFilterTypes.FudBoost]}`,
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
  [ActivityParcelListingFilterTypes.FomoBoost]: {
    key: `${[ActivityParcelListingFilterTypes.FomoBoost]}`,
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
  [ActivityParcelListingFilterTypes.AlphaBoost]: {
    key: `${[ActivityParcelListingFilterTypes.AlphaBoost]}`,
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
  [ActivityParcelListingFilterTypes.KekBoost]: {
    key: `${[ActivityParcelListingFilterTypes.KekBoost]}`,
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
