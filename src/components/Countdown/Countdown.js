import React, { useState } from 'react';
import { DateTime, Duration } from 'luxon';

import useInterval from 'hooks/useInterval';

const interval = 1000;
const longFormat = {
    y: { key: 'year', values: ['year', 'years'] },
    MM: { key: 'month', values: ['month', 'months'] },
    dd: { key: 'day', values: ['day', 'days'] },
    hh: { key: 'hour', values: ['hour', 'hours'] },
    mm: { key: 'minute', values: ['minute', 'minutes'] },
    ss: { key: 'second', values: ['second', 'seconds'] }
};

export default function Countdown({ date, format, onEnd, replacementComponent }) {
    const isInThePast = DateTime.fromISO(new Date(date).toISOString()).toMillis() < DateTime.now().toMillis();

    const [isDateInThePast, setIsDateInThePast] = useState(isInThePast);
    const [countdown, setCountdown] = useState('');

    useInterval(() => {
        const endDate = DateTime.fromISO(new Date(date).toISOString()).toMillis();
        const now = DateTime.now().toMillis();
        let diff;
        let formattedTimeString;

        if (endDate - now > 0) {
            diff = endDate - now;

            setIsDateInThePast(false);
        } else {
            diff = now - endDate;

            setIsDateInThePast(true);
        }
        if (format) {
            const mappedFormat = Object.entries(format).map(([key, value]) => `${key}'${value}'`).join(': ');
            formattedTimeString = Duration.fromMillis(diff).toFormat(mappedFormat)
        } else {
            const mappedLongFormat = Object.entries(longFormat).map(([key, format]) => `${key}' ${format.values[0]}'`).join(' : ');
            formattedTimeString = Duration.fromMillis(diff).toFormat(mappedLongFormat);
        }

        if (endDate - now > 0 ) {
            formattedTimeString = `In ${formattedTimeString}`;
        } else if (endDate - now < 0) {
            formattedTimeString = `${formattedTimeString} ago`;
        }

        setCountdown(formattedTimeString);

        if (parseInt(DateTime.fromMillis(endDate).toSeconds()) === parseInt(DateTime.fromMillis(now).toSeconds())) {
            if (Boolean(onEnd)) {
                onEnd();
            }
        }
    }, interval);

    return (
        <>
            { !(isDateInThePast && replacementComponent) ? (
                <div>Countdown: {countdown}</div>
            ): (
                replacementComponent
            )}

        </>
    )
}
