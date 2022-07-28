import { useContext } from 'react';
import ContentLoader from 'react-content-loader';
import { alpha, Link, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from '@mui/material';

import classNames from 'classnames';
import { DateTime } from 'luxon';

import { CustomTooltip } from 'components/custom/CustomTooltip';
import { GhstTokenGif } from 'components/Icons/Icons';
import { CommonUtils } from 'utils';

import { CardContext } from '../CardContext';
import { listingsStyles } from '../styles';

interface CardListingsProps {
    className?: string;
    listings?: any;
    historicalPrices?: any
}

export function CardListing({ className }: CardListingsProps) {
    const classes = listingsStyles();

    const theme = useTheme();

    const { lastSold, current, lastDate } = useContext<any>(CardContext);

    return <>
        {!CommonUtils.isEmptyObject(current) && !CommonUtils.isEmptyObject(lastSold) ? (
            <CustomTooltip
                title={
                    <>
                        {lastSold.price > 0 ? (
                            <Typography variant='caption'>
                                Sold for <Link
                                    href={`https://app.aavegotchi.com/baazaar/erc1155/${lastSold.listing}`}
                                    target='_blank'
                                    className={classes.soldOutLink}
                                >
                                    {CommonUtils.formatPrice(lastSold.price)}
                                </Link> [{DateTime.fromISO(lastDate).toRelative()}]
                            </Typography>
                        ) : (
                            <p className={classes.noSales}>No sales</p>
                        )}
                    </>
                }
                placement='top'
            >
                {current.price === 0 ? (
                    <div className={classNames(classes.listings, className)}>
                        <Typography variant='subtitle2' className={classes.error}>No listings</Typography>
                    </div>
                ) : (
                    <Link
                        href={`https://app.aavegotchi.com/baazaar/erc1155/${current.listing}`}
                        target='_blank'
                        className={classNames(classes.listings, className)}
                    >
                        {current.price === lastSold.price ? (
                            <Typography className={classes.lastPrice} variant='subtitle2'>
                                {CommonUtils.formatPrice(current.price)}
                            </Typography>
                        ) : current.price > lastSold.price ? (
                            <>
                                <KeyboardArrowUpIcon color='success' fontSize='inherit' />
                                <Typography className={classes.lastPriceUp} variant='subtitle2'>
                                    {CommonUtils.formatPrice(current.price)}
                                </Typography>
                            </>
                        ) : (
                            <>
                                <KeyboardArrowDownIcon color='warning' fontSize='inherit' />
                                <Typography className={classes.lastPriceDown} variant='subtitle2'>
                                    {CommonUtils.formatPrice(current.price)}
                                </Typography>
                            </>
                        )}
                        <GhstTokenGif width={18} height={18} className={classes.coin} />
                    </Link>
                )}
            </CustomTooltip>
        ) : (
            <ContentLoader
                speed={2}
                viewBox='0 0 60 25'
                backgroundColor={alpha(theme.palette.secondary.dark, .5)}
                foregroundColor={alpha(theme.palette.secondary.main, .5)}
                className={classes.listingsLoader}
            >
                <rect x='0' y='0' width='60' height='25' />
            </ContentLoader>
        )}
    </>;
}
