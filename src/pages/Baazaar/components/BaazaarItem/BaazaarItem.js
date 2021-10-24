import React from 'react';
import { Grid, Box, Button, Link, Typography } from "@mui/material";
import classNames from 'classnames';
import ghstIcon from '../../../../assets/images/ghsttoken.png';
import itemUtils from '../../../../utils/itemUtils';
import commonUtils from '../../../../utils/commonUtils';
import useStyles from './styles';
import Web3 from "web3";

var web3 = new Web3();

export default function BaazaarItem({item}) {
    const classes = useStyles();

    console.log(item);

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.listing_id}>
            <Box className={classNames(classes.baazaarItem, itemUtils.getBaazaarItemRarityName(item))}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography
                            className={classNames(classes.itemRarity, itemUtils.getBaazaarItemRarityName(item))}
                            variant={'caption'}
                        >
                            {itemUtils.getBaazaarItemRarityName(item)}
                        </Typography>
                    </Grid>
                    {
                        (itemUtils.getItemType(item) === 'wearable' ||
                        itemUtils.getItemType(item) === 'consumable') && <Grid item xs={12}>
                            <Typography
                                className={classes.itemName}
                                variant={'caption'}
                            >
                                {itemUtils.getItemNameById(item.erc1155TypeId)}
                            </Typography>
                        </Grid>
                    }
                    {
                        (itemUtils.getItemType(item) === 'wearable' ||
                            itemUtils.getItemType(item) === 'consumable') && <Grid item xs={12}>
                            <Typography
                                className={classes.itemStats}
                                variant={'caption'}
                            >
                                {itemUtils.getItemStatsById(item.erc1155TypeId)}
                            </Typography>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <Typography
                            className={classes.quantityAndSeller}
                            variant={'caption'}
                        >
                            {item.quantity} listed by <Link
                            className={classes.quantityAndSeller}
                            href={`https://aavegotchi.com/baazaar/owner/${item.seller}`}
                            target={'_blank'}
                            underline='none'
                        >
                            { commonUtils.getSellerShortAddress(item) }
                        </Link>
                        </Typography>
                    </Grid>
                    <Grid className={classes.itemImg} item xs={12}>
                        <img src={itemUtils.getItemImg(item)} alt={item.id} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.price}
                            variant={'caption'}
                        >
                            <Box className={classes.priceImg}><img src={ghstIcon} alt='GHST' /></Box>
                            <Box className={classes.priceText}>
                                {
                                    commonUtils.formatNumberWithCommas(commonUtils.trimPriceToThreeDecimal(web3.utils.fromWei(item.priceInWei)))
                                }
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.goToShopWrap}>
                        <Button
                            className={classes.goToShop}
                            href={itemUtils.getItemUrl(item)}
                            color={'secondary'}
                            variant={'contained'}
                            target={'_blank'}
                        >
                            Go to shop
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Grid>
    );
}