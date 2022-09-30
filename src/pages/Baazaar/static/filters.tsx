import { FilterComponentType, GraphComparatorOptions, GraphFiltersDataType, GraphFiltersHelperType, IconName } from 'shared/constants';
import { GotchiListingsFilterTypes } from '../constants';

import { GotchiListingsFilters } from '../models';

export const gotchiListingsFiltersData: GotchiListingsFilters = {
    [GotchiListingsFilterTypes.BRS]: {
        key: `${[GotchiListingsFilterTypes.BRS]}`,
        title: 'BRS',
        queryParamKey: 'brs',
        placeholder: 'min BRS',
        componentType: FilterComponentType.Input,
        dataType: GraphFiltersDataType.InputFilter,
        isFilterActive: false,
        value: '',
        graphComparatorOptions: [
            {
                key: `${[GotchiListingsFilterTypes.BRS]}_${GraphComparatorOptions.GTE}`
            }
        ],
        divider: true
    },
    [GotchiListingsFilterTypes.Kinship]: {
        key: `${[GotchiListingsFilterTypes.Kinship]}`,
        title: 'Kin',
        queryParamKey: 'kin',
        placeholder: 'min kin',
        componentType: FilterComponentType.Input,
        dataType: GraphFiltersDataType.InputFilter,
        isFilterActive: false,
        value: '',
        graphComparatorOptions: [
            {
                key: `${[GotchiListingsFilterTypes.Kinship]}_${GraphComparatorOptions.GTE}`
            }
        ],
        divider: true
    },
    [GotchiListingsFilterTypes.Experience]: {
        key: `${[GotchiListingsFilterTypes.Experience]}`,
        title: 'Exp',
        queryParamKey: 'exp',
        placeholder: 'min exp',
        componentType: FilterComponentType.Input,
        dataType: GraphFiltersDataType.InputFilter,
        isFilterActive: false,
        value: '',
        graphComparatorOptions: [
            {
                key: `${[GotchiListingsFilterTypes.Experience]}_${GraphComparatorOptions.GTE}`
            }
        ],
        divider: true
    },
    [GotchiListingsFilterTypes.Price]: {
        key: `${[GotchiListingsFilterTypes.Price]}`,
        queryParamKey: 'price',
        title: 'price (ghst)',
        componentType: FilterComponentType.RangeSlider,
        dataType: GraphFiltersDataType.RangeSliderFilter,
        graphComparatorOptions: [
            {
                key: `${[GotchiListingsFilterTypes.Price]}_${GraphComparatorOptions.GTE}`,
                valueIndex: 0
            },
            {
                key: `${[GotchiListingsFilterTypes.Price]}_${GraphComparatorOptions.LTE}`,
                valueIndex: 1
            }
        ],
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
        graphComparatorOptions: [
            {
                key: `${[GotchiListingsFilterTypes.NrgTrait]}_${GraphComparatorOptions.GTE}`,
                valueIndex: 0
            },
            {
                key: `${[GotchiListingsFilterTypes.NrgTrait]}_${GraphComparatorOptions.LTE}`,
                valueIndex: 1
            }
        ],
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
        graphComparatorOptions: [
            {
                key: `${[GotchiListingsFilterTypes.AggTrait]}_${GraphComparatorOptions.GTE}`,
                valueIndex: 0
            },
            {
                key: `${[GotchiListingsFilterTypes.AggTrait]}_${GraphComparatorOptions.LTE}`,
                valueIndex: 1
            }
        ],
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
        graphComparatorOptions: [
            {
                key: `${[GotchiListingsFilterTypes.SpkTrait]}_${GraphComparatorOptions.GTE}`,
                valueIndex: 0
            },
            {
                key: `${[GotchiListingsFilterTypes.SpkTrait]}_${GraphComparatorOptions.LTE}`,
                valueIndex: 1
            }
        ],
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
        graphComparatorOptions: [
            {
                key: `${[GotchiListingsFilterTypes.BrnTrait]}_${GraphComparatorOptions.GTE}`,
                valueIndex: 0
            },
            {
                key: `${[GotchiListingsFilterTypes.BrnTrait]}_${GraphComparatorOptions.LTE}`,
                valueIndex: 1
            }
        ],
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
        graphComparatorOptions: [
            {
                key: `${[GotchiListingsFilterTypes.EysTrait]}_${GraphComparatorOptions.GTE}`,
                valueIndex: 0
            },
            {
                key: `${[GotchiListingsFilterTypes.EysTrait]}_${GraphComparatorOptions.LTE}`,
                valueIndex: 1
            }
        ],
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
        graphComparatorOptions: [
            {
                key: `${[GotchiListingsFilterTypes.EycTrait]}_${GraphComparatorOptions.GTE}`,
                valueIndex: 0
            },
            {
                key: `${[GotchiListingsFilterTypes.EycTrait]}_${GraphComparatorOptions.LTE}`,
                valueIndex: 1
            }
        ],
        isFilterActive: false,
        min: -20,
        max: 120,
        value: [-20, 120],
        isShowIcon: true,
        iconName: IconName.EyeColor,
        iconProps: { width: 20, height: 20 }
    }
};
