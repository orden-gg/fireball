import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';

import collaterals from 'data/collaterals';
import { FilterComponent } from 'data/filterTypes';
import guilds from 'data/guilds.json';
import commonUtils from 'utils/commonUtils';
import filterHelpers from 'utils/filterFunctions.helper';

export const filtersData = {
    hauntId: {
        key: 'hauntId',
        queryParamKey: 'haunt',
        componentType: FilterComponent.MultiButtonSelection,
        // title: 'Haunt',
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
        isFilterActive: false,
        getIsFilterValidFn: filterHelpers.multipleSelectionGetIsFilterValidFn,
        resetFilterFn: filterHelpers.multipleSelectionResetFilterFn,
        predicateFn: filterHelpers.multipleSelectionPredicateFn,
        updateFromQueryFn: filterHelpers.multipleSelectionUpdateFromQueryFn,
        updateFromFilterFn: filterHelpers.multipleSelectionUpdateFromFilterFn,
        getQueryParamsFn: filterHelpers.multipleSelectionGetQueryParamsFn,
        getActiveFiltersCountFn: filterHelpers.multipleSelectionGetActiveFiltersCount
    },
    collateral: {
        key: 'collateral',
        queryParamKey: 'collateral',
        componentType: FilterComponent.MultiButtonSelection,
        // title: 'Collateral',
        items: collaterals.map(collateral => ({
            title: collateral.name,
            value: collateral.address,
            isSelected: false,
            queryParamValue: collateral.name.toLowerCase()
        })),
        isFilterActive: false,
        getIsFilterValidFn: filterHelpers.multipleSelectionGetIsFilterValidFn,
        resetFilterFn: filterHelpers.multipleSelectionResetFilterFn,
        predicateFn: filterHelpers.multipleSelectionPredicateFn,
        updateFromQueryFn: filterHelpers.multipleSelectionUpdateFromQueryFn,
        updateFromFilterFn: filterHelpers.multipleSelectionUpdateFromFilterFn,
        getQueryParamsFn: filterHelpers.multipleSelectionGetQueryParamsFn,
        getActiveFiltersCountFn: filterHelpers.multipleSelectionGetActiveFiltersCount
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
        isFilterActive: false,
        getIsFilterValidFn: filterHelpers.multipleSelectionGetIsFilterValidFn,
        resetFilterFn: filterHelpers.multipleSelectionResetFilterFn,
        predicateFn: filterHelpers.multipleSelectionPredicateFn,
        updateFromQueryFn: filterHelpers.multipleSelectionUpdateFromQueryFn,
        updateFromFilterFn: filterHelpers.multipleSelectionUpdateFromFilterFn,
        getQueryParamsFn: filterHelpers.multipleSelectionGetQueryParamsFn,
        getActiveFiltersCountFn: filterHelpers.multipleSelectionGetActiveFiltersCount
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
        tooltip: 'rental period',
        icon: <AccessTimeIcon fontSize='small' />,
        componentType: FilterComponent.RangeSlider,
        min: 0,
        max: 720,
        value: [0, 720],
        isFilterActive: false,
        getIsFilterValidFn: filterHelpers.rangeSliderGetIsFilterValidFn,
        resetFilterFn: filterHelpers.rangeSliderResetFilterFn,
        predicateFn: filterHelpers.rangeSliderPredicateFn,
        updateFromQueryFn: filterHelpers.rangeSliderUpdateFromQueryFn,
        updateFromFilterFn: filterHelpers.rangeSliderUpdateFromFilterFn,
        getQueryParamsFn: filterHelpers.rangeSliderGetQueryParamsFn,
        getActiveFiltersCountFn: filterHelpers.rangeSliderGetActiveFiltersCount,
        valueMapperFn: (value) => {
            return value.map(val => val * 60 * 60);
        }
    },
    splitBorrower: {
        key: 'splitBorrower',
        queryParamKey: 'borrower',
        tooltip: 'borrower revenue',
        icon: <PercentIcon fontSize='small' />,
        componentType: FilterComponent.RangeSlider,
        min: 0,
        max: 100,
        value: [0, 100],
        isFilterActive: false,
        getIsFilterValidFn: filterHelpers.rangeSliderGetIsFilterValidFn,
        resetFilterFn: filterHelpers.rangeSliderResetFilterFn,
        predicateFn: filterHelpers.rangeSliderPredicateFn,
        updateFromQueryFn: filterHelpers.rangeSliderUpdateFromQueryFn,
        updateFromFilterFn: filterHelpers.rangeSliderUpdateFromFilterFn,
        getQueryParamsFn: filterHelpers.rangeSliderGetQueryParamsFn,
        getActiveFiltersCountFn: filterHelpers.rangeSliderGetActiveFiltersCount
    },
    upfrontCost: {
        key: 'upfrontCost',
        queryParamKey: 'upfront',
        tooltip: 'upfront cost',
        icon: <AttachMoneyIcon fontSize='small' />,
        componentType: FilterComponent.RangeSlider,
        min: 0,
        max: 100,
        value: [0, 100],
        isFilterActive: false,
        getIsFilterValidFn: filterHelpers.rangeSliderGetIsFilterValidFn,
        resetFilterFn: filterHelpers.rangeSliderResetFilterFn,
        predicateFn: filterHelpers.rangeSliderPredicateFn,
        updateFromQueryFn: filterHelpers.rangeSliderUpdateFromQueryFn,
        updateFromFilterFn: filterHelpers.rangeSliderUpdateFromFilterFn,
        getQueryParamsFn: filterHelpers.rangeSliderGetQueryParamsFn,
        getActiveFiltersCountFn: filterHelpers.rangeSliderGetActiveFiltersCount
    }
};
