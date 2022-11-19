import {
    FilterComponentType,
    FilterDomainType,
    GraphComparatorOptions,
    GraphFiltersDataType,
    RarityNumberTypes,
    RarityTypes
} from 'shared/constants';
import { ActivityConsumableListingFilterTypes } from '../../constants';
import { ActivityConsumableListingFilters } from '../../models';

export const activityConsumableListingFilters: ActivityConsumableListingFilters = {
    [ActivityConsumableListingFilterTypes.RarityLevel]: {
        key: `${[ActivityConsumableListingFilterTypes.RarityLevel]}`,
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
    }
};
