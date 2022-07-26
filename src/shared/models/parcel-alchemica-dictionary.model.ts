import { AlchemicaTypes } from 'shared/constants';

export type ParcelAlchemica = { [key in AlchemicaTypes]: number };

export type ParcelAlchemicaDictionary = {
    [key: string]: ParcelAlchemica;
}
