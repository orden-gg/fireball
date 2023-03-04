import {
  FilterComponentType,
  FilterDomainType,
  GraphComparatorOptions,
  GraphFiltersDataType,
  GraphFiltersHelperType,
  RarityNumberTypes,
  RarityTypes
} from 'shared/constants';

import { ConsumableListingFilterTypes } from '../../constants';
import { ConsumableListingFilters } from '../../models';

export const consumableListingFilters: ConsumableListingFilters = {
  [ConsumableListingFilterTypes.RarityLevel]: {
    key: `${[ConsumableListingFilterTypes.RarityLevel]}`,
    queryParamKey: 'rarity',
    title: '',
    isFilterActive: false,
    componentType: FilterComponentType.MultiButtonSelection,
    dataType: GraphFiltersDataType.MultiButtonSelection,
    filterDomainType: FilterDomainType.Equals,
    graphComparatorOptions: [GraphComparatorOptions.IN],
    items: [
      {
        title: RarityTypes.Common,
        value: `${RarityNumberTypes.Common}`,
        isSelected: false,
        queryParamValue: RarityTypes.Common
      },
      {
        title: RarityTypes.Uncommon,
        value: `${RarityNumberTypes.Uncommon}`,
        isSelected: false,
        queryParamValue: RarityTypes.Uncommon
      },
      {
        title: RarityTypes.Rare,
        value: `${RarityNumberTypes.Rare}`,
        isSelected: false,
        queryParamValue: RarityTypes.Rare
      }
    ],
    divider: true
  },
  [ConsumableListingFilterTypes.Price]: {
    key: `${[ConsumableListingFilterTypes.Price]}`,
    queryParamKey: 'price',
    title: 'price (ghst)',
    componentType: FilterComponentType.RangeSlider,
    dataType: GraphFiltersDataType.RangeSlider,
    filterDomainType: FilterDomainType.Range,
    graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
    isFilterActive: false,
    min: 0,
    max: 10000,
    value: [0, 10000],
    isShowIcon: false,
    helperType: GraphFiltersHelperType.Price
  }
};
