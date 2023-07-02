import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import { Avatar, Chip } from '@mui/material';

import { DateTime } from 'luxon';

import { EthersApi } from 'api';

import { FilterComponentType } from 'shared/constants';
import { CollateralData } from 'shared/models';

import { CommonUtils, FiltersHelper, GotchiverseUtils } from 'utils';

import { DISTRICTS } from 'data/citadel.data';
import { collaterals } from 'data/collaterals.data';
import { defaultMultiSelectionFilter, defaultRangeSliderFilter } from 'data/default-filters.data';
import guilds from 'data/guilds.json';

export const filtersData = {
  hauntId: {
    key: 'hauntId',
    queryParamKey: 'haunt',
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
    componentType: FilterComponentType.MultiButtonSelection,
    ...defaultMultiSelectionFilter
  },
  collateral: {
    key: 'collateral',
    queryParamKey: 'collateral',
    items: collaterals.map((collateral: CollateralData) => ({
      title: collateral.name,
      value: collateral.address,
      isSelected: false,
      queryParamValue: collateral.name.toLowerCase()
    })),
    componentType: FilterComponentType.MultiButtonSelection,
    ...defaultMultiSelectionFilter
  },
  parcelHash: {
    key: 'parcelHash',
    queryParamKey: 'parcelHash',
    isMultipleKeys: true,
    keys: ['id', 'parcelHash'],
    componentType: FilterComponentType.Input,
    title: 'Search',
    placeholder: 'parcelHash or id',
    value: '',
    isFilterActive: false,
    getIsFilterValidFn: FiltersHelper.inputGetIsFilterValidFn,
    resetFilterFn: FiltersHelper.inputResetFilterFn,
    predicateFn: FiltersHelper.inputPredicateFn,
    updateFromQueryFn: FiltersHelper.inputUpdateFromQueryFn,
    updateFromFilterFn: FiltersHelper.inputUpdateFromFilterFn,
    getQueryParamsFn: FiltersHelper.inputGetQueryParamsFn,
    getActiveFiltersCountFn: FiltersHelper.inputGetActiveFiltersCount
  },
  search: {
    key: 'search',
    queryParamKey: 'search',
    isMultipleKeys: true,
    keys: ['id', 'name'],
    componentType: FilterComponentType.Input,
    title: 'Search',
    placeholder: 'name or id',
    value: '',
    isFilterActive: false,
    getIsFilterValidFn: FiltersHelper.inputGetIsFilterValidFn,
    resetFilterFn: FiltersHelper.inputResetFilterFn,
    predicateFn: FiltersHelper.inputPredicateFn,
    updateFromQueryFn: FiltersHelper.inputUpdateFromQueryFn,
    updateFromFilterFn: FiltersHelper.inputUpdateFromFilterFn,
    getQueryParamsFn: FiltersHelper.inputGetQueryParamsFn,
    getActiveFiltersCountFn: FiltersHelper.inputGetActiveFiltersCount
  },
  guild: {
    key: 'guild',
    queryParamKey: 'guild',
    componentType: FilterComponentType.MultipleAutocomplete,
    title: 'Guilds',
    items: guilds
      .filter((guild: CustomAny) => guild.members.length > 0)
      .map((guild: CustomAny) => ({
        title: CommonUtils.stringToKey(guild.name),
        value: CommonUtils.stringToKey(guild.name),
        isSelected: false,
        queryParamValue: CommonUtils.stringToKey(guild.name)
      })),
    renderTagsFn(tagValue: CustomAny, getTagProps: CustomAny) {
      return tagValue.map((option: CustomAny, index: number) => (
        <Chip
          size='small'
          label={option.title}
          key={option.title}
          avatar={<Avatar src={GotchiverseUtils.getGuildImg(option.title)} alt={option.title} />}
          {...getTagProps({ index })}
        />
      ));
    },
    ...defaultMultiSelectionFilter
  },
  borrower: {
    key: 'borrower',
    queryParamKey: 'borrower',
    componentType: FilterComponentType.MultipleAutocomplete,
    title: 'Borrower',
    items: [],
    ...defaultMultiSelectionFilter
  },
  originalOwnerId: {
    key: 'originalOwnerId',
    queryParamKey: 'originalOwnerId',
    componentType: FilterComponentType.MultipleAutocomplete,
    title: 'OriginalOwnerId',
    items: [],
    ...defaultMultiSelectionFilter
  },
  whitelistId: {
    key: 'whitelistId',
    queryParamKey: 'whitelistId',
    componentType: FilterComponentType.SingleAutocomplete,
    title: 'Whitelist',
    items: [],
    isFilterActive: false,
    getIsFilterValidFn: FiltersHelper.singleSelectionGetIsFilterValidFn,
    resetFilterFn: FiltersHelper.singleSelectionResetFilterFn,
    predicateFn: FiltersHelper.singleSelectionPredicateFn,
    updateFromQueryFn: FiltersHelper.singleSelectionUpdateFromQueryFn,
    updateFromFilterFn: FiltersHelper.singleSelectionUpdateFromFilterFn,
    getQueryParamsFn: FiltersHelper.singleSelectionGetQueryParamsFn,
    getActiveFiltersCountFn: FiltersHelper.singleSelectionGetActiveFiltersCount
  },
  period: {
    key: 'period',
    queryParamKey: 'period',
    title: 'rental period (hours)',
    icon: <AccessTimeIcon fontSize='small' />,
    componentType: FilterComponentType.RangeSlider,
    min: 0,
    max: 720,
    value: [0, 720],
    valueMapperFn: (value: CustomAny): CustomAny => {
      return value.map((val: CustomAny) => val * 60 * 60);
    },
    ...defaultRangeSliderFilter
  },
  splitBorrower: {
    key: 'splitBorrower',
    queryParamKey: 'borrower',
    title: 'borrower revenue (%)',
    icon: <PercentIcon fontSize='small' />,
    componentType: FilterComponentType.RangeSlider,
    min: 0,
    max: 100,
    value: [0, 100],
    ...defaultRangeSliderFilter
  },
  upfrontCost: {
    key: 'upfrontCost',
    queryParamKey: 'upfront',
    title: 'upfront cost (ghst)',
    icon: <AttachMoneyIcon fontSize='small' />,
    componentType: FilterComponentType.RangeSlider,
    min: 0,
    max: 100,
    value: [0, 100],
    valueMapperFn: (value: CustomAny): CustomAny => {
      return value.map((val: CustomAny) => EthersApi.toWei(val));
    },
    ...defaultRangeSliderFilter
  },
  nrgTrait: {
    key: 'modifiedNumericTraits[0]',
    queryParamKey: 'modifiedNumericTraitsNrg',
    title: 'NrgTrait -20 / +120',
    icon: <PercentIcon fontSize='small' />,
    componentType: FilterComponentType.RangeSlider,
    min: -20,
    max: 120,
    value: [-20, 120],
    ...defaultRangeSliderFilter
  },
  lastChanneledAlchemica: {
    key: 'lastChanneledAlchemica',
    queryParamKey: 'lastChanneledAlchemica',
    title: 'Is channeling ready',
    value: false,
    componentType: FilterComponentType.Checkbox,
    isFilterActive: false,
    getIsFilterValidFn: FiltersHelper.checkboxGetIsFilterValidFn,
    resetFilterFn: FiltersHelper.checkboxResetFilterFn,
    predicateFn: (filter: CustomAny, compareItem: CustomAny, key: CustomAny): CustomAny => {
      let predicate: CustomAny;
      if (!filter.value || !compareItem[key]) {
        predicate = true;
      } else {
        const today = new Date();
        today.setUTCHours(0);
        today.setUTCMinutes(0);
        today.setUTCSeconds(0);
        predicate = today.getTime() >= compareItem[key] * 1000;
      }

      return predicate;
    },
    updateFromQueryFn: FiltersHelper.checkboxUpdateFromQueryFn,
    updateFromFilterFn: FiltersHelper.checkboxUpdateFromFilterFn,
    getQueryParamsFn: FiltersHelper.checkboxGetQueryParamsFn,
    getActiveFiltersCountFn: FiltersHelper.checkboxGetActiveFiltersCount
  },
  dayCryoKinChanneledAlchemica: {
    key: 'dayCryoKinChanneledAlchemica',
    queryParamKey: 'dayCryoKinChanneledAlchemica',
    title: 'Is channeling ready for high kinship 1400 and up + 24h',
    value: false,
    componentType: FilterComponentType.Checkbox,
    isFilterActive: false,
    getIsFilterValidFn: FiltersHelper.checkboxGetIsFilterValidFn,
    resetFilterFn: FiltersHelper.checkboxResetFilterFn,
    predicateFn: (filter: CustomAny, compareItem: CustomAny): CustomAny => {
      let predicate: CustomAny;
      if (!filter.value || !compareItem['lastChanneledAlchemica']) {
        predicate = true;
      } else {
        const today = Date.now();

        predicate =
          today >= compareItem['lastChanneledAlchemica'] * 1000 + 86400000 * 1 && compareItem['kinship'] >= 1400;
      }

      return predicate;
    },
    updateFromQueryFn: FiltersHelper.checkboxUpdateFromQueryFn,
    updateFromFilterFn: FiltersHelper.checkboxUpdateFromFilterFn,
    getQueryParamsFn: FiltersHelper.checkboxGetQueryParamsFn,
    getActiveFiltersCountFn: FiltersHelper.checkboxGetActiveFiltersCount
  },
  dayWarmKinChanneledAlchemica: {
    key: 'dayWarmKinChanneledAlchemica',
    queryParamKey: 'dayWarmKinChanneledAlchemica',
    title: 'Is channeling ready for medium kinship 1100 - 1400 + 36h',
    value: false,
    componentType: FilterComponentType.Checkbox,
    isFilterActive: false,
    getIsFilterValidFn: FiltersHelper.checkboxGetIsFilterValidFn,
    resetFilterFn: FiltersHelper.checkboxResetFilterFn,
    predicateFn: (filter: CustomAny, compareItem: CustomAny): CustomAny => {
      let predicate: CustomAny;
      if (!filter.value || !compareItem['lastChanneledAlchemica']) {
        predicate = true;
      } else {
        const today = Date.now();

        predicate =
          today >= compareItem['lastChanneledAlchemica'] * 1000 + 129600000 &&
          compareItem['kinship'] >= 1100 &&
          compareItem['kinship'] < 1400;
      }

      return predicate;
    },
    updateFromQueryFn: FiltersHelper.checkboxUpdateFromQueryFn,
    updateFromFilterFn: FiltersHelper.checkboxUpdateFromFilterFn,
    getQueryParamsFn: FiltersHelper.checkboxGetQueryParamsFn,
    getActiveFiltersCountFn: FiltersHelper.checkboxGetActiveFiltersCount
  },
  dayHotKinChanneledAlchemica: {
    key: 'dayHotKinChanneledAlchemica',
    queryParamKey: 'dayHotKinChanneledAlchemica',
    title: 'Is channeling ready for lower kinship under 1100 + 48h ',
    value: false,
    componentType: FilterComponentType.Checkbox,
    isFilterActive: false,
    getIsFilterValidFn: FiltersHelper.checkboxGetIsFilterValidFn,
    resetFilterFn: FiltersHelper.checkboxResetFilterFn,
    predicateFn: (filter: CustomAny, compareItem: CustomAny): CustomAny => {
      let predicate: CustomAny;
      if (!filter.value || !compareItem['lastChanneledAlchemica']) {
        predicate = true;
      } else {
        const today = Date.now();

        predicate = today >= compareItem['lastChanneledAlchemica'] * 1000 + 172800000 && compareItem['kinship'] < 1100;
      }

      return predicate;
    },
    updateFromQueryFn: FiltersHelper.checkboxUpdateFromQueryFn,
    updateFromFilterFn: FiltersHelper.checkboxUpdateFromFilterFn,
    getQueryParamsFn: FiltersHelper.checkboxGetQueryParamsFn,
    getActiveFiltersCountFn: FiltersHelper.checkboxGetActiveFiltersCount
  },
  size: {
    key: 'size',
    queryParamKey: 'size',
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
    componentType: FilterComponentType.MultiButtonSelection,
    ...defaultMultiSelectionFilter
  },
  district: {
    key: 'district',
    queryParamKey: 'district',
    title: 'District',
    items: DISTRICTS.numbers.map((district: CustomAny) => ({
      title: `${district}`,
      value: `${district}`,
      isSelected: false,
      queryParamValue: `${district}`
    })),
    componentType: FilterComponentType.MultipleAutocomplete,
    renderTagsFn: (tagValue: CustomAny, getTagProps: CustomAny): CustomAny => {
      return tagValue.map((option: CustomAny, index: number) => (
        <Chip size='small' label={option.title} key={option.title} {...getTagProps({ index })} />
      ));
    },
    ...defaultMultiSelectionFilter
  },
  nextChannel: {
    key: 'nextChannel',
    queryParamKey: 'channeling',
    title: 'Is channeling ready',
    value: false,
    componentType: FilterComponentType.Checkbox,
    isFilterActive: false,
    getIsFilterValidFn: FiltersHelper.checkboxGetIsFilterValidFn,
    resetFilterFn: FiltersHelper.checkboxResetFilterFn,
    predicateFn: (filter: CustomAny, compareItem: CustomAny, key: CustomAny): CustomAny => {
      let predicate: CustomAny;

      if (!filter.value || !compareItem[key]) {
        predicate = true;
      } else {
        predicate = DateTime.local().toSeconds() >= compareItem[key];
      }

      return predicate;
    },
    updateFromQueryFn: FiltersHelper.checkboxUpdateFromQueryFn,
    updateFromFilterFn: FiltersHelper.checkboxUpdateFromFilterFn,
    getQueryParamsFn: FiltersHelper.checkboxGetQueryParamsFn,
    getActiveFiltersCountFn: FiltersHelper.checkboxGetActiveFiltersCount
  },
  nextClaim: {
    key: 'nextClaim',
    queryParamKey: 'claiming',
    title: 'Is claiming ready',
    value: false,
    componentType: FilterComponentType.Checkbox,
    isFilterActive: false,
    getIsFilterValidFn: FiltersHelper.checkboxGetIsFilterValidFn,
    resetFilterFn: FiltersHelper.checkboxResetFilterFn,
    predicateFn: (filter: CustomAny, compareItem: CustomAny, key: CustomAny): CustomAny => {
      let predicate: CustomAny;

      if (
        !filter.value ||
        !compareItem[key] ||
        !compareItem.claimAvailableAlchemica ||
        !compareItem.capacities ||
        !compareItem.harvestRates
      ) {
        predicate = false;
      } else {
        const isHarvested =
          Number(compareItem.claimAvailableAlchemica.fud) +
          Number(compareItem.claimAvailableAlchemica.fomo) +
          Number(compareItem.claimAvailableAlchemica.alpha) +
          Number(compareItem.claimAvailableAlchemica.kek) +
          Number(compareItem.capacities.fud) +
          Number(compareItem.capacities.fomo) +
          Number(compareItem.capacities.alpha) +
          Number(compareItem.capacities.kek) +
          Number(compareItem.harvestRates.fud) +
          Number(compareItem.harvestRates.fomo) +
          Number(compareItem.harvestRates.alpha) +
          Number(compareItem.harvestRates.kek);
        const isPredicate = DateTime.local().toSeconds() >= compareItem[key] && isHarvested > 1;
        predicate = isPredicate;
      }

      return predicate;
    },
    updateFromQueryFn: FiltersHelper.checkboxUpdateFromQueryFn,
    updateFromFilterFn: FiltersHelper.checkboxUpdateFromFilterFn,
    getQueryParamsFn: FiltersHelper.checkboxGetQueryParamsFn,
    getActiveFiltersCountFn: FiltersHelper.checkboxGetActiveFiltersCount
  },
  upgradeQueue: {
    key: 'upgradeQueue',
    queryParamKey: 'upgradeQueue',
    title: 'Is upgrade ready',
    value: false,
    componentType: FilterComponentType.Checkbox,
    isFilterActive: false,
    getIsFilterValidFn: FiltersHelper.checkboxGetIsFilterValidFn,
    resetFilterFn: FiltersHelper.checkboxResetFilterFn,
    predicateFn: (filter: CustomAny, compareItem: CustomAny, key: CustomAny) => {
      let predicate: boolean;

      if (!filter.value || !compareItem[key]) {
        predicate = false;
      } else {
        if (compareItem.upgradeQueue - compareItem.upgradeCap > 0) {
          return (predicate = true);
        } else {
          predicate = false;
        }
      }

      return predicate;
    },
    updateFromQueryFn: FiltersHelper.checkboxUpdateFromQueryFn,
    updateFromFilterFn: FiltersHelper.checkboxUpdateFromFilterFn,
    getQueryParamsFn: FiltersHelper.checkboxGetQueryParamsFn,
    getActiveFiltersCountFn: FiltersHelper.checkboxGetActiveFiltersCount
  },
  altarLevel: {
    key: 'altarLevel',
    queryParamKey: 'altar',
    items: [
      {
        title: 'Level 1',
        value: '1',
        isSelected: false,
        queryParamValue: '1'
      },
      {
        title: 'Level 2',
        value: '2',
        isSelected: false,
        queryParamValue: '2'
      },
      {
        title: 'Level 3',
        value: '3',
        isSelected: false,
        queryParamValue: '3'
      },
      {
        title: 'Level 4',
        value: '4',
        isSelected: false,
        queryParamValue: '4'
      },
      {
        title: 'Level 5',
        value: '5',
        isSelected: false,
        queryParamValue: '5'
      },
      {
        title: 'Level 6',
        value: '6',
        isSelected: false,
        queryParamValue: '6'
      },
      {
        title: 'Level 7',
        value: '7',
        isSelected: false,
        queryParamValue: '7'
      },
      {
        title: 'Level 8',
        value: '8',
        isSelected: false,
        queryParamValue: '8'
      },
      {
        title: 'Level 9',
        value: '9',
        isSelected: false,
        queryParamValue: '9'
      }
    ],
    componentType: FilterComponentType.MultiButtonSelection,
    ...defaultMultiSelectionFilter
  }
};
