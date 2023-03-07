import { SortingItem } from 'shared/models';

import { CommonUtils } from './common.utils';

// TODO replace Object in all
export class FilterUtils {
  public static getUpdateFiltersFromQueryParams(queryParams: any, filters: Object): any {
    Object.entries(filters).forEach(([_, filter]) => {
      if (queryParams[filter.queryParamKey]) {
        filter.updateFromQueryFn(filter, queryParams[filter.queryParamKey], 'queryParamValue');
      }
    });

    return filters;
  }

  public static getUpdatedQueryParams(queryParams: any, filters: Object): any {
    const params = { ...queryParams };

    Object.entries(filters).forEach(([_, filter]) => {
      if (filter.isFilterActive) {
        params[filter.queryParamKey] = filter.getQueryParamsFn(filter);
      } else {
        delete params[filter.queryParamKey];
      }
    });

    return params;
  }

  public static getActiveFiltersCount(filters: Object): any {
    let count = 0;
    const activeFilters = Object.entries(filters).filter(([_, filter]) => filter.isFilterActive);

    if (activeFilters) {
      Object.entries(filters).forEach(([_, filter]) => {
        count += filter.getActiveFiltersCountFn(filter);
      });
    }

    return count;
  }

  public static getFilteredItems<T, K>(filters: T, items: K[]): K[] {
    return items.filter((item: K) =>
      Object.entries(filters).every(([key, filter]) =>
        filter.isFilterActive ? filter.predicateFn(filter, item, key) : true
      )
    );
  }

  public static getFilteredSortedItems<T>({
    items,
    filters,
    sorting,
    getFilteredItems
  }: {
    items: T[];
    filters: Object;
    sorting: SortingItem;
    getFilteredItems: any;
  }): T[] {
    const activeFilters = Object.entries(filters).filter(([_, fitler]) => fitler.isFilterActive);
    let modifiedItems: any;
    if (activeFilters.length > 0) {
      modifiedItems = getFilteredItems(filters, items);
      modifiedItems = CommonUtils.basicSort(modifiedItems, sorting.type, sorting.dir);
    } else {
      modifiedItems = CommonUtils.basicSort(items, sorting.type, sorting.dir);
    }

    return modifiedItems;
  }

  public static onFiltersUpdate(
    currentFilters: Object,
    getActiveFiltersCount: any,
    activeFiltersCountSetter: any,
    callBack: any
  ): any {
    const activeFilters: any = Object.entries(currentFilters).filter(([_, filter]) => filter.isFilterActive);

    if (activeFilters.length > 0) {
      const filtersCount = getActiveFiltersCount(currentFilters);

      activeFiltersCountSetter(filtersCount);
    } else {
      activeFiltersCountSetter(0);
    }

    callBack(currentFilters);
  }

  public static updateQueryParams(navigate: any, pathname: any, qs: any, queryParams: any, queryParamsOrder: any): any {
    navigate({
      pathname,
      search: qs.stringify(queryParams, {
        sort: (a: any, b: any) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
        arrayFormat: 'comma'
      })
    });
  }

  public static setSelectedFilters(filtersSetter: any, key: any, selectedValue: any): any {
    filtersSetter((filtersCache: any) => {
      const cacheCopy = { ...filtersCache };

      if (!cacheCopy[key].getIsFilterValidFn(selectedValue, cacheCopy[key])) {
        cacheCopy[key].resetFilterFn(cacheCopy[key]);
      } else {
        cacheCopy[key].updateFromFilterFn(cacheCopy[key], selectedValue);
      }

      return cacheCopy;
    });
  }

  public static resetFilters(filters: any, filtersSetter: any) {
    const filtersCopy = { ...filters };

    Object.entries(filtersCopy).forEach(([_, filter]: [any, any]) => {
      filter.resetFilterFn(filter);
    });

    filtersSetter({ ...filtersCopy });
  }

  public static exportData(items: any, fileName: any): any {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify([...items]))}`;
    const link = document.createElement('a');

    link.href = jsonString;
    link.download = `${fileName}_${Date.now()}.json`;
    link.click();
  }
}
