import { DataReloadPageType } from 'shared/constants';

export type DataReloadType = {
    [key in DataReloadPageType]: {
        type: DataReloadPageType;
        lastUpdated: number;
    }
}
