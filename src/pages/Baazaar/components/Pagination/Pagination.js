import React from 'react';
import { Box, Button } from '@mui/material';
import { paginationStyles } from '../../styles';


export default function Pagination({page, prevPageVisibility, nextPageVisibility, onNextPageClick, onPrevPageClick}) {
    const classes = paginationStyles();

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