import { FilterComponentType, RarityTypes, TRAITS_MODIFY_KEYS, WearableItemTypes, WerableBenefitTypes } from 'shared/constants';
import { GlossaryWearable, FilterItemOption, MultiAutocompleteFilter, MultiButtonSelectionFilter } from 'shared/models';
import { defaultMultiSelectionFilter, defaultRangeSliderFilter } from 'data/default-filters.data';

import { GlossaryWearablesFilters } from '../models';

export const glossaryWearablesFilters: GlossaryWearablesFilters = {
    rarity: {
        key: 'rarity',
        queryParamKey: 'rarity',
        componentType: FilterComponentType.MultiButtonSelection,
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
    },
    slot: {
        key: 'slot',
        queryParamKey: 'slot',
        componentType: FilterComponentType.MultiButtonSelection,
        items: [
            {
                title: 'body',
                value: 'body',
                isSelected: false,
                queryParamValue: 'body'
            },
            {
                title: 'eyes',
                value: 'eyes',
                isSelected: false,
                queryParamValue: 'eyes'
            },
            {
                title: 'face',
                value: 'face',
                isSelected: false,
                queryParamValue: 'face'
            },
            {
                title: 'l hand',
                value: 'lHand',
                isSelected: false,
                queryParamValue: 'lHand'
            },
            {
                title: 'r hand',
                value: 'rHand',
                isSelected: false,
                queryParamValue: 'rHand'
            },
            {
                title: 'pet',
                value: 'pet',
                isSelected: false,
                queryParamValue: 'pet'
            }
        ],
        ...defaultMultiSelectionFilter,
        predicateFn: (filter: MultiButtonSelectionFilter<GlossaryWearable>, compareItem: GlossaryWearable): boolean => {
            return filter.items.some((item: FilterItemOption) =>
                item.isSelected && compareItem.slotPositions[item.value]
            );
        }
    },
    traitModifier: {
        key: 'traitModifier',
        queryParamKey: 'modifier',
        componentType: FilterComponentType.MultiButtonSelection,
        items: TRAITS_MODIFY_KEYS
            .map((key: string) => ({
                title: key,
                value: key,
                isSelected: false,
                queryParamValue: key
            })),
        ...defaultMultiSelectionFilter,
        predicateFn: (filter: MultiButtonSelectionFilter<GlossaryWearable>, compareItem: GlossaryWearable): boolean => {
            return filter.items.some((item: FilterItemOption) =>
                item.isSelected && compareItem.traitModifiers[item.value]
            );
        }
    },
    itemType: {
        key: 'itemType',
        queryParamKey: 'type',
        title: 'Wearable Types',
        componentType: FilterComponentType.MultipleAutocomplete,
        items: Object.keys(WearableItemTypes).map((key: string) => ({
            title: WearableItemTypes[key] as string,
            value: WearableItemTypes[key] as string,
            isSelected: false,
            queryParamValue: key.toLowerCase()
        })),
        ...defaultMultiSelectionFilter
    },
    benefit: {
        key: 'benefit',
        queryParamKey: 'benefit',
        title: 'Benefits',
        componentType: FilterComponentType.MultipleAutocomplete,
        items: Object.keys(WerableBenefitTypes).map((key: string) => ({
            title: WerableBenefitTypes[key] as string,
            value: WerableBenefitTypes[key] as string,
            isSelected: false,
            queryParamValue: key.toLowerCase()
        })),
        ...defaultMultiSelectionFilter,
        predicateFn: (filter: MultiAutocompleteFilter<GlossaryWearable>, compareItem: GlossaryWearable): boolean => {
            return filter.items.some((item: FilterItemOption) =>
                item.isSelected && (item.value === compareItem.benefit.first || item.value === compareItem.benefit.second)
            );
        }
    },
    listingPrice: {
        key: 'listingPrice',
        queryParamKey: 'price',
        title: 'listing price (ghst)',
        componentType: FilterComponentType.RangeSlider,
        min: 0,
        max: 0,
        value: [0, 0],
        ...defaultRangeSliderFilter
    }
};
