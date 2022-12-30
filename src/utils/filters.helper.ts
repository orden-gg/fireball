export class FiltersHelper {
    // Multiple selection filter handlers
    public static multipleSelectionGetIsFilterValidFn(values: any): any {
        return values.length > 0;
    }

    public static multipleSelectionResetFilterFn(filter: any): any {
        filter.isFilterActive = false;
        filter.items.forEach(item => item.isSelected = false);
    }

    public static multipleSelectionPredicateFn(filter: any, compareItem: any): any {
        return filter.items.some((item: any) =>
            item.isSelected && compareItem[filter.key] && item.value.toString() === compareItem[filter.key].toString()
        );
    }

    public static multipleSelectionUpdateFromQueryFn(filter: any, compareValue: any, compareKey: any): any {
        filter.isFilterActive = true;

        filter.items.forEach((item: any) => {
            let filterItem: any;

            if (typeof compareValue === 'string') {
                filterItem = compareValue === item[compareKey] ? item : null;
            } else {
                filterItem = compareValue.find(value => value === item[compareKey]);
            }

            if (filterItem) {
                item.isSelected = true;
            } else {
                item.isSelected = false;
            }
        });
    }

    public static multipleSelectionUpdateFromFilterFn(filter: any, values: any): any {
        filter.isFilterActive = true;

        filter.items.forEach((item: any) => {
            const filterItem = values.find((value: any) => value.value === item.value);

            if (filterItem) {
                item.isSelected = true;
            } else {
                item.isSelected = false;
            }
        });
    }

    public static multipleSelectionGetQueryParamsFn(filter: any): any {
        return filter.items
            .filter((item: any) => item.isSelected)
            .map((item: any) => item.queryParamValue);
    }

    public static multipleSelectionGetActiveFiltersCount(filter: any): any {
        return filter.isFilterActive ? filter.items.filter((item: any) => item.isSelected).length : 0;
    }

    // Single selection filter handlers
    public static singleSelectionGetIsFilterValidFn(value) {
        return Boolean(value);
    }

    public static singleSelectionResetFilterFn(filter: any): any {
        filter.isFilterActive = false;
        filter.items.forEach((item: any) => item.isSelected = false);
    }

    public static singleSelectionPredicateFn(filter: any, compareItem: any, key: any): any {
        return Boolean(filter.items.find((item: any) => item.isSelected && item.value === compareItem[key]));
    }

    public static singleSelectionUpdateFromQueryFn(filter: any, compareValue: any, compareKey: any): any {
        filter.isFilterActive = true;

        filter.items.forEach((item: any) => {
            const filterItem = compareValue === item[compareKey] ? item : null;

            if (filterItem) {
                item.isSelected = true;
            } else {
                item.isSelected = false;
            }
        });
    }

    public static singleSelectionUpdateFromFilterFn(filter: any, value: any): any {
        filter.isFilterActive = true;

        filter.items.forEach(item => {
            if (item.value === value) {
                item.isSelected = true;

                return;
            } else {
                item.isSelected = false;
            }
        });
    }

    public static singleSelectionGetQueryParamsFn(filter: any): any {
        const filterItem = filter.items.find((item: any) => item.isSelected);

        return filterItem?.queryParamValue;
    }

    public static singleSelectionGetActiveFiltersCount(filter: any): any {
        return filter.isFilterActive ? filter.items.filter((item: any) => item.isSelected).length : 0;
    }

    // Input filter handlers
    public static inputGetIsFilterValidFn(value: any): any {
        return Boolean(value);
    }

    public static inputResetFilterFn(filter: any): any {
        filter.isFilterActive = false;
        filter.value = '';
    }

    public static inputPredicateFn(filter: any, compareItem: any) {
        if (filter.keys) {
            return filter.keys.some((key: any) => compareItem[key].toLowerCase().includes(filter.value.toLowerCase()));
        } else {
            return compareItem[filter.key].toLowerCase().includes(filter.value.toLowerCase());
        }
    }

    public static inputUpdateFromQueryFn(filter: any, value: any): any {
        filter.isFilterActive = true;

        filter.value = value;
    }

    public static inputUpdateFromFilterFn(filter: any, value: any): any {
        filter.isFilterActive = true;

        filter.value = value;
    }

    public static inputGetQueryParamsFn(filter: any): any {
        return filter.value;
    }

    public static inputGetActiveFiltersCount(filter: any): any {
        return filter.value ? 1 : 0;
    }

    // Range slider filter handlers
    public static rangeSliderGetIsFilterValidFn(values: any, filter: any): boolean {
        return values[0] > filter.min || values[1] < filter.max;
    }

    public static rangeSliderResetFilterFn(filter: any): any {
        filter.isFilterActive = false;
        filter.value = [filter.min, filter.max];
    }

    public static rangeSliderPredicateFn(filter: any, compareItem: any): any {
        let lowerBorderValue: any;
        let upperBorderValue: any;
        const compareValue = compareItem[filter.key];

        if (filter.valueMapperFn) {
            [lowerBorderValue, upperBorderValue] = filter.valueMapperFn(filter.value);
        } else {
            [lowerBorderValue, upperBorderValue] = filter.value;
        }

        return lowerBorderValue <= compareValue && compareValue <= upperBorderValue;
    }

    public static rangeSliderUpdateFromQueryFn(filter: any, value: any): any {
        filter.isFilterActive = true;

        filter.value = value.map((value: any) => Number(value));
    }

    public static rangeSliderUpdateFromFilterFn(filter: any, value: any): any {
        filter.isFilterActive = true;

        filter.value = value;
    }

    public static rangeSliderGetQueryParamsFn(filter: any): any {
        return filter.value;
    }

    public static rangeSliderGetActiveFiltersCount(filter: any): number {
        return filter.isFilterActive ? 1 : 0;
    }

    // Checkbox filter handlers
    public static checkboxGetIsFilterValidFn(value: any): any {
        return value;
    }

    public static checkboxResetFilterFn(filter: any): any {
        filter.isFilterActive = false;
        filter.value = false;
    }

    public static checkboxUpdateFromQueryFn(filter: any, value: any): any {
        filter.isFilterActive = true;

        filter.value = value === 'true';
    }

    public static checkboxUpdateFromFilterFn(filter: any, value: any): any {
        filter.isFilterActive = true;

        filter.value = value;
    }

    public static checkboxGetQueryParamsFn(filter: any): any {
        return filter.value;
    }

    public static checkboxGetActiveFiltersCount(filter: any): any {
        return filter.isFilterActive;
    }
}
