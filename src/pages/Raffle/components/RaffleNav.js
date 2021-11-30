import React from 'react';
import {  Button, Link } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useRouteMatch } from 'react-router';

import { alpha } from '@mui/system';
import { NavLink } from 'react-router-dom';

import wearables4icon from '../../../assets/wearables/156.svg';
import h2icon from '../../../assets/images/h2_sealed.svg';
import wearable5icon from '../../../assets/wearables/261.svg';
import realm1icon from '../../../assets/images/icons/kek.png';
import { raffleNavStyles } from '../styles';

export default function RaffleNav({address}) {
    const match = useRouteMatch();
    const classes = raffleNavStyles();
    const theme = useTheme();

    return (
        <div className={classes.container}>
            <Button
                startIcon={
                    <img src={wearables4icon} alt='wearable' height={18} />
                }
                component={Link}
                className={classes.button}
                disabled
                // activeClassName='active'
                // to={{ pathname: `${match.url}/wearable-5`, search: `?address=${address}` }}
            >
                Wearables #4
            </Button>

            <Button
                startIcon={
                    <img src={h2icon} alt='wearable' height={20} />
                }
                component={Link}
                className={classes.button}
                disabled
                // activeClassName='active'
                // to={{ pathname: `${match.url}/wearable-5`, search: `?address=${address}` }}
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
        </div>
    );
}