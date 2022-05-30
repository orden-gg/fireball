import filterHelpers from 'utils/filterFunctions.helper';

const defaultMultiSelectionFilter = {
    isFilterActive: false,
    getIsFilterValidFn: filterHelpers.multipleSelectionGetIsFilterValidFn,
    resetFilterFn: filterHelpers.multipleSelectionResetFilterFn,
    predicateFn: filterHelpers.multipleSelectionPredicateFn,
    updateFromQueryFn: filterHelpers.multipleSelectionUpdateFromQueryFn,
    updateFromFilterFn: filterHelpers.multipleSelectionUpdateFromFilterFn,
    getQueryParamsFn: filterHelpers.multipleSelectionGetQueryParamsFn,
    getActiveFiltersCountFn: filterHelpers.multipleSelectionGetActiveFiltersCount
};

const defaultRangeSliderFilter = {
    isFilterActive: false,
    getIsFilterValidFn: filterHelpers.rangeSliderGetIsFilterValidFn,
    resetFilterFn: filterHelpers.rangeSliderResetFilterFn,
    predicateFn: filterHelpers.rangeSliderPredicateFn,
    updateFromQueryFn: filterHelpers.rangeSliderUpdateFromQueryFn,
    updateFromFilterFn: filterHelpers.rangeSliderUpdateFromFilterFn,
    getQueryParamsFn: filterHelpers.rangeSliderGetQueryParamsFn,
    getActiveFiltersCountFn: filterHelpers.rangeSliderGetActiveFiltersCount
};

export { defaultMultiSelectionFilter, defaultRangeSliderFilter }
