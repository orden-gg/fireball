import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Backdrop, Button, Divider, MenuItem, Select, Typography } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

import classNames from 'classnames';
import _ from 'lodash';

import { CountdownFormatNonZeroType, DataReloadType, DATA_RELOAD_INTERVALS } from 'shared/constants';
import { DataReloadContextState, DataReloadConfig, LastUpdate, CountdownShortFormat } from 'shared/models';
import { Countdown } from 'components/Countdown/Countdown';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { DataReloadContext } from 'contexts/DataReloadContext';
import { ReloadIcon } from 'components/Icons/Icons';

import { dataReloadStyles } from '../styles';

const countdownFormat: CountdownShortFormat = {
    hours: { key: CountdownFormatNonZeroType.H, value: 'h', isShown: true, shownIfZero: false },
    minutes: { key: CountdownFormatNonZeroType.M, value: 'm', isShown: true, shownIfZero: false },
    seconds: { key: CountdownFormatNonZeroType.S, value: 's', isShown: true, shownIfZero: false }
};

export function DataReloadPanel() {
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
    const [interval, setInterval] = useState<number | string>(reloadInterval || DATA_RELOAD_INTERVALS.FiveMins);
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
        if (Object.values(DataReloadType).includes(path as DataReloadType)) {
            setReloadConfig((configCache: DataReloadConfig) => getUpdatedConfig(configCache, path as DataReloadType));
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

        return (
            <div className={classes.tooltip}>
                <span className={classes.tooltipTitle}>Fetch data</span>
                <span className={classes.tooltipRow}>Last: <span className={classes.countdown}><Countdown shortFormat={countdownFormat} targetDate={lastUpdated} /></span></span>
            </div>
        );
    };

    const getLiveReloadTooltip = (lastUpdate: LastUpdate): JSX.Element => {
        const lastUpdated: number = lastUpdate[currentRoute as DataReloadType];
        const nextUpdate: JSX.Element = reloadInterval ?
            <Countdown shortFormat={countdownFormat} targetDate={lastUpdated + reloadInterval} /> :
            <>unset</>;

        return (
            <div className={classes.tooltip}>
                <span className={classes.tooltipRow}>Next fetch: <span className={classes.countdown}>{nextUpdate}</span></span>
            </div>
        );
    };

    const renderAutoButton = (): JSX.Element => {
        return (
            <Button
                className={
                    classNames(classes.mainButton, isDropdownOpen && 'opened', reloadInterval && 'active')
                }
                onClick={() => onOpenLiveReloadDropdown(isDropdownOpen)}
            >
                <UpdateIcon />
            </Button>
        );
    };

    return (
        <div className={classes.dataReloadWrapper}>

            <div className={classNames(classes.topButtonsGroup, isDropdownOpen && 'opened')}>
                <CustomTooltip
                    title={getReloadTooltip(lastUpdate)}
                    enterTouchDelay={0}
                    placement='bottom'
                    arrow={true}
                >
                    <Button
                        disabled={isReloadDisabled}
                        onClick={() => onHandleDataReload(currentRoute)}
                        className={classes.mainButton}
                    >
                        <ReloadIcon />
                    </Button>
                </CustomTooltip>

                <Divider orientation="vertical" className={classes.divider} />

                {
                    isDropdownOpen ? (
                        renderAutoButton()
                    ) : (
                        <CustomTooltip
                            title={getLiveReloadTooltip(lastUpdate)}
                            enterTouchDelay={0}
                            placement='bottom'
                            arrow={true}
                        >
                            {renderAutoButton()}
                        </CustomTooltip>
                    )
                }
            </div>

            <Backdrop open={isDropdownOpen} onClick={() => setIsDropdownOpen(false)} />

            { isDropdownOpen &&
                <div className={classes.liveReloadDropdown}>
                    <Typography className={classes.dropdownTitle}>Fetch interval</Typography>
                    <div className={classes.selectContainer}>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={interval}
                            displayEmpty
                            onChange={onHandleIntervalChange}
                            size='small'
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
                            className={classes.dropdownButton}
                        >
                            Deactivate
                        </Button>
                        <Button
                            variant='contained'
                            color='secondary'
                            size='small'
                            disabled={!interval || isReloadDisabled}
                            onClick={() => onActivateLiveReload(interval)}
                            className={classes.dropdownButton}
                        >
                            Activate
                        </Button>
                    </div>
                </div>
            }
        </div>
    );
}

