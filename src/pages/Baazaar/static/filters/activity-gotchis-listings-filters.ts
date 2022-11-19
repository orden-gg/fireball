import {
    FilterComponentType,
    FilterDomainType,
    GraphComparatorOptions,
    GraphFiltersDataType,
    IconName
} from 'shared/constants';
import { CollateralData } from 'shared/models';
import { collaterals } from 'data/collaterals.data';

import { ActivityGotchiListingFilterTypes } from '../../constants';
import { ActivityGotchiListingFilters } from '../../models';

export const activityGotchiListingsFilters: ActivityGotchiListingFilters = {
    [ActivityGotchiListingFilterTypes.BRS]: {
        key: `${[ActivityGotchiListingFilterTypes.BRS]}`,
        title: 'BRS',
        queryParamKey: 'brs',
        placeholder: 'min BRS',
        componentType: FilterComponentType.Input,
        dataType: GraphFiltersDataType.Input,
        filterDomainType: FilterDomainType.SingleRange,
        isFilterActive: false,
        value: '',
        graphComparatorOptions: [GraphComparatorOptions.GTE],
        divider: true
    },
    [ActivityGotchiListingFilterTypes.Kinship]: {
        key: `${[ActivityGotchiListingFilterTypes.Kinship]}`,
        title: 'Kin',
        queryParamKey: 'kin',
        placeholder: 'min kin',
        componentType: FilterComponentType.Input,
        dataType: GraphFiltersDataType.Input,
        filterDomainType: FilterDomainType.SingleRange,
        isFilterActive: false,
        value: '',
        graphComparatorOptions: [GraphComparatorOptions.GTE],
        divider: true
    },
    [ActivityGotchiListingFilterTypes.Experience]: {
        key: `${[ActivityGotchiListingFilterTypes.Experience]}`,
        title: 'Exp',
        queryParamKey: 'exp',
        placeholder: 'min exp',
        componentType: FilterComponentType.Input,
        dataType: GraphFiltersDataType.Input,
        filterDomainType: FilterDomainType.SingleRange,
        isFilterActive: false,
        value: '',
        graphComparatorOptions: [GraphComparatorOptions.GTE],
        divider: true
    },
    [ActivityGotchiListingFilterTypes.Collateral]: {
        key: `${[ActivityGotchiListingFilterTypes.Collateral]}`,
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
    [ActivityGotchiListingFilterTypes.NrgTrait]: {
        key: `${[ActivityGotchiListingFilterTypes.NrgTrait]}`,
        title: 'nrg',
        queryParamKey: 'nrg',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSlider,
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
    [ActivityGotchiListingFilterTypes.AggTrait]: {
        key: 'aggTrait',
        title: 'agg',
        queryParamKey: 'agg',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSlider,
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
    [ActivityGotchiListingFilterTypes.SpkTrait]: {
        key: 'spkTrait',
        title: 'spk',
        queryParamKey: 'spk',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSlider,
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
    [ActivityGotchiListingFilterTypes.BrnTrait]: {
        key: 'brnTrait',
        title: 'brn',
        queryParamKey: 'brn',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSlider,
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
    [ActivityGotchiListingFilterTypes.EysTrait]: {
        key: 'eysTrait',
        title: 'eys',
        queryParamKey: 'eys',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSlider,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: 0,
        max: 100,
        value: [0, 100],
        isShowIcon: true,
        iconName: IconName.EyeShape,
        iconProps: { width: 20, height: 20 }
    },
    [ActivityGotchiListingFilterTypes.EycTrait]: {
        key: 'eycTrait',
        title: 'eyc',
        queryParamKey: 'eyc',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSlider,
        filterDomainType: FilterDomainType.Range,
        graphComparatorOptions: [GraphComparatorOptions.GTE, GraphComparatorOptions.LTE],
        isFilterActive: false,
        min: 0,
        max: 100,
        value: [0, 100],
        isShowIcon: true,
        iconName: IconName.EyeColor,
        iconProps: { width: 20, height: 20 }
    }
};
