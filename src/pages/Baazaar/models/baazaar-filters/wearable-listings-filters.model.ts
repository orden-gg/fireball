import { GraphMultiButtonSelectionFilter, GraphRangeSliderFilter } from 'shared/models';

import { WearableListingFilterTypes } from '../../constants';

export interface WearableListingFilters {
    [WearableListingFilterTypes.RarityLevel]: GraphMultiButtonSelectionFilter;
    [WearableListingFilterTypes.Price]: GraphRangeSliderFilter;
    [WearableListingFilterTypes.NrgTraitModifier]: GraphRangeSliderFilter;
    [WearableListingFilterTypes.AggTraitModifier]: GraphRangeSliderFilter;
    [WearableListingFilterTypes.SpkTraitModifier]: GraphRangeSliderFilter;
    [WearableListingFilterTypes.BrnTraitModifier]: GraphRangeSliderFilter;
}

export type WearableListingFiltersType = GraphMultiButtonSelectionFilter | GraphRangeSliderFilter;
