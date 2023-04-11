import { AlchemicaTypes } from 'shared/constants';

import { ParcelAlchemica } from './realm.model';

export type AlchemicaRoundsList = {
  [alchemica in AlchemicaTypes]: number[];
};

export type AlchemicaTuple = [fud: number, fomo: number, alpha: number, kek: number];

export interface SurveyRound {
  humble: ParcelAlchemica;
  reasonable: ParcelAlchemica;
  spacious: ParcelAlchemica;
  paartner: ParcelAlchemica;
}
