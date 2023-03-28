import { AlchemicaTypes, InstallationTypeNames, TypenameType } from 'shared/constants';

export declare type AlchemicaBag = [string, string, string, string];

export interface ParcelInstallationDTO {
  installationId: number;
}

export interface ParcelTileDTO {
  tileId: number;
}

export interface ParcelInstallationVM {
  id: number;
  level: number;
  name: string;
  quantity: number;
  type: InstallationTypeNames;
}

export interface ParcelTileVM {
  id: number;
  name: string;
  quantity: number;
}

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
  __typename: TypenameType;
  historicalPrices?: string[];
  timesTraded?: number;
  timePurchased?: number;
}

export interface ParcelDTO extends Parcel {
  installations: ParcelInstallationDTO[];
  tiles: ParcelTileDTO[];
}

export interface ParcelVM extends Parcel {
  installations: ParcelInstallationVM[];
  tiles: ParcelTileVM[];
  altarLevel: number;
}

export type ParcelAlchemica = {
  [key in AlchemicaTypes]: number;
};

export interface RealmBase extends Parcel {
  owner: {
    id: string;
  };
}

export interface RealmDTO extends RealmBase {
  installations: ParcelInstallationDTO[];
  tiles: ParcelTileDTO[];
}

export interface RealmVM extends RealmBase {
  installations: ParcelInstallationVM[];
  tiles: ParcelTileVM[];
  altarLevel: number;
  cooldown: number;
  nextChannel: number;
}
