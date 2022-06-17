import { useEffect, useState } from 'react';

import classNames from 'classnames';
import { DateTime, Duration } from 'luxon';

import useInterval from 'hooks/useInterval';

import { raffleDataStyles } from '../styles';

interface RaffleDateProps {
    start: number;
    end: number;
}

/**
 *
 * @param start - either could be milliseconds or seconds, currently rely on seconds
 * @param end - either could be milliseconds or seconds, currently rely on seconds
 */
export function RaffleDate({ start, end }) {
    const classes = raffleDataStyles();

    const [type, setType] = useState<any>(null);
    const [title, setTitle] = useState<any>(null);

    useEffect(() => {
        renderTitle();
    }, []);

    useInterval(() => {
        renderTitle();
    }, 1000);

    const renderTitle = (): void => {
        const local: number = DateTime.local().toSeconds();
        const diff: number = end - local;

        if (local > start && local < end) {
            setType('live');
            setTitle(`live for ${Duration.fromObject({ milliseconds: diff }).toFormat('hh:mm:ss')}`);
        } else if (local < start) {
            setType('upcoming');
            setTitle(start.toRelative());
        } else {
            setType('ended');
            setTitle(`ended ${end.toRelative()}`);
        }
    };

    if (!title) {
        <></>;
    };

    return (
        <div className={classNames(classes.title, type)}>
            {title}
        </div>
    );
}
