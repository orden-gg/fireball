
import React, { useEffect, useState } from 'react';
import { Link, Typography, Tooltip } from '@mui/material';
import { useTheme } from '@emotion/react';
import { alpha, Box } from '@mui/system';
import { DateTime } from 'luxon';
import ContentLoader from 'react-content-loader';
import classNames from 'classnames';
import styles, { itemStyles, tooltipStyles } from '../styles';


import commonUtils from '../../../utils/commonUtils';
import thegraph from '../../../api/thegraph';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ghstIcon from '../../../assets/images/ghst-doubleside.gif';


export default function ERC1155({children, item}) {
    const classes = {
        ...itemStyles(),
        ...styles(),
        ...tooltipStyles()
    }
    
    const theme = useTheme();

    console.log(tooltipStyles);

    console.log(classes);

    const [last, setLast] = useState(null);
    const [lastDate, setLastDate] = useState(null);
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        let controller = new AbortController();

        // last sold
        thegraph.getErc1155Price(item.id, true, item.category, 'timeLastPurchased', 'desc').then((response) => {
            if(!controller.signal.aborted) {
                setLast(response);

                if(response?.lastSale) {
                    let date = new Date(response?.lastSale * 1000).toJSON()
                    setLastDate(date);
                }
            }
        });

        // current
        thegraph.getErc1155Price(item.id, false, item.category, 'priceInWei', 'asc').then((response) => {
            if(!controller.signal.aborted) {
                setCurrent(response);
            }
        });

        return () => controller?.abort(); // cleanup on destroy
    }, [item]);

    return (
        <div className={classNames(classes.item, item.rarity, item.tooltip ? classes.tooltip : '')}>

            {item.balance ? (
                <div className={classes.labels}>
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
                                    {last.price === 0 ? '???' : commonUtils.formatPrice(last.price * item.balance)}
                                </Typography>
                                <img src={ghstIcon} width='18' alt='GHST Token Icon' />
                            </div>
                        </Tooltip>

                    ) : (
                        <ContentLoader
                            speed={2}
                            viewBox='0 0 70 27'
                            backgroundColor={alpha(theme.palette.rarity[item.rarity], .6)}
                            foregroundColor={alpha(theme.palette.rarity[item.rarity], .2)}

                            className={classes.totalValueLoader}
                        >
                            <rect x='0' y='0' width='70' height='27' />
                        </ContentLoader>
                    )}

                    <div className={classNames(classes.label, classes.labelBalance)}>
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
                                                            href={`https://aavegotchi.com/gotchi/${holder}`}
                                                            target='_blank'
                                                            underline='none'
                                                            className={classes.equippedTitleLink}
                                                        >
                                                            {holder}
                                                        </Link>
                                                        {index === (item.holders.length - 1) ? '' : ', '}
                                                    </span>
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
                                item.balance
                            )}
                        </Typography>
                    </div>
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
                                            href={`https://www.aavegotchi.com/baazaar/erc1155/${last.listing}`}
                                            target='_blank'
                                            underline='none'
                                            className={classes.soldOutLink}
                                        >
                                            {commonUtils.formatPrice(last.price)}
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
                                    href={`https://www.aavegotchi.com/baazaar/erc1155/${current.listing}`}
                                    target='_blank'
                                    underline='none'
                                    className={classNames(classes.label, classes.labelTotal, 'baazarPrice')}
                                >
                                    {current.price === last.price ? (
                                        <Typography className={classes.lastPrice} variant='subtitle2'>
                                            {commonUtils.formatPrice(current.price)}
                                        </Typography>
                                    ) : current.price > last.price ? (
                                        <>
                                            <KeyboardArrowUpIcon color='success' fontSize='inherit' />
                                            <Typography className={classes.lastPriceUp} variant='subtitle2'>
                                                {commonUtils.formatPrice(current.price)}
                                            </Typography>
                                        </>
                                    ) : (
                                        <>
                                            <KeyboardArrowDownIcon color='warning' fontSize='inherit' />
                                            <Typography className={classes.lastPriceDown} variant='subtitle2'>
                                                {commonUtils.formatPrice(current.price)}
                                            </Typography>
                                        </>
                                    )}
                                    <img src={ghstIcon} width='18' alt='GHST Token Icon' />
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
    )
}