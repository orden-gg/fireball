import { AlchemicaTypes } from 'shared/constants';

export type AlchemicaList = {
  [alchemica in AlchemicaTypes]: number;
};

export type AlchemicaTuple = [fud: number, fomo: number, alpha: number, kek: number];
