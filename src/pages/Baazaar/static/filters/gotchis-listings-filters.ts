import {
  FilterComponentType,
  FilterDomainType,
  GraphComparatorOptions,
  GraphFiltersDataType,
  GraphFiltersHelperType,
  IconName
} from 'shared/constants';
import { CollateralData } from 'shared/models';
import { collaterals } from 'data/collaterals.data';

import { GotchiListingsFilterTypes } from '../../constants';
import { GotchiListingsFilters } from '../../models';

export const gotchiListingsFilters: GotchiListingsFilters = {
  [GotchiListingsFilterTypes.BRS]: {
    key: `${[GotchiListingsFilterTypes.BRS]}`,
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
  [GotchiListingsFilterTypes.Kinship]: {
    key: `${[GotchiListingsFilterTypes.Kinship]}`,
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
  [GotchiListingsFilterTypes.Experience]: {
    key: `${[GotchiListingsFilterTypes.Experience]}`,
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
  [GotchiListingsFilterTypes.NameLowerCase]: {
    key: `${[GotchiListingsFilterTypes.NameLowerCase]}`,
    title: 'Name',
    queryParamKey: 'name',
    placeholder: 'search by name',
    componentType: FilterComponentType.Input,
    dataType: GraphFiltersDataType.Input,
    filterDomainType: FilterDomainType.Contains,
    isFilterActive: false,
    value: '',
    graphComparatorOptions: [GraphComparatorOptions.CONTAINS_NOCASE],
    divider: true
  },
  [GotchiListingsFilterTypes.HauntId]: {
    key: `${[GotchiListingsFilterTypes.HauntId]}`,
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
  [GotchiListingsFilterTypes.NrgTrait]: {
    key: `${[GotchiListingsFilterTypes.NrgTrait]}`,
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
  [GotchiListingsFilterTypes.AggTrait]: {
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
  [GotchiListingsFilterTypes.SpkTrait]: {
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
  [GotchiListingsFilterTypes.BrnTrait]: {
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
  [GotchiListingsFilterTypes.EysTrait]: {
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
  [GotchiListingsFilterTypes.EycTrait]: {
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
