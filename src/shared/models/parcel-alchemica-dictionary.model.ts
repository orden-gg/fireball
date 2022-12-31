import { AlchemicaTypes } from 'shared/constants';

export type ParcelAlchemica = {
    [key in AlchemicaTypes]: {
        amount: number;
        maxSupply: number;
    };
};

export type ParcelAlchemicaDictionary = {
    [key: string]: ParcelAlchemica;
};
