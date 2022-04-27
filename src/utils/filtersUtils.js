// eslint-disable-next-line import/no-anonymous-default-export
export default {
    updateFiltersFromQueryParams: (queryParams, currentFilters) => {
        const queryParamsCopy = {...queryParams};
        delete queryParamsCopy.address;

        Object.entries(currentFilters).forEach(([currentKey, currentFilter]) => {
            if (Boolean(queryParamsCopy[currentKey])) {
                currentFilter.updateFromQueryFn(currentFilter, queryParamsCopy[currentKey], 'queryParamValue');
            }
        });
    },

    getUpdatedFiltersFromSelectedFilters: (selectedFilters, currentFilters) => {
        const currentFiltersCopy = {...currentFilters};

        if (Object.keys(selectedFilters).length === 0) {
            Object.entries(currentFiltersCopy).forEach(([key, currentFilter]) => {
                currentFilter.resetFilterFn(currentFilter);
            });
        } else {
            Object.entries(currentFiltersCopy).forEach(([currentKey, currentFilter]) => {
                if (Boolean(selectedFilters[currentKey])) {
                    currentFilter.updateFromFilterFn(currentFilter, selectedFilters[currentKey].selectedValue);
                } else {
                    currentFilter.resetFilterFn(currentFilter);
                }
            });
        }

        return currentFiltersCopy;
    }
}
