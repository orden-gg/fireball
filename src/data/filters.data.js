import collaterals from 'data/collaterals';
import { FilterComponent, FilterDomainType } from 'data/filterTypes';
import guilds from 'data/guilds.json';
import commonUtils from 'utils/commonUtils';
import filterHelpers from 'utils/filterFunctions.helper';

export const filtersData = {
    hauntId: {
        key: 'hauntId',
        domainType: FilterDomainType.Equals,
        componentType: FilterComponent.MultiButtonSelection,
        title: 'Haunt',
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
        resetFilterFn: filterHelpers.multipleSelectionResetFilterFn,
        predicateFn: filterHelpers.multipleSelectionPredicateFn,
        updateFromQueryFn: filterHelpers.multipleSelectionUpdateFromQueryFn,
        updateFromFilterFn: filterHelpers.multipleSelectionUpdateFromFilterFn,
        getQueryParamsFn: filterHelpers.multipleSelectionGetQueryParamsFn,
        getActiveFiltersCountFn: filterHelpers.multipleSelectionGetActiveFiltersCount
    },
    collateral: {
        key: 'collateral',
        domainType: FilterDomainType.Equals,
        componentType: FilterComponent.MultiButtonSelection,
        title: 'Collateral',
        items: collaterals.map(collateral => ({
            title: collateral.name,
            value: collateral.address,
            isSelected: false,
            queryParamValue: collateral.name.toLowerCase()
        })),
        isFilterActive: false,
        resetFilterFn: filterHelpers.multipleSelectionResetFilterFn,
        predicateFn: filterHelpers.multipleSelectionPredicateFn,
        updateFromQueryFn: filterHelpers.multipleSelectionUpdateFromQueryFn,
        updateFromFilterFn: filterHelpers.multipleSelectionUpdateFromFilterFn,
        getQueryParamsFn: filterHelpers.multipleSelectionGetQueryParamsFn,
        getActiveFiltersCountFn: filterHelpers.multipleSelectionGetActiveFiltersCount
    },
    search: {
        key: 'search',
        isMultipleKeys: true,
        keys: ['id', 'name'],
        domainType: FilterDomainType.Contains,
        componentType: FilterComponent.Input,
        title: 'Search',
        placeholder: 'Name or Id',
        value: '',
        isFilterActive: false,
        resetFilterFn: filterHelpers.inputResetFilterFn,
        predicateFn: filterHelpers.inputPredicateFn,
        updateFromQueryFn: filterHelpers.inputUpdateFromQueryFn,
        updateFromFilterFn: filterHelpers.inputUpdateFromFilterFn,
        getQueryParamsFn: filterHelpers.inputGetQueryParamsFn,
        getActiveFiltersCountFn: filterHelpers.inputGetActiveFiltersCount
    },
    guild: {
        key: 'guild',
        domainType: FilterDomainType.Equals,
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
        resetFilterFn: filterHelpers.multipleSelectionResetFilterFn,
        predicateFn: filterHelpers.multipleSelectionPredicateFn,
        updateFromQueryFn: filterHelpers.multipleSelectionUpdateFromQueryFn,
        updateFromFilterFn: filterHelpers.multipleSelectionUpdateFromFilterFn,
        getQueryParamsFn: filterHelpers.multipleSelectionGetQueryParamsFn,
        getActiveFiltersCountFn: filterHelpers.multipleSelectionGetActiveFiltersCount
    },
};
