import { GraphMultiButtonSelectionFilter, GraphRangeSliderFilter } from 'shared/models';

import { ConsumableListingFilterTypes } from '../constants';

export interface ConsumableListingFilters {
    [ConsumableListingFilterTypes.RarityLevel]: GraphMultiButtonSelectionFilter;
    [ConsumableListingFilterTypes.Price]: GraphRangeSliderFilter;
}

export type ConsumableListingFiltersType = GraphMultiButtonSelectionFilter | GraphRangeSliderFilter;
