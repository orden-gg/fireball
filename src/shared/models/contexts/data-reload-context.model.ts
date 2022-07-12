import { Dispatch, SetStateAction } from 'react';

import { DataReloadType } from 'shared/constants';

export interface DataReloadContextState {
    lastUpdated: number;
    setLastUpdated: Dispatch<SetStateAction<number>>;
    lastManuallyUpdated: number;
    setLastManuallyUpdated: Dispatch<SetStateAction<number>>;
    setActiveReloadType: Dispatch<SetStateAction<DataReloadType | null>>;
    reloadInterval: number;
    setReloadInterval: Dispatch<SetStateAction<number>>;
    reloadIntervalCountdown: number;
    setReloadIntervalCountdown: Dispatch<SetStateAction<number>>;
    isReloadDisabled: boolean;
    setIsReloadDisabled: Dispatch<SetStateAction<boolean>>;
}
