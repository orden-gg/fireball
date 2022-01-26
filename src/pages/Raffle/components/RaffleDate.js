import React, { useEffect, useState } from 'react';
import { DateTime, Duration } from 'luxon';
import useInterval from '../../../hooks/useInterval';

import { raffleDataStyles } from '../styles';
import classNames from 'classnames';

export default function RaffleDate({start, end}) {
    const [type, setType] = useState(null);
    const [title, setTitle] = useState(null);
    const classes = raffleDataStyles();

    useEffect(() => {
        renderTitle();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useInterval(() => {
        renderTitle();
    }, 1000);

    const renderTitle = () => {
        let local = DateTime.local();
        let diff = end - local;

        if(local > start && local < end) {
            setType('live');
            setTitle(`live for ${Duration.fromObject({milliseconds: diff}).toFormat('hh:mm:ss')}`);
        } else if (local < start) {
            setType('upcoming');
            setTitle(start.toRelative());
        } else {
            setType('ended');
            setTitle(`ended ${end.toRelative()}`);
        }
    };

    if(!title) return null;

    return (
        <div
            className={classNames(classes.title, type)}
            // style={{ color: type === 'live' ? '#ff0c0c' : type === 'upcoming' ? '#1fd71f' : '#979797' }}
        >
            {title}
        </div>
    );
}