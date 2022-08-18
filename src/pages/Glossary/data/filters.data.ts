import { FilterComponentType, RarityTypes, TRAITS_MODIFY_KEYS } from 'shared/constants';
import { Erc1155Item } from 'shared/models';
import { defaultMultiSelectionFilter, defaultRangeSliderFilter } from 'data/default-filters.data';

import { GlossaryWearablesFilters, FilterItemsOption, MultiButtonSelectionFilter } from '../models';

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
                title: 'L Hand',
                value: 'lHand',
                isSelected: false,
                queryParamValue: 'lHand'
            },
            {
                title: 'R Hand',
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
        predicateFn: (filter: MultiButtonSelectionFilter<Erc1155Item>, compareItem: Erc1155Item): boolean => {
            return filter.items.some((item: FilterItemsOption) =>
                item.isSelected && compareItem.slotPositions[item.value]
            );
        }
    },
    traitModifier: {
        key: 'traitModifier',
        queryParamKey: 'traitModifier',
        componentType: FilterComponentType.MultiButtonSelection,
        items: TRAITS_MODIFY_KEYS
            .map((key: string) => ({
                title: key.toUpperCase(),
                value: key,
                isSelected: false,
                queryParamValue: key
            })),
        ...defaultMultiSelectionFilter,
        predicateFn: (filter: MultiButtonSelectionFilter<Erc1155Item>, compareItem: Erc1155Item): boolean => {
            return filter.items.some((item: FilterItemsOption) =>
                item.isSelected && compareItem.traitModifiers[item.value]
            );
        }
    },
    listingPrice: {
        key: 'listingPrice',
        queryParamKey: 'price',
        title: 'listing price (ghst)',
        componentType: FilterComponentType.RangeSlider,
        min: 0,
        max: 200000,
        value: [0, 200000],
        ...defaultRangeSliderFilter
    }
};
