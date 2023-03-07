import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';

import UpdateIcon from '@mui/icons-material/Update';
import { Backdrop, Button, Divider, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';

import classNames from 'classnames';

// store
import * as fromDataReloadStore from 'core/store/data-reload';
import { useAppDispatch, useAppSelector } from 'core/store/hooks';

import {
  CountdownFormatNonZeroType,
  CountdownFormatZeroType,
  DATA_RELOAD_INTERVALS,
  DataReloadType
} from 'shared/constants';
import { CountdownShortFormat } from 'shared/models';

import { Countdown } from 'components/Countdown/Countdown';
import { ReloadIcon } from 'components/Icons/Icons';
import { CustomTooltip } from 'components/custom/CustomTooltip';

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

  const dispatch = useAppDispatch();

  const lastUpdatedTimestamp: number = useAppSelector(fromDataReloadStore.getLastUpdatedTimestamp);
  const reloadInterval: number = useAppSelector(fromDataReloadStore.getReloadInterval);
  const reloadIntervalCountdown: number = useAppSelector(fromDataReloadStore.getReloadIntervalCountdown);
  const isReloadDisabled: boolean = useAppSelector(fromDataReloadStore.getIsReloadDisabled);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [dateReloadInterval, setDataReloadInterval] = useState<number>(
    reloadInterval || DATA_RELOAD_INTERVALS.FiveMins
  );

  const onHandleDataReload = (path: string): void => {
    if (Object.values(DataReloadType).includes(path as DataReloadType)) {
      dispatch(fromDataReloadStore.setLastManuallyTriggeredTimestamp(Date.now()));
    }
  };

  const onOpenLiveReloadDropdown = (isOpen: boolean): void => {
    setIsDropdownOpen(!isOpen);
  };

  const onHandleIntervalChange = (event: SelectChangeEvent<string | number>): void => {
    setDataReloadInterval(Number(event.target.value));
  };

  const onActivateLiveReload = (interval: number | string): void => {
    dispatch(fromDataReloadStore.onSetReloadInterval(Number(interval)));
    setIsDropdownOpen(false);
  };

  const onDeactivateLiveReload = (): void => {
    dispatch(fromDataReloadStore.onSetReloadInterval(0));
    setIsDropdownOpen(false);
  };

  const getReloadTooltip = useCallback(
    (lastUpdatedTimestamp: number): JSX.Element => {
      let countdownText: JSX.Element;

      if (lastUpdatedTimestamp === 0) {
        countdownText = <span>fetching...</span>;
      } else {
        countdownText = <Countdown shortFormat={countdownFormat} targetDate={lastUpdatedTimestamp} />;
      }

      return (
        <div className={classes.tooltip}>
          <span className={classes.tooltipTitle}>Fetch data</span>
          <span className={classes.tooltipRow}>
            Last: <span className={classes.countdown}>{countdownText}</span>
          </span>
        </div>
      );
    },
    [lastUpdatedTimestamp]
  );

  const getLiveReloadCountdown = (intervalCountdown: number): JSX.Element => {
    let countdown: JSX.Element;

    if (intervalCountdown) {
      countdown = (
        <span>
          <Countdown
            shortFormat={liveCountdownFormat}
            targetDate={intervalCountdown}
            valueSeparator={':'}
            isShowAdditionalText={false}
          />
        </span>
      );
    } else {
      countdown = <span>unset</span>;
    }

    return countdown;
  };

  const renderAutoButton = (): JSX.Element => {
    return (
      <Button
        className={classNames(classes.mainButton, isDropdownOpen && 'opened', reloadInterval && 'active')}
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
          title={getReloadTooltip(lastUpdatedTimestamp)}
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

        <Divider orientation='vertical' className={classes.divider} />

        {isDropdownOpen ? (
          renderAutoButton()
        ) : (
          <CustomTooltip title='Auto fetch' enterTouchDelay={0} placement='bottom' arrow={true}>
            {renderAutoButton()}
          </CustomTooltip>
        )}
      </div>

      <Backdrop open={isDropdownOpen} onClick={() => setIsDropdownOpen(false)} />

      {isDropdownOpen && (
        <div className={classes.liveReloadDropdown}>
          <Typography className={classes.dropdownTitle}>
            Fetch interval: {getLiveReloadCountdown(reloadIntervalCountdown)}
          </Typography>
          <div className={classes.selectContainer}>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={dateReloadInterval}
              displayEmpty
              onChange={onHandleIntervalChange}
              size='small'
            >
              <MenuItem value={DATA_RELOAD_INTERVALS.TwoMins}>2 (minutes)</MenuItem>
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
              disabled={!dateReloadInterval || isReloadDisabled}
              onClick={() => onActivateLiveReload(dateReloadInterval)}
              className={classes.dropdownButton}
            >
              Activate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
