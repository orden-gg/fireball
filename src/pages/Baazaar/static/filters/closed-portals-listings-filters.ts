import {
  FilterComponentType,
  FilterDomainType,
  GraphComparatorOptions,
  GraphFiltersDataType,
  GraphFiltersHelperType
} from 'shared/constants';

import { ClosedPortalListingFilterTypes } from '../../constants';
import { ClosedPortalListingFilters } from '../../models';

export const closedPortalListingsFilters: ClosedPortalListingFilters = {
  [ClosedPortalListingFilterTypes.HauntId]: {
    key: `${[ClosedPortalListingFilterTypes.HauntId]}`,
    queryParamKey: 'haunt',
    title: '',
    componentType: FilterComponentType.MultiButtonSelection,
    dataType: GraphFiltersDataType.MultiButtonSelection,
    filterDomainType: FilterDomainType.Equals,
    graphComparatorOptions: [GraphComparatorOptions.IN],
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
    isFilterActive: false
  },
  [ClosedPortalListingFilterTypes.Price]: {
    key: `${[ClosedPortalListingFilterTypes.Price]}`,
    queryParamKey: 'price',
    title: 'price (ghst)',
    componentType: FilterComponentType.RangeSlider,
    dataType: GraphFiltersDataType.RangeSlider,
    filterDomainType: FilterDomainType.Range,
    graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
    isFilterActive: false,
    min: 0,
    max: 1000000,
    value: [0, 1000000],
    isShowIcon: false,
    helperType: GraphFiltersHelperType.Price
  }
};
