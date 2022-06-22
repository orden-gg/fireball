import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';

import { DateTime } from 'luxon';

import { ChannelIcon } from 'components/Icons/Icons';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { RealmApi } from 'api';
import { DAY_MILLIS, HOUR_MILLIS, MINUTE_MILLIS, SECOND_MILLIS } from 'data/date.data';

import { styles } from './styles';

export function GotchiChanelling({ gotchiId }: { gotchiId: string }) {
    const classes = styles();

    const [lastChanneling, setLastChanneling] = useState<number>(0);
    const [lastChannelingLoading, setLastChanellingLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;

        setLastChanellingLoading(true);

        RealmApi.getGotchiLastChanneled(gotchiId).then((res: any) => {
            if (mounted) {
                setLastChanneling(res * 1000);
            }
        }).finally(() => {
            if (mounted) {
                setLastChanellingLoading(false);
            }
        });

        return () => { mounted = false };
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
            { lastChannelingLoading ? (
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
                            <span>last channeling: <span className='highlight'>{DateTime.fromMillis(lastChanneling).toRelative()}</span></span>
                        ) : (
                            <span><span className='highlight'>never</span> channeled!</span>
                        )
                    }
                    placement='top'
                    followCursor
                >
                    <div>
                        { chanelledBeforeCd(lastChanneling) ? (
                            <ChannelIcon height={20} width={20} />
                        ) : (
                            <ChannelIcon className={classes.unactiveIcon} height={20} width={20} />
                        )}
                    </div>
                </CustomTooltip>
            )}
        </div>
    );
}
