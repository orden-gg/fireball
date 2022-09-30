import { Box, Button } from '@mui/material';

import { paginationStyles } from '../styles';

interface PaginationProps {
    page: number;
    prevPageVisibility: boolean;
    nextPageVisibility: boolean;
    onNextPageClick: () => void;
    onPrevPageClick: () => void;
}

export function Pagination({ page, prevPageVisibility, nextPageVisibility, onNextPageClick, onPrevPageClick }: PaginationProps) {
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
