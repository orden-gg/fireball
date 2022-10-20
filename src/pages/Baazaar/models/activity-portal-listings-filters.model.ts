import { GraphMultiButtonSelectionFilter } from 'shared/models';

import { ActivityPortalListingFilterTypes } from '../constants';

export interface ActivityPortalListingFilters {
    [ActivityPortalListingFilterTypes.HauntId]: GraphMultiButtonSelectionFilter;
}

export type ActivityPortaListingFiltersType = GraphMultiButtonSelectionFilter;
