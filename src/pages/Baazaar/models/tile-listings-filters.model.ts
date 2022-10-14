import { GraphRangeSliderFilter } from 'shared/models';

import { TileListingFilterTypes } from '../constants';

export interface TileListingFilters {
    [TileListingFilterTypes.Price]: GraphRangeSliderFilter;
}

export type TileListingFiltersType = GraphRangeSliderFilter;
