import React, { useEffect, useState } from 'react';
import { Link, Typography, Tooltip } from '@mui/material';
import { alpha, Box } from '@mui/system';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTheme } from '@mui/material';

import { DateTime } from 'luxon';
import ContentLoader from 'react-content-loader';
import classNames from 'classnames';

import { GhstTokenGif } from 'components/Icons/Icons';
import { fromWei } from 'api/ethers.api';
import thegraph from 'api/thegraph.api';
import { CommonUtils } from 'utils';

import { styles, itemStyles, tooltipStyles } from '../styles';

interface ERC1155Props {
    children: Array<JSX.Element>;
    item: any;
    className?: string;
}

export function ERC1155({ children, item, className }: ERC1155Props) {
    const classes = {
        ...itemStyles(),
        ...styles(),
        ...tooltipStyles()
    };

    const theme = useTheme();

    const [last, setLast] = useState<any>(null);
    const [lastDate, setLastDate] = useState<string>('');
    const [current, setCurrent] = useState<any>(null);

    useEffect(() => {
        const controller = new AbortController();

        // last sold
        thegraph.getErc1155Price(item.id, true, item.category, 'timeLastPurchased', 'desc').then((response: any) => {
            if (!controller.signal.aborted) {
                setLast(response);

                if (response?.lastSale) {
                    const date = new Date(response?.lastSale * 1000).toJSON();
                    setLastDate(date);
                }
            }
        });

        if (item.isShopItem) {
            setCurrent(item.listing);
        } else {
            // current
            thegraph.getErc1155Price(item.id, false, item.category, 'priceInWei', 'asc').then((response: any) => {
                if (!controller.signal.aborted) {
                    setCurrent(response);
                }
            });
        }

        return () => controller?.abort(); // cleanup on destroy
    }, [item]);

    return (
        <div className={classNames(classes.item, item.rarity, item.tooltip ? classes.tooltip : '', className)}>

            {(item.balance || item.priceInWei) ? (
                <div className={classes.labels}>
                    { !item.isShopItem &&
                        <>
                            {last && current ? (
                                <Tooltip title='Total value' classes={{ tooltip: classes.customTooltip }} placement='top' followCursor>
                                    <div
                                        className={
                                            classNames(
                                                classes.label,
                                                classes.labelTotal,
                                                classes.labelRarityColored
                                            )
                                        }
                                    >
                                        <Typography variant='subtitle2'>
                                            {
                                                last.price === 0 && !item.priceInWei ? '???' :
                                                CommonUtils.formatPrice((last.price && item.balance) ? (last.price * item.balance) : fromWei(item.priceInWei))
                                            }
                                        </Typography>
                                        <GhstTokenGif width={18} height={18} />
                                    </div>
                                </Tooltip>
                            ) : (
                                <ContentLoader
                                    speed={2}
                                    viewBox='0 0 70 27'
                                    backgroundColor={alpha(theme.palette.rarity[item.rarity || 'common'], .6)}
                                    foregroundColor={alpha(theme.palette.rarity[item.rarity || 'common'], .2)}

                                    className={classes.totalValueLoader}
                                >
                                    <rect x='0' y='0' width='70' height='27' />
                                </ContentLoader>
                            )}
                        </>
                    }

                    {
                        (item.balance || item.quantity) && <div className={classNames(classes.label, classes.labelBalance)}>
                            <Typography variant='subtitle2'>
                                {item.holders?.length ? (
                                    <Tooltip
                                        title={
                                            <div className={classes.equippedTitle}>
                                                <p className={classes.equippedTitleText}>Equipped at:</p>
                                                {
                                                    item.holders.map((holder, index) => {
                                                        return <span key={index}>
                                                        <Link
                                                            href={`https://app.aavegotchi.com/gotchi/${holder}`}
                                                            target='_blank'
                                                            underline='none'
                                                            className={classes.equippedTitleLink}
                                                        >
                                                            {holder}
                                                        </Link>
                                                            {index === (item.holders.length - 1) ? '' : ', '}
                                                    </span>;
                                                    })
                                                }
                                            </div>
                                        }
                                        classes={{ tooltip: classes.customTooltip }}
                                        placement='top'
                                    >
                                        <span>{item.holders.length}<span className={classes.itemBalanceDivider}>/</span>{item.balance}</span>
                                    </Tooltip>
                                ) : (
                                    item.balance || item.quantity
                                )}
                            </Typography>
                        </div>
                    }
                </div>
            ) : (
                null
            )}

            {item.slot ? (
                <div className={classNames(classes.label, classes.labelSlot)}>
                    [{item.slot === 'right hand' ? 'r hand' : item.slot}]
                </div>
            ) : (
                null
            )}

            {children}

            <div className={classes.prices}>
                {current && last ? (
                    <Tooltip
                        title={
                            <React.Fragment>
                                {last.price === 0 ? (
                                    <Box color='error.main'>
                                        <Typography variant='caption'>No sales</Typography>
                                    </Box>
                                ) : (
                                    <Typography variant='caption'>
                                        Sold for <Link
                                            href={`https://app.aavegotchi.com/baazaar/erc1155/${last.listing}`}
                                            target='_blank'
                                            underline='none'
                                            className={classes.soldOutLink}
                                        >
                                            {CommonUtils.formatPrice(last.price)}
                                        </Link> [{DateTime.fromISO(lastDate).toRelative()}]
                                    </Typography>
                                )}
                            </React.Fragment>
                        }
                        placement='top'
                        classes={{ tooltip: classes.customTooltip }}
                    >
                        <div>
                            {current.price === 0 ? (
                                <Typography
                                    variant='subtitle2'
                                    className={classNames(classes.label, classes.labelTotal, classes.labelListing, 'baazarPrice')}>
                                    No listings
                                </Typography>
                            ) : (
                                <Link
                                    href={`https://app.aavegotchi.com/baazaar/erc1155/${current.listing}`}
                                    target='_blank'
                                    underline='none'
                                    className={classNames(classes.label, classes.labelTotal, 'baazarPrice')}
                                >
                                    {current.price === last.price ? (
                                        <Typography className={classes.lastPrice} variant='subtitle2'>
                                            {CommonUtils.formatPrice(current.price)}
                                        </Typography>
                                    ) : current.price > last.price ? (
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
                        </div>
                    </Tooltip>
                ) : (
                    <ContentLoader
                        speed={2}
                        viewBox='0 0 70 27'
                        backgroundColor={alpha(theme.palette.secondary.dark, .5)}
                        foregroundColor={alpha(theme.palette.secondary.main, .5)}
                        className={classes.priceLoader}
                    >
                        <rect x='0' y='0' width='70' height='27' />
                    </ContentLoader>
                )}
            </div>
        </div>
    );
}
