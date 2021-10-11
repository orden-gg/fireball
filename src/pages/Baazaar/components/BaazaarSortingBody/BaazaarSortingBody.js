import React from 'react';
import { Grid, Button, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Gotchi from "../../../../components/Gotchi/Gotchi";
import Pagination from '../Pagination/Pagination';
import ghst from '../../../../assets/images/ghst-doubleside.gif';
import Web3 from "web3";
import Filters from "./components/Filters/Filters";

const web3 = new Web3();

const useStyles = makeStyles(() => ({
    baazaarBody: {
        padding: 30
    },
    baazaarListItems: {
        display: "grid",
        gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))',
        gridGap: 12,
        width: '100%'
    },
    baazaarListItem: {
        maxWidth: 220,
        margin: 'auto'
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
    },
    ghstFooter: {
        marginTop: 5,
        marginBottom: 15
    },
    ghst: {
        width: 20
    },
    price: {
        display: 'flex',
        fontSize: 16,
        alignItems: 'center',
        '& > div': {
            marginTop: 3
        }
    },
    carousel: {
        '& .carousel:not(.carousel-slider)': {
            display: 'none'
        },
        '& .control-dots': {
            display: 'none'
        },
        '& .carousel .slider-wrapper': {
            paddingTop: 10
        },
        '& .carousel-status': {
            top: -17
        }
    }
}));

export default function BaazaarSortingBody({goods, page, limit, onNextPageClick, onPrevPageClick, handleFindClick}) {
    const classes = useStyles();
    const theme = useTheme();

    const getGotchiColor = (haunt) => {
        return theme.palette.haunt['h' + haunt];
    };

    return (
        <Grid className={classes.baazaarBody} item xs={12} sm={12} md={9} lg={9} xl={10}>
            <Filters handleFindClick={handleFindClick} />
            <div className={classes.baazaarListItems}>
                {
                    // eslint-disable-next-line array-callback-return
                    goods.map((item, index) => {
                        return <div key={index}>
                            <div className={classes.baazaarListItem}>
                                <Grid item xs={12}>
                                    {
                                        item.gotchi.__typename === "Aavegotchi" ?
                                                <Gotchi
                                                className={classes.gotchi}
                                                gotchi={item.gotchi}
                                                title={item.gotchi.tokenId}
                                                gotchiColor={getGotchiColor(item.hauntId)}
                                                narrowed={false}
                                            /> :
                                            <Gotchi
                                                key={item.gotchi.id}
                                                className={classes.gotchi}
                                                gotchi={item.gotchi}
                                                title={item.gotchi.tokenId}
                                                gotchiColor={getGotchiColor(item.hauntId)}
                                                narrowed={false}
                                                renderSvgByStats={true}
                                            />
                                    }
                                </Grid>
                            </div>
                            <Grid container className={classes.ghstFooter}>
                                    <Grid item className={classes.price} xs={7}>
                                        <img className={classes.ghst} src={ghst} alt="ghst"/>
                                        <div>{web3.utils.fromWei(item.priceInWei)}</div>
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Button
                                            target={'_blank'}
                                            href={'https://aavegotchi.com/baazaar/erc721/' + item.id}
                                            variant={'outlined'}
                                            color={'primary'}
                                            fullWidth
                                        >Buy</Button>
                                    </Grid>
                                </Grid>
                        </div>
                    })
                }
                <div className={classes.pagination} item xs={12}>
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
                </div>
            </div>
        </Grid>
    );
}