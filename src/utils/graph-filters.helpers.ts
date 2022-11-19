import {
    FilterGraphItemOption,
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

    public static getUpdatedInputFromQuery(
        filter: GraphInputFilter,
        value: string
    ): GraphInputFilter {
        return {
            ...filter,
            isFilterActive: true,
            value
        };
    }

    public static getInputFilterQueryParams(filter: GraphInputFilter): string {
        return filter.value;
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

    public static getUpdatedRangeSliderFromQuery(
        filter: GraphRangeSliderFilter,
        value: string[]
    ): GraphRangeSliderFilter {
        return {
            ...filter,
            isFilterActive: true,
            value: value.map((value: string) => Number(value))
        };
    }

    public static getRangeSliderFilterQueryParams(filter: GraphRangeSliderFilter): number[] {
        return filter.value;
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

    public static getUpdatedMultipleSelectionFromQuery(
        filter: GraphMultiButtonSelectionFilter,
        compareValue: string | string[],
        compareKey: string
    ): GraphMultiButtonSelectionFilter {
        return {
            ...filter,
            isFilterActive: true,
            items: filter.items.map((item: FilterGraphItemOption) => {
                let filterItem: FilterGraphItemOption | string | undefined;

                if (typeof compareValue === 'string') {
                    filterItem = compareValue === item[compareKey] ? item : undefined;
                } else {
                    filterItem = compareValue.find(value => value === item[compareKey]);
                }

                return { ...item, isSelected: filterItem ? true : false };
            })
        };
    }

    public static getMultipleSelectionFilterQueryParams(filter: GraphMultiButtonSelectionFilter): string[] {
        return filter.items
            .filter((item: FilterGraphItemOption) => item.isSelected)
            .map((item: FilterGraphItemOption) => item.queryParamValue);
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

    public static getUpdatedMultipleAutocompleteFromQuery(
        filter: GraphMultiAutocompleteFilter,
        compareValue: string | string[],
        compareKey: string
    ): GraphMultiAutocompleteFilter {
        return {
            ...filter,
            isFilterActive: true,
            items: filter.items.map((item: FilterGraphItemOption) => {
                let filterItem: FilterGraphItemOption | string | undefined;

                if (typeof compareValue === 'string') {
                    filterItem = compareValue === item[compareKey] ? item : undefined;
                } else {
                    filterItem = compareValue.find(value => value === item[compareKey]);
                }

                return { ...item, isSelected: filterItem ? true : false };
            })
        };
    }

    public static getMultipleAutocompleteFilterQueryParams(filter: GraphMultiAutocompleteFilter): string[] {
        return filter.items
            .filter((item: FilterGraphItemOption) => item.isSelected)
            .map((item: FilterGraphItemOption) => item.queryParamValue);
    }
}
