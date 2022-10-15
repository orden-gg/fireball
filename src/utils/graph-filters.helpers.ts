import {
    FilterItemOption,
    GraphInputFilter,
    GraphInputFilterValue,
    GraphMultiAutocompleteFilter,
    GraphMultiButtonSelectionFilter,
    GraphRangeSliderFilter,
    GraphRangeSliderFilterValue
} from 'shared/models';

export class GraphFiltersHelper {
    // Input filter handlers
    public static getIsInputFilterValid(value: GraphInputFilterValue): boolean {
        return Boolean(value);
    }

    public static getResetedInputFilter(filter: GraphInputFilter): GraphInputFilter {
        return {
            ...filter,
            isFilterActive: false,
            value: ''
        };
    }

    public static getUpdatedInputFromFilter(filter: GraphInputFilter, value: GraphInputFilterValue): GraphInputFilter {
        return {
            ...filter,
            isFilterActive: true,
            value
        };
    }

    // Range slider filter handlers
    public static getIsRangeSliderFilterValid(values: GraphRangeSliderFilterValue, filter: GraphRangeSliderFilter): boolean {
        return values[0] > filter.min || values[1] < filter.max;
    }

    public static getResetedRangeSliderFilter(filter: GraphRangeSliderFilter): GraphRangeSliderFilter {
        return {
            ...filter,
            isFilterActive: false,
            value: [filter.min, filter.max]
        };
    }

    public static getUpdatedRangeSliderFromFilter(
        filter: GraphRangeSliderFilter,
        value: GraphRangeSliderFilterValue
    ): GraphRangeSliderFilter {
        return {
            ...filter,
            isFilterActive: true,
            value
        };
    }

    // Multiple selection filter handlers
    public static getIsMultipleSelectionFilterValid(values: FilterItemOption[]): boolean {
        return values.length > 0;
    }

    public static getResetedMultipleSelectionFilter(filter: GraphMultiButtonSelectionFilter): GraphMultiButtonSelectionFilter {
        return {
            ...filter,
            isFilterActive: false,
            items: filter.items.map((item: FilterItemOption) => ({
                ...item,
                isSelected: false
            }))
        };
    }

    public static getUpdatedMultipleSelectionFromFilter(
        filter: GraphMultiButtonSelectionFilter,
        values: FilterItemOption[]
    ): GraphMultiButtonSelectionFilter {
        return {
            ...filter,
            isFilterActive: true,
            items: filter.items.map((item: FilterItemOption) => {
                const filterItem = values.find((value: FilterItemOption) => value.value === item.value);

                return { ...item, isSelected: filterItem ? true : false };
            })
        };
    }

    // Multiple autocomplete filter handlers
    public static getIsMultipleAutocompleteFilterValid(values: FilterItemOption[]): boolean {
        return values.length > 0;
    }

    public static getResetedMultipleAutocompleteFilter(filter: GraphMultiAutocompleteFilter): GraphMultiAutocompleteFilter {
        return {
            ...filter,
            isFilterActive: false,
            items: filter.items.map((item: FilterItemOption) => ({
                ...item,
                isSelected: false
            }))
        };
    }

    public static getUpdatedMultipleAutocompleteFromFilter(
        filter: GraphMultiAutocompleteFilter,
        values: FilterItemOption[]
    ): GraphMultiAutocompleteFilter {
        return {
            ...filter,
            isFilterActive: true,
            items: filter.items.map((item: FilterItemOption) => {
                const filterItem = values.find((value: FilterItemOption) => value.value === item.value);

                return { ...item, isSelected: filterItem ? true : false };
            })
        };
    }
}
