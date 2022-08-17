import { FilterComponentType } from 'shared/constants';
import { Erc1155Item } from 'shared/models';

export interface BaseFilter {
    key: string;
    queryParamKey: string;
    componentType: FilterComponentType;
    title: string;
    isFilterActive: boolean;
}

export interface FilterItemsOption {
    title: string;
    value: string;
    isSelected: boolean;
    queryParamValue: string;
}

export interface MultiAutocompleteFilter extends BaseFilter {
    items: FilterItemsOption[];
    getIsFilterValidFn: (values: any[]) => boolean;
    resetFilterFn: (filter: MultiAutocompleteFilter) => void;
    predicateFn: (filter: MultiAutocompleteFilter, compareItem: any) => boolean;
    updateFromQueryFn: (filter: MultiAutocompleteFilter, compareValue: any, compareKey: string) => void;
    updateFromFilterFn: (filter: MultiAutocompleteFilter, values: any[]) => void;
    getQueryParamsFn: (filter: MultiAutocompleteFilter) => string[];
    getActiveFiltersCountFn: (filter: MultiAutocompleteFilter) => number;
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
    slot: MultiButtonSelectionFilter<Erc1155Item>;
}
