import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

import { DataReloadType } from 'shared/constants';
import { DataReloadContextState } from 'shared/models';
import { useLocalStorage } from 'hooks/useLocalStorage';

const initialState: DataReloadContextState = {
  lastUpdated: 0,
  setLastUpdated: () => {},
  lastManuallyUpdated: 0,
  setLastManuallyUpdated: () => {},
  setActiveReloadType: () => {},
  reloadInterval: 0,
  setReloadInterval: () => {},
  reloadIntervalCountdown: 0,
  setReloadIntervalCountdown: () => {},
  isReloadDisabled: false,
  setIsReloadDisabled: () => {}
};

export const DataReloadContext = createContext<DataReloadContextState>(initialState);

export const DataReloadContextProvider = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [lastUpdated, setLastUpdated] = useState<number>(initialState.lastUpdated);
  const [lastManuallyUpdated, setLastManuallyUpdated] = useState<number>(initialState.lastUpdated);
  const [activeReloadType, setActiveReloadType] = useState<DataReloadType | null>(null);
  const [reloadInterval, setReloadInterval]: [number, Dispatch<SetStateAction<number>>] = useLocalStorage(
    'RELOAD_INTERVAL',
    Number(JSON.parse(localStorage.getItem('RELOAD_INTERVAL') as any)) || initialState.reloadInterval
  );
  const [reloadIntervalCountdown, setReloadIntervalCountdown] = useState<number>(initialState.reloadIntervalCountdown);
  const [isReloadDisabled, setIsReloadDisabled] = useState<boolean>(initialState.isReloadDisabled);
  const [customInterval, setCustomInterval] = useState<NodeJS.Timer>();

  useEffect(() => {
    if (activeReloadType || lastManuallyUpdated) {
      clearInterval(customInterval);
    }

    if (reloadInterval) {
      clearInterval(customInterval);
      setReloadIntervalCountdown(Date.now() + reloadInterval);

      setCustomInterval(
        setInterval(() => {
          setReloadIntervalCountdown(Date.now() + reloadInterval);

          if (lastManuallyUpdated + reloadInterval <= Date.now()) {
            setLastManuallyUpdated(Date.now());
          }
        }, reloadInterval)
      );
    } else {
      setReloadIntervalCountdown(0);
    }

    return () => {
      clearInterval(customInterval);
    };
  }, [lastManuallyUpdated, reloadInterval, activeReloadType]);

  useEffect(() => {
    setLastUpdated(0);
    setLastManuallyUpdated(0);

    if (reloadInterval) {
      setReloadIntervalCountdown(Date.now() + reloadInterval);
    }
  }, [activeReloadType]);

  return (
    <DataReloadContext.Provider
      value={{
        lastUpdated,
        setLastUpdated,
        lastManuallyUpdated,
        setLastManuallyUpdated,
        setActiveReloadType,
        reloadInterval,
        setReloadInterval,
        reloadIntervalCountdown,
        setReloadIntervalCountdown,
        isReloadDisabled,
        setIsReloadDisabled
      }}
    >
      {children}
    </DataReloadContext.Provider>
  );
};
