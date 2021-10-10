import React from 'react';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import BaazaarItem from '../BaazaarItem/BaazaarItem';
import Pagination from '../Pagination/Pagination';

const useStyles = makeStyles(() => ({
    baazaarBody: {
        padding: 30
    },
    pagination: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',
        '& nav': {
            marginTop: 15,
            fontSize: '1.2rem'
        }
    },
    warning: {
        marginBottom: '15px'
    },
    noGoods: {
        fontSize: "1rem"
    }
}));

export default function BaazaarBody({goods, page, limit, onNextPageClick, onPrevPageClick}) {
    const classes = useStyles();

    return (
        <Grid className={classes.baazaarBody} item xs={12} sm={12} md={9} lg={9} xl={10}>
            <Grid container spacing={3}>
                {
                    // eslint-disable-next-line array-callback-return
                    goods.map((item) => {
                        return <BaazaarItem key={item.id} item={item} />
                    })
                }
                <Grid className={classes.pagination} item xs={12}>
                    {
                        goods.length ? <Pagination
                                page={page}
                                prevPageVisibility={page === 1}
                                nextPageVisibility={goods.length < limit}
                                onNextPageClick={onNextPageClick}
                                onPrevPageClick={onPrevPageClick}
                            /> :
                            <Typography className={classes.noGoods} variant={'caption'}>Spooky Market has no such goods :(</Typography>
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}