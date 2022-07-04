import { dataReloadStyles } from '../styles';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';

import _ from 'lodash';

import { DataReloadPageType } from 'shared/constants';
import { DataReloadContextState, DataReloadType } from 'shared/models';
import { DataReloadContext } from 'contexts/DataReloadContext';

export function DataReloadButton() {
    const classes = dataReloadStyles();

    const { pathname } = useLocation();

    const { setReloadConfig } = useContext<DataReloadContextState>(DataReloadContext);

    const onHandleDataReload = (): void => {
        const path = pathname.split('/')[1];

        switch (path) {
            case DataReloadPageType.Client:
                setReloadConfig((configCache: DataReloadType) => getUpdatedConfig(configCache, DataReloadPageType.Client));

                break;
            case DataReloadPageType.Explorer:
                setReloadConfig((configCache: DataReloadType) => getUpdatedConfig(configCache, DataReloadPageType.Explorer));

                break;
            case DataReloadPageType.Lend:
                setReloadConfig((configCache: DataReloadType) => getUpdatedConfig(configCache, DataReloadPageType.Lend));

                break;
            case DataReloadPageType.Map:
                setReloadConfig((configCache: DataReloadType) => getUpdatedConfig(configCache, DataReloadPageType.Map));

                break;
        }
    };

    const getUpdatedConfig = (configCache: DataReloadType, propToUpdate: DataReloadPageType): DataReloadType => {
        const configCopy: DataReloadType = _.cloneDeep(configCache);

        configCopy[propToUpdate].lastUpdated = Date.now();

        return configCopy;
    };

    return (
        <div className={classes.dataReloadWrapper}>
            <Button onClick={() => onHandleDataReload()}>Reload</Button>
        </div>
    );
}

