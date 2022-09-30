import { GraphFiltersDataType, GraphFiltersHelperType, IconName } from 'shared/constants';

import { BaseFilter } from './filters.model';

export interface GraphRangeSliderFilter extends BaseFilter {
    dataType: GraphFiltersDataType.RangeSliderFilter;
    graphComparatorOptions: any;
    min: number;
    max: number;
    value: number[];
    isShowIcon: boolean;
    iconName?: IconName,
    iconProps?: {
        width: number;
        height: number;
    }
    helperType?: GraphFiltersHelperType;
}

export interface GraphInputFilter extends BaseFilter {
    dataType: GraphFiltersDataType.InputFilter;
    graphComparatorOptions: any;
    placeholder: string;
    value: string;
    helperType?: GraphFiltersHelperType;
}

// export interface GraphMultiAutocompleteFilter extends BaseFilter {
//     graphComparatorOption: GraphComparatorOptions;
//     graphComparatorOptions: any;
//     items: FilterItemOption[];
//     value: any;
//     dataType: GraphFiltersDataType.MultiAutocompleteFilter;
// }

export type GraphRangeSliderFilterValue = number[];
export type GraphInputFilterValue = string;

export type GraphFiltersValueTypes = GraphRangeSliderFilterValue | GraphInputFilterValue;

export type GraphFiltersTypes = GraphRangeSliderFilter | GraphInputFilter;

// export type GraphFiltersTypes = GraphFiltersTypes1[keyof GraphFiltersTypes1];
