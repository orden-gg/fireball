import React from 'react';
import {  Button } from '@mui/material';
import { useLocation, useRouteMatch } from 'react-router';

import { raffleNavStyles } from '../styles';
import { NavLink } from 'react-router-dom';

import raffles from '../data/raffles.data';
import RaffleDate from './RaffleDate';

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
                            disabled={raffle.disabled}
                        >
                            {raffle.name.replace(/-/g, ' ')}
                        </Button>

                        {location.pathname.split('/')[2] === raffle.name && <RaffleDate start={raffle.startDate} end={raffle.endDate} />}
                    </div>
                })
            }
        </div>
    );
}
