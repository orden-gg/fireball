import { InputFilter, MultiButtonSelectionFilter, RangeSliderFilter } from 'shared/models';

import { OpenedPortalListingFilterTypes } from '../../constants';
import { OpenedPortalListingVM } from '../baazaar/opened-portal-listing.model';

export interface OpenedPortalListingFilters {
    [OpenedPortalListingFilterTypes.BRS]: InputFilter<OpenedPortalListingVM>;
    [OpenedPortalListingFilterTypes.TokenId]: InputFilter<OpenedPortalListingVM>;
    [OpenedPortalListingFilterTypes.HauntId]: MultiButtonSelectionFilter<OpenedPortalListingVM>;
    [OpenedPortalListingFilterTypes.Collateral]: MultiButtonSelectionFilter<OpenedPortalListingVM>;
    [OpenedPortalListingFilterTypes.Price]: RangeSliderFilter<OpenedPortalListingVM>;
    [OpenedPortalListingFilterTypes.NrgTrait]: RangeSliderFilter<OpenedPortalListingVM>;
    [OpenedPortalListingFilterTypes.AggTrait]: RangeSliderFilter<OpenedPortalListingVM>;
    [OpenedPortalListingFilterTypes.SpkTrait]: RangeSliderFilter<OpenedPortalListingVM>;
    [OpenedPortalListingFilterTypes.BrnTrait]: RangeSliderFilter<OpenedPortalListingVM>;
    [OpenedPortalListingFilterTypes.EysTrait]: RangeSliderFilter<OpenedPortalListingVM>;
    [OpenedPortalListingFilterTypes.EycTrait]: RangeSliderFilter<OpenedPortalListingVM>;
}
