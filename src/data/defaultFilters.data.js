import { FiltersHelper } from 'utils';

const defaultMultiSelectionFilter = {
    isFilterActive: false,
    getIsFilterValidFn: FiltersHelper.multipleSelectionGetIsFilterValidFn,
    resetFilterFn: FiltersHelper.multipleSelectionResetFilterFn,
    predicateFn: FiltersHelper.multipleSelectionPredicateFn,
    updateFromQueryFn: FiltersHelper.multipleSelectionUpdateFromQueryFn,
    updateFromFilterFn: FiltersHelper.multipleSelectionUpdateFromFilterFn,
    getQueryParamsFn: FiltersHelper.multipleSelectionGetQueryParamsFn,
    getActiveFiltersCountFn: FiltersHelper.multipleSelectionGetActiveFiltersCount
};

const defaultRangeSliderFilter = {
    isFilterActive: false,
    getIsFilterValidFn: FiltersHelper.rangeSliderGetIsFilterValidFn,
    resetFilterFn: FiltersHelper.rangeSliderResetFilterFn,
    predicateFn: FiltersHelper.rangeSliderPredicateFn,
    updateFromQueryFn: FiltersHelper.rangeSliderUpdateFromQueryFn,
    updateFromFilterFn: FiltersHelper.rangeSliderUpdateFromFilterFn,
    getQueryParamsFn: FiltersHelper.rangeSliderGetQueryParamsFn,
    getActiveFiltersCountFn: FiltersHelper.rangeSliderGetActiveFiltersCount
};

export { defaultMultiSelectionFilter, defaultRangeSliderFilter };
