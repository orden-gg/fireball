import React, { useContext } from 'react';
import { Box, Button } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useRouteMatch } from 'react-router';
import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';
import { NavLink } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    label: {
        fontSize: '14px !important',
        fontWeight: 600,
        color: theme.palette.primary.main
    }
}));

export default function RaffleRealm1() {
    const match = useRouteMatch();
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Box display='flex' alignItems='center' justifyContent='center' flexWrap='wrap'>

            Realm - 1
        </Box>
    );
}