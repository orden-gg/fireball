import React from 'react';
import {  Button, Link } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useRouteMatch } from 'react-router';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';
import { NavLink } from 'react-router-dom';

import wearables4icon from '../../../assets/wearables/156.svg';
import h2icon from '../../../assets/images/h2_sealed.svg';
import wearable5icon from '../../../assets/wearables/261.svg';
import realm1icon from '../../../assets/images/icons/kek.png';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '12px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    button: {
        margin: '4px !important',
        paddingRight: '12px !important',
        paddingLeft: '12px !important',
        color: '#fff !important',
        border: `2px solid ${alpha(theme.palette.primary.main, .2)} !important`,
        backgroundColor: `${alpha(theme.palette.secondary.dark, .4)} !important`,
        '&:hover': {
            backgroundColor: `${theme.palette.secondary.dark} !important`,
        },
        '&.Mui-disabled': {
            backgroundColor: `${alpha(theme.palette.secondary.dark, .2)} !important`,
            borderColor: `${alpha(theme.palette.secondary.light, .2)} !important`,
            color: `${alpha('#fff', .3)} !important`,
            '& $label': {
                opacity: .4
            }
        },
        '&.active, &.active:hover': {
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: `${theme.palette.secondary.main} !important`,
            '&.Mui-disabled': {
                backgroundColor: `${alpha(theme.palette.primary.main, .1)} !important`,
                color: `${alpha('#fff', .2)} !important`,
                '& $label': {
                    color: `${theme.palette.primary.main} !important`,
                }
            },
            '& $label': {
                color: theme.palette.secondary.main,
            }
        }
    },
    label: {
        fontSize: '14px !important',
        fontWeight: 600,
        color: theme.palette.primary.main
    }
}));

export default function RaffleNav({address}) {
    const match = useRouteMatch();
    const classes = useStyles();
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