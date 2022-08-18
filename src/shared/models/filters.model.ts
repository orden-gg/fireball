import { FilterComponentType } from 'shared/constants';

export interface BaseFilter {
    key: string;
    queryParamKey: string;
    componentType: FilterComponentType;
    title: string;
    isFilterActive: boolean;
    divider?: boolean;
}

export interface FilterItemsOption {
    title: string;
    value: string;
    isSelected: boolean;
    queryParamValue: string;
}

export interface MultiAutocompleteFilter<T> extends BaseFilter {
    items: FilterItemsOption[];
    getIsFilterValidFn: (values: any[]) => boolean;
    resetFilterFn: (filter: MultiAutocompleteFilter<T>) => void;
    predicateFn: (filter: MultiAutocompleteFilter<T>, compareItem: T) => boolean;
    updateFromQueryFn: (filter: MultiAutocompleteFilter<T>, compareValue: any, compareKey: string) => void;
    updateFromFilterFn: (filter: MultiAutocompleteFilter<T>, values: any[]) => void;
    getQueryParamsFn: (filter: MultiAutocompleteFilter<T>) => string[];
    getActiveFiltersCountFn: (filter: MultiAutocompleteFilter<T>) => number;
}

export interface MultiButtonSelectionFilter<T> extends BaseFilter {
    items: FilterItemsOption[];
    getIsFilterValidFn: (values: any[]) => boolean;
    resetFilterFn: (filter: MultiButtonSelectionFilter<T>) => void;
    predicateFn: (filter: MultiButtonSelectionFilter<T>, compareItem: T) => boolean;
    updateFromQueryFn: (filter: MultiButtonSelectionFilter<T>, compareValue: string | string[], compareKey: string) => void;
    updateFromFilterFn: (filter: MultiButtonSelectionFilter<T>, values: any[]) => void;
    getQueryParamsFn: (filter: MultiButtonSelectionFilter<T>) => string[];
    getActiveFiltersCountFn: (filter: MultiButtonSelectionFilter<T>) => number;
}

export interface RangeSliderFilter<T> extends BaseFilter {
    min: number;
    max: number;
    value: number[];
    getIsFilterValidFn: (values: number[], filter: RangeSliderFilter<T>) => boolean;
    resetFilterFn: (filter: RangeSliderFilter<T>) => void;
    predicateFn: (filter: RangeSliderFilter<T>, compareItem: T) => boolean;
    updateFromQueryFn: (filter: RangeSliderFilter<T>, compareValue: any) => void;
    updateFromFilterFn: (filter: RangeSliderFilter<T>, values: number[]) => void;
    getQueryParamsFn: (filter: RangeSliderFilter<T>) => number[];
    getActiveFiltersCountFn: (filter: RangeSliderFilter<T>) => number;
}
