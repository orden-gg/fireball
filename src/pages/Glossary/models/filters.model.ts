import { FilterComponentType } from 'shared/constants';

export interface BaseFilter {
    key: string;
    queryParamKey: string;
    componentType: FilterComponentType;
    title: string;
    isFilterActive: boolean;
}

export interface MultiAutocompleteFilterItem {
    title: string;
    value: string;
    isSelected: boolean;
    queryParamValue: string;
}

export interface MultiAutocompleteFilter extends BaseFilter {
    items: MultiAutocompleteFilterItem[];
    getIsFilterValidFn: (values: any[]) => boolean;
    resetFilterFn: (filter: MultiAutocompleteFilter) => void;
    predicateFn: (filter: MultiAutocompleteFilter, compareItem: any) => boolean;
    updateFromQueryFn: (filter: MultiAutocompleteFilter, compareValue: any, compareKey: string) => void;
    updateFromFilterFn: (filter: MultiAutocompleteFilter, values: any[]) => void;
    getQueryParamsFn: (filter: MultiAutocompleteFilter) => string[];
    getActiveFiltersCountFn: (filter: MultiAutocompleteFilter) => number;
}

export interface RangeSliderFilter extends BaseFilter {
    min: number;
    max: number;
    value: number[];
    getIsFilterValidFn: (values: number[], filter: RangeSliderFilter) => boolean;
    resetFilterFn: (filter: RangeSliderFilter) => void;
    predicateFn: (filter: RangeSliderFilter, compareItem: any) => boolean;
    updateFromQueryFn: (filter: RangeSliderFilter, compareValue: any) => void;
    updateFromFilterFn: (filter: RangeSliderFilter, values: number[]) => void;
    getQueryParamsFn: (filter: RangeSliderFilter) => number[];
    getActiveFiltersCountFn: (filter: RangeSliderFilter) => number;
}

export interface GlossaryWearablesFilters {
    rarity: MultiAutocompleteFilter;
    listingPrice: RangeSliderFilter;
}
