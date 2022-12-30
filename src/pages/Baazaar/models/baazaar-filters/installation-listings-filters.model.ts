import { GraphRangeSliderFilter } from 'shared/models';

import { InstallationListingFilterTypes } from '../../constants';

export interface InstallationListingFilters {
    [InstallationListingFilterTypes.Price]: GraphRangeSliderFilter;
}

export type InstallationListingFiltersType = GraphRangeSliderFilter;
