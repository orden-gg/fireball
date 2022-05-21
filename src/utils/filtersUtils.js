import commonUtils from './commonUtils';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getUpdateFiltersFromQueryParams: (queryParams, filters) => {
        Object.entries(filters).forEach(([_, filter]) => {
            if (Boolean(queryParams[filter.queryParamKey])) {
                filter.updateFromQueryFn(filter, queryParams[filter.queryParamKey], 'queryParamValue');
            }
        });

        return filters;
    },

    getUpdatedQueryParams: (queryParams, filters) => {
        const params = {...queryParams};

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
        itemsCache,
        filters,
        isFiltersApplied,
        isFiltersAppliedSetter,
        sorting,
        isSortingChanged,
        getFilteredItems
    }) => {
        const activeFilters = Object.entries(filters)
            .filter(([_, fitler]) => fitler.isFilterActive);
        let modifiedItems;

        if (activeFilters.length > 0) {
            if (isSortingChanged && !isFiltersApplied) {
                modifiedItems = getFilteredItems(filters, itemsCache);
            } else if (isSortingChanged && isFiltersApplied) {
                modifiedItems = getFilteredItems(filters, items);
                modifiedItems = commonUtils.basicSort(modifiedItems, sorting.type, sorting.dir);
            } else {
                modifiedItems = getFilteredItems(filters, items);
            }

            isFiltersAppliedSetter(true);
        } else {
            if (isSortingChanged) {
                modifiedItems = commonUtils.basicSort(items, sorting.type, sorting.dir);
            } else {
                modifiedItems = items;
            }
        }

        return modifiedItems;
    }
}
