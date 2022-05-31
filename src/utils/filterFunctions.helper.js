// eslint-disable-next-line import/no-anonymous-default-export
export default {
    // Multiple selection filter handlers
    multipleSelectionGetIsFilterValidFn: (values) => {
        return values.length > 0;
    },

    multipleSelectionResetFilterFn: (filter) => {
        filter.isFilterActive = false;
        filter.items.forEach(item => item.isSelected = false);
    },

    multipleSelectionPredicateFn: (filter, compareItem) => {
        return filter.items.some(item => item.isSelected && item.value === compareItem[filter.key]);
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

    multipleSelectionUpdateFromFilterFn: (filter, values) => {
        filter.isFilterActive = true;

        filter.items.forEach(item => {
            const filterItem = values.find(value => value.value === item.value);

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

    singleSelectionUpdateFromFilterFn: (filter, value) => {
        filter.isFilterActive = true;

        filter.items.forEach(item => {
            if (item.value === value) {
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

    inputUpdateFromQueryFn: (filter, value) => {
        filter.isFilterActive = true;

        filter.value = value;
    },

    inputUpdateFromFilterFn: (filter, value) => {
        filter.isFilterActive = true;

        filter.value = value;
    },

    inputGetQueryParamsFn: (filter) => {
        return filter.value;
    },

    inputGetActiveFiltersCount: (filter) => {
        return Boolean(filter.value) ? 1 : 0;
    },

    // Range slider filter handlers
    rangeSliderGetIsFilterValidFn: (values, filter) => {
        return values[0] > filter.min || values[1] < filter.max;
    },

    rangeSliderResetFilterFn: (filter) => {
        filter.isFilterActive = false;
        filter.value = [filter.min, filter.max];
    },

    rangeSliderPredicateFn: (filter, compareItem) => {
        let lowerBorderValue;
        let upperBorderValue;
        const compareValue = compareItem[filter.key];

        if (Boolean(filter.valueMapperFn)) {
            [lowerBorderValue, upperBorderValue] = filter.valueMapperFn(filter.value);
        } else {
            [lowerBorderValue, upperBorderValue] = filter.value;
        }

        return lowerBorderValue <= compareValue && compareValue <= upperBorderValue;
    },

    rangeSliderUpdateFromQueryFn: (filter, value) => {
        filter.isFilterActive = true;

        filter.value = value.map(value => Number(value));
    },

    rangeSliderUpdateFromFilterFn: (filter, value) => {
        filter.isFilterActive = true;

        filter.value = value;
    },

    rangeSliderGetQueryParamsFn: (filter) => {
        return filter.value;
    },

    rangeSliderGetActiveFiltersCount: (filter) => {
        return filter.isFilterActive ? 1 : 0;
    },

    // Checkbox filter handlers
    checkboxGetIsFilterValidFn: (value) => {
        return value;
    },

    checkboxResetFilterFn: (filter) => {
        filter.isFilterActive = false;
        filter.value = false;
    },

    checkboxUpdateFromQueryFn: (filter, value) => {
        filter.isFilterActive = true;

        filter.value = value === 'true';
    },

    checkboxUpdateFromFilterFn: (filter, value) => {
        filter.isFilterActive = true;

        filter.value = value;
    },

    checkboxGetQueryParamsFn: (filter) => {
        return filter.value;
    },

    checkboxGetActiveFiltersCount: (filter) => {
        return filter.isFilterActive;
    },
}
