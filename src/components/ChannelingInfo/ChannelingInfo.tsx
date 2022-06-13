import { Skeleton } from '@mui/material';

import { DateTime } from 'luxon';

import { CountdownShortFormat } from 'shared/models/contdown-short-format.model';
import { Countdown } from 'components/Countdown/Countdown';

import { styles } from './styles';

const countdownFormat: CountdownShortFormat = {
    days: { key: 'dd', value: 'd', showIfZero: false },
    hours: { key: 'hh', value: 'h', showIfZero: false },
    minutes: { key: 'mm', value: 'm', showIfZero: false }
};

export function ChannelingInfo({ channeling }: { channeling: any }) {
    const classes = styles();

    const fromTimestampToMillis = (timestamp: number) => {
        return DateTime.fromSeconds(timestamp).toMillis();
    };

    if (channeling.lastChanneled === 0) {
        return <div className={classes.container}>
            <div className={classes.placeholderWarning}>
                never channeled
            </div>
        </div>;
    }

    if (channeling.loading) {
        return <div className={classes.placeholder}>
            <Skeleton
                className={classes.placeholderInner}
                variant='rectangular'
                width='100%'
                height={30}
            />
        </div>;
    }

    return (
        <div className={classes.container}>
            <div className={classes.title}>Channeling!</div>

            <div className={classes.inner}>
                last:
                <Countdown
                    targetDate={fromTimestampToMillis(channeling.lastChanneled)}
                    shortFormat={countdownFormat}
                />
            </div>
            <div className={classes.inner}>
                ready:
                <div className={classes.countdown}>
                    <Countdown
                        targetDate={fromTimestampToMillis(channeling.nextChannel)}
                        shortFormat={countdownFormat}
                        replacementComponent={<span style={{ color: 'lime' }}>Now!</span>}
                    />
                </div>
            </div>
        </div>
    );
}
