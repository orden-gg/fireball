import { useEffect, useState } from 'react';

import { DateTime, Duration } from 'luxon';

const interval = 1000;
const defaultLongFormat = {
    years: { key: 'y', values: ['year', 'years'], showIfZero: false },
    months: { key: 'MM', values: ['month', 'months'], showIfZero: false },
    days: { key: 'dd', values: ['day', 'days'], showIfZero: false },
    hours: { key: 'hh', values: ['hour', 'hours'], showIfZero: false },
    minutes: { key: 'mm', values: ['minute', 'minutes'], showIfZero: false },
    seconds: { key: 'ss', values: ['second', 'seconds'], showIfZero: false }
};

interface CountdownProps {
    targetDate: number;
    shortFormat?: any;
    longFormat?: any;
    onEnd?: () => void,
    replacementComponent?: JSX.Element
}

/***
 * @param targetDate - luxon date in milliseconds
 * @param shortFormat - 1y 2m 3d 4h
 * @param longFormat - 1 year 2 months 3 days 4 hours
 *
 * If unit has to be shown if it's zero and previous units are also equal
 * to zero - eg. 00 days 00 hours 21 minutes, set `@showIfZero` in formats configs to `true`
 *
 * @param onEnd - callback function that will trigger when current date is equal to `@targetDate`
 * @param replacementComponent - component that will be placed instead of countdown if `@targetDate` is in the past
*/
export function Countdown({ targetDate, shortFormat, longFormat, onEnd, replacementComponent }: CountdownProps) {
    const isInThePast = targetDate < DateTime.local().toMillis();

    const [isDateInThePast, setIsDateInThePast] = useState(isInThePast);
    const [countdown, setCountdown] = useState('');

    useEffect(() => {
        function updateCountdown() {
            const now = DateTime.local().toMillis();
            let diff;
            let formattedTimeString;

            if (targetDate - now > 0) {
                diff = targetDate - now;

                setIsDateInThePast(false);
            } else {
                diff = now - targetDate;

                setIsDateInThePast(true);
            }

            if (shortFormat) {
                const formatKeys = Object.keys(shortFormat);
                const units = Duration.fromMillis(diff).shiftTo(...formatKeys).toObject();
                const mappedShortFormat = Object.keys(units)
                    .filter(key => shortFormat[key].showIfZero || getIsShowUnit(key, units))
                    .map(key => `${shortFormat[key].key}'${shortFormat[key].value}'`);

                formattedTimeString = Duration.fromObject(units).toFormat(mappedShortFormat.join(' '));
            } else if (longFormat) {
                formattedTimeString = getLongFormattedTimeString(diff, longFormat);
            } else {
                formattedTimeString = getLongFormattedTimeString(diff, defaultLongFormat);
            }

            if (targetDate - now > 0 ) {
                formattedTimeString = `in ${formattedTimeString}`;
            } else if (targetDate - now < 0) {
                formattedTimeString = `${formattedTimeString} ago`;
            }

            setCountdown(formattedTimeString);

            if (parseInt(DateTime.fromMillis(targetDate).toSeconds()) === parseInt(DateTime.fromMillis(now).toSeconds())) {
                if (onEnd) {
                    onEnd();
                }
            }
        }

        updateCountdown();

        const timer = setInterval(() => {
            updateCountdown();
        }, interval);

        return () => clearInterval(timer);
    }, [targetDate]);

    const getLongFormattedTimeString = (diff, format) => {
        const formatKeys = Object.keys(format);
        const units = Duration.fromMillis(diff).shiftTo(...formatKeys).toObject();
        const mappedLongFormat = Object.entries(units)
            .filter(([key]) => format[key].showIfZero || getIsShowUnit(key, units))
            .map(([key, unit]) => `${format[key].key} ${ parseInt(unit as string) !== 1 ?
                `'${format[key].values[1]}'` : `'${format[key].values[0]}'`}`
            );

        return Duration.fromObject(units).toFormat(mappedLongFormat.join(' '));
    };

    const isShowUnitPredicate = (unitsKeys, units) => {
        return unitsKeys.some(unitsKey => Boolean(units[unitsKey]) && units[unitsKey] > 0);
    };

    const getIsShowUnit = (key, units) => {
        let unitsKeys: string[] = [];

        switch (key) {
            case 'years':
                unitsKeys = ['years'];

                break;
            case 'months':
                unitsKeys = ['years', 'months'];

                break;
            case 'days':
                unitsKeys = ['years', 'months', 'days'];

                break;
            case 'hours':
                unitsKeys = ['years', 'months', 'days', 'hours'];

                break;
            case 'minutes':
                unitsKeys = ['years', 'months', 'days', 'hours', 'minutes'];

                break;
            case 'seconds':
                unitsKeys = ['years', 'months', 'days', 'hours', 'minutes', 'seconds'];

                break;
            default:
                unitsKeys.push('');

                break;
        }

        return isShowUnitPredicate(unitsKeys, units);
    };

    return (
        <>
            { !(isDateInThePast && replacementComponent) ? (
                <div>{countdown}</div>
            ): (
                replacementComponent
            )}

        </>
    );
}
