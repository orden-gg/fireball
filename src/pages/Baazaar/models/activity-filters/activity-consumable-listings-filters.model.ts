import { GraphMultiButtonSelectionFilter } from 'shared/models';

import { ActivityConsumableListingFilterTypes } from '../../constants';

export interface ActivityConsumableListingFilters {
    [ActivityConsumableListingFilterTypes.RarityLevel]: GraphMultiButtonSelectionFilter;
}

export type ActivityConsumableListingFiltersType = GraphMultiButtonSelectionFilter;
