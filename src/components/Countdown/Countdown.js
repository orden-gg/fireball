import React, { useEffect, useState } from 'react';
import { DateTime, Duration } from "luxon";
import useInterval from '../../hooks/useInterval';
import useStyles from './styles';

const interval = 1000/24;

DateTime.local().setZone("America/Bogus");

const names = {
    S: ['millisecond', 'milliseconds'],
    ss: ['second', 'seconds'],
    mm: ['minute', 'minutes'],
    hh: ['hour', 'hours'],
    dd: ['day', 'days'],
    M: ['month', 'months'],
    // YY: ['year', 'years'] 
}

const getName = (names, number) => {
    return names[Number(number) === 1 ? 0 : 1];
}

export default function Countdown({date, format, onEnd, id}) {
    const [time, setTime] = useState({});
    const classes = useStyles();
    const formatArray = format.split(':');

    useInterval(() => {
        const diffTime = date - DateTime.local();

        setTime({
            milliseconds: diffTime,
            date: Duration.fromObject({milliseconds: diffTime}).toFormat(format)
        });

    }, time.milliseconds <= 0 ? null : interval);

    
    useEffect( () => {
        if (time.milliseconds <= 0) {
            onEnd(id);
        }
    }, [time]);

    return (
        <>
            {
                time.milliseconds <= 0 ? false : <div className={classes.wrapper}>
                    {
                        time?.date?.split(':').map((item, index) => {
                            return (
                                <div className={classes.inner} key={index}>
                                    <span className={classes.number}>
                                        {item}
                                    </span>
                                    <p className={classes.text}>
                                        {getName(names[formatArray[index]], item)}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </>
    )
}