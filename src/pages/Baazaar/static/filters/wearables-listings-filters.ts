import {
    FilterComponentType,
    FilterDomainType,
    GraphComparatorOptions,
    GraphFiltersDataType,
    GraphFiltersHelperType,
    IconName,
    RarityNumberTypes,
    RarityTypes
} from 'shared/constants';

import { WearableListingFilterTypes } from '../../constants';
import { WearableListingFilters } from '../../models';

export const wearableListingFiltersData: WearableListingFilters = {
    [WearableListingFilterTypes.RarityLevel]: {
        key: `${[WearableListingFilterTypes.RarityLevel]}`,
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
    },
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
        max: 1000000,
        value: [0, 1000000],
        isShowIcon: false,
        helperType: GraphFiltersHelperType.Price,
        divider: true
    },
    [WearableListingFilterTypes.NrgTraitModifier]: {
        key: `${[WearableListingFilterTypes.NrgTraitModifier]}`,
        queryParamKey: 'nrg',
        title: 'nrg',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSlider,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: 1,
        max: 6,
        value: [1, 6],
        isShowIcon: true,
        iconName: IconName.Energy,
        iconProps: { width: 20, height: 20 }
    },
    [WearableListingFilterTypes.AggTraitModifier]: {
        key: `${[WearableListingFilterTypes.AggTraitModifier]}`,
        queryParamKey: 'agg',
        title: 'agg',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSlider,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: 1,
        max: 6,
        value: [1, 6],
        isShowIcon: true,
        iconName: IconName.Aggression,
        iconProps: { width: 20, height: 20 }
    },
    [WearableListingFilterTypes.SpkTraitModifier]: {
        key: `${[WearableListingFilterTypes.SpkTraitModifier]}`,
        queryParamKey: 'spk',
        title: 'spk',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSlider,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: 1,
        max: 6,
        value: [1, 6],
        isShowIcon: true,
        iconName: IconName.Spookiness,
        iconProps: { width: 20, height: 20 }
    },
    [WearableListingFilterTypes.BrnTraitModifier]: {
        key: `${[WearableListingFilterTypes.BrnTraitModifier]}`,
        queryParamKey: 'brn',
        title: 'brn',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSlider,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: 1,
        max: 6,
        value: [1, 6],
        isShowIcon: true,
        iconName: IconName.Brain,
        iconProps: { width: 20, height: 20 }
    }
};
