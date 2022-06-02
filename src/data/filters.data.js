import { Avatar, Chip } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';

import ethersApi from 'api/ethers.api';
import collaterals from 'data/collaterals';
import { defaultMultiSelectionFilter, defaultRangeSliderFilter } from 'data/defaultFilters.data'
import { DISTRICTS } from 'data/citadel.data';
import { FilterComponent } from 'data/filterTypes';
import guilds from 'data/guilds.json';
import commonUtils from 'utils/commonUtils';
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
                title: commonUtils.stringToKey(guild.name),
                value: commonUtils.stringToKey(guild.name),
                isSelected: false,
                queryParamValue: commonUtils.stringToKey(guild.name)
            })),
        renderTagsFn: (tagValue, getTagProps) => {
            return tagValue.map((option, index) => (
                <Chip
                    size='small'
                    label={option.title}
                    avatar={
                        <Avatar src={gotchiverseUtils.getGuildImg(option.title)} alt={option.title} />
                    }
                    {...getTagProps({ index })}
                />
            ))
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
                    {...getTagProps({ index })}
                />
            ))
        },
        ...defaultMultiSelectionFilter
    },
};
