import { Dispatch, SetStateAction } from 'react';

import { DataReloadType } from './data-reload-type.model';

export interface DataReloadContextState {
    reloadConfig: DataReloadType;
    setReloadConfig: Dispatch<SetStateAction<DataReloadType>>;
}
