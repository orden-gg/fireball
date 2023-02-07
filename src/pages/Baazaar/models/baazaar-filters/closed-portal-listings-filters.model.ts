import { GraphMultiButtonSelectionFilter, GraphRangeSliderFilter } from 'shared/models';

import { ClosedPortalListingFilterTypes } from '../../constants';

export interface ClosedPortalListingFilters {
  [ClosedPortalListingFilterTypes.HauntId]: GraphMultiButtonSelectionFilter;
  [ClosedPortalListingFilterTypes.Price]: GraphRangeSliderFilter;
}

export type ClosedPortaListingFiltersType = GraphMultiButtonSelectionFilter | GraphRangeSliderFilter;
