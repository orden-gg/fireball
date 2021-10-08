import React from 'react';
import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    subtitle: {
        textAlign: 'center',
        position: 'relative',
        '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: 2,
            background: theme.palette.primary.main
        },
    },
    subtitleInner: {
        '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            width: 10,
            height: 10,
            transform: 'rotate(-45deg)',
            transformOrigin: '0',
            border: `2px solid ${theme.palette.primary.main}`,
        },
        '&::before': {
            borderTop: 'none',
            borderLeft: 'none',
            right: '100%'
        },
        '&::after': {
            borderBottom: 'none',
            borderRight: 'none',
            left: '100%'
        }
    },
    subtitleText: {
        display: 'inline-block',
        position: 'relative',
        padding: '4px 16px',
        background: theme.palette.secondary.main
    }
}));

export default function Subtitle({children, margin}) {
    const classes = useStyles();

    return (
        <Box className={classes.subtitle} margin={margin ? margin : 0}>
            <Box className={classes.subtitleInner}>
                <Typography className={classes.subtitleText} variant='h6'>
                    {children}
                </Typography>
            </Box>
        </Box>
    )
}