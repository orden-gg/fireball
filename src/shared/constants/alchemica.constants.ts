import { ParcelAlchemica } from 'shared/models';

import { AlchemicaTypes } from './enums';

export const SURVEY_ROUNDS: number = 10;

export const FIRST_ROUND_AVERAGE: number = 25;
export const OTHER_ROUNDS_AVERAGE: number = 8.333;

export const ZERO_ALCHEMICA_LIST: ParcelAlchemica = {
  [AlchemicaTypes.Fud]: 0,
  [AlchemicaTypes.Fomo]: 0,
  [AlchemicaTypes.Alpha]: 0,
  [AlchemicaTypes.Kek]: 0
};
