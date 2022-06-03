import React from 'react';
import { Skeleton } from '@mui/material';

import { DateTime } from 'luxon';

import Countdown from 'components/Countdown/Countdown';

import styles from './styles';

const countdownFormat = {
    days: { key: 'dd', value: 'd', showIfZero: false },
    hours: { key: 'hh', value: 'h', showIfZero: false },
    minutes: { key: 'mm', value: 'm', showIfZero: false },
};

export default function ChannelingInfo({ channeling }) {
    const classes = styles();

    const fromTimestampToMillis = (timestamp) => {
        return DateTime.fromSeconds(timestamp).toMillis();
    }

    if (channeling.lastChanneled === 0) {
        return <div className={classes.container} style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>
            never channeled
        </div>
    }

    if (channeling.loading) {
        return <div className={classes.placeholder}>
            <Skeleton
                className={classes.placeholderInner}
                variant='rectangular'
                width='100%'
                height={30}
            />
        </div>
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
    )
}
