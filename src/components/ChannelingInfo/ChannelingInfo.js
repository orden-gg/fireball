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

    return (
        <div className={classes.container}>
            {console.log('nextChannel', parcel.tokenId, parcel.parcelHash, nextChannel)}
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
