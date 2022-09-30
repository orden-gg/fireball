import { GraphInputFilter, GraphRangeSliderFilter } from 'shared/models';

import { GotchiListingsFilterTypes } from '../constants';

export interface GotchiListingsFilters {
    [GotchiListingsFilterTypes.BRS]: GraphInputFilter;
    [GotchiListingsFilterTypes.Kinship]: GraphInputFilter;
    [GotchiListingsFilterTypes.Experience]: GraphInputFilter;
    [GotchiListingsFilterTypes.Price]: GraphRangeSliderFilter;
    [GotchiListingsFilterTypes.NrgTrait]: GraphRangeSliderFilter;
    [GotchiListingsFilterTypes.AggTrait]: GraphRangeSliderFilter;
    [GotchiListingsFilterTypes.SpkTrait]: GraphRangeSliderFilter;
    [GotchiListingsFilterTypes.BrnTrait]: GraphRangeSliderFilter;
    [GotchiListingsFilterTypes.EysTrait]: GraphRangeSliderFilter;
    [GotchiListingsFilterTypes.EycTrait]: GraphRangeSliderFilter;
}

export type GotchiListingsFilterType = GraphInputFilter | GraphRangeSliderFilter;
