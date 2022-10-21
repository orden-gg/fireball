import { GraphMultiAutocompleteFilter, GraphMultiButtonSelectionFilter, GraphRangeSliderFilter } from 'shared/models';

import { ActivityParcelListingFilterTypes } from '../constants';

export interface ActivityParcelListingFilters {
    [ActivityParcelListingFilterTypes.Size]: GraphMultiButtonSelectionFilter;
    [ActivityParcelListingFilterTypes.District]: GraphMultiAutocompleteFilter;
    [ActivityParcelListingFilterTypes.FudBoost]: GraphRangeSliderFilter;
    [ActivityParcelListingFilterTypes.FomoBoost]: GraphRangeSliderFilter;
    [ActivityParcelListingFilterTypes.AlphaBoost]: GraphRangeSliderFilter;
    [ActivityParcelListingFilterTypes.KekBoost]: GraphRangeSliderFilter;
}

export type ActivityParcelListingFiltersType = GraphMultiButtonSelectionFilter | GraphMultiAutocompleteFilter | GraphRangeSliderFilter;
