import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

import _ from 'lodash';

import { DataReloadType } from 'shared/constants';
import { DataReloadConfig, DataReloadContextState } from 'shared/models';
import { useLocalStorage } from 'hooks/useLocalStorage';

const initialState: DataReloadContextState = {
    reloadConfig: {
        client: {
            type: DataReloadType.Client,
            lastUpdated: 0
        },
        explorer: {
            type: DataReloadType.Explorer,
            lastUpdated: 0
        },
        lend: {
            type: DataReloadType.Lend,
            lastUpdated: 0
        },
        map: {
            type: DataReloadType.Map,
            lastUpdated: 0
        }
    },
    setReloadConfig: () => {},
    setActiveReloadType: () => {},
    reloadInterval: 0,
    setReloadInterval: () => {},
    isReloadDisabled: false,
    setIsReloadDisabled: () => {}
};

export const DataReloadContext = createContext<DataReloadContextState>(initialState);

export const DataReloadContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const [reloadConfig, setReloadConfig] = useState<DataReloadConfig>(initialState.reloadConfig);
    const [activeReloadType, setActiveReloadType] = useState<DataReloadType | null>(null);
    const [reloadInterval, setReloadInterval]: [number, Dispatch<SetStateAction<number>>] = useLocalStorage(
        'RELOAD_INTERVAL',
        Number(JSON.parse(localStorage.getItem('RELOAD_INTERVAL') as any)) || initialState.reloadInterval
    );
    const [isReloadDisabled, setIsReloadDisabled] = useState<boolean>(initialState.isReloadDisabled);

    useEffect(() => {
        let interval: NodeJS.Timer;

        if (activeReloadType && reloadInterval) {
            setReloadConfig((configCache: DataReloadConfig) => getUpdatedConfig(configCache, activeReloadType));

            interval = setInterval(() => {
                if (reloadInterval !== 0 && (reloadConfig[activeReloadType].lastUpdated + reloadInterval) <= Date.now()) {
                    setReloadConfig((configCache: DataReloadConfig) => getUpdatedConfig(configCache, activeReloadType));
                }
            }, reloadInterval);
        }

        return () => { clearInterval(interval) };
    }, [activeReloadType, reloadInterval]);

    const getUpdatedConfig = (configCache: DataReloadConfig, propToUpdate: DataReloadType): DataReloadConfig => {
        const configCopy: DataReloadConfig = _.cloneDeep(configCache);

        configCopy[propToUpdate].lastUpdated = Date.now();

        return configCopy;
    };

    return (
        <DataReloadContext.Provider value={{
            reloadConfig,
            setReloadConfig,
            setActiveReloadType,
            reloadInterval,
            setReloadInterval,
            isReloadDisabled,
            setIsReloadDisabled
        }}>
            { children }
        </DataReloadContext.Provider>
    );
};
