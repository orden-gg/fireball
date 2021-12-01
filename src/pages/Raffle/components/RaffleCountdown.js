import React, { useState } from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Countdown from '../../../components/Countdown/Countdown';

import { raffleCountdownStyles } from '../styles';

export default function RaffleCountdown({start, end}) {
    const [currentCountdown, setCurrentCountdown] = useState(0);
    const classes = raffleCountdownStyles();

    const countdowns = [
        {
            text: `Starts in ${'->'}`,
            date: start
        },
        {
            text: `Ends in ${'->'}`,
            date: end,
            liveLabel: true
        },
        {
            text: `Raffle ended`
        }
    ];

    const onEnd = () => {
        setCurrentCountdown(currentCountdown + 1);
    };

    return (
        <Box className={classes.countdownWrapper}>
            <Typography variant='h6' color='primary'>{countdowns[currentCountdown].text}</Typography>
            <div>
                {countdowns[currentCountdown].date && <Countdown
                    date={countdowns[currentCountdown].date}
                    format='dd:hh:mm:ss'
                    onEnd={onEnd}
                    key={currentCountdown}
                />}
            </div>
            { countdowns[currentCountdown].liveLabel ? (
                <Box position='absolute' top='-18px' right='0' >
                    <Typography color='primary' variant='subtitle1'>Live</Typography>
                </Box>
            ) : null}
        </Box>
    );
}