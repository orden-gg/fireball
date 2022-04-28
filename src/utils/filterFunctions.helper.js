// eslint-disable-next-line import/no-anonymous-default-export
export default {
    // Multiple selection filter handlers
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

    multipleSelectionUpdateFromFilterFn: (filter, selectedValue) => {
        filter.isFilterActive = true;

        filter.items.forEach(item => {
            const filterItem = selectedValue.find(
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
            .map(selectedValue => selectedValue.queryParamValue);
    },

    multipleSelectionGetActiveFiltersCount: (filter) => {
        return filter.isFilterActive ? filter.items.filter(item => item.isSelected).length : 0;
    },

    // Input filter handlers
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
