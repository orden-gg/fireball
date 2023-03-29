import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';

import { DateTime } from 'luxon';

import { TheGraphApi } from 'api';

import { CountdownFormatNonZeroType, DAY_MILLIS, HOUR_MILLIS, MINUTE_MILLIS, SECOND_MILLIS } from 'shared/constants';
import { CountdownShortFormat, GotchiLastChanneled } from 'shared/models';

import { Countdown } from 'components/Countdown/Countdown';
import { ChannelActiveIcon, ChannelIcon } from 'components/Icons/Icons';
import { CustomTooltip } from 'components/custom/CustomTooltip';

import { styles } from './styles';

const countdownFormat: CountdownShortFormat = {
  days: { key: CountdownFormatNonZeroType.D, value: 'd', isShown: true, shownIfZero: false },
  hours: { key: CountdownFormatNonZeroType.H, value: 'h', isShown: true, shownIfZero: false },
  minutes: { key: CountdownFormatNonZeroType.M, value: 'm', isShown: true, shownIfZero: false }
};

export function GotchiChanelling({ gotchiId, lastchanneled }: { gotchiId: string; lastchanneled?: string }) {
  const classes = styles();

  const [lastChanneling, setLastChanneling] = useState<number>(0);
  const [lastChannelingLoading, setLastChanellingLoading] = useState<boolean>(true);

  useEffect(() => {
    if (lastchanneled) {
      setLastChanneling(Number(lastchanneled) * 1000);
      setLastChanellingLoading(false);
    } else {
      let mounted = true;

      setLastChanellingLoading(true);
      TheGraphApi.getGotchisGotchiverseInfoByIds([gotchiId])
        .then((gotchiIdChanneled: GotchiLastChanneled) => {
          if (mounted) {
            setLastChanneling(Number(gotchiIdChanneled[0].lastChanneledAlchemica) * 1000);
          }
        })
        .finally(() => {
          if (mounted) {
            setLastChanellingLoading(false);
          }
        });

      return () => {
        mounted = false;
      };
    }
  }, [gotchiId]);

  const atLeastOneTimeChanneled = (date: number) => {
    return date > 0;
  };

  const moreThan24hours = (date: number) => {
    const dateDiff = DateTime.local().toMillis() - date;

    return dateDiff > DAY_MILLIS;
  };

  const getUTCDayMilis = (timestamp) => {
    const utc = DateTime.fromMillis(timestamp).setZone('UTC');
    const hours = utc.hour * HOUR_MILLIS;
    const minutes = utc.minute * MINUTE_MILLIS;
    const seconds = utc.second * SECOND_MILLIS;

    return hours + minutes + seconds;
  };

  const chanelledBeforeCd = (date) => {
    if (moreThan24hours(date)) {
      return true;
    }

    const last = getUTCDayMilis(date);
    const now = getUTCDayMilis(DateTime.local().toMillis());

    return last - now > 0;
  };

  return (
    <div className={classes.container}>
      {lastChannelingLoading ? (
        <ContentLoader
          speed={2}
          viewBox='0 0 28 28'
          backgroundColor='#2c2f36'
          foregroundColor='#16181a'
          className={classes.placeholder}
        >
          <rect x='0' y='0' width='28' height='28' />
        </ContentLoader>
      ) : (
        <CustomTooltip
          title={
            atLeastOneTimeChanneled(lastChanneling) ? (
              <div className={classes.tooltipRow}>
                <span>
                  <Countdown targetDate={lastChanneling} shortFormat={countdownFormat} />
                </span>
                {'('}
                <div style={{ color: chanelledBeforeCd(lastChanneling) ? 'lime' : 'orange' }}>
                  {chanelledBeforeCd(lastChanneling) ? 'ready' : 'cooldown'}
                </div>
                {')'}
              </div>
            ) : (
              <span>
                <span className='highlight'>never</span> channeled!
              </span>
            )
          }
          placement='top'
          followCursor
        >
          <div>
            {chanelledBeforeCd(lastChanneling) ? (
              <ChannelActiveIcon className={classes.activeIcon} height={20} width={20} />
            ) : (
              <ChannelIcon className={classes.unactiveIcon} height={20} width={20} />
            )}
          </div>
        </CustomTooltip>
      )}
    </div>
  );
}
