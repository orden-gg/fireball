import { TypenameType } from 'shared/constants';
import { AlchemicaTypes } from 'shared/constants';

export declare type AlchemicaBag = [string, string, string, string];

export interface ParcelSurvey {
    id: string;
    surveyed: string;
    round: number;
    fud: string;
    fomo: string;
    alpha: string;
    kek: string;
}

export interface Parcel {
    id: string;
    parcelId: string;
    parcelHash: string;
    district: number;
    size: number;
    coordinateX: number;
    coordinateY: number;
    lastChanneled: number;
    lastClaimed: number;
    nextChannel: number;
    alchemica: AlchemicaBag;
    fudBoost: number;
    fomoBoost: number;
    alphaBoost: number;
    kekBoost: number;
    surveys: ParcelSurvey[];
    installations: string[];
    tiles: string[];
    __typename: TypenameType;
    historicalPrices?: string[];
    timesTraded?: number;
    timePurchased?: number;
}

export interface ParcelVM extends Parcel {
    fudBoost: number;
    fomoBoost: number;
    alphaBoost: number;
    kekBoost: number;
}

export type ParcelAlchemica = {
    [key in AlchemicaTypes]: number;
};
