import { TypenameType } from 'shared/constants';

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
