import { GraphInputFilter, GraphInputFilterValue, GraphRangeSliderFilter, GraphRangeSliderFilterValue } from 'shared/models';

export class GraphFiltersHelper {
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
}
