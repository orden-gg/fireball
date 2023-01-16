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

// TODO: this model on hold until fireball subgraph will be synchronized and include parcel trading history and current listings
// export interface Parcel {
//     id: string;
//     tokenId?: string;
//     parcelId: string;
//     parcelHash: string;
//     district: number;
//     size: number;
//     coordinateX: number;
//     coordinateY: number;
//     lastChanneled: number;
//     lastClaimed: number;
//     nextChannel: number;
//     alchemica: AlchemicaBag;
//     fudBoost: number;
//     fomoBoost: number;
//     alphaBoost: number;
//     kekBoost: number;
//     surveys: ParcelSurvey[];
//     installations: string[];
//     tiles: string[];
//     historicalPrices?: string[];
//     timesTraded?: number;
//     timePurchased?: number;
// }

export interface ParcelBase {
    parcelHash: string;
    tokenId: string;
    parcelId: string;
    district: string;
    size: string;
    historicalPrices: string[];
    __typename: TypenameType;
}

export interface ParcelDTO extends ParcelBase {
    coordinateX: string;
    coordinateY: string;
    fudBoost: string;
    fomoBoost: string;
    alphaBoost: string;
    kekBoost: string;
    timesTraded: string;
}

export interface ParcelVM extends ParcelBase {
    coordinateX: number;
    coordinateY: number;
    fudBoost: number;
    fomoBoost: number;
    alphaBoost: number;
    kekBoost: number;
    timesTraded: number;
}

export type ParcelAlchemica = {
    [key in AlchemicaTypes]: number;
};

export interface ParcelSurveyAlchemica {
    alchemica: AlchemicaBag;
    surveyes: ParcelSurvey[];
}
