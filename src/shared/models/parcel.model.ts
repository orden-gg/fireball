import { TypenameType } from 'shared/constants';
import { AlchemicaTypes } from 'shared/constants';

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
    alchemica: string[];
    fudBoost: number;
    fomoBoost: number;
    alphaBoost: number;
    kekBoost: number;
    surveys: ParcelSurvey[];
    installations: string[];
    tiles: string[];
    historicalPrices?: string[];
    timesTraded?: number;
    timePurchased?: number;
}

export interface ParcelBase {
    parcelHash: string;
    tokenId: string;
    parcelId: string;
    district: number;
    coordinateX: number;
    coordinateY: number;
    size: number;
    historicalPrices: string[];
    __typename: TypenameType;
}

export interface ParcelDTO extends ParcelBase {
    fudBoost: string;
    fomoBoost: string;
    alphaBoost: string;
    kekBoost: string;
    timesTraded: string;
}

export interface ParcelVM extends ParcelBase {
    fudBoost: number;
    fomoBoost: number;
    alphaBoost: number;
    kekBoost: number;
    timesTraded: number;
}

export type ParcelAlchemica = {
    [key in AlchemicaTypes]: number;
};
