import { Grid, Box, Button, Link, Typography } from '@mui/material';

import classNames from 'classnames';

import { GhstTokenIcon } from 'components/Icons/Icons';
import ethersApi from 'api/ethers.api';
import { CommonUtils, ItemUtils } from 'utils';

import { baazaarItemStyles } from '../styles';

export function BaazaarItem({ item }: { item: any }) {
    const classes = baazaarItemStyles();

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={item.listing_id}>
            <Box className={classNames(classes.baazaarItem, ItemUtils.getBaazaarItemRarityName(item))}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography
                            className={classNames(classes.itemRarity, ItemUtils.getBaazaarItemRarityName(item))}
                            variant={'caption'}
                        >
                            {ItemUtils.getBaazaarItemRarityName(item)}
                        </Typography>
                    </Grid>
                    {
                        (ItemUtils.getItemType(item) === 'wearable' ||
                        ItemUtils.getItemType(item) === 'consumable') && <Grid item xs={12}>
                            <Typography
                                className={classes.itemName}
                                variant={'caption'}
                            >
                                {ItemUtils.getItemNameById(item.erc1155TypeId)}
                            </Typography>
                        </Grid>
                    }
                    {
                        (ItemUtils.getItemType(item) === 'wearable' ||
                            ItemUtils.getItemType(item) === 'consumable') && <Grid item xs={12}>
                            <Typography
                                className={classes.itemStats}
                                variant={'caption'}
                            >
                                {ItemUtils.getItemStatsById(item.erc1155TypeId)}
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
                            href={`https://app.aavegotchi.com/baazaar/owner/${item.seller}`}
                            target={'_blank'}
                            underline='none'
                        >
                            { CommonUtils.getSellerShortAddress(item) }
                        </Link>
                        </Typography>
                    </Grid>
                    <Grid className={classes.itemImg} item xs={12}>
                        <img src={ItemUtils.getItemImg(item)} alt={item.id} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.price}
                            variant={'caption'}
                        >
                            <Box className={classes.priceImg}><GhstTokenIcon width={18} height={18} /></Box>
                            <Box className={classes.priceText}>
                                {
                                    CommonUtils.formatNumberWithCommas(CommonUtils.trimPriceToThreeDecimal(ethersApi.fromWei(item.priceInWei)))
                                }
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.goToShopWrap}>
                        <Button
                            className={classes.goToShop}
                            href={ItemUtils.getItemUrl(item)}
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
