import React, { useEffect, useState } from 'react';

import ParcelImage from 'components/Items/ParcelImage/ParcelImage';

import styles from './styles';

export default function ParcelPreview({ parcel }) {
    const classes = styles();

    // const [parcel, setParcel] = useState(null);

    // useEffect(() => {
    //     console.log(parcelId);
    // }, [parcelId]);

    // if (!parcel) {
    //     return <div>There is no parcel with ID {parcelId} :(</div>;
    // }

    const modifyName = (hash) => {
        return hash.replace(/-/g, ' ');
    };

    return (
        <div>
            <div>
                <ParcelImage parcel={parcel} parcelSize={300}/>
            </div>
            <p>{modifyName(parcel.parcelHash)}</p>
                {/* <Grid item className={classes.parcelInfoWrap} xs={12} sm={6}>
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
                                <Link
                                    href={`https://app.aavegotchi.com/baazaar/erc721/${baazaarId}`}
                                    target={'_blank'}
                                    underline='none'
                                    className={classNames(classes.nameWrapper, 'two-lined')}
                                >
                                    <Typography className={classNames(classes.name, classes.textHighlight, itemUtils.getParcelSize(parcel.size))}>
                                        Watch in Baazaar
                                    </Typography>
                                    <CallMade className={classes.callMadeIcon} />
                                </Link>
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
                                                <GhstTokenGif width={15} height={15} />
                                                {ethersApi.fromWei(item.priceInWei)}
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                })
                            }
                        </List>
                    </Grid>} */}
        </div>
    );
}
