import { useCallback, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Backdrop, Button, Divider, MenuItem, Select, Typography } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';

import classNames from 'classnames';

import { CountdownFormatNonZeroType, CountdownFormatZeroType, DataReloadType, DATA_RELOAD_INTERVALS } from 'shared/constants';
import { DataReloadContextState, CountdownShortFormat } from 'shared/models';
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

const liveCountdownFormat: CountdownShortFormat = {
    minutes: { key: CountdownFormatZeroType.M, value: '', isShown: true, shownIfZero: true },
    seconds: { key: CountdownFormatZeroType.S, value: '', isShown: true, shownIfZero: false }
};

export function DataReloadPanel() {
    const classes = dataReloadStyles();

    const { pathname } = useLocation();
    const currentRoute: string = pathname.split('/')[1];

    const {
        lastUpdated,
        setLastManuallyUpdated,
        reloadInterval,
        setReloadInterval,
        reloadIntervalCountdown,
        isReloadDisabled
    } = useContext<DataReloadContextState>(DataReloadContext);

    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [interval, setInterval] = useState<number | string>(reloadInterval || DATA_RELOAD_INTERVALS.FiveMins);

    const onHandleDataReload = (path: string): void => {
        if (Object.values(DataReloadType).includes(path as DataReloadType)) {
            setLastManuallyUpdated(Date.now());
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

    const getReloadTooltip = useCallback((lastUpdated: number): JSX.Element => {
        let countdownText: JSX.Element;

        if (lastUpdated === 0) {
            countdownText = <span>fetching...</span>;
        } else {
            countdownText = <Countdown shortFormat={countdownFormat} targetDate={lastUpdated} />;
        }

        return (
            <div className={classes.tooltip}>
                <span className={classes.tooltipTitle}>Fetch data</span>
                <span className={classes.tooltipRow}>Last: <span className={classes.countdown}>
                    {countdownText}
                </span></span>
            </div>
        );
    }, [lastUpdated]);

    const getLiveReloadTooltip = (intervalCountdown: number): JSX.Element => {
        let countdown: JSX.Element;

        if (intervalCountdown) {
            countdown = <span className={classes.interval}>
                <Countdown
                    shortFormat={liveCountdownFormat}
                    targetDate={intervalCountdown}
                    valueSeparator={':'}
                    isShowAdditionalText={false}
                />
            </span>;
        } else {
            countdown = <></>;
        }

        return countdown;
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
                    title={getReloadTooltip(lastUpdated)}
                    enterTouchDelay={0}
                    placement='bottom'
                    arrow={true}
                >
                    <span>
                        <Button
                            disabled={isReloadDisabled}
                            onClick={() => onHandleDataReload(currentRoute)}
                            className={classNames(classes.mainButton, isReloadDisabled && 'is-loading')}
                        >
                            <ReloadIcon width={22} height={22} />
                        </Button>
                    </span>
                </CustomTooltip>

                <Divider orientation="vertical" className={classes.divider} />

                {
                    isDropdownOpen ? (
                        renderAutoButton()
                    ) : (
                        <CustomTooltip
                            title='Auto fetch'
                            enterTouchDelay={0}
                            placement='bottom'
                            arrow={true}
                        >
                            {renderAutoButton()}
                        </CustomTooltip>
                    )
                }
                {getLiveReloadTooltip(reloadIntervalCountdown)}
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

