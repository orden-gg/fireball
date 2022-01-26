import React from 'react';
import {  Button } from '@mui/material';
import { useLocation, useRouteMatch } from 'react-router';

import { raffleNavStyles } from '../styles';
import { NavLink } from 'react-router-dom';

// import wearableRPG from '../../../assets/wearables/286.svg';
import raffles from '../data/raffles.data';
import RaffleDate from './RaffleDate';
// import { DateTime } from 'luxon';

export default function RaffleNav({user}) {
    const match = useRouteMatch();
    const classes = raffleNavStyles();
    const location = useLocation();

    return (
        <div className={classes.container}>
            {
                raffles.map((raffle, index) => {
                    return <div key={index} className={classes.buttonContainer}>
                        <Button
                            startIcon={
                                <img src={raffle.icon} alt={raffle.name} width={20} height={20} />
                            }
                            component={NavLink}
                            className={classes.button}
                            activeClassName='active'
                            to={{ pathname: `${match.url}/${raffle.name}`, search: `?address=${user}` }}
                        >
                            {raffle.name.replace(/-/g, ' ')}
                        </Button>

                        {location.pathname.split('/')[2] === raffle.name && <RaffleDate start={raffle.startDate} end={raffle.endDate} />}
                    </div>
                })
            }

            {/* <div>
                <Button
                    startIcon={
                        <img src={wearableRPG} alt='realm' width={20} />
                    }
                    component={NavLink}
                    className={classes.button}
                    activeClassName='active'
                    disabled
                    to={{ pathname: `${match.url}/defi-rpg-wearables`, search: `?address=${user}` }}
                >
                    Defi RPG Wearables
                </Button>
                <RaffleDate start={DateTime.local(2022, 1, 26, 14, { zone: 'utc' })} end={DateTime.local(2022, 1, 29, 9, 30, { zone: 'utc' })} />
            </div> */}
        </div>
    );
}