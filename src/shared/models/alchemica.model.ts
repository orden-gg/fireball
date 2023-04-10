import { AlchemicaTypes } from 'shared/constants';

export type AlchemicaList = {
  [alchemica in AlchemicaTypes]: number;
};

export type AlchemicaListTuple = {
  [alchemica in AlchemicaTypes]: AlchemicaTuple;
};

export type AlchemicaTuple = [fud: number, fomo: number, alpha: number, kek: number];

export interface SurveyRound {
  humble: AlchemicaList;
  reasonable: AlchemicaList;
  spacious: AlchemicaList;
  paartner: AlchemicaList;
}
