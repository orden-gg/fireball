import { GraphMultiButtonSelectionFilter } from 'shared/models';

import { ActivityTileListingFilterTypes } from '../../constants';

export interface ActivityTileListingFilters {
    [ActivityTileListingFilterTypes.Erc1155TypeId]: GraphMultiButtonSelectionFilter;
}

export type ActivityTileListingFiltersType = GraphMultiButtonSelectionFilter;
