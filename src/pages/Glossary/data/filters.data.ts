import { FilterComponentType, RarityTypes } from 'shared/constants';
import { defaultMultiSelectionFilter } from 'data/default-filters.data';

import { GlossaryWearablesFilters } from '../models';

export const glossaryWearablesFilters: GlossaryWearablesFilters = {
    rarity: {
        key: 'rarity',
        queryParamKey: 'rarity',
        componentType: FilterComponentType.MultipleAutocomplete,
        title: 'Rarity',
        items: [
            {
                title: RarityTypes.Common,
                value: RarityTypes.Common,
                isSelected: false,
                queryParamValue: RarityTypes.Common
            },
            {
                title: RarityTypes.Uncommon,
                value: RarityTypes.Uncommon,
                isSelected: false,
                queryParamValue: RarityTypes.Uncommon
            },
            {
                title: RarityTypes.Rare,
                value: RarityTypes.Rare,
                isSelected: false,
                queryParamValue: RarityTypes.Rare
            },
            {
                title: RarityTypes.Legendary,
                value: RarityTypes.Legendary,
                isSelected: false,
                queryParamValue: RarityTypes.Legendary
            },
            {
                title: RarityTypes.Mythical,
                value: RarityTypes.Mythical,
                isSelected: false,
                queryParamValue: RarityTypes.Mythical
            },
            {
                title: RarityTypes.Godlike,
                value: RarityTypes.Godlike,
                isSelected: false,
                queryParamValue: RarityTypes.Godlike
            }
        ],
        ...defaultMultiSelectionFilter
    }
};
