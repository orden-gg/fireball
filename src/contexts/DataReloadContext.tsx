import { createContext, useState } from 'react';

import { DataReloadPageType } from 'shared/constants';
import { DataReloadContextState, DataReloadType } from 'shared/models';

const initialState: DataReloadContextState = {
    reloadConfig: {
        client: { lastUpdated: 0, type: DataReloadPageType.Client },
        explorer: { lastUpdated: 0, type: DataReloadPageType.Explorer },
        lend: { lastUpdated: 0, type: DataReloadPageType.Lend },
        map: { lastUpdated: 0, type: DataReloadPageType.Map }
    },
    setReloadConfig: () => {}
};

export const DataReloadContext = createContext<DataReloadContextState>(initialState);

export const DataReloadContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const [reloadConfig, setReloadConfig] = useState<DataReloadType>(initialState.reloadConfig);

    return (
        <DataReloadContext.Provider value={{
            reloadConfig,
            setReloadConfig
        }}>
            { children }
        </DataReloadContext.Provider>
    );
};
