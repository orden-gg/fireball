import { Link, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import classNames from 'classnames';

import { CustomTooltip } from 'components/custom/CustomTooltip';
import { GhstTokenGif, GhstTokenIcon } from 'components/Icons/Icons';
import { EthersApi } from 'api';
import { CommonUtils } from 'utils';

import { listingsStyles } from '../styles';

interface CardERC721ListingProps {
    listings: any[];
    historicalPrices: any[];
    activeListing: string
    className?: string;
}

export function CardERC721Listing({ listings, historicalPrices, activeListing, className }: CardERC721ListingProps) {
    const classes = listingsStyles();

    const currentPrice: number = listings?.length && EthersApi.fromWei(listings[0].priceInWei) || 0;
    const lastPrice: any = historicalPrices?.length && EthersApi.fromWei(historicalPrices[historicalPrices.length - 1]);

    return (
        <>
            {
                listings?.length || historicalPrices?.length ? (
                    <CustomTooltip
                        title={
                            historicalPrices.length ? (
                                <>
                                    <p className={classes.tooltipTitle}>Sales history:</p>
                                    <div className={classes.tooltipInner}>
                                        {historicalPrices.map((price: any, index: number) =>
                                            <p className={classes.tooltipItem} key={index}>
                                                {CommonUtils.formatPrice(EthersApi.fromWei(price))}
                                                <GhstTokenIcon className={classes.token} width={12} height={12} />
                                            </p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <p className={classes.noSales}>No history</p>
                            )
                        }
                        placement='top'
                    >
                        {currentPrice > 0 ? (
                            <Link
                                href={`https://app.aavegotchi.com/baazaar/erc721/${activeListing}`}
                                target='_blank'
                                className={classNames(classes.listings, className)}
                            >
                                {currentPrice === lastPrice ? (
                                    <Typography className={classes.lastPrice} variant='subtitle2'>
                                        {CommonUtils.formatPrice(currentPrice)}
                                    </Typography>
                                ) : currentPrice > lastPrice ? (
                                    <>
                                        <KeyboardArrowUpIcon color='success' fontSize='inherit' />
                                        <Typography className={classes.lastPriceUp} variant='subtitle2'>
                                            {CommonUtils.formatPrice(currentPrice)}
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <KeyboardArrowDownIcon color='warning' fontSize='inherit' />
                                        <Typography className={classes.lastPriceDown} variant='subtitle2'>
                                            {CommonUtils.formatPrice(currentPrice)}
                                        </Typography>
                                    </>
                                )}
                                <GhstTokenGif width={18} height={18} className={classes.coin} />
                            </Link>
                        ) : (
                            <div className={classNames(classes.listings, className)}>
                                <Typography variant='subtitle2' className={classes.error}>No listings</Typography>
                            </div>
                        )}
                    </CustomTooltip>
                ) : (
                    <></>
                )
            }
        </>
    );
}
