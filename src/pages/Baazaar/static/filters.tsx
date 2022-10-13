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
import { CollateralData } from 'shared/models';
import { collaterals } from 'data/collaterals.data';
import { DISTRICTS } from 'data/citadel.data';

import {
    ClosedPortalListingFilterTypes,
    GotchiListingsFilterTypes,
    ParcelListingFilterTypes,
    WearableListingFilterTypes
} from '../constants';
import {
    GotchiListingsFilters,
    ClosedPortalListingFilters,
    WearableListingFilters,
    ConsumableListingFilters,
    ParcelListingFilters
} from '../models';

export const gotchiListingsFiltersData: GotchiListingsFilters = {
    [GotchiListingsFilterTypes.BRS]: {
        key: `${[GotchiListingsFilterTypes.BRS]}`,
        title: 'BRS',
        queryParamKey: 'brs',
        placeholder: 'min BRS',
        componentType: FilterComponentType.Input,
        dataType: GraphFiltersDataType.InputFilter,
        filterDomainType: FilterDomainType.SingleRange,
        isFilterActive: false,
        value: '',
        graphComparatorOptions: [GraphComparatorOptions.GTE],
        divider: true
    },
    [GotchiListingsFilterTypes.Kinship]: {
        key: `${[GotchiListingsFilterTypes.Kinship]}`,
        title: 'Kin',
        queryParamKey: 'kin',
        placeholder: 'min kin',
        componentType: FilterComponentType.Input,
        dataType: GraphFiltersDataType.InputFilter,
        filterDomainType: FilterDomainType.SingleRange,
        isFilterActive: false,
        value: '',
        graphComparatorOptions: [GraphComparatorOptions.GTE],
        divider: true
    },
    [GotchiListingsFilterTypes.Experience]: {
        key: `${[GotchiListingsFilterTypes.Experience]}`,
        title: 'Exp',
        queryParamKey: 'exp',
        placeholder: 'min exp',
        componentType: FilterComponentType.Input,
        dataType: GraphFiltersDataType.InputFilter,
        filterDomainType: FilterDomainType.SingleRange,
        isFilterActive: false,
        value: '',
        graphComparatorOptions: [GraphComparatorOptions.GTE],
        divider: true
    },
    [GotchiListingsFilterTypes.Collateral]: {
        key: `${[GotchiListingsFilterTypes.Collateral]}`,
        queryParamKey: 'collateral',
        title: 'Collateral',
        componentType: FilterComponentType.MultiButtonSelection,
        dataType: GraphFiltersDataType.MultiButtonSelection,
        filterDomainType: FilterDomainType.Equals,
        graphComparatorOptions: [GraphComparatorOptions.IN],
        isFilterActive: false,
        items: collaterals.map((collateral: CollateralData) => ({
            title: collateral.name,
            value: collateral.address,
            isSelected: false,
            queryParamValue: collateral.name.toLowerCase()
        })),
        divider: true
    },
    [GotchiListingsFilterTypes.Price]: {
        key: `${[GotchiListingsFilterTypes.Price]}`,
        queryParamKey: 'price',
        title: 'price (ghst)',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSliderFilter,
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
    [GotchiListingsFilterTypes.NrgTrait]: {
        key: `${[GotchiListingsFilterTypes.NrgTrait]}`,
        title: 'nrg',
        queryParamKey: 'nrg',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSliderFilter,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: -20,
        max: 120,
        value: [-20, 120],
        isShowIcon: true,
        iconName: IconName.Energy,
        iconProps: { width: 20, height: 20 }
    },
    [GotchiListingsFilterTypes.AggTrait]: {
        key: 'aggTrait',
        title: 'agg',
        queryParamKey: 'agg',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSliderFilter,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: -20,
        max: 120,
        value: [-20, 120],
        isShowIcon: true,
        iconName: IconName.Aggression,
        iconProps: { width: 20, height: 20 }
    },
    [GotchiListingsFilterTypes.SpkTrait]: {
        key: 'spkTrait',
        title: 'spk',
        queryParamKey: 'spk',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSliderFilter,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: -20,
        max: 120,
        value: [-20, 120],
        isShowIcon: true,
        iconName: IconName.Spookiness,
        iconProps: { width: 20, height: 20 }
    },
    [GotchiListingsFilterTypes.BrnTrait]: {
        key: 'brnTrait',
        title: 'brn',
        queryParamKey: 'brn',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSliderFilter,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: -20,
        max: 120,
        value: [-20, 120],
        isShowIcon: true,
        iconName: IconName.Brain,
        iconProps: { width: 20, height: 20 }
    },
    [GotchiListingsFilterTypes.EysTrait]: {
        key: 'eysTrait',
        title: 'eys',
        queryParamKey: 'eys',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSliderFilter,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: -20,
        max: 120,
        value: [-20, 120],
        isShowIcon: true,
        iconName: IconName.EyeShape,
        iconProps: { width: 20, height: 20 }
    },
    [GotchiListingsFilterTypes.EycTrait]: {
        key: 'eycTrait',
        title: 'eyc',
        queryParamKey: 'eyc',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSliderFilter,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: -20,
        max: 120,
        value: [-20, 120],
        isShowIcon: true,
        iconName: IconName.EyeColor,
        iconProps: { width: 20, height: 20 }
    }
};

export const parcelListingFiltersData: ParcelListingFilters = {
    [ParcelListingFilterTypes.Size]: {
        key: `${[ParcelListingFilterTypes.Size]}`,
        queryParamKey: 'size',
        title: '',
        componentType: FilterComponentType.MultiButtonSelection,
        dataType: GraphFiltersDataType.MultiButtonSelection,
        filterDomainType: FilterDomainType.Equals,
        graphComparatorOptions: [GraphComparatorOptions.IN],
        items: [
            {
                title: 'Humble',
                value: '0',
                isSelected: false,
                queryParamValue: '0'
            },
            {
                title: 'Reasonable',
                value: '1',
                isSelected: false,
                queryParamValue: '1'
            },
            {
                title: 'Spacious (64x32)',
                value: '2',
                isSelected: false,
                queryParamValue: '2'
            },
            {
                title: 'Spacious (32x64)',
                value: '3',
                isSelected: false,
                queryParamValue: '3'
            }
        ],
        isFilterActive: false,
        divider: true
    },
    [ParcelListingFilterTypes.District]: {
        key: `${[ParcelListingFilterTypes.District]}`,
        queryParamKey: 'district',
        title: 'District',
        componentType: FilterComponentType.MultipleAutocomplete,
        dataType: GraphFiltersDataType.MultiAutocomplete,
        filterDomainType: FilterDomainType.Equals,
        graphComparatorOptions: [GraphComparatorOptions.IN],
        items: DISTRICTS.numbers
            .map((district: number) => ({
                title: `${district}`,
                value: `${district}`,
                isSelected: false,
                queryParamValue: `${district}`
            })),
        isFilterActive: false,
        divider: true
    },
    [ParcelListingFilterTypes.Price]: {
        key: `${[ParcelListingFilterTypes.Price]}`,
        queryParamKey: 'price',
        title: 'price (ghst)',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSliderFilter,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: 0,
        max: 100000,
        value: [0, 100000],
        isShowIcon: false,
        helperType: GraphFiltersHelperType.Price,
        divider: true
    },
    [ParcelListingFilterTypes.FudBoost]: {
        key: `${[ParcelListingFilterTypes.FudBoost]}`,
        queryParamKey: 'fudBoost',
        title: 'fud',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSliderFilter,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: 0,
        max: 28,
        value: [0, 28],
        isShowIcon: true,
        iconName: IconName.Fud,
        iconProps: { width: 20, height: 20 }
    },
    [ParcelListingFilterTypes.FomoBoost]: {
        key: `${[ParcelListingFilterTypes.FomoBoost]}`,
        queryParamKey: 'fomoBoost',
        title: 'fomo',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSliderFilter,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: 0,
        max: 28,
        value: [0, 28],
        isShowIcon: true,
        iconName: IconName.Fomo,
        iconProps: { width: 20, height: 20 }
    },
    [ParcelListingFilterTypes.AlphaBoost]: {
        key: `${[ParcelListingFilterTypes.AlphaBoost]}`,
        queryParamKey: 'alphaBoost',
        title: 'alpha',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSliderFilter,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: 0,
        max: 28,
        value: [0, 28],
        isShowIcon: true,
        iconName: IconName.Alpha,
        iconProps: { width: 20, height: 20 }
    },
    [ParcelListingFilterTypes.KekBoost]: {
        key: `${[ParcelListingFilterTypes.KekBoost]}`,
        queryParamKey: 'kekBoost',
        title: 'kek',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSliderFilter,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: 0,
        max: 28,
        value: [0, 28],
        isShowIcon: true,
        iconName: IconName.Kek,
        iconProps: { width: 20, height: 20 }
    }
};

export const closedPortalListingsFiltersData: ClosedPortalListingFilters = {
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
        dataType: GraphFiltersDataType.RangeSliderFilter,
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
        dataType: GraphFiltersDataType.RangeSliderFilter,
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
        dataType: GraphFiltersDataType.RangeSliderFilter,
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
        dataType: GraphFiltersDataType.RangeSliderFilter,
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
        dataType: GraphFiltersDataType.RangeSliderFilter,
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
        dataType: GraphFiltersDataType.RangeSliderFilter,
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

export const consumableListingFiltersData: ConsumableListingFilters = {
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
            }
        ],
        divider: true
    },
    [WearableListingFilterTypes.Price]: {
        key: `${[WearableListingFilterTypes.Price]}`,
        queryParamKey: 'price',
        title: 'price (ghst)',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSliderFilter,
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
