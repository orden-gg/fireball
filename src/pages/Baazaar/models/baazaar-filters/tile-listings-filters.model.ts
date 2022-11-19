import { GraphMultiButtonSelectionFilter, GraphRangeSliderFilter } from 'shared/models';

import { TileListingFilterTypes } from '../../constants';

export interface TileListingFilters {
    [TileListingFilterTypes.Erc1155TypeId]: GraphMultiButtonSelectionFilter;
    [TileListingFilterTypes.Price]: GraphRangeSliderFilter;
}

export type TileListingFiltersType = GraphMultiButtonSelectionFilter | GraphRangeSliderFilter;
