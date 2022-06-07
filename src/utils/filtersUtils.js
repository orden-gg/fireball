import commonUtils from './commonUtils';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getUpdateFiltersFromQueryParams: (queryParams, filters) => {
        Object.entries(filters).forEach(([_, filter]) => {
            if (queryParams[filter.queryParamKey]) {
                filter.updateFromQueryFn(filter, queryParams[filter.queryParamKey], 'queryParamValue');
            }
        });

        return filters;
    },

    getUpdatedQueryParams: (queryParams, filters) => {
        const params = { ...queryParams };

        Object.entries(filters).forEach(([_, filter]) => {
            if (filter.isFilterActive) {
                params[filter.queryParamKey] = filter.getQueryParamsFn(filter);
            } else {
                delete params[filter.queryParamKey];
            }
        });

        return params;
    },

    getActiveFiltersCount: (filters) => {
        let count = 0;
        const activeFilters = Object.entries(filters).filter(([_, filter]) => filter.isFilterActive);

        if (activeFilters) {
            Object.entries(filters).forEach(([_, filter]) => {
                count += filter.getActiveFiltersCountFn(filter);
            });
        }

        return count;
    },

    getFilteredItems: (filters, items) => {
        return items.filter(item =>
            Object.entries(filters).every(([key, filter]) =>
                filter.isFilterActive ? filter.predicateFn(filter, item, key) : true
            )
        );
    },

    getFilteredSortedItems: ({
        items,
        filters,
        sorting,
        getFilteredItems
    }) => {
        const activeFilters = Object.entries(filters)
            .filter(([_, fitler]) => fitler.isFilterActive);
        let modifiedItems;

        if (activeFilters.length > 0) {
            modifiedItems = getFilteredItems(filters, items);
            modifiedItems = commonUtils.basicSort(modifiedItems, sorting.type, sorting.dir);
        } else {
            modifiedItems = commonUtils.basicSort(items, sorting.type, sorting.dir);
        }

        return modifiedItems;
    },

    onFiltersUpdate: (currentFilters, getActiveFiltersCount, activeFiltersCountSetter, callBack) => {
        const activeFilters = Object.entries(currentFilters).filter(([_, filter]) => filter.isFilterActive);

        if (activeFilters.length > 0) {
            const filtersCount = getActiveFiltersCount(currentFilters);

            activeFiltersCountSetter(filtersCount);
        } else {
            activeFiltersCountSetter(0);
        }

        callBack(currentFilters);
    },

    updateQueryParams: (history, pathname, qs, queryParams, queryParamsOrder) => {
        history.push({
            path: pathname,
            search: qs.stringify(queryParams, {
                sort: (a, b) => queryParamsOrder.indexOf(a) - queryParamsOrder.indexOf(b),
                arrayFormat: 'comma'
            })
        });
    },

    setSelectedFilters: (filtersSetter, key, selectedValue) => {
        filtersSetter(filtersCache => {
            const cacheCopy = { ...filtersCache };

            if (!cacheCopy[key].getIsFilterValidFn(selectedValue, cacheCopy[key])) {
                cacheCopy[key].resetFilterFn(cacheCopy[key]);
            } else {
                cacheCopy[key].updateFromFilterFn(cacheCopy[key], selectedValue);
            }

            return cacheCopy;
        });
    },

    resetFilters: (filters, filtersSetter) => {
        const filtersCopy = { ...filters };

        Object.entries(filtersCopy).forEach(([_, filter]) => {
            filter.resetFilterFn(filter);
        });

        filtersSetter({ ...filtersCopy });
    },

    exportData: (items, fileName) => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(JSON.stringify([...items]))}`;
        const link = document.createElement('a');

        link.href = jsonString;
        link.download = `${fileName}_${Date.now()}.json`;
        link.click();
    }
};
