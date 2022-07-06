import { DataReloadType } from 'shared/constants';

export interface DataReloadOption {
    type: DataReloadType;
    lastUpdated: number;
}

export type DataReloadConfig = {
    [key in DataReloadType]: DataReloadOption
}

export type LastUpdate = {
    [key in DataReloadType]: number
}
