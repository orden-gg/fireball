// eslint-disable-next-line import/no-anonymous-default-export
export default {
    // Multiple selection filter handlers
    multipleSelectionGetIsFilterValidFn: (values) => {
        return values.length > 0;
    },

    multipleSelectionIsFilterValidFn: (filter) => {
        filter.isFilterActive = false;
        filter.items.forEach(item => item.isSelected = false);
    },

    multipleSelectionResetFilterFn: (filter) => {
        filter.isFilterActive = false;
        filter.items.forEach(item => item.isSelected = false);
    },

    multipleSelectionPredicateFn: (filter, compareItem, key) => {
        return filter.items.some(item => item.isSelected && item.value === compareItem[key]);
    },

    multipleSelectionUpdateFromQueryFn: (filter, compareValue, compareKey) => {
        filter.isFilterActive = true;

        filter.items.forEach(item => {
            let filterItem;

            if (typeof compareValue === 'string') {
                filterItem = compareValue === item[compareKey] ? item : null;
            } else {
                filterItem = compareValue.find(value => value === item[compareKey]);
            }

            if (Boolean(filterItem)) {
                item.isSelected = true;
            } else {
                item.isSelected = false;
            }
        });
    },

    multipleSelectionUpdateFromFilterFn: (filter, selectedValues) => {
        filter.isFilterActive = true;

        filter.items.forEach(item => {
            const filterItem = selectedValues.find(
                selectedValue => selectedValue.value === item.value
            );

            if (Boolean(filterItem)) {
                item.isSelected = true;
            } else {
                item.isSelected = false;
            }
        });
    },

    multipleSelectionGetQueryParamsFn: (filter) => {
        return filter.items
            .filter(item => item.isSelected)
            .map(item => item.queryParamValue);
    },

    multipleSelectionGetActiveFiltersCount: (filter) => {
        return filter.isFilterActive ? filter.items.filter(item => item.isSelected).length : 0;
    },

    // Single selection filter handlers
    singleSelectionGetIsFilterValidFn: (value) => {
        return Boolean(value);
    },

    singleSelectionResetFilterFn: (filter) => {
        filter.isFilterActive = false;
        filter.items.forEach(item => item.isSelected = false);
    },

    singleSelectionPredicateFn: (filter, compareItem, key) => {
        return Boolean(filter.items.find(item => item.isSelected && item.value === compareItem[key]));
    },

    singleSelectionUpdateFromQueryFn: (filter, compareValue, compareKey) => {
        filter.isFilterActive = true;

        filter.items.forEach(item => {
            const filterItem = compareValue === item[compareKey] ? item : null;

            if (Boolean(filterItem)) {
                item.isSelected = true;
            } else {
                item.isSelected = false;
            }
        });
    },

    singleSelectionUpdateFromFilterFn: (filter, selectedValue) => {
        filter.isFilterActive = true;

        filter.items.forEach(item => {
            if (item.value === selectedValue) {
                item.isSelected = true;

                return;
            } else {
                item.isSelected = false;
            }
        });
    },

    singleSelectionGetQueryParamsFn: (filter) => {
        const filterItem = filter.items.find(item => item.isSelected);

        return filterItem?.queryParamValue;
    },

    singleSelectionGetActiveFiltersCount: (filter) => {
        return filter.isFilterActive ? filter.items.filter(item => item.isSelected).length : 0;
    },

    // Input filter handlers
    inputGetIsFilterValidFn: (value) => {
        return Boolean(value);
    },

    inputResetFilterFn: (filter) => {
        filter.isFilterActive = false;
        filter.value = '';
    },

    inputPredicateFn: (filter, compareItem) => {
        return filter.keys.some(key => compareItem[key].toLowerCase().includes(filter.value.toLowerCase()));
    },

    inputUpdateFromQueryFn: (filter, selectedValue) => {
        filter.isFilterActive = true;

        filter.value = selectedValue;
    },

    inputUpdateFromFilterFn: (filter, selectedValue) => {
        filter.isFilterActive = true;

        filter.value = selectedValue;
    },

    inputGetQueryParamsFn: (filter) => {
        return filter.value;
    },

    inputGetActiveFiltersCount: (filter) => {
        return Boolean(filter.value) ? 1 : 0;
    },
}
