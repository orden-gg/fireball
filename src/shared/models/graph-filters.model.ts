import { FilterDomainType, GraphComparatorOptions, GraphFiltersDataType, GraphFiltersHelperType, IconName } from 'shared/constants';

import { BaseFilter, FilterItemOption } from './filters.model';

export interface GraphRangeSliderFilter extends BaseFilter {
    dataType: GraphFiltersDataType.RangeSliderFilter;
    filterDomainType: FilterDomainType;
    graphComparatorOptions: GraphComparatorOptions[];
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
    filterDomainType: FilterDomainType;
    graphComparatorOptions: GraphComparatorOptions[];
    placeholder: string;
    value: string;
    helperType?: GraphFiltersHelperType;
}

export interface GraphMultiButtonSelectionFilter extends BaseFilter {
    dataType: GraphFiltersDataType.MultiButtonSelection;
    filterDomainType: FilterDomainType;
    graphComparatorOptions: GraphComparatorOptions[];
    items: FilterItemOption[];
    helperType?: GraphFiltersHelperType;
}

export interface GraphMultiAutocompleteFilter extends BaseFilter {
    dataType: GraphFiltersDataType.MultiAutocomplete;
    filterDomainType: FilterDomainType;
    graphComparatorOptions: GraphComparatorOptions[];
    items: FilterItemOption[];
    helperType?: GraphFiltersHelperType;
}

export type GraphFiltersTypes = GraphRangeSliderFilter | GraphInputFilter | GraphMultiButtonSelectionFilter;

export type GraphRangeSliderFilterValue = number[];
export type GraphInputFilterValue = string;
export type GraphMultipleSelectionFilterValue = FilterItemOption[];
export type GraphFiltersValueTypes = GraphRangeSliderFilterValue | GraphInputFilterValue | GraphMultipleSelectionFilterValue;

