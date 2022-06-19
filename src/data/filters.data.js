import { Avatar, Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';

import { DateTime } from 'luxon';

import ethersApi from 'api/ethers.api';
import collaterals from 'data/collaterals';
import { defaultMultiSelectionFilter, defaultRangeSliderFilter } from 'data/defaultFilters.data';
import { DISTRICTS } from 'data/citadel.data';
import { FilterComponent } from 'data/filterTypes';
import guilds from 'data/guilds.json';
import { CommonUtils } from 'utils';
import gotchiverseUtils from 'utils/gotchiverseUtils';
import filterHelpers from 'utils/filterFunctions.helper';

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
        componentType: FilterComponent.MultiButtonSelection,
        ...defaultMultiSelectionFilter
    },
    collateral: {
        key: 'collateral',
        queryParamKey: 'collateral',
        items: collaterals.map(collateral => ({
            title: collateral.name,
            value: collateral.address,
            isSelected: false,
            queryParamValue: collateral.name.toLowerCase()
        })),
        componentType: FilterComponent.MultiButtonSelection,
        ...defaultMultiSelectionFilter
    },
    search: {
        key: 'search',
        queryParamKey: 'search',
        isMultipleKeys: true,
        keys: ['id', 'name'],
        componentType: FilterComponent.Input,
        title: 'Search',
        placeholder: 'name or id',
        value: '',
        isFilterActive: false,
        getIsFilterValidFn: filterHelpers.inputGetIsFilterValidFn,
        resetFilterFn: filterHelpers.inputResetFilterFn,
        predicateFn: filterHelpers.inputPredicateFn,
        updateFromQueryFn: filterHelpers.inputUpdateFromQueryFn,
        updateFromFilterFn: filterHelpers.inputUpdateFromFilterFn,
        getQueryParamsFn: filterHelpers.inputGetQueryParamsFn,
        getActiveFiltersCountFn: filterHelpers.inputGetActiveFiltersCount
    },
    guild: {
        key: 'guild',
        queryParamKey: 'guild',
        componentType: FilterComponent.MultipleAutocomplete,
        title: 'Guilds',
        items: guilds
            .filter(guild => guild.members.length > 0)
            .map(guild => ({
                title: CommonUtils.stringToKey(guild.name),
                value: CommonUtils.stringToKey(guild.name),
                isSelected: false,
                queryParamValue: CommonUtils.stringToKey(guild.name)
            })),
        renderTagsFn: (tagValue, getTagProps) => {
            return tagValue.map((option, index) => (
                <Chip
                    size='small'
                    label={option.title}
                    key={option.title}
                    avatar={
                        <Avatar src={gotchiverseUtils.getGuildImg(option.title)} alt={option.title} />
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
        componentType: FilterComponent.SingleAutocomplete,
        title: 'Whitelist',
        items: [],
        isFilterActive: false,
        getIsFilterValidFn: filterHelpers.singleSelectionGetIsFilterValidFn,
        resetFilterFn: filterHelpers.singleSelectionResetFilterFn,
        predicateFn: filterHelpers.singleSelectionPredicateFn,
        updateFromQueryFn: filterHelpers.singleSelectionUpdateFromQueryFn,
        updateFromFilterFn: filterHelpers.singleSelectionUpdateFromFilterFn,
        getQueryParamsFn: filterHelpers.singleSelectionGetQueryParamsFn,
        getActiveFiltersCountFn: filterHelpers.singleSelectionGetActiveFiltersCount
    },
    period: {
        key: 'period',
        queryParamKey: 'period',
        title: 'rental period (hours)',
        icon: <AccessTimeIcon fontSize='small' />,
        componentType: FilterComponent.RangeSlider,
        min: 0,
        max: 720,
        value: [0, 720],
        isFilterActive: false,
        valueMapperFn: (value) => {
            return value.map(val => val * 60 * 60);
        },
        ...defaultRangeSliderFilter
    },
    splitBorrower: {
        key: 'splitBorrower',
        queryParamKey: 'borrower',
        title: 'borrower revenue (%)',
        icon: <PercentIcon fontSize='small' />,
        componentType: FilterComponent.RangeSlider,
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
        componentType: FilterComponent.RangeSlider,
        min: 0,
        max: 100,
        value: [0, 100],
        valueMapperFn: (value) => {
            return value.map(val => ethersApi.toWei(val));
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
        componentType: FilterComponent.MultiButtonSelection,
        ...defaultMultiSelectionFilter
    },
    district: {
        key: 'district',
        queryParamKey: 'district',
        title: 'District',
        items: DISTRICTS.numbers
            .map(district => ({
                title: `${district}`,
                value: `${district}`,
                isSelected: false,
                queryParamValue: `${district}`
            })),
        componentType: FilterComponent.MultipleAutocomplete,
        renderTagsFn: (tagValue, getTagProps) => {
            return tagValue.map((option, index) => (
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
        componentType: FilterComponent.Checkbox,
        isFilterActive: false,
        getIsFilterValidFn: filterHelpers.checkboxGetIsFilterValidFn,
        resetFilterFn: filterHelpers.checkboxResetFilterFn,
        predicateFn: (filter, compareItem, key) => {
            let predicate;

            if (!filter.value || !compareItem[key]) {
                predicate = true;
            } else {
                predicate = DateTime.local().toSeconds() >= compareItem[key];
            }

            return predicate;
        },
        updateFromQueryFn: filterHelpers.checkboxUpdateFromQueryFn,
        updateFromFilterFn: filterHelpers.checkboxUpdateFromFilterFn,
        getQueryParamsFn: filterHelpers.checkboxGetQueryParamsFn,
        getActiveFiltersCountFn: filterHelpers.checkboxGetActiveFiltersCount
    },
    isUpgradeReady: {
        key: 'isUpgradeReady',
        queryParamKey: 'upgraded',
        title: 'Is upgrade ready',
        value: false,
        componentType: FilterComponent.Checkbox,
        isFilterActive: false,
        getIsFilterValidFn: filterHelpers.checkboxGetIsFilterValidFn,
        resetFilterFn: filterHelpers.checkboxResetFilterFn,
        predicateFn: (filter, compareItem, key) => {
            return !filter.value ? !filter.value : filter.value && compareItem[key];
        },
        updateFromQueryFn: filterHelpers.checkboxUpdateFromQueryFn,
        updateFromFilterFn: filterHelpers.checkboxUpdateFromFilterFn,
        getQueryParamsFn: filterHelpers.checkboxGetQueryParamsFn,
        getActiveFiltersCountFn: filterHelpers.checkboxGetActiveFiltersCount
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
        componentType: FilterComponent.MultiButtonSelection,
        ...defaultMultiSelectionFilter
    }
};
