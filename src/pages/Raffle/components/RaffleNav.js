import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useRouteMatch } from 'react-router';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';
import { NavLink } from 'react-router-dom';

import { ClientContext } from '../../../contexts/ClientContext';

import wearable5Placeholder from '../../../assets/wearables/261.svg';
import realmPlaceholder from '../../../assets/images/icons/kek.png';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: '0 4px !important',
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
        <Box display='flex' alignItems='center' justifyContent='center' flexWrap='wrap'>
            <Button
                startIcon={
                    <img src={wearable5Placeholder} alt='wearable' height={20} style={{ marginRight: '4px' }} />
                }
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/wearable-5`, search: `?address=${address}` }}
            >
                Wearable #5
            </Button>

            <Button
                startIcon={
                    <img src={realmPlaceholder} alt='realm' width={20} style={{ marginRight: '4px' }} />
                }
                component={NavLink}
                className={classes.button}
                activeClassName='active'
                to={{ pathname: `${match.url}/realm-1`, search: `?address=${address}` }}
            >
                Realm #1
            </Button>
        </Box>
    );
}