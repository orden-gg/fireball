import React from 'react';

import { DateTime } from 'luxon';

import Countdown from 'components/Countdown/Countdown';

import styles from './styles';

const countdownFormat = {
    days: { key: 'dd', value: 'd', showIfZero: false },
    hours: { key: 'hh', value: 'h', showIfZero: false },
    minutes: { key: 'mm', value: 'm', showIfZero: false },
};

export default function ChannelingInfo({ parcel }) {
    const classes = styles();

    const lastChanneled = DateTime.fromSeconds(parcel.lastChanneled).toMillis();
    const nextChannel = DateTime.fromSeconds(parcel.nextChannel).toMillis();

    if (parcel.lastChanneled === 0) {
        return <div className={classes.container} style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>
            never channeled
        </div>
    }

    return (
        <div className={classes.container}>
            <div className={classes.inner}>
                last:
                <Countdown targetDate={lastChanneled} shortFormat={countdownFormat} />
            </div>
            <div className={classes.inner}>
                ready:
                <Countdown
                    targetDate={nextChannel}
                    shortFormat={countdownFormat}
                    replacementComponent={<span style={{ color: 'lime' }}>Now!</span>} />
            </div>
        </div>
    )
}
