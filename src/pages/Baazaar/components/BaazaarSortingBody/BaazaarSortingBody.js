import React from 'react';
import { Grid, Button, Typography, useTheme } from '@mui/material';
import useStyles from "./style";
import Gotchi from "../../../../components/Gotchi/Gotchi";
import Pagination from '../Pagination/Pagination';
import ghst from '../../../../assets/images/ghst-doubleside.gif';
import Web3 from "web3";
import Filters from "./components/Filters/Filters";

const web3 = new Web3();

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
            </div>
            <div className={classes.pagination}>
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
        </Grid>
    );
}