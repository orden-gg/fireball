import React from 'react';
import { Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    wrap: {
        display: 'flex',
        marginTop: 20
    },
    button: {
        height: 36
    },
    current: {
        padding: '0 25px',
        height: 36,
        lineHeight: '36px',
        textAlign: 'center'
    }
}));

export default function Pagination({page, prevPageVisibility, nextPageVisibility, onNextPageClick, onPrevPageClick}) {
    const classes = useStyles();

    return (
        <Box className={classes.wrap}>
            <Button
                className={classes.button}
                variant='outlined'
                color='primary'
                disabled={prevPageVisibility}
                onClick={() => onPrevPageClick()}
            >
                Prev
            </Button>
            <Box className={classes.current}>{page}</Box>
            <Button
                className={classes.button}
                variant='outlined'
                color='primary'
                disabled={nextPageVisibility}
                onClick={() => onNextPageClick()}
            >
                Next
            </Button>
        </Box>
    );
}