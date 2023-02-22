import {
  FilterComponentType,
  FilterDomainType,
  GraphComparatorOptions,
  GraphFiltersDataType,
  GraphFiltersHelperType
} from 'shared/constants';

import { WearableListingFilterTypes } from '../../constants';
import { InstallationListingFilters } from '../../models';

export const installationListingFilters: InstallationListingFilters = {
  [WearableListingFilterTypes.Price]: {
    key: `${[WearableListingFilterTypes.Price]}`,
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
