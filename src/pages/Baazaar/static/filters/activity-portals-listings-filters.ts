import { FilterComponentType, FilterDomainType, GraphComparatorOptions, GraphFiltersDataType } from 'shared/constants';

import { ActivityPortalListingFilterTypes } from '../../constants';
import { ActivityPortalListingFilters } from '../../models';

export const activityPortalListingsFilters: ActivityPortalListingFilters = {
  [ActivityPortalListingFilterTypes.HauntId]: {
    key: `${[ActivityPortalListingFilterTypes.HauntId]}`,
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
  }
};
