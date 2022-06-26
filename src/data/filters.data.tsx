import { Avatar, Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';

import { DateTime } from 'luxon';

import { FilterComponentType } from 'shared/constants';
import { EthersApi } from 'api';
import { collaterals } from 'data/collaterals.data';
import { defaultMultiSelectionFilter, defaultRangeSliderFilter } from 'data/default-filters.data';
import { DISTRICTS } from 'data/citadel.data';
import guilds from 'data/guilds.json';
import { CommonUtils, FiltersHelper, GotchiverseUtils } from 'utils';

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
        items: collaterals.map((collateral: any) => ({
            title: collateral.name,
            value: collateral.address,
            isSelected: false,
            queryParamValue: collateral.name.toLowerCase()
        })),
        componentType: FilterComponentType.MultiButtonSelection,
        ...defaultMultiSelectionFilter
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
            .filter((guild: any) => guild.members.length > 0)
            .map((guild: any) => ({
                title: CommonUtils.stringToKey(guild.name),
                value: CommonUtils.stringToKey(guild.name),
                isSelected: false,
                queryParamValue: CommonUtils.stringToKey(guild.name)
            })),
        renderTagsFn(tagValue: any, getTagProps: any) {
            return tagValue.map((option: any, index: number) => (
                <Chip
                    size='small'
                    label={option.title}
                    key={option.title}
                    avatar={
                        <Avatar src={GotchiverseUtils.getGuildImg(option.title)} alt={option.title} />
                    }
                    {...getTagProps({ index })}
                />
            ));
        },
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
        valueMapperFn: (value: any): any => {
            return value.map((val: any) => val * 60 * 60);
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
        valueMapperFn: (value: any): any => {
            return value.map((val: any) => EthersApi.toWei(val));
        },
        ...defaultRangeSliderFilter
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
        items: DISTRICTS.numbers
            .map((district: any) => ({
                title: `${district}`,
                value: `${district}`,
                isSelected: false,
                queryParamValue: `${district}`
            })),
        componentType: FilterComponentType.MultipleAutocomplete,
        renderTagsFn: (tagValue: any, getTagProps: any): any => {
            return tagValue.map((option: any, index: number) => (
                <Chip
                    size='small'
                    label={option.title}
                    key={option.title}
                    {...getTagProps({ index })}
                />
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
        predicateFn: (filter: any, compareItem: any, key: any): any => {
            let predicate: any;

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
    isUpgradeReady: {
        key: 'isUpgradeReady',
        queryParamKey: 'upgraded',
        title: 'Is upgrade ready',
        value: false,
        componentType: FilterComponentType.Checkbox,
        isFilterActive: false,
        getIsFilterValidFn: FiltersHelper.checkboxGetIsFilterValidFn,
        resetFilterFn: FiltersHelper.checkboxResetFilterFn,
        predicateFn: (filter: any, compareItem: any, key: any) => {
            return !filter.value ? !filter.value : filter.value && compareItem[key];
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
