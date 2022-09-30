import { GraphFiltersDataType, GraphFiltersHelperType } from 'shared/constants';
import {
    GraphFiltersTypes,
    GraphFiltersValueTypes,
    GraphInputFilter,
    GraphInputFilterValue,
    GraphRangeSliderFilter,
    GraphRangeSliderFilterValue
} from 'shared/models';

import { GraphFiltersHelper } from './graph-filters.helper';

export class GraphFiltersUtils {
    public static onGetUpdatedSelectedGraphFilter(
        filter: GraphFiltersTypes,
        value: GraphFiltersValueTypes
    ): GraphFiltersTypes {
        switch (filter.dataType) {
            case GraphFiltersDataType.RangeSliderFilter:
                return GraphFiltersUtils.getUpdatedSelectedFilter<GraphRangeSliderFilter, GraphRangeSliderFilterValue>(
                    filter,
                    value as GraphRangeSliderFilterValue,
                    GraphFiltersHelper.getIsRangeSliderFilterValid,
                    GraphFiltersHelper.getResetedRangeSliderFilter,
                    GraphFiltersHelper.getUpdatedRangeSliderFromFilter
                );
            case GraphFiltersDataType.InputFilter:
                return GraphFiltersUtils.getUpdatedSelectedFilter<GraphInputFilter, GraphInputFilterValue>(
                    filter,
                    value as GraphInputFilterValue,
                    GraphFiltersHelper.getIsInputFilterValid,
                    GraphFiltersHelper.getResetedInputFilter,
                    GraphFiltersHelper.getUpdatedInputFromFilter
                );
        }
    }

    public static getResetedFilterByType(filter: GraphFiltersTypes): GraphFiltersTypes {
        switch (filter.dataType) {
            case GraphFiltersDataType.RangeSliderFilter:
                return GraphFiltersHelper.getResetedRangeSliderFilter(filter);
            case GraphFiltersDataType.InputFilter:
                return GraphFiltersHelper.getResetedInputFilter(filter);
        }
    }

    public static onHandleFilterHelper(helperType: GraphFiltersHelperType, value: any): string {
        switch (helperType) {
            case GraphFiltersHelperType.Price:
                return GraphFiltersUtils.priceToWeiHelper(value);
        }
    }

    public static priceToWeiHelper(value: any): string {
        return value ? `"${value}000000000000000000"` : '0';
    }

    private static getUpdatedSelectedFilter<T extends GraphFiltersTypes, K extends GraphFiltersValueTypes>(
        filter: T,
        value: K,
        getIsFilterValid: (value: K, filter: T) => boolean,
        getResetedFilter: (filter: T) => T,
        getUpdatedFromFilter: (filter: T, value: K) => T
    ): T {
        let filterCopy: T;

        if (getIsFilterValid(value, filter)) {
            filterCopy = getUpdatedFromFilter(filter, value);
        } else {
            filterCopy = getResetedFilter(filter);
        }

        return filterCopy;
    }
}
