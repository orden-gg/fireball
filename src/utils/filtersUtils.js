// eslint-disable-next-line import/no-anonymous-default-export
export default {
    updateFiltersFromQueryParams: (queryParams, filters) => {
        const queryParamsCopy = {...queryParams};
        delete queryParamsCopy.address;

        Object.entries(filters).forEach(([currentKey, filter]) => {
            if (Boolean(queryParamsCopy[currentKey])) {
                filter.updateFromQueryFn(filter, queryParamsCopy[currentKey], 'queryParamValue');
            }
        });
    },

    getUpdatedFiltersFromSelectedFilters: (selectedFilters, filters) => {
        const currentFiltersCopy = {...filters};

        if (Object.keys(selectedFilters).length === 0) {
            Object.entries(currentFiltersCopy).forEach(([key, filter]) => {
                filter.resetFilterFn(filter);
            });
        } else {
            Object.entries(currentFiltersCopy).forEach(([currentKey, filter]) => {
                if (Boolean(selectedFilters[currentKey])) {
                    filter.updateFromFilterFn(filter, selectedFilters[currentKey].selectedValue);
                } else {
                    filter.resetFilterFn(filter);
                }
            });
        }

        return currentFiltersCopy;
    },

    getActiveFiltersCount: (filters) => {
        let count = 0;
        const activeFilters = Object.entries(filters).filter(([key, filter]) => filter.isFilterActive);

        if (activeFilters) {
            Object.entries(filters).forEach(([key, filter]) => {
                count += filter.getActiveFiltersCountFn(filter);
            });
        }

        return count;
    }
}
