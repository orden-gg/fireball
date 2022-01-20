import React from 'react';
import {  Button } from '@mui/material';
import { useRouteMatch } from 'react-router';

import { raffleNavStyles } from '../styles';
import { NavLink } from 'react-router-dom';

import wearables4icon from '../../../assets/wearables/156.svg';
import h2icon from '../../../assets/images/h2_sealed.svg';
import wearable5icon from '../../../assets/wearables/261.svg';
import realm1icon from '../../../assets/images/icons/kek.png';
import realm2icon from '../../../assets/images/icons/fud.png';
import wearableRPG from '../../../assets/wearables/286.svg';

export default function RaffleNav({address}) {
    const match = useRouteMatch();
    const classes = raffleNavStyles();

    return (
        <div className={classes.container}>
            <Button
                startIcon={
                    <img src={wearables4icon} alt='wearable' height={18} />
                }
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/wearables-4`, search: `?address=${address}` }}
            >
                Wearables #4
            </Button>

            <Button
                startIcon={
                    <img src={h2icon} alt='wearable' height={20} />
                }
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/haunt-2`, search: `?address=${address}` }}
            >
                H2 portals
            </Button>

            <Button
                startIcon={
                    <img src={wearable5icon} alt='wearable' height={20} />
                }
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/wearables-5`, search: `?address=${address}` }}
            >
                Wearables #5
            </Button>

            <Button
                startIcon={
                    <img src={realm1icon} alt='realm' width={20} />
                }
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/realm`, search: `?address=${address}` }}
            >
                Realm
            </Button>

            <Button
                startIcon={
                    <img src={realm2icon} alt='realm' width={20} />
                }
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/realm-2`, search: `?address=${address}` }}
            >
                Realm #2
            </Button>

            <Button
                startIcon={
                    <img src={wearableRPG} alt='realm' width={20} />
                }
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/wearables-rpg`, search: `?address=${address}` }}
            >
                Defi RPG Wearables
            </Button>
        </div>
    );
}