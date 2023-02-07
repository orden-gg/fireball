import {
  FilterComponentType,
  FilterDomainType,
  GraphComparatorOptions,
  GraphFiltersDataType,
  RarityNumberTypes,
  RarityTypes
} from 'shared/constants';

import { ActivityWearableListingFilterTypes } from '../../constants';
import { ActivityWearableListingFilters } from '../../models';

export const activityWearableListingFilters: ActivityWearableListingFilters = {
  [ActivityWearableListingFilterTypes.RarityLevel]: {
    key: `${[ActivityWearableListingFilterTypes.RarityLevel]}`,
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
      },
      {
        title: RarityTypes.Legendary,
        value: `${RarityNumberTypes.Legendary}`,
        isSelected: false,
        queryParamValue: RarityTypes.Legendary
      },
      {
        title: RarityTypes.Mythical,
        value: `${RarityNumberTypes.Mythical}`,
        isSelected: false,
        queryParamValue: RarityTypes.Mythical
      },
      {
        title: RarityTypes.Godlike,
        value: `${RarityNumberTypes.Godlike}`,
        isSelected: false,
        queryParamValue: RarityTypes.Godlike
      }
    ],
    divider: true
  }
};
