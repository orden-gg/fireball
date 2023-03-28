import { FilterComponentType, IconName } from 'shared/constants';

export interface BaseFilter {
  key: string;
  queryParamKey: string;
  componentType: FilterComponentType;
  title: string;
  isFilterActive: boolean;
  divider?: boolean;
}

export interface FilterItemOption {
  title: string;
  value: string;
  isSelected: boolean;
  queryParamValue: string;
}

export interface MultiAutocompleteFilter<T> extends BaseFilter {
  items: FilterItemOption[];
  getIsFilterValidFn: (values: CustomAny[]) => boolean;
  resetFilterFn: (filter: MultiAutocompleteFilter<T>) => void;
  predicateFn: (filter: MultiAutocompleteFilter<T>, compareItem: T) => boolean;
  updateFromQueryFn: (filter: MultiAutocompleteFilter<T>, compareValue: CustomAny, compareKey: string) => void;
  updateFromFilterFn: (filter: MultiAutocompleteFilter<T>, values: CustomAny[]) => void;
  getQueryParamsFn: (filter: MultiAutocompleteFilter<T>) => string[];
  getActiveFiltersCountFn: (filter: MultiAutocompleteFilter<T>) => number;
}

export interface MultiButtonSelectionFilter<T> extends BaseFilter {
  items: FilterItemOption[];
  getIsFilterValidFn: (values: CustomAny[]) => boolean;
  resetFilterFn: (filter: MultiButtonSelectionFilter<T>) => void;
  predicateFn: (filter: MultiButtonSelectionFilter<T>, compareItem: T) => boolean;
  updateFromQueryFn: (
    filter: MultiButtonSelectionFilter<T>,
    compareValue: string | string[],
    compareKey: string
  ) => void;
  updateFromFilterFn: (filter: MultiButtonSelectionFilter<T>, values: CustomAny[]) => void;
  getQueryParamsFn: (filter: MultiButtonSelectionFilter<T>) => string[];
  getActiveFiltersCountFn: (filter: MultiButtonSelectionFilter<T>) => number;
}

export interface RangeSliderFilter<T> extends BaseFilter {
  min: number;
  max: number;
  value: number[];
  isShowIcon?: boolean;
  iconName?: IconName;
  iconProps?: {
    width: number;
    height: number;
  };
  getIsFilterValidFn: (values: number[], filter: RangeSliderFilter<T>) => boolean;
  resetFilterFn: (filter: RangeSliderFilter<T>) => void;
  predicateFn: (filter: RangeSliderFilter<T>, compareItem: T) => boolean;
  updateFromQueryFn: (filter: RangeSliderFilter<T>, compareValue: CustomAny) => void;
  updateFromFilterFn: (filter: RangeSliderFilter<T>, values: number[]) => void;
  getQueryParamsFn: (filter: RangeSliderFilter<T>) => number[];
  getActiveFiltersCountFn: (filter: RangeSliderFilter<T>) => number;
  valueMapperFn?: (value: CustomAny[]) => CustomAny[];
}

export interface InputFilter<T> extends BaseFilter {
  keys?: string[];
  placeholder: string;
  value: string;
  getIsFilterValidFn: (value: string) => boolean;
  resetFilterFn: (filter: InputFilter<T>) => void;
  predicateFn: (filter: InputFilter<T>, compareItem: T) => boolean;
  updateFromQueryFn: (filter: InputFilter<T>, value: string) => void;
  updateFromFilterFn: (filter: InputFilter<T>, value: string) => void;
  getQueryParamsFn: (filter: InputFilter<T>) => string;
  getActiveFiltersCountFn: (filter: InputFilter<T>) => number;
}
