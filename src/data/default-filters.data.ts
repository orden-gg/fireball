import { FiltersHelper } from 'utils';

export const defaultMultiSelectionFilter: any = {
  isFilterActive: false,
  getIsFilterValidFn: FiltersHelper.multipleSelectionGetIsFilterValidFn,
  resetFilterFn: FiltersHelper.multipleSelectionResetFilterFn,
  predicateFn: FiltersHelper.multipleSelectionPredicateFn,
  updateFromQueryFn: FiltersHelper.multipleSelectionUpdateFromQueryFn,
  updateFromFilterFn: FiltersHelper.multipleSelectionUpdateFromFilterFn,
  getQueryParamsFn: FiltersHelper.multipleSelectionGetQueryParamsFn,
  getActiveFiltersCountFn: FiltersHelper.multipleSelectionGetActiveFiltersCount
};

export const defaultRangeSliderFilter = {
  isFilterActive: false,
  getIsFilterValidFn: FiltersHelper.rangeSliderGetIsFilterValidFn,
  resetFilterFn: FiltersHelper.rangeSliderResetFilterFn,
  predicateFn: FiltersHelper.rangeSliderPredicateFn,
  updateFromQueryFn: FiltersHelper.rangeSliderUpdateFromQueryFn,
  updateFromFilterFn: FiltersHelper.rangeSliderUpdateFromFilterFn,
  getQueryParamsFn: FiltersHelper.rangeSliderGetQueryParamsFn,
  getActiveFiltersCountFn: FiltersHelper.rangeSliderGetActiveFiltersCount
};
