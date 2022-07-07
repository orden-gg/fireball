import { Dispatch, SetStateAction } from 'react';

import { DataReloadType } from 'shared/constants';

import { DataReloadConfig } from './data-reload.model';

export interface DataReloadContextState {
    reloadConfig: DataReloadConfig;
    setReloadConfig: Dispatch<SetStateAction<DataReloadConfig>>;
    setActiveReloadType: Dispatch<SetStateAction<DataReloadType | null>>;
    reloadInterval: number;
    setReloadInterval: Dispatch<SetStateAction<number>>;
    isReloadDisabled: boolean;
    setIsReloadDisabled: Dispatch<SetStateAction<boolean>>;
}
