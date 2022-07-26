import { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { alpha, Link, Typography } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from '@mui/material';

import classNames from 'classnames';
import { DateTime } from 'luxon';

import { CustomTooltip } from 'components/custom/CustomTooltip';
import { GhstTokenGif } from 'components/Icons/Icons';
import { TheGraphApi } from 'api';
import { CommonUtils, ItemUtils } from 'utils';

import { listingsStyles } from '../styles';

interface CardListingsProps {
    id: number;
    category: number;
    className?: string;
}

export function CardListings({ id, category, className }: CardListingsProps) {
    const classes = listingsStyles();

    const theme = useTheme();

    const [lastSold, setLastSold] = useState<any>({});
    const [current, setCurrent] = useState<any>({});
    const [lastDate, setLastDate] = useState<any>({});

    useEffect(() => {
        let mounted: boolean = true;

        TheGraphApi.getErc1155Price(id, true, category, 'timeLastPurchased', 'desc').then((response: any) => {
            if (mounted) {
                setLastSold(response);

                if (response.lastSale) {
                    const date = new Date(response.lastSale * 1000).toJSON();
                    setLastDate(date);
                }
            }
        });

        TheGraphApi.getErc1155Price(id, false, category, 'priceInWei', 'asc').then((response: any) => {
            if (mounted) {
                setCurrent(response);
            }
        });

        return () => { mounted = false };
    }, [id]);

    return <>
        {current && lastSold ? (
            <CustomTooltip
                title={
                    <>
                        {lastSold.price === 0 ? (
                            <p className={classes.noSales}>No sales</p>
                        ) : (
                            <Typography variant='caption'>
                                Sold for <Link
                                    href={`https://app.aavegotchi.com/baazaar/erc1155/${lastSold.listing}`}
                                    target='_blank'
                                    underline='none'
                                    className={classes.soldOutLink}
                                >
                                    {CommonUtils.formatPrice(lastSold.price)}
                                </Link> [{DateTime.fromISO(lastDate).toRelative()}]
                            </Typography>
                        )}
                    </>
                }
                placement='top'
            >
                {current.price === 0 ? (
                    <div className={classNames(classes.listings, 'error', className)}>
                        No listings
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
                        <GhstTokenGif width={18} height={18} />
                    </Link>
                )}
            </CustomTooltip>
        ) : (
            <ContentLoader
                speed={2}
                viewBox='0 0 70 27'
                backgroundColor={alpha(theme.palette.secondary.dark, .5)}
                foregroundColor={alpha(theme.palette.secondary.main, .5)}
                className={classes.listingsLoader}
            >
                <rect x='0' y='0' width='70' height='27' />
            </ContentLoader>
        )}
    </>
};
