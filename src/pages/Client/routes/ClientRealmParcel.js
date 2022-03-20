import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Link, List, ListItem, Typography } from '@mui/material';
import { useHistory } from 'react-router';
import { useLocation } from 'react-router-dom';

import classNames from 'classnames';
import Web3 from 'web3';

import ParcelImage from 'components/Items/ParcelImage/ParcelImage';
import ParcelBaazaarLink from 'components/Items/Parcel/common/ParcelBaazaarLink/ParcelBaazaarLink';
import thegraph from 'api/thegraph';
import commonUtils from 'utils/commonUtils';
import itemUtils from 'utils/itemUtils';
import ghstIcon from 'assets/images/animated/ghst-token.gif';

import { parcelSinglePage, routersStyles } from '../styles'

const web3 = new Web3();

export default function ClientRealmParcel() {
    const classes = {
        ...routersStyles(),
        ...parcelSinglePage()
    };
    const [isNumericId, setNumericIdStatus] = useState(null);
    const [id, setId] = useState(null);
    const location = useLocation();
    const history = useHistory();
    const [parcel, setParcel] = useState();
    const [baazaarId, setBaazaarId] = useState();
    const [historicalPrices, setHistoricalPrices] = useState([]);
    const alchemica = ['fud', 'fomo', 'alpha', 'kek'];

    const getName = (parcel) => {
        return parcel.parcelHash.replace(/-/g, ' ');
    };

    const getFormattedDate = (datestamp) => {
        const date = new Date(parseInt(datestamp + '000'));

        return `${date.toLocaleString()}`;
    };

    useEffect(() => {
        if (isNumericId === null) return;

        if (isNumericId) {
            thegraph.getRealmFromClientById(id).then((response) => {
                setParcel(response);
            });
            thegraph.getListedParcel(id).then((response) => {
                setBaazaarId(response[0]?.id);
            });
            thegraph.getParcelHistoricalPrices(id).then((response) => {
                setHistoricalPrices(response);
            });
        } else {
            history.push(`/client/`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNumericId]);

    useEffect(() => {
        const pathParts = location.pathname.split('/');
        const parcelId = +pathParts[pathParts.length - 1];

        setId(parcelId);
        setNumericIdStatus(!isNaN(parcelId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {
                parcel ? <Box className={classes.sortWrapper}>
                    <Grid container spacing={6} className={classes.parcelWrapContainer}>
                        <Grid item className={classes.parcelImageContainer} xs={12} sm={6}>
                            <ParcelImage parcel={parcel} parcelSize={300}/>
                        </Grid>
                        <Grid item className={classes.parcelInfoWrap} xs={12} sm={6}>
                            <Box className={classes.parcelInfoContainer}>
                                <Typography className={classes.name} variant={"h5"}>{getName(parcel)}</Typography>

                                <Grid container>
                                    {
                                        alchemica.map((item, index) => {
                                            return <Grid item xs={3} key={index}>
                                                <Box className={classes.alchemicaContainer}>
                                                    <img className={classes.alchemicaImg}
                                                         alt={item}
                                                         src={itemUtils.getAlchemicaImg(item)}/> {parcel[`${item}Boost`]}
                                                </Box>
                                            </Grid>
                                        }).filter((item, i) => +parcel[`${alchemica[i]}Boost`])
                                    }
                                </Grid>

                                {
                                    baazaarId ? <Box>
                                        <ParcelBaazaarLink parcel={parcel} isBaazaarCard={true} link={baazaarId}
                                                           text={'Watch in Baazaar'}/>
                                    </Box> : <Box className={classes.notListedInBaazaar}>
                                        Not listed in Baazaar
                                    </Box>
                                }
                                <Typography variant={'h6'} className={classes.ownerLink}>Owner: <Link
                                    href={
                                        `${window.location.origin}/client/gotchis?address=${parcel.owner.id}`
                                    }
                                    underline='none'
                                >
                                    {commonUtils.cutAddress(parcel.owner.id)}
                                </Link></Typography>

                                <Button
                                    fullWidth
                                    variant={'outlined'}
                                    onClick={() => {
                                        console.log(location);
                                        navigator.clipboard.writeText(`${window.location.origin}${location.pathname.split('?')[0]}`)
                                    }}
                                >
                                    Copy parcel link
                                </Button>
                            </Box>
                        </Grid>
                        {historicalPrices && historicalPrices.length &&
                            <Grid item className={classes.parcelTransactions} xs={12}>
                                <List className={classes.parcelTransactionsWrapper}>
                                    <ListItem
                                        className={classNames(classes.parcelTransactionsItem, classes.parcelTransactionsItemHead)}>
                                        <Grid container spacing={2} className={classes.parcelTransactionsItemInner}>
                                            <Grid item xs={12} sm={6} md={3}>
                                                Seller:
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                                Buyer:
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={4}>
                                                Date:
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={2}>
                                                Price:
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    {
                                        historicalPrices?.map((item, index) => {
                                            return <ListItem className={classes.parcelTransactionsItem} key={index}>
                                                <Grid container spacing={2}
                                                      className={classes.parcelTransactionsItemInner}>
                                                    <Grid item xs={12} sm={6} md={3}>
                                                        <Typography
                                                            className={classes.reserveTitle}>Seller: </Typography>
                                                        <Link

                                                            href={
                                                                `${window.location.origin}/client/gotchis?address=${item.seller}`
                                                            }
                                                            underline='none'
                                                            className={classes.address}
                                                        >
                                                            {commonUtils.cutAddress(item.seller)}
                                                        </Link>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={3}>
                                                        <Typography
                                                            className={classes.reserveTitle}>Buyer: </Typography>
                                                        <Link
                                                            href={
                                                                `${window.location.origin}/client/gotchis?address=${item.buyer}`
                                                            }
                                                            underline='none'
                                                            className={classes.address}
                                                        >
                                                            {commonUtils.cutAddress(item.buyer)}
                                                        </Link>

                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={4}>
                                                        <Typography className={classes.reserveTitle}>Time: </Typography>
                                                        {getFormattedDate(item.timePurchased)}
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} md={2}>
                                                        <Typography
                                                            className={classes.reserveTitle}>Price: </Typography>
                                                        <img src={ghstIcon} alt={'GHST'} className={classes.priceIcon}/>
                                                        {web3.utils.fromWei(item.priceInWei)}
                                                    </Grid>
                                                </Grid>
                                            </ListItem>
                                        })
                                    }
                                </List>
                            </Grid>}
                    </Grid>
                </Box> : <Box className={classes.noContent}>
                    There is no such parcel as {id} :(
                </Box>
            }

        </>
    );
}
