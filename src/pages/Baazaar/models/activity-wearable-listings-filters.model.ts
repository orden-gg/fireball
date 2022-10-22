import { GraphMultiButtonSelectionFilter } from 'shared/models';

import { ActivityWearableListingFilterTypes } from '../constants';

export interface ActivityWearableListingFilters {
    [ActivityWearableListingFilterTypes.RarityLevel]: GraphMultiButtonSelectionFilter;
}

export type ActivityWearableListingFiltersType = GraphMultiButtonSelectionFilter;
