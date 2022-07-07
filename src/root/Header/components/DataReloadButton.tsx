import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, IconButton, MenuItem, Select } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';

import _ from 'lodash';

import { DataReloadType, DATA_RELOAD_INTERVALS } from 'shared/constants';
import { DataReloadContextState, DataReloadConfig, LastUpdate } from 'shared/models';
import { Countdown } from 'components/Countdown/Countdown';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { DataReloadContext } from 'contexts/DataReloadContext';

import { dataReloadStyles } from '../styles';

export function DataReloadButton() {
    const classes = dataReloadStyles();

    const { pathname } = useLocation();
    const currentRoute: string = pathname.split('/')[1];

    const {
        reloadConfig,
        setReloadConfig,
        reloadInterval,
        setReloadInterval,
        isReloadDisabled
    } = useContext<DataReloadContextState>(DataReloadContext);

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [interval, setInterval] = useState<number | string>(reloadInterval || '');
    const [lastUpdate, setLastUpdate] = useState<LastUpdate>({
        client: 0,
        explorer: 0,
        lend: 0,
        map: 0
    });

    useEffect(() => {
        const reloadType: DataReloadType = currentRoute as DataReloadType;

        if (Object.values(DataReloadType).includes(reloadType)) {
            setLastUpdate((lastUpdateCache: LastUpdate) => {
                const lastUpdateCacheCopy = _.cloneDeep(lastUpdateCache);

                if (reloadConfig[reloadType].lastUpdated === 0) {
                    lastUpdateCacheCopy[reloadType] = Date.now();
                } else {
                    lastUpdateCacheCopy[reloadType] = reloadConfig[reloadType].lastUpdated;
                }

                return lastUpdateCacheCopy;
            });
        }
    }, [reloadConfig, currentRoute]);

    const onHandleDataReload = (path: string): void => {
        switch (path) {
            case DataReloadType.Client:
                setReloadConfig((configCache: DataReloadConfig) => getUpdatedConfig(configCache, DataReloadType.Client));

                break;
            case DataReloadType.Explorer:
                setReloadConfig((configCache: DataReloadConfig) => getUpdatedConfig(configCache, DataReloadType.Explorer));

                break;
            case DataReloadType.Lend:
                setReloadConfig((configCache: DataReloadConfig) => getUpdatedConfig(configCache, DataReloadType.Lend));

                break;
            case DataReloadType.Map:
                setReloadConfig((configCache: DataReloadConfig) => getUpdatedConfig(configCache, DataReloadType.Map));

                break;
        }
    };

    const onOpenLiveReloadDropdown = (isOpen: boolean): void => {
        setIsDropdownOpen(!isOpen);
    };

    const onHandleIntervalChange = (event: any): void => {
        setInterval(event.target.value);
    };

    const onActivateLiveReload = (interval: number | string): void => {
        setReloadInterval(Number(interval));
        setIsDropdownOpen(false);
    };

    const onDeactivateLiveReload = (): void => {
        setInterval('');
        setReloadInterval(0);
        setIsDropdownOpen(false);
    };

    const getUpdatedConfig = (configCache: DataReloadConfig, propToUpdate: DataReloadType): DataReloadConfig => {
        const configCopy: DataReloadConfig = _.cloneDeep(configCache);

        configCopy[propToUpdate].lastUpdated = Date.now();

        return configCopy;
    };

    const getReloadTooltip = (lastUpdate: LastUpdate): JSX.Element => {
        const lastUpdated: number = lastUpdate[currentRoute as DataReloadType];

        return <span> Last fetch: <Countdown targetDate={lastUpdated} /></span>;
    };

    const getLiveReloadTooltip = (lastUpdate: LastUpdate): JSX.Element => {
        const lastUpdated: number = lastUpdate[currentRoute as DataReloadType];
        const nextUpdate: JSX.Element = reloadInterval ?
            <Countdown targetDate={lastUpdated + reloadInterval} /> :
            <>unknown</>;

        return <>
            <div>Last fetch: <Countdown targetDate={lastUpdated} /></div>
            <div>Next fetch: {nextUpdate}</div>
        </>;
    };

    return (
        <div className={classes.dataReloadWrapper}>
            <CustomTooltip
                title={getReloadTooltip(lastUpdate)}
                enterTouchDelay={0}
                placement='bottom'
            >
                <Button disabled={isReloadDisabled} onClick={() => onHandleDataReload(currentRoute)}>Reload</Button>
            </CustomTooltip>

            <div className={classes.liveReloadDropdownContainer}>
                <CustomTooltip
                    title={getLiveReloadTooltip(lastUpdate)}
                    enterTouchDelay={0}
                    placement='bottom'
                >
                    <IconButton onClick={() => onOpenLiveReloadDropdown(isDropdownOpen)}>
                        <CachedIcon />
                    </IconButton>
                </CustomTooltip>

                { isDropdownOpen &&
                    <div className={classes.liveReloadDropdown}>
                        <div className={classes.selectContainer}>
                            <Select
                                labelId='demo-simple-select-label'
                                id='demo-simple-select'
                                value={interval}
                                label='Interval'
                                onChange={onHandleIntervalChange}
                            >
                                <MenuItem value={DATA_RELOAD_INTERVALS.FiveMins}>5 (minutes)</MenuItem>
                                <MenuItem value={DATA_RELOAD_INTERVALS.TenMins}>10 (minutes)</MenuItem>
                                <MenuItem value={DATA_RELOAD_INTERVALS.FifteenMins}>15 (minutes)</MenuItem>
                            </Select>
                        </div>

                        <div className={classes.buttonsWrapper}>
                            <Button
                                variant='contained'
                                color='warning'
                                size='small'
                                disabled={!reloadInterval}
                                onClick={onDeactivateLiveReload}
                            >
                                Deactivate
                            </Button>
                            <Button
                                variant='contained'
                                color='secondary'
                                size='small'
                                disabled={!interval || isReloadDisabled}
                                onClick={() => onActivateLiveReload(interval)}
                            >
                                Activate
                            </Button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

