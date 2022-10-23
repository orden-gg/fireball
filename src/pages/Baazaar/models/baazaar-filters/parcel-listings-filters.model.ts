import { GraphMultiAutocompleteFilter, GraphMultiButtonSelectionFilter, GraphRangeSliderFilter } from 'shared/models';

import { ParcelListingFilterTypes } from '../../constants';

export interface ParcelListingFilters {
    [ParcelListingFilterTypes.Size]: GraphMultiButtonSelectionFilter;
    [ParcelListingFilterTypes.District]: GraphMultiAutocompleteFilter;
    [ParcelListingFilterTypes.Price]: GraphRangeSliderFilter;
    [ParcelListingFilterTypes.FudBoost]: GraphRangeSliderFilter;
    [ParcelListingFilterTypes.FomoBoost]: GraphRangeSliderFilter;
    [ParcelListingFilterTypes.AlphaBoost]: GraphRangeSliderFilter;
    [ParcelListingFilterTypes.KekBoost]: GraphRangeSliderFilter;
}

export type ParcelListingFiltersType = GraphMultiButtonSelectionFilter | GraphMultiAutocompleteFilter | GraphRangeSliderFilter;
