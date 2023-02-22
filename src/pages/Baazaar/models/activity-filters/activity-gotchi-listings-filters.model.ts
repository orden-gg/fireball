import { GraphInputFilter, GraphMultiButtonSelectionFilter, GraphRangeSliderFilter } from 'shared/models';

import { ActivityGotchiListingFilterTypes } from '../../constants';

export interface ActivityGotchiListingFilters {
  [ActivityGotchiListingFilterTypes.BRS]: GraphInputFilter;
  [ActivityGotchiListingFilterTypes.Kinship]: GraphInputFilter;
  [ActivityGotchiListingFilterTypes.Experience]: GraphInputFilter;
  [ActivityGotchiListingFilterTypes.HauntId]: GraphMultiButtonSelectionFilter;
  [ActivityGotchiListingFilterTypes.Collateral]: GraphMultiButtonSelectionFilter;
  [ActivityGotchiListingFilterTypes.NrgTrait]: GraphRangeSliderFilter;
  [ActivityGotchiListingFilterTypes.AggTrait]: GraphRangeSliderFilter;
  [ActivityGotchiListingFilterTypes.SpkTrait]: GraphRangeSliderFilter;
  [ActivityGotchiListingFilterTypes.BrnTrait]: GraphRangeSliderFilter;
  [ActivityGotchiListingFilterTypes.EysTrait]: GraphRangeSliderFilter;
  [ActivityGotchiListingFilterTypes.EycTrait]: GraphRangeSliderFilter;
}

export type ActivityGotchiListingFiltersType =
  | GraphInputFilter
  | GraphRangeSliderFilter
  | GraphMultiButtonSelectionFilter;
